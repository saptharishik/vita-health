import { useState, useEffect, useRef } from 'react'

/* ── Intersection-observer hook ── */
export function useReveal(threshold = 0.15) {
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
export function Reveal({ children, delay = 0, y = 40, className = '', style = {} }) {
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
export function Counter({ target, suffix = '', duration = 2000 }) {
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
export const Icon = {
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

/* ── Data arrays ── */
export const workshopImages = [
  { src: '/workshop-images/workshop-home-growing-journey.jpg', caption: 'Home growing journey — hands-on learning with patience, curiosity, and joy' },
  { src: '/workshop-images/workshop-family-session.jpg', caption: 'Community family session — growing together, learning together' },
  { src: '/workshop-images/workshop-school-training.jpg', caption: 'Multi-level training program — school, college, and institutional outreach' },
]

export const samplingImages = [
  { src: '/sampling/varieties-coco-pots-collection.jpeg' },
  { src: '/sampling/grow-trays-led-lights.jpeg' },
  { src: '/sampling/radish-coco-pot-lush.jpeg' },
  { src: '/sampling/garden-lush-green-leaves.jpeg' },
  { src: '/sampling/sunflower-cotyledon-tray.jpeg' },
  { src: '/sampling/amaranth-crimson-dense.jpg' },
  { src: '/sampling/pea-shoots-tendrils.jpg' },
  { src: '/sampling/radish-green-tray-dense.jpeg' },
  { src: '/sampling/sunflower-dark-macro.jpg' },
  { src: '/sampling/amaranth-dense-red-close.jpeg' },
]

export const communityImages = [
  { src: '/workshop-images/workshop-home-growing-journey.jpg', note: 'Hands-on growing at home — every child a little farmer' },
  { src: '/workshop-images/workshop-family-session.jpg', note: 'Family community session — learning together' },
  { src: '/workshop-images/workshop-school-training.jpg', note: 'School training program in action' },
  { src: '/sampling/child-coco-pots-explorer.jpeg', note: 'Exploring microgreen varieties in coconut coir pots' },
]

export const marqueeItems = [
  'Microgreens Cultivation', 'Nutrition Education', 'Sustainable Agriculture',
  'Functional Foods', 'Urban Farming', 'Climate-Resilient Systems',
  'Community Programs', 'Research & Innovation', 'Academic Partnerships', 'Wellness Solutions',
]
