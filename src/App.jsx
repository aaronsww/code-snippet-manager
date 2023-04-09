import { useState } from "react";
import "./App.css";
import Navigation from "../components/Navigation";
import Snippets from "../components/Snippets";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <div className="nav">
          <Navigation />
        </div>
        <div className="col">
          <Routes>
            <Route path="/c" element={<Snippets />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
} 

export default App;

{
  /* <Route path="/c++" element={<Cpp />} />
          <Route path="/javascipt" element={<JavaScipt/>} />
          <Route path="/python" element={<Python />} /> */
}

// {
//   "langName" : "C"
//   "snippets" : [{
//     title,
//     content
//   }],
// }