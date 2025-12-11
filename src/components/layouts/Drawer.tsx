import { X } from "lucide-react";
import type { ReactNode } from "react";

type DrawerProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    position?: "left" | "right";
}

const Drawer = ({ isOpen, onClose, children, position }: DrawerProps) => {
    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
                    onClick={onClose}
                />
            )}

            <div
                className={`fixed top-0 h-full w-72 bg-white  overflow-y-auto md:overflow-visible shadow-lg z-50 transform transition-transform duration-300 ease-in-out
          ${position === "left" ? "left-0" : "right-0"}
          ${isOpen ? "translate-x-0" : position === "left" ? "-translate-x-full" : "translate-x-full"}
        `}
            >
                <button
                    className="absolute top-4 right-4 text-gray-600 hover:text-black"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>

                <div className="mt-12 relative p-4">{children}</div>
            </div>
        </>
    );
}

export default Drawer