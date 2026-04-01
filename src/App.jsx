import { useState, useEffect, useRef } from 'react'
import './index.css'

// ─── Custom Hooks ─────────────────────────────────────────────────────────────

function useInView(ref, threshold = 0.15) {
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setInView(true)
    }, { threshold })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [ref, threshold])
  return inView
}

function useCounter(target, duration = 2000, active = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!active) return
    const startTime = performance.now()
    const frame = (now) => {
      const progress = Math.min((now - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(target * eased))
      if (progress < 1) requestAnimationFrame(frame)
    }
    requestAnimationFrame(frame)
  }, [active, target, duration])
  return count
}

// ─── SVG Illustrations ────────────────────────────────────────────────────────

const LogoIcon = ({ size = 22, bg = '#1c1917' }) => (
  <div
    style={{ width: size + 14, height: size + 14, background: bg, borderRadius: 10 }}
    className="flex items-center justify-center flex-shrink-0"
  >
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
      <path d="M2 18L10 2L18 18H2Z" fill="#E8851A" />
      <rect x="6" y="12" width="8" height="6" fill="white" rx="1" />
    </svg>
  </div>
)

// Hero left image — workers on site
const ImgWorkers = () => (
  <svg width="175" height="205" viewBox="0 0 175 205" fill="none">
    <rect width="175" height="205" fill="#adc4d5" />
    <rect width="175" height="42" fill="#c8dcea" />
    <rect y="162" width="175" height="43" fill="#8aaa90" opacity="0.5" />
    <rect x="18" y="42" width="139" height="120" rx="4" fill="#8aafc5" />
    {/* worker 1 */}
    <ellipse cx="68" cy="87" rx="12" ry="12" fill="#f5d5b5" />
    <ellipse cx="68" cy="79" rx="14" ry="9" fill="#f5c842" />
    <rect x="56" y="99" width="24" height="30" rx="4" fill="#E8851A" />
    <rect x="59" y="129" width="8" height="18" rx="3" fill="#3a4a6a" />
    <rect x="71" y="129" width="8" height="18" rx="3" fill="#3a4a6a" />
    {/* worker 2 */}
    <ellipse cx="113" cy="92" rx="11" ry="11" fill="#e5c4a5" />
    <ellipse cx="113" cy="85" rx="13" ry="8" fill="#f5c842" />
    <rect x="102" y="103" width="22" height="28" rx="4" fill="#2d5a7a" />
    <rect x="105" y="131" width="7" height="18" rx="3" fill="#2d5a7a" />
    <rect x="116" y="131" width="7" height="18" rx="3" fill="#2d5a7a" />
  </svg>
)

// Hero center image — building skeleton (hexagon shape applied via CSS)
const ImgBuilding = () => (
  <svg width="235" height="265" viewBox="0 0 235 265" fill="none">
    <rect width="235" height="265" fill="#8aacbf" />
    <rect width="235" height="82" fill="#b5c8d5" />
    <circle cx="178" cy="36" r="20" fill="white" opacity="0.6" />
    <circle cx="198" cy="42" r="14" fill="white" opacity="0.5" />
    {/* Building frame */}
    <rect x="28" y="82" width="179" height="183" fill="#6a8fa5" />
    {[82, 122, 162, 202].map(y => (
      <rect key={y} x="28" y={y} width="179" height="4" fill="#4a6f85" />
    ))}
    {[28, 115, 202].map(x => (
      <rect key={x} x={x} y="82" width="6" height="183" fill="#4a6f85" />
    ))}
    {/* Scaffold */}
    <rect x="58" y="77" width="120" height="8" rx="2" fill="#E8851A" />
    {/* Worker left */}
    <ellipse cx="88" cy="70" rx="8" ry="8" fill="#e5c4a5" />
    <ellipse cx="88" cy="64" rx="9" ry="6" fill="#f5c842" />
    <rect x="80" y="78" width="16" height="20" rx="3" fill="#2d5a7a" />
    {/* Worker right */}
    <ellipse cx="148" cy="67" rx="9" ry="9" fill="#f5d5b5" />
    <ellipse cx="148" cy="61" rx="10" ry="6" fill="#fff" />
    <rect x="140" y="75" width="18" height="22" rx="3" fill="#E8851A" />
  </svg>
)

