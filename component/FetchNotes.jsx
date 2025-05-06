import React, { useState, useEffect, useRef } from "react";
import {
  getFirestore,
  collection,
  query,
  where,
  onSnapshot,
  doc,
  updateDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import DeleteNote from "./DeleteNote";

const FetchNotes = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editNoteId, setEditNoteId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const contentRef = useRef(null);
  const db = getFirestore();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setNotes([]);
        setLoading(false);
        return;
      }

      const colRef = collection(db, "keepSterData");
      const userQuery = query(colRef, where("uid", "==", user.uid));

      const unsubscribeSnapshot = onSnapshot(
        userQuery,
        (snapshot) => {
          const notesData = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotes(notesData);
          setLoading(false);
        },
        (error) => {
          console.error("Error fetching notes: ", error);
          setLoading(false);
        }
      );

      return () => unsubscribeSnapshot();
    });

    return () => unsubscribeAuth();
  }, []);

  const handleEdit = (note) => {
    setEditNoteId(note.id);
    setEditTitle(note.title);

    // Delay ensures DOM is ready before setting HTML
    setTimeout(() => {
      if (contentRef.current) {
        contentRef.current.innerHTML = note.content;
        contentRef.current.focus();
      }
    }, 0);
  };

  const handleCancelEdit = () => {
    setEditNoteId(null);
    setEditTitle("");
    if (contentRef.current) {
      contentRef.current.innerHTML = "";
    }
  };

  const handleSaveEdit = async () => {
    const updatedContent = contentRef.current?.innerHTML || "";

    if (!editTitle.trim() || !updatedContent.trim()) return;

    const noteRef = doc(db, "keepSterData", editNoteId);
    try {
      await updateDoc(noteRef, {
        title: editTitle,
        content: updatedContent,
      });
      handleCancelEdit();
    } catch (err) {
      console.error("Failed to update note:", err);
    }
  };

  return (
    <div className="noteContainer">
      {loading ? (
        <div className="notes-empty">
          <p className="bold">Your notes are loading...</p>
        </div>
      ) : notes.length > 0 ? (
        notes.map((note) => (
          <div className="note" key={note.id}>
            {editNoteId === note.id ? (
              <>
                <div className="noteHeader">
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    className="edit-title-input"
                  />
                  <div className="flex gap-1.5">
                    <button className="cursor-pointer" onClick={handleSaveEdit}>
                      <i className="bi bi-check2"></i>
                    </button>
                    <button className="cursor-pointer" onClick={handleCancelEdit}>
                      <i className="bi bi-x"></i>
                    </button>
                  </div>
                </div>
                <div
                  className="noteContent editable-content"
                  contentEditable
                  ref={contentRef}
                  suppressContentEditableWarning={true}
                />
              </>
            ) : (
              <>
                <div className="noteHeader">
                  <strong>
                    <h4>{note.title}</h4>
                  </strong>
                  <div className="flex">
                    <button
                      className="cursor-pointer"
                      onClick={() => handleEdit(note)}
                    >
                      <i className="bi bi-pen"></i>
                    </button>
                    <DeleteNote noteId={note.id} />
                  </div>
                </div>
                <div
                  className="noteContent"
                  dangerouslySetInnerHTML={{ __html: note.content }}
                />
              </>
            )}
          </div>
        ))
      ) : (
        <div className="notes-empty">
          <p>No notes available.</p>
        </div>
      )}
    </div>
  );
};

export default FetchNotes;
