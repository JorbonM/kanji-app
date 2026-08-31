import { useState, useEffect } from 'react'
import { NavLink } from "react-router";
import axios from "axios";
import Canvas from '../../Writing';
import { Route, Routes, Outlet } from 'react-router'
import { useLocation } from 'react-router';

function GenkiLesson() {
  const location = useLocation();
  const [count, setCount] = useState(0);

    const fetchAPI = async () => {
      const response = await axios.post("http://localhost:8080/genki");
      console.log(response)
  };
  useEffect( () =>
  {
    fetchAPI();
    console.log("genki")

  },[location])

  return (
    <>
      <h1>Genki Lesson</h1>
      <Routes>
          <Route path="practice" element={<Canvas/>} />

      </Routes>
      <NavLink
        to="practice"
        state={{ kanji: "花" }}
      >
        Practice
      </NavLink>

    </>
  )
}

export default GenkiLesson