import { useState, useEffect } from "react";
import "/src/App.css";
import axios from "axios";
import Content from "./Content";

function Snippets({ id, snippets }) {
  const [activeSnippetId, setActiveSnippetId] = useState(
    "64442e5329d4302f89f273e7"
  );

  const [showInput, setShowInput] = useState();

  const [currentSnippet, setCurrentSnippet] = useState({
    name: snippets[0].title,
    content: snippets[0].code,
    id: snippets[0].id,
  });
  const [newSnippet, setNewSnippet] = useState({
    name: "",
    content: "",
  });

  console.log(snippets.length, "my snippets:", snippets, "and", id);

  const handleClick = (name, content, id) => {
    setCurrentSnippet({ name, content, id });
    setActiveSnippetId(id);
  };

  const handleDelete = async (snippetId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/languages/${id}/snippets/${snippetId}`
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAdd = async (title, code) => {
    if (newSnippet.name) {
      console.log("this is id", id);
      try {
        const response = await axios.post(
          `http://localhost:5000/api/languages/${id}/add-snippet`,
          {
            title,
            code,
          }
        );
        console.log(response.headers);
      } catch (error) {
        console.error(error);
      }
    } else {
      alert("add name");
    }
  };

  return (
    <div>
      <div className="container">
        <div className="fileCol">
          {snippets.map((snippet) => (
            <div
              key={snippet._id}
              className={`group h-5 file hover:text-red-500 hover:cursor-pointer ${
                activeSnippetId === snippet._id
                  ? "text-red-500 cursor-pointer"
                  : ""
              }`}
              onClick={() =>
                handleClick(snippet.title, snippet.code, snippet._id)
              }
            >
              <div className="text-sm">{snippet.title}</div>
              <button
                className="hidden group-hover:block"
                onClick={() => handleDelete(snippet._id)}
              >
                Delete
              </button>
            </div>
          ))}
          <button
            className="w-32 focus:outline-none"
            onClick={() => setShowInput(!showInput)}
          >
            + Add new file
          </button>
          {showInput && (
            <div className="relative flex items-center mt-1 space-x-1">
              <input
                type="text"
                value={newSnippet.name}
                onChange={(e) =>
                  setNewSnippet({ ...newSnippet, name: e.target.value })
                }
                className="border border-gray-400 rounded-md w-28"
              />
              <button
                className="absolute top-0 right-0 h-full rounded focus:outline-none flex items-center justify-center"
                onClick={() => {
                  handleAdd(newSnippet.name, newSnippet.content);
                  setShowInput(false);
                }}
              >
                ✔
              </button>
            </div>
          )}
        </div>
        <Content
          mainId={id}
          id={currentSnippet.id}
          code={currentSnippet.content}
        />
      </div>
    </div>
  );
}

export default Snippets;
