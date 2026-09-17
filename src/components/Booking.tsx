import { useState } from 'react'
import { Check, ArrowRight } from 'lucide-react'
import { Reveal } from './Reveal'
import { WHATSAPP_DISPLAY, WHATSAPP_URL } from '../lib/whatsapp'

interface FormState {
  name: string
  email: string
  whatsapp: string
  goal: string
  time: string
  message: string
}

const EMPTY: FormState = {
  name: '',
  email: '',
  whatsapp: '',
  goal: 'Longevity and performance',
  time: 'Morning',
  message: '',
}

const GOALS = [
  'Longevity and performance',
  'Weight loss and transformation',
  'Not sure yet',
]
const TIMES = ['Morning', 'Afternoon', 'Evening']

const inputClass =
  'w-full border-0 border-b border-white/15 bg-transparent px-0 py-3 text-sm text-white placeholder-white/35 outline-none transition focus:border-white/60'
const labelClass = 'mb-1.5 block text-[11px] font-medium uppercase tracking-[0.2em] text-white/40'

export default function Booking() {
  const [form, setForm] = useState<FormState>(EMPTY)
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)

  const update = (key: keyof FormState, value: string) => {
    setForm((f) => ({ ...f, [key]: value }))
    setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const validate = () => {
    const next: Partial<Record<keyof FormState, string>> = {}
    if (!form.name.trim()) next.name = 'Please enter your name'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = 'Enter a valid email'
    if (form.whatsapp.trim().replace(/[^0-9]/g, '').length < 7)
      next.whatsapp = 'Enter a reachable number'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    // No backend yet: hold the request and confirm to the client. Wire this to a
    // real endpoint (Cal.com, API route, or the clinic Supabase) to go live.
    // eslint-disable-next-line no-console
    console.log('booking request', form)
    setSubmitted(true)
  }

  return (
    <section id="booking" className="relative px-6 py-28 sm:py-36 md:px-16 lg:px-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-20">
        {/* Left: pitch */}
        <Reveal>
          <p className="text-xs uppercase tracking-[0.28em] text-white/40">Booking</p>
          <h2
            className="mt-5 font-serif text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl"
            style={{ letterSpacing: '-0.01em' }}
          >
            Book your <span className="italic">consultation</span>
          </h2>
          <p className="mt-5 max-w-md text-sm font-light leading-relaxed text-white/55 sm:text-base">
            Tell us where you want to start. A UK physician reviews your request and
            confirms your consultation on WhatsApp within 48 hours.
          </p>

          <div className="mt-8 space-y-4">
            {[
              'Physician led from the first conversation',
              'A protocol written around your body and goals',
              'Dispensed through MHRA-registered pharmacy partners',
            ].map((point) => (
              <div key={point} className="flex items-start gap-3">
                <Check className="mt-0.5 h-4 w-4 flex-none text-white/80" strokeWidth={2} />
                <span className="text-sm font-light text-white/70">{point}</span>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Right: form or success */}
        <div className="border border-white/12 bg-white/[0.02] p-7 backdrop-blur-sm sm:p-9">
          {submitted ? (
            <div className="flex h-full flex-col items-center justify-center py-12 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25">
                <Check className="h-7 w-7 text-white" strokeWidth={1.75} />
              </div>
              <h3 className="mt-6 font-serif text-3xl text-white">Request received</h3>
              <p className="mt-3 max-w-sm text-sm font-light leading-relaxed text-white/55">
                Thank you, {form.name.split(' ')[0] || 'there'}. A UK physician will
                confirm your consultation on WhatsApp within 48 hours.
              </p>
              <button
                onClick={() => {
                  setForm(EMPTY)
                  setSubmitted(false)
                }}
                className="mt-6 text-xs font-medium uppercase tracking-[0.2em] text-white/50 transition hover:text-white"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} noValidate className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="name">Full name</label>
                  <input
                    id="name"
                    className={inputClass}
                    placeholder="Jane Doe"
                    value={form.name}
                    onChange={(e) => update('name', e.target.value)}
                  />
                  {errors.name && <p className="mt-1.5 text-xs text-rose-300/90">{errors.name}</p>}
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    className={inputClass}
                    placeholder="jane@email.com"
                    value={form.email}
                    onChange={(e) => update('email', e.target.value)}
                  />
                  {errors.email && <p className="mt-1.5 text-xs text-rose-300/90">{errors.email}</p>}
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="whatsapp">WhatsApp number</label>
                <input
                  id="whatsapp"
                  className={inputClass}
                  placeholder="+44 7700 000000"
                  value={form.whatsapp}
                  onChange={(e) => update('whatsapp', e.target.value)}
                />
                {errors.whatsapp && <p className="mt-1.5 text-xs text-rose-300/90">{errors.whatsapp}</p>}
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className={labelClass} htmlFor="goal">Your goal</label>
                  <select
                    id="goal"
                    className={inputClass}
                    value={form.goal}
                    onChange={(e) => update('goal', e.target.value)}
                  >
                    {GOALS.map((g) => (
                      <option key={g} value={g} className="bg-[#0a0a0a] text-white">
                        {g}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelClass} htmlFor="time">Preferred time</label>
                  <select
                    id="time"
                    className={inputClass}
                    value={form.time}
                    onChange={(e) => update('time', e.target.value)}
                  >
                    {TIMES.map((t) => (
                      <option key={t} value={t} className="bg-[#0a0a0a] text-white">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className={labelClass} htmlFor="message">Anything to add</label>
                <textarea
                  id="message"
                  rows={2}
                  className={`${inputClass} resize-none`}
                  placeholder="Current medications, questions, or context."
                  value={form.message}
                  onChange={(e) => update('message', e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="group flex w-full items-center justify-center gap-3 bg-white px-6 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black transition hover:bg-white/90"
              >
                Request your consultation
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <p className="text-center text-xs font-light text-white/35">
                Or message us directly on WhatsApp at{' '}
                <a
                  href={WHATSAPP_URL}
                  className="text-white/55 transition-colors hover:text-white"
                >
                  {WHATSAPP_DISPLAY}
                </a>
                .
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
