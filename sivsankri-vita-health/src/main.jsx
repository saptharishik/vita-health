import { createRoot } from "react-dom/client";
import { useState, useEffect, useRef, useCallback } from "react";

/* ─── Intersection Observer Hook ─── */
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

/* ─── Counter Animation ─── */
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

/* ─── SVG Icons ─── */
const Ico = {
  Dna: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 15c6.667-6 13.333 0 20-6"/><path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993"/><path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993"/><path d="M2 9c6.667 6 13.333 0 20 6"/></svg>,
  Shield: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
  Sprout: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 20h10"/><path d="M10 20c5.5-2.5.8-6.4 3-10"/><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z"/><path d="M14.1 6a7 7 0 00-1.5 3.3 9.6 9.6 0 012.3-3C16 5 17.7 4.5 20 4.5a7.1 7.1 0 01-2.7 4.2c-1.1.8-2.2 1.2-3.2 1.3"/></svg>,
  Factory: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 20a2 2 0 002 2h16a2 2 0 002-2V8l-7 5V8l-7 5V4a2 2 0 00-2-2H4a2 2 0 00-2 2z"/></svg>,
  Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10"/></svg>,
  Menu: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16M4 16h16"/></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5"/></svg>,
  ChevL: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>,
  ChevR: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7"/></svg>,
  Phone: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>,
  Pin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>,
};

export default function VitaHealth() {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lightbox, setLightbox] = useState(null);
  const [activeDot, setActiveDot] = useState(0);
  const [slide, setSlide] = useState(0);
  const [slideDir, setSlideDir] = useState(1);
  const sliderRef = useRef(null);

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

  const slideScroll = useCallback(() => {
    const el = sliderRef.current;
    if (!el) return;
    const cardW = el.firstChild?.offsetWidth + 24 || 404;
    const idx = Math.round(el.scrollLeft / cardW);
    setActiveDot(idx);
  }, []);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;
    el.addEventListener("scroll", slideScroll, { passive: true });
    return () => el.removeEventListener("scroll", slideScroll);
  }, [slideScroll]);

  const slideTo = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    const cardW = el.firstChild?.offsetWidth + 24 || 404;
    el.scrollBy({ left: dir * cardW, behavior: "smooth" });
  };

  const slideToDot = (i) => {
    const el = sliderRef.current;
    if (!el) return;
    const cardW = el.firstChild?.offsetWidth + 24 || 404;
    el.scrollTo({ left: i * cardW, behavior: "smooth" });
  };

  const workshopImages = [
    { src: "/workshop-images/workshop-3.jpeg", caption: "Our facilitator conducts an interactive session on microgreens as sustainable superfoods at Prasan Vidya Mandir, Mamandur" },
    { src: "/workshop-images/workshop-4.jpeg", caption: "Students seated in groups across the school hall, recording growth observations and completing their cultivation worksheets with cocopeat trays beside them" },
    { src: "/workshop-images/workshop-5.jpeg", caption: "Overhead view of students with their individual cocopeat growing kits and seed vials, documenting their planting process step by step" },
    { src: "/workshop-images/workshop-6.jpeg", caption: "Students raise their hands enthusiastically during the Q&A session of the Microgreens Program — a packed auditorium engaged with the science of sustainable nutrition" },
  ];

  const services = [
    { icon: <Ico.Dna />, title: "Formulation & Product Development", points: ["Bioactive ingredient screening & standardization", "Stability profiling under accelerated conditions", "Bioavailability enhancement via nano-delivery systems", "Prototype iteration with sensory evaluation", "Scientific substantiation & claims support"], color: "#0a6b3a" },
    { icon: <Ico.Shield />, title: "Regulatory & Compliance Strategy", points: ["FSSAI / AYUSH / CDSCO dossier preparation", "International market filing (EU, ASEAN, GCC)", "Label claim validation & nutritional profiling", "Submission roadmap & liaison support"], color: "#b8860b" },
    { icon: <Ico.Sprout />, title: "Microgreens & Sustainable Agro Systems", points: ["Controlled-environment agriculture (CEA) design", "Turnkey microgreen farm setup & training", "Commercial cultivation & harvest protocols", "Value-added product development & branding"], color: "#1a7560" },
    { icon: <Ico.Factory />, title: "Lab & Infrastructure Planning", points: ["QC / QA laboratory design & accreditation support", "Pilot-scale processing facility layout", "GMP-compliant production line engineering", "Equipment specification & vendor management"], color: "#8b5a2b" },
  ];

  const process = [
    { n: "01", t: "Discovery", d: "Stakeholder alignment, scope definition, feasibility mapping" },
    { n: "02", t: "Research", d: "Literature review, ingredient sourcing, analytical method development" },
    { n: "03", t: "Validate", d: "Bench trials, stability studies, safety & efficacy testing" },
    { n: "04", t: "Document", d: "Technical dossiers, regulatory filings, IP documentation" },
    { n: "05", t: "Scale", d: "Pilot production, process optimization, quality benchmarking" },
    { n: "06", t: "Launch", d: "Commercial manufacturing, market entry, post-launch monitoring" },
  ];

  const navScrolled = scrollY > 60;

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
  --c-amber: #a67c00;
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

