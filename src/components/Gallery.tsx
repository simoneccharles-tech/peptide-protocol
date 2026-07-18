import { PEPTIDES } from '../data/peptides'
import { Reveal } from './Reveal'

export default function Gallery() {
  return (
    <section id="peptides" className="relative px-6 py-28 sm:py-36 md:px-16 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">
            The formulary
          </p>
          <h2
            className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl"
            style={{ letterSpacing: '-0.01em' }}
          >
            The peptides <span className="italic">we offer</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-white/55 sm:text-base">
            Research grade compounds, dosed to a protocol and dispensed through
            MHRA-registered pharmacy partners. Never sold loose, never guesswork.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PEPTIDES.map((p, i) => (
            <Reveal
              key={p.name}
              delay={(i % 4) * 80}
              className="liquid-glass overflow-hidden rounded-2xl"
            >
              <div
                className="flex h-44 items-center justify-center px-4"
                style={{ background: `linear-gradient(150deg, ${p.from}, ${p.to})` }}
              >
                <span className="text-center font-serif text-3xl text-white">
                  {p.name}
                </span>
              </div>
              <div className="p-5">
                <span className="inline-block rounded-full border border-white/15 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-white/70">
                  {p.tag}
                </span>
                <p className="mt-4 text-sm font-light leading-relaxed text-white/55">
                  {p.blurb}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
