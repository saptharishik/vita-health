import { useNavigate } from 'react-router-dom'
import { Reveal, Icon } from '../components/Shared'

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* ── Page Banner ── */}
      <div className="page-banner">
        <div className="page-banner-inner" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', alignItems: 'center' }}>
          <div>
            <Reveal><div className="sec-tag">Our Story</div></Reveal>
            <Reveal delay={0.06}><h1 className="page-banner-h">Science, Purpose,<br />and a <em style={{ color: 'var(--c-mint)', fontStyle: 'italic' }}>Seed</em></h1></Reveal>
            <Reveal delay={0.12}>
              <p className="page-banner-p">
                Meet the founder, understand the research, and learn the vision behind Tamil Nadu's
                leading microgreens nutrition startup.
              </p>
            </Reveal>
            <Reveal delay={0.18}>
              <div style={{ display: 'flex', gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                {['PhD-Backed Research', 'Tamil Nadu Pioneer', 'Community Impact'].map((tag, i) => (
                  <span key={i} style={{ padding: '6px 16px', borderRadius: '100px', border: '1px solid rgba(255,255,255,0.2)', fontSize: '0.75rem', color: 'rgba(255,255,255,0.65)', fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div style={{ borderRadius: '20px', overflow: 'hidden', height: '380px', boxShadow: '0 32px 80px rgba(0,0,0,0.4)' }}>
              <img src="/sampling/radish-green-tray-top.jpeg" alt="Fresh microgreens tray" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          </Reveal>
        </div>
      </div>

      {/* ══════════ FOUNDER ══════════ */}
      <div className="founder-wrap" id="founder">
        <div className="sec">
          <Reveal><div className="sec-tag">The Founder</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">The Researcher Who<br />Chose the <em>Field</em></h2></Reveal>
          <Reveal delay={0.12}>
            <div className="founder-card">
              <div className="founder-avatar">
                <img src="/founder photo/founder-dr-hemalatha.jpeg" alt="Dr. Hemalatha Rajaram" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <div className="founder-info">
                <h3 className="founder-name">Dr. Hemalatha Rajaram</h3>
                <div className="founder-qual">M.Pharm., PhD — University of Queensland, Australia</div>
                <div className="founder-role">Founder &amp; CEO — Sivsankri Vita Health Pvt. Ltd.</div>
                <div className="founder-tags">
                  {['Scientist', 'Educator', 'Wellness Advocate', 'Sustainable Food Researcher'].map((t, i) => (
                    <span key={i} className="founder-tag">{t}</span>
                  ))}
                </div>
                <p className="founder-bio">
                  With a PhD from the University of Queensland, Australia and years of pharmaceutical and nutrition research under her belt, Dr. Hemalatha could have stayed in a lab. Instead, she chose the field — literally.
                </p>
                <p className="founder-bio" style={{ marginTop: 12 }}>
                  She founded Sivsankri Vita Health because she saw a gap that no supplement or government scheme was filling: communities that lacked not just nutrients, but the knowledge and tools to grow their own.
                  Today, she leads every workshop, every research collaboration, and every community outreach with the same conviction: that a child who grows their own food will never look at nutrition the same way again.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ══════════ VISION & MISSION ══════════ */}
      <div className="vm-section" id="vision">
        <div className="sec">
          <Reveal><div className="sec-tag">Vision &amp; Mission</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">What We're<br />Building Towards</h2></Reveal>
          <div className="vm-grid">
            <Reveal>
              <div className="vm-card vm-vision">
                <h3>Our Vision</h3>
                <p>A future where nutrient-dense foods and sustainable agriculture systems are accessible to everyone — supporting healthier communities and a more resilient planet.</p>
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

      {/* ══════════ RESEARCH ══════════ */}
      <div className="research-wrap" id="research">
        <div className="sec">
          <div className="mg-intro-grid">
            <div className="mg-intro-left">
              <Reveal><div className="sec-tag">Research &amp; Innovation</div></Reveal>
              <Reveal delay={0.06}><h2 className="sec-h">The Science Behind<br />Every Seed We Sow</h2></Reveal>
              <Reveal delay={0.12}>
                <p className="sec-p" style={{ marginBottom: 0 }}>
                  Our Nutrition Innovation Lab is where curiosity meets real-world challenges — testing
                  which microgreens varieties deliver the highest nutritional impact for Indian communities,
                  which growing systems work in resource-limited settings, and how to make sustainable
                  food production replicable at scale.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.15} style={{ display: 'flex', alignItems: 'center' }}>
              <div className="mg-intro-img">
                <img src="/sampling/grow-trays-led-lights.jpeg" alt="Microgreens research lab" />
              </div>
            </Reveal>
          </div>

          <div className="research-grid" style={{ marginTop: 36 }}>
            <Reveal delay={0.16}>
              <div>
                <h3 style={{ fontFamily: 'var(--f-display)', fontSize: '1.2rem', color: 'var(--c-white)', marginBottom: 16, fontWeight: 600 }}>What We Research</h3>
                <ul className="research-areas">
                  {[
                    'Urban agriculture systems and indoor farming techniques',
                    'Water-efficient and low-space growing systems',
                    'Small-space food production models for homes and institutions',
                    'Resilient microgreen varieties suited for Indian climate conditions',
                    'Nutrient profiling of Indian microgreens varieties for community-specific needs',
                  ].map((item, i) => (
                    <li key={i}><span className="bullet"><Icon.Check /></span>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="lab-card">
                <h3>Nutrition Innovation Lab</h3>
                <p>Our dedicated lab tests new microgreens-based food concepts, develops functional food prototypes, and conducts nutrition analysis that directly informs our community programs.</p>
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

      {/* ══════════ TRIPLE BURDEN ══════════ */}
      <div className="tb-wrap" id="nutrition">
        <div className="sec">
          <Reveal><div className="sec-tag">Why It Matters</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">The Triple Burden of<br />Malnutrition in India</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              India faces three simultaneous nutrition challenges. Our programs and research are
              specifically designed to address all three.
            </p>
          </Reveal>
          <div className="tb-cards">
            {[
              { n: '01', t: 'Undernutrition', d: 'Improving dietary diversity by making nutrient-dense microgreens accessible and easy to grow at home and in communities.' },
              { n: '02', t: 'Hidden Hunger (Micronutrient Deficiency)', d: 'Targeting iron, mineral, and vitamin gaps through functional microgreens varieties selected for community-specific nutrient profiles.' },
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

      {/* ══════════ COLLABORATIONS ══════════ */}
      <div className="collab-wrap" id="collaborations">
        <div className="sec">
          <Reveal><div className="sec-tag">Collaborations</div></Reveal>
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
              { icon: <Icon.Book />, bg: '#e6f5ea', color: '#0a6b3a', title: 'Schools', desc: 'Nutrition education and microgreens workshops integrated into the academic calendar' },
              { icon: <Icon.Flask />, bg: '#eaf0fa', color: '#2a5aa5', title: 'Colleges & Universities', desc: 'Research projects, collaborative academic programs, and student-led innovation' },
              { icon: <Icon.Users />, bg: '#f3eafa', color: '#7a3db8', title: 'NGOs', desc: 'Community outreach, sustainable living programs, and rural nutrition initiatives' },
              { icon: <Icon.Target />, bg: '#fdf6e3', color: '#b8860b', title: 'Nutrition Researchers', desc: 'Collaborative studies and data-driven scientific publications on microgreens nutrition' },
              { icon: <Icon.Sprout />, bg: '#e6f5f0', color: '#1a7560', title: 'Agriculture Innovators', desc: 'Technology development and sustainable farming systems development at scale' },
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
          <Reveal><div className="sec-tag">Where We're Headed</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Our Roadmap</h2></Reveal>
          <div className="roadmap-inner">
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
            <Reveal delay={0.2} style={{ height: '100%' }}>
              <div className="roadmap-img-col">
                <img src="/sampling/varieties-coco-pots-collection.jpeg" alt="Microgreens varieties in coco pots" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="tagline-strip">
        <Reveal>
          <blockquote>"A child who grows their own food will never look at nutrition <em>the same way again.</em>"</blockquote>
          <cite>— Dr. Hemalatha Rajaram, Founder &amp; CEO</cite>
        </Reveal>
        <Reveal delay={0.12}>
          <div style={{ marginTop: 28 }}>
            <button className="btn btn-dark" onClick={() => navigate('/contact')}>
              Start a Collaboration <Icon.Arrow />
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
