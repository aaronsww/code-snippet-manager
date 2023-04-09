import { useState, useEffect } from "react";
import "../src/App.css";
import axios from "axios";

function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const [newSnippet, setNewSnippet] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/languages")
      .then((res) => {
        const arr = res.data.map((data) =>
          data.snippet.map((data) => data.title)
        );
        setSnippets(arr);
        console.log(snippets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAdd = () => {
    setSnippets([...snippets, newSnippet]);
    setNewSnippet("");
  };

  return (
    <div>
      {snippets.map((snippet) => (
        <div>{snippet}</div>
      ))}
      <div>
        <input
          type="text"
          value={newSnippet}
          onChange={(e) => setNewSnippet(e.target.value)}
        />
        <button onClick={handleAdd}>+ New File</button>
      </div>
    </div>
  );
}

export default Snippets;
