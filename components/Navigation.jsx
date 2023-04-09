import {useState, useEffect} from 'react'
import "../src/App.css";
import axios from 'axios';

function Navigation() {
  const [languages, setLanguages] = useState(['hmmm']);
  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/languages")
      .then((res) => {
        console.log(res.data.map(data => data.name));
        setLanguages(prevLanguages => [...prevLanguages, ...res.data.map(data => data.name)]);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  return (
    <div>
        {languages.map(lang => <div>{lang}</div>)}
    </div>
  )
}

export default Navigation