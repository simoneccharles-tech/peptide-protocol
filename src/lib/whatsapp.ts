/** Simone's personal WhatsApp. Digits only — used by every chat CTA. */
export const WHATSAPP_PHONE = '447424327888'
export const WHATSAPP_DISPLAY = '+44 7424 327888'
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_PHONE}`

export const WHATSAPP_TEXT = {
  sourcing:
    "Hi! I found you via The Peptide Protocol and I'd like to enquire about sourcing peptides.",
  ordering: "Hi! I'd like to enquire about ordering.",
  deletion: "Hi! I'd like to request deletion of my personal data.",
} as const

/** Production `waLink` helper: api.whatsapp.com with optional prefilled text. */
export function waLink(text?: string) {
  const base = `https://api.whatsapp.com/send?phone=${WHATSAPP_PHONE}`
  return text ? `${base}&text=${encodeURIComponent(text)}` : base
}

export function buildWhatsAppMessage(referralCode?: string | null) {
  const text = WHATSAPP_TEXT.sourcing
  return referralCode ? `${text} Referral code: ${referralCode}` : text
}
