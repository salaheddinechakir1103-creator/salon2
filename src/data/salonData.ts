// Bundle local images through Vite to generate production-safe URLs.
const bundledImages = import.meta.glob('/src/assets/images/*', { eager: true, query: '?url', import: 'default' }) as Record<string, string>;
const resolveImage = (path: string): string => bundledImages[path] ?? path;

export interface ServiceItem {
  id: string;
  category: 'coiffure' | 'visage' | 'onglerie' | 'maquillage' | 'hammam';
  title: string;
  subtitle: string;
  description: string;
  duration: string;
  priceMAD: number;
  priceEUR: number;
  image: string;
  features: string[];
  popular?: boolean;
}

export interface SanctuaryLocation {
  id: string;
  city: string;
  neighborhood: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  features: string[];
  note: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'coiffure' | 'visage' | 'onglerie' | 'hammam';
  image: string;
  aspect: '4:3' | '3:4';
  caption: string;
}

export const SALON_DATA = {
  brand: {
    name: 'MAISON ÉCLAT',
    tagline: "L'art de révéler votre éclat naturel",
    subheading: "L'harmonie lumineuse de la haute coiffure contemporaine et des rituels botaniques d'exception au Maroc.",
    description: "Salons baignés de lumière naturelle au cœur de Casablanca, Marrakech et Rabat. Miroirs en arche d'or, marbre blanc de Carrare et artisans stylistes dédiés à votre métamorphose.",
  },

  cities: ['Casablanca · Gauthier & Triangle d’Or', 'Marrakech · L’Hivernage', 'Rabat · Souissi'],

  signatureServices: [
    {
      id: 'coiffure-couture',
      category: 'coiffure' as const,
      title: 'Haute Coiffure & Balayage Solaire',
      subtitle: 'Coupe architecturale & reflets dorés',
      description: 'Diagnostic morphologique personnalisé face à nos miroirs en arche, coupe personnalisée et balayage aux reflets champagne infusé d’huile d’argan pure bio du Souss.',
      duration: '90 - 150 min',
      priceMAD: 650,
      priceEUR: 60,
      image: resolveImage('/src/assets/images/luminous_bridal_hair_1792400243018.jpg'),
      features: [
        'Diagnostic trichologique haute précision',
        'Bain d’huiles précieuses chauffé à la vapeur',
        'Coupe & coiffage signature sur-mesure',
        'Brushing brushing gloss longue durée'
      ],
      popular: true,
    },
    {
      id: 'soins-botanique',
      category: 'visage' as const,
      title: 'Soin Visage Éclat Royal au Néroli',
      subtitle: 'Drainage lymphatique & infusion botanique',
      description: 'Rituel hydratant et raffermissant unissant l’eau de fleur d’oranger distillée de Khémisset, le figuier de Barbarie sauvage et le modelage kobido liftant.',
      duration: '75 min',
      priceMAD: 850,
      priceEUR: 80,
      image: resolveImage('/src/assets/images/luminous_facial_treatment_1792400243593.jpg'),
      features: [
        'Double nettoyage aux hydrolats botaniques',
        'Exfoliation douce aux enzymes de grenade',
        'Massage facial liftant inspiré du kobido',
        'Masque hydrogel aux pépins de figue de barbarie'
      ],
      popular: true,
    },
    {
      id: 'onglerie-couture',
      category: 'onglerie' as const,
      title: 'Haute Manucure sur Travertin & Liseré d’Or',
      subtitle: 'Soin des mains & art minéral',
      description: 'Limage millimétré, bain émollient aux pétales de rose de Kelaat M’gouna, gommage doux au sucre roux et pose de vernis demi-permanent ou liseré feuille d’or 24 carats.',
      duration: '60 min',
      priceMAD: 450,
      priceEUR: 42,
      image: resolveImage('/src/assets/images/luminous_manicure_luxury_1792400243470.jpg'),
      features: [
        'Bain de roses et d’argan tiède',
        'Soin des cuticules à la cire d’abeille naturelle',
        'Modelage réflexologique des mains et poignets',
        'Finition liseré haute précision au choix'
      ],
    },
    {
      id: 'hammam-sanctuaire',
      category: 'hammam' as const,
      title: 'Hammam Privatif & Cérémonie d’Ambre',
      subtitle: 'Sanctuaire de vapeur & gommage au savon noir',
      description: 'Immersion dans notre hammam en tadelakt chamois. Savon noir à l’eucalyptus, gommage délicat à la kessa de soie, enveloppement au rhassoul de l’Atlas et onction de néroli.',
      duration: '90 min',
      priceMAD: 950,
      priceEUR: 90,
      image: resolveImage('/src/assets/images/salon_hammam_ritual_1792364726835.jpg'),
      features: [
        'Suite de hammam 100% privative',
        'Savon noir artisanal aux huiles essentielles',
        'Enveloppement au rhassoul enrichi aux sept plantes',
        'Dégustation de thé à la menthe et douceurs à la fleur d’oranger'
      ],
      popular: true,
    },
    {
      id: 'mariee-imperiale',
      category: 'maquillage' as const,
      title: 'Forfait Cérémonie Mariée Impériale',
      subtitle: 'Haute mise en beauté & rituels traditionnels',
      description: 'L’expérience nuptiale ultime : hammam royal au lait d’amande et roses fraîches, soin éclat visage Kobido, haute coiffure sculpturale et maquillage couture longue tenue.',
      duration: '4h30 (Jour J ou veille)',
      priceMAD: 3500,
      priceEUR: 330,
      image: resolveImage('/src/assets/images/salon_bridal_couture_1792365278992.jpg'),
      features: [
        'Hammam royal privatisé avec bain de roses et lait d’amande',
        'Soin éclat visage à la figue de barbarie & kobido liftant',
        'Haute coiffure couture & pose experte des parures et diadème',
        'Maquillage grand teint résistant aux projecteurs et larmes d’émotion',
        'Suite nuptiale privatisée avec champagne sans alcool et mignardises'
      ],
      popular: true,
    },
  ],

  fullMenu: [
    {
      id: 'm-coif-1',
      category: 'coiffure' as const,
      title: 'Coupe & Brushing Haute Couture',
      description: 'Diagnostic personnalisé, rituel shampooing aux huiles nobles, coupe stylisée et coiffage sculptural.',
      duration: '60 min',
      priceMAD: 450,
      priceEUR: 42,
    },
    {
      id: 'm-coif-2',
      category: 'coiffure' as const,
      title: 'Balayage Solaire & Glaçage Gloss',
      description: 'Éclaircissement délicat mèche à mèche pour un fondu naturel doré, suivi d’un vernis brillance miroir.',
      duration: '120 min',
      priceMAD: 950,
      priceEUR: 90,
    },
    {
      id: 'm-coif-3',
      category: 'coiffure' as const,
      title: 'Soin Botox Capillaire & Kératine Végétale',
      description: 'Régénération profonde de la fibre capillaire fatiguée, souplesse immédiate et élimination des frisottis.',
      duration: '90 min',
      priceMAD: 1100,
      priceEUR: 105,
    },
    {
      id: 'm-vis-1',
      category: 'visage' as const,
      title: 'Rituel Détox & Pureté Minérale',
      description: 'Purification en profondeur aux argiles vertes du Rif, extraction douce et resserrement des pores aux eaux florales.',
      duration: '60 min',
      priceMAD: 650,
      priceEUR: 60,
    },
    {
      id: 'm-vis-2',
      category: 'visage' as const,
      title: 'Grand Soin Anti-Âge Figue de Barbarie',
      description: 'Sérum ultra-concentré en oméga 6 & 9, gymnastique faciale et électro-stimulation douce pour un galbe lifté.',
      duration: '90 min',
      priceMAD: 1200,
      priceEUR: 115,
    },
    {
      id: 'm-ong-1',
      category: 'onglerie' as const,
      title: 'Manucure Russe & Vernis Semi-Permanent',
      description: 'Travail millimétré des cuticules, renforcement kératine et couleur haute pigmentation tenue 3 semaines.',
      duration: '75 min',
      priceMAD: 550,
      priceEUR: 52,
    },
    {
      id: 'm-ong-2',
      category: 'onglerie' as const,
      title: 'Pédicure Spa Éclat & Réflexologie',
      description: 'Bain bouillonnant aux sels d’Epsom et verveine, gommage pierre ponce, modelage des voûtes plantaires.',
      duration: '60 min',
      priceMAD: 500,
      priceEUR: 48,
    },
    {
      id: 'm-spa-1',
      category: 'hammam' as const,
      title: 'Cérémonie Berbère Traditionnelle',
      description: 'Vapeur parfumée à l’eucalyptus sauvage, savonnage noir, gommage vigoureux au gant kessa et rinçage à l’eau de rose.',
      duration: '60 min',
      priceMAD: 600,
      priceEUR: 58,
    },
    {
      id: 'm-spa-2',
      category: 'hammam' as const,
      title: 'Rituel Somptueux Éclat d’Or (Duo ou Solo)',
      description: 'Accès exclusif à la suite spa, gommage à la poudre d’or et ambre précieux, massage relaxant 50 min.',
      duration: '120 min',
      priceMAD: 1800,
      priceEUR: 170,
    },
  ],

  gallery: [
    {
      id: 'gal-1',
      title: 'Le Salon Principal Baigné de Soleil',
      category: 'coiffure' as const,
      image: resolveImage('/src/assets/images/luminous_salon_station_1792400241745.jpg'),
      aspect: '4:3' as const,
      caption: 'Miroirs en arche d’or et marbre blanc sous la lumière naturelle de Casablanca.',
    },
    {
      id: 'gal-2',
      title: 'Coiffure de Mariée en Salon Privatif',
      category: 'coiffure' as const,
      image: resolveImage('/src/assets/images/luminous_bridal_hair_1792400243018.jpg'),
      aspect: '4:3' as const,
      caption: 'Travail expert de boucles soyeuses et préparation nuptiale.',
    },
    {
      id: 'gal-3',
      title: 'Soin Kobido & Drainage Visage',
      category: 'visage' as const,
      image: resolveImage('/src/assets/images/luminous_facial_treatment_1792400243593.jpg'),
      aspect: '4:3' as const,
      caption: 'Élixir de figue de barbarie et néroli sur socle de travertin.',
    },
    {
      id: 'gal-4',
      title: 'Haute Manucure & Liseré Doré',
      category: 'onglerie' as const,
      image: resolveImage('/src/assets/images/luminous_manicure_luxury_1792400243470.jpg'),
      aspect: '4:3' as const,
      caption: 'Liseré feuille d’or sur lin brut et pierre naturelle.',
    },
    {
      id: 'gal-5',
      title: 'Sanctuaire de Hammam en Tadelakt',
      category: 'hammam' as const,
      image: resolveImage('/src/assets/images/salon_hammam_ritual_1792364726835.jpg'),
      aspect: '3:4' as const,
      caption: 'Bassin d’eau chaude, vapeur parfumée et ambre.',
    },
    {
      id: 'gal-6',
      title: 'Cérémonie Nuptiale Haute Couture',
      category: 'coiffure' as const,
      image: resolveImage('/src/assets/images/salon_bridal_couture_1792365278992.jpg'),
      aspect: '4:3' as const,
      caption: 'Parure royale et coiffure de mariée d’exception.',
    },
  ],

  sanctuaries: [
    {
      id: 'casablanca',
      city: 'Casablanca',
      neighborhood: 'Triangle d’Or — Gauthier',
      address: 'Angle Boulevard Moulay Youssef & Rue d’Ifrane',
      phone: '+212 5 22 98 44 10',
      email: 'casablanca@maison-eclat.ma',
      hours: 'Mardi — Dimanche : 10h00 - 20h00 (Fermé Lundi)',
      features: ['Service voiturier privé', 'Postes de coiffure privatifs', 'Bar à thés bio et jus détox'],
      note: 'Démonstration conceptuelle — Adresse fictive de portfolio',
    },
    {
      id: 'marrakech',
      city: 'Marrakech',
      neighborhood: 'L’Hivernage',
      address: 'Avenue Echouhada, Résidence Les Jardins d’Émeraude',
      phone: '+212 5 24 43 18 20',
      email: 'marrakech@maison-eclat.ma',
      hours: 'Mardi — Dimanche : 11h00 - 21h00 (Fermé Lundi)',
      features: ['Jardin d’orangers privatif', 'Hammam royal marbré', 'Cabine de massage en plein air'],
      note: 'Démonstration conceptuelle — Adresse fictive de portfolio',
    },
    {
      id: 'rabat',
      city: 'Rabat',
      neighborhood: 'Souissi',
      address: 'Avenue Mohammed VI, Allée des Ambassades',
      phone: '+212 5 37 75 90 30',
      email: 'rabat@maison-eclat.ma',
      hours: 'Mardi — Dimanche : 10h00 - 20h00 (Fermé Lundi)',
      features: ['Espace haute coiffure feutré', 'Parking sécurisé réservé', 'Consultation trichologique'],
      note: 'Démonstration conceptuelle — Adresse fictive de portfolio',
    },
  ],

  testimonials: [
    {
      id: 'test-1',
      name: 'Salma Benjelloun',
      role: 'Directrice de Création & Styliste',
      city: 'Casablanca',
      quote: "Une atmosphère baignée de lumière et d'une sérénité absolue. Les miroirs en arche et le balayage ont illuminé mes cheveux avec un naturel époustouflant.",
      ritual: 'Soin Visage Éclat Royal & Balayage Couture',
    },
    {
      id: 'test-2',
      name: 'Kenzi Alaoui',
      role: 'Architecte d’Intérieur',
      city: 'Marrakech',
      quote: "L'architecture lumineuse du salon, les arches dorées et la précision millimétrée de l'onglerie font de Maison Éclat mon sanctuaire favori.",
      ritual: 'Hammam Privatif & Manucure Or Fin',
    },
    {
      id: 'test-3',
      name: 'Camille de Montmirail',
      role: 'Chroniqueuse Lifestyle & Voyage',
      city: 'Paris & Rabat',
      quote: "Le mariage entre le savoir-faire ancestral marocain et l'élégance de la haute coiffure moderne est une réussite totale.",
      ritual: 'Cérémonie Somptueuse Éclat d’Or',
    },
  ],

  faqs: [
    {
      q: 'Comment s’effectue la prise de rendez-vous ?',
      a: 'Pour vous garantir une disponibilité immédiate et un accueil personnalisé, vos demandes peuvent être transmises en ligne via notre formulaire ou instantanément par WhatsApp avec notre conciergerie privée.',
    },
    {
      q: 'Les produits utilisés sont-ils naturels et d’origine marocaine ?',
      a: 'Oui. Nos huiles d’argan, de figue de barbarie et nos eaux florales de néroli proviennent de coopératives féminines partenaires certifiées biologiques situées à Taroudant et Kelaat M’gouna.',
    },
    {
      q: 'Puis-je privatiser un espace ou le hammam pour un événement privé ?',
      a: 'Absolument. Nos suites de soins et hammams privatifs peuvent être réservés en exclusivité pour les préparatifs de mariées, enterrements de vie de jeune fille de prestige ou sessions de détente intimes.',
    },
    {
      q: 'Quelle est la politique d’annulation ou de modification ?',
      a: 'Afin de respecter le planning de nos maîtres artisans, toute modification ou annulation doit être communiquée au moins 24 heures avant l’heure prévue de votre rituel.',
    },
  ],
};
