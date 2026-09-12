import { motion } from 'framer-motion'
import { ArrowRight, FlaskConical, GraduationCap, Sparkles } from 'lucide-react'
import { Reveal } from './Reveal'
import { HeroStillLife } from './HeroStillLife'
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion'

const PILLARS = [
  {
    title: 'Targeted signalling',
    body: 'Each sequence binds to specific receptors — one pathway, one effect, rather than a system-wide push.',
  },
  {
    title: 'Native chemistry',
    body: 'Built from the same amino acids the body already uses, so the sequences are recognised, not foreign.',
  },
  {
    title: 'Lab-verified purity',
    body: 'Supplied as a pure lyophilised powder, third-party tested batch by batch. COA available on request.',
  },
  {
    title: 'Same-day across Bali',
    body: 'We deliver same-day across Bali — from Canggu to Uluwatu to Ubud.',
  },
]

export default function Education() {
  const reduce = usePrefersReducedMotion()

  return (
    <section id="first-time" className="mx-auto max-w-6xl px-6 pt-20 md:pt-24">
      <div className="relative overflow-hidden rounded-3xl border border-line bg-paper p-8 shadow-soft md:p-12">
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-terracotta/20 blur-3xl"
          animate={reduce ? undefined : { x: [0, -18, 0], y: [0, 14, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          aria-hidden
          className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-sage/50 blur-3xl"
          animate={reduce ? undefined : { x: [0, 20, 0], y: [0, -16, 0], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
        />

        <div className="relative">
          <Reveal>
            <div className="inline-flex items-center gap-2 rounded-full bg-terracotta/10 px-3 py-1 text-xs font-medium text-terracotta">
              <GraduationCap className="h-3.5 w-3.5" aria-hidden="true" />
              Peptides 101 for the curious
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold tracking-tight md:text-5xl">
              You&apos;ve heard of peptides.{' '}
              <span className="bg-gradient-to-r from-terracotta to-terracotta/60 bg-clip-text text-transparent">
                But what actually are they?
              </span>
            </h2>
            <p className="mt-5 text-base text-ink md:text-lg">
              Peptides are short chains of amino acids — typically two to fifty linked together
              in a precise sequence. They sit between single amino acids and full proteins, and
              your body already manufactures thousands of them. Insulin is a peptide. Oxytocin
              is a peptide. The signal that tells your pituitary to release growth hormone is a
              peptide. They are the language your cells use to talk to each other.
            </p>
            <p className="mt-3 text-base text-ink md:text-lg">
              This is what makes them so fascinating to the biohacking world. Where a supplement
              supplies a raw material and a drug tends to flood a single pathway, a peptide is a
              key cut for a specific lock. One sequence might bind to the receptor that regulates
              appetite. Another might trigger the repair cascade in damaged tendon tissue. Another
              tells melanocytes to produce more pigment, or instructs fibroblasts to lay down fresh
              collagen. The effect is targeted, biological and — because the body recognises the
              sequence — usually well tolerated.
            </p>
            <p className="mt-3 text-base text-ink md:text-lg">
              Researchers are exploring peptides for fat metabolism, lean mass, sleep depth,
              cognitive endurance, immune signalling, skin and hair quality, joint repair, libido,
              mood, mitochondrial function and the cellular markers of aging. For people serious
              about optimising the body they live in, peptides are arguably the most precise tool
              currently available outside a clinical setting.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {PILLARS.map((pillar, i) => (
              <Reveal key={pillar.title} delay={i * 90}>
                <motion.div
                  whileHover={reduce ? undefined : { y: -4, scale: 1.01 }}
                  transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                  className="rounded-2xl border border-line bg-cream/70 p-4 backdrop-blur"
                >
                  <div className="text-xs uppercase tracking-widest text-terracotta">{pillar.title}</div>
                  <p className="mt-2 text-sm text-ink">{pillar.body}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-8">
            <div className="flex flex-wrap gap-3">
              <a
                href="#faq"
                className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-3 text-sm font-medium text-cream transition hover:opacity-90"
              >
                Read the FAQs <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-line bg-cream px-6 py-3 text-sm font-medium transition hover:bg-sage/40"
                href="#peptides"
              >
                <FlaskConical className="h-4 w-4" aria-hidden="true" />
                Browse the library
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Reveal>
          <article className="group relative h-[420px] overflow-hidden rounded-3xl border border-line bg-paper shadow-soft md:h-[520px]">
            <HeroStillLife
              image="/hero-vial-still-life.png"
              alt="Living molecular still-life replacing stock athletic photography"
              variant="panel"
              className="absolute inset-0 h-full rounded-none border-0 shadow-none"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-cream md:p-9">
              <div className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-[11px] uppercase tracking-widest backdrop-blur">
                <Sparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Why people research them
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                The frontier of human performance.
              </h3>
              <p className="mt-2 max-w-md text-sm text-cream/85">
                From recomposition and recovery to sleep, cognition and longevity — peptides are
                how the biohacking world is exploring the next layer of optimisation.
              </p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={80}>
          <article className="group relative h-[420px] overflow-hidden rounded-3xl border border-line bg-paper shadow-soft md:h-[520px]">
            <HeroStillLife
              image="/education-light-caustic.png"
              alt="Animated vial still-life with drifting light, no labels or people"
              variant="panel"
              className="absolute inset-0 h-full rounded-none border-0 shadow-none"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/75 via-charcoal/20 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-7 text-cream md:p-9">
              <div className="inline-flex items-center gap-2 rounded-full bg-cream/15 px-3 py-1 text-[11px] uppercase tracking-widest backdrop-blur">
                <FlaskConical className="h-3.5 w-3.5" aria-hidden="true" />
                The library
              </div>
              <h3 className="mt-3 font-display text-2xl font-semibold tracking-tight md:text-3xl">
                Every peptide, explained.
              </h3>
              <p className="mt-2 max-w-md text-sm text-cream/85">
                Mechanism, research areas, typical dose ranges and the papers behind each one —
                written for the curious, not the salesfloor.
              </p>
              <a
                className="pointer-events-auto mt-5 inline-flex items-center gap-2 rounded-full bg-cream px-5 py-2.5 text-sm font-medium text-charcoal transition hover:bg-cream/90"
                href="#peptides"
              >
                Open the library <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </a>
              <p className="mt-3 text-[11px] text-cream/80">
                Evidence-led reference and supply in one place.
              </p>
            </div>
          </article>
        </Reveal>
      </div>

      <div id="faq" className="mx-auto mt-24 max-w-3xl pb-8">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            Peptide education FAQs
          </h2>
          <p className="mt-2 text-ink">
            The questions people ask most when they&apos;re first learning what peptides are.
          </p>
        </Reveal>
        <div className="mt-8 overflow-hidden rounded-2xl border border-line bg-paper shadow-soft">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group border-b border-line last:border-b-0 px-6">
              <summary className="cursor-pointer py-5 font-display text-base font-medium transition hover:text-terracotta">
                {faq.q}
              </summary>
              <p className="pb-5 text-sm leading-relaxed text-ink">{faq.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  )
}

const FAQS = [
  {
    q: 'What exactly are peptides?',
    a: 'Peptides are short chains of amino acids — the same building blocks proteins are made from. The body uses sequences like these as natural signalling molecules across systems like metabolism, repair, sleep and cognition.',
  },
  {
    q: 'How are peptides different from supplements?',
    a: 'Supplements typically supply raw materials. Peptides are studied as signalling molecules — they interact with specific receptors to influence a particular pathway rather than providing fuel or nutrients.',
  },
  {
    q: 'What outcomes are peptides researched for?',
    a: 'Common research areas include fat metabolism, recovery and tissue repair, sleep architecture, cognitive performance, skin and hair quality, and markers associated with longevity.',
  },
  {
    q: 'Why does third-party testing matter?',
    a: 'Independent Certificates of Analysis confirm identity, purity and absence of contaminants. Without third-party testing, there is no way to verify what is actually in a vial.',
  },
  {
    q: 'What are the rules around peptides?',
    a: 'Regulation varies by jurisdiction — how peptides can be sourced, possessed and used differs from country to country. It is your responsibility to understand local laws before sourcing them.',
  },
]
