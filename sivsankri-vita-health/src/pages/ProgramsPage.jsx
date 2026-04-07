import { useState } from 'react'
import { Reveal, Counter, Icon, workshopImages, samplingImages, communityImages } from '../components/Shared'

export default function ProgramsPage() {
  const [lightbox, setLightbox] = useState(null)

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* ── Lightbox ── */}
      {lightbox !== null && (() => {
        const type = typeof lightbox === 'object' ? lightbox.type : 'gallery'
        const images = type === 'gallery' ? samplingImages : communityImages
        const idx = typeof lightbox === 'object' ? lightbox.index : lightbox
        const next = (i) => ({ type, index: i })
        return (
          <div className="lb" onClick={() => setLightbox(null)}>
            <button className="lb-btn lb-close" onClick={() => setLightbox(null)}><Icon.X /></button>
            <button className="lb-btn lb-prev" onClick={e => { e.stopPropagation(); setLightbox(next((idx - 1 + images.length) % images.length)) }}><Icon.ChevL /></button>
            <img src={images[idx].src} alt="" onClick={e => e.stopPropagation()} />
            {images[idx].caption && <div className="lb-cap">{images[idx].caption}</div>}
            <button className="lb-btn lb-next" onClick={e => { e.stopPropagation(); setLightbox(next((idx + 1) % images.length)) }}><Icon.ChevR /></button>
          </div>
        )
      })()}

      {/* ── Page banner ── */}
      <div className="page-banner">
        <div className="page-banner-inner">
          <Reveal><div className="sec-tag">Programs &amp; Community</div></Reveal>
          <Reveal delay={0.06}><h1 className="page-banner-h">Education That<br />Actually Sticks</h1></Reveal>
          <Reveal delay={0.12}>
            <p className="page-banner-p">
              Workshops, academic programs, community impact, gallery, and the story of the founder
              who started it all — everything we do in the field, all in one place.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ══════════ ACADEMIC PROGRAMS ══════════ */}
      <div className="acad-wrap" id="academics">
        <div className="sec">
          <Reveal><div className="sec-tag">Academic Programs</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Learning That<br />Goes Beyond the Textbook</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              Textbooks tell students about nutrition. We let them <em>experience</em> it. Our academic
              programs are designed so that by the time a student leaves the session, they've already
              grown something, tasted something, and understood something they'll never forget.
              We partner with schools, colleges, and communities to make that happen.
            </p>
          </Reveal>
          <div className="acad-cards">
            {[
              { icon: <Icon.Book />, title: 'School Programs', color: '#0a6b3a', bg: '#e6f5ea', points: ['Plant biology and growth cycles', 'Nutrition science basics', 'Hands-on sustainable agriculture'] },
              { icon: <Icon.Flask />, title: 'College Programs', color: '#1a7560', bg: '#e6f5f0', points: ['Research projects in plant nutrient analysis and functional food development', 'Hands-on cultivation training and sustainable farming techniques', 'Sustainability workshops and collaborative innovation labs'] },
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
          <Reveal delay={0.06}><h2 className="sec-h">What If Learning<br />Could <em>Feed</em> You Too?</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p">
              Our workshops aren't lectures. They're experiences. Participants sow seeds, watch them
              sprout, harvest their own microgreens, and take a grow kit home. By the end, nutrition
              isn't just a concept — it's something they grew themselves.
            </p>
          </Reveal>

          {/* Program stats */}
          <Reveal delay={0.18}>
            <div className="ws-stats" style={{ marginTop: 20, marginBottom: 32 }}>
              <div><div className="ws-stat-n"><Counter target={500} suffix="+" /></div><div className="ws-stat-l">Participants Trained</div></div>
              <div><div className="ws-stat-n"><Counter target={7} /></div><div className="ws-stat-l">Day Growth Cycle</div></div>
              <div><div className="ws-stat-n"><Counter target={10} suffix="+" /></div><div className="ws-stat-l">Programs Conducted</div></div>
              <div><div className="ws-stat-n">5</div><div className="ws-stat-l">Program Formats</div></div>
            </div>
          </Reveal>

          {/* 4-step program flow */}
          <div className="ws-program-steps">
            {[
              { day: 'Step 1', time: '45–60 min', icon: <Icon.Book />, title: 'Nutrition & Awareness Session', desc: 'Introduction to nutrition gaps, the power of microgreens, and why growing your own food matters' },
              { day: 'Step 2', time: 'Hands-on', icon: <Icon.Sprout />, title: 'Live Growing Demo', desc: 'Participants set up their own trays with hands-on sowing guided by our expert facilitator' },
              { day: 'Step 3', time: '5 min/day', icon: <Icon.Drop />, title: 'Daily Observation', desc: 'Participants water, observe and record growth — building science mindset and responsibility' },
              { day: 'Step 4', time: 'Celebration', icon: <Icon.Target />, title: 'Harvest & Celebrate', desc: 'Participants harvest their microgreens and take home grow kits to continue the journey' },
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
          <div className="ws-kit-outcomes">
            <Reveal delay={0.1}>
              <div className="ws-kit-card">
                <div className="ws-kit-head"><Icon.Target /><h3>Participant Kit Includes</h3></div>
                <ul>
                  {['Grow base (tray with growing medium)', 'Microgreens seed pack', 'Hand sprayer', 'Activity worksheet (nutrition + growing steps)', 'Participation certificate'].map((item, i) => (
                    <li key={i}><span className="bullet"><Icon.Check /></span>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.16}>
              <div className="ws-kit-card">
                <div className="ws-kit-head"><Icon.Flask /><h3>Expected Outcomes</h3></div>
                <ul>
                  {[
                    { icon: <Icon.Users />, text: 'Improved nutrition awareness among participants' },
                    { icon: <Icon.Sprout />, text: 'Adoption of microgreens growing at home & school' },
                    { icon: <Icon.Book />, text: 'Enhanced understanding of sustainable food systems' },
                    { icon: <Icon.Drop />, text: 'Long-term healthy food behaviour change' },
                  ].map((item, i) => (
                    <li key={i}><span className="ws-outcome-icon">{item.icon}</span>{item.text}</li>
                  ))}
                </ul>
                <p className="ws-outcome-quote">"Children eat what they grow" — Participants who grow their own food show increased willingness to eat greens and positive lifestyle change.</p>
              </div>
            </Reveal>
          </div>

          {/* Program types */}
          <Reveal delay={0.1}><h3 className="ws-programs-title">Programs We Conduct</h3></Reveal>
          <div className="ws-types">
            {[
              { icon: <Icon.Book />, title: 'School Programs', desc: 'Curriculum-aligned sessions covering plant biology, nutrition science, and hands-on microgreens cultivation for students of all grades.' },
              { icon: <Icon.Users />, title: 'Community Workshops', desc: 'Neighbourhood and family sessions focused on home growing, healthy cooking with microgreens, and sustainable living practices.' },
              { icon: <Icon.Flask />, title: 'College Programs', desc: 'Research-oriented sessions for college students — covering nutrition analysis, functional food development, and collaborative projects.' },
              { icon: <Icon.Target />, title: 'Corporate Training', desc: 'Workplace wellness sessions introducing microgreens growing as a stress-relief activity and healthy nutrition habit for employees.' },
              { icon: <Icon.Sprout />, title: 'Online Sessions', desc: 'Live virtual workshops for remote learners — covering growing techniques, nutrition education, and guided sowing sessions from home.' },
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

          {/* Video Block */}
          <Reveal delay={0.1}>
            <div className="video-block" style={{ marginTop: 56 }}>
              <div className="video-label">
                <span className="sec-tag" style={{ marginBottom: 0 }}>Watch Our Workshop in Action</span>
              </div>
              <video className="workshop-video" controls preload="metadata" poster="/sampling/varieties-coco-pots-collection.jpeg">
                <source src="/video/WhatsApp Video 2026-03-28 at 10.11.25 PM.mp4" type="video/mp4" />
              </video>
            </div>
          </Reveal>
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
              <p className="kit-cta-p">The <strong>Young Growers Microgreen Kit</strong> is how we bring the workshop home. Everything inside is ready to go — open the box, sow the seeds, and watch something extraordinary grow right on your shelf.</p>
              <ul className="kit-cta-list">
                <li><span className="bullet"><Icon.Check /></span>Grow trays, growing medium &amp; curated seed varieties — all included</li>
                <li><span className="bullet"><Icon.Check /></span>Step-by-step guidance so anyone can grow it — no experience needed</li>
                <li><span className="bullet"><Icon.Check /></span>Harvest nutrition in 7–14 days, fresh from your own shelf</li>
                <li><span className="bullet"><Icon.Check /></span>Perfect for homes, school labs &amp; corporate wellness corners</li>
              </ul>
              <a href="mailto:sivsankrivitagreen@gmail.com?subject=Young Growers Microgreen Kit Enquiry" className="btn btn-primary kit-cta-btn">
                Contact Us for Your Kit <Icon.Arrow />
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ══════════ COMMUNITY IMPACT ══════════ */}
      <div className="workshop-wrap" id="community">
        <div className="sec">
          <Reveal><div className="sec-tag">Community Impact</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Real People,<br />Real Change</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p" style={{ marginBottom: 32 }}>Real families, students, and communities growing microgreens — turning kitchens, classrooms, and balconies into micro-farms.</p></Reveal>
          <div className="community-grid">
            {communityImages.map((img, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="community-card" onClick={() => setLightbox({ type: 'community', index: i })}>
                  <div className="community-img-wrap">
                    <img src={img.src} alt={img.note} loading="lazy" />
                  </div>
                  <div className="community-caption">
                    <div className="community-note">"{img.note}"</div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ GALLERY ══════════ */}
      <div className="acad-wrap" id="gallery">
        <div className="sec">
          <Reveal><div className="sec-tag">Microgreens Gallery</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">A Glimpse Into<br />What We Grow</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p" style={{ marginBottom: 32 }}>A glimpse into the varieties, growing systems, and produce coming out of our cultivation work.</p></Reveal>
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

      {/* ══════════ FOUNDER ══════════ */}
      <div className="founder-wrap" id="founder">
        <div className="sec">
          <Reveal><div className="sec-tag">The Visionary Behind It All</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">Science, Purpose,<br />and a <em>Seed</em></h2></Reveal>
          <Reveal delay={0.12}>
            <div className="founder-card">
              <div className="founder-avatar"><img src="/founder photo/founder-dr-hemalatha.jpeg" alt="Dr. Hemalatha Rajaram" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} /></div>
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
                  She founded Sivsankri Vita Health because she saw a gap that no supplement or government scheme was filling: communities that lacked not just nutrients, but the knowledge and tools to grow their own.
                  Today, she leads every workshop, every research collaboration, and every community outreach with the same conviction: that a child who grows their own food will never look at nutrition the same way again.
                  That conviction is the engine of everything we build here.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
