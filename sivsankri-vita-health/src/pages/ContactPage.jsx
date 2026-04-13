import { useState } from 'react'
import { Reveal, Icon } from '../components/Shared'

const EMAILJS_SERVICE_ID  = 'service_grstkqk'
const EMAILJS_TEMPLATE_ID = 'template_l2y7jd4'
const EMAILJS_PUBLIC_KEY  = '8EDQ1Q9jyinYz4MHa'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', organization: '', message: '' })
  const [formStatus, setFormStatus] = useState('idle')

  const handleInput = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus('sending')
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id:  EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id:     EMAILJS_PUBLIC_KEY,
          template_params: {
            from_name:    form.name,
            from_email:   form.email,
            organization: form.organization,
            message:      form.message,
          },
        }),
      })
      if (!res.ok) throw new Error(await res.text())
      setFormStatus('success')
      setForm({ name: '', email: '', organization: '', message: '' })
      setTimeout(() => setFormStatus('idle'), 5000)
    } catch (err) {
      console.error('EmailJS error:', err)
      setFormStatus('error')
      setTimeout(() => setFormStatus('idle'), 4000)
    }
  }

  return (
    <div style={{ paddingTop: '72px' }}>
      {/* ── Page banner ── */}
      <div className="page-banner">
        <div className="page-banner-inner">
          <Reveal><div className="sec-tag">Start a Conversation</div></Reveal>
          <Reveal delay={0.06}><h1 className="page-banner-h">Let's Grow Something<br />That Matters</h1></Reveal>
          <Reveal delay={0.12}>
            <p className="page-banner-p">
              Whether you're planning a microgreens workshop for schools, colleges, or community groups,
              seeking a research collaboration, or ready to start exploring and growing microgreens —
              we're happy to help.
            </p>
          </Reveal>
        </div>
      </div>

      {/* ══════════ CONTACT FORM ══════════ */}
      <div className="contact-wrap" id="contact">
        <div className="contact-sec">
          <div className="contact-grid">
            <div className="contact-left">
              <Reveal delay={0.1}>
                <div className="contact-info-cards">
                  <div className="contact-info-card">
                    <div className="contact-info-icon"><Icon.Mail /></div>
                    <div><h4>Email Us</h4><p>info@sivsankrivitahealth.com</p></div>
                  </div>
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

              <Reveal delay={0.18}>
                <div style={{ marginTop: 36, padding: '28px 32px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 'var(--radius-xl)' }}>
                  <h3 style={{ fontFamily: 'var(--f-display)', color: 'var(--c-white)', fontSize: '1.1rem', marginBottom: 16, fontWeight: 600 }}>We work with</h3>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
                    {['Schools & educational institutions', 'Colleges & research departments', 'NGOs & community organisations', 'Corporates & wellness programs', 'Individual families & home growers'].map((item, i) => (
                      <li key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.55 }}>
                        <span style={{ flexShrink: 0, width: 22, height: 22, borderRadius: '50%', background: 'rgba(92,184,92,0.15)', color: 'var(--c-mint)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}><Icon.Check /></span>
                        {item}
                      </li>
                    ))}
                  </ul>
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
                    {formStatus === 'idle'    && <><Icon.Send /> Send Message</>}
                    {formStatus === 'sending' && 'Sending...'}
                    {formStatus === 'success' && <><Icon.Check /> Message Sent!</>}
                    {formStatus === 'error'   && 'Failed — Try Again'}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}
