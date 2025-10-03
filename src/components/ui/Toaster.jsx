import React from "react";

// super-lightweight toast (no library)
export function useToast() {
  const [toasts, setToasts] = React.useState([]);
  function show(msg, kind="info") {
    const id = crypto.randomUUID();
    setToasts(t => [...t, { id, msg, kind }]);
    setTimeout(() => setToasts(t => t.filter(x => x.id !== id)), 2500);
  }
  return { show, toasts, setToasts };
}

export function ToastHost({ toasts }) {
  return (
    <div className="fixed top-4 right-4 z-50 grid gap-2">
      {toasts.map(t => (
        <div key={t.id} className={`px-4 py-2 rounded-lg text-sm shadow
          ${t.kind==="success" ? "bg-green-600 text-white"
          : t.kind==="error" ? "bg-red-600 text-white" : "bg-gray-800 text-white"}`}>
          {t.msg}
        </div>
      ))}
    </div>
  );
}
