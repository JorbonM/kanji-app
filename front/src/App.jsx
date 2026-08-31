import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
// import Canvas from './Canvas'
import { NavLink } from "react-router";

function App() {
  return (
    <>
    <h1>Hello!</h1>
    <NavLink to="lessons/genki/">Genki</NavLink>
      {/* <NavLink to="/practice" state={{ kanji: "花" }}>Practice</NavLink> */}
    </>
  )
}

export default App
