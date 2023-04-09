import { useState } from "react";
import "./App.css";
import Navigation from "../components/Navigation";
import Files from "../components/Files";

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
            <Route path="/c" element={<Files />} />
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