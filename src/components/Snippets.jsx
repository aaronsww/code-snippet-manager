import { useState, useEffect } from "react";
import "/src/App.css";
import axios from "axios";
import Content from "./Content";

function Snippets({ id, snippets }) {
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
  };

  const handleDelete = async (snippetId) => {
      try {
       await axios.delete(`http://localhost:5000/api/languages/${id}/snippets/${snippetId}`)
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }

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
        <div className="fileCol">
            {snippets.map((snippet) => (
              <div 
              className="file"
                key={snippet._id}
                onClick={() =>
                  handleClick(snippet.title, snippet.code, snippet._id)
                }
              >
                <div>{snippet.title}</div>
                 <button onClick={()=>handleDelete( snippet._id)}>Delete</button>
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