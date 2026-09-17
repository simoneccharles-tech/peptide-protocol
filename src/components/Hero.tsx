import { useRef } from 'react'
import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { WHATSAPP_TEXT, waLink } from '../lib/whatsapp'

const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260715_082433_69699cf8-444b-4484-93cc-053e57896dfd.mp4'

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.15 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] },
  },
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  // Parallax contained WITHIN the hero (absolute, not fixed) so it never
  // affects how the sections below composite.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '12%'])

  return (
    <section ref={ref} id="home" className="relative min-h-screen w-full overflow-hidden">
      {/* Video background (absolute, parallax) */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full scale-125 object-cover"
        >
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/70 to-black" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex min-h-screen flex-col justify-center px-6 pb-16 pt-28 md:px-16 lg:px-20">
        <motion.div variants={container} initial="hidden" animate="visible" className="max-w-4xl">
          <motion.div
            variants={item}
            className="liquid-glass mb-8 inline-flex items-center gap-2.5 rounded-full px-5 py-2 text-xs font-medium text-white/85 sm:text-sm"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
            UK Prescribed · Physician Led
          </motion.div>

          <motion.h1
            variants={item}
            className="font-serif text-[3.5rem] leading-[0.92] text-white sm:text-[5.5rem] md:text-[7rem] lg:text-[8.5rem]"
            style={{ letterSpacing: '-0.02em' }}
          >
            Precision
            <br />
            Peptide <span className="italic">Therapy</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-lg text-lg font-light text-white/75 sm:text-xl md:text-2xl"
          >
            Evidence based peptides. UK regulated. Real results.
          </motion.p>

          <motion.div variants={item} className="mt-10 flex flex-col items-start gap-3 sm:flex-row sm:items-center">
            <a
              href="#booking"
              className="group inline-flex items-center gap-3 bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
            >
              Begin your protocol
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href={waLink(WHATSAPP_TEXT.sourcing)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              Order directly on WhatsApp
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
