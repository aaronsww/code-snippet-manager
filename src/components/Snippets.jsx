import { useState, useEffect } from "react";
import "/src/App.css";
import axios from "axios";
import Content from "./Content";

function Snippets({ id, snippets }) {
  const [showInput, setShowInput] = useState();

  const [currentSnippet, setCurrentSnippet] = useState({
    name: snippets[0].title,
    content: snippets[0].code,
    // id: snippets[0].id,
    id: "64442e5329d4302f89f273e7",
  });

  const [newSnippet, setNewSnippet] = useState({
    name: "",
    content: "",
  });

  console.log(snippets.length, "my snippets:", snippets, "and", id);

  const handleClick = (name, content, id) => {
    setCurrentSnippet({ name, content, id });
  };

  const handleDelete = async (snippetId) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/languages/${id}/snippets/${snippetId}`
      );
      location.reload();
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
        location.reload();
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
              className={`group h-5 file hover:text-zinc-100 hover:cursor-pointer ${
                currentSnippet.id === snippet._id
                  ? "text-zinc-100 cursor-pointer"
                  : ""
              }`}
              onClick={() =>
                handleClick(snippet.title, snippet.code, snippet._id)
              }
            >
              <div className="text-sm">{snippet.title}</div>
              <button
                className="hidden group-hover:block deleteBtn"
                onClick={() => handleDelete(snippet._id)}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="#52525b"
                      d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
                    />
                  </svg>
                </span>
              </button>
            </div>
          ))}
          {!showInput && (
            <button
              className="w-32 focus:outline-none p-1 bg-zinc-700 text-zinc-900 border-none hover:text-zinc-300 hover:bg-zinc-600"
              onClick={() => setShowInput(!showInput)}
            >
              + Add new file
            </button>
          )}
          {showInput && (
            <div className="relative flex items-center mt-1 space-x-1">
              <input
                type="text"
                value={newSnippet.name}
                onChange={(e) =>
                  setNewSnippet({ ...newSnippet, name: e.target.value })
                }
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAdd(newSnippet.name, newSnippet.content);
                    setShowInput(false);
                  }
                }}
              />
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
