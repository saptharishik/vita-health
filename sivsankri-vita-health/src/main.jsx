import { createRoot } from "react-dom/client";
import { useState, useEffect, useRef } from "react";

/* ── Intersection Observer Hook ── */
function useReveal(threshold = 0.12) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); io.unobserve(el); } }, { threshold });
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, vis];
}

function Reveal({ children, delay = 0, y = 40, className = "", style = {} }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} className={className} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : `translateY(${y}px)`, transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s` }}>
      {children}
    </div>
  );
}

/* ── Counter Animation ── */
function AnimatedNum({ target, suffix = "", duration = 2000 }) {
  const [ref, vis] = useReveal();
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!vis) return;
    let start = 0;
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setVal(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [vis, target, duration]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ── SVG Icons ── */
const Ico = {
  Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>,
  Menu: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16M4 16h16"/></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>,
  ChevL: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>,
  ChevR: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>,
  Pin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  Sprout: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.5 3.3 9.6 9.6 0 012.3-3C16 5 17.7 4.5 20 4.5a7.1 7.1 0 01-2.7 4.2c-1.1.8-2.2 1.2-3.2 1.3"/></svg>,
  Sun: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>,
  Drop: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>,
  Book: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>,
  Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>,
  Flask: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3h6M10 3v6.5L3 22h18L14 9.5V3"/></svg>,
  Target: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>,
  Clock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>,
  Sparkle: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 3l1.912 5.813a2 2 0 001.275 1.275L21 12l-5.813 1.912a2 2 0 00-1.275 1.275L12 21l-1.912-5.813a2 2 0 00-1.275-1.275L3 12l5.813-1.912a2 2 0 001.275-1.275L12 3z"/></svg>,
};

/* ── Web3Forms Email ── */
const WEB3FORMS_KEY = "YOUR_ACCESS_KEY_HERE"; // Replace with your Web3Forms access key from https://web3forms.com

export default function VitaHealth() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [slide, setSlide] = useState(0);
  const [slideDir, setSlideDir] = useState(1);

  // Contact form state
  const [formData, setFormData] = useState({ name: "", email: "", organization: "", message: "" });
  const [formStatus, setFormStatus] = useState("idle"); // idle | sending | success | error

  useEffect(() => {
    const h = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  useEffect(() => {
    if (lightbox !== null) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  const go = (id) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  const handleFormChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus("sending");

    // Build mailto as fallback if Web3Forms key not set
    if (WEB3FORMS_KEY === "YOUR_ACCESS_KEY_HERE") {
      const subject = encodeURIComponent(`Website Inquiry from ${formData.name}`);
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nOrganization: ${formData.organization}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:contact@sivsankrivitahealth.com?subject=${subject}&body=${body}`;
      setFormStatus("success");
      setFormData({ name: "", email: "", organization: "", message: "" });
      setTimeout(() => setFormStatus("idle"), 4000);
      return;
    }

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Website Inquiry from ${formData.name}`,
          from_name: formData.name,
          email: formData.email,
          organization: formData.organization,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (data.success) {
        setFormStatus("success");
        setFormData({ name: "", email: "", organization: "", message: "" });
        setTimeout(() => setFormStatus("idle"), 5000);
      } else {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
      }
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  const workshopImages = [
    { src: "/workshop-images/workshop-3.jpeg", caption: "Our facilitator conducts an interactive session on microgreens as sustainable superfoods at Prasan Vidya Mandir, Mamandur" },
    { src: "/workshop-images/workshop-4.jpeg", caption: "Students seated in groups across the school hall, recording growth observations and completing their cultivation worksheets with cocopeat trays beside them" },
    { src: "/workshop-images/workshop-5.jpeg", caption: "Overhead view of students with their individual cocopeat growing kits and seed vials, documenting their planting process step by step" },
    { src: "/workshop-images/workshop-6.jpeg", caption: "Students raise their hands enthusiastically during the Q&A session of the Microgreens Program" },
  ];

  const navScrolled = scrollY > 60;

  const navItems = [
    ["top", "Home"],
    ["about", "About Us"],
    ["microgreens", "Why Microgreens"],
    ["research", "Research & Innovation"],
    ["academics", "Academic Programs"],
    ["workshop", "Workshops & Training"],
    ["services", "Services"],
    ["collaborations", "Collaborations"],
    ["roadmap", "Impact & Roadmap"],
    ["contact", "Contact"],
  ];

  return (
    <>
      <style>{`
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,600&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');

:root {
  --f-display: 'Playfair Display', Georgia, serif;
  --f-body: 'Plus Jakarta Sans', system-ui, sans-serif;
  --c-forest: #0a2e1a;
  --c-emerald: #0d5a30;
  --c-green: #18833f;
  --c-mint: #27b85b;
  --c-pale: #e8f5ec;
  --c-cream: #f7faf6;
  --c-gold: #c99a2e;
  --c-gold-light: #f5e6b8;
  --c-white: #ffffff;
  --c-gray-50: #f5f7f5;
  --c-gray-100: #e8ece8;
  --c-gray-200: #d0d6d0;
  --c-gray-400: #8a9a8a;
  --c-gray-600: #4a5c4a;
  --c-gray-800: #1e2e1e;
  --c-gray-900: #0f1a0f;
  --shadow-sm: 0 1px 3px rgba(10,46,26,0.06);
  --shadow-md: 0 8px 32px rgba(10,46,26,0.08);
  --shadow-lg: 0 20px 60px rgba(10,46,26,0.10);
  --shadow-xl: 0 32px 80px rgba(10,46,26,0.12);
  --radius: 12px;
  --radius-lg: 20px;
  --radius-xl: 28px;
}

*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body { font-family: var(--f-body); color: var(--c-gray-800); background: var(--c-cream); }

.grain { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.018; background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E"); }

/* ── NAV ── */
.topnav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 18px 0; transition: all 0.45s cubic-bezier(.4,0,.2,1); }
.topnav.solid { background: rgba(247,250,246,0.95); backdrop-filter: blur(24px) saturate(1.4); -webkit-backdrop-filter: blur(24px) saturate(1.4); padding: 10px 0; box-shadow: 0 1px 0 rgba(10,46,26,0.06); }
.topnav-inner { max-width: 1320px; margin: 0 auto; padding: 0 40px; display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 14px; text-decoration: none; color: var(--c-forest); }
.logo-text { font-family: var(--f-display); font-size: 1.1rem; font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; }
.logo-text small { display: block; font-family: var(--f-body); font-size: 0.55rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-gray-400); margin-top: 3px; }
.nav-links { display: flex; align-items: center; gap: 2px; }
.nav-links a { text-decoration: none; color: var(--c-gray-600); font-size: 0.74rem; font-weight: 500; padding: 7px 11px; border-radius: 100px; transition: all 0.25s; letter-spacing: 0.01em; white-space: nowrap; }
.nav-links a:hover { color: var(--c-forest); background: var(--c-pale); }
.nav-links .cta { background: var(--c-forest); color: var(--c-white); font-weight: 600; }
.nav-links .cta:hover { background: var(--c-emerald); color: var(--c-white); }
.mob-btn { display: none; background: none; border: none; cursor: pointer; color: var(--c-forest); padding: 6px; }

