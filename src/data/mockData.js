export const syllabusNodes = [
  {
    id: 'sus-eng',
    title: 'Sustainable Engineering & Renewable Energy Systems',
    university: 'TU Delft (Netherlands)',
    description: 'Design of sustainable energy systems, wind turbine aerodynamics, and smart grids.',
    tags: ['environment', 'engineering', 'sustainability', 'energy', 'climate change'],
    baseCost: 2300, // EUR per year for EU, maybe 16000 for non-EU. Let's say 16000 for intl.
    currency: 'EUR',
    country: 'Netherlands'
  },
  {
    id: 'ai-ethics',
    title: 'Artificial Intelligence, Ethics & Society',
    university: 'University of Oxford (UK)',
    description: 'Philosophical and societal implications of autonomous systems, algorithmic bias, and AI governance.',
    tags: ['ai', 'philosophy', 'ethics', 'society', 'technology policy'],
    baseCost: 30000,
    currency: 'GBP',
    country: 'UK'
  },
  {
    id: 'global-health',
    title: 'Global Health and Epidemiology',
    university: 'Johns Hopkins University (USA)',
    description: 'Infectious disease tracking, global health disparities, and public health interventions in developing nations.',
    tags: ['health', 'medicine', 'global', 'epidemiology', 'public policy', 'developing countries'],
    baseCost: 60000,
    currency: 'USD',
    country: 'USA'
  },
  {
    id: 'hci-design',
    title: 'Human-Computer Interaction & Spatial Computing',
    university: 'Stanford University (USA)',
    description: 'AR/VR interfaces, tangible computing, and cognitive psychology in user experience design.',
    tags: ['design', 'hci', 'technology', 'vr', 'ar', 'psychology', 'user experience'],
    baseCost: 58000,
    currency: 'USD',
    country: 'USA'
  },
  {
    id: 'urban-planning',
    title: 'Smart Cities and Urban Analytics',
    university: 'National University of Singapore (Singapore)',
    description: 'Data-driven urban planning, sustainable transport systems, and urban resilience.',
    tags: ['urban', 'cities', 'sustainability', 'data', 'transportation', 'architecture'],
    baseCost: 20000,
    currency: 'SGD',
    country: 'Singapore'
  }
];

export const careerNodes = [
  {
    id: 'c-sus-consultant',
    title: 'Sustainability Consultant',
    company: 'McKinsey & Company (London)',
    salaryStart: 85000,
    salaryMid: 150000,
    currency: 'GBP',
    description: 'Advising multinational corporations on carbon neutrality and sustainable supply chains.',
    matches: ['sus-eng', 'urban-planning']
  },
  {
    id: 'c-ai-policy',
    title: 'AI Policy Advisor',
    company: 'United Nations / UNESCO (Paris)',
    salaryStart: 70000,
    salaryMid: 120000,
    currency: 'EUR',
    description: 'Drafting international frameworks for the ethical deployment of artificial general intelligence.',
    matches: ['ai-ethics', 'global-health']
  },
  {
    id: 'c-vr-engineer',
    title: 'Spatial Computing UX Engineer',
    company: 'Apple (Cupertino)',
    salaryStart: 130000,
    salaryMid: 250000,
    currency: 'USD',
    description: 'Designing next-generation immersive interfaces for mixed reality platforms.',
    matches: ['hci-design']
  },
  {
    id: 'c-epidemiologist',
    title: 'Field Epidemiologist',
    company: 'World Health Organization (Geneva)',
    salaryStart: 80000,
    salaryMid: 140000,
    currency: 'CHF',
    description: 'Leading outbreak response teams and designing predictive disease models.',
    matches: ['global-health']
  }
];
