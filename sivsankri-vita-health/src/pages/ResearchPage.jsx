import { Reveal, Icon } from '../components/Shared'

export default function ResearchPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* ── Page hero banner ── */}
      <div className="page-banner">
        <div className="page-banner-inner">
          <Reveal><div className="sec-tag">Research &amp; Innovation</div></Reveal>
          <Reveal delay={0.06}><h1 className="page-banner-h">The Science Behind<br />Every Seed We Sow</h1></Reveal>
          <Reveal delay={0.12}>
            <p className="page-banner-p">
              We don't just teach people to grow microgreens — we research which varieties deliver
              the highest nutritional impact for Indian communities, which systems work in resource-limited
              settings, and how to make sustainable food production replicable at scale.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ══════════ RESEARCH CONTENT ══════════ */}
      <div className="research-wrap" id="research">
        <div className="sec">
          <div className="mg-intro-grid">
            <div className="mg-intro-left">
              <Reveal><div className="sec-tag">Our Lab</div></Reveal>
              <Reveal delay={0.06}><h2 className="sec-h">Where Curiosity Meets<br />Real-World Nutrition</h2></Reveal>
              <Reveal delay={0.12}>
                <p className="sec-p" style={{ marginBottom: 0 }}>
                  Our Nutrition Innovation Lab is a dedicated space for experimentation — testing new
                  microgreens-based food concepts, conducting student research, developing functional food
                  prototypes, and performing nutrition analysis. Every finding feeds directly back into
                  the programs we run in schools and communities.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="mg-intro-img">
                <img src="/sampling/radish-green-tray-top.jpeg" alt="Microgreens research" />
              </div>
            </Reveal>
          </div>

          <div className="research-grid" style={{ marginTop: 48 }}>
            <Reveal delay={0.16}>
              <div>
                <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.2rem', color: 'var(--c-white)', marginBottom: 20, fontWeight: 600 }}>Research Areas</h3>
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
                <p>Our lab is where curiosity meets real-world nutrition challenges — testing new microgreens-based food concepts, developing functional food prototypes, and performing nutrition analysis that directly informs our community programs.</p>
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

      {/* ══════════ RESEARCH PILLARS ══════════ */}
      <div className="acad-wrap">
        <div className="sec">
          <Reveal><div className="sec-tag">Research Pillars</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Four Directions,<br />One Mission</h2></Reveal>
          <div className="acad-cards" style={{ marginTop: 32 }}>
            {[
              { icon: <Icon.Sprout />, color: '#0a6b3a', bg: '#e6f5ea', title: 'Nutritional Analysis', points: ['Variety-wise nutrient profiling', 'Comparison with mature vegetables', 'Iron, zinc, and vitamin mapping for Indian diets'] },
              { icon: <Icon.Drop />, color: '#1a7560', bg: '#e6f5f0', title: 'Sustainable Systems', points: ['Low-water growing protocols', 'Coir-based substrate research', 'Energy-efficient grow-light studies'] },
              { icon: <Icon.Flask />, color: '#7a3db8', bg: '#f3eafa', title: 'Functional Foods', points: ['Microgreens in traditional Indian recipes', 'Product prototypes for health-conscious consumers', 'Shelf-life and bioavailability studies'] },
              { icon: <Icon.Users />, color: '#b8860b', bg: '#fdf6e3', title: 'Community Impact', points: ['Pre/post nutrition awareness surveys', 'Adoption rates in school programs', 'Long-term behavior change tracking'] },
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

      {/* ══════════ COLLABORATIONS ══════════ */}
      <div className="collab-wrap" id="collaborations">
        <div className="sec">
          <Reveal><div className="sec-tag">Research Collaborations</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Growing Together</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              The best outcomes happen when the right people work together. We actively seek
              partnerships with schools, colleges, NGOs, researchers, and agri-innovators who share
              our belief that sustainable nutrition is not optional — it's essential.
            </p>
          </Reveal>
          <div className="collab-cards">
            {[
              { icon: <Icon.Book />, bg: '#e6f5ea', color: '#0a6b3a', title: 'Schools', desc: 'Nutrition education and microgreens workshops' },
              { icon: <Icon.Flask />, bg: '#eaf0fa', color: '#2a5aa5', title: 'Colleges & Universities', desc: 'Research projects and collaborative academic programs' },
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
    </div>
  )
}
