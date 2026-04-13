import { useNavigate } from 'react-router-dom'
import { Reveal, Counter, Icon } from '../components/Shared'

export default function WorkshopsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* ── Page Banner ── */}
      <div className="page-banner">
        <div className="page-banner-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <Reveal><div className="sec-tag">Microgreens &amp; Programs</div></Reveal>
            <Reveal delay={0.06}><h1 className="page-banner-h">40× the Nutrients.<br />Grown in <em style={{ color: 'var(--c-mint)', fontStyle: 'italic' }}>7 Days.</em></h1></Reveal>
            <Reveal delay={0.12}>
              <p className="page-banner-p">
                Microgreens are the most nutrient-dense form of most vegetables —
                harvested just 7–14 days after sowing, with no soil and no pesticides.
                We put them in people's hands through live, experience-first programs
                where every participant grows their own.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                {['No Soil · No Pesticides', '7–14 Day Harvest', '100% Hands-On'].map((tag, i) => (
                  <span key={i} style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', height: '380px', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}>
              <img src="/sampling/varieties-coco-pots-collection.jpeg" alt="Microgreens varieties in coco pots" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── Quick stats ── */}
      <div className="stats-bar">
        <div className="stats-bar-inner">
          {[
            { num: '500+', label: 'Participants Trained', sub: 'And counting' },
            { num: '5', label: 'Program Formats', sub: 'School · College · Community · Corporate · Online' },
            { num: '10+', label: 'Programs Conducted', sub: 'Across Tamil Nadu' },
            { num: '7', label: 'Day Harvest Cycle', sub: 'Seed to table' },
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

      {/* ══════════ WORKSHOP FLOW ══════════ */}
      <div className="workshop-wrap" id="how-it-works">
        <div className="sec">
          <Reveal><div className="sec-tag">How a Workshop Runs</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">What If Learning<br />Could <em>Feed</em> You Too?</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              Our workshops aren't lectures. Participants sow seeds, observe daily growth, harvest
              their own microgreens, and leave with a kit to continue at home.
            </p>
          </Reveal>

          <div className="ws-program-steps" style={{ marginTop: 28 }}>
            {[
              { day: 'Step 1', time: '45–60 min', icon: <Icon.Book />, title: 'Nutrition & Awareness', desc: 'Why does food quality matter? What are microgreens? How do they compare to what we eat daily? A science-led intro that surprises every audience.' },
              { day: 'Step 2', time: 'Hands-on', icon: <Icon.Sprout />, title: 'Live Growing Demo', desc: 'Participants set up their own trays with hands-on sowing guided by our facilitator. No experience needed — this is the moment it clicks.' },
              { day: 'Step 3', time: '5 min/day', icon: <Icon.Drop />, title: 'Daily Observation', desc: 'For multi-day programs, participants water, observe, and record growth — building curiosity and science mindset through direct experience.' },
              { day: 'Step 4', time: 'Celebration', icon: <Icon.Target />, title: 'Harvest & Celebrate', desc: 'Harvest day. Participants taste what they grew, receive their kit and certificate (schools & colleges), and leave with a habit that starts immediately.' },
            ].map((s, i) => (
              <Reveal key={i} delay={0.08 + i * 0.08}>
                <div className="ws-program-step">
                  <div className="ws-step-top">
                    <div className="ws-step-icon">{s.icon}</div>
                    <div><span className="ws-step-day">{s.day}</span><span className="ws-step-time">{s.time}</span></div>
                  </div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Kit + Outcomes */}
          <div className="ws-kit-outcomes" style={{ marginTop: 32 }}>
            <Reveal delay={0.1}>
              <div className="ws-kit-card">
                <div className="ws-kit-head"><Icon.Target /><h3>What Every Participant Gets</h3></div>
                <ul>
                  {['Grow base — tray with coconut coir growing medium', 'Curated microgreens seed pack (organic, non-GMO)', 'Hand sprayer for daily watering', 'Activity worksheet with nutrition facts and growing steps', 'Participation certificate'].map((item, i) => (
                    <li key={i}><span className="bullet"><Icon.Check /></span>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="ws-kit-card">
                <div className="ws-kit-head"><Icon.Flask /><h3>What Organisations Get</h3></div>
                <ul>
                  {[
                    { icon: <Icon.Users />, text: 'A measurably more nutrition-aware group' },
                    { icon: <Icon.Sprout />, text: 'Participants who start growing at home immediately' },
                    { icon: <Icon.Book />, text: 'Better understanding of sustainable food systems' },
                    { icon: <Icon.Drop />, text: 'Long-term healthy food behaviour change in students' },
                  ].map((item, i) => (
                    <li key={i}><span className="ws-outcome-icon">{item.icon}</span>{item.text}</li>
                  ))}
                </ul>
                <p className="ws-outcome-quote">Participants who grow their own food show increased willingness to eat greens and measurable, lasting lifestyle change.</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ══════════ PROGRAM TYPES ══════════ */}
      <div className="acad-wrap" id="programs">
        <div className="sec">
          <Reveal><div className="sec-tag">Who We Run Programs For</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">We Come to You —<br />Wherever You Are</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">Five program formats designed for different audiences. All hands-on. All include grow kits.</p>
          </Reveal>
          <div className="ws-types" style={{ marginTop: 24 }}>
            {[
              { icon: <Icon.Book />, title: 'School Programs', desc: 'Curriculum-aligned sessions for students covering plant biology, nutrition science, and hands-on microgreens growing. Perfect for science labs, nutrition days, and environment weeks.' },
              { icon: <Icon.Users />, title: 'Community Workshops', desc: 'Neighbourhood and family sessions on home growing, healthy cooking with microgreens, and sustainable living. Available in Tamil and English.' },
              { icon: <Icon.Flask />, title: 'College Programs', desc: 'Research-oriented sessions for BSc and MSc students covering nutrition analysis, functional food development, and collaborative growing projects.' },
              { icon: <Icon.Target />, title: 'Corporate Wellness', desc: 'Workplace wellness sessions that use microgreens growing as a team activity — stress-relief, mindfulness, and healthy habit formation in one session.' },
              { icon: <Icon.Sprout />, title: 'Online Sessions', desc: 'Live virtual workshops for remote learners and schools outside Tamil Nadu. We ship the kit, run the session online, and guide every participant through the first sow.' },
            ].map((card, i) => (
              <Reveal key={i} delay={0.06 + i * 0.07}>
                <div className="ws-type-card">
                  <div className="ws-type-icon">{card.icon}</div>
                  <h3>{card.title}</h3>
                  <p>{card.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ ACADEMIC PROGRAMS ══════════ */}
      <div className="workshop-wrap" id="academic">
        <div className="sec">
          <Reveal><div className="sec-tag">Academic Programs</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Built for Schools,<br />Colleges &amp; Communities</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              Every level has a tailored program — from primary school students discovering
              photosynthesis to postgraduate nutrition researchers working in our innovation lab.
            </p>
          </Reveal>
          <div className="acad-cards">
            {[
              { icon: <Icon.Book />, title: 'School Programs', color: '#0a6b3a', bg: '#e6f5ea', points: ['Plant biology and growth cycles through direct observation', 'Nutrition science basics in plain language', 'Hands-on sustainable agriculture — no experience needed'] },
              { icon: <Icon.Flask />, title: 'College Programs', color: '#1a7560', bg: '#e6f5f0', points: ['Research projects in plant nutrient analysis and functional food development', 'Hands-on cultivation training and sustainable farming techniques', 'Collaborative innovation labs and sustainability workshops'] },
              { icon: <Icon.Users />, title: 'Community Programs', color: '#b8860b', bg: '#fdf6e3', points: ['Growing nutrient-dense foods at home — on any shelf or balcony', 'Healthy cooking with microgreens (includes live demo)', 'Sustainable living and low-resource farming for everyday families'] },
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

      {/* ══════════ SERVICES ══════════ */}
      <div className="services-wrap" id="services">
        <div className="sec">
          <Reveal><div className="sec-tag">Services</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">What We Bring<br />to Your Organisation</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              Whether you run a school, college department, corporate team, or community NGO —
              we have a format designed for your specific audience and goals.
            </p>
          </Reveal>
          <div className="srv-grid">
            {[
              'Customised nutrition education programs for schools, colleges, and community groups',
              'Hands-on microgreens cultivation workshops — from single sessions to multi-week growing journeys',
              'Urban farming setup and consultation for institutions, offices, and homes',
              'Research collaboration and functional food innovation partnerships with academic bodies',
              'Corporate wellness programs — stress-relief, team-building, and healthy habit formation through growing for teams',
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

      {/* ══════════ KIT CTA ══════════ */}
      <div className="kit-cta-wrap">
        <Reveal>
          <div className="kit-cta-inner">
            <div className="kit-cta-img-col">
              <img src="/sampling/young-growers-kit-illustration.jpeg" alt="Young Growers Microgreen Kit" className="kit-cta-img" />
            </div>
            <div className="kit-cta-content">
              <div className="sec-tag" style={{ marginBottom: 16 }}>Grow Kit</div>
              <h2 className="kit-cta-h">Loved the Workshop?<br />Bring It Home.</h2>
              <p className="kit-cta-p">The <strong>Young Growers Microgreen Kit</strong> has everything a participant needs to keep growing at home — after the workshop ends, the journey continues.</p>
              <ul className="kit-cta-list">
                <li><span className="bullet"><Icon.Check /></span>Grow trays, growing medium &amp; curated seed varieties — all included</li>
                <li><span className="bullet"><Icon.Check /></span>Step-by-step guidance so anyone can grow it — no experience needed</li>
                <li><span className="bullet"><Icon.Check /></span>Harvest nutrition in 7–14 days, fresh from your own shelf</li>
                <li><span className="bullet"><Icon.Check /></span>Perfect for homes, school labs &amp; corporate wellness corners</li>
              </ul>
              <button className="btn btn-primary kit-cta-btn" onClick={() => navigate('/contact#contact')}>
                Enquire About the Kit <Icon.Arrow />
              </button>
            </div>
          </div>
        </Reveal>
      </div>

    </div>
  )
}
