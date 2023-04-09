import {useState} from "react";
import "../src/App.css";

function Snippets() {
  const [snippets, setSnippets] = useState([]);
  const [newSnippet, setNewSnippet] = useState("");

  const handleAdd = () => {
    setSnippets([...snippets, newSnippet]);
    setNewSnippet("");
  };

  return (
    <div>
      <ul>
        {snippets.map((snippet) => (
          <li><Link to>{snippet}</Link></li>
        ))}
      </ul>
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
