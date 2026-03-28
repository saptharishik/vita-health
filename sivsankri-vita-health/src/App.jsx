import { useState, useEffect, useRef } from 'react'
import './App.css'

/* ── Intersection-observer hook ── */
function useReveal(threshold = 0.15) {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); io.unobserve(el) } },
      { threshold }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [threshold])
  return [ref, visible]
}

/* ── Reveal wrapper ── */
function Reveal({ children, delay = 0, y = 40, className = '', style = {} }) {
  const [ref, visible] = useReveal()
  return (
    <div ref={ref} className={className} style={{
      ...style,
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : `translateY(${y}px)`,
      transition: `opacity 0.8s cubic-bezier(.16,1,.3,1) ${delay}s, transform 0.8s cubic-bezier(.16,1,.3,1) ${delay}s`,
    }}>
      {children}
    </div>
  )
}

/* ── Animated counter ── */
function Counter({ target, suffix = '', duration = 2000 }) {
  const [ref, visible] = useReveal()
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!visible) return
    let start = 0
    const step = (ts) => {
      if (!start) start = ts
      const p = Math.min((ts - start) / duration, 1)
      setCount(Math.floor(p * target))
      if (p < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [visible, target, duration])
  return <span ref={ref}>{count}{suffix}</span>
}

/* ── SVG Icons ── */
const Icon = {
  Arrow: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M7 7h10v10" /></svg>,
  Menu: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 8h16M4 16h16" /></svg>,
  X: () => <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>,
  Check: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 6L9 17l-5-5" /></svg>,
  ChevL: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>,
  ChevR: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>,
  Mail: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-8.97 5.7a1.94 1.94 0 01-2.06 0L2 7" /></svg>,
  Pin: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>,
  Sprout: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M7 20h10" /><path d="M10 20c5.5-2.5.8-6.4 3-10" /><path d="M9.5 9.4c1.1.8 1.8 2.2 2.3 3.7-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2 2.8-.5 4.4 0 5.5.8z" /><path d="M14.1 6a7 7 0 00-1.5 3.3 9.6 9.6 0 012.3-3C16 5 17.7 4.5 20 4.5a7.1 7.1 0 01-2.7 4.2c-1.1.8-2.2 1.2-3.2 1.3" /></svg>,
  Sun: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" /></svg>,
  Drop: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z" /></svg>,
  Book: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 016.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z" /></svg>,
  Users: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>,
  Flask: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 3h6M10 3v6.5L3 22h18L14 9.5V3" /></svg>,
  Target: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="6" /><circle cx="12" cy="12" r="2" /></svg>,
  Send: () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" /></svg>,
  Clock: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>,
}

/* ── Workshop + Sampling Images ── */
const workshopImages = [
  { src: '/workshop-images/workshop-3.jpeg', caption: 'Our facilitator conducts an interactive session on microgreens as sustainable superfoods at Prasan Vidya Mandir, Mamandur' },
  { src: '/workshop-images/workshop-4.jpeg', caption: 'Students seated in groups across the school hall, recording growth observations and completing their cultivation worksheets with cocopeat trays beside them' },
  { src: '/workshop-images/workshop-5.jpeg', caption: 'Overhead view of students with their individual cocopeat growing kits and seed vials, documenting their planting process step by step' },
  { src: '/workshop-images/workshop-6.jpeg', caption: 'Students raise their hands enthusiastically during the Q&A session of the Microgreens Program' },
]

const samplingImages = [
  { src: '/sampling/Picture1.png', caption: '' },
  { src: '/sampling/Picture2.png', caption: '' },
  { src: '/sampling/Picture3.jpg', caption: '' },
  { src: '/sampling/Picture4.jpg', caption: '' },
  { src: '/sampling/Picture5.jpg', caption: '' },
  { src: '/sampling/Picture6.jpg', caption: '' },
  { src: '/sampling/Picture7.jpg', caption: '' },
  { src: '/sampling/Picture8.jpg', caption: '' },
  { src: '/sampling/Picture9.jpg', caption: '' },
  { src: '/sampling/Picture10.jpg', caption: '' },
]

