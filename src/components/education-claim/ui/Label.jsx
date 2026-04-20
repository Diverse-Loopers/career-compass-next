export default function Label({ children, required, htmlFor }) {
  return (
    <label
      htmlFor={htmlFor}
      className="block mb-1.5 text-[11px] font-bold tracking-widest text-gray-700 uppercase"
    >
      {children}
      {required && <span className="text-red-500 ml-0.5">*</span>}
    </label>
  );
}