import { Check } from 'lucide-react'
import { PROTOCOLS } from '../data/peptides'
import { Reveal } from './Reveal'

function priceWithCurrency(price: string) {
  return price.replace(/(\d+)/, '£$1')
}

export default function Protocols() {
  return (
    <section id="protocols" className="relative px-6 py-28 sm:py-36 md:px-16 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-ink">Packages</p>
          <h2
            className="mt-5 max-w-2xl font-display text-4xl leading-[1.05] text-charcoal sm:text-5xl md:text-6xl"
            style={{ letterSpacing: '-0.01em' }}
          >
            Choose your <span className="italic text-ink">protocol</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm font-normal leading-relaxed text-ink sm:text-base">
            Every package is physician led. A UK consultation, personalised dosing,
            and a two month supply buffer are included.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROTOCOLS.map((protocol, i) => (
            <Reveal
              key={protocol.name}
              delay={i * 100}
              className={`flex flex-col rounded-2xl border p-8 ${
                protocol.featured
                  ? 'border-terracotta/40 bg-paper shadow-soft'
                  : 'border-line bg-paper/70'
              }`}
            >
              {protocol.featured && (
                <span className="mb-5 inline-flex w-fit items-center rounded-full border border-terracotta/30 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-terracotta">
                  Most chosen
                </span>
              )}

              <h3 className="font-display text-2xl text-charcoal">{protocol.name}</h3>
              <p className="mt-2 text-sm font-normal text-ink">{protocol.forWho}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-display text-4xl text-charcoal">
                  {priceWithCurrency(protocol.price)}
                </span>
                {protocol.period && (
                  <span className="text-sm font-normal text-ink">
                    {protocol.period}
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {protocol.compounds.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-line px-2.5 py-1 text-xs font-normal text-ink"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {protocol.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-terracotta" strokeWidth={2} />
                    <span className="text-sm font-normal text-charcoal/80">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                className={`mt-8 inline-block rounded-full px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] transition ${
                  protocol.featured
                    ? 'bg-terracotta text-cream hover:opacity-90'
                    : 'border border-line text-charcoal hover:bg-sage/40'
                }`}
              >
                Book this protocol
              </a>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs font-normal text-ink">
          Prices are indicative and confirmed at consultation. Compounds are
          dispensed only after a UK physician review.
        </p>
      </div>
    </section>
  )
}
