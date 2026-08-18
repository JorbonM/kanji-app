import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Canvas from './Writing/index.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<App/>}>
            <Route path='practice' element={<Canvas/>}>

            </Route>
          </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
