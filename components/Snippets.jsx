import { useState, useEffect } from "react";
import "../src/App.css";
import axios from "axios";

function Snippets() {
  // const [snippets, setSnippets] = useState([]);
  const [snippets, setSnippets] = useState([{name: '', content:''}]);
  const [newSnippet, setNewSnippet] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/languages")
      .then((res) => {
        console.log(res.data)
        res.data.map((data) => data.snippet.map(data => setSnippets(prevState => [...prevState, { name: data.title, content: data.code }]))); 

        // setSnippets(prevState => [...prevState, ...newSnippets]);
        // console.log(res.data)
      //   const arr = res.data.map((data) =>
      //     data.snippet.map((data) => data.title)
      //   );
      //   arr.map((data) =>
      //     setSnippets((prevLanguages) => [...prevLanguages, ...data])
      //   );
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
        <div>{snippet.name}</div>
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
