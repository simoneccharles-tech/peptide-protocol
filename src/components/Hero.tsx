import { motion, type Variants } from 'framer-motion'
import {
  ArrowRight,
  BadgeCheck,
  FlaskConical,
  GraduationCap,
  MapPin,
  MessageCircle,
  PackageCheck,
  ShieldCheck,
  Sparkles,
} from 'lucide-react'
import { FAVOURITE_PEPTIDES } from '../data/peptides'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'
import { HeroVideo } from './HeroVideo'

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.08 },
  },
}

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] },
  },
}

const TRUST = [
  { icon: BadgeCheck, title: 'Evidence-led', detail: 'science first' },
  { icon: FlaskConical, title: 'Science-led', detail: 'papers cited' },
  { icon: PackageCheck, title: 'We respond same day', detail: 'fast turnaround' },
  { icon: ShieldCheck, title: 'No upsells', detail: 'no affiliate fluff' },
]

export default function Hero() {
  const reduce = usePrefersReducedMotion()

  return (
    <section id="home" className="relative overflow-hidden" style={{ background: 'var(--gradient-hero)' }}>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-sage/40 blur-3xl"
        animate={reduce ? undefined : { x: [0, 30, 0], y: [0, 18, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-16 bottom-0 h-80 w-80 rounded-full bg-terracotta/20 blur-3xl"
        animate={reduce ? undefined : { x: [0, -22, 0], y: [0, -16, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-6 pb-20 pt-28 md:grid-cols-[1.05fr_0.95fr] md:pb-24 md:pt-32">
        <motion.div variants={container} initial="hidden" animate="visible">
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-paper/60 px-3 py-1 text-xs text-ink"
          >
            <MapPin className="h-3 w-3" aria-hidden="true" />
            Independent peptide education · Based in Bali
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-semibold leading-[1.05] tracking-tight text-charcoal sm:text-5xl md:text-6xl"
          >
            Discover what peptides
            <br />
            <span className="text-ink">can actually do for you.</span>
          </motion.h1>

          <motion.h2
            variants={item}
            className="mt-4 font-display text-xl font-normal text-ink sm:text-2xl"
          >
            Cutting through the hype with honest, evidence-based guidance.
          </motion.h2>

          <motion.p variants={item} className="mt-5 max-w-xl text-base text-ink sm:text-lg">
            Tell us your goals, health concerns, or story. Our AI reviews the latest research
            and matches you to the peptides with the strongest clinical support — then explains
            the actual studies in plain English.
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-base text-ink sm:text-lg">
            <span className="font-medium text-charcoal">Evidence first, then supply.</span> We
            translate the science so you can make better-informed decisions, then supply the
            peptides you choose.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-col gap-3">
            <a
              className="inline-flex w-fit items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-base font-medium text-cream shadow-soft transition hover:opacity-90"
              href="#booking"
            >
              <Sparkles className="h-4 w-4" aria-hidden="true" />
              Find My Protocol — 60-second consult
            </a>
            <div className="flex flex-wrap gap-3">
              <a
                className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium transition hover:bg-sage/40"
                href="#peptides"
              >
                <FlaskConical className="h-4 w-4" aria-hidden="true" />
                Browse the library
              </a>
              <a
                href="#first-time"
                className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-5 py-2.5 text-sm font-medium transition hover:bg-sage/40"
              >
                <GraduationCap className="h-4 w-4" aria-hidden="true" />
                Peptides 101
              </a>
            </div>
            <div className="mt-2 rounded-2xl border border-line bg-paper/60 p-4">
              <a
                href="https://api.whatsapp.com/send?phone=6282322133001&text=Hi!%20I%20found%20you%20via%20The%20Peptide%20Protocol%20and%20I%27d%20like%20to%20enquire%20about%20sourcing%20peptides."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                Order directly on WhatsApp
              </a>
              <p className="mt-2 text-xs text-ink">Live chat, no forms, same-day response.</p>
            </div>
            <p className="text-xs text-ink">
              Free · no signup · unlocks the full science vault for every peptide we cover.
            </p>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-10 grid grid-cols-2 gap-6 text-sm text-ink sm:grid-cols-4"
          >
            {TRUST.map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex items-start gap-2">
                <Icon className="mt-0.5 h-4 w-4 text-terracotta" aria-hidden="true" />
                <div>
                  <div className="font-display text-charcoal">{title}</div>
                  {detail}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <div className="relative space-y-4">
          <HeroVideo className="h-[380px] w-full sm:h-[460px] md:h-[560px]" />

          <div className="rounded-3xl border border-line bg-paper p-6 shadow-soft">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-ink">
              <FlaskConical className="h-4 w-4" aria-hidden="true" />
              Our favourite peptides right now
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {FAVOURITE_PEPTIDES.map((peptide) => (
                <div
                  key={peptide.name}
                  className="rounded-2xl bg-sage/50 px-4 py-3 text-sm text-ink"
                >
                  <div className="font-display text-sm font-medium text-charcoal">
                    {peptide.name}
                    <span className="ml-2 text-xs font-normal text-ink">{peptide.dose}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed">{peptide.note}</p>
                </div>
              ))}
            </div>
            <a
              className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-terracotta hover:underline"
              href="#peptides"
            >
              Explore the full library <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </a>
            <div className="mt-3 flex items-center gap-2 text-xs text-ink">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Independent, evidence-based and COA-verified.
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
