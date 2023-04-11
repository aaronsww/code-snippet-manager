import { useState, useEffect } from "react";
import "../src/App.css";
import axios from "axios";
import Content from "./Content";

function Snippets() {
  const [id, setId] = useState('');
  const [snippets, setSnippets] = useState([{ name: "", content: "", id: "" }]);
  const [currentSnippet, setCurrentSnippet] = useState({
    name: "",
    content: "",
  });
  const [newSnippet, setNewSnippet] = useState({
    name: "",
    content: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/languages")
      .then((res) => {
        res.data.map((data) => setId(data._id));
        console.log(res.data);
        res.data.map((data) =>
          data.snippet.map((data) =>
            setSnippets((prevState) => [
              ...prevState,
              { name: data.title, content: data.code, id: data._id },
            ])
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(id);

  const handleClick = (name, content) => {
    setCurrentSnippet({ name, content });
  };

  const handleAdd = async (title, code) => {
    console.log("this is id", id)
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
        <Content code={currentSnippet.content} />
      </div>
    </div>
  );
}

export default Snippets;
