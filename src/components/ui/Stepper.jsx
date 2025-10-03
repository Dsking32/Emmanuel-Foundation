import React from "react";

export default function Stepper({ steps, current=0 }) {
  return (
    <ol className="flex items-center gap-2 overflow-x-auto no-scrollbar">
      {steps.map((s, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={s} className="flex items-center gap-2">
            <span
              className={[
                "inline-flex items-center justify-center size-7 rounded-full border text-xs font-bold",
                done ? "bg-[hsl(var(--brand))] text-white border-[hsl(var(--brand))]"
                     : active ? "bg-white border-[hsl(var(--brand))] text-[hsl(var(--brand))]"
                              : "bg-white border-gray-300 text-gray-500"
              ].join(" ")}
              aria-current={active?"step":undefined}
            >
              {i+1}
            </span>
            <span className={["text-xs sm:text-sm font-medium whitespace-nowrap",
              active ? "text-[hsl(var(--brand))]" : done ? "text-gray-600 line-through" : "text-gray-500"
            ].join(" ")}>
              {s}
            </span>
            {i < steps.length-1 && <span className="w-8 h-px bg-gray-200 mx-1 hidden sm:inline" />}
          </li>
        );
      })}
    </ol>
  );
}
