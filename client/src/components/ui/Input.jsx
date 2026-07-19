export default function Input({
  label,
  id,
  className = "",
  labelClassName = "",
  ...props
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label htmlFor={id} className={`block text-sm font-medium text-slate-700 ${labelClassName}`}>
          {label}
        </label>
      )}
      <input
        id={id}
        className={`w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none transition duration-300 placeholder:text-slate-400 hover:border-slate-300 focus:border-brand-600 focus:ring-4 focus:ring-brand-500/10 ${className}`}
        {...props}
      />
    </div>
  );
}