/* ── GRAIN ── */
.grain { position: fixed; inset: 0; pointer-events: none; z-index: 9999; opacity: 0.018; background: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='g'%3E%3CfeTurbulence baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E"); }

/* ── NAV ── */
.topnav { position: fixed; top: 0; left: 0; right: 0; z-index: 100; padding: 22px 0; transition: all 0.45s cubic-bezier(.4,0,.2,1); }
.topnav.solid { background: rgba(247,250,246,0.88); backdrop-filter: blur(24px) saturate(1.4); -webkit-backdrop-filter: blur(24px) saturate(1.4); padding: 14px 0; box-shadow: 0 1px 0 rgba(10,46,26,0.06); }
.topnav-inner { max-width: 1320px; margin: 0 auto; padding: 0 40px; display: flex; align-items: center; justify-content: space-between; }
.logo { display: flex; align-items: center; gap: 14px; text-decoration: none; color: var(--c-forest); }
.logo-mark { width: 42px; height: 42px; border-radius: 10px; overflow: hidden; }
.logo-mark img { width: 100%; height: 100%; object-fit: contain; }
.logo-text { font-family: var(--f-display); font-size: 1.15rem; font-weight: 600; line-height: 1.15; letter-spacing: -0.01em; }
.logo-text small { display: block; font-family: var(--f-body); font-size: 0.58rem; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-gray-400); margin-top: 3px; }
.nav-links { display: flex; align-items: center; gap: 6px; }
.nav-links a { text-decoration: none; color: var(--c-gray-600); font-size: 0.82rem; font-weight: 500; padding: 8px 18px; border-radius: 100px; transition: all 0.25s; letter-spacing: 0.01em; }
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
.hero h1 em { font-weight: 400; color: var(--c-green); }
.hero-sub { font-size: 1.08rem; line-height: 1.8; color: var(--c-gray-600); max-width: 540px; margin-bottom: 44px; font-weight: 300; }
.hero-btns { display: flex; gap: 14px; align-items: center; flex-wrap: wrap; }
.btn { display: inline-flex; align-items: center; gap: 10px; padding: 15px 30px; border-radius: 100px; font-size: 0.88rem; font-weight: 600; font-family: var(--f-body); text-decoration: none; border: none; cursor: pointer; transition: all 0.3s cubic-bezier(.4,0,.2,1); }
.btn-dark { background: var(--c-forest); color: var(--c-white); }
.btn-dark:hover { background: var(--c-emerald); transform: translateY(-2px); box-shadow: var(--shadow-lg); }
.btn-outline { background: transparent; color: var(--c-forest); border: 1.5px solid var(--c-gray-200); }
.btn-outline:hover { border-color: var(--c-forest); background: var(--c-pale); }

/* Hero right: floating card */
.hero-right { position: relative; }
.hero-card { background: var(--c-white); border-radius: var(--radius-xl); padding: 44px; box-shadow: var(--shadow-xl); position: relative; }
.hero-card::after { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: linear-gradient(90deg, var(--c-green), var(--c-gold), var(--c-mint)); border-radius: var(--radius-xl) var(--radius-xl) 0 0; }
.hero-metrics { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
.hero-metric { padding: 24px 20px; text-align: center; position: relative; }
.hero-metric:nth-child(1) { border-right: 1px solid var(--c-gray-100); border-bottom: 1px solid var(--c-gray-100); }
.hero-metric:nth-child(2) { border-bottom: 1px solid var(--c-gray-100); }
.hero-metric:nth-child(3) { border-right: 1px solid var(--c-gray-100); }
.hero-metric-num { font-family: var(--f-display); font-size: 2.6rem; font-weight: 700; color: var(--c-forest); line-height: 1; }
.hero-metric-label { font-size: 0.72rem; color: var(--c-gray-400); font-weight: 500; margin-top: 8px; letter-spacing: 0.04em; }
.hero-float { position: absolute; background: var(--c-white); border-radius: var(--radius); padding: 14px 18px; box-shadow: var(--shadow-md); display: flex; align-items: center; gap: 10px; font-size: 0.78rem; font-weight: 600; color: var(--c-forest); }
.hero-float.f1 { top: -18px; right: -24px; animation: bob 5s ease-in-out infinite; }
.hero-float.f2 { bottom: -14px; left: -28px; animation: bob 5s ease-in-out 2.5s infinite; }
@keyframes bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
.float-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; }

