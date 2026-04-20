"use client";

import { useRef, useState } from "react";
import Label from "@/components/education-claim/ui/Label";
import HelperText from "@/components/education-claim/ui/HelperText";
import { UploadIcon, FileIcon, XIcon } from "@/components/education-claim/ui/Icons";

export default function FileUpload({
  label,
  required,
  value,
  onChange,
  error,
  helperText,
}) {
  const inputRef = useRef(null);
  const [drag, setDrag] = useState(false);

  const handleFile = (file) => {
    if (!file) return;
    const allowed = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowed.includes(file.type)) {
      onChange(null, "Only JPG, PNG, or PDF files are accepted.");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      onChange(null, "File must be under 5 MB.");
      return;
    }
    onChange(file, null);
  };

  return (
    <div>
      <Label required={required}>{label}</Label>

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => { e.preventDefault(); setDrag(true); }}
        onDragLeave={() => setDrag(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDrag(false);
          handleFile(e.dataTransfer.files[0]);
        }}
        className={`rounded-[10px] px-4 py-[18px] flex items-center justify-center gap-2.5
          cursor-pointer select-none border-[1.5px] border-dashed transition-all duration-200
          ${error
            ? "border-red-300 bg-red-50"
            : drag
            ? "border-blue-700 bg-blue-50"
            : "border-gray-300 bg-gray-50 hover:border-blue-700 hover:bg-blue-50"
          }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,application/pdf"
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />

        {value ? (
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <span className="text-blue-700"><FileIcon /></span>
              <span className="text-[13px] text-gray-700 font-medium">{value.name}</span>
              <span className="text-[12px] text-gray-400">
                ({(value.size / 1024).toFixed(0)} KB)
              </span>
            </div>
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); onChange(null, null); }}
              className="text-gray-400 hover:text-gray-600 p-0.5"
            >
              <XIcon />
            </button>
          </div>
        ) : (
          <>
            <span className="text-gray-400"><UploadIcon /></span>
            <span className="text-[13px] text-gray-500">
              <span className="text-blue-700 font-semibold">Upload file</span> or drag and drop
            </span>
          </>
        )}
      </div>

      <HelperText error={!!error}>
        {error || helperText || "Accepted: JPG, PNG, PDF · Max 5 MB"}
      </HelperText>
    </div>
  );
}