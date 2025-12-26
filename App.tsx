
import React, { useState, useEffect, createContext, useContext } from 'react';
import * as ReactRouterDOM from 'react-router-dom';
import { 
  Menu, X, Home, Microscope, Map as MapIcon, 
  ShoppingBag, BookOpen, User as UserIcon, 
  LogOut, ShieldCheck, Clock, Shield, Sparkles, Video, CloudSun, Scan, Key, AlertCircle, Info, Terminal, RefreshCw, ShieldAlert, Zap, Globe, Cpu, Activity, Settings, Database
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

// Pages
import HomePage, { AgriScanLogo } from './pages/HomePage';
import SoilAnalysisPage from './pages/SoilAnalysisPage';
import InteractiveMapPage from './pages/InteractiveMapPage';
import RecommendationsPage from './pages/RecommendationsPage';
import DensityCalculatorPage from './pages/DensityCalculatorPage';
import MarketplacePage from './pages/MarketplacePage';
import KnowledgePage from './pages/KnowledgePage';
import AuthPage from './pages/AuthPage';
import AIChatPage from './pages/AIChatPage';
import AcademyPage from './pages/AcademyPage';
import ProfilePage from './pages/ProfilePage';
import WeatherPage from './pages/WeatherPage';
import PestDetectionPage from './pages/PestDetectionPage';
import AdminDashboardPage from './pages/AdminDashboardPage';

const { HashRouter, Routes, Route, Link, useLocation, Navigate } = ReactRouterDOM as any;
const MotionDiv = motion.div as any;

// Auth Context
interface LoginRecord { device: string; date: string; location: string; }
interface UserData { id: string; name: string; email: string; kycLevel: string; verifiedAt: string; loginHistory: LoginRecord[]; role: 'user' | 'admin'; }
interface AuthContextType { 
  user: UserData | null; 
  login: (userData: UserData) => void; 
  logout: () => void;
  isDemoMode: boolean;
  setDemoMode: (val: boolean) => void;
  iaStatus: 'online' | 'demo' | 'connecting';
}

const AuthContext = createContext<AuthContextType>({ 
  user: null, 
  login: () => {}, 
  logout: () => {},
  isDemoMode: false,
  setDemoMode: () => {},
  iaStatus: 'connecting'
});
export const useAuth = () => useContext(AuthContext);

// API KEY GUARD
const ApiKeyGuard = ({ children }: { children?: React.ReactNode }) => {
  const { isDemoMode, setDemoMode } = useAuth();
  const [hasKey, setHasKey] = useState<boolean | null>(null);

  const checkKey = async () => {
    // Priority: system environment, then aistudio selection
    const envKey = process.env.API_KEY;
    const isKeyValid = envKey && envKey !== "undefined" && envKey.trim().length > 15;
    
    if (isKeyValid) {
      setHasKey(true);
    } else if (typeof (window as any).aistudio?.hasSelectedApiKey === 'function') {
      const selected = await (window as any).aistudio.hasSelectedApiKey();
      setHasKey(selected);
    } else {
      setHasKey(false);
    }
  };

  useEffect(() => {
    checkKey();
  }, []);

  const handleOpenKeySelector = async () => {
    if (typeof (window as any).aistudio?.openSelectKey === 'function') {
      try {
        await (window as any).aistudio.openSelectKey();
        // Race condition mitigation: assume success and proceed
        setHasKey(true);
      } catch (e: any) {
        console.error("Selection error", e);
      }
    }
  };

  if (isDemoMode) return <>{children}</>;

  if (hasKey === null) return (
    <div className="min-h-screen bg-[#081c15] flex items-center justify-center">
       <div className="flex flex-col items-center gap-4">
         <div className="w-12 h-12 border-4 border-[#D4A373] border-t-transparent rounded-full animate-spin" />
         <p className="text-white/30 font-black text-[10px] uppercase tracking-widest text-center tracking-[0.4em]">Activation du Nœud Sénégal...</p>
       </div>
    </div>
  );

  if (!hasKey) {
    return (
      <div className="min-h-screen bg-[#FDFCF8] flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-md w-full bg-white rounded-[60px] p-10 md:p-14 shadow-4xl relative overflow-hidden border border-gray-100">
          <div className="absolute top-0 left-0 right-0 h-2 bg-[#2D6A4F]" />
          
          <div className="w-24 h-24 bg-gray-50 rounded-[40px] flex items-center justify-center mx-auto mb-10 shadow-inner">
            <AgriScanLogo className="w-14 h-14" />
          </div>
          
          <h1 className="text-4xl font-black uppercase tracking-tighter text-gray-900 mb-6">Système IA <br />Prêt</h1>
          <p className="text-gray-400 font-bold text-sm mb-6 leading-relaxed">
            Pour accéder aux outils de diagnostic avancés, vous devez sélectionner une clé API via un projet GCP payant.
          </p>
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" className="text-[10px] font-black uppercase text-[#2D6A4F] hover:underline mb-12 block">Documentation Facturation</a>
          
          <div className="space-y-4">
            <button onClick={handleOpenKeySelector} className="w-full bg-gray-950 text-white py-6 rounded-[30px] font-black uppercase text-xs tracking-widest shadow-2xl hover:bg-[#2D6A4F] transition-all flex items-center justify-center gap-3 active:scale-95">
              <Sparkles className="w-5 h-5 text-[#D4A373]" />
              Activer ma Clé
            </button>

            <button onClick={() => setDemoMode(true)} className="w-full bg-gray-50 text-gray-400 py-6 rounded-[30px] font-black uppercase text-[10px] tracking-[0.2em] border border-gray-100 hover:bg-gray-100 transition-all flex items-center justify-center gap-3">
              <Zap className="w-4 h-4" />
              Tester en Démo
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return <>{children}</>;
};

const ProtectedRoute = ({ children, adminOnly = false }: { children?: React.ReactNode, adminOnly?: boolean }) => {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) return <Navigate to="/auth" state={{ from: location }} replace />;
  if (adminOnly && user.role !== 'admin') return <Navigate to="/" replace />;
  return <>{children}</>;
};

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isDemoMode } = useAuth();
  const location = useLocation();

  const navLinks = [
    { name: 'Accueil', path: '/', icon: Home },
    { name: 'Vision', path: '/vision', icon: Scan, protected: true },
    { name: 'Météo', path: '/meteo', icon: CloudSun, protected: true },
    { name: 'Analyse Sol', path: '/analyse-sol', icon: Microscope, protected: true },
    { name: 'Assistant IA', path: '/assistant-ia', icon: Sparkles, protected: true },
    { name: 'Marché', path: '/marketplace', icon: ShoppingBag, protected: true },
    { name: 'Savoirs', path: '/pratiques-endogenes', icon: BookOpen },
    { name: 'Admin', path: '/admis', icon: Settings, protected: true, adminOnly: true },
  ];

  return (
    <div className="flex flex-col">
      <div className={`py-2 px-4 text-[8px] font-black text-center uppercase tracking-[0.4em] border-b hidden sm:block transition-all duration-500 ${isDemoMode ? 'bg-orange-600 text-white border-orange-500' : 'bg-[#081c15] text-[#D4A373] border-[#D4A373]/20'}`}>
        <MotionDiv initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center justify-center gap-16">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3 h-3" />
            {isDemoMode ? "MODE DÉMO ACTIF" : "INFRASTRUCTURE IA SOUVERAINE SÉNÉGALAISE ACTIVE"}
          </span>
          <span className="hidden lg:flex items-center gap-2 border-l border-white/20 pl-16">
            <Activity className="w-3 h-3 text-green-500 animate-pulse" /> IA : Haute Disponibilité
          </span>
        </MotionDiv>
      </div>
      
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-22 py-2">
            <Link to="/" className="flex items-center space-x-4 group">
              <AgriScanLogo className="w-12 h-12 group-hover:rotate-12 transition-transform duration-500" />
              <div className="flex flex-col">
                <span className="text-2xl font-black text-gray-900 leading-none tracking-tight uppercase">AgriScan<span className="text-[#2D6A4F]">+</span></span>
                <span className="text-[9px] font-black text-[#7B4B2A] uppercase tracking-[0.3em] mt-1">Souveraineté Digitale</span>
              </div>
            </Link>

            <nav className="hidden xl:flex items-center space-x-1">
              {navLinks.map((link) => (
                (!link.adminOnly || (user && user.role === 'admin')) && (
                  <Link key={link.path} to={link.path} className={`flex items-center space-x-2 px-4 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${location.pathname === link.path ? 'bg-[#2D6A4F] text-white shadow-xl' : 'text-gray-500 hover:text-[#2D6A4F] hover:bg-gray-50'}`}>
                    <link.icon className="w-4 h-4" />
                    <span>{link.name}</span>
                  </Link>
                )
              ))}
            </nav>

            <div className="flex items-center space-x-4">
              {user ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="hidden sm:flex flex-col items-end group">
                    <div className="flex items-center text-[#2D6A4F] bg-green-50 px-3 py-1 rounded-full border border-green-100 mb-1">
                      <span className="text-[8px] font-black uppercase tracking-widest mr-2">{user.role === 'admin' ? 'ADMIN' : 'IDENTIFIÉ'}</span>
                      <Shield className="w-2.5 h-2.5" />
                    </div>
                    <span className="text-xs font-black text-gray-900 uppercase tracking-tighter">{user.name}</span>
                  </Link>
                  <button onClick={logout} className="bg-white border border-gray-100 text-gray-400 p-3 rounded-2xl hover:bg-red-50 hover:text-red-600 transition-all shadow-sm">
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link to="/auth" className="flex items-center space-x-3 bg-gray-900 text-white px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-[#2D6A4F] transition-all transform hover:scale-105 active:scale-95">
                  <UserIcon className="w-4 h-4" />
                  <span>Se Connecter</span>
                </Link>
              )}
              <button onClick={() => setIsOpen(!isOpen)} className="xl:hidden p-3 rounded-2xl text-gray-700 bg-gray-50 border border-gray-100">
                {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <MotionDiv initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="xl:hidden bg-white border-t border-gray-100 shadow-2xl overflow-hidden">
              <div className="px-6 pt-8 pb-14 space-y-3">
                {navLinks.map((link) => (
                  (!link.adminOnly || (user && user.role === 'admin')) && (
                    <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className={`flex items-center space-x-5 px-6 py-5 rounded-[30px] text-xs font-black uppercase tracking-widest transition-all ${location.pathname === link.path ? 'bg-[#2D6A4F] text-white shadow-xl' : 'text-gray-700 hover:bg-gray-50'}`}>
                      <link.icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </Link>
                  )
                ))}
              </div>
            </MotionDiv>
          )}
        </AnimatePresence>
      </header>
    </div>
  );
};