/* ── MARQUEE ── */
.marquee-wrap { background: var(--c-forest); padding: 16px 0; overflow: hidden; position: relative; }
.marquee-track { display: flex; width: max-content; animation: scroll 40s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }
@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.marquee-item { display: flex; align-items: center; gap: 12px; padding: 0 36px; white-space: nowrap; font-size: 0.78rem; font-weight: 500; color: rgba(255,255,255,0.55); letter-spacing: 0.05em; text-transform: uppercase; }
.marquee-item .dot { width: 5px; height: 5px; border-radius: 50%; background: var(--c-gold); flex-shrink: 0; }

/* ── SECTION SHARED ── */
.sec { padding: 130px 40px; max-width: 1320px; margin: 0 auto; }
.sec-tag { display: inline-flex; align-items: center; gap: 10px; font-size: 0.68rem; font-weight: 600; letter-spacing: 0.16em; text-transform: uppercase; color: var(--c-gold); margin-bottom: 18px; }
.sec-tag::before { content: ''; width: 28px; height: 1.5px; background: var(--c-gold); }
.sec-h { font-family: var(--f-display); font-size: clamp(2.2rem, 3.5vw, 3rem); font-weight: 700; color: var(--c-forest); line-height: 1.12; letter-spacing: -0.02em; margin-bottom: 18px; }
.sec-p { font-size: 1.02rem; color: var(--c-gray-400); font-weight: 300; line-height: 1.75; max-width: 580px; }

/* ── SERVICES ── */
.services-wrap { background: var(--c-white); border-top: 1px solid var(--c-gray-100); }
.srv-slider-wrap { position: relative; margin-top: 56px; }
.srv-slider-track { display: flex; gap: 24px; overflow-x: auto; scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch; scrollbar-width: none; padding: 12px 4px 24px; }
.srv-slider-track::-webkit-scrollbar { display: none; }
.srv-card { flex: 0 0 380px; scroll-snap-align: start; background: var(--c-white); border: 1px solid var(--c-gray-100); border-radius: var(--radius-xl); padding: 44px 36px; position: relative; overflow: hidden; transition: all 0.4s cubic-bezier(.16,1,.3,1); cursor: default; }
.srv-card:hover { box-shadow: var(--shadow-lg); transform: translateY(-6px); border-color: transparent; }
.srv-card:hover .srv-card-bar { transform: scaleX(1) !important; }
.srv-card-icon { width: 52px; height: 52px; border-radius: 14px; display: flex; align-items: center; justify-content: center; margin-bottom: 28px; transition: transform 0.3s; }
.srv-card:hover .srv-card-icon { transform: scale(1.08) rotate(-3deg); }
.srv-card h3 { font-family: var(--f-display); font-size: 1.3rem; font-weight: 600; margin-bottom: 20px; line-height: 1.25; }
.srv-card-list { list-style: none; display: flex; flex-direction: column; gap: 12px; }
.srv-card-list li { display: flex; align-items: flex-start; gap: 12px; font-size: 0.86rem; color: var(--c-gray-600); line-height: 1.55; font-weight: 400; }
.srv-card-list li .chk { flex-shrink: 0; width: 20px; height: 20px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-top: 2px; }
.srv-card-num { position: absolute; top: 28px; right: 32px; font-family: var(--f-display); font-size: 3.2rem; font-weight: 700; opacity: 0.04; line-height: 1; }
.srv-slider-nav { display: flex; gap: 10px; margin-top: 32px; align-items: center; }
.srv-nav-btn { width: 44px; height: 44px; border-radius: 50%; border: 1.5px solid var(--c-gray-200); background: var(--c-white); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--c-forest); transition: all 0.25s; }
.srv-nav-btn:hover { background: var(--c-forest); color: var(--c-white); border-color: var(--c-forest); }
.srv-nav-btn:disabled { opacity: 0.3; cursor: default; pointer-events: none; }
.srv-dots { display: flex; gap: 6px; margin-left: 16px; }
.srv-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c-gray-200); border: none; cursor: pointer; transition: all 0.3s; padding: 0; }
.srv-dot.active { background: var(--c-forest); width: 24px; border-radius: 4px; }

