// "use client";

// import { DetailRow, FileRow, DetailSection } from "@/components/education-claim/ui/Detailcard";



// export default function PreviewModal({
//   isOpen,
//   title,
//   textFields = [],
//   fileFields = [],
//   data = {},
//   onEdit,
//   onConfirm,
//   isSubmitting,
// }) {
//   if (!isOpen) return null;

//   return (
//     // Backdrop
//     <div
//       className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
//         flex items-center justify-center px-3 sm:px-5"
//       onClick={onEdit}              // click outside = close
//     >
//       {/* Modal box */}
//       <div
//         className="w-full max-w-[580px] bg-white rounded-2xl shadow-2xl
//           max-h-[90vh] overflow-y-auto"
//         onClick={(e) => e.stopPropagation()}   // prevent backdrop close
//       >
//         {/* Header */}
//         <div className="sticky top-0 bg-white px-6 pt-6 pb-4
//           border-b border-gray-100 flex items-start justify-between gap-4 z-10">
//           <div>
//             <h2 className="font-['DM_Sans'] text-[18px] font-bold text-gray-900">
//               {title}
//             </h2>
//             <p className="text-[13px] text-gray-500 mt-0.5">
//               Review before submitting. Click Edit to make changes.
//             </p>
//           </div>
//           {/* Close X */}
//           <button
//             onClick={onEdit}
//             className="text-gray-400 hover:text-gray-700 transition-colors mt-0.5"
//           >
//             <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
//               stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
//               <line x1="18" y1="6" x2="6" y2="18"/>
//               <line x1="6" y1="6" x2="18" y2="18"/>
//             </svg>
//           </button>
//         </div>

//         {/* Body */}
//         <div className="px-6 py-5 flex flex-col gap-4">

//           {/* Info banner */}
//           <div className="rounded-xl bg-blue-50 border border-blue-100
//             px-4 py-3 text-[13px] text-blue-700 leading-relaxed">
//             Once submitted, details go for verification and cannot be edited
//             until the review is complete.
//           </div>

//           {/* Text fields */}
//           <DetailSection title="Basic Details">
//             {textFields.map(({ key, label }) => (
//               <DetailRow key={key} label={label} value={data[key]} missing={!data[key]} />
//             ))}
//           </DetailSection>

//           {/* File fields */}
//           <div className="border-t border-gray-100" />
//           <DetailSection title="Uploaded Documents">
//             {fileFields.map(({ key, label, required }) => (
//               <FileRow key={key} label={label} file={data[key]} required={required} />
//             ))}
//           </DetailSection>
//         </div>

//         {/* Footer buttons */}
//         <div className="sticky bottom-0 bg-white border-t border-gray-100
//           px-6 py-4 flex flex-col sm:flex-row gap-2.5">
//           <button
//             onClick={onEdit}
//             className="w-full sm:w-auto flex-1 py-[13px] border-[1.5px] border-gray-200
//               hover:border-gray-400 rounded-xl text-[14px] font-semibold text-gray-700
//               transition-colors duration-200"
//           >
//             ← Edit details
//           </button>
//           <button
//             onClick={onConfirm}
//             disabled={isSubmitting}
//             className="w-full sm:w-auto flex-1 py-[13px] bg-gray-900 hover:bg-blue-700
//               disabled:bg-gray-400 text-white rounded-xl text-[14px] font-bold
//               transition-colors duration-200"
//           >
//             {isSubmitting ? "Submitting..." : "Confirm & Submit →"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { DetailRow, DetailSection } from "@/components/education-claim/ui/Detailcard";

// ─── File type helpers ────────────────────────────────────────────────────────
const isImage = (file) => file?.type?.startsWith("image/");
const isPDF = (file) => file?.type === "application/pdf";

