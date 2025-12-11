import { useEffect } from "react";

interface ToastProps {
  id: number;
  message: string;
  type?: "success" | "error" | "info";
  onClose: () => void;
  duration?: number;
  actionLabel?: string;
  onAction?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type = "info",
  onClose,
  duration = 5000,
  actionLabel,
  onAction,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(), duration);
    return () => clearTimeout(timer);
  }, [id, onClose, duration]);

  const bgColors = {
    success: "bg-green-600",
    error: "bg-red-600",
    info: "bg-gray-800",
  };

  return (
    <div
      className={`animate-slide-up fixed bottom-5 right-5 ${bgColors[type]} text-white px-4 py-2 rounded shadow-lg flex items-center gap-3`}
    >
      <span>{message}</span>

      {actionLabel && onAction && (
        <button
          onClick={() => {
            onAction();
            onClose();
          }}
          className="text-blue-200 font-medium cursor-pointer hover:underline"
        >
          {actionLabel}
        </button>
      )}

      <button onClick={() => onClose()} className="ml-2 cursor-pointer text-white">
        ✕
      </button>
    </div>
  );
};