// Hero right image — building facade
const ImgFacade = () => (
  <svg width="175" height="215" viewBox="0 0 175 215" fill="none">
    <rect width="175" height="215" fill="#c0b8aa" />
    <rect width="175" height="30" fill="#c5d5e5" />
    <rect x="8" y="30" width="159" height="185" rx="4" fill="#a0989a" />
    {/* Windows */}
    {[50, 90, 130].map(y =>
      [18, 57, 97, 137].map((x, i) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={i === 3 ? 24 : 29} height="25" rx="3"
          fill={x === 97 && y === 90 ? '#E8851A' : '#c8d8e8'} opacity={0.7 + i * 0.05} />
      ))
    )}
    {/* Worker */}
    <ellipse cx="88" cy="172" rx="10" ry="10" fill="#e5c4a5" />
    <rect x="76" y="182" width="24" height="26" rx="4" fill="#E8851A" />
    <rect x="80" y="208" width="8" height="7" rx="2" fill="#5a4a3a" />
    <rect x="92" y="208" width="8" height="7" rx="2" fill="#5a4a3a" />
  </svg>
)

// Team member SVGs
const ImgRahul = () => (
  <svg width="100%" height="300" viewBox="0 0 340 300" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="300" fill="#b5c8d5" />
    <rect width="340" height="140" fill="#c8d8e8" />
    <rect x="40" y="80" width="260" height="220" rx="4" fill="#9ab0c0" opacity="0.5" />
    <rect x="60" y="60" width="8" height="240" fill="#7a9ab0" opacity="0.6" />
    <rect x="272" y="60" width="8" height="240" fill="#7a9ab0" opacity="0.6" />
    {/* Head */}
    <ellipse cx="170" cy="110" rx="30" ry="32" fill="#d4a882" />
    <ellipse cx="170" cy="92" rx="32" ry="18" fill="#3a2a1a" />
    <rect x="138" y="92" width="64" height="20" fill="#3a2a1a" />
    {/* Helmet */}
    <ellipse cx="170" cy="90" rx="36" ry="22" fill="#E8851A" />
    <rect x="134" y="100" width="72" height="12" rx="6" fill="#d4750a" />
    {/* Face */}
    <ellipse cx="158" cy="115" rx="5" ry="6" fill="#2a1a0a" opacity="0.8" />
    <ellipse cx="182" cy="115" rx="5" ry="6" fill="#2a1a0a" opacity="0.8" />
    <path d="M158 130 Q170 138 182 130" stroke="#7a4a2a" strokeWidth="2" fill="none" />
    <ellipse cx="170" cy="134" rx="22" ry="10" fill="#5a3a1a" opacity="0.4" />
    {/* Neck */}
    <rect x="158" y="138" width="24" height="20" rx="4" fill="#d4a882" />
    {/* Body */}
    <rect x="110" y="155" width="120" height="145" rx="8" fill="#2d4a6a" />
    <rect x="110" y="183" width="120" height="12" fill="#E8851A" opacity="0.9" />
    <rect x="110" y="213" width="120" height="12" fill="#E8851A" opacity="0.9" />
    <rect x="75" y="155" width="38" height="90" rx="12" fill="#2d4a6a" />
    <rect x="227" y="155" width="38" height="90" rx="12" fill="#2d4a6a" />
    <ellipse cx="94" cy="248" rx="14" ry="12" fill="#d4a882" />
    <ellipse cx="246" cy="248" rx="14" ry="12" fill="#d4a882" />
    <rect x="163" y="155" width="14" height="30" rx="4" fill="#c0a030" />
  </svg>
)

