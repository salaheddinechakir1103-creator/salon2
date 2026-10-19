export type Language = 'fr' | 'ar';

export interface TranslationSchema {
  nav: {
    rituals: string;
    transformation: string;
    bridal: string;
    diagnostic: string;
    gallery: string;
    pricing: string;
    sanctuaries: string;
    book: string;
    call: string;
    soundOn: string;
    soundOff: string;
  };
  hero: {
    kicker: string;
    headlineStart: string;
    headlineHighlight: string;
    headlineEnd: string;
    subheading: string;
    ctaPrimary: string;
    ctaSecondary: string;
    stat1Title: string;
    stat1Desc: string;
    stat2Title: string;
    stat2Desc: string;
    stat3Title: string;
    stat3Desc: string;
    stripBrand: string;
    stripDesc: string;
    cities: string;
  };
  station3D: {
    tag: string;
    title: string;
    desc: string;
    lightAmbiance: string;
    daylight: string;
    golden: string;
    evening: string;
    chairFinish: string;
    caramel: string;
    ivory: string;
    terracotta: string;
    noir: string;
    auto: string;
    free: string;
    takeSeat: string;
    perspectives: string;
    viewOverview: string;
    viewMirror: string;
    viewChair: string;
    toggleShow: string;
    toggleHide: string;
  };
  services: {
    kicker: string;
    title: string;
    filterAll: string;
    filterCoiffure: string;
    filterVisage: string;
    filterOnglerie: string;
    filterHammam: string;
    fromPrice: string;
    bookRitual: string;
  };
  transformation: {
    kicker: string;
    title: string;
    desc: string;
    metric1Label: string;
    metric1Value: string;
    metric2Label: string;
    metric2Value: string;
    metric3Label: string;
    metric3Value: string;
    cta: string;
    badgeLeft: string;
    badgeRight: string;
    dragHint: string;
  };
  bridal: {
    kicker: string;
    title: string;
    desc: string;
    floatingTag: string;
    floatingDesc: string;
    ctaQuote: string;
    ctaWhatsapp: string;
    features: string[];
  };
  diagnostic: {
    kicker: string;
    title: string;
    desc: string;
    step1: string;
    step2: string;
    step3: string;
    step1Question: string;
    step2Question: string;
    step3Question: string;
    back: string;
    generate: string;
    restart: string;
    prescriptionTag: string;
    ingredientsTitle: string;
    recSanctuary: string;
    estDuration: string;
    refPrice: string;
    bookWhatsapp: string;
    confirmOnline: string;
  };
  about: {
    kicker: string;
    title: string;
    desc1: string;
    desc2: string;
    photoTag: string;
    photoDesc: string;
    p1Title: string;
    p1Desc: string;
    p2Title: string;
    p2Desc: string;
    p3Title: string;
    p3Desc: string;
  };
  gallery: {
    kicker: string;
    title: string;
    filterAll: string;
    filterCoiffure: string;
    filterVisage: string;
    filterOnglerie: string;
    filterHammam: string;
    closeView: string;
    prevImg: string;
    nextImg: string;
    items: Array<{
      id: string;
      title: string;
      categoryLabel: string;
      caption: string;
    }>;
  };
  pricing: {
    kicker: string;
    title: string;
    desc: string;
    filterAll: string;
    filterCoiffure: string;
    filterVisage: string;
    filterOnglerie: string;
    filterHammam: string;
    choose: string;
    approxEur: string;
    demoNote: string;
    items: Array<{
      id: string;
      title: string;
      category: 'coiffure' | 'visage' | 'onglerie' | 'hammam';
      description: string;
      duration: string;
      priceMAD: number;
      priceEUR: number;
    }>;
  };
  booking: {
    kicker: string;
    title: string;
    desc: string;
    labelSalon: string;
    labelRitual: string;
    labelDate: string;
    labelSlot: string;
    labelName: string;
    labelPhone: string;
    labelEmail: string;
    labelNotes: string;
    placeholderName: string;
    placeholderPhone: string;
    placeholderEmail: string;
    placeholderNotes: string;
    btnWhatsapp: string;
    btnOnline: string;
    errorRequired: string;
    successTag: string;
    successTitle: string;
    successDesc: string;
    recapSalon: string;
    recapRitual: string;
    recapDateTime: string;
    recapContact: string;
    successDemo: string;
    btnNewSimulation: string;
  };
  testimonials: {
    kicker: string;
    title: string;
    demoNotice: string;
    items: Array<{
      id: string;
      name: string;
      role: string;
      city: string;
      quote: string;
      ritual: string;
    }>;
  };
  sanctuaries: {
    kicker: string;
    title: string;
    desc: string;
    faqKicker: string;
    faqTitle: string;
    locations: Array<{
      id: string;
      city: string;
      neighborhood: string;
      address: string;
      phone: string;
      email: string;
      hours: string;
      features: string[];
      note: string;
    }>;
    faqs: Array<{
      q: string;
      a: string;
    }>;
  };
  footer: {
    brandDesc: string;
    exploreTitle: string;
    gazetteTitle: string;
    gazetteDesc: string;
    gazettePlaceholder: string;
    gazetteSuccess: string;
    conciergeNote: string;
    rights: string;
    conceptBadge: string;
    demoNote: string;
  };
  modal: {
    title: string;
    subtitle: string;
    labelSalon: string;
    labelRitual: string;
    labelDate: string;
    labelTime: string;
    labelName: string;
    labelPhone: string;
    placeholderName: string;
    placeholderPhone: string;
    btnWhatsapp: string;
    btnConfirm: string;
    btnClose: string;
    errorRequired: string;
    successTag: string;
    successGreeting: string;
    successRef: string;
    demoNotice: string;
  };
  concierge: {
    onlineName: string;
    onlineStatus: string;
    salonSubtitle: string;
    welcomeMsg: string;
    quickInquiries: Array<{
      label: string;
      question: string;
      reply: string;
    }>;
    inputPlaceholder: string;
    btnSend: string;
    btnWhatsapp: string;
    discretionNote: string;
  };
}