@media (max-width: 768px) {
  .srv-card { flex: 0 0 calc(100vw - 64px); }
}

/* ── PROCESS ── */
.process-wrap { background: var(--c-forest); position: relative; overflow: hidden; }
.process-wrap .sec-tag { color: var(--c-gold-light); }
.process-wrap .sec-h { color: var(--c-white); }
.process-wrap .sec-p { color: rgba(255,255,255,0.4); }
.process-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 56px; }
.pstep { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: var(--radius-lg); padding: 36px 28px; transition: all 0.35s; position: relative; }
.pstep:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.12); transform: translateY(-4px); }
.pstep-n { font-family: var(--f-display); font-size: 2.4rem; font-weight: 700; color: var(--c-gold); opacity: 0.3; line-height: 1; margin-bottom: 18px; }
.pstep h4 { font-family: var(--f-display); font-size: 1.15rem; color: var(--c-white); margin-bottom: 8px; font-weight: 600; }
.pstep p { font-size: 0.82rem; color: rgba(255,255,255,0.35); line-height: 1.6; font-weight: 300; }

/* ── WORKSHOP ── */
.workshop-wrap { background: var(--c-pale); border-top: 1px solid var(--c-gray-100); }
.ws-head { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 24px; }
.ws-stats { display: flex; gap: 40px; }
.ws-stat-n { font-family: var(--f-display); font-size: 2rem; font-weight: 700; color: var(--c-forest); line-height: 1; }
.ws-stat-l { font-size: 0.72rem; color: var(--c-gray-400); font-weight: 500; margin-top: 5px; letter-spacing: 0.03em; }

/* ── WORKSHOP CAROUSEL ── */
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
.ws-slide-active.dir-prev { animation: slideInLeft  0.45s cubic-bezier(.16,1,.3,1); }
.ws-active-cap { padding: 14px 18px; font-size: 0.82rem; color: var(--c-gray-600); line-height: 1.6; font-weight: 400; background: var(--c-white); border-top: 1px solid var(--c-gray-100); border-radius: 0 0 var(--radius-lg) var(--radius-lg); width: 48%; margin: 0 auto; box-shadow: var(--shadow-md); }
.ws-carousel-nav { display: flex; align-items: center; justify-content: center; gap: 20px; margin-top: 28px; }
.ws-arrow { width: 48px; height: 48px; border-radius: 50%; border: 1.5px solid var(--c-gray-200); background: var(--c-white); cursor: pointer; display: flex; align-items: center; justify-content: center; color: var(--c-forest); transition: all 0.25s; box-shadow: var(--shadow-sm); }
.ws-arrow:hover { background: var(--c-forest); color: var(--c-white); border-color: var(--c-forest); transform: scale(1.08); }
.ws-dots-row { display: flex; gap: 8px; }
.ws-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--c-gray-200); border: none; cursor: pointer; transition: all 0.3s; padding: 0; }
.ws-dot.active { background: var(--c-forest); width: 24px; border-radius: 4px; }
@media (max-width: 768px) {
  .ws-slide-prev, .ws-slide-next { width: 14%; }
  .ws-slide-active { width: 68%; }
  .ws-active-cap { width: 68%; }
}

