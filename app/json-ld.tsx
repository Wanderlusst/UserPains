export function OrganizationJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'User Pains',
    description: 'The all-in-one operating system built exclusively for aesthetic clinics. We turn your pain points into features.',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
    sameAs: [
      // Add social media links when available
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'hello@example.com', // Update with actual email
    },
  }
}

export function WebApplicationJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'User Pains',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web',
    description: 'All-in-one operating system for aesthetic clinics. Features include smart scheduling, consent forms, patient CRM, no-show deposits, before/after gallery, treatment notes, revenue dashboard, and WhatsApp integration.',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
      availability: 'https://schema.org/PreOrder',
    },
    featureList: [
      'Smart Scheduling',
      'Consent Forms',
      'Patient CRM',
      'No-show Deposits',
      'Before/After Gallery',
      'Treatment Notes',
      'Revenue Dashboard',
      'WhatsApp Integration',
    ],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
  }
}

export function FAQPageJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is this platform?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This is the all-in-one operating system built exclusively for aesthetic clinics. We help clinics manage scheduling, patient records, consent forms, and more.',
        },
      },
      {
        '@type': 'Question',
        name: 'Who is this for?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This platform is designed for aesthetic clinics, medical spas, and aesthetic practitioners including clinic owners, doctors, nurses, and clinic managers.',
        },
      },
      {
        '@type': 'Question',
        name: 'What features are available?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Features include smart scheduling, consent forms, patient CRM, no-show deposits, before/after gallery, treatment notes, revenue dashboard, and WhatsApp integration.',
        },
      },
      {
        '@type': 'Question',
        name: 'Is this available yet?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'This platform is currently in development. Sign up to get early access and founding member pricing when we launch.',
        },
      },
    ],
  }
}

export function BreadcrumbListJSONLD() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      },
    ],
  }
}
