import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Reveal, Counter, Icon, marqueeItems } from '../components/Shared'

const faqs = [
  { q: 'Who can attend the workshop?', a: 'Our workshops are designed for schools (Classes 4–12), colleges, community groups, families, NGOs, and corporates. Any group curious about nutrition and sustainable growing can contact us.' },
  { q: 'Do participants need any prior experience?', a: 'None at all. From 8-year-olds to retirees — everyone can participate. We design each session to be completely hands-on and beginner-friendly.' },
  { q: 'What does a participant take home?', a: 'Every participant gets a grow kit — a tray with growing medium, seed pack, hand sprayer, and activity worksheet — so they can continue growing microgreens at home.' },
  { q: 'How long does a workshop session take?', a: 'A typical session is 2–3 hours. We also offer multi-day programs (7-day growing journeys) and online formats for schools and institutions that prefer virtual sessions.' },
  { q: 'Can you come to our school or institution?', a: 'Yes! We travel to schools, colleges, offices, and community centres across Tamil Nadu. Just reach out via our contact form and we\'ll set up a session within days.' },
  { q: 'Are your microgreens organic and safe?', a: 'Absolutely. We use 100% organic, non-GMO seeds with coconut coir growing medium — no soil, no pesticides, no chemicals. Safe for children and adults alike.' },
]

