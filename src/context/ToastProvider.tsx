import { useState, type ReactNode } from "react";
import { ToastContext, type ToastMessage } from "./ToastContext";
import { Toast } from "../components/common/Toast";

export const ToastProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [toast, setToast] = useState<ToastMessage | null>(null);

  const showToast = (message: string, options?: Omit<ToastMessage, "id" | "message">) => {
    const id = Date.now();
    setToast({ id, message, ...options });
  };

  const removeToast = (userOnClose?: () => void) => {
    setToast(null);
    if (userOnClose) userOnClose();
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
        {toast && (
          <Toast
            key={toast.id}
            {...toast}
            onClose={() => removeToast(toast.onClose)}
          />
        )}
      </div>
    </ToastContext.Provider>
  );
};
