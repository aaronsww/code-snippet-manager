import React from 'react'
import { Link } from 'react-router-dom'
import "../src/App.css";

function Navigation() {
  return (
    <div>
        <h3>Languages</h3>
        <div><Link to="/c">C</Link></div>
        <div><Link to="/c++">C++</Link></div>
        <div><Link to="/javascipt">JavaScript</Link></div>
        <div><Link to="/python">yPthon</Link></div>
    </div>
  )
}

export default Navigation