/* ── ABOUT ── */
.about-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 80px; margin-top: 56px; }
.about-vision h3 { font-family: var(--f-display); font-size: 1.4rem; color: var(--c-forest); margin-bottom: 14px; font-weight: 600; }
.about-vision p { font-size: 0.95rem; color: var(--c-gray-600); line-height: 1.8; font-weight: 300; margin-bottom: 32px; }
.about-mission { list-style: none; display: flex; flex-direction: column; gap: 16px; }
.about-mission li { display: flex; align-items: flex-start; gap: 14px; font-size: 0.92rem; color: var(--c-gray-600); line-height: 1.6; }
.about-mission .bullet { flex-shrink: 0; width: 28px; height: 28px; border-radius: 8px; background: var(--c-pale); color: var(--c-green); display: flex; align-items: center; justify-content: center; margin-top: 1px; }
.diff-grid { display: flex; flex-direction: column; gap: 12px; }
.diff-card { display: flex; align-items: flex-start; gap: 16px; padding: 22px; border-radius: var(--radius); background: var(--c-white); border: 1px solid var(--c-gray-100); transition: all 0.3s; }
.diff-card:hover { box-shadow: var(--shadow-md); transform: translateX(6px); border-color: var(--c-pale); }
.diff-icon { flex-shrink: 0; width: 40px; height: 40px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; }
.diff-card h4 { font-size: 0.88rem; font-weight: 600; color: var(--c-forest); margin-bottom: 3px; }
.diff-card p { font-size: 0.78rem; color: var(--c-gray-400); line-height: 1.5; font-weight: 300; }

/* ── CTA ── */
.cta-wrap { background: linear-gradient(160deg, var(--c-forest) 0%, var(--c-emerald) 100%); position: relative; overflow: hidden; }
.cta-inner { max-width: 800px; margin: 0 auto; padding: 110px 40px; text-align: center; position: relative; z-index: 2; }
.cta-inner .sec-tag { color: var(--c-gold-light); justify-content: center; }
.cta-inner .sec-tag::before { background: var(--c-gold-light); }
.cta-inner .sec-h { color: var(--c-white); }
.cta-inner p { color: rgba(255,255,255,0.5); font-size: 1.05rem; line-height: 1.75; font-weight: 300; margin-bottom: 40px; max-width: 520px; margin-left: auto; margin-right: auto; }
.cta-btns { display: flex; gap: 14px; justify-content: center; flex-wrap: wrap; }
.btn-gold { background: var(--c-gold); color: var(--c-forest); }
.btn-gold:hover { background: #daa730; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(201,154,46,0.3); }
.btn-ghost { background: transparent; color: var(--c-white); border: 1.5px solid rgba(255,255,255,0.2); }
.btn-ghost:hover { border-color: rgba(255,255,255,0.5); background: rgba(255,255,255,0.06); }

/* ── FOOTER ── */
.footer { background: var(--c-gray-900); color: rgba(255,255,255,0.4); padding: 72px 40px 36px; }
.footer-inner { max-width: 1320px; margin: 0 auto; }
.footer-grid { display: grid; grid-template-columns: 1.8fr 1fr 1fr; gap: 60px; padding-bottom: 48px; border-bottom: 1px solid rgba(255,255,255,0.06); }
.footer-brand p { margin-top: 18px; font-size: 0.82rem; line-height: 1.7; font-weight: 300; max-width: 340px; }
.footer-col h5 { color: rgba(255,255,255,0.7); font-size: 0.7rem; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; margin-bottom: 18px; }
.footer-col a { display: flex; align-items: center; gap: 8px; color: rgba(255,255,255,0.35); text-decoration: none; font-size: 0.84rem; padding: 5px 0; font-weight: 300; transition: color 0.25s; }
.footer-col a:hover { color: var(--c-gold); }
.footer-col a svg { opacity: 0.5; }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 28px; font-size: 0.72rem; flex-wrap: wrap; gap: 12px; }
.footer-cin { font-family: var(--f-body); font-size: 0.68rem; letter-spacing: 0.05em; opacity: 0.4; }

/* ── LIGHTBOX ── */
.lb { position: fixed; inset: 0; z-index: 200; background: rgba(10,46,26,0.95); display: flex; align-items: center; justify-content: center; padding: 32px; animation: fadeUp 0.35s ease; backdrop-filter: blur(8px); }
@keyframes fadeUp { from { opacity: 0; } to { opacity: 1; } }
.lb img { max-width: 88vw; max-height: 80vh; object-fit: contain; border-radius: var(--radius-lg); box-shadow: var(--shadow-xl); }
.lb-cap { position: absolute; bottom: 32px; left: 50%; transform: translateX(-50%); color: rgba(255,255,255,0.8); text-align: center; font-size: 0.88rem; font-weight: 400; max-width: 600px; line-height: 1.6; }
.lb-btn { position: absolute; background: rgba(255,255,255,0.08); border: 1px solid rgba(255,255,255,0.1); color: white; width: 48px; height: 48px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.25s; }
.lb-btn:hover { background: rgba(255,255,255,0.16); }
.lb-close { top: 24px; right: 32px; }
.lb-prev { top: 50%; left: 24px; transform: translateY(-50%); }
.lb-next { top: 50%; right: 24px; transform: translateY(-50%); }

