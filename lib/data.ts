export interface Option {
  icon: string
  label: string
  value: string
}

export interface Question {
  id: number
  number: string
  emoji?: string
  text: string
  type: 'options' | 'slider' | 'textarea' | 'contact'
  options?: Option[]
}

export interface HeroContent {
  titleBefore: string
  titleEm: string
  titleAfter: string
  sub: string
}

export const QUESTIONS: Question[] = [
  {
    id: 1,
    number: 'Question 01',
    emoji: '🩺',
    text: "What's your title? (We promise not to judge.)",
    type: 'options',
    options: [
      { icon: '👑', label: 'Clinic Owner / Director — I sign the cheques',  value: 'Clinic Owner / Director' },
      { icon: '💉', label: 'Aesthetic Doctor — I poke faces for a living',   value: 'Aesthetic Doctor' },
      { icon: '💊', label: 'Nurse / Aesthetic Practitioner',                  value: 'Nurse / Practitioner' },
      { icon: '📋', label: 'Clinic Manager — I hold it all together',         value: 'Clinic Manager' },
    ],
  },
  {
    id: 2,
    number: 'Question 02',
    emoji: '🏥',
    text: 'How big is your operation right now?',
    type: 'options',
    options: [
      { icon: '🧍', label: 'Solo warrior — just me, myself & botox', value: 'Solo warrior' },
      { icon: '👥', label: 'Small but mighty (2–5 staff)',             value: 'Small team (2-5)' },
      { icon: '🏢', label: 'Medium clinic (6–20 staff)',               value: 'Medium clinic (6-20)' },
      { icon: '🗺️', label: 'Multi-location empire',                   value: 'Multi-location' },
    ],
  },
  {
    id: 3,
    number: 'Question 03',
    emoji: '🤕',
    text: 'What keeps you up at 2am? Pick your biggest demon.',
    type: 'options',
    options: [
      { icon: '👻', label: 'No-shows & ghost clients costing me $$$',              value: 'No-shows & cancellations' },
      { icon: '📅', label: 'Scheduling chaos — double bookings, WhatsApp hell',    value: 'Messy bookings' },
      { icon: '📁', label: 'Paper records / scattered patient files',               value: 'Patient records' },
      { icon: '📣', label: 'Not enough new clients coming in',                      value: 'Marketing / getting clients' },
    ],
  },
  {
    id: 4,
    number: 'Question 04',
    text: 'On a scale of "meh" to "I\'m quitting tomorrow" — how bad is it?',
    type: 'slider',
  },
  {
    id: 5,
    number: 'Question 05',
    emoji: '🧰',
    text: 'What are you using to run your clinic right now?',
    type: 'options',
    options: [
      { icon: '📊', label: 'Excel & spreadsheets (classic chaos)',                    value: 'Excel / spreadsheets' },
      { icon: '💻', label: 'Generic booking app not built for aesthetics',            value: 'Generic booking software' },
      { icon: '💬', label: 'WhatsApp + phone + prayer',                               value: 'WhatsApp & notes' },
      { icon: '🤹', label: 'An unholy mix of 5+ different tools',                     value: 'A mix of everything' },
    ],
  },
  {
    id: 6,
    number: 'Question 06',
    emoji: '🗣️',
    text: 'Okay, vent. What\'s the one thing you WISH existed for your clinic?',
    type: 'textarea',
  },
  {
    id: 7,
    number: 'Question 07 — Last one!',
    emoji: '🎉',
    text: 'Where should we send your personalised solution? (No spam, ever.)',
    type: 'contact',
  },
]

export const HERO_CONTENT: Record<number, HeroContent> = {
  1: { titleBefore: "Who's ",       titleEm: 'Running',    titleAfter: ' the Clinic?',     sub: "Tell us your role so we know exactly whose headaches we're solving." },
  2: { titleBefore: 'How Big Is ',  titleEm: 'Your',       titleAfter: ' Empire?',          sub: "From solo warriors to multi-location legends — size matters for the solution." },
  3: { titleBefore: "What's Your ", titleEm: 'Biggest',    titleAfter: ' Pain?',            sub: "The thing that makes you want to flip your desk on a Monday morning." },
  4: { titleBefore: 'How Bad ',     titleEm: 'Does It',    titleAfter: ' Hurt?',            sub: "Slide to express the level of chaos currently in your life. Be honest." },
  5: { titleBefore: 'What Are You ', titleEm: 'Juggling',  titleAfter: ' With?',            sub: "The tools you're stuck with — let's see what mess we're cleaning up." },
  6: { titleBefore: 'Dream It ',    titleEm: 'Out Loud',   titleAfter: '.',                 sub: "If you could wave a magic wand, what would your perfect clinic software do?" },
  7: { titleBefore: 'Almost ',      titleEm: 'There',      titleAfter: '!',                 sub: "Drop your details and we'll send your personalised fix — zero spam, ever." },
}

export const PAIN_LABELS: Record<number, string> = {
  1: 'Barely noticeable',
  2: 'Eh, it happens',
  3: 'A bit annoying',
  4: 'Pretty annoying',
  5: 'Definitely annoying',
  6: 'Very frustrating',
  7: 'Losing sleep over it',
  8: 'Screaming internally',
  9: 'This is fine 🔥',
  10: 'SOMEONE HELP ME',
}

export const FEATURES = [
  'Smart Scheduling', 'Consent Forms', 'Patient CRM',
  'No-show Deposits', 'Before/After Gallery', 'Treatment Notes',
  'Revenue Dashboard', 'WhatsApp Integration',
]
