import React from "react";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center">
      {/* Dark Overlay */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className="relative bg-white w-[90%] max-w-[500px] max-h-[80vh] overflow-y-auto rounded-lg shadow-lg p-5">
        {children}
      </div>
    </div>
  );
};

export default Modal;
