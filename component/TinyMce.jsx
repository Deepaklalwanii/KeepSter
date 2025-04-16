import { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import FetchNotes from './FetchNotes';
import { serverTimestamp } from 'firebase/firestore';

const TinyMce = () => {
  const editorRef = useRef(null);
  const db = getFirestore();
  const colRef = collection(db, 'keepSterData');
  const auth = getAuth();

  const handleSubmit = async () => {
    const user = auth.currentUser;

    if (!user) {
      console.error("User not logged in.");
      return;
    }

    if (editorRef.current) {
      const fullHtmlContent = editorRef.current.getContent();
      const parser = new DOMParser();
      const doc = parser.parseFromString(fullHtmlContent, 'text/html');
      const title = doc.querySelector('h4')?.textContent.trim() || 'Untitled';

      try {
        await addDoc(colRef, {
          title: title,
          content: doc.body.innerHTML.replace(/<h4[^>]*>.*?<\/h4>/i, "").trim(),
          uid: user.uid, // ✅ Link note to the current user
          createdAt: serverTimestamp(), // better & consistent)
        });

        editorRef.current.setContent("<h4>Title</h4><p>Start writing your note...</p>");
      } catch (error) {
        console.error("Error adding note:", error);
      }
    }
  };

  return (
    <>
      <Editor
        apiKey="z17s0bkn9ktnxc0k80qd7rf78qm4k2vt834u1p0v1zcckw4b"
        onInit={(_evt, editor) => (editorRef.current = editor)}
        initialValue="<h4>Title</h4><p>Start writing your note...</p>"
        init={{
          height: 400,
          menubar: 'file edit view insert format tools table help',
          plugins: [
            'advlist autolink lists link image charmap preview anchor',
            'searchreplace visualblocks code fullscreen',
            'insertdatetime media table code help wordcount',
          ],
          toolbar:
            'undo redo | blocks fontfamily fontsize | ' +
            'bold italic underline strikethrough forecolor backcolor | ' +
            'alignleft aligncenter alignright alignjustify | ' +
            'bullist numlist outdent indent | ' +
            'link image media table | removeformat code fullscreen | help',
          content_style: `body { font-family:Helvetica,Arial,sans-serif; font-size:14px }::-webkit-scrollbar { display: none !important; }`,
        }}
      />
      <button
        onClick={handleSubmit}
        className="submit-btn center flex justify-center pt-2
         "
      >
        Submit
      </button>

      <FetchNotes />
    </>
  );
};

export default TinyMce;
