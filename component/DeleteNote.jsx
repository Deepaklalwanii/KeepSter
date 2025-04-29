import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./Firebase";
import { useState } from "react";
import ConfirmModal from "./ConfirmModal"; // adjust path if needed


function DeleteNote({ noteId }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const noteRef = doc(db, "keepSterData", noteId);
      await deleteDoc(noteRef);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };

  return (
    <>
    <div className="note-actions flex justify-between items-center gap-4">
      <span>
        
      </span>
      <i
        className="delete-icon bi bi-trash cursor-pointer text-black-600 hover:text-red-800"
        onClick={handleDeleteClick}
      ></i>
  </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}

export default DeleteNote;
