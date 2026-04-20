export default function HelperText({ children, error }) {
  return (
    <p className={`mt-1.5 text-[12px] leading-snug ${error ? "text-red-500" : "text-gray-500"}`}>
      {children}
    </p>
  );
}