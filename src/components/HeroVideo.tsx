// Drop a Grok Imagine loop at /public/hero-vial-still-life.mp4.
// The PNG of the same name is the poster and reduced-motion fallback.
import { useEffect, useRef, useState, type PointerEvent } from 'react'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const POSTER = '/hero-vial-still-life.png'
const VIDEO = '/hero-vial-still-life.mp4'

export function HeroVideo({
  className = '',
  label = 'Looping still-life of unlabeled peptide vials and a molecular model',
}: {
  className?: string
  label?: string
}) {
  const reduce = usePrefersReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [failed, setFailed] = useState(false)

  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 70, damping: 20, mass: 0.55 })
  const sy = useSpring(py, { stiffness: 70, damping: 20, mass: 0.55 })
  const rotateY = useTransform(sx, [-0.5, 0.5], reduce ? [0, 0] : [-5, 5])
  const rotateX = useTransform(sy, [-0.5, 0.5], reduce ? [0, 0] : [4, -4])
  const lightX = useTransform(sx, [-0.5, 0.5], ['28%', '68%'])
  const lightY = useTransform(sy, [-0.5, 0.5], ['24%', '52%'])
  const glow = useMotionTemplate`radial-gradient(46% 38% at ${lightX} ${lightY}, rgba(199,103,73,0.22), transparent 70%)`

  useEffect(() => {
    if (reduce) return
    const video = videoRef.current
    if (!video) return
    video.muted = true
    const play = () => {
      void video.play().catch(() => {
        setFailed(true)
      })
    }
    play()
    const onVisibility = () => {
      if (document.hidden) video.pause()
      else play()
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => document.removeEventListener('visibilitychange', onVisibility)
  }, [reduce])

  const onPointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (reduce) return
    const rect = stageRef.current?.getBoundingClientRect()
    if (!rect) return
    px.set((event.clientX - rect.left) / rect.width - 0.5)
    py.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const showPoster = reduce || failed

  return (
    <motion.div
      ref={stageRef}
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        px.set(0)
        py.set(0)
      }}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className={`relative isolate overflow-hidden rounded-3xl border border-line bg-paper shadow-soft ${className}`}
      role="img"
      aria-label={label}
    >
      {showPoster ? (
        <img src={POSTER} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          poster={POSTER}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          disablePictureInPicture
          controls={false}
          onError={() => setFailed(true)}
        >
          <source src={VIDEO} type="video/mp4" />
        </video>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cream/10 via-transparent to-charcoal/10" />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 mix-blend-soft-light"
        style={{ backgroundImage: glow }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-8 top-6 h-40 w-40 rounded-full bg-sage/40 blur-3xl"
        animate={reduce ? undefined : { x: [0, 18, 0], y: [0, 12, 0], opacity: [0.28, 0.5, 0.28] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-6 bottom-4 h-44 w-44 rounded-full bg-terracotta/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, -14, 0], y: [0, -12, 0], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
      />
    </motion.div>
  )
}
