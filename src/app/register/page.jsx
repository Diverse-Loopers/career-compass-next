"use client";

import { useState, useRef } from "react";
import "./register.css";

const GOV_ID_OPTIONS = [
  { value: "", label: "— Select ID type —" },
  { value: "aadhaar", label: "Aadhaar Card" },
  { value: "pan", label: "PAN Card" },
  { value: "voter", label: "Voter ID Card" },
  { value: "driving", label: "Driving Licence" },
];

const ID_FIELD_META = {
  aadhaar: {
    label: "Aadhaar number",
    placeholder: "XXXX XXXX XXXX",
    maxLength: 14,
    hint: "12-digit Aadhaar number",
    type: "text",
  },
  pan: {
    label: "PAN number",
    placeholder: "ABCDE1234F",
    maxLength: 10,
    hint: "10-character PAN (e.g. ABCDE1234F)",
    type: "text",
  },
  voter: {
    label: "Voter ID number",
    placeholder: "ABC1234567",
    maxLength: 10,
    hint: "Epic number printed on your card",
    type: "text",
  },
  driving: {
    label: "Driving licence number",
    placeholder: "MH0120210001234",
    maxLength: 16,
    hint: "State code + year + serial number",
    type: "text",
  },
};

const EDU_OPTIONS = [
  { value: "", label: "— Select level —" },
  { value: "10th", label: "10th Marksheet" },
  { value: "12th", label: "12th Marksheet" },
];