// ─── Individual file preview row ──────────────────────────────────────────────
function FilePreviewRow({ label, file, required }) {
  const [objectUrl, setObjectUrl] = useState(null);
  const [lightbox, setLightbox] = useState(false);

  // Create object URL once when file arrives, revoke on cleanup
  useEffect(() => {
    if (!file) return;
    const url = URL.createObjectURL(file);
    setObjectUrl(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  return (
    <div className="py-3.5 border-b border-gray-100 last:border-0">
      {/* Label row */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-bold tracking-widest uppercase text-gray-400">
          {label}
          {!required && (
            <span className="ml-1.5 text-[10px] font-medium text-gray-300 normal-case tracking-normal">
              optional
            </span>
          )}
        </span>
        {file && (
          <span className="text-[11px] text-gray-400">
            {(file.size / 1024).toFixed(0)} KB
          </span>
        )}
      </div>

      {/* No file */}
      {!file && (
        <p className="text-[13px] text-gray-300 italic">No file uploaded</p>
      )}

      {/* Image preview */}
      {file && isImage(file) && objectUrl && (
        <>
          <div
            className="relative rounded-xl overflow-hidden border border-gray-100
              cursor-zoom-in bg-gray-50 h-36 sm:h-44"
            onClick={() => setLightbox(true)}
          >
            <img
              src={objectUrl}
              alt={label}
              className="w-full h-full object-contain"
            />
            {/* Zoom hint */}
            <div className="absolute bottom-2 right-2 bg-black/50 text-white
              text-[11px] px-2 py-0.5 rounded-full">
              Click to enlarge
            </div>
          </div>
          <p className="mt-1.5 text-[12px] text-gray-400 truncate">{file.name}</p>

          {/* Lightbox */}
          {lightbox && (
            <div
              className="fixed inset-0 z-[60] bg-black/80 flex items-center
                justify-center p-4"
              onClick={() => setLightbox(false)}
            >
              <img
                src={objectUrl}
                alt={label}
                className="max-w-full max-h-full rounded-xl object-contain"
              />
              <button
                className="absolute top-4 right-4 text-white/80 hover:text-white"
                onClick={() => setLightbox(false)}
              >
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
                  stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <line x1="18" y1="6" x2="6" y2="18"/>
                  <line x1="6" y1="6" x2="18" y2="18"/>
                </svg>
              </button>
            </div>
          )}
        </>
      )}

      {/* PDF preview */}
      {file && isPDF(file) && objectUrl && (
        <div className="rounded-xl overflow-hidden border border-gray-100 bg-gray-50">
          <iframe
            src={objectUrl}
            title={label}
            className="w-full h-52 sm:h-64"
          />
          <div className="flex items-center justify-between px-3 py-2
            border-t border-gray-100">
            <p className="text-[12px] text-gray-400 truncate">{file.name}</p>
            <a
              href={objectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[12px] text-blue-700 font-semibold hover:underline
                flex-shrink-0 ml-3"
              onClick={(e) => e.stopPropagation()}
            >
              Open in new tab ↗
            </a>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Main modal ───────────────────────────────────────────────────────────────
export default function PreviewModal({
  isOpen,
  title,
  textFields = [],
  fileFields = [],
  data = {},
  onEdit,
  onConfirm,
  isSubmitting,
}) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm
        flex items-end sm:items-center justify-center px-0 sm:px-5"
      onClick={onEdit}
    >
      {/* Modal box — slides up on mobile, centered on desktop */}
      <div
        className="w-full sm:max-w-[600px] bg-white sm:rounded-2xl
          rounded-t-2xl shadow-2xl max-h-[92vh] sm:max-h-[88vh]
          flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >

        {/* Drag handle — mobile only */}
        <div className="sm:hidden flex justify-center pt-3 pb-1 flex-shrink-0">
          <div className="w-10 h-1 bg-gray-200 rounded-full" />
        </div>

        {/* Sticky header */}
        <div className="flex-shrink-0 px-5 sm:px-6 pt-4 sm:pt-6 pb-4
          border-b border-gray-100 flex items-start justify-between gap-4">
          <div>
            <h2 className="font-['DM_Sans'] text-[18px] font-bold text-gray-900">
              {title}
            </h2>
            <p className="text-[13px] text-gray-500 mt-0.5">
              Review before submitting. Click Edit to make changes.
            </p>
          </div>
          <button
            onClick={onEdit}
            className="text-gray-400 hover:text-gray-700 transition-colors
              mt-0.5 flex-shrink-0 p-1"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
              stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5
          flex flex-col gap-5">

          {/* Info banner */}
          <div className="rounded-xl bg-blue-50 border border-blue-100
            px-4 py-3 flex gap-3 items-start">
            <svg className="text-blue-500 flex-shrink-0 mt-0.5" width="15" height="15"
              viewBox="0 0 24 24" fill="none" stroke="currentColor"
              strokeWidth="2.5" strokeLinecap="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="8" x2="12" y2="12"/>
              <line x1="12" y1="16" x2="12.01" y2="16"/>
            </svg>
            <p className="text-[13px] text-blue-700 leading-relaxed">
              Once submitted, your details go for verification and cannot be
              edited until the review is complete.
            </p>
          </div>

          {/* Text fields */}
          <DetailSection title="Basic Details">
            {textFields.map(({ key, label }) => (
              <DetailRow
                key={key}
                label={label}
                value={data[key]}
                missing={!data[key]}
              />
            ))}
          </DetailSection>

          {/* File previews */}
          <div className="border-t border-gray-100" />
          <DetailSection title="Uploaded Documents">
            {fileFields.map(({ key, label, required }) => (
              <FilePreviewRow
                key={key}
                label={label}
                file={data[key]}
                required={required}
              />
            ))}
          </DetailSection>

        </div>

        {/* Sticky footer */}
        <div className="flex-shrink-0 border-t border-gray-100 px-5 sm:px-6
          py-4 flex flex-col sm:flex-row gap-2.5 bg-white">
          <button
            type="button"
            onClick={onEdit}
            className="w-full sm:flex-1 py-[13px] border-[1.5px] border-gray-200
              hover:border-gray-400 rounded-xl text-[14px] font-semibold
              text-gray-700 transition-colors duration-200"
          >
            ← Edit details
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full sm:flex-1 py-[13px] bg-gray-900 hover:bg-blue-700
              disabled:bg-gray-400 text-white rounded-xl text-[14px] font-bold
              transition-colors duration-200"
          >
            {isSubmitting ? "Submitting..." : "Confirm & Submit →"}
          </button>
        </div>

      </div>
    </div>
  );
}