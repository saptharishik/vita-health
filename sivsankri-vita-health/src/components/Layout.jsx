import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Icon } from './Shared'

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/workshops', label: 'Workshops' },
  { path: '/about', label: 'About Us' },
  { path: '/gallery', label: 'Gallery' },
]

export default function Layout({ children }) {
  const [scrollY, setScrollY] = useState(0)
  const [mobOpen, setMobOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setMobOpen(false); window.scrollTo(0, 0) }, [location.pathname])

  const navSolid = scrollY > 60

  return (
    <>
      <div className="grain" />

      {/* ── Navigation ── */}
      <nav className={`topnav ${navSolid ? 'solid' : ''}`}>
        <div className="topnav-inner">
          <Link to="/" className="logo">
            <img src="/logo/logo.png" alt="Sivsankri Vita Health" className="logo-img" />
            <div className="logo-text">
              Sivsankri Vita Health
              <small>Private Limited</small>
            </div>
          </Link>
          <div className="nav-links">
            {navItems.map(({ path, label }) => (
              <Link
                key={path}
                to={path}
                className={location.pathname === path ? 'nav-active' : ''}
              >
                {label}
              </Link>
            ))}
            <Link to="/contact" className="cta">Get in Touch</Link>
          </div>
          <button className="mob-btn" onClick={() => setMobOpen(true)}><Icon.Menu /></button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      {mobOpen && (
        <div className="mob-overlay">
          <button className="mob-x" onClick={() => setMobOpen(false)}><Icon.X /></button>
          {navItems.map(({ path, label }) => (
            <Link key={path} to={path} onClick={() => setMobOpen(false)}>{label}</Link>
          ))}
          <Link to="/contact" onClick={() => setMobOpen(false)} className="mob-cta">Get in Touch</Link>
        </div>
      )}

      {children}

      {/* ── Footer ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                Sivsankri Vita Health
              </span>
              <p>Sivsankri Vita Health Pvt Ltd — microgreens cultivation, nutrition education, and sustainable urban agriculture for schools, institutions, and communities across Tamil Nadu.</p>
              <div style={{ marginTop: 20 }}>
                <a href="mailto:contact@sivsankrivitahealth.com" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', fontSize: '0.82rem', fontWeight: 300 }}>
                  <Icon.Mail /> contact@sivsankrivitahealth.com
                </a>
              </div>
            </div>
            <div className="footer-col">
              <h5>Navigate</h5>
              <Link to="/">Home</Link>
              <Link to="/workshops">Workshops</Link>
              <Link to="/about">About Us</Link>
              <Link to="/gallery">Gallery</Link>
              <Link to="/contact">Get in Touch</Link>
            </div>
            <div className="footer-col">
              <h5>Our Programs</h5>
              <Link to="/workshops">School Programs</Link>
              <Link to="/workshops">Community Workshops</Link>
              <Link to="/workshops">College Programs</Link>
              <Link to="/workshops">Corporate Training</Link>
              <Link to="/workshops">Online Sessions</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Sivsankri Vita Health Private Limited. All rights reserved.</span>
            <span style={{ color: 'rgba(255,255,255,0.25)' }}>Incorporated under Companies Act, 2013</span>
          </div>
        </div>
      </footer>
    </>
  )
}
