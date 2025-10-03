import React from "react";

export function Field({ label, value, onChange, type="text", placeholder, required, help }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-semibold">{label}{required && <b className="text-red-600"> *</b>}</span>
      <input
        type={type}
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        placeholder={placeholder}
        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
        required={required}
      />
      {help && <p className="text-xs text-gray-500">{help}</p>}
    </label>
  );
}

export function Select({ label, value, onChange, options=[], required, disabled, help, placeholder="Select..." }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-semibold">{label}{required && <b className="text-red-600"> *</b>}</span>
      <select
        value={value}
        onChange={(e)=>onChange(e.target.value)}
        className="border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[hsl(var(--brand))]"
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map(o => <option key={o.value ?? o} value={o.value ?? o}>{o.label ?? o}</option>)}
      </select>
      {help && <p className="text-xs text-gray-500">{help}</p>}
    </label>
  );
}

export function FileField({ label, value, onChange, required, accept=".pdf,.jpg,.jpeg,.png", help }) {
  return (
    <label className="grid gap-1">
      <span className="text-sm font-semibold">{label}{required && <b className="text-red-600"> *</b>}</span>
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className="border rounded-lg px-3 py-2 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:bg-gray-100"
      />
      {value && <span className="text-xs text-gray-600">{value}</span>}
      {help && <p className="text-xs text-gray-500">{help}</p>}
    </label>
  );
}

export function Help({ children }) {
  return <p className="text-xs text-gray-500">{children}</p>;
}