const App: React.FC = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isDemoMode, setDemoMode] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('agriscan_session');
    if (saved) setUser(JSON.parse(saved));
    setLoading(false);
  }, []);

  const login = (userData: UserData) => { setUser(userData); localStorage.setItem('agriscan_session', JSON.stringify(userData)); };
  const logout = () => { setUser(null); localStorage.removeItem('agriscan_session'); setDemoMode(false); };

  if (loading) return null;

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      isDemoMode, 
      setDemoMode,
      iaStatus: isDemoMode ? 'demo' : 'online'
    }}>
      <ApiKeyGuard>
        <HashRouter>
          <div className="min-h-screen flex flex-col font-sans selection:bg-[#2D6A4F] selection:text-white">
            <Header />
            <main className="flex-grow bg-white">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/auth" element={user ? <Navigate to="/" replace /> : <AuthPage />} />
                <Route path="/admis" element={<ProtectedRoute adminOnly><AdminDashboardPage /></ProtectedRoute>} />
                <Route path="/analyse-sol" element={<ProtectedRoute><SoilAnalysisPage /></ProtectedRoute>} />
                <Route path="/carte" element={<ProtectedRoute><InteractiveMapPage /></ProtectedRoute>} />
                <Route path="/assistant-ia" element={<ProtectedRoute><AIChatPage /></ProtectedRoute>} />
                <Route path="/marketplace" element={<ProtectedRoute><MarketplacePage /></ProtectedRoute>} />
                <Route path="/academie" element={<AcademyPage />} />
                <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
                <Route path="/recommandations" element={<RecommendationsPage />} />
                <Route path="/calcul-densite" element={<DensityCalculatorPage />} />
                <Route path="/pratiques-endogenes" element={<KnowledgePage />} />
                <Route path="/meteo" element={<ProtectedRoute><WeatherPage /></ProtectedRoute>} />
                <Route path="/vision" element={<ProtectedRoute><PestDetectionPage /></ProtectedRoute>} />
              </Routes>
            </main>
          </div>
        </HashRouter>
      </ApiKeyGuard>
    </AuthContext.Provider>
  );
};

export default App;
