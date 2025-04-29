import React, { useState, useEffect } from 'react';

const EditModal = ({ isOpen, onClose, onSave, initialTitle, initialContent }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    setTitle(initialTitle || "");
    setContent(initialContent || "");
  }, [initialTitle, initialContent]);

  if (!isOpen) return null;

  return (
    <div className="modal-wrapper  fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-xl max-w-lg w-full">
        <h2 className="text-lg font-semibold mb-4">Edit Note</h2>
        <input
          type="text"
          className="w-full p-2 mb-3 border border-gray-300 rounded"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={6}
        ></textarea>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            onClick={() => onSave(title, content)}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