/* ── HERO ── */
.hero { min-height: 100vh; display: flex; align-items: center; position: relative; overflow: hidden; }
.hero-bg { position: absolute; inset: 0; background: linear-gradient(155deg, #f7faf6 0%, #e8f5ec 35%, #d4eadb 65%, #c4dfce 100%); }
.hero-mesh { position: absolute; inset: 0; opacity: 0.35; background:
  radial-gradient(ellipse 600px 500px at 15% 40%, rgba(39,184,91,0.12), transparent),
  radial-gradient(ellipse 500px 600px at 85% 25%, rgba(201,154,46,0.08), transparent),
  radial-gradient(ellipse 400px 400px at 50% 80%, rgba(13,90,48,0.06), transparent); }
.hero-dots { position: absolute; inset: 0; opacity: 0.04; background-image: radial-gradient(circle, var(--c-emerald) 1px, transparent 1px); background-size: 32px 32px; }
.hero-inner { max-width: 1320px; margin: 0 auto; padding: 160px 40px 100px; position: relative; z-index: 2; display: grid; grid-template-columns: 1.1fr 0.9fr; gap: 80px; align-items: center; }
.hero-eyebrow { display: inline-flex; align-items: center; gap: 10px; font-size: 0.7rem; font-weight: 600; letter-spacing: 0.13em; text-transform: uppercase; color: var(--c-emerald); margin-bottom: 32px; }
.hero-eyebrow::before { content: ''; width: 40px; height: 1.5px; background: var(--c-gold); border-radius: 1px; }
.hero h1 { font-family: var(--f-display); font-size: clamp(2.8rem, 5vw, 4.2rem); font-weight: 700; line-height: 1.08; color: var(--c-forest); margin-bottom: 28px; letter-spacing: -0.025em; }
.hero h1 em { font-weight: 400; color: var(--c-green); font-style: italic; }
.hero-sub { font-size: 1.02rem; line-height: 1.8; color: var(--c-gray-600); max-width: 560px; margin-bottom: 44px; font-weight: 300; }
.hero-btns { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
.btn { display: inline-flex; align-items: center; gap: 10px; padding: 15px 30px; border-radius: 100px; font-size: 0.88rem; font-weight: 600; font-family: var(--f-body); text-decoration: none; border: none; cursor: pointer; transition: all 0.3s cubic-bezier(.4,0,.2,1); }
.btn-dark { background: var(--c-forest); color: var(--c-white); }
.btn-dark:hover { background: var(--c-emerald); transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.btn-outline { background: transparent; color: var(--c-forest); border: 1.5px solid var(--c-gray-200); }
.btn-outline:hover { border-color: var(--c-forest); background: var(--c-pale); }

.hero-right { position: relative; }
.hero-card { background: var(--c-white); border-radius: var(--radius-xl); padding: 44px; box-shadow: var(--shadow-xl); position: relative; }
.hero-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--c-green), var(--c-gold), var(--c-mint)); border-radius: var(--radius-xl) var(--radius-xl) 0 0; }
.hero-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
.hero-metric { padding: 28px 20px; text-align: center; position: relative; }
.hero-metric:nth-child(1) { border-right: 1px solid var(--c-gray-100); border-bottom: 1px solid var(--c-gray-100); }
.hero-metric:nth-child(2) { border-bottom: 1px solid var(--c-gray-100); }
.hero-metric:nth-child(3) { border-right: 1px solid var(--c-gray-100); }
.hero-metric-num { font-family: var(--f-display); font-size: 2.4rem; font-weight: 700; color: var(--c-forest); line-height: 1; }
.hero-metric-label { font-size: 0.7rem; color: var(--c-gray-400); font-weight: 500; margin-top: 8px; letter-spacing: 0.04em; }
.hero-float { position: absolute; background: var(--c-white); border-radius: var(--radius); padding: 14px 18px; box-shadow: var(--shadow-md); display: flex; align-items: center; gap: 10px; font-size: 0.78rem; font-weight: 600; color: var(--c-forest); }
.hero-float.f1 { top: -18px; right: -24px; animation: bob 5s ease-in-out infinite; }
.hero-float.f2 { bottom: -14px; left: -28px; animation: bob 5s ease-in-out 2.5s infinite; }
@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.float-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

/* ── MARQUEE ── */
.marquee-wrap { background: var(--c-forest); padding: 16px 0; overflow: hidden; }
.marquee-track { display: flex; width: max-content; animation: scroll 40s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }
@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.marquee-item { display: flex; align-items: center; gap: 12px; padding: 0 36px; white-space: nowrap; font-size: 0.78rem; font-weight: 500; color: rgba(255,255,255,0.55); letter-spacing: 0.05em; text-transform: uppercase; }
.marquee-item .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--c-gold); flex-shrink: 0; }

/* ── SECTION ── */
.sec { padding: 110px 40px; max-width: 1320px; margin: 0 auto; }
.sec-tag { display: inline-flex; align-items: center; gap: 10px; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-gold); margin-bottom: 18px; }
.sec-tag::before { content: ''; width: 28px; height: 1.5px; background: var(--c-gold); }
.sec-h { font-family: var(--f-display); font-size: clamp(2.2rem, 3.5vw, 3rem); font-weight: 700; color: var(--c-forest); line-height: 1.12; letter-spacing: -0.02em; margin-bottom: 18px; }
.sec-p { font-size: 1.02rem; color: var(--c-gray-400); font-weight: 300; line-height: 1.75; max-width: 620px; }

