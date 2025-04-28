import React, { useEffect, useRef, useState } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import FetchNotes from './FetchNotes';

const QuillEditor = () => {
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const [title, setTitle] = useState('');

  const db = getFirestore();
  const colRef = collection(db, 'keepSterData');
  const auth = getAuth();

  useEffect(() => {
    if (!quillRef.current && editorRef.current) { 
      quillRef.current = new Quill(editorRef.current, {
        theme: 'snow',
        placeholder: 'Write your note with keepSter...',
        modules: {
          toolbar: [
            [{ header: [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['link', 'image'],
            ['clean']
          ]
        }
      });
    }
  }, []);

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error('User not logged in.');
      return;
    }

    const contentHtml = quillRef.current.root.innerHTML;
    const finalTitle = title.trim() || 'Untitled';

    if(quillRef && title === '') {
      alert('Please write something before submitting!');
      return;
    }

    try {
      await addDoc(colRef, {
        title: finalTitle,
        content: contentHtml,
        uid: user.uid,
        createdAt: serverTimestamp(),
      });

      setTitle('');
      quillRef.current.setContents([{ insert: '\n' }]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <>
      <div className="editor-container" style={{ maxWidth: '512px', margin: 'auto'}}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            width: '100%',
            padding: '8px',
            marginBottom: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            border: '1px solid #ccc',
            borderRadius: '8px',
            outline: 'none',
          }}
        />

        <div
          ref={editorRef}
          style={{
            height: '100px',
            marginBottom: '20px',
            backgroundColor: '#fff',
          }}
        />

        <button
          onClick={handleSubmit}
          className="submit-btn center flex justify-center pt-2"
        >
          Submit
        </button>
      </div>

      <FetchNotes />
    </>
  );
};

export default QuillEditor;
