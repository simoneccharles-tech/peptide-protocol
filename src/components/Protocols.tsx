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
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">Packages</p>
          <h2
            className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl"
            style={{ letterSpacing: '-0.01em' }}
          >
            Choose your <span className="italic">protocol</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-white/55 sm:text-base">
            Every package is physician led. A UK consultation, personalised dosing,
            and a two month supply buffer are included.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {PROTOCOLS.map((protocol, i) => (
            <Reveal
              key={protocol.name}
              delay={i * 100}
              className={`flex flex-col rounded-2xl border p-8 backdrop-blur-sm ${
                protocol.featured
                  ? 'border-white/40 bg-white/[0.04]'
                  : 'border-white/12 bg-white/[0.02]'
              }`}
            >
              {protocol.featured && (
                <span className="mb-5 inline-flex w-fit items-center rounded-full border border-white/25 px-3 py-1 text-[11px] uppercase tracking-[0.15em] text-white/80">
                  Most chosen
                </span>
              )}

              <h3 className="font-serif text-2xl text-white">{protocol.name}</h3>
              <p className="mt-2 text-sm font-light text-white/55">{protocol.forWho}</p>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="font-serif text-4xl text-white">
                  {priceWithCurrency(protocol.price)}
                </span>
                {protocol.period && (
                  <span className="text-sm font-light text-white/45">
                    {protocol.period}
                  </span>
                )}
              </div>

              <div className="mt-6 flex flex-wrap gap-2">
                {protocol.compounds.map((c) => (
                  <span
                    key={c}
                    className="rounded-full border border-white/12 px-2.5 py-1 text-xs font-light text-white/65"
                  >
                    {c}
                  </span>
                ))}
              </div>

              <ul className="mt-6 flex-1 space-y-3">
                {protocol.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 flex-none text-white/80" strokeWidth={2} />
                    <span className="text-sm font-light text-white/70">{f}</span>
                  </li>
                ))}
              </ul>

              <a
                href="#booking"
                className={`mt-8 inline-block px-6 py-4 text-center text-xs font-medium uppercase tracking-[0.2em] transition ${
                  protocol.featured
                    ? 'bg-white text-black hover:bg-white/90'
                    : 'border border-white/25 text-white hover:bg-white hover:text-black'
                }`}
              >
                Book this protocol
              </a>
            </Reveal>
          ))}
        </div>

        <p className="mt-6 text-xs font-light text-white/35">
          Prices are indicative and confirmed at consultation. Compounds are
          dispensed only after a UK physician review.
        </p>
      </div>
    </section>
  )
}
