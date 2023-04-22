import { useState, useEffect } from "react";
import axios from "axios";
import "../src/App.css";

function Content({ mainId, id, code }) {
  console.log(mainId, "and", id);
  const [content, setContent] = useState();

  useEffect(() => {
    setContent(code);
  }, [code]);

  const handleUpdate = async (mainId, id, newCode) => {
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
      <div >{code}</div>
      <textarea
        type="text"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <button onClick={() => handleUpdate(mainId, id, content)}>Send</button>
    </div>
  );
}

export default Content;