const ImgAnjali = () => (
  <svg width="100%" height="300" viewBox="0 0 340 300" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="300" fill="#c0b0a0" />
    <rect width="340" height="130" fill="#d0c0b0" />
    <rect x="20" y="80" width="300" height="220" rx="4" fill="#b0a090" opacity="0.6" />
    {/* Head */}
    <ellipse cx="170" cy="112" rx="32" ry="34" fill="#c89070" />
    <ellipse cx="170" cy="88" rx="36" ry="22" fill="#2a1a10" />
    <rect x="130" y="88" width="18" height="120" rx="8" fill="#2a1a10" />
    <rect x="192" y="88" width="18" height="100" rx="8" fill="#2a1a10" />
    <rect x="134" y="78" width="72" height="25" fill="#2a1a10" />
    {/* Helmet copper */}
    <ellipse cx="170" cy="86" rx="40" ry="24" fill="#8a6040" />
    <rect x="130" y="98" width="80" height="12" rx="6" fill="#6a4020" />
    {/* Face */}
    <ellipse cx="157" cy="116" rx="5" ry="6" fill="#1a0a00" opacity="0.85" />
    <ellipse cx="183" cy="116" rx="5" ry="6" fill="#1a0a00" opacity="0.85" />
    <path d="M150 109 Q157 106 164 109" stroke="#3a2010" strokeWidth="2" fill="none" />
    <path d="M176 109 Q183 106 190 109" stroke="#3a2010" strokeWidth="2" fill="none" />
    <path d="M160 132 Q170 140 180 132" stroke="#9a5040" strokeWidth="2.5" fill="none" />
    <rect x="156" y="142" width="28" height="18" rx="4" fill="#c89070" />
    {/* Body vest */}
    <rect x="105" y="158" width="130" height="142" rx="8" fill="#c85010" />
    <rect x="105" y="186" width="130" height="14" fill="#f5d020" opacity="0.9" />
    <rect x="105" y="218" width="130" height="14" fill="#f5d020" opacity="0.9" />
    <rect x="160" y="158" width="20" height="142" fill="#f5d020" opacity="0.4" />
    <rect x="68" y="158" width="40" height="85" rx="12" fill="#c85010" />
    <rect x="232" y="158" width="40" height="85" rx="12" fill="#c85010" />
    <ellipse cx="88" cy="246" rx="15" ry="12" fill="#c89070" />
    <ellipse cx="252" cy="246" rx="15" ry="12" fill="#c89070" />
  </svg>
)

const ImgVikram = () => (
  <svg width="100%" height="300" viewBox="0 0 340 300" preserveAspectRatio="xMidYMid slice">
    <rect width="340" height="300" fill="#d0d5da" />
    <rect width="340" height="120" fill="#dde2e8" />
    <rect x="30" y="70" width="280" height="230" rx="4" fill="#c8cdd5" opacity="0.5" />
    {/* Head */}
    <ellipse cx="170" cy="108" rx="30" ry="32" fill="#d4b090" />
    <ellipse cx="170" cy="86" rx="33" ry="20" fill="#1a1510" />
    <rect x="137" y="86" width="66" height="15" fill="#1a1510" />
    {/* White helmet */}
    <ellipse cx="170" cy="84" rx="37" ry="23" fill="#f0f0f0" />
    <rect x="133" y="97" width="74" height="12" rx="6" fill="#e0e0e0" />
    {/* Face */}
    <ellipse cx="157" cy="113" rx="5" ry="6" fill="#1a1010" opacity="0.85" />
    <ellipse cx="183" cy="113" rx="5" ry="6" fill="#1a1010" opacity="0.85" />
    <path d="M160 128 Q170 136 180 128" stroke="#7a5040" strokeWidth="2" fill="none" />
    <rect x="158" y="136" width="24" height="22" rx="4" fill="#d4b090" />
    {/* White shirt */}
    <rect x="108" y="155" width="124" height="145" rx="8" fill="#f5f5f0" />
    <path d="M155 155 L170 175 L185 155" stroke="#e0e0da" strokeWidth="2" fill="none" />
    <rect x="164" y="155" width="12" height="45" rx="4" fill="#2a3a5a" />
    <rect x="72" y="158" width="40" height="70" rx="12" fill="#f5f5f0" />
    <rect x="228" y="158" width="40" height="70" rx="12" fill="#f5f5f0" />
    {/* Arms crossed */}
    <rect x="95" y="210" width="150" height="28" rx="10" fill="#d4b090" />
    <rect x="220" y="215" width="22" height="16" rx="4" fill="#4a4a4a" />
    <rect x="225" y="212" width="12" height="4" rx="2" fill="#3a3a3a" />
  </svg>
)

