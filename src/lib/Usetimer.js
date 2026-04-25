/**
 * useTimer — custom hook
 *
 * Responsibilities:
 *  - Count down from testDuration (seconds)
 *  - Persist remaining time in localStorage (survives page refresh)
 *  - Call onExpire() when timer hits 0
 *  - Expose isWarning flag when time < warningThreshold
 *
 * FIX: localStorage is not defined (Next.js SSR)
 *   - useState lazy initialisers run on the server where localStorage
 *     doesn't exist. Solution: default to testDuration, then hydrate the
 *     real saved value inside a useEffect (browser-only, runs after mount).
 */

import { useState, useEffect, useRef } from "react";
import timerConfig from "../data/Timerconfig.json";

const { testDuration, warningThreshold, autoSubmitOnExpiry } = timerConfig;

export function useTimer({ storageKey, active, onExpire }) {

  // SSR-safe default — do NOT call localStorage here (server would throw).
  const [timeLeft, setTimeLeft] = useState(testDuration);

  // Hydrate the real saved time once, after mount (browser-only).
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);
    if (saved) setTimeLeft(parseInt(saved, 10));
  // storageKey is stable for the lifetime of a test — intentionally no dep.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Ref guard: ensure onExpire fires exactly once
  const expiredRef = useRef(false);

  useEffect(() => {
    if (!active) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        const next = prev - 1;

        // Persist to localStorage every tick (reload safety)
        localStorage.setItem(storageKey, String(next));

        if (next <= 0 && !expiredRef.current && autoSubmitOnExpiry) {
          expiredRef.current = true;
          clearInterval(interval);
          onExpire();
          return 0;
        }

        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [active, storageKey, onExpire]);

  return {
    timeLeft,
    isWarning: timeLeft <= warningThreshold,
  };
}