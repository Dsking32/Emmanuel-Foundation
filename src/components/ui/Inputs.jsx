import React from "react";

export const Input = React.forwardRef(({ label, error, className="", ...props }, ref) => (
  <label className="grid gap-1">
    {label && <span className="text-sm font-semibold">{label}</span>}
    <input ref={ref} className={`border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--blue)] ${className}`} {...props}/>
    {error && <span className="text-xs text-red-600">{error}</span>}
  </label>
));

export const Select = React.forwardRef(({ label, error, children, className="", ...props }, ref) => (
  <label className="grid gap-1">
    {label && <span className="text-sm font-semibold">{label}</span>}
    <select ref={ref} className={`border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-[var(--blue)] ${className}`} {...props}>
      {children}
    </select>
    {error && <span className="text-xs text-red-600">{error}</span>}
  </label>
));

export const NigeriaStates = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River",
  "Delta","Ebonyi","Edo","Ekiti","Enugu","FCT","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina",
  "Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers",
  "Sokoto","Taraba","Yobe","Zamfara"
];
