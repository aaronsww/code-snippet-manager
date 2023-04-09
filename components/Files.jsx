import {useState} from "react";
import "../src/App.css";

function Files() {
  const [files, setFiles] = useState([]);
  const [newFile, setNewFile] = useState("");

  const handleAdd = () => {
    setFiles([...files, newFile]);
    setNewFile("");
  };

  return (
    <div>
      <ul>
        {files.map((file) => (
          <li><Link to>{file}</Link></li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newFile}
          onChange={(e) => setNewFile(e.target.value)}
        />
        <button onClick={handleAdd}>+ New File</button>
      </div>
    </div>
  );
}

export default Files;