/* ── ABOUT ── */
.about-wrap { background: var(--c-white); border-top: 1px solid var(--c-gray-100); }
.about-grid { display: grid; grid-template-columns: 1.2fr 0.8fr; gap: 60px; margin-top: 8px; align-items: start; }
.about-text { font-size: 0.95rem; color: var(--c-gray-600); line-height: 1.8; font-weight: 300; margin-bottom: 16px; }
.about-highlights { display: flex; flex-direction: column; gap: 16px; }
.about-highlight { display: flex; align-items: center; gap: 16px; padding: 20px 24px; border-radius: var(--radius); background: var(--c-cream); border: 1px solid var(--c-gray-100); transition: all 0.3s; }
.about-highlight:hover { transform: translateX(6px); box-shadow: var(--shadow-sm); border-color: var(--c-pale); }
.about-highlight-icon { flex-shrink: 0; width: 44px; height: 44px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
.about-highlight h4 { font-size: 0.85rem; font-weight: 600; color: var(--c-forest); margin-bottom: 2px; }
.about-highlight p { font-size: 0.78rem; color: var(--c-gray-400); line-height: 1.5; font-weight: 300; }

/* ── VISION / MISSION ── */
.vm-section { background: var(--c-cream); }
.vm-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; margin-top: 48px; }
.vm-card { padding: 44px; border-radius: var(--radius-xl); position: relative; overflow: hidden; }
.vm-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; }
.vm-card h3 { font-family: var(--f-display); font-size: 1.4rem; color: var(--c-forest); margin-bottom: 16px; font-weight: 600; }
.vm-card p { font-size: 0.95rem; color: var(--c-gray-600); line-height: 1.8; font-weight: 300; }
.vm-vision { background: var(--c-white); border: 1px solid var(--c-gray-100); box-shadow: var(--shadow-sm); }
.vm-vision::before { background: linear-gradient(90deg, var(--c-green), var(--c-mint)); }
.vm-mission { background: var(--c-white); border: 1px solid var(--c-gray-100); box-shadow: var(--shadow-sm); }
.vm-mission::before { background: linear-gradient(90deg, var(--c-gold), #daa730); }
.mission-list { list-style: none; display: flex; flex-direction: column; gap: 14px; }
.mission-list li { display: flex; align-items: flex-start; gap: 14px; font-size: 0.92rem; color: var(--c-gray-600); line-height: 1.6; }
.mission-bullet { flex-shrink: 0; width: 28px; height: 28px; border-radius: 8px; background: var(--c-pale); color: var(--c-green); display: flex; align-items: center; justify-content: center; margin-top: 1px; }

/* ── WHY MICROGREENS ── */
.mg-wrap { background: var(--c-white); border-top: 1px solid var(--c-gray-100); position: relative; }
.mg-wrap::before { content: ''; position: absolute; top: 0; left: 0; right: 0; bottom: 0; background: linear-gradient(180deg, var(--c-pale) 0%, var(--c-white) 40%); pointer-events: none; }
.mg-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 56px; position: relative; }
.mg-card { background: var(--c-white); border-radius: var(--radius-xl); padding: 44px 36px; border: 1px solid var(--c-gray-100); transition: all 0.4s cubic-bezier(.16,1,.3,1); position: relative; overflow: hidden; }
.mg-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; transition: height 0.4s; }
.mg-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-8px); border-color: transparent; }
.mg-card:hover::before { height: 4px; }
.mg-card:nth-child(1)::before { background: linear-gradient(90deg, #0a6b3a, #27b85b); }
.mg-card:nth-child(2)::before { background: linear-gradient(90deg, #b8860b, #daa730); }
.mg-card:nth-child(3)::before { background: linear-gradient(90deg, #1a7560, #27b89a); }
.mg-card-icon { width: 60px; height: 60px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 28px; }
.mg-card h3 { font-family: var(--f-display); font-size: 1.25rem; color: var(--c-forest); margin-bottom: 12px; font-weight: 600; }
.mg-card p { font-size: 0.9rem; color: var(--c-gray-600); line-height: 1.7; font-weight: 300; }

/* ── TRIPLE BURDEN ── */
.tb-wrap { background: var(--c-forest); position: relative; overflow: hidden; }
.tb-wrap::before { content: ''; position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 28px 28px; }
.tb-wrap .sec-tag { color: var(--c-gold-light); }
.tb-wrap .sec-h { color: var(--c-white); }
.tb-wrap .sec-p { color: rgba(255,255,255,0.4); }
.tb-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 56px; }
.tb-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: var(--radius-xl); padding: 44px 32px; transition: all 0.4s cubic-bezier(.16,1,.3,1); position: relative; overflow: hidden; }
.tb-card::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--c-gold), var(--c-gold-light)); opacity: 0; transition: opacity 0.4s; }
.tb-card:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.1); transform: translateY(-6px); }
.tb-card:hover::after { opacity: 1; }
.tb-card-n { font-family: var(--f-display); font-size: 3.2rem; font-weight: 700; color: var(--c-gold); opacity: 0.15; line-height: 1; margin-bottom: 20px; }
.tb-card h4 { font-family: var(--f-display); font-size: 1.25rem; color: var(--c-white); margin-bottom: 12px; font-weight: 600; }
.tb-card p { font-size: 0.88rem; color: rgba(255,255,255,0.4); line-height: 1.7; font-weight: 300; }

/* ── RESEARCH ── */
.research-wrap { background: var(--c-white); border-top: 1px solid var(--c-gray-100); }
.research-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 56px; }
.research-areas { list-style: none; display: flex; flex-direction: column; gap: 16px; margin-top: 20px; }
.research-areas li { display: flex; align-items: flex-start; gap: 14px; font-size: 0.92rem; color: var(--c-gray-600); line-height: 1.6; padding: 16px 20px; border-radius: var(--radius); background: var(--c-cream); border: 1px solid var(--c-gray-100); transition: all 0.3s; }
.research-areas li:hover { transform: translateX(6px); box-shadow: var(--shadow-sm); }
.research-areas .bullet { flex-shrink: 0; width: 28px; height: 28px; border-radius: 8px; background: var(--c-pale); color: var(--c-green); display: flex; align-items: center; justify-content: center; margin-top: 1px; }
.lab-card { background: linear-gradient(160deg, var(--c-pale) 0%, #d4eadb 100%); border-radius: var(--radius-xl); padding: 44px; position: relative; overflow: hidden; }
.lab-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--c-green), var(--c-gold)); }
.lab-card h3 { font-family: var(--f-display); font-size: 1.3rem; color: var(--c-forest); margin-bottom: 14px; font-weight: 600; }
.lab-card p { font-size: 0.9rem; color: var(--c-gray-600); line-height: 1.75; font-weight: 300; margin-bottom: 24px; }
.lab-goals { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.lab-goals li { display: flex; align-items: flex-start; gap: 12px; font-size: 0.86rem; color: var(--c-gray-600); line-height: 1.55; }
.lab-goals .chk { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; background: rgba(24,131,63,0.12); color: var(--c-green); display: flex; align-items: center; justify-content: center; margin-top: 2px; }

/* ── ACADEMIC ── */
.acad-wrap { background: var(--c-cream); }
.acad-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; margin-top: 56px; }
.acad-card { background: var(--c-white); border-radius: var(--radius-xl); padding: 44px 36px; border: 1px solid var(--c-gray-100); transition: all 0.4s cubic-bezier(.16,1,.3,1); position: relative; overflow: hidden; }
.acad-card::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 0; transition: height 0.5s cubic-bezier(.16,1,.3,1); }
.acad-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-6px); border-color: transparent; }
.acad-card:hover::before { height: 100%; }
.acad-card:nth-child(1)::before { background: #0a6b3a; }
.acad-card:nth-child(2)::before { background: #1a7560; }
.acad-card:nth-child(3)::before { background: #b8860b; }
.acad-card-icon { width: 56px; height: 56px; border-radius: 16px; display: flex; align-items: center; justify-content: center; margin-bottom: 28px; }
.acad-card h3 { font-family: var(--f-display); font-size: 1.2rem; color: var(--c-forest); margin-bottom: 16px; font-weight: 600; }
.acad-card-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.acad-card-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 0.86rem; color: var(--c-gray-600); line-height: 1.55; font-weight: 400; }
.acad-card-list .chk { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 2px; }

/* ── WORKSHOP ── */
.workshop-wrap { background: var(--c-pale); border-top: 1px solid var(--c-gray-100); }
.ws-head { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 24px; }
.ws-stats { display: flex; gap: 40px; }
.ws-stat-n { font-family: var(--f-display); font-size: 2rem; font-weight: 700; color: var(--c-forest); line-height: 1; }
.ws-stat-l { font-size: 0.72rem; color: var(--c-gray-400); font-weight: 500; margin-top: 5px; letter-spacing: 0.03em; }

.ws-carousel-outer { margin-top: 48px; }
.ws-carousel { display: flex; align-items: center; justify-content: center; gap: 16px; padding: 16px 0 8px; }
.ws-slide { flex: 0 0 auto; border-radius: var(--radius-lg); overflow: hidden; transition: all 0.5s cubic-bezier(.16,1,.3,1); background: var(--c-gray-100); }
.ws-slide img { width: 100%; height: auto; display: block; }
.ws-slide-prev, .ws-slide-next { width: 22%; opacity: 0.45; filter: brightness(0.6) blur(1px); transform: scale(0.88); cursor: pointer; }
.ws-slide-prev:hover, .ws-slide-next:hover { opacity: 0.65; filter: brightness(0.75); }
.ws-slide-active { width: 48%; opacity: 1; filter: none; transform: scale(1); box-shadow: var(--shadow-xl); cursor: pointer; }
@keyframes slideInRight { from { opacity: 0.4; transform: scale(0.9) translateX(40px); } to { opacity: 1; transform: scale(1) translateX(0); } }
@keyframes slideInLeft  { from { opacity: 0.4; transform: scale(0.9) translateX(-40px); } to { opacity: 1; transform: scale(1) translateX(0); } }
.ws-slide-active.dir-next { animation: slideInRight 0.45s cubic-bezier(.16,1,.3,1); }
.ws-slide-active.dir-prev { animation: slideInLeft 0.45s cubic-bezier(.16,1,.3,1); }
.ws-active-cap { padding: 14px 18px; font-size: 0.82rem; color: var(--c-gray-600); line-height: 1.6; font-weight: 400; background: var(--c-white); border-top: 1px solid var(--c-gray-100); border-radius: 0 0 var(--radius-lg) var(--radius-lg); width: 48%; margin: 0 auto; box-shadow: var(--shadow-md); }
.ws-carousel-nav { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 28px; }
.ws-arrow { width: 48px; height: 48px; border-radius: 50%; border: 1.5px solid var(--c-gray-200); background: var(--c-white); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--c-forest); transition: all 0.25s; box-shadow: var(--shadow-sm); }
.ws-arrow:hover { background: var(--c-forest); color: var(--c-white); border-color: var(--c-forest); transform: scale(1.08); }
.ws-dots-row { display: flex; gap: 8px; }
.ws-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c-gray-200); border: none; cursor: pointer; transition: all 0.3s; padding: 0; }
.ws-dot.active { background: var(--c-forest); width: 24px; border-radius: 4px; }

