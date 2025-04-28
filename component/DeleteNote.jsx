import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./Firebase";



function DeleteNote({ noteId }) {
  const handleDeleteNote = async () => {
    try {
      const noteRef = doc(db, "keepSterData", noteId);
      await deleteDoc(noteRef);
    } catch (error) {
      console.error("Error deleting note:", error);
    }
  };



  return (
    <>
      <i
        className="delete-icon bi bi-trash"
        onClick={handleDeleteNote}
      ></i>
    </>
  );
}

export default DeleteNote;
