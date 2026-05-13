"use client";

import { useState } from "react";
import data from "@/data/troubleshooting.json";


export default function TroubleshootingPage() {
  const [category, setCategory] = useState("student");
  const [selectedIssue, setSelectedIssue] = useState(null);

  const issues = data.categories[category];

  return (
    <main className="min-h-screen bg-[#f4fbf7] px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10 text-center">
          <h1 className="text-3xl font-bold text-[#1a1a2e] mb-2">
            Troubleshooting & Support
          </h1>
          <p className="text-slate-500 text-sm">
            Find quick solutions to common issues across the platform
          </p>
        </div>

        {/* Quick Fix Section */}
        <div className="bg-white border border-green-100 rounded-2xl p-6 mb-8 shadow-sm">
          <h2 className="text-lg font-semibold text-green-700 mb-4">
            🚀 Quick Fix (Try this first)
          </h2>
          <ul className="list-disc pl-5 space-y-2 text-sm text-slate-600">
            {data.quickFixes.map((fix, i) => (
              <li key={i}>{fix}</li>
            ))}
          </ul>
        </div>

        {/* Category Filters */}
        <div className="flex gap-3 mb-6 flex-wrap">
          {["student", "mentor", "sales"].map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setCategory(cat);
                setSelectedIssue(null);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium capitalize transition-all
                ${
                  category === cat
                    ? "bg-green-600 text-white shadow"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-green-50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Issue Dropdown */}
        <div className="mb-8">
          <select
            onChange={(e) => {
              const issue = issues.find(
                (i) => i.title === e.target.value
              );
              setSelectedIssue(issue);
            }}
            className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-200"
          >
            <option value="">Select an issue</option>
            {issues.map((issue, i) => (
              <option key={i} value={issue.title}>
                {issue.title}
              </option>
            ))}
          </select>
        </div>

        {/* Issue Details */}
        {selectedIssue && (
          <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm">

            {/* Issue Title */}
            <h3 className="text-lg font-semibold text-[#1a1a2e] mb-4">
              {selectedIssue.title}
            </h3>

            {/* WHY */}
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-red-500 mb-2">
                Why this happens
              </h4>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                {selectedIssue.why.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>

            {/* FIX */}
            <div>
              <h4 className="text-sm font-semibold text-green-600 mb-2">
                How to fix
              </h4>
              <ul className="list-disc pl-5 text-sm text-slate-600 space-y-1">
                {selectedIssue.fix.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="mt-12 text-center text-xs text-slate-400">
          Still facing issues? Contact support with screenshots and details.
        </div>

      </div>
    </main>
  );
}