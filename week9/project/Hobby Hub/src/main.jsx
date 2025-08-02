import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router'
import './index.css'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import Explore from './pages/Explore.jsx'
import CreatePost from './pages/CreatePost.jsx'
import EditPost from './pages/EditPost.jsx'
import PostDetail from './pages/PostDetail.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" index element={<Home />}/>
        <Route path="/explore" index element={<Explore />}/>
        <Route path="/create" element={<CreatePost />}/>
        <Route path="/edit/:id" element={<EditPost />}/>
        <Route path="/post/:id" element={<PostDetail />}/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
