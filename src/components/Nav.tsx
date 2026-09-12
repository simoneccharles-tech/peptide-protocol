import { useState } from 'react'
import { motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'Peptides', href: '#peptides' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <nav className="sticky top-0 z-50 border-b border-line/70 bg-cream/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <motion.a
            href="#home"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 font-display text-lg font-bold tracking-tight uppercase"
          >
            <span className="font-display text-sm tracking-[0.15em] text-terracotta">The Peptide</span>
            <span className="font-display text-sm tracking-[0.15em] text-charcoal">Protocol</span>
          </motion.a>

          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="hidden items-center gap-7 text-[11px] font-medium tracking-[0.12em] text-ink md:flex"
          >
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} className="transition hover:text-terracotta">
                {l.label}
              </a>
            ))}
          </motion.div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="relative z-50 flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-charcoal md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </motion.button>
        </div>
      </nav>

      <motion.div
        initial={false}
        animate={{ opacity: open ? 1 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-cream/96 backdrop-blur-xl md:hidden ${
          open ? '' : 'pointer-events-none'
        }`}
      >
        {LINKS.map((l) => (
          <a
            key={l.label}
            href={l.href}
            onClick={() => setOpen(false)}
            className="font-display text-4xl text-charcoal"
          >
            {l.label}
          </a>
        ))}
        <a
          href="#booking"
          onClick={() => setOpen(false)}
          className="mt-4 rounded-full bg-terracotta px-8 py-4 text-xs font-medium uppercase tracking-[0.2em] text-cream"
        >
          Begin your protocol
        </a>
      </motion.div>
    </>
  )
}
