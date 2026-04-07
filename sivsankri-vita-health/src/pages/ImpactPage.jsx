import { Reveal, Icon } from '../components/Shared'

export default function ImpactPage() {
  return (
    <div style={{ paddingTop: '72px' }}>
      {/* ── Page banner ── */}
      <div className="page-banner">
        <div className="page-banner-inner">
          <Reveal><div className="sec-tag">Impact &amp; Services</div></Reveal>
          <Reveal delay={0.06}><h1 className="page-banner-h">Where We Are<br />Headed</h1></Reveal>
          <Reveal delay={0.12}>
            <p className="page-banner-p">
              Our services, our roadmap, and the voices of the communities, schools, and
              organisations we've had the privilege of working with.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ══════════ SERVICES ══════════ */}
      <div className="services-wrap" id="services">
        <div className="sec">
          <Reveal><div className="sec-tag">Services</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">What We Can Do<br />For Your Organisation</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              Whether you run a school, a college department, a corporate HR team, or a community NGO —
              we have a program designed specifically for you. Here's what we bring to the table.
            </p>
          </Reveal>
          <div className="srv-grid">
            {[
              'Customised nutrition education programs for schools, colleges, and community groups',
              'Hands-on microgreens cultivation workshops — from single sessions to multi-week programs',
              'Urban farming setup and consultation for institutions, offices, and homes',
              'Research collaboration and functional food innovation partnerships with academic bodies',
              'Corporate wellness programs — stress-relief, team-building, and healthy habit formation through growing',
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

      {/* ══════════ ROADMAP ══════════ */}
      <div className="roadmap-wrap" id="roadmap">
        <div className="sec">
          <Reveal><div className="sec-tag">Impact &amp; Roadmap</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Where We Are Headed</h2></Reveal>
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

      {/* ══════════ TESTIMONIALS ══════════ */}
      <div className="feedback-wrap" id="feedback">
        <div className="sec">
          <Reveal><div className="sec-tag">Testimonials</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">What People Say<br />About Us</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p">Real voices from the communities, schools, colleges, and organisations we have worked with.</p></Reveal>
          <div className="feedback-grid">
            {[
              { initials: 'SM', name: 'Sunitha M.', role: 'Parent — Community Workshop', color: '#2d6a2d', stars: 5, text: '"Thank you so much, Akka, for the wonderful session for the kids and the mini get-together! It was great learning a new skill to help nurture the kids. We\'ve already started our first project with mustard seeds. Looking forward to see them grow!!!!"' },
              { initials: 'SR', name: 'Student Participant', role: 'Prasan Vidya Mandir, Mamandur — Class 6', color: '#1a7560', stars: 5, text: '"It\'s a wonderful opportunity to learn about the microgreens. Part of healthy life. I actively participated in sowing the seeds and daily observation. I enjoyed the activity and would love to do similar hands-on activities again!"' },
              { initials: 'PK', name: 'Prof. Priya K.', role: 'Head of Nutrition Dept — College Program', color: '#b8860b', stars: 5, text: '"The college session by Sivsankri Vita Health was a breakthrough experience for our students. The research-backed content combined with hands-on growing practice gave our nutrition students a completely new perspective on functional foods and sustainable agriculture."' },
              { initials: 'AR', name: 'Arjun R.', role: 'HR Manager — Corporate Wellness Program', color: '#4a3db8', stars: 5, text: '"We hosted a corporate microgreens session for our team as part of our wellness initiative. The response was incredible — employees found it relaxing, educational, and genuinely inspiring. We\'ve already ordered grow kits for the office. Highly recommend to any organisation!"' },
            ].map((fb, i) => (
              <Reveal key={i} delay={0.08 + i * 0.08}>
                <div className="feedback-card">
                  <div className="feedback-stars">{'★'.repeat(fb.stars)}</div>
                  <p className="feedback-text">{fb.text}</p>
                  <div className="feedback-person">
                    <div className="feedback-avatar" style={{ background: fb.color }}>{fb.initials}</div>
                    <div><div className="feedback-name">{fb.name}</div><div className="feedback-role">{fb.role}</div></div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
