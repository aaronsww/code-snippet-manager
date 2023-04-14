import { useState, useEffect } from "react";
import "../src/App.css";
import axios from "axios";
import Content from "./Content";

function Snippets({ id, snippets }) {
  const [currentSnippet, setCurrentSnippet] = useState({
    name: "",
    content: "",
    id: "",
  });
  const [newSnippet, setNewSnippet] = useState({
    name: "",
    content: "",
  });
  console.log(snippets.length, "my snippets:", snippets, "and", id);

  const handleClick = (name, content, id) => {
    setCurrentSnippet({ name, content, id });
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
    <div >
      <div className="container">
        <div>
          {snippets.map((snippet) => (
            <div
              key={snippet._id}
              onClick={() =>
                handleClick(snippet.title, snippet.code, snippet._id)
              }
            >
              {snippet.title}
            </div>
          ))}
          <input
            type="text"
            value={newSnippet.name}
            onChange={(e) =>
              setNewSnippet({ ...newSnippet, name: e.target.value })
            }
          />
          <button
            onClick={() => handleAdd(newSnippet.name, newSnippet.content)}
          >
            + New File
          </button>
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
