import { useState, useEffect, } from 'react'
import { NavLink } from "react-router";
import axios from "axios";
import Canvas from '../../Writing';
import { Route, Routes, Outlet } from 'react-router'
import { useLocation } from 'react-router';


function AddKanjis(response)
{
  return <>
     {
      Object.keys(response).map((key=>(
        <>
          <h2>{key}</h2>
          {response[key].map(kanji=>
            (
              <>
              <NavLink
                to="practice"
                state={{ kanji: String.fromCodePoint('0x'+kanji) }}
              >
                {String.fromCharCode('0x'+kanji)}
              </NavLink>

              <br/>
              </>
            )
          )

          }
        </>
      )))
    }
  </>
}

function GenkiLesson() {
  const location = useLocation();
  const [resp, setResp] = useState([]);

    const fetchAPI = async () => {
      await axios.post("http://localhost:8080/genki").then(response =>
      {
        setResp(response.data.results);
      }
      );
  };
  useEffect( () =>
  {
    fetchAPI(); 
  },[location])

  

  return (
    <>
      <h1>Genki Lesson</h1>

      {AddKanjis(resp)}
      {/* <NavLink
        to="practice"
        state={{ kanji: "花" }}
      >
        Practice
      </NavLink> */}

    </>
  )
}

export default GenkiLesson