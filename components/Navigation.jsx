import { useState, useEffect } from "react";
import "../src/App.css";
import axios from "axios";
import Snippets from "./Snippets";

function Navigation() {
  const [languages, setLanguages] = useState([
    {
      _id: "",
      name: "",
      snippet: [],
    },
  ]);

  const [check, setCheck] = useState();

  const [currentLanguage, setCurrentLanguage] = useState({
    _id: "",
    name: "",
    snippet: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/languages")
      .then((res) => {
        setLanguages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClick = (language) => {
    setCurrentLanguage(language);
    setCheck(true);
  };

  console.log(currentLanguage);

  return (
    <div className="container nav">
      <div>
        {languages.map((language) => (
          <h2 key={language._id} onClick={() => handleClick(language)}>
            {language.name}
          </h2>
        ))}
      </div>
      <div>
        {check && (
          <Snippets
            id={currentLanguage._id}
            snippets={currentLanguage.snippet}
          />
        )}
      </div>
    </div>
  );
}

export default Navigation;
