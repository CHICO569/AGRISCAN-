
import { CropInfo, MarketplaceItem } from './types';

export const COLORS = {
  primary: '#2D6A4F',
  secondary: '#7B4B2A',
  light: '#F8F9FA',
  accent: '#D4A373'
};

export const CROPS: CropInfo[] = [
  // MARAICHAGE
  {
    id: 'tomate',
    name: 'Tomate',
    category: 'Maraîchage',
    spacingLine: 0.80,
    spacingPlant: 0.40,
    cycle: '90-120 jours',
    steps: [
      { title: 'Pépinière', desc: 'Semis en plateaux alvéolés pendant 25 jours.' },
      { title: 'Transplantation', desc: 'Mise en terre au stade 4-5 feuilles.' },
      { title: 'Tuteurage', desc: 'Pose de tuteurs en bambou pour soutenir les grappes.' }
    ],
    itinerary: {
      preparation: "Planches de culture surélevées, apport massif de matière organique.",
      maintenance: "Arrosage régulier au pied, éviter de mouiller le feuillage.",
      protection: "Surveillance de la mouche mineuse et du mildiou."
    }
  },
  {
    id: 'oignon',
    name: 'Oignon',
    category: 'Maraîchage',
    spacingLine: 0.20,
    spacingPlant: 0.10,
    cycle: '120-150 jours',
    steps: [
      { title: 'Semis', desc: 'En pépinière ombragée pendant 45 jours.' },
      { title: 'Habillage', desc: 'Coupe des racines et des feuilles avant repiquage.' },
      { title: 'Séchage', desc: 'Cure au soleil pendant 10 jours après récolte.' }
    ],
    itinerary: {
      preparation: "Sol léger, bien drainé, sans fumure fraîche.",
      maintenance: "Binage fréquent pour éviter la concurrence des herbes.",
      protection: "Traitement préventif contre le thrips."
    }
  },
  // ARBORICULTURE
  {
    id: 'manguier',
    name: 'Manguier',
    category: 'Arboriculture',
    spacingLine: 10.0,
    spacingPlant: 10.0,
    cycle: '3-5 ans (entrée en production)',
    steps: [
      { title: 'Trouaison', desc: 'Trous de 80x80x80cm enrichis en compost.' },
      { title: 'Greffage', desc: 'Utilisation de greffons Kent ou Keitt sur porte-greffe local.' },
      { title: 'Taille', desc: 'Taille de formation pour aérer le centre de l\'arbre.' }
    ],
    itinerary: {
      preparation: "Nettoyage du terrain, piquetage régulier.",
      maintenance: "Irrigation de soutien les 2 premières années en saison sèche.",
      protection: "Lutte contre la mouche des fruits (piégeage)."
    }
  },
  {
    id: 'citronnier',
    name: 'Citronnier',
    category: 'Arboriculture',
    spacingLine: 6.0,
    spacingPlant: 5.0,
    cycle: '2-3 ans',
    steps: [
      { title: 'Plantation', desc: 'Collet légèrement au-dessus du niveau du sol.' },
      { title: 'Fertilisation', desc: 'Apport régulier de Potassium pour la qualité du fruit.' },
      { title: 'Protection', desc: 'Surveillance de la mineuse des agrumes.' }
    ],
    itinerary: {
      preparation: "Apport de calcaire si le sol est trop acide.",
      maintenance: "Désherbage manuel de la cuvette au pied de l'arbre.",
      protection: "Traitement huileux contre les cochenilles."
    }
  }
];

export const MARKETPLACE_DATA: MarketplaceItem[] = [
  {
    id: '1',
    title: '5 Sacs de Maïs local',
    type: 'troc',
    author: 'Amadou Fall',
    location: 'Kaolack',
    description: 'Echange maïs jaune de qualité supérieure contre arachide ou semences de mil.',
    exchangeFor: 'Arachide / Mil',
    image: 'https://images.unsplash.com/photo-1551754655-cd27e38d2076?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    title: 'Compost Bio 50kg',
    type: 'vente',
    author: 'Fatou Diop',
    location: 'Fatick',
    description: 'Compost organique riche en azote, idéal pour le maraîchage. Fertilisant naturel premium.',
    price: '5000 FCFA',
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=800'
  }
];
