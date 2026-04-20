import { SuccessCheckIcon } from "@/components/education-claim/ui/Icons";

export default function SuccessState() {
  return (
    <div className="w-full max-w-[640px] bg-white rounded-2xl px-9 py-8 shadow-[0_1px_3px_rgba(0,0,0,0.06),0_4px_16px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col items-center py-8 text-center">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4 text-green-600">
          <SuccessCheckIcon />
        </div>
        <h2 className="font-['Playfair_Display'] text-2xl font-bold text-gray-900 mb-2">
          Education details saved!
        </h2>
        <p className="text-gray-500 text-sm">
          Your education information has been submitted for verification.
        </p>
      </div>
    </div>
  );
}