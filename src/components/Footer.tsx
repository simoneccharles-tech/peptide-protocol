const FOOTER_LINKS = [
  { label: 'Peptides', href: '#peptides' },
  { label: 'Protocols', href: '#protocols' },
  { label: 'Our Approach', href: '#approach' },
  { label: 'Book', href: '#booking' },
]

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 px-6 py-16 md:px-16 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="font-serif text-2xl text-white">The Peptide Protocol</div>
            <p className="mt-2 text-sm font-light text-white/45">thepeptideprotocol.uk</p>
            <p className="mt-4 text-sm font-light leading-relaxed text-white/50">
              UK prescribed, physician led peptide protocols. Real compounds,
              personalised dosing, and supply you can rely on.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/35">
              Explore
            </div>
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-sm font-light text-white/65 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="text-[11px] font-medium uppercase tracking-[0.25em] text-white/35">
              Contact
            </div>
            <a
              href="https://wa.me/6282322133001"
              className="text-sm font-light text-white/65 transition-colors hover:text-white"
            >
              WhatsApp +62 823 2213 3001
            </a>
            <span className="text-sm font-light text-white/45">
              Consultations by appointment
            </span>
          </div>
        </div>

        <div className="mt-14 border-t border-white/10 pt-6">
          <p className="text-xs font-light tracking-wide text-white/40">
            UK Regulated · MHRA-registered partners · Individual results may vary
          </p>
          <p className="mt-3 text-xs font-light leading-relaxed text-white/35">
            Peptides are prescribed and supervised by a UK physician and dispensed
            through MHRA-registered pharmacy partners. This page is information
            about our service and is not medical advice.
          </p>
          <p className="mt-3 text-xs font-light text-white/35">
            © 2026 The Peptide Protocol. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
