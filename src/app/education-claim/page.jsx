// "use client";

// import { useState, useRef } from "react";

// // ─── Icons ────────────────────────────────────────────────────────────────────
// const UploadIcon = () => (
//   <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
//     <polyline points="17 8 12 3 7 8"/>
//     <line x1="12" y1="3" x2="12" y2="15"/>
//   </svg>
// );

// const CheckIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
//     <polyline points="20 6 9 17 4 12"/>
//   </svg>
// );

// const XIcon = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//     <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
//   </svg>
// );

// const FileIcon = () => (
//   <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
//     <polyline points="14 2 14 8 20 8"/>
//   </svg>
// );

// // ─── Step Indicator ───────────────────────────────────────────────────────────
// const StepIndicator = ({ currentStep }) => (
//   <div style={{ display: "flex", alignItems: "center", gap: 0, marginBottom: 36 }}>
//     {/* Step 1 */}
//     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//       <div style={{
//         width: 32, height: 32, borderRadius: "50%",
//         background: currentStep >= 1 ? (currentStep > 1 ? "#16a34a" : "#1d4ed8") : "#e5e7eb",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         color: currentStep >= 1 ? "#fff" : "#9ca3af",
//         fontSize: 13, fontWeight: 700, flexShrink: 0,
//         transition: "background 0.3s"
//       }}>
//         {currentStep > 1 ? <CheckIcon /> : "1"}
//       </div>
//       <span style={{
//         fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
//         color: currentStep >= 1 ? (currentStep > 1 ? "#16a34a" : "#1d4ed8") : "#9ca3af",
//         textTransform: "uppercase", transition: "color 0.3s"
//       }}>
//         Basic Info
//       </span>
//     </div>

//     {/* Connector */}
//     <div style={{
//       flex: 1, height: 2, margin: "0 12px",
//       background: currentStep > 1 ? "#16a34a" : "#d1d5db",
//       transition: "background 0.3s", minWidth: 40
//     }} />

//     {/* Step 2 */}
//     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//       <div style={{
//         width: 32, height: 32, borderRadius: "50%",
//         background: currentStep >= 2 ? (currentStep > 2 ? "#16a34a" : "#1d4ed8") : "#e5e7eb",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         color: currentStep >= 2 ? "#fff" : "#9ca3af",
//         fontSize: 13, fontWeight: 700, flexShrink: 0,
//         transition: "background 0.3s"
//       }}>
//         {currentStep > 2 ? <CheckIcon /> : "2"}
//       </div>
//       <span style={{
//         fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
//         color: currentStep >= 2 ? (currentStep > 2 ? "#16a34a" : "#1d4ed8") : "#9ca3af",
//         textTransform: "uppercase", transition: "color 0.3s"
//       }}>
//         Identity Proof
//       </span>
//     </div>

//     {/* Connector */}
//     <div style={{
//       flex: 1, height: 2, margin: "0 12px",
//       background: currentStep > 2 ? "#16a34a" : "#d1d5db",
//       transition: "background 0.3s", minWidth: 40
//     }} />

//     {/* Step 3 */}
//     <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//       <div style={{
//         width: 32, height: 32, borderRadius: "50%",
//         background: currentStep >= 3 ? "#1d4ed8" : "#e5e7eb",
//         display: "flex", alignItems: "center", justifyContent: "center",
//         color: currentStep >= 3 ? "#fff" : "#9ca3af",
//         fontSize: 13, fontWeight: 700, flexShrink: 0,
//         transition: "background 0.3s"
//       }}>
//         3
//       </div>
//       <span style={{
//         fontSize: 12, fontWeight: 700, letterSpacing: "0.08em",
//         color: currentStep >= 3 ? "#1d4ed8" : "#9ca3af",
//         textTransform: "uppercase", transition: "color 0.3s"
//       }}>
//         Education
//       </span>
//     </div>
//   </div>
// );

// // ─── Field Components ─────────────────────────────────────────────────────────
// const Label = ({ children, required }) => (
//   <label style={{
//     display: "block", marginBottom: 6,
//     fontSize: 11, fontWeight: 700, letterSpacing: "0.08em",
//     color: "#374151", textTransform: "uppercase"
//   }}>
//     {children}
//     {required && <span style={{ color: "#ef4444", marginLeft: 3 }}>*</span>}
//   </label>
// );

// const HelperText = ({ children, error }) => (
//   <p style={{
//     margin: "5px 0 0", fontSize: 12,
//     color: error ? "#ef4444" : "#6b7280", lineHeight: 1.4
//   }}>
//     {children}
//   </p>
// );

