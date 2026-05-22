export const castles = [
  {
    id: 'versailles',
    name: 'Versailles',
    fullName: 'Château de Versailles',
    region: 'Île-de-France',
    constructed: 1631,
    style: 'French Baroque',
    philosophy: 'Spectacle',
    question: 'Do you crave the intoxication of absolute power — the gilded cage where every mirror reflects your glory?',
    description: 'Originally a humble hunting lodge, transformed by the Sun King into the absolute epicenter of French royal power. A monument to unimaginable luxury and the ultimate expression of absolute monarchy.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Versailles-Chateau-Jardins02.jpg',

    dailyLife: {
      morning: 'You wake at 7:30 in the Chambre du Roi. Sunlight floods through 357 mirrors in the Grande Galerie. A valet draws your curtains. Your day is already choreographed — every gesture is a political act.',
      afternoon: 'Lunch is a spectacle: 30 courses, eaten in public. Courtiers watch you chew. After, you stroll the 800-hectare gardens designed by Le Nôtre — each fountain a statement of your dominion over nature itself.',
      evening: 'Opera at the Royal Chapel, then a masked ball in the Hall of Mirrors. You retire at midnight, but the palace never sleeps. Intrigue hums through 2,300 rooms like electricity.',
    },

    career: {
      title: 'The Path to Versailles',
      paths: [
        { role: 'Sovereign Wealth Fund Director', salary: '€800K–€2M/yr', years: '20+ years in global finance' },
        { role: 'Dynasty Heir / Old Money', salary: 'Inherited capital > €500M', years: 'Born into it' },
        { role: 'Tech Empire Founder (post-exit)', salary: 'Exit > €1B', years: '15–25 years building' },
      ],
      estimatedCost: '€2B+ (national treasure, cannot be purchased — but you can lease wings for €50K/night)',
      reality: 'Versailles is owned by the French Republic. The closest modern equivalent: building your own palace. Budget: €200M minimum for land, construction, and staff of 200+.',
    },

    seedParams: { chaos: 0.8, scaleVariance: 3.0, hue: 45, fontFamily: '"Syne", sans-serif' }
  },
  {
    id: 'chambord',
    name: 'Chambord',
    fullName: 'Château de Chambord',
    region: 'Loire Valley',
    constructed: 1519,
    style: 'French Renaissance',
    philosophy: 'Solitude',
    question: 'Do you seek the silence of a vast forest, where architecture itself becomes a riddle?',
    description: 'A masterpiece of the French Renaissance, born from the dreams of King Francis I. Its distinctive roofline and double-helix staircase suggest the genius of Leonardo da Vinci.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/1/1f/Aerial_image_of_Ch%C3%A2teau_de_Chambord_%28view_from_the_southeast%29.jpg',

    dailyLife: {
      morning: 'Dawn breaks over 5,440 hectares of forest. Deer move through the mist outside your window. You descend the double-helix staircase — designed so two people can traverse it without ever meeting.',
      afternoon: 'You read in the library, surrounded by 440 rooms, most of them empty. The silence is architectural. You ride horses through ancient hunting grounds where François I once pursued wild boar.',
      evening: 'A fire in the grand fireplace — one of 365 in the château. You dine alone, or with one chosen companion. The roofline above you is a forest of towers, a stone skyline for one.',
    },

    career: {
      title: 'The Path to Chambord',
      paths: [
        { role: 'Bestselling Author / Philosopher', salary: '€2M–€10M from royalties', years: '10–20 years of literary output' },
        { role: 'Remote Tech Architect', salary: '€400K–€800K/yr', years: '15 years in distributed systems' },
        { role: 'Vineyard Owner (Bordeaux/Loire)', salary: '€5M–€50M estate value', years: '20+ years building a domaine' },
      ],
      estimatedCost: 'State-owned. Similar Loire Valley châteaux: €2M–€15M. Maintenance: €300K–€1M/yr.',
      reality: 'You can buy a comparable Loire château with 10–50 rooms for €3M–€8M. The real cost is the solitude — are you ready for 440 empty rooms and your own thoughts?',
    },

    seedParams: { chaos: 0.5, scaleVariance: 2.0, hue: 210, fontFamily: '"Cinzel", serif' }
  },
  {
    id: 'chenonceau',
    name: 'Chenonceau',
    fullName: 'Château de Chenonceau',
    region: 'Loire Valley',
    constructed: 1514,
    style: 'Renaissance / Gothic',
    philosophy: 'Grace',
    question: 'Do you dream of a life suspended between earth and water — shaped not by kings but by the women who outlasted them?',
    description: 'Known as the "Château des Dames." Gracefully spanning the River Cher, it was shaped by powerful women including Diane de Poitiers and Catherine de\' Medici.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Chateau_de_Chenonceau_2008E_%28adjusted2%29.jpg',

    dailyLife: {
      morning: 'You wake to the sound of the River Cher flowing beneath your bedroom. Light ripples on the ceiling — reflections from the water below. You tend the garden Diane de Poitiers designed 500 years ago.',
      afternoon: 'You host a small salon of artists and thinkers in the Grande Galerie — the longest room built over water in Europe. Conversation drifts like the river. You serve wine from the château\'s own vines.',
      evening: 'Candlelight dinner in the intimate dining room. The bridge below glows in the dusk. You walk the gardens at twilight, where Catherine de\' Medici once plotted the future of France.',
    },

    career: {
      title: 'The Path to Chenonceau',
      paths: [
        { role: 'Art World Maven / Gallery Owner', salary: '€1M–€5M/yr', years: '15 years building cultural capital' },
        { role: 'Luxury Brand Creative Director', salary: '€500K–€1.5M/yr', years: '12–18 years in fashion/design' },
        { role: 'Diplomatic / Cultural Attaché', salary: '€200K + residence benefits', years: '20 years in international relations' },
      ],
      estimatedCost: 'Privately owned (Menier family). Similar river châteaux: €5M–€20M.',
      reality: 'Chenonceau is the most-visited private château in France. To live this life, find a waterside château in the Loire — budget €4M–€12M. Staff of 8–15 for gardens and upkeep.',
    },

    seedParams: { chaos: 0.3, scaleVariance: 1.5, hue: 320, fontFamily: '"Cormorant Garamond", serif' }
  },
  {
    id: 'fontainebleau',
    name: 'Fontainebleau',
    fullName: 'Château de Fontainebleau',
    region: 'Île-de-France',
    constructed: 1137,
    style: 'Renaissance / Classical',
    philosophy: 'Endurance',
    question: 'Do you long for continuity — to inhabit a place that has witnessed every revolution, every empire, every collapse, and still stands?',
    description: 'The true home of French kings, continuously inhabited for eight centuries. Napoleon called it "the true home of kings, the house of ages." Its sprawling, organic architecture tells the entire history of France in stone.',
    image: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Ch%C3%A2teau_de_Fontainebleau_%28Fontainebleau%29_edited_%281%29.jpg',

    dailyLife: {
      morning: 'You walk through rooms where every French monarch from Louis VII to Napoleon III has slept. Each corridor is a different century. Your morning coffee is in a room that was medieval, then Renaissance, then Baroque — all at once.',
      afternoon: 'You study in Napoleon\'s private library — 16,000 volumes he personally selected. The forest of Fontainebleau, 25,000 hectares, is your backyard. You climb the same sandstone boulders artists have climbed since the Barbizon School.',
      evening: 'Dinner in a room where Napoleon signed his abdication. The weight of history is literal here — 1,500 rooms accumulated over 800 years. You don\'t own this place. It owns you.',
    },

    career: {
      title: 'The Path to Fontainebleau',
      paths: [
        { role: 'INSEAD Professor / Business School Dean', salary: '€300K–€700K/yr', years: 'INSEAD is located in Fontainebleau' },
        { role: 'Heritage Foundation Director', salary: '€150K–€400K + prestige', years: '20 years in cultural preservation' },
        { role: 'Multi-generational Family Office', salary: 'Family capital > €100M', years: '3+ generations of stewardship' },
      ],
      estimatedCost: 'State-owned. Regional equivalent châteaux: €1.5M–€8M.',
      reality: 'The Fontainebleau life is about accumulation over time, not a single purchase. Buy a nearby château for €2M–€5M, then spend decades making it yours — layer by layer, generation by generation.',
    },

    seedParams: { chaos: 0.9, scaleVariance: 4.0, hue: 15, fontFamily: '"Syne", sans-serif' }
  }
];