/* ── MOBILE MENU ── */
.mob-overlay { position: fixed; inset: 0; z-index: 150; background: rgba(247,250,246,0.97); backdrop-filter: blur(20px); display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 28px; animation: fadeUp 0.3s ease; }
.mob-overlay a { font-family: var(--f-display); font-size: 1.6rem; color: var(--c-forest); text-decoration: none; font-weight: 600; }
.mob-overlay a:hover { color: var(--c-green); }
.mob-x { position: absolute; top: 22px; right: 32px; background: none; border: none; cursor: pointer; color: var(--c-forest); }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .hero-inner { grid-template-columns: 1fr; gap: 48px; }
  .hero-right { max-width: 480px; }
  .services-layout { grid-template-columns: 1fr; }
  .process-grid { grid-template-columns: repeat(2, 1fr); }
  .about-layout { grid-template-columns: 1fr; gap: 48px; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 768px) {
  .nav-links { display: none; }
  .mob-btn { display: block; }
  .sec { padding: 80px 24px; }
  .hero-inner { padding: 130px 24px 60px; }
  .hero h1 { font-size: 2.4rem; }
  .hero-btns { flex-direction: column; align-items: flex-start; width: 100%; }
  .hero-btns .btn { width: 100%; justify-content: center; }
  .hero-card { padding: 28px; }
  .hero-float { display: none; }
  .sec-h { font-size: 2rem; }
  .srv-detail { padding: 32px 24px; }
  .process-grid { grid-template-columns: 1fr; }
  .ws-stats { gap: 24px; }
  .cta-btns { flex-direction: column; align-items: center; }
  .footer-grid { grid-template-columns: 1fr; gap: 32px; }
  .footer-bottom { flex-direction: column; text-align: center; }
}
      `}</style>
      <div className="grain" />

      {/* ── NAV ── */}
      <nav className={`topnav ${navScrolled ? "solid" : ""}`}>
        <div className="topnav-inner">
          <a href="#" className="logo" onClick={(e) => { e.preventDefault(); go("top"); }}>
            <div className="logo-mark"><img src="/mnt/user-data/uploads/1772563099907_image.png" alt="SVH" /></div>
            <div className="logo-text">Vita Health<small>Sivsankri Private Limited</small></div>
          </a>
          <div className="nav-links">
            <a href="#services" onClick={(e)=>{e.preventDefault();go("services")}}>Services</a>
            <a href="#process" onClick={(e)=>{e.preventDefault();go("process")}}>Process</a>
            <a href="#workshop" onClick={(e)=>{e.preventDefault();go("workshop")}}>Workshop</a>
            <a href="#about" onClick={(e)=>{e.preventDefault();go("about")}}>About</a>
            <a href="#contact" onClick={(e)=>{e.preventDefault();go("contact")}} className="cta">Get in Touch</a>
          </div>
          <button className="mob-btn" onClick={()=>setMenuOpen(true)}><Ico.Menu /></button>
        </div>
      </nav>

      {menuOpen && (
        <div className="mob-overlay">
          <button className="mob-x" onClick={()=>setMenuOpen(false)}><Ico.X /></button>
          {["top|Home","services|Services","process|Process","workshop|Workshop","about|About","contact|Contact"].map(s => {
            const [id,label] = s.split("|");
            return <a key={id} href="#" onClick={(e)=>{e.preventDefault();go(id)}}>{label}</a>;
          })}
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
            <Reveal delay={0.08}><h1>Where Rigorous<br />Science Meets<br /><em>Sustainable Nutrition</em></h1></Reveal>
            <Reveal delay={0.16}><p className="hero-sub">We engineer nutraceutical products from molecule to market — combining deep formulation science, regulatory precision, and controlled-environment agriculture to build the future of functional food.</p></Reveal>
            <Reveal delay={0.24}>
              <div className="hero-btns">
                <a href="#services" className="btn btn-dark" onClick={(e)=>{e.preventDefault();go("services")}}>Explore Our Capabilities <Ico.Arrow /></a>
                <a href="#about" className="btn btn-outline" onClick={(e)=>{e.preventDefault();go("about")}}>Our Story</a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="hero-right">
              <div className="hero-card">
                <div className="hero-metrics">
                  <div className="hero-metric"><div className="hero-metric-num"><AnimatedNum target={5} suffix="+" /></div><div className="hero-metric-label">Core Disciplines</div></div>
                  <div className="hero-metric"><div className="hero-metric-num">360°</div><div className="hero-metric-label">Integrated Approach</div></div>
                  <div className="hero-metric"><div className="hero-metric-num">SDG</div><div className="hero-metric-label">Aligned Mission</div></div>
                  <div className="hero-metric"><div className="hero-metric-num">E2E</div><div className="hero-metric-label">Lab → Market</div></div>
                </div>
              </div>
              <div className="hero-float f1"><div className="float-dot" style={{background:"var(--c-mint)"}} />Sustainability First</div>
              <div className="hero-float f2"><div className="float-dot" style={{background:"var(--c-gold)"}} />Science-Backed</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: "flex" }}>
              {["Nutraceutical R&D","Regulatory Strategy","Functional Foods","Microgreens Systems","Bioavailability Enhancement","CEA Technology","GMP Consulting","Institutional Partnerships","Product Commercialization","Sustainability Innovation"].map((t, j) => (
                <span key={j} className="marquee-item"><span className="dot" />{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ── SERVICES ── */}
      <div className="services-wrap" id="services">
        <div className="sec">
          <Reveal><div className="sec-tag">What We Do</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">End-to-End Innovation<br />Across Four Pillars</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p">From early-stage formulation science through regulatory clearance to commercial-scale production — we provide the full spectrum of expertise needed to bring functional nutrition to market.</p></Reveal>

          <div className="srv-slider-wrap">
            <div className="srv-slider-track" ref={sliderRef}>
              {services.map((s, i) => (
                <div key={i} className="srv-card" style={{ "--srv-c": s.color }}>
                  <span style={{ position:"absolute", top:0, left:0, right:0, height:3, background: s.color, transform: "var(--before-scale, scaleX(0))", transformOrigin: "left", transition: "transform 0.4s ease" }} className="srv-card-bar" />
                  <div className="srv-card-num">{String(i + 1).padStart(2, "0")}</div>
                  <div className="srv-card-icon" style={{ background: `${s.color}12`, color: s.color }}>{s.icon}</div>
                  <h3 style={{ color: s.color }}>{s.title}</h3>
                  <ul className="srv-card-list">
                    {s.points.map((p, j) => (
                      <li key={j}><span className="chk" style={{ background: `${s.color}12`, color: s.color }}><Ico.Check /></span>{p}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            <div className="srv-slider-nav">
              <button className="srv-nav-btn" onClick={() => slideTo(-1)} disabled={activeDot === 0}><Ico.ChevL /></button>
              <button className="srv-nav-btn" onClick={() => slideTo(1)} disabled={activeDot >= services.length - 1}><Ico.ChevR /></button>
              <div className="srv-dots">
                {services.map((_, i) => (
                  <button key={i} className={`srv-dot ${activeDot === i ? "active" : ""}`} onClick={() => slideToDot(i)} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── PROCESS ── */}
      <div className="process-wrap" id="process">
        <div className="sec">
          <Reveal><div className="sec-tag">Our Methodology</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Six Stages from Concept<br />to Commercialization</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p">A disciplined, milestone-driven framework that transforms ideas into market-ready products with full scientific and regulatory backing.</p></Reveal>
          <div className="process-grid">
            {process.map((s, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="pstep">
                  <div className="pstep-n">{s.n}</div>
                  <h4>{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── WORKSHOP ── */}
      <div className="workshop-wrap" id="workshop">
        <div className="sec">
          <div className="ws-head">
            <div>
              <Reveal><div className="sec-tag">Community Impact</div></Reveal>
              <Reveal delay={0.06}><h2 className="sec-h">Microgreens Workshop —<br />The Ashok Leyland School</h2></Reveal>
              <Reveal delay={0.12}><p className="sec-p">We took science out of the lab and into the classroom. Students across Grade 7 and Grade 9 planted, cultivated, observed, and harvested their own microgreens over a 7-day cycle — building real understanding of sustainable nutrition from seed to plate.</p></Reveal>
            </div>
            <Reveal delay={0.15}>
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

      {/* ── ABOUT ── */}
      <div id="about">
        <div className="sec">
          <Reveal><div className="sec-tag">Who We Are</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Built on Science,<br />Driven by Purpose</h2></Reveal>

          <div className="about-layout">
            <Reveal delay={0.1}>
              <div className="about-vision">
                <h3>Our Vision</h3>
                <p>To become India's most trusted integrated nutraceutical and sustainable food innovation company — one that delivers scientifically validated, regulatory-ready solutions that genuinely improve how people nourish themselves and the planet.</p>
                <h3>Our Mission</h3>
                <ul className="about-mission">
                  <li><span className="bullet"><Ico.Check /></span>Produce measurable R&D outcomes through rigorous, peer-reviewable science</li>
                  <li><span className="bullet"><Ico.Check /></span>Maintain regulatory compliance excellence across every product we touch</li>
                  <li><span className="bullet"><Ico.Check /></span>Advance sustainable, scalable nutrition systems that work for institutions, entrepreneurs, and communities</li>
                </ul>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <div className="diff-grid">
                {[
                  { emoji: "\u{1F52C}", bg: "#e6f5ea", title: "Science Fused with Sustainability", desc: "Every formulation decision weighs efficacy against environmental footprint" },
                  { emoji: "\u{1F33F}", bg: "#fdf6e3", title: "Microgreens as Functional Superfoods", desc: "Pioneering the integration of microgreen bioactives into commercial nutraceuticals" },
                  { emoji: "\u{1F4CB}", bg: "#eaf0fa", title: "Regulatory-First Product Architecture", desc: "Products engineered for compliance from molecule selection through final labeling" },
                  { emoji: "\u{1F3DB}\uFE0F", bg: "#f3eafa", title: "Institutional & Government Partnerships", desc: "Trusted collaborator with schools, research institutions, and public programs" },
                  { emoji: "\u{2699}\uFE0F", bg: "#fef3e8", title: "Turnkey Innovation Ecosystem", desc: "Full-stack capability: R&D lab, pilot plant, CEA farm, and regulatory desk under one roof" },
                ].map((d, i) => (
                  <div key={i} className="diff-card">
                    <div className="diff-icon" style={{ background: d.bg }}>{d.emoji}</div>
                    <div><h4>{d.title}</h4><p>{d.desc}</p></div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="cta-wrap" id="contact">
        <div className="cta-inner">
          <Reveal><div className="sec-tag">Start a Conversation</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Let's Build Something<br />That Matters</h2></Reveal>
          <Reveal delay={0.12}><p>Whether you're formulating your first nutraceutical, navigating FSSAI approval, or scaling a microgreen farm — we bring the science, the strategy, and the infrastructure to make it real.</p></Reveal>
          <Reveal delay={0.18}>
            <div className="cta-btns">
              <a href="mailto:contact@sivsankrivitahealth.com" className="btn btn-gold">Schedule a Consultation <Ico.Arrow /></a>
              <a href="#services" className="btn btn-ghost" onClick={(e)=>{e.preventDefault();go("services")}}>Explore Services</a>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{width:36,height:36,borderRadius:8,overflow:"hidden"}}><img src="/mnt/user-data/uploads/1772563099907_image.png" alt="SVH" style={{width:"100%",height:"100%",objectFit:"contain"}} /></div>
                <span style={{ fontFamily: "var(--f-display)", fontSize: "1.05rem", color: "rgba(255,255,255,0.85)", fontWeight: 600 }}>Vita Health</span>
              </div>
              <p>Sivsankri Vita Health Private Limited — integrated nutraceutical R&D, regulatory advisory, functional food innovation, and sustainable agriculture systems under one roof.</p>
            </div>
            <div className="footer-col">
              <h5>Navigate</h5>
              <a href="#services" onClick={(e)=>{e.preventDefault();go("services")}}>Services</a>
              <a href="#process" onClick={(e)=>{e.preventDefault();go("process")}}>Our Process</a>
              <a href="#workshop" onClick={(e)=>{e.preventDefault();go("workshop")}}>Workshop</a>
              <a href="#about" onClick={(e)=>{e.preventDefault();go("about")}}>About Us</a>
              <a href="#contact" onClick={(e)=>{e.preventDefault();go("contact")}}>Contact</a>
            </div>
            <div className="footer-col">
              <h5>Get in Touch</h5>
              <a href="mailto:contact@sivsankrivitahealth.com"><Ico.Mail /> contact@sivsankrivitahealth.com</a>
              <a href="#"><Ico.Pin /> Tamil Nadu, India</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>{"\u00A9"} 2026 Sivsankri Vita Health Private Limited. All rights reserved.</span>
            <span className="footer-cin">CIN: INC-33_1-23681748230</span>
          </div>
        </div>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<VitaHealth />);