// const TextInput = ({ id, placeholder, value, onChange, error, type = "text", min, max }) => (
//   <input
//     id={id}
//     type={type}
//     placeholder={placeholder}
//     value={value}
//     onChange={onChange}
//     min={min}
//     max={max}
//     style={{
//       width: "100%", padding: "11px 14px",
//       border: `1.5px solid ${error ? "#fca5a5" : "#e5e7eb"}`,
//       borderRadius: 10, fontSize: 14, color: "#111827",
//       background: error ? "#fff5f5" : "#f9fafb",
//       outline: "none", boxSizing: "border-box",
//       fontFamily: "inherit", transition: "border-color 0.2s, background 0.2s",
//     }}
//     onFocus={e => {
//       e.target.style.borderColor = error ? "#ef4444" : "#1d4ed8";
//       e.target.style.background = "#fff";
//     }}
//     onBlur={e => {
//       e.target.style.borderColor = error ? "#fca5a5" : "#e5e7eb";
//       e.target.style.background = error ? "#fff5f5" : "#f9fafb";
//     }}
//   />
// );

// // ─── File Upload ──────────────────────────────────────────────────────────────
// const FileUpload = ({ label, required, value, onChange, error, helperText }) => {
//   const ref = useRef();
//   const [drag, setDrag] = useState(false);

//   const handleFile = (file) => {
//     if (!file) return;
//     const allowed = ["image/jpeg", "image/png", "application/pdf"];
//     if (!allowed.includes(file.type)) {
//       onChange(null, "Only JPG, PNG, or PDF files are accepted.");
//       return;
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       onChange(null, "File must be under 5 MB.");
//       return;
//     }
//     onChange(file, null);
//   };

//   return (
//     <div>
//       <Label required={required}>{label}</Label>
//       <div
//         onClick={() => ref.current.click()}
//         onDragOver={e => { e.preventDefault(); setDrag(true); }}
//         onDragLeave={() => setDrag(false)}
//         onDrop={e => { e.preventDefault(); setDrag(false); handleFile(e.dataTransfer.files[0]); }}
//         style={{
//           border: `1.5px dashed ${error ? "#fca5a5" : drag ? "#1d4ed8" : "#d1d5db"}`,
//           borderRadius: 10, padding: "18px 16px",
//           display: "flex", alignItems: "center", justifyContent: "center",
//           gap: 10, cursor: "pointer", background: drag ? "#eff6ff" : error ? "#fff5f5" : "#f9fafb",
//           transition: "all 0.2s", userSelect: "none"
//         }}
//       >
//         <input
//           ref={ref} type="file"
//           accept="image/jpeg,image/png,application/pdf"
//           style={{ display: "none" }}
//           onChange={e => handleFile(e.target.files[0])}
//         />
//         {value ? (
//           <div style={{ display: "flex", alignItems: "center", gap: 8, width: "100%", justifyContent: "space-between" }}>
//             <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//               <span style={{ color: "#1d4ed8" }}><FileIcon /></span>
//               <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{value.name}</span>
//               <span style={{ fontSize: 12, color: "#9ca3af" }}>({(value.size / 1024).toFixed(0)} KB)</span>
//             </div>
//             <button
//               onClick={e => { e.stopPropagation(); onChange(null, null); }}
//               style={{ background: "none", border: "none", cursor: "pointer", color: "#6b7280", padding: 2 }}
//             >
//               <XIcon />
//             </button>
//           </div>
//         ) : (
//           <>
//             <span style={{ color: "#6b7280" }}><UploadIcon /></span>
//             <span style={{ fontSize: 13, color: "#6b7280" }}>
//               <span style={{ color: "#1d4ed8", fontWeight: 600 }}>Upload file</span> or drag and drop
//             </span>
//           </>
//         )}
//       </div>
//       <HelperText error={!!error}>{error || helperText || "Accepted: JPG, PNG, PDF · Max 5 MB"}</HelperText>
//     </div>
//   );
// };

// // ─── Main Form ────────────────────────────────────────────────────────────────
// const CURRENT_YEAR = new Date().getFullYear();

// const initialState = {
//   institution_name: "",
//   university_email: "",
//   degree_name: "",
//   specialization: "",
//   passing_year: "",
//   marksheet_upload: null,
//   certificate_upload: null,
//   college_id_upload: null,
// };

// const initialErrors = Object.fromEntries(Object.keys(initialState).map(k => [k, ""]));

// export default function EducationForm({ onBack, onSubmit }) {
//   const [form, setForm] = useState(initialState);
//   const [errors, setErrors] = useState(initialErrors);
//   const [submitted, setSubmitted] = useState(false);

//   const set = (key, val) => {
//     setForm(f => ({ ...f, [key]: val }));
//     setErrors(e => ({ ...e, [key]: "" }));
//   };

//   const validate = () => {
//     const e = { ...initialErrors };
//     let valid = true;

