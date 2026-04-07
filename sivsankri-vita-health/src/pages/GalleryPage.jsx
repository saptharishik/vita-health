import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Reveal, Icon, samplingImages, communityImages } from '../components/Shared'

export default function GalleryPage() {
  const [lightbox, setLightbox] = useState(null)
  const navigate = useNavigate()

  const allLbImages = [...communityImages, ...samplingImages]

  return (
    <div style={{ paddingTop: '72px' }}>

      {/* ── Lightbox ── */}
      {lightbox !== null && (
        <div className="lb" onClick={() => setLightbox(null)}>
          <button className="lb-btn lb-close" onClick={() => setLightbox(null)}><Icon.X /></button>
          <button className="lb-btn lb-prev" onClick={e => { e.stopPropagation(); setLightbox((lightbox - 1 + allLbImages.length) % allLbImages.length) }}><Icon.ChevL /></button>
          <img src={allLbImages[lightbox].src} alt="" onClick={e => e.stopPropagation()} />
          <button className="lb-btn lb-next" onClick={e => { e.stopPropagation(); setLightbox((lightbox + 1) % allLbImages.length) }}><Icon.ChevR /></button>
        </div>
      )}

      {/* ── Page Banner ── */}
      <div className="page-banner">
        <div className="page-banner-inner">
          <Reveal><div className="sec-tag">Community &amp; Gallery</div></Reveal>
          <Reveal delay={0.06}><h1 className="page-banner-h">Real People,<br />Real Harvests</h1></Reveal>
          <Reveal delay={0.12}>
            <p className="page-banner-p">
              Families, students, and communities growing microgreens — turning kitchens,
              classrooms, and balconies into micro-farms. Plus what they have to say.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ══════════ COMMUNITY IMPACT ══════════ */}
      <div className="workshop-wrap" id="community">
        <div className="sec">
          <Reveal><div className="sec-tag">Community Impact</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">From Classrooms<br />to Kitchens</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p" style={{ marginBottom: 0 }}>
              Our workshops reach children, families, students, and communities across Tamil Nadu.
              Every photo here is a real participant, a real session, a real harvest.
            </p>
          </Reveal>
          <div className="community-grid">
            {communityImages.map((img, i) => (
              <Reveal key={i} delay={i * 0.07}>
                <div className="community-card" onClick={() => setLightbox(i)}>
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

      {/* ══════════ MICROGREENS GALLERY ══════════ */}
      <div className="acad-wrap" id="gallery">
        <div className="sec">
          <Reveal><div className="sec-tag">Microgreens Gallery</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">A Glimpse Into<br />What We Grow</h2></Reveal>
          <Reveal delay={0.12}>
            <p className="sec-p" style={{ marginBottom: 0 }}>
              Every variety, every tray, every coco pot — the microgreens we research, grow, and
              bring into workshops across Tamil Nadu.
            </p>
          </Reveal>
          <div className="gallery-grid">
            {samplingImages.map((img, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <div className="gallery-item" onClick={() => setLightbox(communityImages.length + i)}>
                  <img src={img.src} alt="" loading="lazy" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ TESTIMONIALS ══════════ */}
      <div className="feedback-wrap" id="testimonials">
        <div className="sec">
          <Reveal><div className="sec-tag">Testimonials</div></Reveal>
          <Reveal delay={0.06}><h2 className="sec-h">What People Say<br />After Our Programs</h2></Reveal>
          <Reveal delay={0.12}><p className="sec-p">Real voices from the communities, schools, colleges, and organisations we've worked with.</p></Reveal>
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

      {/* ── CTA ── */}
      <div className="home-cta-wrap">
        <div className="sec" style={{ textAlign: 'center' }}>
          <Reveal>
            <h2 className="sec-h" style={{ color: 'var(--c-white)', textAlign: 'center' }}>
              Want This for Your School?
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="sec-p" style={{ color: 'rgba(255,255,255,0.5)', textAlign: 'center', margin: '0 auto 28px' }}>
              Every photo here started with one workshop booking. Yours could be next.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <div className="home-cta-btns">
              <button className="btn btn-dark" onClick={() => navigate('/contact')}>
                Book a Workshop <Icon.Arrow />
              </button>
              <button className="btn btn-outline" onClick={() => navigate('/workshops')}>
                See All Programs
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
