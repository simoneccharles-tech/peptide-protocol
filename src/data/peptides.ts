export interface Peptide {
  name: string
  tag: string
  blurb: string
  from: string
  to: string
}

// The compounds offered. Blurbs follow the house copy rules: no em-dashes,
// no ampersands, plain human language. Card tones are muted and dark so the
// gallery reads as one cohesive system on the black background.
export const PEPTIDES: Peptide[] = [
  {
    name: 'Retatrutide',
    tag: 'Weight loss',
    blurb: 'Metabolic transformation and appetite regulation. The anchor of the transformation protocol.',
    from: '#3a2530',
    to: '#140b10',
  },
  {
    name: 'GHK-Cu',
    tag: 'Renewal',
    blurb: 'Skin, hair, and tissue renewal. A daily foundation for visible repair.',
    from: '#3a2a1c',
    to: '#140d0a',
  },
  {
    name: 'BPC-157',
    tag: 'Recovery',
    blurb: 'Tissue repair and gut health. Supports faster recovery between sessions.',
    from: '#22323a',
    to: '#0c1216',
  },
  {
    name: 'MOTS-C',
    tag: 'Longevity',
    blurb: 'Energy, endurance, and mitochondrial longevity for the long game.',
    from: '#2b3222',
    to: '#10140c',
  },
  {
    name: 'NAD+',
    tag: 'Cellular',
    blurb: 'Cellular energy and mitochondrial health at the source.',
    from: '#2e2740',
    to: '#100e1a',
  },
  {
    name: 'TB-500',
    tag: 'Recovery',
    blurb: 'Recovery, flexibility, and connective tissue support.',
    from: '#26303f',
    to: '#0d121a',
  },
  {
    name: 'Na-Semax',
    tag: 'Cognitive',
    blurb: 'Focus, clarity, and cognitive support through the working day.',
    from: '#3a2f22',
    to: '#14100a',
  },
  {
    name: 'Cagrilintide',
    tag: 'Appetite',
    blurb: 'Appetite regulation, held in reserve for tailored protocols.',
    from: '#3a2430',
    to: '#140b11',
  },
]

export const FAVOURITE_PEPTIDES = [
  {
    name: 'Retatrutide',
    dose: '10mg',
    note: 'Triple agonist (GLP-1/GIP/glucagon) researched for weight management.',
  },
  {
    name: 'GHK-Cu',
    dose: '100mg',
    note: 'Copper peptide researched for skin regeneration, hair and collagen synthesis.',
  },
  {
    name: 'NAD+',
    dose: '500mg',
    note: 'Researched for cellular energy, longevity and cognitive support.',
  },
  {
    name: 'DSIP',
    dose: '10mg',
    note: 'Delta Sleep-Inducing Peptide researched for sleep quality and stress modulation.',
  },
] as const

export interface Protocol {
  name: string
  forWho: string
  price: string
  period: string
  compounds: string[]
  features: string[]
  featured?: boolean
}

// Placeholder pricing: edit to your real package prices.
export const PROTOCOLS: Protocol[] = [
  {
    name: 'Longevity Protocol',
    forWho: 'Performance and healthspan, ages 45 to 65',
    price: 'from 420',
    period: 'per month',
    compounds: ['BPC-157', 'MOTS-C', 'GHK-Cu', 'NAD+', 'TB-500'],
    features: [
      'UK physician consultation included',
      'Personalised dosing schedule',
      'Two month supply buffer',
      'WhatsApp coaching and check ins',
    ],
  },
  {
    name: 'Transformation Protocol',
    forWho: 'Weight loss and body change, ages 28 to 55',
    price: 'from 480',
    period: 'per month',
    compounds: ['Retatrutide', 'MOTS-C', 'BPC-157', 'GHK-Cu'],
    features: [
      'UK physician consultation included',
      'Guided titration schedule',
      'Two month supply buffer',
      'Weekly progress check ins',
    ],
    featured: true,
  },
  {
    name: 'Bespoke Protocol',
    forWho: 'Fully custom, consultation led',
    price: 'On consultation',
    period: '',
    compounds: ['Tailored to your labs and goals'],
    features: [
      'Full intake and labs review',
      'Custom compound stack',
      'Ongoing adjustments',
      'Priority physician support',
    ],
  },
]