.ws-types { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; margin-top: 64px; }
.ws-type-card { background: var(--c-white); border-radius: var(--radius-xl); padding: 44px 36px; border: 1px solid var(--c-gray-100); transition: all 0.35s; position: relative; overflow: hidden; }
.ws-type-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--c-green), var(--c-gold)); }
.ws-type-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-6px); }
.ws-type-card h3 { font-family: var(--f-display); font-size: 1.2rem; color: var(--c-forest); margin-bottom: 16px; font-weight: 600; }
.ws-type-card p { font-size: 0.88rem; color: var(--c-gray-600); line-height: 1.65; font-weight: 300; }
.ws-type-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.ws-type-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 0.86rem; color: var(--c-gray-600); line-height: 1.55; }
.ws-type-list .chk { flex-shrink: 0; width: 22px; height: 22px; border-radius: 50%; background: var(--c-pale); color: var(--c-green); display: flex; align-items: center; justify-content: center; margin-top: 2px; }

/* ── SERVICES ── */
.services-wrap { background: var(--c-white); border-top: 1px solid var(--c-gray-100); }
.srv-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 20px; margin-top: 56px; }
.srv-item { display: flex; align-items: flex-start; gap: 18px; padding: 28px 28px; border-radius: var(--radius-lg); background: var(--c-cream); border: 1px solid var(--c-gray-100); transition: all 0.35s; }
.srv-item:hover { box-shadow: var(--shadow-md); transform: translateY(-4px); border-color: transparent; background: var(--c-white); }
.srv-item .bullet { flex-shrink: 0; width: 36px; height: 36px; border-radius: 10px; background: var(--c-pale); color: var(--c-green); display: flex; align-items: center; justify-content: center; margin-top: 2px; }
.srv-item span { font-size: 0.92rem; color: var(--c-gray-600); line-height: 1.6; font-weight: 400; }

/* ── COLLABORATIONS ── */
.collab-wrap { background: var(--c-cream); }
.collab-cards { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px; margin-top: 56px; }
.collab-card { display: flex; align-items: flex-start; gap: 18px; padding: 28px; border-radius: var(--radius-lg); background: var(--c-white); border: 1px solid var(--c-gray-100); transition: all 0.35s; }
.collab-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-6px); border-color: transparent; }
.collab-icon { flex-shrink: 0; width: 48px; height: 48px; border-radius: 14px; display: flex; align-items: center; justify-content: center; }
.collab-card h4 { font-size: 0.92rem; font-weight: 600; color: var(--c-forest); margin-bottom: 6px; }
.collab-card p { font-size: 0.84rem; color: var(--c-gray-400); line-height: 1.6; font-weight: 300; }

/* ── ROADMAP ── */
.roadmap-wrap { background: var(--c-forest); position: relative; overflow: hidden; }
.roadmap-wrap::before { content: ''; position: absolute; inset: 0; opacity: 0.03; background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 28px 28px; }
.roadmap-wrap .sec-tag { color: var(--c-gold-light); }
.roadmap-wrap .sec-h { color: var(--c-white); }
.roadmap-list { list-style: none; display: flex; flex-direction: column; gap: 16px; margin-top: 56px; max-width: 820px; }
.roadmap-list li { display: flex; align-items: center; gap: 20px; padding: 28px 32px; border-radius: var(--radius-lg); background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); transition: all 0.35s; }
.roadmap-list li:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.1); transform: translateX(8px); }
.roadmap-num { flex-shrink: 0; font-family: var(--f-display); font-size: 1.6rem; font-weight: 700; color: var(--c-gold); opacity: 0.4; width: 36px; text-align: center; }
.roadmap-list li span:last-child { font-size: 0.95rem; color: rgba(255,255,255,0.55); line-height: 1.6; font-weight: 300; }

/* ── CONTACT ── */
.contact-wrap { background: linear-gradient(160deg, var(--c-forest) 0%, #0d4a28 50%, var(--c-emerald) 100%); position: relative; overflow: hidden; }
.contact-wrap::before { content: ''; position: absolute; inset: 0; opacity: 0.025; background-image: radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px); background-size: 24px 24px; }
.contact-sec { padding: 110px 40px; max-width: 1320px; margin: 0 auto; position: relative; z-index: 2; }
.contact-grid { display: grid; grid-template-columns: 1fr 1.1fr; gap: 80px; align-items: start; }
.contact-left .sec-tag { color: var(--c-gold-light); }
.contact-left .sec-tag::before { background: var(--c-gold-light); }
.contact-left .sec-h { color: var(--c-white); }
.contact-desc { font-size: 1.02rem; color: rgba(255,255,255,0.5); line-height: 1.75; font-weight: 300; margin-bottom: 48px; max-width: 440px; }
.contact-info-cards { display: flex; flex-direction: column; gap: 16px; }
.contact-info-card { display: flex; align-items: center; gap: 18px; padding: 22px 24px; border-radius: var(--radius-lg); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); transition: all 0.3s; }
.contact-info-card:hover { background: rgba(255,255,255,0.07); border-color: rgba(255,255,255,0.1); transform: translateX(6px); }
.contact-info-icon { flex-shrink: 0; width: 48px; height: 48px; border-radius: 14px; background: rgba(201,154,46,0.1); color: var(--c-gold); display: flex; align-items: center; justify-content: center; }
.contact-info-card h4 { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.35); margin-bottom: 4px; }
.contact-info-card p, .contact-info-card a { font-size: 0.92rem; color: rgba(255,255,255,0.75); font-weight: 400; text-decoration: none; transition: color 0.25s; }
.contact-info-card a:hover { color: var(--c-gold); }

