import { createContext } from "react";

type ToastType = "success" | "error" | "info";

export interface ToastMessage {
  id: number;
  message: string;
  type?: ToastType;
  actionLabel?: string;
  onAction?: () => void;
  onClose?: () => void;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, options?: Omit<ToastMessage, "id" | "message">) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(undefined);