//     if (!form.institution_name || form.institution_name.trim().length < 3) {
//       e.institution_name = "Institution name must be at least 3 characters."; valid = false;
//     }
//     if (!form.university_email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.university_email)) {
//       e.university_email = "Enter a valid university email address."; valid = false;
//     }
//     if (!form.degree_name || form.degree_name.trim().length < 2) {
//       e.degree_name = "Degree name must be at least 2 characters (e.g. B.Tech, MBA)."; valid = false;
//     }
//     if (!form.specialization || form.specialization.trim().length < 2) {
//       e.specialization = "Specialization must be at least 2 characters."; valid = false;
//     }
//     const yr = parseInt(form.passing_year);
//     if (!form.passing_year || isNaN(yr) || yr < 1950 || yr > CURRENT_YEAR) {
//       e.passing_year = `Year must be between 1950 and ${CURRENT_YEAR}.`; valid = false;
//     }
//     if (!form.marksheet_upload) {
//       e.marksheet_upload = "Marksheet is required."; valid = false;
//     }
//     if (!form.certificate_upload) {
//       e.certificate_upload = "Certificate is required."; valid = false;
//     }

//     setErrors(e);
//     return valid;
//   };

//   const handleSubmit = () => {
//     if (validate()) {
//       setSubmitted(true);
//       onSubmit?.(form);
//     }
//   };

//   if (submitted) {
//     return (
//       <div style={pageStyle}>
//         <div style={cardStyle}>
//           <div style={{ textAlign: "center", padding: "32px 0" }}>
//             <div style={{
//               width: 64, height: 64, borderRadius: "50%", background: "#dcfce7",
//               display: "flex", alignItems: "center", justifyContent: "center",
//               margin: "0 auto 16px", color: "#16a34a"
//             }}>
//               <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
//                 <polyline points="20 6 9 17 4 12"/>
//               </svg>
//             </div>
//             <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 700, color: "#111827", margin: "0 0 8px" }}>
//               Education details saved!
//             </h2>
//             <p style={{ color: "#6b7280", fontSize: 14, margin: 0 }}>
//               Your education information has been submitted for verification.
//             </p>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:wght@400;500;600;700&display=swap');
//         * { box-sizing: border-box; }
//         body { margin: 0; }
//       `}</style>
//       <div style={pageStyle}>
//         {/* Brand */}
//         <div style={{ marginBottom: 28 }}>
//           <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 17, fontWeight: 700, color: "#111827", letterSpacing: "-0.01em" }}>
//             SkillVerify
//           </span>
//         </div>

//         {/* Page title */}
//         <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 700, color: "#111827", margin: "0 0 6px", letterSpacing: "-0.02em" }}>
//           Create your account
//         </h1>
//         <p style={{ margin: "0 0 28px", fontSize: 14, color: "#6b7280", fontFamily: "'DM Sans', sans-serif" }}>
//           Complete all steps to register and verify your identity.
//         </p>

//         <StepIndicator currentStep={3} />

//         {/* Card */}
//         <div style={cardStyle}>
//           <h2 style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 18, fontWeight: 700, color: "#111827", margin: "0 0 4px" }}>
//             Education details
//           </h2>
//           <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, color: "#6b7280", margin: "0 0 28px", lineHeight: 1.5 }}>
//             Provide your academic background. All fields marked <span style={{ color: "#ef4444" }}>*</span> are required.
//           </p>

//           <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>

//             {/* Institution Name */}
//             <div>
//               <Label required>Institution Name</Label>
//               <TextInput
//                 id="institution_name"
//                 placeholder="e.g. Indian Institute of Technology, Delhi"
//                 value={form.institution_name}
//                 onChange={e => set("institution_name", e.target.value)}
//                 error={errors.institution_name}
//               />
//               {errors.institution_name
//                 ? <HelperText error>{errors.institution_name}</HelperText>
//                 : <HelperText>Minimum 3 characters. Cannot be empty.</HelperText>}
//             </div>

//             {/* University Email */}
//             <div>
//               <Label required>University Verification Email</Label>
//               <TextInput
//                 id="university_email"
//                 type="email"
//                 placeholder="e.g. rahul@university.ac.in"
//                 value={form.university_email}
//                 onChange={e => set("university_email", e.target.value)}
//                 error={errors.university_email}
//               />
//               {errors.university_email
//                 ? <HelperText error>{errors.university_email}</HelperText>
//                 : <HelperText>University verification email (used to confirm your degree).</HelperText>}
//             </div>

