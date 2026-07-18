import { Reveal } from './Reveal'

const STEPS = [
  {
    n: '01',
    title: 'Consultation',
    body: 'A UK physician reviews your history, your goals, and your labs if you have them.',
  },
  {
    n: '02',
    title: 'Protocol design',
    body: 'Your compounds, doses, and schedule, written specifically for you.',
  },
  {
    n: '03',
    title: 'Licensed supply',
    body: 'Dispensed through MHRA-registered pharmacy partners, with a two month buffer held.',
  },
  {
    n: '04',
    title: 'Ongoing coaching',
    body: 'Weekly check ins on WhatsApp. Your doses adjust as your body changes.',
  },
]

export default function Consultations() {
  return (
    <section id="approach" className="relative px-6 py-28 sm:py-36 md:px-16 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">
            Physician supervised
          </p>
          <h2
            className="mt-5 max-w-2xl font-serif text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl"
            style={{ letterSpacing: '-0.01em' }}
          >
            A doctor guides <span className="italic">every protocol</span>
          </h2>
          <p className="mt-5 max-w-xl text-sm font-light leading-relaxed text-white/55 sm:text-base">
            Nothing is sold in a chat. You speak with a UK physician, receive a
            protocol, and your compounds are dispensed through a licensed pharmacy.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <Reveal key={step.n} delay={i * 100} className="border-t border-white/15 pt-6">
              <div className="font-serif text-5xl text-white/25">{step.n}</div>
              <h3 className="mt-6 font-serif text-2xl text-white">{step.title}</h3>
              <p className="mt-3 text-sm font-light leading-relaxed text-white/55">
                {step.body}
              </p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14">
          <a
            href="#booking"
            className="inline-block bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
          >
            Book a consultation
          </a>
        </Reveal>
      </div>
    </section>
  )
}