export default function HomePage() {
  const navigate = useNavigate()

  return (
    <>
      {/* ══════════ HERO ══════════ */}
      <section className="hero" id="top">
        <div className="hero-bg" />
        <div className="hero-mesh" />
        <div className="hero-dots" />
        <div className="hero-inner">
          <div>
            <Reveal><div className="hero-eyebrow">Incorporated under Companies Act, 2013 · Tamil Nadu</div></Reveal>
            <Reveal delay={0.08}>
              <h1>Microgreens That<br /><em>Transform</em> How<br />Communities Eat</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="hero-sub">
                The most nutrient-dense food on the planet — grown by students, individuals, and working professionals in 7 days,
                harvested by hand, taken home. We bring <strong style={{ color: 'rgba(255,255,255,0.9)' }}>science-backed microgreens knowledge</strong> directly
                into schools, colleges, and communities across Tamil Nadu.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 36 }}>
                {['40× more nutrients than mature vegetables — grown in 7 days', 'No soil, no pesticides, no experience needed', 'Backed by evidence-based nutrition research'].map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.84rem', color: 'rgba(255,255,255,0.7)' }}>
                    <span style={{ width: 20, height: 20, borderRadius: '50%', background: 'rgba(92,184,92,0.2)', color: 'var(--c-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon.Check /></span>
                    {pt}
                  </div>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.26}>
              <div className="hero-btns">
                <button className="btn btn-dark" onClick={() => navigate('/workshops')}>
                  Explore Our Programs <Icon.Arrow />
                </button>
                <button className="btn btn-outline" onClick={() => navigate('/about')}>
                  About Us
                </button>
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="hero-right">
              <div className="hero-card">
                <div className="hero-metrics">
                  <div className="hero-metric">
                    <div className="hero-metric-num">40×</div>
                    <div className="hero-metric-label">More Nutrients Than Mature Greens</div>
                  </div>
                  <div className="hero-metric">
                    <div className="hero-metric-num"><Counter target={500} suffix="+" /></div>
                    <div className="hero-metric-label">Participants Trained</div>
                  </div>
                  <div className="hero-metric">
                    <div className="hero-metric-num">7</div>
                    <div className="hero-metric-label">Days to First Harvest</div>
                  </div>
                  <div className="hero-metric">
                    <div className="hero-metric-num">0</div>
                    <div className="hero-metric-label">Pesticides. Ever.</div>
                  </div>
                </div>
              </div>
              <div className="hero-float f1">
                <div className="float-dot" style={{ background: 'var(--c-mint)' }} />Climate-Smart Growing
              </div>
              <div className="hero-float f2">
                <div className="float-dot" style={{ background: 'var(--c-gold)' }} />PhD-Backed Research
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

      {/* ══════════ STATS BAR ══════════ */}
      <div className="stats-bar">
        <div className="stats-bar-inner">
          {[
            { num: '500+', label: 'Participants Trained', sub: 'Across schools & communities' },
            { num: '10+', label: 'Programs Conducted', sub: 'Across Tamil Nadu' },
            { num: '5', label: 'Program Formats', sub: 'School · College · Corporate · Online' },
            { num: '100%', label: 'Hands-On Learning', sub: 'Every participant grows food' },
          ].map((s, i) => (
            <Reveal key={i} delay={i * 0.07}>
              <div className="stat-cell">
                <div className="stat-num">{s.num}</div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-sub">{s.sub}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* ══════════ WHO WE WORK WITH ══════════ */}
      <div className="who-wrap">
        <div className="who-inner">
          <span className="who-label">We work with</span>
          <div className="who-tags">
            {['Schools & CBSE Institutions', 'Colleges & Universities', 'Community Groups & NGOs', 'Corporate Teams', 'Families & Home Growers', 'Government Programs'].map((t, i) => (
              <span key={i} className="who-tag">{t}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ WHAT WE OFFER ══════════ */}
      <div className="feature-wrap">
        <div className="sec">
          <Reveal><div className="sec-tag">What We Offer</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Three Ways We Create<br />Lasting Impact</h2></Reveal>
          <div className="feature-cards">
            {[
              { icon: <Icon.Book />, bg: '#e6f5ea', color: '#0a6b3a', title: 'Nutrition Workshops', desc: 'Hands-on sessions where participants sow seeds, watch them grow, and harvest — and then leave with a grow kit and a habit that sticks.', cta: 'See Workshop Programs' },
              { icon: <Icon.Flask />, bg: '#eaf0fa', color: '#2a5aa5', title: 'Academic Programs', desc: 'Curriculum-aligned programs for schools and colleges — covering plant biology, nutrition science, and sustainability through doing.', cta: 'See Academic Programs' },
              { icon: <Icon.Sprout />, bg: '#f3eafa', color: '#7a3db8', title: 'Grow Kits & Consulting', desc: 'Take the workshop home. Our Young Growers Kit and urban farming consultation help families, offices, and institutions grow their own food.', cta: 'See Grow Kits' },
            ].map((card, i) => (
              <Reveal key={i} delay={0.08 + i * 0.08}>
                <div className="feature-card">
                  <div className="feature-card-icon" style={{ background: card.bg, color: card.color }}>{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                  <button className="feature-card-link" onClick={() => navigate('/workshops')}>
                    {card.cta} <Icon.Arrow />
                  </button>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ WHY MICROGREENS ══════════ */}
      <div className="mg-wrap" id="microgreens">
        <div className="sec">
          <div className="mg-intro-grid">
            <div className="mg-intro-left">
              <Reveal><div className="sec-tag">Why Microgreens</div></Reveal>
              <Reveal delay={0.06}><h2 className="sec-h">40× the Nutrients.<br />7 Days. No Soil.</h2></Reveal>
              <Reveal delay={0.12}>
                <p className="sec-p" style={{ marginBottom: 0 }}>
                  Microgreens aren't a trend. They're the most nutrient-dense form of most vegetables —
                  containing up to <strong style={{ color: 'var(--c-gold-light)' }}>40× more vitamins and antioxidants</strong> than
                  their fully grown counterparts. Grown in coconut coir, no pesticides, harvested in 7–14 days.
                  We didn't just grow microgreens — we discovered what happens when you
                  put them in a child's hands.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="mg-intro-img">
                <img src="/sampling/radish-coco-pot-lush.jpeg" alt="Fresh microgreens" />
              </div>
            </Reveal>
          </div>
          <div className="mg-cards">
            {[
              { icon: <Icon.Sprout />, title: 'Nutrient Dense', desc: 'Concentrated vitamins, minerals, and antioxidants in every bite — more than any supplement can offer.', bg: '#e6f5ea', color: '#0a6b3a' },
              { icon: <Icon.Sun />, title: 'Climate-Resilient', desc: 'Grows in small spaces, indoors, with minimal water — no farmland or gardening experience required.', bg: '#fdf6e3', color: '#b8860b' },
              { icon: <Icon.Drop />, title: 'Low Resource', desc: '97% less water than traditional farming. Zero pesticides. Zero soil. Sustainable by design.', bg: '#eaf0fa', color: '#1a7560' },
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

      {/* ══════════ HOW IT WORKS ══════════ */}
      <div className="hiw-wrap">
        <div className="sec">
          <Reveal><div className="sec-tag">How It Works</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">A Workshop That Runs<br />Itself in 3 Steps</h2></Reveal>
          <div className="hiw-steps">
            {[
              { icon: <Icon.Mail />, title: 'You Reach Out', desc: 'Tell us your audience size, venue, and preferred date. We handle everything else — materials, facilitation, kits, and follow-up.' },
              { icon: <Icon.Sprout />, title: 'We Run the Session', desc: 'Our expert facilitators run a live nutrition + growing session. Participants sow their own trays and watch science happen in real time.' },
              { icon: <Icon.Target />, title: 'They Take It Home', desc: 'Every participant leaves with a grow kit, a certificate (for schools & colleges), and the experience of having grown food themselves — a habit that starts on day one.' },
            ].map((step, i) => (
              <Reveal key={i} delay={0.08 + i * 0.08}>
                <div className="hiw-step">
                  <div className="hiw-big-num">{String(i + 1).padStart(2, '0')}</div>
                  <div className="hiw-step-icon">{step.icon}</div>
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ TESTIMONIAL SPOTLIGHT ══════════ */}
      <div className="tspot-wrap">
        <div className="sec">
          <Reveal><div className="sec-tag">Real Results</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">What Happens After<br />Our Workshops</h2></Reveal>
          <div className="tspot-inner">
            <Reveal delay={0.1}>
              <div className="tspot-left">
                <div className="tspot-badge">★★★★★ 5.0 Rating</div>
                <div className="tspot-quote">
                  "We've already started our first project with mustard seed. Looking forward
                  to see them <em>grow!</em>"
                </div>
                <div className="tspot-person">
                  <div className="tspot-avatar" style={{ background: '#2d6a2d' }}>R</div>
                  <div>
                    <div className="tspot-name">Mrs. Raghavi</div>
                    <div className="tspot-role">Parent — Community Workshop</div>
                  </div>
                </div>
                <button className="btn btn-outline" style={{ marginTop: 24, alignSelf: 'flex-start' }} onClick={() => navigate('/gallery')}>
                  Read All Reviews <Icon.Arrow />
                </button>
              </div>
            </Reveal>
            <div className="tspot-cards">
              {[
                { initials: 'P', color: '#1a7560', text: '"Nice session, clear cut explanation with live demo helps to understand about Microgreens for the beginners...informative and interesting session, helps to lead our life healthy. Thank you Hema."', name: 'Mrs. Praba — Housewife' },
                { initials: 'D', color: '#b8860b', text: '"I liked the seminar the most because it clearly explained the benefits of microgreens and how to grow them easily at home."', name: 'Deepa D — Working Professional' },
                { initials: 'SR', color: '#4a3db8', text: '"I actively participated in sowing the seeds and daily observation. I enjoyed the activity and would love to do similar hands-on activities again!"', name: 'Student — Class 6, Prasan Vidya Mandir' },
              ].map((t, i) => (
                <Reveal key={i} delay={0.1 + i * 0.08}>
                  <div className="tspot-mini">
                    <div className="tspot-stars">★★★★★</div>
                    <p>{t.text}</p>
                    <div className="tspot-mini-name">— {t.name}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ FAQ ══════════ */}
      <FAQ navigate={navigate} />

      {/* ══════════ TAGLINE STRIP ══════════ */}
      <div className="tagline-strip">
        <Reveal>
          <blockquote>"Microgreens are not a trend — they are the most nutrient-dense food on the planet, <em>accessible to everyone.</em>"</blockquote>
          <cite>— Dr. Hemalatha Rajaram, Founder & CEO</cite>
        </Reveal>
      </div>

      {/* ══════════ FINAL CTA ══════════ */}
      <div className="home-cta-wrap">
        <div className="sec" style={{ textAlign: 'center' }}>
          <Reveal>
            <div className="sec-tag" style={{ justifyContent: 'center' }}>Ready to Start?</div>
          </Reveal>
          <Reveal delay={0.06}>
            <h2 className="sec-h" style={{ color: 'var(--c-white)', textAlign: 'center' }}>
              Book a Workshop for<br />Your School or Organisation
            </h2>
          </Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', margin: '0 auto 28px' }}>
              Typically we respond within 24 hours and set up a session that works for your timeline and audience.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <div className="home-cta-btns">
              <button className="btn btn-dark" onClick={() => navigate('/contact#contact')}>
                Book a Workshop <Icon.Arrow />
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/workshops')}>
                See All Programs
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/about')}>
                Meet the Founder
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </>
  )
}

function FAQ({ navigate }) {
  const [open, setOpen] = useState(null)
  const toggle = (i) => setOpen(o => o === i ? null : i)

  return (
    <div className="faq-wrap">
      <div className="sec">
        <Reveal><div className="sec-tag">Common Questions</div></Reveal>
        <Reveal delay={0.06}><h2 className="sec-h">Everything You Need<br />to Know About the Workshop</h2></Reveal>
        <div className="faq-grid" style={{ marginTop: 28 }}>
          {faqs.map((faq, i) => (
            <div key={i} className="faq-item">
              <button className={`faq-q ${open === i ? 'open' : ''}`} onClick={() => toggle(i)}>
                <span>{faq.q}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
              </button>
              {open === i && <div className="faq-a">{faq.a}</div>}
            </div>
          ))}
        </div>
        <Reveal delay={0.2}>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <p style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>Still have questions?</p>
            <button className="btn btn-outline" onClick={() => navigate('/contact#contact')} style={{ margin: '0 auto' }}>
              Ask Us Directly <Icon.Arrow />
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  )
}

