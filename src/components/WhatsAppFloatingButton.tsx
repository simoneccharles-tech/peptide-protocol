import { useEffect, useState } from 'react'
import { MessageCircle } from 'lucide-react'
import { buildWhatsAppMessage, waLink } from '../lib/whatsapp'

const REFERRAL_KEY = 'peptide_referral_code'

export default function WhatsAppFloatingButton() {
  const [href, setHref] = useState('')

  useEffect(() => {
    const fromUrl = new URLSearchParams(window.location.search).get('ref')
    if (fromUrl) localStorage.setItem(REFERRAL_KEY, fromUrl)
    const code = fromUrl || localStorage.getItem(REFERRAL_KEY)
    setHref(waLink(buildWhatsAppMessage(code)))
  }, [])

  if (!href) return null

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Order on WhatsApp now"
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-lg transition hover:opacity-90"
    >
      <MessageCircle className="h-4 w-4" aria-hidden="true" />
      <span className="hidden sm:inline">Order on WhatsApp now</span>
    </a>
  )
}
