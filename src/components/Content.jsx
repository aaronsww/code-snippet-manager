import { useState, useEffect, useRef } from "react";
import axios from "axios";
import "/src/App.css";
import * as monaco from "monaco-editor/esm/vs/editor/editor.api";

function Content({ mainId, id, code }) {
  console.log(mainId, "and", id);
  const [content, setContent] = useState();

  const [editor, setEditor] = useState(null);
  const editorRef = useRef(null);

  useEffect(() => {
    setContent(code);
  }, [code]);

  useEffect(() => {
    if (editorRef.current && !editor) {
      const newEditor = monaco.editor.create(editorRef.current, {
        value: code,
        language: "javascript", 
        theme: "vs-dark", 
        automaticLayout: true,
      });

      newEditor.onDidChangeModelContent(() => {
        // Handle editor content change if needed
      });

      setEditor(newEditor);
    }
  }, [code, editor]);

  const updateEditorContent = (newCode) => {
    if (editor) {
      editor.setValue(newCode);
    }
  };

  useEffect(() => {
    if (editor) {
      editor.setValue(code);
    }
  }, [code, editor]);

  const handleUpdate = async (mainId, id, newCode) => {
    console.log(newCode);
    try {
      const response = await axios.patch(
        `http://localhost:5000/api/languages/${mainId}/snippets/${id}/update-snippet`,
        {
          code: newCode,
        }
      );
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="content">
      <div ref={editorRef} style={{ height: "400px" }}></div>
      <button onClick={() => handleUpdate(mainId, id, editor.getValue())}>
        Send
      </button>
      <button onClick={() => updateEditorContent("New code")}>
        Update Editor Content
      </button>
    </div>
  );
}

export default Content;

{
  /* <textarea
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={() => handleUpdate(mainId, id, content)}>Send</button> */
}
