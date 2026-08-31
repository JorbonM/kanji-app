import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import GenkiLesson from './Lessons/Genki/index.jsx'
import Canvas from './Writing/index.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />

        <Route path="lessons">
          <Route path="genki/*" element={<GenkiLesson />}>
            {/* <Route index path="practice" element={<Canvas/>} /> */}

          </Route>

        </Route>
        {/* <Route path="practice" element={<Canvas/>} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