export const TRANSLATIONS: Record<Language, TranslationSchema> = {
  fr: {
    nav: {
      rituals: 'Rituels',
      transformation: 'Métamorphose',
      bridal: 'Mariée',
      diagnostic: 'Diagnostic',
      gallery: 'Galerie',
      pricing: 'Tarifs',
      sanctuaries: 'Salons',
      book: 'Réserver',
      call: 'Conciergerie',
      soundOn: 'Son actif',
      soundOff: 'Son coupé',
    },
    hero: {
      kicker: 'Haute Beauté & Coiffure Marocaine',
      headlineStart: 'L’art de révéler votre ',
      headlineHighlight: 'éclat',
      headlineEnd: ' naturel.',
      subheading: 'L’harmonie lumineuse de la haute coiffure contemporaine et des rituels botaniques d’exception au Maroc. Salons baignés de lumière naturelle, miroirs en arche d’or et rituels personnalisés d’huile d’argan et de néroli.',
      ctaPrimary: 'Prendre Rendez-vous',
      ctaSecondary: 'Explorer la Carte',
      stat1Title: '100% Bio',
      stat1Desc: 'Argan du Souss & Néroli',
      stat2Title: '3 Salons',
      stat2Desc: 'Casa · Kech · Rabat',
      stat3Title: 'Sur-Mesure',
      stat3Desc: 'Postes 100% privatifs',
      stripBrand: 'Maison Éclat Maroc',
      stripDesc: '— Espaces de Haute Coiffure & Rituels Botaniques',
      cities: 'Casablanca · Gauthier · Marrakech · Hivernage · Rabat · Souissi',
    },
    station3D: {
      tag: 'Le Poste de Coiffure Privatif 3D',
      title: 'Miroir Arceau & Marbre Blanc',
      desc: 'Miroir rétroéclairé or brossé, marbre Calacatta Gold et fauteuil couture en cuir naturel.',
      lightAmbiance: 'Ambiance Lumineuse',
      daylight: 'Lumière du Jour',
      golden: 'Studio Doré',
      evening: 'Soirée Privée',
      chairFinish: 'Finition Fauteuil',
      caramel: 'Caramel',
      ivory: 'Bouclé Ivoire',
      terracotta: 'Terracotta',
      noir: 'Noir',
      auto: 'Auto',
      free: 'Libre',
      takeSeat: 'Prendre Siège',
      perspectives: 'Perspective de la cabine :',
      viewOverview: 'Vue d’Ensemble',
      viewMirror: 'Miroir & Outils',
      viewChair: 'Fauteuil Couture',
      toggleShow: 'Personnaliser l’Espace 3D',
      toggleHide: 'Masquer l’atelier',
    },
    services: {
      kicker: '01. Savoir-Faire Signature',
      title: 'Les Rituels d’Exception',
      filterAll: 'Tous les Rituels',
      filterCoiffure: 'Haute Coiffure',
      filterVisage: 'Soins Visage',
      filterOnglerie: 'Onglerie',
      filterHammam: 'Hammam Privatif',
      fromPrice: 'À partir de',
      bookRitual: 'Réserver ce rituel',
    },
    transformation: {
      kicker: 'Métamorphose & Brillance',
      title: 'Le Glaçage Gloss & Balayage Solaire',
      desc: 'Glissez le curseur pour observer la métamorphose de la matière sous la lumière naturelle. Notre formule exclusive infuse chaque écaille de kératine végétale et d’huile d’argan bio pour capturer la clarté du jour.',
      metric1Label: 'Luminosité réflective :',
      metric1Value: '+185% d’indice miroir',
      metric2Label: 'Nutrition & souplesse :',
      metric2Value: 'Huile d’argan du Souss',
      metric3Label: 'Tenue du coiffage :',
      metric3Value: 'Jusqu’à 6 semaines',
      cta: 'Réserver ce protocole brillance',
      badgeLeft: 'Glaçage Miroir Infusé',
      badgeRight: 'Mouvement & Volume en Salon',
      dragHint: '← Glissez horizontalement pour comparer la brillance et la texture →',
    },
    bridal: {
      kicker: 'Forfait Signature Nuptiale',
      title: 'La Cérémonie de la Mariée Impériale',
      desc: 'Le mariage marocain est une fête de grâce et d’émotion. Maison Éclat consacre une suite nuptiale entièrement privatisée pour la mariée et ses proches, guidée par nos directeurs artistiques coiffure et nos maîtres maquilleurs.',
      floatingTag: 'Haute Cérémonie Nuptiale',
      floatingDesc: 'L’hommage sublime à la beauté royale de la mariée marocaine.',
      ctaQuote: 'Solliciter un devis mariée',
      ctaWhatsapp: 'Concierge Mariée WhatsApp',
      features: [
        'Essai coiffure & maquillage 15 jours avant la cérémonie',
        'Hammam royal au lait d’amande, pétales de rose et savon d’ambre',
        'Grand soin visage Kobido liftant et masque hydrogel régénérant',
        'Haute coiffure sculpturale adaptée au port du caftan et des diadèmes',
        'Maquillage grand teint résistant aux projecteurs et larmes d’émotion',
        'Pose experte des parures, broches de tête et du voile nuptial',
      ],
    },
    diagnostic: {
      kicker: 'Consultation Interactive',
      title: 'Diagnostic Beauté Sur-Mesure',
      desc: 'En 3 étapes discrètes, nos maîtres artisans conçoivent la formule et le rituel personnalisés selon vos attentes immédiates.',
      step1: '01. Domaine de Soin',
      step2: '02. Objectif Éclat',
      step3: '03. Salon',
      step1Question: 'Quel rituel souhaitez-vous explorer aujourd’hui ?',
      step2Question: 'Quel est votre objectif prioritaire ?',
      step3Question: 'Dans quel salon souhaitez-vous vivre l’expérience ?',
      back: '← Étape précédente',
      generate: 'Générer ma Prescription',
      restart: 'Recommencer',
      prescriptionTag: 'Prescription Personnalisée',
      ingredientsTitle: 'Formulation & Ingrédients Nobles',
      recSanctuary: 'Salon recommandé :',
      estDuration: 'Durée estimée :',
      refPrice: 'Tarif de référence :',
      bookWhatsapp: 'Réserver sur WhatsApp',
      confirmOnline: 'Confirmer la demande',
    },
    about: {
      kicker: '02. L’Esprit Maison',
      title: 'Une rencontre sacrée entre haute école de coiffure et terroirs du Maroc.',
      desc1: 'Maison Éclat réinvente l’expérience du salon de coiffure au Maroc. Nous avons banni les espaces sombres et confinés pour créer de véritables sanctuaires baignés de lumière naturelle, où chaque cliente dispose d’une suite ou d’un poste privatif.',
      desc2: 'Toutes nos huiles d’argan sont pressées à froid par des coopératives féminines partenaires dans le Souss. Nos eaux de néroli sont distillées à l’aube à Khémisset, apportant une pureté absolue à vos rituels capillaires et soins visage.',
      photoTag: 'Architecture & Lumière',
      photoDesc: 'Miroirs en arche dorée, marbre blanc et lumière naturelle traversante à Casablanca.',
      p1Title: 'Alchimie Botanique',
      p1Desc: 'Élixirs 100% purs formulés minute devant vous sur marbre blanc.',
      p2Title: 'Maîtrise Couture',
      p2Desc: 'Artisans stylistes et coloristes diplômés des grandes académies.',
      p3Title: 'Postes Privatifs',
      p3Desc: 'Intimité totale face à votre miroir personnel sans vis-à-vis.',
    },
    gallery: {
      kicker: '03. Portfolio & Cérémonies',
      title: 'Galerie des Salons',
      filterAll: 'Tous',
      filterCoiffure: 'Coiffure & Balayage',
      filterVisage: 'Soins Visage',
      filterOnglerie: 'Onglerie',
      filterHammam: 'Hammam Privatif',
      closeView: 'Fermer la vue agrandie',
      prevImg: 'Image précédente',
      nextImg: 'Image suivante',
      items: [
        {
          id: 'gal-1',
          title: 'Le Salon Principal Baigné de Soleil',
          categoryLabel: 'Coiffure',
          caption: 'Miroirs en arche d’or et marbre blanc sous la lumière naturelle de Casablanca.',
        },
        {
          id: 'gal-2',
          title: 'Coiffure de Mariée en Salon Privatif',
          categoryLabel: 'Mariée',
          caption: 'Travail expert de boucles soyeuses et préparation nuptiale.',
        },
        {
          id: 'gal-3',
          title: 'Soin Kobido & Drainage Visage',
          categoryLabel: 'Visage',
          caption: 'Élixir de figue de barbarie et néroli sur socle de travertin.',
        },
        {
          id: 'gal-4',
          title: 'Haute Manucure & Liseré Doré',
          categoryLabel: 'Onglerie',
          caption: 'Liseré feuille d’or sur lin brut et pierre naturelle.',
        },
        {
          id: 'gal-5',
          title: 'Sanctuaire de Hammam en Tadelakt',
          categoryLabel: 'Hammam',
          caption: 'Bassin d’eau chaude, vapeur parfumée et ambre.',
        },
        {
          id: 'gal-6',
          title: 'Cérémonie Nuptiale Haute Couture',
          categoryLabel: 'Cérémonie',
          caption: 'Parure royale et coiffure de mariée d’exception.',
        },
      ],
    },
    pricing: {
      kicker: '04. Carte des Soins & Tarifs',
      title: 'L’Éventail des Cérémonies',
      desc: 'Tous nos tarifs sont exprimés en Dirhams marocains (MAD). Chaque prestation comprend un diagnostic personnalisé face à votre miroir en arche et une dégustation d’infusions bio.',
      filterAll: 'Tous les soins',
      filterCoiffure: 'Haute Coiffure',
      filterVisage: 'Soins Visage',
      filterOnglerie: 'Onglerie & Mains',
      filterHammam: 'Hammam Privatif',
      choose: 'Choisir',
      approxEur: 'env.',
      demoNote: '* Tarifs indicatifs de démonstration. Les forfaits mariage et privatisations sont établis sur devis personnalisé.',
      items: [
        {
          id: 'm-coif-1',
          category: 'coiffure',
          title: 'Coupe & Brushing Haute Couture',
          description: 'Diagnostic personnalisé, rituel shampooing aux huiles nobles, coupe stylisée et coiffage sculptural.',
          duration: '60 min',
          priceMAD: 450,
          priceEUR: 42,
        },
        {
          id: 'm-coif-2',
          category: 'coiffure',
          title: 'Balayage Solaire & Glaçage Gloss',
          description: 'Éclaircissement délicat mèche à mèche pour un fondu naturel doré, suivi d’un vernis brillance miroir.',
          duration: '120 min',
          priceMAD: 950,
          priceEUR: 90,
        },
        {
          id: 'm-coif-3',
          category: 'coiffure',
          title: 'Soin Botox Capillaire & Kératine Végétale',
          description: 'Régénération profonde de la fibre capillaire fatiguée, souplesse immédiate et élimination des frisottis.',
          duration: '90 min',
          priceMAD: 1100,
          priceEUR: 105,
        },
        {
          id: 'm-vis-1',
          category: 'visage',
          title: 'Rituel Détox & Pureté Minérale',
          description: 'Purification en profondeur aux argiles vertes du Rif, extraction douce et resserrement des pores aux eaux florales.',
          duration: '60 min',
          priceMAD: 650,
          priceEUR: 60,
        },
        {
          id: 'm-vis-2',
          category: 'visage',
          title: 'Grand Soin Anti-Âge Figue de Barbarie',
          description: 'Sérum ultra-concentré en oméga 6 & 9, gymnastique faciale et électro-stimulation douce pour un galbe lifté.',
          duration: '90 min',
          priceMAD: 1200,
          priceEUR: 115,
        },
        {
          id: 'm-ong-1',
          category: 'onglerie',
          title: 'Manucure Russe & Vernis Semi-Permanent',
          description: 'Travail millimétré des cuticules, renforcement kératine et couleur haute pigmentation tenue 3 semaines.',
          duration: '75 min',
          priceMAD: 550,
          priceEUR: 52,
        },
        {
          id: 'm-ong-2',
          category: 'onglerie',
          title: 'Pédicure Spa Éclat & Réflexologie',
          description: 'Bain bouillonnant aux sels d’Epsom et verveine, gommage pierre ponce, modelage des voûtes plantaires.',
          duration: '60 min',
          priceMAD: 500,
          priceEUR: 48,
        },
        {
          id: 'm-spa-1',
          category: 'hammam',
          title: 'Cérémonie Berbère Traditionnelle',
          description: 'Vapeur parfumée à l’eucalyptus sauvage, savonnage noir, gommage vigoureux au gant kessa et rinçage à l’eau de rose.',
          duration: '60 min',
          priceMAD: 600,
          priceEUR: 58,
        },
        {
          id: 'm-spa-2',
          category: 'hammam',
          title: 'Rituel Somptueux Éclat d’Or (Duo ou Solo)',
          description: 'Accès exclusif à la suite spa, gommage à la poudre d’or et ambre précieux, massage relaxant 50 min.',
          duration: '120 min',
          priceMAD: 1800,
          priceEUR: 170,
        },
      ],
    },
    booking: {
      kicker: '05. Conciergerie Privée',
      title: 'Prendre Rendez-vous',
      desc: 'Sélectionnez votre salon et vos préférences. Notre conciergerie vous répondra pour valider votre venue en toute discrétion.',
      labelSalon: 'Salon Maison Éclat',
      labelRitual: 'Rituel Souhaité',
      labelDate: 'Date Préférée',
      labelSlot: 'Créneau Horaire',
      labelName: 'Nom & Prénom',
      labelPhone: 'Numéro WhatsApp (Maroc ou International)',
      labelEmail: 'Adresse Courriel (Optionnel)',
      labelNotes: 'Exigences particulières (allergies, privatisation de poste, suite duo)',
      placeholderName: 'ex. Kenza El Fassi',
      placeholderPhone: '+212 6 XX XX XX XX',
      placeholderEmail: 'votre.courriel@domaine.com',
      placeholderNotes: 'Précisez tout souhait spécifique pour personnaliser votre accueil...',
      btnWhatsapp: 'Transmettre via WhatsApp',
      btnOnline: 'Confirmer la demande en ligne',
      errorRequired: 'Veuillez renseigner votre nom complet et votre numéro de téléphone WhatsApp.',
      successTag: 'Demande transmise avec succès',
      successTitle: 'Merci,',
      successDesc: 'Votre demande de réservation a été enregistrée avec la référence :',
      recapSalon: 'Sanctuaire :',
      recapRitual: 'Rituel :',
      recapDateTime: 'Date & Créneau :',
      recapContact: 'Contact :',
      successDemo: '* Note de démonstration : Ceci est une simulation de demande pour ce concept de portfolio. Aucun débit bancaire n’a été effectué et aucun rendez-vous réel n’est engagé.',
      btnNewSimulation: 'Effectuer une autre simulation',
    },
    testimonials: {
      kicker: '06. Journal des Invitées',
      title: 'Éloges & Confidences',
      demoNotice: '* Extraits de démonstration éditoriale — Présentation conceptuelle pour portfolio',
      items: [
        {
          id: 'test-1',
          name: 'Salma Benjelloun',
          role: 'Directrice de Création & Styliste',
          city: 'Casablanca',
          quote: 'Une atmosphère baignée de lumière et d’une sérénité absolue. Les miroirs en arche et le balayage ont illuminé mes cheveux avec un naturel époustouflant.',
          ritual: 'Soin Visage Éclat Royal & Balayage Couture',
        },
        {
          id: 'test-2',
          name: 'Kenzi Alaoui',
          role: 'Architecte d’Intérieur',
          city: 'Marrakech',
          quote: 'L’architecture lumineuse du salon, les arches dorées et la précision millimétrée de l’onglerie font de Maison Éclat mon sanctuaire favori.',
          ritual: 'Hammam Privatif & Manucure Or Fin',
        },
        {
          id: 'test-3',
          name: 'Camille de Montmirail',
          role: 'Chroniqueuse Lifestyle & Voyage',
          city: 'Paris & Rabat',
          quote: 'Le mariage entre le savoir-faire ancestral marocain et l’élégance de la haute coiffure moderne est une réussite totale.',
          ritual: 'Cérémonie Somptueuse Éclat d’Or',
        },
      ],
    },
    sanctuaries: {
      kicker: '07. Salons d’Exception',
      title: 'Nos Salons au Maroc',
      desc: 'Trois havres de paix pensés pour préserver votre tranquillité au cœur des quartiers les plus prestigieux.',
      faqKicker: 'Questions Fréquentes',
      faqTitle: 'Préparer Votre Expérience',
      locations: [
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
    },
    footer: {
      brandDesc: 'Haute Beauté & Salons de Coiffure au Maroc. Des espaces baignés de lumière naturelle alliant précision stylistique et botaniques ancestrales chérifiennes.',
      exploreTitle: 'Explorer',
      gazetteTitle: 'La Gazette Éclat',
      gazetteDesc: 'Recevez nos invitations aux masterclasses capillaires et lancements de soins saisonniers.',
      gazettePlaceholder: 'Votre adresse courriel',
      gazetteSuccess: 'Votre invitation a été transmise. Bienvenue dans notre cercle.',
      conciergeNote: 'Conciergerie 7j/7 pour nos membres privilégiées.',
      rights: 'Tous droits réservés.',
      conceptBadge: 'Concept de design digital & portfolio haute coiffure',
      demoNote: 'Démonstration conceptuelle pour le marché marocain.',
    },
    modal: {
      title: 'Réservation de Poste',
      subtitle: 'Conciergerie Privée',
      labelSalon: 'Salon',
      labelRitual: 'Rituel Sélectionné',
      labelDate: 'Date',
      labelTime: 'Heure',
      labelName: 'Nom Complet',
      labelPhone: 'WhatsApp',
      placeholderName: 'Votre nom complet',
      placeholderPhone: '+212 6 XX XX XX',
      btnWhatsapp: 'WhatsApp',
      btnConfirm: 'Confirmer',
      btnClose: 'Fermer',
      errorRequired: 'Veuillez saisir votre nom et numéro WhatsApp.',
      successTag: 'Demande Envoyée',
      successGreeting: 'Au plaisir de vous recevoir,',
      successRef: 'Référence :',
      demoNotice: '* Note : Démonstration pour concept créatif.',
    },
    concierge: {
      onlineName: 'Kenza · En ligne',
      onlineStatus: 'Kenza · Concierge Privée',
      salonSubtitle: 'Maison Éclat · Triangle d’Or Casa',
      welcomeMsg: 'Marhaban bikoum chez Maison Éclat. Je suis Kenza, Première Concierge de nos salons au Triangle d’Or à Casablanca. Comment puis-je vous accompagner aujourd’hui ?',
      quickInquiries: [
        {
          label: 'Forfait Mariée Impériale 💍',
          question: 'Pourriez-vous me renseigner sur le Forfait Mariée Impériale et la privatisation de suite ?',
          reply: 'Avec grand plaisir. Notre forfait mariée comprend le hammam royal privatif au lait de rose, le soin Kobido, la haute coiffure avec pose des parures et le maquillage longue tenue. Souhaitez-vous échanger directement avec moi sur WhatsApp ?',
        },
        {
          label: 'Disponibilité ce week-end 🗓️',
          question: 'Quelles sont vos disponibilités pour un rituel coiffure ou soin ce week-end ?',
          reply: 'Nos créneaux du week-end se réservent très vite pour préserver l’intimité de chaque poste. Je peux vous réserver un créneau privilégié le samedi matin ou dimanche après-midi.',
        },
        {
          label: 'Privatisation Poste de Coiffure 🏛️',
          question: 'Est-il possible de privatiser un poste de coiffure ou le hammam en duo ?',
          reply: 'Absolument. Nos postes sont conçus avec paravents et alcôves en arche pour une discrétion absolue, et notre hammam est 100% privatisable.',
        },
      ],
      inputPlaceholder: 'Votre message personnalisé...',
      btnSend: 'Envoyer',
      btnWhatsapp: 'Poursuivre sur WhatsApp Officiel',
      discretionNote: 'Conciergerie privée disponible 7j/7 pour un accueil sur-mesure.',
    },
  },

  ar: {
    nav: {
      rituals: 'الطقوس والخدمات',
      transformation: 'التحول واللمعان',
      bridal: 'جناح العروس',
      diagnostic: 'تشخيص الجمال',
      gallery: 'المعرض',
      pricing: 'قائمة الأسعار',
      sanctuaries: 'فروعنا',
      book: 'حجز موعد',
      call: 'الكونسيرج',
      soundOn: 'الصوت مشغل',
      soundOff: 'الصوت مكتوم',
    },
    hero: {
      kicker: 'الجمال الراقي وتصفيف الشعر المغربي',
      headlineStart: 'فن إبراز ',
      headlineHighlight: 'إشراقتكِ',
      headlineEnd: ' الطبيعية الأبهى.',
      subheading: 'التناغم المشرق بين أحدث صيحات تصفيف الشعر الراقية والطقوس النباتية المغربية الأصيلة. صالونات مغمورة بضوء النهار الطبيعي، مرايا مقوسة بالذهب، وعناية فائقة بخلاصات الأركان والنيرولي.',
      ctaPrimary: 'حجزي موعدك',
      ctaSecondary: 'شوفي الخدمات',
      stat1Title: '100% طبيعي',
      stat1Desc: 'أركان سوس النقي ونيرولي',
      stat2Title: '3 فروع فاخرة',
      stat2Desc: 'الدار البيضاء · مراكش · الرباط',
      stat3Title: 'خصوصية تامة',
      stat3Desc: 'مقصورات ومحطات مستقلة',
      stripBrand: 'ميزون إكلا المغرب',
      stripDesc: '— صالونات تصفيف الشعر الراقية والعناية النباتية',
      cities: 'الدار البيضاء · غوتييه · مراكش · الحي الشتوي · الرباط · السويسي',
    },
    station3D: {
      tag: 'محطة تصفيف الشعر ثلاثية الأبعاد 3D',
      title: 'المرآة المقوسة ورخام كالاكاتا الأبيض',
      desc: 'مرآة بإطار ذهبي مضاء من الخلف، رخام كالاكاتا الفاخر، وكرسي تصفيف كوتور من الجلد الطبيعي.',
      lightAmbiance: 'الأجواء الضوئية',
      daylight: 'ضوء النهار الطبيعي',
      golden: 'استوديو ذهبي',
      evening: 'أمسية خاصة هادئة',
      chairFinish: 'تخصيص الكرسي',
      caramel: 'كراميل',
      ivory: 'قماش عاجي',
      terracotta: 'تيراكوتا',
      noir: 'أسود فخم',
      auto: 'تلقائي',
      free: 'حر',
      takeSeat: 'احجزي مقعدكِ',
      perspectives: 'زوايا رؤية المقصورة :',
      viewOverview: 'رؤية شاملة',
      viewMirror: 'المرآة والأدوات',
      viewChair: 'كرسي التصفيف',
      toggleShow: 'تخصيص المقصورة 3D',
      toggleHide: 'إخفاء لوحة التحكم',
    },
    services: {
      kicker: '01. خدماتنا',
      title: 'خدمات الجمال ديالنا',
      filterAll: 'جميع الخدمات',
      filterCoiffure: 'تصفيف الشعر الراقي',
      filterVisage: 'العناية بالبشرة',
      filterOnglerie: 'العناية بالأظافر',
      filterHammam: 'الحمام الملكي الخاص',
      fromPrice: 'ابتداءً من',
      bookRitual: 'حجزي هاد الخدمة',
    },
    transformation: {
      kicker: 'قبل وبعد',
      title: 'شوفي الفرق فالشعر',
      desc: 'حركي المؤشر لمعاينة التحول الباهر لخصلات الشعر تحت أشعة الشمس. تركيبتنا الحصرية تغذي ألياف الشعر بالكيراتين النباتي وزيت الأركان العضوي لاقتناص الضوء بأعلى درجات الانعكاس.',
      metric1Label: 'معامل انعكاس اللمعان :',
      metric1Value: '+185% لمعان مِرآتي فائق',
      metric2Label: 'تغذية ونعومة حريرية :',
      metric2Value: 'زيت أركان سوس المعصور بارداً',
      metric3Label: 'ثبات التسريحة :',
      metric3Value: 'يصل إلى 6 أسابيع',
      cta: 'حجز بروتوكول اللمعان الفائق',
      badgeLeft: 'لمعان مِرآتي مكثف',
      badgeRight: 'حيوية وانسيابية داخل الصالون',
      dragHint: '← اسحبي أفقياً للمقارنة بين اللمعان والنعومة →',
    },
    bridal: {
      kicker: 'باقة العروس الملكية الحصرية',
      title: 'إطلالة زوينة لنهار عرسك',
      desc: 'الأعراس المغربية احتفال بالوقار والأناقة. تخصص ميزون إكلا جناحاً ملكياً خاصاً بالكامل للعروس ومرافقتها، بإشراف كبار مصففي الشعر وخبراء التجميل المعتمدين.',
      floatingTag: 'مراسم الزفاف الملكية',
      floatingDesc: 'تحية إجلال لأناقة وجمال العروس المغربية الملكية.',
      ctaQuote: 'طلبي ثمن باقة العروس',
      ctaWhatsapp: 'كونسيرج العروس عبر واتساب',
      features: [
        'جلسة تجريبية لتصفيف الشعر والمكياج قبل الزفاف بـ 15 يوماً',
        'حمام ملكي خاص بحليب اللوز، بتلات الورد وصابون العنبر الطبيعي',
        'عناية فاخرة بالوجه بتدليك كوبيدو لشد البشرة وماسك الهيدروجيل',
        'تسريحة شعر كوتور مخصصة للتاج المغربي وارتداء القفطان الأصيل',
        'مكياج سهرة مخملي ثابت مقاوم للإضاءة ودموع الفرح',
        'إشراف خبير على وضع المجوهرات، دبابيس الرأس وطرحة الزفاف',
      ],
    },
    diagnostic: {
      kicker: 'استشارة تفاعلية رقمية',
      title: 'شنو الخدمة اللي تناسبك؟',
      desc: 'في 3 خطوات سريعة، يحدد خبراؤنا التركيبة والطقوس المثالية المتوافقة مع احتياجات شعركِ وبشرتكِ بدقة.',
      step1: '01. مجال العناية',
      step2: '02. النتيجة المنشودة',
      step3: '03. الصالون المفضل',
      step1Question: 'ما هي الخدمة التي ترغبين في استكشافها اليوم؟',
      step2Question: 'ما هو هدفكِ التجميلي الأساسي؟',
      step3Question: 'في أي فرع من صالوناتنا تفضلين استقبالكِ؟',
      back: '← الخطوة السابقة',
      generate: 'شوفي الاقتراح',
      restart: 'إعادة التشخيص',
      prescriptionTag: 'الوصفة التجميلية المعتمدة',
      ingredientsTitle: 'التركيبة والمكونات الطبيعية النقية',
      recSanctuary: 'الفرع المقترح :',
      estDuration: 'المدة المقدرة :',
      refPrice: 'السعر المرجعي :',
      bookWhatsapp: 'الحجز المباشر عبر واتساب',
      confirmOnline: 'تأكيد الطلب عبر الموقع',
    },
    about: {
      kicker: '02. فلسفة وهويتنا',
      title: 'اللقاء الراقي بين مدارس التصفيف العالمية وخيرات الأرض المغربية.',
      desc1: 'تعيد ميزون إكلا تعريف مفهوم صالونات التجميل في المغرب. ابتعدنا عن المساحات المغلقة المعتمة لنبتكر صالونات فسيحة تفيض بنور الشمس الطبيعي، حيث تحظى كل سيدة بمقصورة مستقلة ومِرآة خاصة بلا أي إزعاج.',
      desc2: 'نستخلص زيوت الأركان بعصر بارد فوري من تعاونيات نسائية شريكة في سهل سوس، وماء الورد والنيرولي من تقطير الفجر بقلعة مكونة والخميسات، لنمنح خصلاتكِ وبشرتكِ نضارة من أصفى ينابيع الطبيعة.',
      photoTag: 'الهندسة والضوء',
      photoDesc: 'مرايا بأقواس ذهبية، رخام أبيض ناصع، ونوافذ فرنسية رحبة بالدار البيضاء.',
      p1Title: 'أصالة المكونات',
      p1Desc: 'خلاصات طبيعية 100% تحضر طازجة أمامكِ على الرخام الأبيض.',
      p2Title: 'حرفية رفيعة',
      p2Desc: 'مصففون ومختصون بالصبغات معتمدون من كبرى الأكاديميات الدولية.',
      p3Title: 'مقصورات خاصة',
      p3Desc: 'خصوصية وراحة تامة أمام مِرآتكِ الشخصية دون أي مواجهة.',
    },
    gallery: {
      kicker: '03. معرض الصالون والأعمال',
      title: 'شوفي خدمتنا بالصور',
      filterAll: 'الكل',
      filterCoiffure: 'تصفيف الشعر والبالياج',
      filterVisage: 'العناية بالبشرة',
      filterOnglerie: 'الأظافر والمناكير',
      filterHammam: 'الحمام الملكي',
      closeView: 'إغلاق المعاينة المكبرة',
      prevImg: 'الصورة السابقة',
      nextImg: 'الصورة التالية',
      items: [
        {
          id: 'gal-1',
          title: 'الصالون الرئيسي المغمور بنور الشمس',
          categoryLabel: 'تصفيف الشعر',
          caption: 'مرايا مقوسة بالذهب ورخام أبيض ناصع تحت ضوء النهار في الدار البيضاء.',
        },
        {
          id: 'gal-2',
          title: 'تصفيف شعر العروس في جناح خاص',
          categoryLabel: 'جناح العروس',
          caption: 'إتقان فائق لتموجات الشعر الحريرية والتحضيرات الملكية.',
        },
        {
          id: 'gal-3',
          title: 'جلسة تدليك كوبيدو ونضارة الوجه',
          categoryLabel: 'العناية بالوجه',
          caption: 'إكسير التين الشوكي وزهر النيرولي على حجر الترافرتين الطبيعي.',
        },
        {
          id: 'gal-4',
          title: 'مانيكير فاخر مع شريط الذهب',
          categoryLabel: 'العناية بالأظافر',
          caption: 'ورق ذهب خالص على كتان خام وأحجار طبيعية.',
        },
        {
          id: 'gal-5',
          title: 'ملاذ الحمام بالتادلاكت المغربي الأصيل',
          categoryLabel: 'الحمام الملكي',
          caption: 'حوض ماء ساخن، بخار معطر بنفحات العنبر والمسك.',
        },
        {
          id: 'gal-6',
          title: 'مراسم العروس الكوتور الفاخرة',
          categoryLabel: 'مراسم الزفاف',
          caption: 'تاج ملكي مرصع وتسريحة شعر استثنائية للعروس المغربية.',
        },
      ],
    },
    pricing: {
      kicker: '04. قائمة الأسعار والخدمات',
      title: 'الخدمات والأثمنة',
      desc: 'جميع الأسعار معلنة بالدرهم المغربي (MAD). تشمل كل جلسة تشخيصاً شخصياً مسبقاً أمام مِرآتكِ مع تقديم تشكيلة من الشاي المغربي العضوي.',
      filterAll: 'جميع الخدمات',
      filterCoiffure: 'تصفيف الشعر الراقي',
      filterVisage: 'العناية بالبشرة',
      filterOnglerie: 'الأظافر واليدين',
      filterHammam: 'الحمام الملكي',
      choose: 'اختيار',
      approxEur: 'حوالي',
      demoNote: '* أسعار استرشادية للعرض التوضيحي. باقات الأعراس والخصخصة تقدم بناءً على مقايسة خاصة.',
      items: [
        {
          id: 'm-coif-1',
          category: 'coiffure',
          title: 'قص الشعر وسيشوار كوتور فاخر',
          description: 'تشخيص مخصص لملامح الوجه، غسيل بزيوت ثمينة، قصة شعر متقنة وتصفيف احترافي.',
          duration: '60 دقيقة',
          priceMAD: 450,
          priceEUR: 42,
        },
        {
          id: 'm-coif-2',
          category: 'coiffure',
          title: 'بالياج الشمس الدافئة وغلاساج اللمعان',
          description: 'تفتيح دقيق خصلة بخصلة لتموجات ذهبية طبيعية، يعقبه طلاء لامع يعكس الضوء كالمرآة.',
          duration: '120 دقيقة',
          priceMAD: 950,
          priceEUR: 90,
        },
        {
          id: 'm-coif-3',
          category: 'coiffure',
          title: 'علاج بوتوكس الشعر والكيراتين النباتي',
          description: 'تجديد عميق لألياف الشعر المجهدة، مرونة فورية وتخلص تام من النفشة والتقصف.',
          duration: '90 دقيقة',
          priceMAD: 1100,
          priceEUR: 105,
        },
        {
          id: 'm-vis-1',
          category: 'visage',
          title: 'طقس الديتوكس والنقاء المعدني للبشرة',
          description: 'تنقية عميقة بالطين الأخضر من جبال الريف، إزالة لطيفة للشوائب وتضييق المسام بماء الورد.',
          duration: '60 دقيقة',
          priceMAD: 650,
          priceEUR: 60,
        },
        {
          id: 'm-vis-2',
          category: 'visage',
          title: 'العناية الفائقة لمقاومة علامات التقدم بالسن',
          description: 'سيروم عالي التركيز بزيت بذور التين الشوكي، تمارين للوجه وتنبيه دقيق لشد الملامح.',
          duration: '90 دقيقة',
          priceMAD: 1200,
          priceEUR: 115,
        },
        {
          id: 'm-ong-1',
          category: 'onglerie',
          title: 'مانيكير روسي وطلاء شبه دائم عالي الثبات',
          description: 'تهذيب فائق الدقة للجلد المحيط بالظفر، تقوية بالكيراتين ولون كثيف يدوم لـ 3 أسابيع.',
          duration: '75 دقيقة',
          priceMAD: 550,
          priceEUR: 52,
        },
        {
          id: 'm-ong-2',
          category: 'onglerie',
          title: 'سبا بديكير إكلا وتدليك ريفلكسولوجي',
          description: 'مغطس فوار بأملاح إبسوم ونبات اللويزة، تقشير بحجر الخفاف، وتدليك مريح لبطن القدم.',
          duration: '60 دقيقة',
          priceMAD: 500,
          priceEUR: 48,
        },
        {
          id: 'm-spa-1',
          category: 'hammam',
          title: 'مراسم الحمام البربري التقليدي الفاخر',
          description: 'بخار معطر بالأوكالبتوس البري، صابون بلدي نقي، فرك متقن بكيس الحرير وشطف بماء الورد.',
          duration: '60 دقيقة',
          priceMAD: 600,
          priceEUR: 58,
        },
        {
          id: 'm-spa-2',
          category: 'hammam',
          title: 'طقس بريق الذهب الملكي (ثنائي أو فردي)',
          description: 'ولوج حصري لجناح السبا الخاص، تقشير بمسحوق الذهب والعنبر الثمين، وتدليك استرخائي 50 دقيقة.',
          duration: '120 دقيقة',
          priceMAD: 1800,
          priceEUR: 170,
        },
      ],
    },
    booking: {
      kicker: '05. المساعدة والحجز',
      title: 'حجز الموعد',
      desc: 'اختاري الصالون والموعد المناسب لكِ، وسيقوم فريق الكونسيرج بتأكيد موعدكِ بمنتهى الاحترافية والسرعة.',
      labelSalon: 'الصالون والفرع المطلوب',
      labelRitual: 'الطقس أو الخدمة المطلوبة',
      labelDate: 'التاريخ المفضل',
      labelSlot: 'التوقيت المناسب',
      labelName: 'الاسم واللقب',
      labelPhone: 'رقم الهاتف / واتساب (المغرب أو دولي)',
      labelEmail: 'البريد الإلكتروني (اختياري)',
      labelNotes: 'ملاحظات خاصة (حساسية، رغبة في مقصورة ثنائية، خصوصية تامة)',
      placeholderName: 'مثال: كنزة الفاسي',
      placeholderPhone: '+212 6 XX XX XX XX',
      placeholderEmail: 'votre.courriel@domaine.com',
      placeholderNotes: 'أخبرينا بأي تفضيل خاص لضمان استقبالكِ بأفضل شكل...',
      btnWhatsapp: 'إرسال الطلب فوراً عبر واتساب',
      btnOnline: 'تأكيد الحجز المباشر عبر الموقع',
      errorRequired: 'يرجى كتابة الاسم الكامل ورقم الهاتف لتأكيد الحجز.',
      successTag: 'تم إرسال طلب الحجز بنجاح',
      successTitle: 'شكراً لكِ،',
      successDesc: 'تم تسجيل طلبكِ وحفظه بالرقم المرجعي التالي :',
      recapSalon: 'الفرع :',
      recapRitual: 'الطقس المطلوب :',
      recapDateTime: 'الموعد والتوقيت :',
      recapContact: 'بيانات الاتصال :',
      successDemo: '* تنبيه توضيحي: هذه محاكاة لحجز موعد ضمن موقع استعراضي تجريبي. لم يتم خصم أي مبلغ مالي ولا التزام بموعد فعلي.',
      btnNewSimulation: 'إجراء محاكاة حجز جديدة',
    },
    testimonials: {
      kicker: '06. آراء الزبونات',
      title: 'شنو قالو على التجربة',
      demoNotice: '* مقتطفات استعراضية تجريبية — مصممة لأغراض العرض الفني للمحفظة الرقمية',
      items: [
        {
          id: 'test-1',
          name: 'سلمى بنجلون',
          role: 'مديرة إبداعية ومصممة أزياء',
          city: 'الدار البيضاء',
          quote: 'أجواء تغمرها أشعة الشمس وهدوء يبعث على الراحة التامة. المرايا المقوسة ولمسات البالياج أضفت على شعري إشراقة طبيعية مذهلة.',
          ritual: 'عناية الوجه الملكية وبالياج كوتور',
        },
        {
          id: 'test-2',
          name: 'كنزي العلوي',
          role: 'مهندسة ديكور داخلي',
          city: 'مراكش',
          quote: 'الهندسة المعمارية المشرقة للصالون، الأقواس المذهبة والدقة المتناهية في العناية بالأظافر تجعل من ميزون إكلا ملاذي المفضل الدائم.',
          ritual: 'الحمام الملكي الخاص ومانيكير الذهب',
        },
        {
          id: 'test-3',
          name: 'كاميل دو مونميراي',
          role: 'كاتبة ومحررة صحفية في أسلوب الحياة',
          city: 'باريس والرباط',
          quote: 'التناغم بين الأصالة المغربية العريقة وأناقة تصفيف الشعر العصري هو سر تميز هذا الصالون الفريد.',
          ritual: 'طقس بريق الذهب الملكي الفاخر',
        },
      ],
    },
    sanctuaries: {
      kicker: '07. فروعنا المختارة',
      title: 'صالوناتنا في أرقى أحياء المغرب',
      desc: 'ثلاثة صالونات هادئة صُممت خصيصاً لتمنحكِ الراحة والسكينة في أرقى مناطق المملكة.',
      faqKicker: 'الأسئلة الشائعة',
      faqTitle: 'الاستعداد لزيارتكِ',
      locations: [
        {
          id: 'casablanca',
          city: 'الدار البيضاء',
          neighborhood: 'المثلث الذهبي — غوتييه',
          address: 'زاوية شارع مولاي يوسف وزنقة إفران',
          phone: '+212 5 22 98 44 10',
          email: 'casablanca@maison-eclat.ma',
          hours: 'الثلاثاء — الأحد : 10:00 صباحاً - 8:00 مساءً (مغلق يوم الإثنين)',
          features: ['خدمة ركن سيارات خاصة', 'مقصورات تصفيف مستقلة', 'بار شاي وعصائر ديتوكس طبيعية'],
          note: 'عرض توضيحي — عنوان استعراضي للمحفظة الفنية',
        },
        {
          id: 'marrakech',
          city: 'مراكش',
          neighborhood: 'الحي الشتوي (L’Hivernage)',
          address: 'شارع الشهداء، إقامة حدائق الزمرد',
          phone: '+212 5 24 43 18 20',
          email: 'marrakech@maison-eclat.ma',
          hours: 'الثلاثاء — الأحد : 11:00 صباحاً - 9:00 مساءً (مغلق يوم الإثنين)',
          features: ['حديقة أشجار برتقال خاصة', 'حمام ملكي مكسو بالرخام', 'كابينة تدليك في الهواء الطلق'],
          note: 'عرض توضيحي — عنوان استعراضي للمحفظة الفنية',
        },
        {
          id: 'rabat',
          city: 'الرباط',
          neighborhood: 'السويسي — ممر السفارات',
          address: 'شارع محمد السادس، ممر السفارات الراقي',
          phone: '+212 5 37 75 90 30',
          email: 'rabat@maison-eclat.ma',
          hours: 'الثلاثاء — الأحد : 10:00 صباحاً - 8:00 مساءً (مغلق يوم الإثنين)',
          features: ['مساحة تصفيف راقية وهادئة', 'مواقف سيارات خاصة مؤمنة', 'استشارة مجانية لبصيلات الشعر'],
          note: 'عرض توضيحي — عنوان استعراضي للمحفظة الفنية',
        },
      ],
      faqs: [
        {
          q: 'كيف يمكنني حجز موعد في ميزون إكلا؟',
          a: 'لضمان حجز فوري واستقبال يليق بكِ، يمكنكِ إرسال طلبكِ عبر الموقع أو التواصل المباشر عبر واتساب مع كونسيرج الصالون الخاص لتأكيد الموعد بأسرع وقت.',
        },
        {
          q: 'هل جميع المستحضرات طبيعية ومستخلصة من المغرب؟',
          a: 'نعم بكل تأكيد. زيوت الأركان، التين الشوكي ومياه زهر النيرولي العطرية نقتنيها من تعاونيات نسائية مغربية معتمدة وموثقة عضوياً في تارودانت وقلعة مكونة والخميسات.',
        },
        {
          q: 'هل يمكن حجز الحمام الملكي أو الصالون لمناسبة خاصة؟',
          a: 'بالتأكيد. أجنحة الحمام ومقصورات التصفيف متاحة للحجز الحصري الكامل لتحضيرات العرائس وجلسات الاسترخاء العائلية أو الخاصة مع صديقاتكِ.',
        },
        {
          q: 'ما هي سياسة تعديل أو إلغاء الموعد؟',
          a: 'احتراماً لجدول مواعيد خبرائنا ومصممي الشعر، نرجو إخطارنا بأي تعديل أو اعتذار قبل 24 ساعة على الأقل من موعد جلستكِ المحجوزة.',
        },
      ],
    },
    footer: {
      brandDesc: 'أرقى صالونات تصفيف الشعر والجمال في المغرب. مساحات تغمرها الشمس الطبيعية تجمع بين حداثة التصميم وأصالة الطقوس المغربية.',
      exploreTitle: 'تصفح الموقع',
      gazetteTitle: 'جريدة إكلا الدورية',
      gazetteDesc: 'انضمي إلى مجتمعنا لتلقي دعوات خاصة وحضور جلسات تصفيف موسمية حصرية.',
      gazettePlaceholder: 'بريدكِ الإلكتروني',
      gazetteSuccess: 'تم استلام اشتراككِ بنجاح. أهلاً بكِ في مجتمعنا الراقي.',
      conciergeNote: 'خدمة كونسيرج 7 أيام في الأسبوع لعميلاتنا المميزات.',
      rights: 'جميع الحقوق محفوظة.',
      conceptBadge: 'تصميم تجريبي احترافي لصالونات التجميل الراقية',
      demoNote: 'نموذج محفظة أعمال موجه لقطاع الجمال الفاخر بالمغرب.',
    },
    modal: {
      title: 'حجز مقصورة وموعد',
      subtitle: 'المساعدة والحجز',
      labelSalon: 'الصالون والفرع',
      labelRitual: 'الطقس المختار',
      labelDate: 'التاريخ',
      labelTime: 'الوقت',
      labelName: 'الاسم الكامل',
      labelPhone: 'واتساب',
      placeholderName: 'اسمكِ الكامل',
      placeholderPhone: '+212 6 XX XX XX',
      btnWhatsapp: 'واتساب',
      btnConfirm: 'تأكيد الحجز',
      btnClose: 'إغلاق',
      errorRequired: 'يرجى كتابة الاسم ورقم الواتساب.',
      successTag: 'تم إرسال الطلب',
      successGreeting: 'يسعدنا جداً استقبالكِ،',
      successRef: 'الرقم المرجعي :',
      demoNotice: '* تنبيه : تجربة محاكاة فنية لمفهوم إبداعي.',
    },
    concierge: {
      onlineName: 'كنزة · متصلة الآن',
      onlineStatus: 'كنزة · المساعدة والحجزة',
      salonSubtitle: 'ميزون إكلا · المثلث الذهبي الدار البيضاء',
      welcomeMsg: 'مرحباً بكِ في ميزون إكلا. أنا كنزة، الكونسيرج الرئيسية لصالوناتنا في المثلث الذهبي بالدار البيضاء. كيف يمكنني مساعدتكِ اليوم في اختيار طقسكِ التجميلي؟',
      quickInquiries: [
        {
          label: 'باقة العروس الملكية 💍',
          question: 'هل يمكن إفادتي بتفاصيل باقة العروس وحجز الجناح الملكي الخاص؟',
          reply: 'بكل سرور. باقة العروس تتضمن حماماً ملكياً بحليب الورد، علاج كوبيدو للوجه، تصفيف شعر كوتور مع تركيب التاج والمكياج الفاخر. هل ترغبين في استكمال المحادثة عبر واتساب لمراجعة التواريخ المتاحة؟',
        },
        {
          label: 'مواعيد نهاية هذا الأسبوع 🗓️',
          question: 'ما هي المواعيد المتوفرة لجلسة تصفيف شعر أو عناية نهاية هذا الأسبوع؟',
          reply: 'المواعيد تكتمل سريعاً حفاظاً على هدوء وخصوصية كل ضيفة. يمكنني تخصيص مقصورة متميزة لكِ صباح السبت أو بعد ظهر الأحد.',
        },
        {
          label: 'حجز مقصورة أو حمام خاص 🏛️',
          question: 'هل يمكن حجز مقصورة مستقلة تماماً أو الحمام لشخصين؟',
          reply: 'نعم بالتأكيد. جميع مقصوراتنا مزودة بفواصل وأقواس خشبية ورخامية لضمان الخصوصية التامة، والحمام متاح للخصخصة بالكامل.',
        },
      ],
      inputPlaceholder: 'اكتبي رسالتكِ الخاصة هنا...',
      btnSend: 'إرسال',
      btnWhatsapp: 'المتابعة عبر واتساب الرسمي',
      discretionNote: 'خدمة كونسيرج سرية متوفرة طوال الأسبوع لاستقبالكِ بأعلى درجات الرقي.',
    },
  },
};