// Contact section construction scene
const ImgCrane = () => (
  <svg width="100%" height="100%" viewBox="0 0 580 420" preserveAspectRatio="xMidYMid slice">
    <defs>
      <linearGradient id="skyG" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#b0c8da" />
        <stop offset="100%" stopColor="#d0e0ea" />
      </linearGradient>
    </defs>
    <rect width="580" height="420" fill="url(#skyG)" />
    <ellipse cx="100" cy="60" rx="60" ry="25" fill="white" opacity="0.7" />
    <ellipse cx="150" cy="55" rx="45" ry="20" fill="white" opacity="0.8" />
    <ellipse cx="430" cy="80" rx="70" ry="28" fill="white" opacity="0.6" />
    {/* Crane */}
    <rect x="280" y="10" width="8" height="200" fill="#5a6a7a" />
    <rect x="280" y="10" width="220" height="8" fill="#5a6a7a" />
    <rect x="496" y="10" width="6" height="180" fill="#4a5a6a" opacity="0.7" />
    <line x1="460" y1="10" x2="380" y2="160" stroke="#3a4a5a" strokeWidth="3" />
    <rect x="330" y="155" width="100" height="20" rx="4" fill="#8a9aaa" />
    <line x1="378" y1="160" x2="378" y2="145" stroke="#5a6a7a" strokeWidth="2" />
    <ellipse cx="378" cy="143" rx="6" ry="5" fill="none" stroke="#5a6a7a" strokeWidth="2" />
    {/* Building */}
    <rect x="50" y="260" width="420" height="160" rx="4" fill="#8a9aaa" />
    {[260, 310, 360].map(y => (
      <rect key={y} x="50" y={y} width="420" height="6" fill="#6a7a8a" />
    ))}
    {[50, 155, 260, 365, 458].map(x => (
      <rect key={x} x={x} y="200" width="12" height="220" fill="#7a8a9a" />
    ))}
    <rect x="30" y="200" width="510" height="8" rx="3" fill="#E8851A" opacity="0.8" />
    <rect x="30" y="248" width="510" height="8" rx="3" fill="#E8851A" opacity="0.7" />
    {/* Worker */}
    <ellipse cx="200" cy="192" rx="12" ry="13" fill="#d4a882" />
    <ellipse cx="200" cy="184" rx="14" ry="9" fill="#f5c842" />
    <rect x="188" y="200" width="24" height="28" rx="4" fill="#E8851A" />
    <rect x="190" y="228" width="9" height="22" rx="3" fill="#3a4a6a" />
    <rect x="201" y="228" width="9" height="22" rx="3" fill="#3a4a6a" />
    {/* Ground */}
    <rect x="0" y="390" width="580" height="30" fill="#7a8a60" />
    <rect x="60" y="378" width="80" height="20" rx="4" fill="#9aaa80" />
    <rect x="350" y="376" width="90" height="22" rx="4" fill="#8a9a70" />
  </svg>
)

// ─── Small UI Components ──────────────────────────────────────────────────────

const SectionTag = ({ children }) => (
  <div className="flex items-center gap-2 mb-3">
    <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
    <span className="text-amber-500 text-xs font-semibold tracking-widest uppercase">{children}</span>
  </div>
)

