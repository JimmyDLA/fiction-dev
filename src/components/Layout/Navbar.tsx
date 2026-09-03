import { useTheme } from '../../lib/theme';
import { Moon, Sun, Menu, X, Globe, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation, Link } from 'react-router-dom';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const { t, i18n } = useTranslation();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { name: t('nav.about'), id: 'about' },
    { name: t('nav.development'), id: 'development' },
    { name: t('nav.services'), id: 'services' },
    { name: t('nav.contact'), id: 'contact' },
  ];

  const handleNavClick = (id: string) => {
    setIsOpen(false);

    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLangMenuOpen(false);
    setIsOpen(false);
  };

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'fr', label: 'FR' },
    { code: 'it', label: 'IT' },
  ];

  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node) && isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleHomeClick = () => {
    navigate('/');
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <motion.header
      ref={navRef}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 sm:px-6 lg:px-8 pointer-events-none"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between pointer-events-auto">
        {/* Brand Logo Extruded Capsule */}
        <div
          onClick={handleHomeClick}
          className="nm-flat-sm hover:nm-flat px-4 py-2.5 rounded-2xl flex items-center gap-3 cursor-pointer transition-all duration-300 group"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && handleHomeClick()}
          aria-label="Fiction Dev Home"
        >
          <span className="text-lg sm:text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Fiction<span className="text-blue-600 dark:text-blue-400">Dev</span>
          </span>
        </div>

        {/* Center Desktop Navigation Pill Bar */}
        <nav
          className="hidden md:flex items-center gap-1.5 nm-flat-sm p-1.5 rounded-full"
          aria-label="Main Navigation"
        >
          {links.map((link) => (
            <button
              key={link.name}
              onClick={() => handleNavClick(link.id)}
              className="px-4 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:nm-inset-sm active:nm-inset-sm transition-all duration-200"
            >
              {link.name}
            </button>
          ))}
        </nav>

        {/* Right Action Tools & CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* Language Switcher */}
          <div className="relative">
            <button
              onClick={() => setLangMenuOpen(!langMenuOpen)}
              className="nm-flat-sm hover:nm-flat active:nm-inset-sm p-2.5 rounded-full transition-all flex items-center gap-1.5 text-slate-700 dark:text-slate-300"
              aria-label="Change language"
              aria-expanded={langMenuOpen}
            >
              <Globe size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider">
                {i18n.language.split('-')[0]}
              </span>
            </button>

            <AnimatePresence>
              {langMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-28 nm-flat rounded-2xl py-2 overflow-hidden z-50"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                        i18n.language.startsWith(lang.code)
                          ? 'text-blue-600 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-950/40'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100/60 dark:hover:bg-white/5'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="nm-flat-sm hover:nm-flat active:nm-inset-sm p-2.5 rounded-full transition-all text-slate-700 dark:text-slate-300"
            aria-label="Toggle light or dark theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-blue-600" />
            )}
          </button>

          {/* CTA Pill Button */}
          <Link to="/start-project">
            <button className="nm-btn-accent px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-1.5 group">
              <span>{t('hero.start_project')}</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
            </button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="nm-flat-sm active:nm-inset-sm p-2.5 rounded-full text-slate-700 dark:text-slate-300"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-amber-400" />
            ) : (
              <Moon size={18} className="text-blue-600" />
            )}
          </button>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="nm-flat-sm active:nm-inset-sm p-2.5 rounded-2xl text-slate-700 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="md:hidden mt-3 max-w-lg mx-auto nm-flat-lg rounded-3xl p-5 overflow-hidden pointer-events-auto"
          >
            <div className="space-y-2">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id)}
                  className="block w-full text-left px-4 py-3 rounded-2xl text-base font-semibold text-slate-800 dark:text-slate-200 hover:nm-inset-sm active:nm-inset-sm transition-all"
                >
                  {link.name}
                </button>
              ))}

              <div className="flex items-center gap-2 pt-3 pb-1 px-1">
                <span className="text-xs font-semibold text-slate-500 uppercase mr-2">
                  Language:
                </span>
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      i18n.language.startsWith(lang.code)
                        ? 'nm-inset-sm text-blue-600 dark:text-blue-400'
                        : 'nm-flat-sm text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <div className="pt-3">
                <Link to="/start-project" onClick={() => setIsOpen(false)}>
                  <button className="w-full nm-btn-accent py-3 rounded-2xl font-bold flex items-center justify-center gap-2">
                    <span>{t('hero.start_project')}</span>
                    <ArrowRight size={18} />
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
