import React from "react";
import ModalPortal from "./ModalPortal"; 

const ConfirmModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <ModalPortal>
      <div className="fixed inset-0 modal-wrapper bg-opacity-50 flex items-center justify-center z-[1000]">
        <div className="bg-white rounded-lg p-6 shadow-xl max-w-sm w-full">
          <h2 className="text-lg font-light mb-4">
            Are you sure you want to{" "}
            <span className="text-red-600">delete</span> this?
          </h2>
          <div className="flex justify-end gap-4">
            <button
              className="font-light px-4 py-2 rounded hover:bg-[rgb(230,235,230)] cursor-pointer"
              onClick={onClose}
            >
              No
            </button>
            <button
              className="font-light px-4 py-2 rounded hover:bg-[rgb(230,235,230)] cursor-pointer"
              onClick={onConfirm}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </ModalPortal>
  );
};

export default ConfirmModal;