//             {/* Degree + Specialization — 2 col */}
//             <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
//               <div>
//                 <Label required>Degree Name</Label>
//                 <TextInput
//                   id="degree_name"
//                   placeholder="e.g. B.Tech, MBA, M.Sc."
//                   value={form.degree_name}
//                   onChange={e => set("degree_name", e.target.value)}
//                   error={errors.degree_name}
//                 />
//                 {errors.degree_name
//                   ? <HelperText error>{errors.degree_name}</HelperText>
//                   : <HelperText>Min 2 characters.</HelperText>}
//               </div>
//               <div>
//                 <Label required>Specialization</Label>
//                 <TextInput
//                   id="specialization"
//                   placeholder="e.g. Computer Science, Finance"
//                   value={form.specialization}
//                   onChange={e => set("specialization", e.target.value)}
//                   error={errors.specialization}
//                 />
//                 {errors.specialization
//                   ? <HelperText error>{errors.specialization}</HelperText>
//                   : <HelperText>Min 2 characters.</HelperText>}
//               </div>
//             </div>

//             {/* Passing Year */}
//             <div>
//               <Label required>Year of Passing</Label>
//               <TextInput
//                 id="passing_year"
//                 type="number"
//                 placeholder={`e.g. ${CURRENT_YEAR - 2}`}
//                 value={form.passing_year}
//                 onChange={e => set("passing_year", e.target.value)}
//                 error={errors.passing_year}
//                 min={1950}
//                 max={CURRENT_YEAR}
//               />
//               {errors.passing_year
//                 ? <HelperText error>{errors.passing_year}</HelperText>
//                 : <HelperText>Between 1950 and {CURRENT_YEAR} inclusive.</HelperText>}
//             </div>

//             {/* Divider */}
//             <div style={{ borderTop: "1px solid #f3f4f6", margin: "4px 0" }} />
//             <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, color: "#9ca3af", letterSpacing: "0.08em", textTransform: "uppercase", margin: 0 }}>
//               Document Uploads
//             </p>

//             {/* Marksheet */}
//             <FileUpload
//               label="Marksheet / Transcript"
//               required
//               value={form.marksheet_upload}
//               error={errors.marksheet_upload}
//               onChange={(file, err) => {
//                 setForm(f => ({ ...f, marksheet_upload: file }));
//                 setErrors(e => ({ ...e, marksheet_upload: err || "" }));
//               }}
//             />

//             {/* Certificate */}
//             <FileUpload
//               label="Degree Certificate"
//               required
//               value={form.certificate_upload}
//               error={errors.certificate_upload}
//               onChange={(file, err) => {
//                 setForm(f => ({ ...f, certificate_upload: file }));
//                 setErrors(e => ({ ...e, certificate_upload: err || "" }));
//               }}
//             />

//             {/* College ID — optional */}
//             <FileUpload
//               label="College ID Card (Optional)"
//               value={form.college_id_upload}
//               error={errors.college_id_upload}
//               onChange={(file, err) => {
//                 setForm(f => ({ ...f, college_id_upload: file }));
//                 setErrors(e => ({ ...e, college_id_upload: err || "" }));
//               }}
//             />

//           </div>

//           {/* CTA */}
//           <div style={{ marginTop: 32, display: "flex", flexDirection: "column", gap: 10 }}>
//             <button
//               onClick={handleSubmit}
//               style={{
//                 width: "100%", padding: "15px",
//                 background: "#111827", color: "#fff",
//                 border: "none", borderRadius: 12,
//                 fontSize: 15, fontWeight: 700,
//                 fontFamily: "'DM Sans', sans-serif",
//                 cursor: "pointer", letterSpacing: "-0.01em",
//                 transition: "background 0.2s"
//               }}
//               onMouseEnter={e => e.target.style.background = "#1d4ed8"}
//               onMouseLeave={e => e.target.style.background = "#111827"}
//             >
//               Submit Education Details →
//             </button>
//             {onBack && (
//               <button
//                 onClick={onBack}
//                 style={{
//                   width: "100%", padding: "13px",
//                   background: "transparent", color: "#374151",
//                   border: "1.5px solid #e5e7eb", borderRadius: 12,
//                   fontSize: 14, fontWeight: 600,
//                   fontFamily: "'DM Sans', sans-serif",
//                   cursor: "pointer", transition: "border-color 0.2s"
//                 }}
//                 onMouseEnter={e => e.target.style.borderColor = "#9ca3af"}
//                 onMouseLeave={e => e.target.style.borderColor = "#e5e7eb"}
//               >
//                 ← Back to identity proof
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // ─── Styles ───────────────────────────────────────────────────────────────────
// const pageStyle = {
//   minHeight: "100vh",
//   background: "#f3f4f6",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   padding: "40px 20px 60px",
//   fontFamily: "'DM Sans', sans-serif",
// };

// const cardStyle = {
//   width: "100%",
//   maxWidth: 640,
//   background: "#ffffff",
//   borderRadius: 16,
//   padding: "32px 36px",
//   boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)",
// };


import EducationForm from "@/components/education-claim/EducationForm";

export default function EducationPage() {
  return <EducationForm />;
}