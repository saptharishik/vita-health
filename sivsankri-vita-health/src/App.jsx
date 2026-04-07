import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './App.css'

import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import WorkshopsPage from './pages/WorkshopsPage'
import AboutPage from './pages/AboutPage'
import GalleryPage from './pages/GalleryPage'
import ContactPage from './pages/ContactPage'

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workshops" element={<WorkshopsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/contact" element={<ContactPage />} />
          {/* Redirect old routes */}
          <Route path="/programs" element={<Navigate to="/workshops" replace />} />
          <Route path="/research" element={<Navigate to="/about" replace />} />
          <Route path="/impact" element={<Navigate to="/gallery" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}
