import { useState, useEffect } from 'react'
import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import GenkiLesson from './Lessons/Genki/index.jsx'
import Canvas from './Writing/index.jsx'
import Login from './login/index.jsx'
import Register from './register/index.jsx'
import Home from './home'
import NotFound from './FNF404.jsx'

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element={<Login onLogin={(username)=>{setUser(username);}}/>}/>
        <Route path='/register' element={<Register onLogin={(username)=>{setUser(username);}}/>}/>
        <Route path="lessons" >
          <Route path="genki/" element={user == null ? (<Navigate to='/' replace />) : <GenkiLesson/>}/>
          <Route path="genki/practice" element={user == null ? (<Navigate to='/' replace />) :<Canvas/>} />

        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
