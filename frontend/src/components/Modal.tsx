import { ReactNode } from "react";

const Modal = ({
  isOpen,
  onClose,
  formType,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  formType: string;
  children: ReactNode;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-indigo-300 rounded-2xl shadow-lg p-6 w-full max-w-xl">
        <div className="flex justify-between items-center border-b pb-3">
          {formType && (
            <h2 className="text-xl font-semibold">
              {formType.replace("-", " ").toUpperCase()}
            </h2>
          )}
          <button
            onClick={onClose}
            className="cursor-pointer bg-gray-300 text-gray-800 hover:bg-gray-400 py-1 px-2"
          >
            &times;
          </button>
        </div>
        <div className="py-4 my-4">{children}</div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="cursor-pointer px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
