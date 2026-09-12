import { useRef, type PointerEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const MOTES = [
  { left: '12%', top: '22%', size: 3, delay: '0s', duration: '7s' },
  { left: '28%', top: '68%', size: 2, delay: '1.4s', duration: '9s' },
  { left: '46%', top: '18%', size: 2.5, delay: '2.2s', duration: '8s' },
  { left: '63%', top: '42%', size: 3, delay: '0.6s', duration: '10s' },
  { left: '78%', top: '16%', size: 2, delay: '3s', duration: '8s' },
  { left: '84%', top: '72%', size: 2.5, delay: '1.1s', duration: '7.5s' },
  { left: '18%', top: '84%', size: 2, delay: '2.8s', duration: '11s' },
  { left: '52%', top: '78%', size: 3, delay: '0.3s', duration: '8.5s' },
  { left: '70%', top: '58%', size: 2, delay: '4s', duration: '9.5s' },
  { left: '36%', top: '36%', size: 2, delay: '1.8s', duration: '8.5s' },
]

const ATOMS = [
  { x: 70, y: 118, r: 8, fill: '#fdfaf4' },
  { x: 108, y: 88, r: 11, fill: '#c76749' },
  { x: 148, y: 112, r: 8, fill: '#607a60' },
  { x: 186, y: 72, r: 12, fill: '#281c18' },
  { x: 226, y: 98, r: 8, fill: '#c76749' },
  { x: 258, y: 58, r: 10, fill: '#c7d7c0' },
  { x: 292, y: 86, r: 7, fill: '#fdfaf4' },
  { x: 128, y: 52, r: 6, fill: '#c7d7c0' },
  { x: 204, y: 132, r: 6, fill: '#a04130' },
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
  const sx = useSpring(px, { stiffness: 90, damping: 16, mass: 0.45 })
  const sy = useSpring(py, { stiffness: 90, damping: 16, mass: 0.45 })

  const rotateY = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-12, 12])
  const rotateX = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [10, -10])
  const molX = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-22, 22])
  const molY = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [-16, 16])
  const lightX = useTransform(sx, [-0.5, 0.5], ['22%', '72%'])
  const lightY = useTransform(sy, [-0.5, 0.5], ['18%', '58%'])
  const glow = useMotionTemplate`radial-gradient(48% 40% at ${lightX} ${lightY}, rgba(199,103,73,0.42), transparent 68%)`

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
      role="img"
      aria-label={alt}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src={image}
          alt=""
          className={`absolute inset-0 h-full w-full object-cover object-[20%_50%] ${reduce ? 'scale-105' : 'still-life-plate'}`}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-cream/20 via-transparent to-charcoal/20" />
      </div>

      <motion.div
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ backgroundImage: glow }}
      />

      <motion.div
        className="pointer-events-none absolute -left-10 top-8 h-52 w-52 rounded-full bg-sage/55 blur-3xl"
        animate={reduce ? undefined : { x: [0, 36, 0], y: [0, 22, 0], opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute -right-8 bottom-6 h-60 w-60 rounded-full bg-terracotta/35 blur-3xl"
        animate={reduce ? undefined : { x: [0, -28, 0], y: [0, -26, 0], opacity: [0.32, 0.62, 0.32] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
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
        className={`pointer-events-none absolute ${
          variant === 'hero' ? 'right-[-4%] top-[-6%] h-[78%] w-[78%]' : 'right-[-8%] top-[-8%] h-[86%] w-[86%]'
        }`}
        style={{ x: molX, y: molY }}
      >
        <motion.div
          className="h-full w-full origin-center"
          animate={reduce ? undefined : { rotate: 360 }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
        >
          <svg viewBox="0 0 360 200" className="h-full w-full drop-shadow-[0_16px_28px_rgba(40,28,24,0.22)]">
            {BONDS.map(([a, b], i) => (
              <line
                key={i}
                x1={ATOMS[a].x}
                y1={ATOMS[a].y}
                x2={ATOMS[b].x}
                y2={ATOMS[b].y}
                stroke="rgba(253,250,244,0.72)"
                strokeWidth="2.4"
                strokeLinecap="round"
              />
            ))}
            {ATOMS.map((atom, i) => (
              <g key={i}>
                <circle cx={atom.x} cy={atom.y} r={atom.r + 8} fill={atom.fill} opacity="0.18" />
                <circle cx={atom.x} cy={atom.y} r={atom.r} fill={atom.fill} opacity="0.88" />
                <circle
                  cx={atom.x - atom.r * 0.3}
                  cy={atom.y - atom.r * 0.3}
                  r={atom.r * 0.3}
                  fill="#f2eee6"
                  opacity="0.7"
                />
              </g>
            ))}
          </svg>
        </motion.div>
      </motion.div>

      <div
        className={`pointer-events-none absolute inset-y-[-20%] left-1/4 w-1/3 bg-gradient-to-r from-transparent via-cream/40 to-transparent ${reduce ? 'hidden' : 'still-life-gleam'}`}
      />
    </motion.div>
  )
}