const EDU_FIELD_META = {
  "10th": {
    label: "10th Roll Number",
    placeholder: "e.g. 1234567",
    maxLength: 12,
    hint: "Roll number printed on your 10th marksheet",
  },
  "12th": {
    label: "12th Roll Number",
    placeholder: "e.g. 7654321",
    maxLength: 12,
    hint: "Roll number printed on your 12th marksheet",
  },
};

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);

  // Step 1 state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [step1Errors, setStep1Errors] = useState({});
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);
  const [registering, setRegistering] = useState(false);
  // Step 2 state — Education
  const [eduLevel, setEduLevel] = useState("");
  const [eduRoll, setEduRoll] = useState("");
  const [eduFile, setEduFile] = useState(null);

  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  // Step 2 state — Government ID
  const [idType, setIdType] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  // Step 2 state — Password
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [step2Errors, setStep2Errors] = useState({});

  const eduFileRef = useRef(null);
  const idFileRef = useRef(null);

  // ── Step 1 handlers ──────────────────────────────────────────────────
  const handleVerifyEmail = async () => {
    if (!email || !email.includes("@")) {
      setStep1Errors((e) => ({ ...e, email: "Enter valid email" }));
      return;
    }

    if (!phone || phone.length !== 10) {
      setStep1Errors((e) => ({ ...e, phone: "Enter valid phone number" }));
      return;
    }

    try {
      setLoadingOtp(true);

      const res = await fetch("http://localhost:5000/api/email/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, mobile: phone }),
      });

      const data = await res.json();

      if (!res.ok) {
        // ✅ show field-specific errors
        if (data.errors?.email) {
          setStep1Errors((e) => ({
            ...e,
            email: "Email already registered",
          }));
        }

        if (data.errors?.mobile) {
          setStep1Errors((e) => ({
            ...e,
            phone: "Mobile already registered",
          }));
        }

        return;
      }

      if (data.success) {
        setOtpSent(true);
        setStep1Errors({});
      }
    } catch (err) {
      console.error(err);
      setStep1Errors((e) => ({
        ...e,
        email: "Failed to send OTP",
      }));
    } finally {
      setLoadingOtp(false);
    }
  };
  const handleVerifyOtp = async () => {
    try {
      setVerifyingOtp(true);

      const res = await fetch("http://localhost:5000/api/email/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (data.success) {
        setEmailVerified(true);
        setOtpError("");
        setOtp("");
      } else {
        setOtpError(data.message);
        setEmailVerified(false);
      }
    } catch (err) {
      console.error(err);
      setOtpError("Server error");
    } finally {
      setVerifyingOtp(false);
    }
  };

  const handleContinue = () => {
    const errors = {};
    if (!firstName.trim()) errors.firstName = "First name is required.";
    if (!lastName.trim()) errors.lastName = "Last name is required.";
    if (!phone.trim()) {
      errors.phone = "Phone number is required.";
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      errors.phone = "Enter a valid 10-digit Indian number.";
    }
    if (!dob) errors.dob = "Date of birth is required.";
    if (!email || !email.includes("@"))
      errors.email = "Enter a valid email address.";
    setStep1Errors(errors);
    if (Object.keys(errors).length === 0) setStep(2);
  };

  // ── Step 2 handlers ──────────────────────────────────────────────────
  const handleEduLevelChange = (val) => {
    setEduLevel(val);
    setEduRoll("");
    setEduFile(null);
  };

  const handleEduFileChange = (e) => {
    if (e.target.files?.[0]) setEduFile(e.target.files[0]);
  };

  const handleIdTypeChange = (val) => {
    setIdType(val);
    setIdNumber("");
    setUploadedFile(null);
  };

  const handleIdFileChange = (e) => {
    if (e.target.files?.[0]) setUploadedFile(e.target.files[0]);
  };

  const handleRegister = async () => {
    const errors = {};

    if (!eduLevel) errors.eduLevel = "Please select an education level.";

    if (eduLevel && !eduRoll.trim())
      errors.eduRoll = "Please enter your roll number.";

    if (eduLevel && !eduFile)
      errors.eduFile = "Please upload your report card.";

    if (!idType) errors.idType = "Please select an ID type.";

    if (idType && !idNumber.trim()) {
      errors.idNumber = "Please enter your ID number.";
    }

    // ✅ Aadhaar validation (IMPORTANT)
    if (idType === "aadhaar") {
      const clean = idNumber.replace(/\s/g, ""); // remove spaces

      if (!/^\d{12}$/.test(clean)) {
        errors.idNumber = "Aadhaar must be exactly 12 digits";
      }
    }

    if (idType && !uploadedFile)
      errors.upload = "Please upload your document proof.";

    if (password.length < 8)
      errors.password = "Password must be at least 8 characters.";

    if (confirmPassword !== password)
      errors.confirmPassword = "Passwords do not match.";

    setStep2Errors(errors);

    if (Object.keys(errors).length === 0) {
      try {
        const formData = new FormData();

        // Basic Info
        formData.append("full_name", `${firstName} ${lastName}`);
        formData.append("email", email);
        formData.append("mobile", phone);
        formData.append("date_of_birth", dob);

        // Education
        formData.append("education", eduLevel);
        formData.append("education_roll_no", eduRoll);
        if (eduFile) formData.append("eduFile", eduFile);

        // Government ID
        formData.append("government_id_type", idType);
        formData.append(
          "government_id_number",
          idType === "aadhaar"
            ? idNumber.replace(/\s/g, "") // ✅ send clean value
            : idNumber,
        );
        if (uploadedFile) formData.append("idFile", uploadedFile);

        // Password
        formData.append("password", password);

        const res = await fetch("http://localhost:5000/api/register", {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error("Request failed");
        }

        const data = await res.json();

        if (data.success) {
          setDone(true);
        } else {
          alert(data.error);
        }
      } catch (err) {
        console.error(err);
      }
    }
  };
  // ── Step dot helpers ─────────────────────────────────────────────────
  const dotClass = (n) => {
    if (n < step || done) return "step-dot step-dot--done";
    if (n === step && !done) return "step-dot step-dot--active";
    return "step-dot step-dot--idle";
  };

  const labelClass = (n) => {
    if (n < step || done) return "step-label step-label--done";
    if (n === step && !done) return "step-label step-label--active";
    return "step-label";
  };

  const idMeta = ID_FIELD_META[idType];
  const eduMeta = EDU_FIELD_META[eduLevel];

  // ── Render ───────────────────────────────────────────────────────────
  return (
    <div className="register-page">
      <div className="register-container">
        {/* Header */}
        <div className="register-header">
          <p className="register-header__logo">SkillVerify</p>
          <h1 className="register-header__title">Create your account</h1>
          <p className="register-header__subtitle">
            Complete both steps to register and verify your identity.
          </p>
        </div>

        {/* Step bar */}
        <div className="step-bar">
          <div className="step-item">
            <div className={dotClass(1)}>{step > 1 || done ? "✓" : "1"}</div>
            <span className={labelClass(1)}>Basic Info</span>
          </div>
          <div
            className={`step-line ${step > 1 || done ? "step-line--done" : ""}`}
          />
          <div className="step-item">
            <div className={dotClass(2)}>{done ? "✓" : "2"}</div>
            <span className={labelClass(2)}>Identity Proof</span>
          </div>
        </div>

        {/* ── STEP 1 ── */}
        {!done && step === 1 && (
          <div className="register-card">
            <h2 className="register-card__title">Personal details</h2>
            <p className="register-card__desc">
              Enter your name, date of birth, and verify your email to continue.
            </p>

            {/* Name row */}
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">First name</label>
                <input
                  className={`form-input${step1Errors.firstName ? " form-input--error" : ""}`}
                  type="text"
                  placeholder="Rahul"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                {step1Errors.firstName && (
                  <span className="form-hint form-hint--error">
                    {step1Errors.firstName}
                  </span>
                )}
              </div>
              <div className="form-group">
                <label className="form-label">Last name</label>
                <input
                  className={`form-input${step1Errors.lastName ? " form-input--error" : ""}`}
                  type="text"
                  placeholder="Sharma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                {step1Errors.lastName && (
                  <span className="form-hint form-hint--error">
                    {step1Errors.lastName}
                  </span>
                )}
              </div>
            </div>

            {/* Phone + DOB row */}
            <div className="form-row">
              {/* Phone number */}
              <div className="form-group">
                <label className="form-label">Phone number</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <span
                    style={{
                      display: "flex",
                      alignItems: "center",
                      padding: "0 0.75rem",
                      background: "#f3f4f6",
                      borderRadius: "0.5rem",
                      fontSize: "0.9rem",
                      whiteSpace: "nowrap",
                    }}
                  >
                    +91
                  </span>

                  <input
                    disabled={otpSent}
                    className={`form-input${step1Errors.phone ? " form-input--error" : ""}`}
                    type="tel"
                    placeholder="9876543210"
                    maxLength={10}
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, ""))
                    }
                    style={{ flex: 1 }}
                  />
                </div>

                {step1Errors.phone ? (
                  <span className="form-hint form-hint--error">
                    {step1Errors.phone}
                  </span>
                ) : (
                  <span className="form-hint">
                    Enter a valid Indian mobile number
                  </span>
                )}
              </div>

              {/* Date of Birth */}
              <div className="form-group">
                <label className="form-label">Date of birth</label>
                <input
                  className={`form-input${step1Errors.dob ? " form-input--error" : ""}`}
                  type="date"
                  value={dob}
                  onChange={(e) => setDob(e.target.value)}
                />
                {step1Errors.dob ? (
                  <span className="form-hint form-hint--error">
                    {step1Errors.dob}
                  </span>
                ) : (
                  <span className="form-hint">As per your government ID</span>
                )}
              </div>
            </div>

            {/* Email + verify (horizontal) */}
            <div className="verify-row">
              <div className="form-group form-group--no-mb">
                <label className="form-label">Email address</label>
                <input
                  disabled={otpSent} // 🔒 lock after OTP
                  className={`form-input${step1Errors.email ? " form-input--error" : ""}`}
                  type="email"
                  placeholder="rahul@example.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setEmailVerified(false);
                    setOtpSent(false);
                    setOtp("");
                  }}
                />
              </div>

              {/* ✅ BUTTON / LOADER */}
              {!otpSent && (
                <button
                  className="btn-verify"
                  onClick={handleVerifyEmail}
                  disabled={loadingOtp}
                  type="button"
                >
                  {loadingOtp ? (
                    <>
                      <span className="loader"></span> Sending...
                    </>
                  ) : (
                    "Verify Email"
                  )}
                </button>
              )}
            </div>
            {otpSent && !emailVerified && (
              <span className="form-hint form-hint--success">
                ✅ OTP sent to your email
              </span>
            )}
            {otpSent && !emailVerified && (
              <div className="form-group">
                <label className="form-label">Enter OTP</label>
                <input
                  autoFocus
                  className="form-input"
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  maxLength={6}
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    setOtpError("");
                  }}
                />

                {otpError && (
                  <span className="form-hint form-hint--error">{otpError}</span>
                )}

                <button
                  className="btn-verify"
                  type="button"
                  onClick={handleVerifyOtp}
                  disabled={verifyingOtp || otp.length < 6}
                  style={{ marginTop: "0.5rem" }}
                >
                  {verifyingOtp ? "Verifying..." : "Verify"}
                </button>
              </div>
            )}
            {step1Errors.email && (
              <span
                className="form-hint form-hint--error"
                style={{ display: "block", marginBottom: "0.5rem" }}
              >
                {step1Errors.email}
              </span>
            )}
            {emailVerified && (
              <span className="form-hint form-hint--success">
                ✓ Email verified successfully
              </span>
            )}

            <button
              className={`btn-next ${!emailVerified ? "btn-next--disabled" : ""}`}
              onClick={handleContinue}
              type="button"
              disabled={!emailVerified}
            >
              Continue to identity proof
            </button>
          </div>
        )}

        {/* ── STEP 2 ── */}
        {!done && step === 2 && (
          <div className="register-card">
            <h2 className="register-card__title">Identity verification</h2>
            <p className="register-card__desc">
              Provide your education details and government ID to complete
              verification.
            </p>

            {/* ── Education Details section ── */}

            {/* Education level dropdown */}
            <div className="form-group">
              <label className="form-label">Education level</label>
              <div className="select-wrap">
                <select
                  className={`form-select${step2Errors.eduLevel ? " form-select--error" : ""}`}
                  value={eduLevel}
                  onChange={(e) => handleEduLevelChange(e.target.value)}
                >
                  {EDU_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {step2Errors.eduLevel && (
                <span className="form-hint form-hint--error">
                  {step2Errors.eduLevel}
                </span>
              )}
            </div>

            {/* Dynamic roll number field */}
            {eduMeta && (
              <div className="form-group extra-field">
                <label className="form-label">{eduMeta.label}</label>
                <input
                  className={`form-input${step2Errors.eduRoll ? " form-input--error" : ""}`}
                  type="text"
                  placeholder={eduMeta.placeholder}
                  maxLength={eduMeta.maxLength}
                  value={eduRoll}
                  onChange={(e) => setEduRoll(e.target.value)}
                />
                <span className="form-hint">{eduMeta.hint}</span>
                {step2Errors.eduRoll && (
                  <span className="form-hint form-hint--error">
                    {step2Errors.eduRoll}
                  </span>
                )}
              </div>
            )}

            {/* Report card upload */}
            {eduLevel && (
              <div className="form-group extra-field">
                <label className="form-label">Report card</label>
                <button
                  className={`upload-btn${eduFile ? " upload-btn--uploaded" : ""}`}
                  onClick={() => eduFileRef.current?.click()}
                  type="button"
                >
                  <span>{eduFile ? "✓" : "📎"}</span>
                  <span>
                    {eduFile
                      ? eduFile.name.length > 36
                        ? eduFile.name.slice(0, 36) + "…"
                        : eduFile.name
                      : "Upload report card / marksheet"}
                  </span>
                </button>
                <input
                  ref={eduFileRef}
                  type="file"
                  accept="image/*,.pdf"
                  style={{ display: "none" }}
                  onChange={handleEduFileChange}
                />
                <span className="form-hint">
                  Accepted: JPG, PNG, PDF · Max 5 MB
                </span>
                {step2Errors.eduFile && (
                  <span className="form-hint form-hint--error">
                    {step2Errors.eduFile}
                  </span>
                )}
              </div>
            )}

            {/* ── Government ID section ── */}

            {/* ID type dropdown */}
            <div className="form-group">
              <label className="form-label">Government ID type</label>
              <div className="select-wrap">
                <select
                  className={`form-select${step2Errors.idType ? " form-select--error" : ""}`}
                  value={idType}
                  onChange={(e) => handleIdTypeChange(e.target.value)}
                >
                  {GOV_ID_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
              {step2Errors.idType && (
                <span className="form-hint form-hint--error">
                  {step2Errors.idType}
                </span>
              )}
            </div>

            {/* Dynamic ID number field */}
            {idMeta && (
              <div className="form-group extra-field">
                <label className="form-label">{idMeta.label}</label>
                <input
                  className={`form-input${step2Errors.idNumber ? " form-input--error" : ""}`}
                  type={idMeta.type}
                  placeholder={idMeta.placeholder}
                  maxLength={idMeta.maxLength}
                  value={idNumber}
                  onChange={(e) => setIdNumber(e.target.value)}
                />
                <span className="form-hint">{idMeta.hint}</span>
                {step2Errors.idNumber && (
                  <span className="form-hint form-hint--error">
                    {step2Errors.idNumber}
                  </span>
                )}
              </div>
            )}

            {/* Document upload */}
            {idType && (
              <div className="form-group extra-field">
                <label className="form-label">Document proof</label>
                <button
                  className={`upload-btn${uploadedFile ? " upload-btn--uploaded" : ""}`}
                  onClick={() => idFileRef.current?.click()}
                  type="button"
                >
                  <span>{uploadedFile ? "✓" : "📎"}</span>
                  <span>
                    {uploadedFile
                      ? uploadedFile.name.length > 36
                        ? uploadedFile.name.slice(0, 36) + "…"
                        : uploadedFile.name
                      : "Upload document proof"}
                  </span>
                </button>
                <input
                  ref={idFileRef}
                  type="file"
                  accept="image/*,.pdf"
                  style={{ display: "none" }}
                  onChange={handleIdFileChange}
                />
                <span className="form-hint">
                  Accepted: JPG, PNG, PDF · Max 5 MB
                </span>
                {step2Errors.upload && (
                  <span className="form-hint form-hint--error">
                    {step2Errors.upload}
                  </span>
                )}
              </div>
            )}

            {/* Password */}
            <div className="form-group form-group--no-mb">
              <label className="form-label">Password</label>
              <div className="password-wrap">
                <input
                  className={`form-input${step2Errors.password ? " form-input--error" : ""}`}
                  type={showPass ? "text" : "password"}
                  placeholder="Min. 8 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ paddingRight: "2.75rem" }}
                />
                <button
                  className="toggle-pass"
                  type="button"
                  onClick={() => setShowPass((v) => !v)}
                  aria-label="Toggle password visibility"
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              </div>
              <span className="form-hint">
                Use letters, numbers, and a special character.
              </span>
              {step2Errors.password && (
                <span className="form-hint form-hint--error">
                  {step2Errors.password}
                </span>
              )}
            </div>

            {/* Confirm Password */}
            <div className="form-group" style={{ marginTop: "1rem" }}>
              <label className="form-label">Confirm password</label>
              <div className="password-wrap">
                <input
                  className={`form-input${step2Errors.confirmPassword ? " form-input--error" : ""}`}
                  type={showPass ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  style={{ paddingRight: "2.75rem" }}
                />
              </div>

              {step2Errors.confirmPassword && (
                <span className="form-hint form-hint--error">
                  {step2Errors.confirmPassword}
                </span>
              )}
            </div>

            <button
              className="btn-register"
              onClick={handleRegister}
              type="button"
            >
              Register →
            </button>
            <button
              className="btn-back"
              onClick={() => setStep(1)}
              type="button"
            >
              ← Back to basic info
            </button>
          </div>
        )}

        {/* ── SUCCESS ── */}
        {done && (
          <div className="register-card">
            <div className="success-screen">
              <div className="success-icon">✓</div>
              <h2 className="success-title">Registration complete!</h2>
              <p className="success-desc">
                Your account has been created and identity proof submitted for
                review. You'll receive a confirmation email shortly.
              </p>
              <button
                className="btn-reset"
                type="button"
                onClick={() => {
                  setStep(1);
                  setDone(false);
                  setFirstName("");
                  setLastName("");
                  setDob("");
                  setEmail("");
                  setEmailVerified(false);
                  setEduLevel("");
                  setEduRoll("");
                  setEduFile(null);
                  setIdType("");
                  setIdNumber("");
                  setUploadedFile(null);
                  setPassword("");
                  setStep1Errors({});
                  setStep2Errors({});
                }}
              >
                Register another account
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
