import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  User, 
  Menu, 
  X, 
  LogOut, 
  Heart,
  Droplet,
  Globe,
  ChevronDown,
  Check
} from 'lucide-react';

export default function Navbar() {
  const { currentUser, userRole, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Close language dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setLangDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: t('home'), path: '/' },
    { name: t('about'), path: '/about' },
    { name: t('donate'), path: '/register' },
    { name: t('gallery'), path: '/gallery' },
    { name: t('contact'), path: '/contact' },
  ];

  const languages = [
    { code: 'en', name: 'English', label: 'EN' },
    { code: 'hi', name: 'हिंदी (Hindi)', label: 'हिं' },
    { code: 'mr', name: 'मराठी (Marathi)', label: 'मरा' }
  ];

  const currentLangObj = languages.find(l => l.code === language) || languages[0];

  const getPortalPath = () => {
    switch(userRole) {
      case 'super_admin': return '/super-admin/dashboard';
      case 'admin': return '/admin/dashboard';
      default: return '/donor/dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm font-sans">
      
      {/* Main Navbar Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo (Left) */}
          <Link to="/" className="flex items-center gap-3">
            <div className="relative w-10 h-10 rounded-full bg-trustred-700 flex items-center justify-center text-white shadow-md">
              <Droplet className="w-6 h-6 fill-current text-white" />
              <Heart className="w-3.5 h-3.5 fill-white text-white absolute inset-0 m-auto mt-3.5" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
                BLOOD <span className="text-trustred-700">TRUST</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-500">
                {t('tagline')}
              </span>
            </div>
          </Link>

          {/* Nav Links (Center) */}
          <nav className="hidden lg:flex items-center space-x-5 text-sm font-semibold">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`py-2 relative transition-colors ${
                    isActive
                      ? 'text-trustred-700 font-bold border-b-2 border-trustred-700'
                      : 'text-slate-700 hover:text-trustred-700'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Header Controls: Language Selector + Auth Buttons */}
          <div className="flex items-center gap-3">
            
            {/* LANGUAGE SELECTOR DROPDOWN */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setLangDropdownOpen(prev => !prev)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-extrabold text-xs transition border border-slate-200/80"
                title="Change Language"
              >
                <Globe className="w-4 h-4 text-trustred-700" />
                <span>{currentLangObj.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${langDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Language Dropdown Menu */}
              {langDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="px-3 py-1.5 border-b border-slate-100 text-[10px] font-extrabold uppercase text-slate-400">
                    {t('selectLanguage')}
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setLangDropdownOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs font-bold transition ${
                        language === lang.code
                          ? 'bg-red-50 text-trustred-700 font-black'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span>{lang.name}</span>
                      {language === lang.code && <Check className="w-4 h-4 text-trustred-700" />}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Buttons (Desktop) */}
            <div className="hidden sm:flex items-center gap-2">
              {currentUser ? (
                <div className="flex items-center gap-2">
                  <Link
                    to={getPortalPath()}
                    className="px-5 py-2.5 rounded-xl bg-trustred-700 hover:bg-trustred-800 text-white font-bold text-xs shadow transition flex items-center gap-2"
                  >
                    <User className="w-4 h-4" />
                    <span>{t('portal')} ({userRole.replace('_', ' ')})</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="p-2 text-slate-500 hover:text-trustred-700"
                    title="Logout"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link
                  to="/login"
                  className="px-5 py-2.5 rounded-xl bg-trustred-700 hover:bg-trustred-800 text-white font-bold text-xs shadow transition flex items-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>{t('loginRegister')}</span>
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className="lg:hidden p-2 text-slate-700 hover:bg-slate-100 rounded-xl"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4">
          
          {/* Navigation links */}
          <div className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="block py-2 text-sm font-bold text-slate-700 hover:text-trustred-700"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Mobile Language Selector */}
          <div className="pt-3 border-t border-slate-100 space-y-2">
            <div className="text-[10px] font-extrabold uppercase text-slate-400 flex items-center gap-1">
              <Globe className="w-3.5 h-3.5 text-trustred-700" />
              <span>{t('selectLanguage')}</span>
            </div>
            <div className="flex gap-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setMobileMenuOpen(false);
                  }}
                  className={`flex-1 py-2 rounded-xl text-xs font-extrabold border transition ${
                    language === lang.code
                      ? 'bg-trustred-700 text-white border-trustred-700 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200'
                  }`}
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Login / Register Button */}
          <div className="pt-2 border-t border-slate-100">
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block w-full text-center py-2.5 bg-trustred-700 text-white rounded-xl font-bold text-xs shadow-md"
            >
              {t('loginRegister')}
            </Link>
          </div>
        </div>
      )}

    </header>
  );
}