/* Contact form */
.contact-form-card { background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); border-radius: var(--radius-xl); padding: 48px 40px; backdrop-filter: blur(12px); }
.contact-form-card h3 { font-family: var(--f-display); font-size: 1.4rem; color: var(--c-white); font-weight: 600; margin-bottom: 8px; }
.contact-form-card .form-sub { font-size: 0.82rem; color: rgba(255,255,255,0.35); font-weight: 300; margin-bottom: 32px; }
.contact-form { display: flex; flex-direction: column; gap: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.form-field { display: flex; flex-direction: column; gap: 6px; }
.form-field label { font-size: 0.72rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.4); }
.contact-form input, .contact-form textarea {
  width: 100%; padding: 14px 18px; border-radius: var(--radius); border: 1.5px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04); color: var(--c-white); font-family: var(--f-body); font-size: 0.9rem;
  font-weight: 400; outline: none; transition: all 0.3s;
}
.contact-form input::placeholder, .contact-form textarea::placeholder { color: rgba(255,255,255,0.2); }
.contact-form input:focus, .contact-form textarea:focus { border-color: var(--c-gold); background: rgba(255,255,255,0.06); box-shadow: 0 0 0 3px rgba(201,154,46,0.1); }
.contact-form textarea { min-height: 120px; resize: vertical; }
.submit-btn { display: flex; align-items: center; justify-content: center; gap: 10px; padding: 16px 32px; border-radius: 100px; font-size: 0.9rem; font-weight: 600; font-family: var(--f-body); border: none; cursor: pointer; transition: all 0.3s; width: 100%; }
.submit-btn.idle { background: var(--c-gold); color: var(--c-forest); }
.submit-btn.idle:hover { background: #daa730; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,154,46,0.3); }
.submit-btn.sending { background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.5); cursor: wait; }
.submit-btn.success { background: var(--c-mint); color: var(--c-white); }
.submit-btn.error { background: #c0392b; color: var(--c-white); }

/* ── FOOTER ── */
.footer { background: var(--c-gray-900); color: rgba(255,255,255,0.4); padding: 72px 40px 36px; }
.footer-inner { max-width: 1320px; margin: 0 auto; }
.footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1fr; gap: 60px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.footer-brand p { margin-top: 18px; font-size: 0.82rem; line-height: 1.7; font-weight: 300; max-width: 380px; }
.footer-col h5 { color: rgba(255,255,255,0.7); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 18px; }
.footer-col a { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.35); text-decoration: none; font-size: 0.84rem; padding: 5px 0; font-weight: 300; transition: color 0.25s; }
.footer-col a:hover { color: var(--c-gold); }
.footer-col a svg { opacity: 0.5; }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 28px; font-size: 0.72rem; flex-wrap: wrap; gap: 12px; }

/* ── LIGHTBOX ── */
.lb { position: fixed; inset: 0; z-index: 200; background: rgba(10,46,26,0.95); display: flex; align-items: center; justify-content: center; padding: 32px; animation: fadeUp 0.35s ease; backdrop-filter: blur(8px); }
@keyframes fadeUp { from { opacity: 0; } to { opacity: 1; } }
.lb img { max-width: 88vw; max-height: 80vh; object-fit: contain; border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); }
.lb-cap { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.8); text-align: center; font-size: 0.88rem; max-width: 600px; line-height: 1.6; }
.lb-btn { position: absolute; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: white; width: 48px; height: 48px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.25s; }
.lb-btn:hover { background: rgba(255,255,255,0.16); }
.lb-close { top: 24px; right: 32px; }
.lb-prev { top: 50%; left: 24px; transform: translateY(-50%); }
.lb-next { top: 50%; right: 24px; transform: translateY(-50%); }

