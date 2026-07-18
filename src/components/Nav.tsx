import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X, CircleUserRound } from 'lucide-react'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'Peptides', href: '#peptides' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="absolute inset-x-0 top-0 z-50 flex items-center justify-between px-6 pt-8 md:px-16 lg:px-20">
        <motion.a
          href="#home"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xl font-semibold tracking-tight text-white md:text-2xl"
        >
          The Peptide Protocol
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="liquid-glass hidden items-center gap-8 rounded-full px-8 py-3 text-sm font-medium text-white/80 md:flex"
        >
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="transition hover:text-white">
              {l.label}
            </a>
          ))}
        </motion.div>

        <div className="flex items-center gap-3">
          <div className="liquid-glass hidden h-11 w-11 items-center justify-center rounded-full md:flex">
            <CircleUserRound className="h-5 w-5 text-white/80" strokeWidth={1.5} />
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="liquid-glass relative z-50 flex h-11 w-11 items-center justify-center rounded-full md:hidden"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile overlay */}
      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-black/90 backdrop-blur-xl md:hidden ${
          open ? '' : 'pointer-events-none'
        }`}
      >
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-serif text-4xl text-white/90"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#booking"
          onClick={() => setOpen(false)}
          className="mt-4 bg-white px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-black"
        >
          Begin your protocol
        </a>
      </motion.div>
    </>
  )
}
