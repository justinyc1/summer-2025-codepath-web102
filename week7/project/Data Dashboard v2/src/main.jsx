import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.jsx'
import Detail from './pages/Detail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/details/:uri" element={<Detail />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