/* ── MOBILE MENU ── */
.mob-overlay { position: fixed; inset: 0; z-index: 150; background: rgba(247,250,246,0.97); backdrop-filter: blur(20px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 20px; animation: fadeUp 0.3s ease; overflow-y: auto; padding: 80px 24px; }
.mob-overlay a { font-family: var(--f-display); font-size: 1.3rem; color: var(--c-forest); text-decoration: none; font-weight: 600; }
.mob-overlay a:hover { color: var(--c-green); }
.mob-x { position: absolute; top: 22px; right: 32px; background: none; border: none; cursor: pointer; color: var(--c-forest); }

/* ── RESPONSIVE ── */
@media (max-width: 1100px) {
  .nav-links { display: none; }
  .mob-btn { display: block; }
}

@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; gap: 48px; }
  .hero-right { max-width: 480px; }
  .about-grid { grid-template-columns: 1fr; gap: 32px; }
  .vm-grid { grid-template-columns: 1fr; gap: 24px; }
  .mg-cards { grid-template-columns: 1fr; }
  .tb-cards { grid-template-columns: 1fr; }
  .research-grid { grid-template-columns: 1fr; gap: 32px; }
  .acad-cards { grid-template-columns: 1fr; }
  .ws-types { grid-template-columns: 1fr; }
  .contact-grid { grid-template-columns: 1fr; gap: 48px; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
  .sec { padding: 72px 24px; }
  .contact-sec { padding: 72px 24px; }
  .hero-inner { padding: 130px 24px 60px; }
  .hero h1 { font-size: 2.4rem; }
  .hero-btns { flex-direction: column; align-items: flex-start; width: 100%; }
  .hero-btns .btn { width: 100%; justify-content: center; }
  .hero-card { padding: 28px; }
  .hero-float { display: none; }
  .sec-h { font-size: 2rem; }
  .ws-stats { gap: 24px; }
  .ws-slide-prev, .ws-slide-next { width: 14%; }
  .ws-slide-active { width: 68%; }
  .ws-active-cap { width: 68%; }
  .form-row { grid-template-columns: 1fr; }
  .contact-form-card { padding: 32px 24px; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  .footer-bottom { flex-direction: column; text-align: center; }
  .srv-grid { grid-template-columns: 1fr; }
}
      `}</style>
      <div className="grain" />

      {/* ── NAV ── */}
      <nav className={`topnav ${navScrolled ? "solid" : ""}`}>
        <div className="topnav-inner">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); go("top"); }}>
            <div className="logo-text">Sivsankri Vita Health<small>Private Limited</small></div>
          </a>
          <div className="nav-links">
            {navItems.slice(1, -1).map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>
            ))}
            <a href="#contact" onClick={(e) => { e.preventDefault(); go("contact"); }} className="cta">Contact</a>
          </div>
          <button className="mob-btn" onClick={() => setMenuOpen(true)}><Ico.Menu /></button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mob-overlay">
          <button className="mob-x" onClick={() => setMenuOpen(false)}><Ico.X /></button>
          {navItems.map(([id, label]) => (
            <a key={id} href="#" onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>
          ))}
        </div>
      )}

      {/* ── HERO ── */}
      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="hero-mesh" />
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <Reveal><div className="hero-eyebrow">Incorporated under Companies Act, 2013</div></Reveal>
            <Reveal delay={0.08}><h1>Building Climate-Smart<br /><em>Nutrition Solutions</em></h1></Reveal>
            <Reveal delay={0.16}><p className="hero-sub">Developing microgreens-based functional foods to combat the triple burden of malnutrition — through research, education, and community programs that promote climate-resilient, eco-friendly food systems.</p></Reveal>
            <Reveal delay={0.24}>
              <div className="hero-btns">
                <a href="#microgreens" className="btn btn-dark" onClick={(e) => { e.preventDefault(); go("microgreens"); }}>Explore Our Work <Ico.Arrow /></a>
                <a href="#about" className="btn btn-outline" onClick={(e) => { e.preventDefault(); go("about"); }}>Our Story</a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="hero-right">
              <div className="hero-card">
                <div className="hero-metrics">
                  <div className="hero-metric"><div className="hero-metric-num">7–14</div><div className="hero-metric-label">Days Harvest Cycle</div></div>
                  <div className="hero-metric"><div className="hero-metric-num"><AnimatedNum target={100} suffix="+" /></div><div className="hero-metric-label">Students Trained</div></div>
                  <div className="hero-metric"><div className="hero-metric-num">SDG</div><div className="hero-metric-label">Aligned Mission</div></div>
                  <div className="hero-metric"><div className="hero-metric-num">Triple</div><div className="hero-metric-label">Burden Addressed</div></div>
                </div>
              </div>
              <div className="hero-float f1"><div className="float-dot" style={{ background: "var(--c-mint)" }} />Climate-Smart</div>
              <div className="hero-float f2"><div className="float-dot" style={{ background: "var(--c-gold)" }} />Science-Backed</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex" }}>
              {["Microgreens Cultivation", "Nutrition Education", "Sustainable Agriculture", "Functional Foods", "Urban Farming", "Climate-Resilient Systems", "Community Programs", "Research & Innovation", "Academic Partnerships", "Wellness Solutions"].map((t, j) => (
                <span key={j} className="marquee-item"><span className="dot" />{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── ABOUT US ── */}
      <div className="about-wrap" id="about">
        <div className="sec">
          <Reveal><div className="sec-tag">Who We Are</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Built on Science,<br />Driven by Purpose</h2></Reveal>

          <div className="about-grid">
            <div>
              <Reveal delay={0.1}><p className="about-text">Sivsankri Vita Health Pvt Ltd is a Tamil Nadu–based company dedicated to developing microgreens as functional foods that address real nutrition challenges. Incorporated under the Companies Act, 2013, we operate at the intersection of food science, sustainable agriculture, and community education.</p></Reveal>
              <Reveal delay={0.14}><p className="about-text">Our work is guided by one core belief: that the most powerful nutrition solutions are the ones that are also the most sustainable. Microgreens — young, fast-growing edible plants harvested within 7 to 14 days — sit at the heart of everything we do.</p></Reveal>
              <Reveal delay={0.18}><p className="about-text">From school workshops to research collaborations with colleges and universities, we translate science into impact — empowering students, families, and communities to grow and eat better.</p></Reveal>
            </div>
            <Reveal delay={0.16}>
              <div className="about-highlights">
                {[
                  { icon: <Ico.Sprout />, bg: "#e6f5ea", color: "#0a6b3a", title: "Microgreens-First", desc: "Centered on nutrient-dense, fast-growing superfoods" },
                  { icon: <Ico.Sun />, bg: "#fdf6e3", color: "#b8860b", title: "Climate-Resilient", desc: "Low-resource, sustainable food production systems" },
                  { icon: <Ico.Users />, bg: "#eaf0fa", color: "#2a5aa5", title: "Community-Driven", desc: "Education programs for schools and communities" },
                  { icon: <Ico.Flask />, bg: "#f3eafa", color: "#7a3db8", title: "Research-Backed", desc: "Science-led innovation from lab to table" },
                ].map((h, i) => (
                  <div key={i} className="about-highlight">
                    <div className="about-highlight-icon" style={{ background: h.bg, color: h.color }}>{h.icon}</div>
                    <div><h4>{h.title}</h4><p>{h.desc}</p></div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── VISION & MISSION ── */}
      <div className="vm-section">
        <div className="sec" style={{ paddingTop: 80 }}>
          <div className="vm-grid">
            <Reveal>
              <div className="vm-card vm-vision">
                <h3>Our Vision</h3>
                <p>To create a future where nutrient-dense foods and sustainable agriculture systems are accessible to everyone — supporting healthier communities and a more resilient planet.</p>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="vm-card vm-mission">
                <h3>Our Mission</h3>
                <ul className="mission-list">
                  {[
                    "Develop functional foods using microgreens to improve everyday nutrition",
                    "Address the triple burden of malnutrition — undernutrition, micronutrient deficiency, and overnutrition",
                    "Promote sustainable urban agriculture that is low-resource and climate-resilient",
                    "Empower communities through hands-on nutrition education and training",
                  ].map((m, i) => (
                    <li key={i}><span className="mission-bullet"><Ico.Check /></span>{m}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── WHY MICROGREENS ── */}
      <div className="mg-wrap" id="microgreens">
        <div className="sec" style={{ position: "relative" }}>
          <Reveal><div className="sec-tag">Why Microgreens</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Small Plants.<br />Big Nutrition.</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p">Microgreens are young edible plants harvested within 7 to 14 days of growth. They are known for their high nutrient density and fast growth cycle, making them one of the most promising options for sustainable food production in both urban and rural settings.</p></Reveal>

          <div className="mg-cards">
            {[
              { icon: <Ico.Sprout />, title: "Nutrient Dense", desc: "Microgreens can contain concentrated vitamins, minerals, and antioxidants — packed into every small bite.", bg: "#e6f5ea", color: "#0a6b3a" },
              { icon: <Ico.Sun />, title: "Climate-Resilient", desc: "They require minimal land, grow quickly in controlled environments, and are well suited to urban farming — even in small spaces.", bg: "#fdf6e3", color: "#b8860b" },
              { icon: <Ico.Drop />, title: "Low Resource Farming", desc: "Less water, less space, and a low carbon footprint make microgreens an efficient and eco-friendly food source.", bg: "#eaf0fa", color: "#1a7560" },
            ].map((c, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div className="mg-card">
                  <div className="mg-card-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
                  <h3>{c.title}</h3>
                  <p>{c.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── TRIPLE BURDEN ── */}
      <div className="tb-wrap" id="burden">
        <div className="sec">
          <Reveal><div className="sec-tag">Our Focus</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Solving Three Nutrition<br />Challenges — Simultaneously</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p">Our research and programs are designed to address all three dimensions of the malnutrition challenge that communities across India face today.</p></Reveal>
          <div className="tb-cards">
            {[
              { n: "01", t: "Undernutrition", d: "Improving dietary diversity by making nutrient-dense microgreens accessible and easy to grow at home and in communities." },
              { n: "02", t: "Micronutrient Deficiencies", d: "Targeting iron, mineral, and vitamin gaps through functional microgreens varieties selected for their specific nutrient profiles." },
              { n: "03", t: "Overnutrition", d: "Promoting plant-based, low-calorie nutrition choices to support healthier diets and reduce lifestyle-related health risks." },
            ].map((c, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div className="tb-card">
                  <div className="tb-card-n">{c.n}</div>
                  <h4>{c.t}</h4>
                  <p>{c.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── RESEARCH & INNOVATION ── */}
      <div className="research-wrap" id="research">
        <div className="sec">
          <Reveal><div className="sec-tag">Research & Innovation</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Climate-Resilient<br />Agriculture Research</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p">Climate change demands new food production systems that use fewer resources and deliver more nutrition. Our research explores how microgreens can be grown and scaled in ways that are practical for urban communities, schools, and institutions.</p></Reveal>

          <div className="research-grid">
            <Reveal delay={0.16}>
              <div>
                <h3 style={{ fontFamily: "var(--f-display)", fontSize: "1.2rem", color: "var(--c-forest)", marginBottom: 20, fontWeight: 600 }}>Research Areas</h3>
                <ul className="research-areas">
                  {[
                    "Urban agriculture systems and indoor farming techniques",
                    "Water-efficient and low-space growing systems",
                    "Small-space food production models for homes and institutions",
                    "Resilient microgreen varieties suited for Indian climate conditions",
                  ].map((r, i) => (
                    <li key={i}><span className="bullet"><Ico.Check /></span>{r}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="lab-card">
                <h3>Nutrition Innovation Lab</h3>
                <p>Our Nutrition Innovation Lab is a dedicated space for experimentation and product development — testing new microgreens-based food concepts, conducting student research, developing functional food prototypes, and performing nutrition analysis.</p>
                <ul className="lab-goals">
                  {[
                    "Climate-resilient food systems tailored for urban settings",
                    "Nutrient-dense functional foods derived from microgreens",
                    "Sustainable urban agriculture models replicable at community scale",
                    "Community nutrition programs that drive measurable health outcomes",
                  ].map((g, i) => (
                    <li key={i}><span className="chk"><Ico.Check /></span>{g}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── ACADEMIC PROGRAMS ── */}
      <div className="acad-wrap" id="academics">
        <div className="sec">
          <Reveal><div className="sec-tag">Academic Programs</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Learning That<br />Grows with You</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p">We collaborate with colleges and universities to promote learning and innovation in sustainable food systems. Our academic partnerships give students hands-on exposure to microgreens cultivation, nutrition research, and sustainable agriculture.</p></Reveal>

          <div className="acad-cards">
            {[
              { icon: <Ico.Book />, title: "School Programs", color: "#0a6b3a", bg: "#e6f5ea", points: ["Plant biology and growth cycles", "Nutrition science basics", "Hands-on sustainable agriculture"] },
              { icon: <Ico.Flask />, title: "College Programs", color: "#1a7560", bg: "#e6f5f0", points: ["Research projects in plant nutrient analysis and functional food development", "Internship opportunities in microgreens cultivation and sustainable farming", "Sustainability workshops and collaborative innovation labs"] },
              { icon: <Ico.Users />, title: "Community Programs", color: "#b8860b", bg: "#fdf6e3", points: ["Growing nutrient-dense foods at home", "Healthy cooking with microgreens", "Sustainable living and low-resource farming practices"] },
            ].map((c, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div className="acad-card">
                  <div className="acad-card-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
                  <h3>{c.title}</h3>
                  <ul className="acad-card-list">
                    {c.points.map((p, j) => (
                      <li key={j}><span className="chk" style={{ background: c.bg, color: c.color }}><Ico.Check /></span>{p}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── WORKSHOPS & TRAINING ── */}
      <div className="workshop-wrap" id="workshop">
        <div className="sec">
          <Reveal><div className="sec-tag">Workshops & Training</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Science Out of the Lab,<br />Into the World</h2></Reveal>

          <div className="ws-head" style={{ marginTop: 40 }}>
            <div>
              <Reveal delay={0.1}><h3 style={{ fontFamily: "var(--f-display)", fontSize: "1.3rem", color: "var(--c-forest)", fontWeight: 600, marginBottom: 12 }}>Microgreens Workshop — The Ashok Leyland School</h3></Reveal>
              <Reveal delay={0.14}><p className="sec-p">We took science out of the lab and into the classroom. Students from Grade 7 and Grade 9 planted, cultivated, observed, and harvested their own microgreens over a 7-day growth cycle — building a real understanding of sustainable nutrition from seed to plate.</p></Reveal>
            </div>
            <Reveal delay={0.18}>
              <div className="ws-stats">
                <div><div className="ws-stat-n"><AnimatedNum target={100} suffix="+" /></div><div className="ws-stat-l">Students Trained</div></div>
                <div><div className="ws-stat-n">2</div><div className="ws-stat-l">Grade Levels</div></div>
                <div><div className="ws-stat-n"><AnimatedNum target={7} /></div><div className="ws-stat-l">Day Growth Cycle</div></div>
              </div>
            </Reveal>
          </div>

          <div className="ws-carousel-outer">
            <div className="ws-carousel">
              <div className="ws-slide ws-slide-prev" onClick={() => { setSlideDir(-1); setSlide(s => (s - 1 + workshopImages.length) % workshopImages.length); }}>
                <img src={workshopImages[(slide - 1 + workshopImages.length) % workshopImages.length].src} alt="" />
              </div>
              <div key={slide} className={`ws-slide ws-slide-active ${slideDir > 0 ? 'dir-next' : 'dir-prev'}`} onClick={() => setLightbox(slide)}>
                <img src={workshopImages[slide].src} alt={workshopImages[slide].caption} />
              </div>
              <div className="ws-slide ws-slide-next" onClick={() => { setSlideDir(1); setSlide(s => (s + 1) % workshopImages.length); }}>
                <img src={workshopImages[(slide + 1) % workshopImages.length].src} alt="" />
              </div>
            </div>
            <div className="ws-active-cap">{workshopImages[slide].caption}</div>
            <div className="ws-carousel-nav">
              <button className="ws-arrow" onClick={() => { setSlideDir(-1); setSlide(s => (s - 1 + workshopImages.length) % workshopImages.length); }}><Ico.ChevL /></button>
              <div className="ws-dots-row">
                {workshopImages.map((_, i) => (
                  <button key={i} className={`ws-dot${slide === i ? ' active' : ''}`} onClick={() => { setSlideDir(i > slide ? 1 : -1); setSlide(i); }} />
                ))}
              </div>
              <button className="ws-arrow" onClick={() => { setSlideDir(1); setSlide(s => (s + 1) % workshopImages.length); }}><Ico.ChevR /></button>
            </div>
          </div>

          <div className="ws-types">
            <Reveal>
              <div className="ws-type-card">
                <h3>Microgreens Workshop</h3>
                <ul className="ws-type-list">
                  {[
                    "How to grow and harvest microgreens step by step",
                    "Health and nutritional benefits of different microgreen varieties",
                    "Simple, practical recipes to include microgreens in daily meals",
                  ].map((p, i) => (
                    <li key={i}><span className="chk"><Ico.Check /></span>{p}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="ws-type-card">
                <h3>Urban Farming Training</h3>
                <p>Training individuals and institutions in small-scale food production systems — covering indoor farming setup, space planning, and day-to-day cultivation management.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── LIGHTBOX ── */}
      {lightbox !== null && (
        <div className="lb" onClick={() => setLightbox(null)}>
          <button className="lb-btn lb-close" onClick={() => setLightbox(null)}><Ico.X /></button>
          <button className="lb-btn lb-prev" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + workshopImages.length) % workshopImages.length); }}><Ico.ChevL /></button>
          <img src={workshopImages[lightbox].src} alt="" onClick={(e) => e.stopPropagation()} />
          <div className="lb-cap">{workshopImages[lightbox].caption}</div>
          <button className="lb-btn lb-next" onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % workshopImages.length); }}><Ico.ChevR /></button>
        </div>
      )}

      {/* ── SERVICES ── */}
      <div className="services-wrap" id="services">
        <div className="sec">
          <Reveal><div className="sec-tag">Services</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">What We Offer</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p">Comprehensive support for nutrition education, sustainable agriculture, and microgreens innovation — tailored for schools, institutions, and communities.</p></Reveal>
          <div className="srv-grid">
            {[
              "Nutrition education programs for schools, colleges, and community groups",
              "Sustainable agriculture training and hands-on microgreens cultivation guidance",
              "Urban farming setup support for institutions and individuals",
              "Research collaboration support for functional food and microgreens innovation",
              "Educational workshops tailored to your audience and goals",
            ].map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="srv-item"><span className="bullet"><Ico.Check /></span><span>{s}</span></div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── COLLABORATIONS ── */}
      <div className="collab-wrap" id="collaborations">
        <div className="sec">
          <Reveal><div className="sec-tag">Collaborations</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Growing Together</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p">We partner with schools, colleges and universities, NGOs, nutrition researchers, and agriculture innovators. These partnerships help expand our reach across research, education, and community impact.</p></Reveal>

          <div className="collab-cards">
            {[
              { icon: <Ico.Book />, bg: "#e6f5ea", color: "#0a6b3a", title: "Schools", desc: "Nutrition education and microgreens workshops" },
              { icon: <Ico.Flask />, bg: "#eaf0fa", color: "#2a5aa5", title: "Colleges & Universities", desc: "Research projects and student internships" },
              { icon: <Ico.Users />, bg: "#f3eafa", color: "#7a3db8", title: "NGOs", desc: "Community outreach and sustainable living programs" },
              { icon: <Ico.Target />, bg: "#fdf6e3", color: "#b8860b", title: "Nutrition Researchers", desc: "Collaborative studies and publications" },
              { icon: <Ico.Sprout />, bg: "#e6f5f0", color: "#1a7560", title: "Agriculture Innovators", desc: "Technology and farming systems development" },
            ].map((c, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="collab-card">
                  <div className="collab-icon" style={{ background: c.bg, color: c.color }}>{c.icon}</div>
                  <div><h4>{c.title}</h4><p>{c.desc}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── IMPACT & ROADMAP ── */}
      <div className="roadmap-wrap" id="roadmap">
        <div className="sec">
          <Reveal><div className="sec-tag">Impact & Roadmap</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Where We Are Headed</h2></Reveal>
          <ul className="roadmap-list">
            {[
              "Expand nutrition education programs to more schools and communities across Tamil Nadu",
              "Develop and launch functional food innovations using microgreens",
              "Build replicable sustainable food system models for urban institutions",
              "Strengthen and scale research collaborations with academic and government bodies",
              "Contribute to healthier communities and more resilient local food systems",
            ].map((r, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <li><span className="roadmap-num">{String(i + 1).padStart(2, "0")}</span><span>{r}</span></li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* ── CONTACT ── */}
      <div className="contact-wrap" id="contact">
        <div className="contact-sec">
          <div className="contact-grid">
            <div className="contact-left">
              <Reveal><div className="sec-tag">Start a Conversation</div></Reveal>
              <Reveal delay={0.06}><h2 className="sec-h">Let's Grow Something<br />That Matters</h2></Reveal>
              <Reveal delay={0.12}><p className="contact-desc">Whether you're a school planning a microgreens workshop, a college seeking a research collaboration, or a community group ready to start growing — we're here to help.</p></Reveal>

              <Reveal delay={0.18}>
                <div className="contact-info-cards">
                  <a href="mailto:contact@sivsankrivitahealth.com" style={{ textDecoration: "none" }}>
                    <div className="contact-info-card">
                      <div className="contact-info-icon"><Ico.Mail /></div>
                      <div>
                        <h4>Email Us</h4>
                        <p>contact@sivsankrivitahealth.com</p>
                      </div>
                    </div>
                  </a>
                  <div className="contact-info-card">
                    <div className="contact-info-icon"><Ico.Pin /></div>
                    <div>
                      <h4>Location</h4>
                      <p>Tamil Nadu, India</p>
                    </div>
                  </div>
                  <div className="contact-info-card">
                    <div className="contact-info-icon"><Ico.Clock /></div>
                    <div>
                      <h4>Response Time</h4>
                      <p>We typically respond within 24 hours</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.14}>
              <div className="contact-form-card">
                <h3>Send us a message</h3>
                <p className="form-sub">Fill out the form and we'll get back to you shortly.</p>
                <form className="contact-form" onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-field">
                      <label>Name *</label>
                      <input type="text" name="name" placeholder="Your full name" value={formData.name} onChange={handleFormChange} required />
                    </div>
                    <div className="form-field">
                      <label>Email *</label>
                      <input type="email" name="email" placeholder="you@example.com" value={formData.email} onChange={handleFormChange} required />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Organization</label>
                    <input type="text" name="organization" placeholder="School, college, or company name" value={formData.organization} onChange={handleFormChange} />
                  </div>
                  <div className="form-field">
                    <label>Message *</label>
                    <textarea name="message" placeholder="Tell us about your project or inquiry..." rows="5" value={formData.message} onChange={handleFormChange} required />
                  </div>
                  <button type="submit" className={`submit-btn ${formStatus}`} disabled={formStatus === "sending"}>
                    {formStatus === "idle" && <><Ico.Send /> Send Message</>}
                    {formStatus === "sending" && "Sending..."}
                    {formStatus === "success" && <><Ico.Check /> Message Sent!</>}
                    {formStatus === "error" && "Failed — Try Again"}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <span style={{ fontFamily: "var(--f-display)", fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Sivsankri Vita Health</span>
              <p>Sivsankri Vita Health Pvt Ltd — microgreens cultivation, nutrition education, and sustainable urban agriculture for schools, institutions, and communities across Tamil Nadu.</p>
            </div>
            <div className="footer-col">
              <h5>Navigate</h5>
              {[["about", "About Us"], ["microgreens", "Why Microgreens"], ["workshop", "Workshops & Training"], ["services", "Services"], ["contact", "Contact"]].map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); go(id); }}>{label}</a>
              ))}
            </div>
            <div className="footer-col">
              <h5>Get in Touch</h5>
              <a href="mailto:contact@sivsankrivitahealth.com"><Ico.Mail /> contact@sivsankrivitahealth.com</a>
              <a href="#"><Ico.Pin /> Tamil Nadu, India</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{"\u00A9"} 2026 Sivsankri Vita Health Private Limited. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<VitaHealth />);