const SocialBtn = ({ label, dark = false }) => (
  <button className={`w-7 h-7 flex items-center justify-center border rounded-md text-xs transition-all
    hover:border-amber-500 hover:text-amber-500
    ${dark ? 'border-stone-700 text-stone-400' : 'border-stone-200 text-stone-500'}`}>
    {label}
  </button>
)

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar = ({ active, onNav }) => (
  <nav className="sticky top-0 z-50 bg-white border-b border-stone-200">
    <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2.5">
        <LogoIcon />
        <span className="font-display text-xl font-bold tracking-wide text-stone-900">Mason</span>
      </div>
      <div className="hidden md:flex items-center gap-8">
        {['Home', 'About', 'Services', 'Project', 'Blog', 'Shop'].map(item => (
          <button key={item} onClick={() => onNav(item.toLowerCase())}
            className={`text-sm font-medium transition-colors pb-0.5
              ${active === item.toLowerCase()
                ? 'text-stone-900 border-b-2 border-amber-500'
                : 'text-stone-500 hover:text-stone-900'}`}>
            {item}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3">
        <svg className="text-stone-500 w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
        <button className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-all hover:shadow-lg">
          Log in
        </button>
      </div>
    </div>
  </nav>
)

// ─── Hero ─────────────────────────────────────────────────────────────────────

const Hero = () => (
  <section className="bg-stone-50 py-20">
    <div className="max-w-7xl mx-auto px-6">
      <div className="text-center mb-14">
        <p className="text-xs text-stone-400 mb-4">
          Home / <span className="text-stone-700 font-semibold">About</span>
        </p>
        <h1 className="font-display text-5xl md:text-6xl font-bold text-stone-900 leading-tight max-w-2xl mx-auto mb-5">
          Crafting Spaces,{' '}
          <span className="text-amber-500 italic">Shaping Futures</span>
        </h1>
        <p className="text-stone-500 text-base max-w-lg mx-auto leading-relaxed mb-8">
          At Mason, every project begins with purpose and is driven by passion.
          We don't just construct buildings — we create lasting spaces that
          reflect our clients' goals and values.
        </p>
        <button className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-9 py-3.5 rounded-full transition-all hover:-translate-y-0.5 hover:shadow-xl">
          Our Service
        </button>
      </div>

      {/* Three hero images */}
      <div className="flex items-end justify-center gap-5" style={{ height: 270 }}>
        {/* Left */}
        <div className="rounded-2xl overflow-hidden flex-shrink-0 relative shadow-md" style={{ width: 175, height: 210 }}>
          <ImgWorkers />
          <div className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            15+ yrs
          </div>
        </div>
        {/* Center hex */}
        <div className="hex-clip flex-shrink-0 shadow-lg overflow-hidden" style={{ width: 235, height: 265 }}>
          <ImgBuilding />
        </div>
        {/* Right */}
        <div className="rounded-2xl overflow-hidden flex-shrink-0 shadow-md" style={{ width: 175, height: 215 }}>
          <ImgFacade />
        </div>
      </div>
    </div>
  </section>
)

// ─── About ────────────────────────────────────────────────────────────────────

const About = () => {
  const ref = useRef(null)
  const inView = useInView(ref)
  const c1 = useCounter(1600, 2000, inView)
  const c2 = useCounter(25, 1800, inView)
  const c3 = useCounter(98, 1600, inView)

  const features = [
    {
      n: '01', title: 'Modern Technology',
      desc: 'We integrate the latest construction technologies to ensure faster timelines.',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8851A" strokeWidth="2">
          <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
        </svg>
      ),
    },
    {
      n: '02', stat: `${c2}million`, statLabel: 'Client Satisfaction',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8851A" strokeWidth="2">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ),
    },
    {
      n: '03', stat: `${c3}%`, statLabel: 'Project Success rate',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8851A" strokeWidth="2">
          <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        </svg>
      ),
    },
    {
      n: '04', title: 'Experience Engineers',
      desc: "Our team of seasoned engineers brings decades of hands-on experience.",
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8851A" strokeWidth="2">
          <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      ),
    },
  ]

  return (
    <section id="about" ref={ref} className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <SectionTag>About Our Company</SectionTag>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 leading-tight max-w-lg mx-auto mb-4">
            Built on Experience.<br />Driven by Quality.
          </h2>
          <p className="text-stone-500 text-sm max-w-md mx-auto leading-relaxed">
            With over 15 years in the industry, we bring a hands-on, client-first approach
            to every project. Our team blends craftsmanship, innovation, and trust to deliver excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Stats card */}
          <div className="bg-white rounded-3xl p-7 shadow-sm">
            <div className="flex items-center gap-2 mb-5">
              <LogoIcon size={20} />
              <span className="font-display text-xl font-bold text-stone-900">Mason</span>
            </div>
            <div className="font-display text-5xl font-bold text-stone-900 mb-1">{c1}k+</div>
            <p className="text-stone-500 text-xs leading-relaxed mb-6">
              Proven track record across residential, commercial, and industrial sectors
            </p>
            <div className="flex items-center gap-3">
              <div className="flex">
                {[['JT', '#8aacbf'], ['MY', '#c5a88a'], ['BK', '#8ac8a0']].map(([init, color]) => (
                  <div key={init}
                    className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: color, marginRight: -8 }}>
                    {init}
                  </div>
                ))}
                <div className="w-8 h-8 rounded-full border-2 border-white bg-stone-100 flex items-center justify-center text-xs font-bold text-stone-500">
                  +
                </div>
              </div>
              <span className="text-xs text-stone-400 ml-2">Our expert team</span>
            </div>
          </div>

          {/* 2×2 feature grid */}
          <div className="lg:col-span-2 grid grid-cols-2 gap-5">
            {features.map((f) => (
              <div key={f.n} className="bg-white rounded-2xl p-6 shadow-sm relative overflow-hidden">
                <div className="w-10 h-10 bg-stone-50 rounded-xl flex items-center justify-center mb-3">
                  {f.icon}
                </div>
                {f.title && <h3 className="text-sm font-bold text-stone-900 mb-2">{f.title}</h3>}
                {f.stat && (
                  <div className="font-display text-4xl font-bold text-stone-900 mb-1">{f.stat}</div>
                )}
                {(f.desc || f.statLabel) && (
                  <p className="text-xs text-stone-500 leading-relaxed">{f.desc || f.statLabel}</p>
                )}
                {/* BG number */}
                <div className="absolute right-2 bottom-0 font-display text-7xl font-bold text-stone-100 leading-none select-none pointer-events-none">
                  {f.n}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-10">
          <button className="border border-stone-300 hover:border-amber-500 hover:text-amber-500 text-stone-900 text-sm font-semibold px-7 py-2.5 rounded-full transition-all">
            Learn More
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── Team ─────────────────────────────────────────────────────────────────────

const Team = () => {
  const ref = useRef(null)
  const inView = useInView(ref)

  const members = [
    { name: 'Rahul Mehra', role: 'Founder & Managing Director', Img: ImgRahul },
    { name: 'Anjali Desai', role: 'Senior Project Manager', Img: ImgAnjali },
    { name: 'Vikram Joshi', role: 'Lead Structural Engineer', Img: ImgVikram },
  ]

  return (
    <section id="team" ref={ref} className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-14">
          <div>
            <SectionTag>Our Team</SectionTag>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 leading-tight max-w-xs">
              Meet the Experts Behind Mason
            </h2>
          </div>
          <div className="max-w-sm mt-4 md:mt-1">
            <p className="text-stone-500 text-sm leading-relaxed mb-4">
              Our strength lies in our people. At Mason, we're proud to have a skilled,
              passionate, and experienced team that brings every project to life.
            </p>
            <button className="border border-stone-300 hover:border-amber-500 hover:text-amber-500 text-stone-900 text-xs font-semibold px-5 py-2 rounded-full transition-all">
              Meet All Member
            </button>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8" ref={ref}>
          {members.map(({ name, role, Img }, i) => (
            <div key={name}
              className="transition-all duration-700"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(32px)', transitionDelay: `${i * 120}ms` }}>
              <div className="rounded-2xl overflow-hidden shadow-md mb-4">
                <Img />
              </div>
              <h3 className="text-base font-bold text-stone-900 mb-0.5">{name}</h3>
              <p className="text-xs text-stone-500 mb-3">{role}</p>
              <div className="flex gap-1.5">
                {['f', '𝕏', 'ig', 'in', '▶', '✈'].map(s => <SocialBtn key={s} label={s} />)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', agree: false })
  const set = (k) => (e) => setForm(prev => ({ ...prev, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  return (
    <section id="contact" className="bg-stone-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionTag>Contact With Us</SectionTag>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            Start Your Project With Us
          </h2>
          <p className="text-stone-500 text-sm max-w-lg mx-auto leading-relaxed">
            Let's turn your vision into reality. Whether you're planning a residential, commercial,
            or industrial project, our team is ready to guide you every step of the way.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Scene */}
          <div className="rounded-3xl overflow-hidden shadow-md" style={{ minHeight: 400 }}>
            <ImgCrane />
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-9 shadow-sm">
            <h3 className="text-lg font-bold text-stone-900 mb-6">Send a message</h3>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Enter your full name', key: 'name', type: 'text', ph: 'Jahidul Islam Jidan' },
                { label: 'Enter your email address', key: 'email', type: 'email', ph: 'demo@gmail.com' },
                { label: 'Enter your phone number', key: 'phone', type: 'tel', ph: '+900 1234 567 890' },
              ].map(({ label, key, type, ph }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-stone-600 mb-1.5">{label}</label>
                  <input type={type} placeholder={ph} value={form[key]} onChange={set(key)} className="form-input" />
                </div>
              ))}
              <div>
                <label className="block text-xs font-semibold text-stone-600 mb-1.5">Message</label>
                <textarea rows={3} placeholder="Type Here" value={form.message} onChange={set('message')}
                  className="form-input resize-none" />
              </div>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={form.agree} onChange={set('agree')} className="w-4 h-4 accent-amber-500" />
                <span className="text-xs text-stone-500">I agree to the terms of service.</span>
              </label>
              <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-lg transition-all hover:shadow-lg">
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Testimonials ─────────────────────────────────────────────────────────────

const Testimonials = () => {
  const reviews = [
    {
      name: 'Ahmad Karimov', role: 'CEO, Silk Capital Group', init: 'AK', color: '#8aacbf',
      text: '"Mason delivered our commercial complex ahead of schedule. Their attention to detail and professional team exceeded all our expectations. Truly outstanding work."',
    },
    {
      name: 'Dilnoza Nazarova', role: 'Property Developer', init: 'DN', color: '#c5a88a', featured: true,
      text: '"The Mason team was professional and communicative throughout our entire residential project. Quality craftsmanship and delivered exactly what they promised."',
    },
    {
      name: 'Rustam Sobirov', role: 'Factory Owner, Angren', init: 'RS', color: '#8ac8a0',
      text: '"Incredible experience working with Mason on our industrial facility. Their engineering expertise and modern approach saved us time and significant costs."',
    },
  ]

  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <SectionTag>Testimonials</SectionTag>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-stone-900 mb-4">
            What Our Clients Say
          </h2>
          <p className="text-stone-500 text-sm max-w-xl mx-auto leading-relaxed">
            We're proud to be trusted by clients across residential, commercial, and industrial sectors.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(r => (
            <div key={r.name}
              className={`rounded-2xl p-7 ${r.featured ? 'border-2 border-amber-500 shadow-md' : 'bg-stone-50'}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => <span key={i} className="text-amber-500 text-sm">★</span>)}
              </div>
              <p className="text-stone-600 text-sm leading-relaxed mb-6">{r.text}</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white"
                  style={{ background: r.color }}>
                  {r.init}
                </div>
                <div>
                  <div className="text-sm font-bold text-stone-900">{r.name}</div>
                  <div className="text-xs text-stone-400">{r.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer = () => (
  <footer className="bg-stone-900 text-stone-100 pt-16 pb-7">
    <div className="max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
        <div>
          <div className="flex items-center gap-2.5 mb-5">
            <LogoIcon size={20} bg="#E8851A" />
            <span className="font-display text-xl font-bold">Mason</span>
          </div>
          <p className="text-stone-400 text-xs leading-relaxed mb-4">
            Building excellence since 2008. We craft spaces that inspire, endure, and deliver lasting value.
          </p>
          <div className="flex gap-2">
            {['f', '𝕏', 'in', '▶'].map(s => <SocialBtn key={s} label={s} dark />)}
          </div>
        </div>
        {[
          { title: 'Services', links: ['Residential Construction', 'Commercial Projects', 'Industrial Facilities', 'Infrastructure', 'Interior Design'] },
          { title: 'Company', links: ['About Us', 'Our Team', 'Projects', 'Blog', 'Careers'] },
          { title: 'Contact', links: ['45 Builder Street, Toshkent', '+998 71 200 00 00', 'info@mason.uz'] },
        ].map(col => (
          <div key={col.title}>
            <h4 className="text-sm font-bold mb-4">{col.title}</h4>
            <ul className="flex flex-col gap-2.5">
              {col.links.map(l => (
                <li key={l} className="text-stone-400 text-xs hover:text-amber-400 transition-colors cursor-pointer">{l}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-stone-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="text-stone-500 text-xs">© 2024 Mason Construction. All rights reserved.</p>
        <div className="flex gap-5">
          <span className="text-stone-500 text-xs hover:text-stone-300 cursor-pointer">Privacy Policy</span>
          <span className="text-stone-500 text-xs hover:text-stone-300 cursor-pointer">Terms of Service</span>
        </div>
      </div>
    </div>
  </footer>
)

// ─── App Root ─────────────────────────────────────────────────────────────────

export default function App() {
  const [active, setActive] = useState('home')
  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar active={active} onNav={setActive} />
      <Hero />
      <About />
      <Team />
      <Contact />
      <Testimonials />
      <Footer />
    </div>
  )
}