import type { CataloguePeptide } from './types'

/** Public encyclopaedia snapshot used when Supabase is unavailable. */
export const CATALOGUE: CataloguePeptide[] = [
  {
    name: 'Retatrutide 10mg',
    slug: 'retatrutide',
    description: 'Triple agonist (GLP-1/GIP/glucagon) researched for weight management.',
    benefits: ['Appetite regulation', 'Fat loss', 'Metabolic support'],
    goals: ['weight_loss', 'metabolic'],
    tagline:
      'A triple-receptor agonist (GLP-1, GIP, glucagon). Researched as a next-generation incretin analogue after semaglutide and tirzepatide.',
    research: [
      'Jastreboff et al., NEJM (2023): Triple hormone-receptor agonist retatrutide for obesity — phase 2 trial showing up to 24.2% body weight reduction at 48 weeks.',
      'Rosenstock et al., Lancet (2023): Retatrutide for type 2 diabetes — phase 2 trial demonstrating glycaemic and metabolic improvements.',
      'Eli Lilly TRIUMPH-Outcomes (NCT06383390): ongoing Phase 3 trial of retatrutide in obesity with cardiovascular and kidney endpoints.',
    ],
  },
  {
    name: 'Cagrilintide 5mg',
    slug: 'cagrilintide',
    description: 'Long-acting amylin analogue researched for appetite and weight control.',
    benefits: ['Satiety', 'Appetite control', 'Weight management'],
    goals: ['weight_loss', 'metabolic'],
    tagline:
      'A long-acting amylin analogue studied for appetite through a different pathway than GLP-1 analogues.',
    research: [
      'Lau et al., Lancet (2021): Once-weekly cagrilintide for weight management — 10.8% weight loss at 26 weeks in a phase 2 trial.',
      'Enebo et al., Lancet (2021): Cagrilintide combined with semaglutide (CagriSema) produced 17.1% weight loss at 20 weeks.',
    ],
  },
  {
    name: 'MOTS-c 10mg',
    slug: 'mots-c',
    description: 'Mitochondrial-derived peptide researched for metabolic health and energy.',
    benefits: ['Mitochondrial function', 'Insulin sensitivity', 'Energy'],
    goals: ['energy', 'metabolic', 'longevity'],
    tagline:
      'A peptide encoded in mitochondrial DNA. Studied as an exercise-associated metabolic signal that declines with age.',
    research: [
      'Lee et al., Cell Metab (2015): The mitochondrial-derived peptide MOTS-c promotes metabolic homeostasis and reduces obesity and insulin resistance — the discovery paper.',
      'Reynolds et al., Nat Commun (2021): MOTS-c is an exercise-induced regulator of age-dependent physical decline and muscle homeostasis.',
      "D'Souza et al., Aging Cell (2020): MOTS-c expression in skeletal muscle of healthy aging men is associated with myofiber composition.",
    ],
  },
  {
    name: 'BPC-157 5mg',
    slug: 'bpc-157',
    description: 'Body Protection Compound — widely researched for tissue repair and gut health.',
    benefits: ['Tissue repair', 'Gut lining support', 'Reduced inflammation'],
    goals: ['recovery', 'injury', 'gut_health'],
    tagline:
      'A synthetic fragment of a protein found in gastric juice, studied for tissue repair and gut lining support.',
    research: [
      'Sikiric et al., Gut and Liver (2020): Stable gastric pentadecapeptide BPC 157 — progress, achievements, and the future. Comprehensive English review of cytoprotective effects.',
      'Chang et al., J Appl Physiol (2011): The promoting effect of pentadecapeptide BPC 157 on tendon healing — Achilles transection model in rats.',
      'Sikiric et al., J Physiol Pharmacol (2011): Focus on ulcerative colitis — stable gastric pentadecapeptide BPC 157.',
    ],
  },
  {
    name: 'TB-500 5mg',
    slug: 'tb-500',
    description: 'Thymosin Beta-4 fragment researched for systemic healing and recovery.',
    benefits: ['Soft tissue recovery', 'Flexibility', 'Endurance support'],
    goals: ['recovery', 'injury', 'performance'],
    tagline:
      'A synthetic fragment of thymosin beta-4, studied for actin organisation and tissue repair.',
    research: [
      'Treadwell et al., Annals NY Acad Sci (2012): The regenerative peptide thymosin β4 accelerates dermal healing in preclinical animal models and in patients.',
      'Malinda et al., J Invest Dermatol (1999): Thymosin β4 accelerates wound healing and promotes angiogenesis.',
      'Bock-Marquette et al., Nature (2004): Thymosin β4 activates integrin-linked kinase and promotes cardiac cell migration, survival and cardiac repair.',
    ],
  },
  {
    name: 'DSIP 10mg',
    slug: 'dsip',
    description: 'Delta Sleep-Inducing Peptide researched for sleep quality and stress modulation.',
    benefits: ['Deeper sleep', 'Stress regulation', 'Recovery'],
    goals: ['sleep', 'stress', 'recovery'],
    tagline:
      'Delta Sleep-Inducing Peptide, first described in 1977 and later studied for sleep architecture and stress recovery.',
    research: [
      'Schoenenberger and Monnier, PNAS (1977): Characterization of a delta-electroencephalogram (sleep)-inducing peptide — the original DSIP isolation paper.',
      'Pollard and Pomfrett, Eur J Anaesthesiol (2001): Delta sleep-inducing peptide — review of its role in human sleep and stress modulation.',
      'Larbig et al., Cephalalgia (1987): Peptidergic pain-reducing effects of DSIP in headache and other pain syndromes.',
    ],
  },
  {
    name: 'N-Acetyl Selank 10mg',
    slug: 'na-selank',
    description: 'Nasal anxiolytic peptide researched for calm, focus and immune modulation.',
    benefits: ['Reduced anxiety', 'Calm focus', 'Immune support'],
    goals: ['stress', 'mood', 'cognition'],
    tagline:
      'A tuftsin-derived peptide studied for calm focus without the sedation typical of older anxiolytics.',
    research: [
      'Medvedev et al. (2008): Efficacy and possible mechanisms of the new peptide anxiolytic Selank in generalized anxiety disorder and neurasthenia — clinical trial vs medazepam.',
      'Kozlovskaya et al., Neurosci Behav Physiol (2003): The optimising action of the synthetic peptide Selank on conditioned active avoidance in rats.',
      'Kolomin et al., Front Pharmacol (2016): Selank administration affects expression of genes involved in GABAergic neurotransmission.',
    ],
  },
  {
    name: 'N-Acetyl Semax 10mg',
    slug: 'na-semax',
    description: 'Nasal nootropic peptide researched for focus, memory and neuroprotection.',
    benefits: ['Focus', 'Memory', 'Mood support'],
    goals: ['cognition', 'focus', 'mood'],
    tagline:
      'An ACTH(4–7) analogue studied for attention, BDNF signalling, and cognitive performance.',
    research: [
      'Glazova et al., Biology Bulletin (2018): Semax as a universal drug for therapy and research — comprehensive English-language review.',
      'Shadrina et al., Brain Research (2006): Semax, an analog of ACTH(4-10) with cognitive effects, regulates BDNF and trkB expression in the rat hippocampus.',
      'Gusev et al. (1997): Effectiveness of Semax in the acute period of hemispheric ischemic stroke — clinical and electrophysiological study.',
    ],
  },
  {
    name: 'Dihexa 10mg',
    slug: 'dihexa',
    description: 'Angiotensin IV analogue researched for cognitive enhancement and neurogenesis.',
    benefits: ['Memory', 'Focus', 'Synaptic growth'],
    goals: ['cognition', 'focus', 'longevity'],
    tagline:
      'A blood–brain-barrier-permeable angiotensin IV analogue studied for synapse formation via HGF/c-Met.',
    research: [
      'McCoy et al., J Pharmacol Exp Ther (2013): Evaluation of metabolically stabilized angiotensin IV analogs (Dihexa) as pro-cognitive/anti-dementia agents.',
      'Benoist et al., J Pharmacol Exp Ther (2014): Pro-cognitive and synaptogenic effects of Dihexa depend on activation of the HGF/c-Met system.',
      "Wright and Harding, Front Endocrinol (2013): A role for the brain renin-angiotensin system in Alzheimer's and Parkinson's diseases.",
    ],
  },
  {
    name: 'NAD+ 500mg',
    slug: 'nad',
    description: 'NAD+ researched for cellular energy, longevity and cognitive support.',
    benefits: ['Cellular energy', 'Longevity', 'Mental clarity'],
    goals: ['energy', 'longevity', 'cognition'],
    tagline:
      'A coenzyme every cell uses to make energy. Tissue NAD+ declines with age; restoration is a major longevity research theme.',
    research: [
      'Yoshino et al., Science (2021): Nicotinamide mononucleotide increases muscle insulin sensitivity in prediabetic women.',
      'Imai and Guarente, Trends Cell Biol (2014): NAD+ and sirtuins in aging and disease — a landmark review.',
      'Martens et al., Nat Commun (2018): Chronic nicotinamide riboside supplementation is well-tolerated and elevates NAD+ in healthy adults.',
    ],
  },
  {
    name: 'GHK-Cu 100mg',
    slug: 'ghk-cu',
    description: 'Copper peptide researched for skin regeneration, hair and collagen synthesis.',
    benefits: ['Skin elasticity', 'Hair support', 'Collagen production'],
    goals: ['skin', 'hair', 'anti_aging'],
    tagline:
      'A copper-binding tripeptide produced naturally in the body and studied for skin, hair, and wound-healing pathways.',
    research: [
      'Pickart et al., BioMed Res Int (2015): GHK peptide as a natural modulator of multiple cellular pathways in skin regeneration.',
      'Pickart et al., Int J Mol Sci (2018): Regenerative and protective actions of the GHK-Cu peptide in the light of new gene data.',
      'Pyo et al., Arch Pharm Res (2007): The tripeptide-copper complex stimulates human hair growth in vitro.',
    ],
  },
]
