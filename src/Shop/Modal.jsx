import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative glass-panel w-[92%] max-w-[560px] max-h-[80vh] overflow-y-auto rounded-3xl shadow-lg p-6">
        {children}
      </div>
    </div>
  );
};

export default Modal;
