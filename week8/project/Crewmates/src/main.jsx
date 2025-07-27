import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import CreateCrewmate from './pages/CreateCrewmate.jsx'
import Gallery from './pages/Gallery.jsx'
import Detail from './pages/Detail.jsx'
import EditCrewmate from './pages/EditCrewmate.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateCrewmate />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/details/:id" element={<Detail />} />
        <Route path="/edit" element={<EditCrewmate />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
