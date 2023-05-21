import { useState, useEffect } from "react";
import "/src/App.css";
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
  const [activeLanguageId, setActiveLanguageId] = useState(null);

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
    setActiveLanguageId(language._id);
    setCheck(true);
  };

  console.log(currentLanguage);

  return (
    <div className="container">
      <div className="nav">
        <p className="text-lg font-bold tracking-wide mt-7 mb-3 ml-12">LANGUAGES</p>
        {languages.map((language) => (
          <div
            key={language._id}
            className={`p-3 pl-16 transition-colors duration-300 ease-in-out hover:bg-gray-100 hover:text-blue-500 ${
              activeLanguageId === language._id ? "text-blue-500 bg-gray-200" : ""
            }`}
            onClick={() => handleClick(language)}
          >
            # {language.name}
          </div>
        ))}
      </div>
      <div className="snippets">
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
