import React from "react";

export default function Button({ as: Tag = "button", className = "", ...props }) {
  return (
    <Tag
      className={
        "inline-flex items-center justify-center rounded-md px-4 py-2 font-semibold " +
        "bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 " +
        "focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 " + className
      }
      {...props}
    />
  );
}
