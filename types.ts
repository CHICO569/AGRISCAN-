
export interface SoilResult {
  texture: string;
  ph: number;
  nitrogen: 'Faible' | 'Moyen' | 'Elevé';
  phosphorus: 'Faible' | 'Moyen' | 'Elevé';
  potassium: 'Faible' | 'Moyen' | 'Elevé';
  humidity: string;
  recommendation: string;
}

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  kycLevel: string;
  createdAt: string;
  lastLogin: string;
  location: string;
}

export interface CropStep {
  title: string;
  desc: string;
}

export interface CropInfo {
  id: string;
  name: string;
  category: 'Maraîchage' | 'Arboriculture';
  spacingLine: number; 
  spacingPlant: number;
  cycle: string;
  steps: CropStep[];
  itinerary: {
    preparation: string;
    maintenance: string;
    protection: string;
  };
}

export interface MarketplaceItem {
  id: string;
  title: string;
  type: 'troc' | 'vente';
  author: string;
  location: string;
  description: string;
  price?: string;
  exchangeFor?: string;
  image: string;
}

export interface AcademyVideo {
  id: string;
  title: string;
  category: 'Sol' | 'Irrigation' | 'Fertilisation' | 'Ravageurs' | 'Cultures';
  duration: string;
  thumbnail: string;
  level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  summary: string;
  transcription: boolean;
}
