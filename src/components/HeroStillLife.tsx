import { useRef, type PointerEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const MOTES = [
  { left: '12%', top: '22%', size: 3, delay: '0s', duration: '8s' },
  { left: '28%', top: '68%', size: 2, delay: '1.4s', duration: '11s' },
  { left: '46%', top: '18%', size: 2.5, delay: '2.2s', duration: '9s' },
  { left: '63%', top: '42%', size: 3, delay: '0.6s', duration: '12s' },
  { left: '78%', top: '16%', size: 2, delay: '3s', duration: '10s' },
  { left: '84%', top: '72%', size: 2.5, delay: '1.1s', duration: '8.5s' },
  { left: '18%', top: '84%', size: 2, delay: '2.8s', duration: '13s' },
  { left: '52%', top: '78%', size: 3, delay: '0.3s', duration: '9.5s' },
  { left: '70%', top: '58%', size: 2, delay: '4s', duration: '11.5s' },
  { left: '36%', top: '36%', size: 2, delay: '1.8s', duration: '10.5s' },
]

const ATOMS = [
  { x: 86, y: 168, r: 9, fill: '#281c18' },
  { x: 128, y: 132, r: 11, fill: '#c76749' },
  { x: 176, y: 148, r: 8, fill: '#607a60' },
  { x: 214, y: 108, r: 12, fill: '#281c18' },
  { x: 258, y: 128, r: 8, fill: '#c76749' },
  { x: 292, y: 86, r: 10, fill: '#c7d7c0' },
  { x: 330, y: 118, r: 7, fill: '#281c18' },
  { x: 154, y: 88, r: 6, fill: '#c7d7c0' },
  { x: 236, y: 168, r: 6, fill: '#a04130' },
  { x: 188, y: 196, r: 7, fill: '#281c18' },
]

const BONDS: Array<[number, number]> = [
  [0, 1],
  [1, 2],
  [2, 3],
  [3, 4],
  [4, 5],
  [5, 6],
  [1, 7],
  [3, 8],
  [2, 9],
]

type Variant = 'hero' | 'panel'

export function HeroStillLife({
  image,
  alt,
  variant = 'hero',
  className = '',
}: {
  image: string
  alt: string
  variant?: Variant
  className?: string
}) {
  const reduce = usePrefersReducedMotion()
  const stageRef = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 80, damping: 18, mass: 0.6 })
  const sy = useSpring(py, { stiffness: 80, damping: 18, mass: 0.6 })

  const rotateY = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-9, 9])
  const rotateX = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [7, -7])
  const molX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-18, 18])
  const molY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [-12, 12])
  const lightX = useTransform(sx, [-0.5, 0.5], ['28%', '62%'])
  const lightY = useTransform(sy, [-0.5, 0.5], ['22%', '48%'])
  const glow = useMotionTemplate`radial-gradient(42% 36% at ${lightX} ${lightY}, rgba(199,103,73,0.34), transparent 70%)`

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onPointerLeave = () => {
    px.set(0)
    py.set(0)
  }

  return (
    <motion.div
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      className={`relative isolate overflow-hidden rounded-3xl border border-line bg-paper shadow-soft ${className}`}
      aria-hidden={false}
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover ${reduce ? 'scale-105' : 'still-life-plate'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cream/25 via-transparent to-charcoal/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/35 via-transparent to-cream/10" />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ backgroundImage: glow }}
      />

      <motion.div
        className="pointer-events-none absolute -left-10 top-8 h-44 w-44 rounded-full bg-sage/50 blur-3xl"
        animate={reduce ? undefined : { x: [0, 24, 0], y: [0, 16, 0], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-8 bottom-6 h-52 w-52 rounded-full bg-terracotta/30 blur-3xl"
        animate={reduce ? undefined : { x: [0, -18, 0], y: [0, -22, 0], opacity: [0.28, 0.5, 0.28] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
      />

      {MOTES.map((mote, i) => (
        <span
          key={i}
          className={`pointer-events-none absolute rounded-full bg-cream/90 ${reduce ? '' : 'still-life-mote'}`}
          style={{
            left: mote.left,
            top: mote.top,
            width: mote.size,
            height: mote.size,
            animationDelay: reduce ? undefined : mote.delay,
            animationDuration: reduce ? undefined : mote.duration,
          }}
        />
      ))}

      <motion.div
        className={`pointer-events-none absolute ${variant === 'hero' ? 'inset-[8%] sm:inset-[6%]' : 'inset-[12%]'}`}
        style={{ x: molX, y: molY }}
      >
        <motion.div
          className="h-full w-full"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 48, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 420 280" className="h-full w-full drop-shadow-[0_12px_30px_rgba(40,28,24,0.18)]">
            {BONDS.map(([a, b], i) => (
              <line
                key={i}
                x1={ATOMS[a].x}
                y1={ATOMS[a].y}
                x2={ATOMS[b].x}
                y2={ATOMS[b].y}
                stroke="rgba(40,28,24,0.45)"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            ))}
            {ATOMS.map((atom, i) => (
              <g key={i}>
                <circle cx={atom.x} cy={atom.y} r={atom.r + 7} fill={atom.fill} opacity="0.16" />
                <circle cx={atom.x} cy={atom.y} r={atom.r} fill={atom.fill} opacity="0.92" />
                <circle
                  cx={atom.x - atom.r * 0.28}
                  cy={atom.y - atom.r * 0.28}
                  r={atom.r * 0.28}
                  fill="#f2eee6"
                  opacity="0.55"
                />
              </g>
            ))}
          </svg>
        </motion.div>
      </motion.div>

      <VialOverlay reduce={reduce} />

      <div
        className={`pointer-events-none absolute inset-y-[-20%] left-1/3 w-1/4 bg-gradient-to-r from-transparent via-cream/35 to-transparent ${reduce ? 'hidden' : 'still-life-gleam'}`}
      />
    </motion.div>
  )
}

function VialOverlay({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      className="pointer-events-none absolute bottom-[12%] left-[9%] w-[22%] min-w-[72px] max-w-[120px]"
      animate={reduce ? undefined : { y: [0, -6, 0], rotate: [-1.4, 1.4, -1.4] }}
      transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg viewBox="0 0 80 160" className="h-auto w-full drop-shadow-[0_10px_18px_rgba(40,28,24,0.28)]">
        <rect x="28" y="8" width="24" height="14" rx="3" fill="#281c18" />
        <rect x="30" y="20" width="20" height="10" rx="2" fill="#c7d7c0" />
        <path
          d="M22 34h36c3 0 6 3 6 6v104c0 8-6 14-14 14H30c-8 0-14-6-14-14V40c0-3 3-6 6-6z"
          fill="rgba(253,250,244,0.28)"
          stroke="rgba(253,250,244,0.7)"
          strokeWidth="1.4"
        />
        <path
          className={reduce ? undefined : 'still-life-liquid'}
          d="M20 86c8-6 16 4 24-2 8-6 16 3 24-1v58c0 7-5 12-12 12H32c-7 0-12-5-12-12V86z"
          fill="#c76749"
          opacity="0.55"
        />
        <path d="M26 40c0 18 2 40 2 58" stroke="rgba(253,250,244,0.55)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </motion.div>
  )
}
