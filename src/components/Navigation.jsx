import { useState, useEffect } from "react";
import "/src/App.css";
import "/src/tailwind.css"
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
    <div className="container">
      <div className="nav">
        <p className="text-lg font-bold tracking-wide">LANGUAGES</p>
        {languages.map((language) => (
          <p className="bg-slate-300 border-4 border-slate-500" key={language._id} onClick={() => handleClick(language)}>
            #{language.name}
          </p>
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