/* ── Navigation ── */
const navItems = [
  ['top', 'Home'],
  ['about', 'About Us'],
  ['microgreens', 'Why Microgreens'],
  ['research', 'Research & Innovation'],
  ['academics', 'Academic Programs'],
  ['workshop', 'Workshops & Training'],
  ['gallery', 'Gallery'],
  ['services', 'Services'],
  ['collaborations', 'Collaborations'],
  ['roadmap', 'Impact & Roadmap'],
  ['contact', 'Contact'],
]

/* ── Marquee items ── */
const marqueeItems = [
  'Microgreens Cultivation', 'Nutrition Education', 'Sustainable Agriculture',
  'Functional Foods', 'Urban Farming', 'Climate-Resilient Systems',
  'Community Programs', 'Research & Innovation', 'Academic Partnerships', 'Wellness Solutions',
]

export default function App() {
  const [scrollY, setScrollY] = useState(0)
  const [mobOpen, setMobOpen] = useState(false)
  const [lightbox, setLightbox] = useState(null)
  const [wsSlide, setWsSlide] = useState(0)
  const [wsDir, setWsDir] = useState(1)
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle')

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = lightbox !== null ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [lightbox])

  const scrollTo = (id) => {
    setMobOpen(false)
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleInput = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormStatus('sending')
    const subject = encodeURIComponent(`Website Inquiry from ${form.name}`)
    const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nOrganization: ${form.organization}\n\nMessage:\n${form.message}`)
    window.location.href = `mailto:contact@sivsankrivitahealth.com?subject=${subject}&body=${body}`
    setFormStatus('success')
    setForm({ name: '', email: '', organization: '', message: '' })
    setTimeout(() => setFormStatus('idle'), 4000)
  }

  const allImages = workshopImages
  const navSolid = scrollY > 60

  return (
    <>
      {/* ── Grain overlay ── */}
      <div className="grain" />

      {/* ── Navigation ── */}
      <nav className={`topnav ${navSolid ? 'solid' : ''}`}>
        <div className="topnav-inner">
          <a href="#" className="logo" onClick={e => { e.preventDefault(); scrollTo('top') }}>
            <div className="logo-text">
              Sivsankri Vita Health
              <small>Private Limited</small>
            </div>
          </a>
          <div className="nav-links">
            {navItems.slice(1, -1).map(([id, label]) => (
              <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id) }}>{label}</a>
            ))}
            <a href="#contact" onClick={e => { e.preventDefault(); scrollTo('contact') }} className="cta">Contact</a>
          </div>
          <button className="mob-btn" onClick={() => setMobOpen(true)}><Icon.Menu /></button>
        </div>
      </nav>

      {/* ── Mobile overlay ── */}
      {mobOpen && (
        <div className="mob-overlay">
          <button className="mob-x" onClick={() => setMobOpen(false)}><Icon.X /></button>
          {navItems.map(([id, label]) => (
            <a key={id} href="#" onClick={e => { e.preventDefault(); scrollTo(id) }}>{label}</a>
          ))}
        </div>
      )}

      {/* ══════════ HERO ══════════ */}
      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="hero-mesh" />
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <Reveal><div className="hero-eyebrow">Incorporated under Companies Act, 2013</div></Reveal>
            <Reveal delay={0.08}>
              <h1>Building Climate-Smart<br /><em>Nutrition Solutions</em></h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="hero-sub">
                Developing microgreens-based functional foods to combat triple burden of malnutrition
                — through research, education, and community programs that promote climate-resilient,
                eco-friendly sustainable food systems.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="hero-btns">
                <a href="#microgreens" className="btn btn-dark" onClick={e => { e.preventDefault(); scrollTo('microgreens') }}>
                  Explore Our Work <Icon.Arrow />
                </a>
                <a href="#about" className="btn btn-outline" onClick={e => { e.preventDefault(); scrollTo('about') }}>
                  Our Story
                </a>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="hero-right">
              <div className="hero-card">
                <div className="hero-metrics">
                  <div className="hero-metric">
                    <div className="hero-metric-num">7–14</div>
                    <div className="hero-metric-label">Days Harvest Cycle</div>
                  </div>
                  <div className="hero-metric">
                    <div className="hero-metric-num"><Counter target={100} suffix="+" /></div>
                    <div className="hero-metric-label">Students Trained</div>
                  </div>
                  <div className="hero-metric">
                    <div className="hero-metric-num">SDG</div>
                    <div className="hero-metric-label">Aligned Mission</div>
                  </div>
                  <div className="hero-metric">
                    <div className="hero-metric-num">Triple</div>
                    <div className="hero-metric-label">Burden Addressed</div>
                  </div>
                </div>
              </div>
              <div className="hero-float f1">
                <div className="float-dot" style={{ background: 'var(--c-mint)' }} />Climate-Smart
              </div>
              <div className="hero-float f2">
                <div className="float-dot" style={{ background: 'var(--c-gold)' }} />Science-Backed
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="marquee-wrap">
        <div className="marquee-track">
          {[...Array(2)].map((_, i) => (
            <div key={i} style={{ display: 'flex' }}>
              {marqueeItems.map((item, j) => (
                <span key={j} className="marquee-item"><span className="dot" />{item}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ══════════ ABOUT ══════════ */}
      <div className="about-wrap" id="about">
        <div className="sec">
          <Reveal><div className="sec-tag">Who We Are</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Built on Science,<br />Driven by Purpose</h2></Reveal>
          <div className="about-grid">
            <div>
              <Reveal delay={0.1}>
                <p className="about-text">
                  Sivsankri Vita Health Pvt Ltd is a Tamil Nadu–based company dedicated to developing
                  microgreens as functional foods that address real nutrition challenges. Incorporated under the
                  Companies Act, 2013, we operate at the intersection of food science, sustainable agriculture,
                  and community education.
                </p>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="about-text">
                  Our work is guided by one core belief: that the most powerful nutrition solutions are the ones
                  that are also the most sustainable. Microgreens — young, fast-growing edible plants
                  harvested within 7 to 14 days — which sits at the heart of everything we do.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="about-text">
                  From school workshops to research collaborations with colleges and universities, we translate
                  science into impactful solutions — empowering students, families, and communities to grow
                  and eat better nutritional foods.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.16}>
              <div className="about-highlights">
                {[
                  { icon: <Icon.Sprout />, bg: '#e6f5ea', color: '#0a6b3a', title: 'Microgreens-First', desc: 'Centered on nutrient-dense, fast-growing superfoods' },
                  { icon: <Icon.Sun />, bg: '#fdf6e3', color: '#b8860b', title: 'Climate-Resilient', desc: 'Low-resource, sustainable food production systems' },
                  { icon: <Icon.Users />, bg: '#eaf0fa', color: '#2a5aa5', title: 'Community-Driven', desc: 'Education programs for schools and communities' },
                  { icon: <Icon.Flask />, bg: '#f3eafa', color: '#7a3db8', title: 'Research-Backed', desc: 'Science-led innovation from lab to table' },
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

      {/* ══════════ VISION & MISSION ══════════ */}
      <div className="vm-section">
        <div className="sec">
          <Reveal><div className="sec-tag">Vision &amp; Mission</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">What Drives Us Forward</h2></Reveal>
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
                    'Develop functional foods using microgreens to improve everyday nutrition',
                    'Address the triple burden of malnutrition — undernutrition, micronutrient deficiency, and overnutrition',
                    'Promote sustainable urban agriculture that is low-resource and climate-resilient',
                    'Foster communities through hands-on nutrition education and training',
                  ].map((item, i) => (
                    <li key={i}><span className="mission-bullet"><Icon.Check /></span>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ══════════ WHY MICROGREENS ══════════ */}
      <div className="mg-wrap" id="microgreens">
        <div className="sec" style={{ position: 'relative' }}>
          <Reveal><div className="sec-tag">Why Microgreens</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Small Plants<br />Big Nutrition</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              Microgreens are young edible plants harvested within 7 to 14 days of growth. They are
              known for their high nutrient density and fast growth cycle, making them one of the most
              promising options for sustainable food production in both urban and rural settings.
            </p>
          </Reveal>
          <div className="mg-cards">
            {[
              { icon: <Icon.Sprout />, title: 'Nutrient Dense', desc: 'Microgreens shall contain concentrated vitamins, minerals, and antioxidants — packed into every small bite.', bg: '#e6f5ea', color: '#0a6b3a' },
              { icon: <Icon.Sun />, title: 'Climate-Resilient', desc: 'They require minimal land or no soil, grow quickly in controlled environments, and are well suited to urban farming — even in small cabinet spaces.', bg: '#fdf6e3', color: '#b8860b' },
              { icon: <Icon.Drop />, title: 'Low Resource Farming', desc: 'Less water, less space, and a low carbon footprint make microgreens an efficient and eco-friendly food choice.', bg: '#eaf0fa', color: '#1a7560' },
            ].map((card, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div className="mg-card">
                  <div className="mg-card-icon" style={{ background: card.bg, color: card.color }}>{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ TRIPLE BURDEN ══════════ */}
      <div className="tb-wrap" id="burden">
        <div className="sec">
          <Reveal><div className="sec-tag">Our Focus</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Solving Three Nutrition<br />Challenges — Simultaneously</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              Our research and programs are designed to address all three dimensions of the malnutrition
              challenge that communities across India face today.
            </p>
          </Reveal>
          <div className="tb-cards">
            {[
              { n: '01', t: 'Undernutrition', d: 'Improving dietary diversity by making nutrient-dense microgreens accessible and easy to grow at home and in communities.' },
              { n: '02', t: 'Micronutrient Deficiencies', d: 'Targeting iron, mineral, and vitamin gaps through functional microgreens varieties selected for communities specific nutrient profiles.' },
              { n: '03', t: 'Overnutrition', d: 'Promoting plant-based, low-calorie nutrition choices to support healthier diets and reduce lifestyle-related health risks.' },
            ].map((card, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div className="tb-card">
                  <div className="tb-card-n">{card.n}</div>
                  <h4>{card.t}</h4>
                  <p>{card.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ RESEARCH ══════════ */}
      <div className="research-wrap" id="research">
        <div className="sec">
          <Reveal><div className="sec-tag">Research &amp; Innovation</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Climate-Resilient<br />Agriculture Research</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              Climate change demands new food production systems that use fewer resources and deliver
              more nutrition-rich foods. Our research explores how microgreens can be grown
              and scaled in ways that are pragmatic solutions for urban communities, schools, and institutions.
            </p>
          </Reveal>
          <div className="research-grid">
            <Reveal delay={0.16}>
              <div>
                <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.2rem', color: 'var(--c-forest)', marginBottom: 20, fontWeight: 600 }}>Research Areas</h3>
                <ul className="research-areas">
                  {[
                    'Urban agriculture systems and indoor farming techniques',
                    'Water-efficient and low-space growing systems',
                    'Small-space food production models for homes and institutions',
                    'Resilient microgreen varieties suited for Indian climate conditions',
                  ].map((item, i) => (
                    <li key={i}><span className="bullet"><Icon.Check /></span>{item}</li>
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
                    'Climate-resilient food systems tailored for urban settings',
                    'Nutrient-dense functional foods derived from microgreens',
                    'Sustainable urban agriculture models replicable at community scale',
                    'Community nutrition programs that drive measurable health outcomes',
                  ].map((item, i) => (
                    <li key={i}><span className="chk"><Icon.Check /></span>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ══════════ ACADEMIC PROGRAMS ══════════ */}
      <div className="acad-wrap" id="academics">
        <div className="sec">
          <Reveal><div className="sec-tag">Academic Programs</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Learning That<br />Grows with You</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              We collaborate with colleges and universities to promote learning and innovation in
              sustainable food systems. Our academic partnerships give students hands-on exposure to
              microgreens cultivation, nutrition research, and sustainable agriculture.
            </p>
          </Reveal>
          <div className="acad-cards">
            {[
              { icon: <Icon.Book />, title: 'School Programs', color: '#0a6b3a', bg: '#e6f5ea', points: ['Plant biology and growth cycles', 'Nutrition science basics', 'Hands-on sustainable agriculture'] },
              { icon: <Icon.Flask />, title: 'College Programs', color: '#1a7560', bg: '#e6f5f0', points: ['Research projects in plant nutrient analysis and functional food development', 'Internship opportunities in microgreens cultivation and sustainable farming', 'Sustainability workshops and collaborative innovation labs'] },
              { icon: <Icon.Users />, title: 'Community Programs', color: '#b8860b', bg: '#fdf6e3', points: ['Growing nutrient-dense foods at home', 'Healthy cooking with microgreens', 'Sustainable living and low-resource farming practices'] },
            ].map((card, i) => (
              <Reveal key={i} delay={0.1 + i * 0.08}>
                <div className="acad-card">
                  <div className="acad-card-icon" style={{ background: card.bg, color: card.color }}>{card.icon}</div>
                  <h3>{card.title}</h3>
                  <ul className="acad-card-list">
                    {card.points.map((p, j) => (
                      <li key={j}><span className="chk" style={{ background: card.bg, color: card.color }}><Icon.Check /></span>{p}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ WORKSHOPS ══════════ */}
      <div className="workshop-wrap" id="workshop">
        <div className="sec">
          <Reveal><div className="sec-tag">Workshops &amp; Training</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Science Out of the Lab,<br />Into the World</h2></Reveal>

          <div className="ws-head" style={{ marginTop: 40 }}>
            <div>
              <Reveal delay={0.1}>
                <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.3rem', color: 'var(--c-forest)', fontWeight: 600, marginBottom: 12 }}>
                  Microgreens Workshop — The Ashok Leyland School
                </h3>
              </Reveal>
              <Reveal delay={0.14}>
                <p className="sec-p">
                  We took science out of the lab and into the classroom. Students from Grade 7 and Grade 9
                  planted, cultivated, monitored, and harvested their own microgreens over a 7-day growth
                  cycle — building a real understanding of sustainable nutrition from seed to plate.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.18}>
              <div className="ws-stats">
                <div>
                  <div className="ws-stat-n"><Counter target={100} suffix="+" /></div>
                  <div className="ws-stat-l">Students Trained</div>
                </div>
                <div>
                  <div className="ws-stat-n">2</div>
                  <div className="ws-stat-l">Grade Levels</div>
                </div>
                <div>
                  <div className="ws-stat-n"><Counter target={7} /></div>
                  <div className="ws-stat-l">Day Growth Cycle</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* Carousel */}
          <div className="ws-carousel-outer">
            <div className="ws-carousel">
              <div className="ws-slide ws-slide-prev" onClick={() => { setWsDir(-1); setWsSlide(s => (s - 1 + allImages.length) % allImages.length) }}>
                <img src={allImages[(wsSlide - 1 + allImages.length) % allImages.length].src} alt="" />
              </div>
              <div className={`ws-slide ws-slide-active ${wsDir > 0 ? 'dir-next' : 'dir-prev'}`} key={wsSlide} onClick={() => setLightbox(wsSlide)}>
                <img src={allImages[wsSlide].src} alt={allImages[wsSlide].caption} />
              </div>
              <div className="ws-slide ws-slide-next" onClick={() => { setWsDir(1); setWsSlide(s => (s + 1) % allImages.length) }}>
                <img src={allImages[(wsSlide + 1) % allImages.length].src} alt="" />
              </div>
            </div>
            <div className="ws-active-cap">{allImages[wsSlide].caption}</div>
            <div className="ws-carousel-nav">
              <button className="ws-arrow" onClick={() => { setWsDir(-1); setWsSlide(s => (s - 1 + allImages.length) % allImages.length) }}><Icon.ChevL /></button>
              <div className="ws-dots-row">
                {allImages.map((_, i) => (
                  <button key={i} className={`ws-dot${wsSlide === i ? ' active' : ''}`} onClick={() => { setWsDir(i > wsSlide ? 1 : -1); setWsSlide(i) }} />
                ))}
              </div>
              <button className="ws-arrow" onClick={() => { setWsDir(1); setWsSlide(s => (s + 1) % allImages.length) }}><Icon.ChevR /></button>
            </div>
          </div>

          {/* Workshop types */}
          <div className="ws-types">
            <Reveal>
              <div className="ws-type-card">
                <h3>Microgreens Workshop Curated</h3>
                <ul className="ws-type-list">
                  {[
                    'How to grow and harvest microgreens step by step',
                    'Health and nutritional benefits of different microgreen varieties',
                    'Simple, practical recipes to include microgreens in daily meals',
                  ].map((item, i) => (
                    <li key={i}><span className="chk"><Icon.Check /></span>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.08}>
              <div className="ws-type-card">
                <h3>Urban Microgreens Farming Training</h3>
                <p>Training individuals and institutions in small-scale food production systems — covering indoor farming setup, space planning, and day-to-day cultivation management.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ══════════ GALLERY (Sampling Images) ══════════ */}
      <div className="gallery-wrap" id="gallery">
        <div className="sec">
          <Reveal><div className="sec-tag">Gallery</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Our Work in Action</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              A glimpse into our microgreens cultivation, research, and community engagement activities.
            </p>
          </Reveal>
          <div className="gallery-grid">
            {samplingImages.map((img, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="gallery-item" onClick={() => setLightbox({ type: 'gallery', index: i })}>
                  <img src={img.src} alt="" loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightbox !== null && (() => {
        const isGallery = typeof lightbox === 'object' && lightbox.type === 'gallery'
        const images = isGallery ? samplingImages : allImages
        const idx = isGallery ? lightbox.index : lightbox
        return (
          <div className="lb" onClick={() => setLightbox(null)}>
            <button className="lb-btn lb-close" onClick={() => setLightbox(null)}><Icon.X /></button>
            <button className="lb-btn lb-prev" onClick={e => { e.stopPropagation(); const newIdx = (idx - 1 + images.length) % images.length; setLightbox(isGallery ? { type: 'gallery', index: newIdx } : newIdx) }}><Icon.ChevL /></button>
            <img src={images[idx].src} alt="" onClick={e => e.stopPropagation()} />
            <div className="lb-cap">{images[idx].caption}</div>
            <button className="lb-btn lb-next" onClick={e => { e.stopPropagation(); const newIdx = (idx + 1) % images.length; setLightbox(isGallery ? { type: 'gallery', index: newIdx } : newIdx) }}><Icon.ChevR /></button>
          </div>
        )
      })()}

      {/* ══════════ SERVICES ══════════ */}
      <div className="services-wrap" id="services">
        <div className="sec">
          <Reveal><div className="sec-tag">Services</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">What We Offer</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              Comprehensive support for nutrition education, sustainable agriculture, and microgreens
              innovation — tailored separately for schools, institutions, and communities.
            </p>
          </Reveal>
          <div className="srv-grid">
            {[
              'Nutrition education programs for schools, colleges, and community groups',
              'Sustainable agriculture training and hands-on microgreens cultivation guidance',
              'Urban farming setup support for institutions and individuals',
              'Research collaboration support for functional food and microgreens innovation',
              'Educational workshops tailored to audience and with specific goals',
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="srv-item">
                  <span className="bullet"><Icon.Check /></span>
                  <span>{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ COLLABORATIONS ══════════ */}
      <div className="collab-wrap" id="collaborations">
        <div className="sec">
          <Reveal><div className="sec-tag">Collaborations</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Growing Together</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              We partner with schools, colleges and universities, NGOs, nutrition researchers, and
              agriculture innovators for combined &amp; synergistic outcomes. These partnerships help expand
              our reach across research, education, and community for resonating impact.
            </p>
          </Reveal>
          <div className="collab-cards">
            {[
              { icon: <Icon.Book />, bg: '#e6f5ea', color: '#0a6b3a', title: 'Schools', desc: 'Nutrition education and microgreens workshops' },
              { icon: <Icon.Flask />, bg: '#eaf0fa', color: '#2a5aa5', title: 'Colleges & Universities', desc: 'Research projects and student internships' },
              { icon: <Icon.Users />, bg: '#f3eafa', color: '#7a3db8', title: 'NGOs', desc: 'Community outreach and sustainable living programs' },
              { icon: <Icon.Target />, bg: '#fdf6e3', color: '#b8860b', title: 'Nutrition Researchers', desc: 'Collaborative studies and data-driven scientific publications' },
              { icon: <Icon.Sprout />, bg: '#e6f5f0', color: '#1a7560', title: 'Agriculture Innovators', desc: 'Technology development & transfer and farming systems development' },
            ].map((card, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="collab-card">
                  <div className="collab-icon" style={{ background: card.bg, color: card.color }}>{card.icon}</div>
                  <div><h4>{card.title}</h4><p>{card.desc}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ ROADMAP ══════════ */}
      <div className="roadmap-wrap" id="roadmap">
        <div className="sec">
          <Reveal><div className="sec-tag">Impact &amp; Roadmap</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Where We Are Headed</h2></Reveal>
          <ul className="roadmap-list">
            {[
              'Expand nutrition education programs to more schools and communities across Tamil Nadu & neighbouring states',
              'Develop and launch functional food innovations using microgreens',
              'Build replicable sustainable food system models for urban institutions',
              'Strengthen and scale research collaborations with academic and government bodies',
              'Contribute to healthier communities and more resilient local food systems',
            ].map((item, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <li>
                  <span className="roadmap-num">{String(i + 1).padStart(2, '0')}</span>
                  <span>{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      {/* ══════════ CONTACT ══════════ */}
      <div className="contact-wrap" id="contact">
        <div className="contact-sec">
          <div className="contact-grid">
            <div className="contact-left">
              <Reveal><div className="sec-tag">Start a Conversation</div></Reveal>
              <Reveal delay={0.06}><h2 className="sec-h">Let's Grow Something<br />That Matters</h2></Reveal>
              <Reveal delay={0.12}>
                <p className="contact-desc">
                  Whether you're planning a microgreens workshop for schools, colleges or seeking
                  a research collaboration, or community groups which are ready to start exploring &amp; growing
                  microgreens — we're happy to help.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <div className="contact-info-cards">
                  <a href="mailto:contact@sivsankrivitahealth.com" style={{ textDecoration: 'none' }}>
                    <div className="contact-info-card">
                      <div className="contact-info-icon"><Icon.Mail /></div>
                      <div><h4>Email Us</h4><p>contact@sivsankrivitahealth.com</p></div>
                    </div>
                  </a>
                  <div className="contact-info-card">
                    <div className="contact-info-icon"><Icon.Pin /></div>
                    <div><h4>Location</h4><p>Tamil Nadu, India</p></div>
                  </div>
                  <div className="contact-info-card">
                    <div className="contact-info-icon"><Icon.Clock /></div>
                    <div><h4>Response Time</h4><p>We typically respond within 24 hours</p></div>
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
                      <input type="text" name="name" placeholder="Your full name" value={form.name} onChange={handleInput} required />
                    </div>
                    <div className="form-field">
                      <label>Email *</label>
                      <input type="email" name="email" placeholder="you@example.com" value={form.email} onChange={handleInput} required />
                    </div>
                  </div>
                  <div className="form-field">
                    <label>Organization</label>
                    <input type="text" name="organization" placeholder="School, college, or company name" value={form.organization} onChange={handleInput} />
                  </div>
                  <div className="form-field">
                    <label>Message *</label>
                    <textarea name="message" placeholder="Tell us about your project or inquiry..." rows="5" value={form.message} onChange={handleInput} required />
                  </div>
                  <button type="submit" className={`submit-btn ${formStatus}`} disabled={formStatus === 'sending'}>
                    {formStatus === 'idle' && <><Icon.Send /> Send Message</>}
                    {formStatus === 'sending' && 'Sending...'}
                    {formStatus === 'success' && <><Icon.Check /> Message Sent!</>}
                    {formStatus === 'error' && 'Failed — Try Again'}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div className="footer-brand">
              <span style={{ fontFamily: 'var(--f-display)', fontSize: '1.05rem', color: 'rgba(255,255,255,0.85)', fontWeight: 600 }}>
                Sivsankri Vita Health
              </span>
              <p>Sivsankri Vita Health Pvt Ltd — microgreens cultivation, nutrition education, and sustainable urban agriculture for schools, institutions, and communities across Tamil Nadu.</p>
            </div>
            <div className="footer-col">
              <h5>Navigate</h5>
              {[['about', 'About Us'], ['microgreens', 'Why Microgreens'], ['workshop', 'Workshops & Training'], ['services', 'Services'], ['contact', 'Contact']].map(([id, label]) => (
                <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id) }}>{label}</a>
              ))}
            </div>
            <div className="footer-col">
              <h5>Get in Touch</h5>
              <a href="mailto:contact@sivsankrivitahealth.com"><Icon.Mail /> contact@sivsankrivitahealth.com</a>
              <a href="#"><Icon.Pin /> Tamil Nadu, India</a>
            </div>
          </div>
          <div className="footer-bottom">
            <span>&copy; 2026 Sivsankri Vita Health Private Limited. All rights reserved.</span>
          </div>
        </div>
      </footer>
    </>
  )
}
