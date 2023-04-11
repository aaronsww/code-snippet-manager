import { useState, useEffect } from "react";
import "../src/App.css";
import axios from "axios";
import Content from "./Content";

function Snippets() {
  // const [snippets, setSnippets] = useState([]);
  const [snippets, setSnippets] = useState([{ name: "", content: "" }]);
  const [currentSnippet, setCurrentSnippet] = useState({
    name: "",
    content: "",
  });
  const [newSnippet, setNewSnippet] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/languages")
      .then((res) => {
        console.log(res.data);
        res.data.map((data) =>
          data.snippet.map((data) =>
            setSnippets((prevState) => [
              ...prevState,
              { name: data.title, content: data.code },
            ])
          )
        );
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

  const handleClick = (name, content) => {
    setCurrentSnippet({ name, content });
  };

  return (
    <div>
      <div className="container">
        <div>
          {snippets.map((snippet) => (
            <div onClick={() => handleClick(snippet.name, snippet.content)}>
              {snippet.name}
            </div>
          ))}
          <input
            type="text"
            value={newSnippet}
            onChange={(e) => setNewSnippet(e.target.value)}
          />
          <button onClick={handleAdd}>+ New File</button>
        </div>
        <Content code={currentSnippet.content} />
      </div>
    </div>
  );
}

export default Snippets;
