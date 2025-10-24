import { X } from 'lucide-react';
import type { ReactNode } from 'react';

type ModalProps = {
    isOpen: boolean
    title: string
    children:ReactNode
    width?: string
    handleClose: () => void
}

const Modal = ({ isOpen, title,width = "max-w-lg", children, handleClose }: ModalProps) => {
    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50 p-3">
                    <div className={`relative bg-white rounded-lg shadow-lg p-6 w-full ${width} max-h-[80vh] overflow-y-auto`} data-testid="modal">
                        <button
                            onClick={handleClose}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            <X />
                        </button>
                        <h2 className="text-xl font-bold text-black mb-4">{title}</h2>
                        {children}
                    </div>
                </div>
            )}

        </>
    );
};

export default Modal;
