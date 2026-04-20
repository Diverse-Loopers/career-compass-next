export default function TextInput({
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  min,
  max,
}) {
  return (
    <input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      className={`w-full px-3.5 py-[11px] rounded-[10px] text-sm text-gray-900 outline-none
        border-[1.5px] transition-colors duration-200 font-[inherit]
        ${error
          ? "border-red-300 bg-red-50 focus:border-red-500"
          : "border-gray-200 bg-gray-50 focus:border-blue-700 focus:bg-white"
        }`}
    />
  );
}