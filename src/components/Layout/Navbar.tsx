import { useTheme } from '../../lib/theme';
import { Moon, Sun, Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useNavigate, useLocation } from 'react-router-dom';

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
    if (location.pathname === '/') {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/', { state: { scrollTo: id } });
    }
    setIsOpen(false);
  };
  
  // Handle scroll on mount if navigating from another page
  // This logic works with the useEffect in App.tsx or similar logic can be added here
  
  // Note: we need to update the render loop to use buttons instead of 'a' tags or keep 'a' tags with preventDefault
  
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

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-black/80 backdrop-blur-md border-b border-transparent dark:border-white/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
            <span
              className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              Fiction<span className="text-blue-600 dark:text-blue-400">Dev</span>
            </span>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id)}
                  className="px-3 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-white/10 transition-all duration-300"
                >
                  {link.name}
                </button>
              ))}
              
              {/* Language Switcher */}
              <div className="relative">
                <button
                  onClick={() => setLangMenuOpen(!langMenuOpen)}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors flex items-center gap-1 text-slate-600 dark:text-slate-300"
                  aria-label="Change language"
                >
                  <Globe size={20} />
                  <span className="text-xs font-bold uppercase">{i18n.language.split('-')[0]}</span>
                </button>
                
                <AnimatePresence>
                  {langMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 mt-2 w-24 bg-white dark:bg-zinc-900 rounded-xl shadow-lg border border-slate-100 dark:border-white/5 py-1 overflow-hidden"
                    >
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          onClick={() => changeLanguage(lang.code)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-blue-50 dark:hover:bg-white/5 transition-colors ${
                            i18n.language === lang.code
                              ? 'text-blue-600 dark:text-blue-400 font-bold'
                              : 'text-slate-600 dark:text-gray-400'
                          }`}
                        >
                          {lang.label}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun size={20} className="text-yellow-400" />
                ) : (
                  <Moon size={20} className="text-slate-600" />
                )}
              </button>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-black/95 backdrop-blur-xl"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {links.map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.id)}
                  className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-gray-700"
                >
                  {link.name}
                </button>
              ))}
              
              <div className="flex items-center gap-2 px-3 py-2">
                 {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => changeLanguage(lang.code)}
                      className={`px-3 py-1 rounded-md text-sm font-medium border border-slate-200 dark:border-white/10 ${
                        i18n.language === lang.code
                          ? 'bg-blue-600 text-white border-blue-600'
                          : 'bg-white dark:bg-white/5 text-slate-600 dark:text-gray-300'
                      }`}
                    >
                      {lang.label}
                    </button>
                 ))}
              </div>

              <button
                onClick={toggleTheme}
                className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-gray-300 hover:text-white hover:bg-gray-700 flex items-center gap-2"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun size={20} className="text-yellow-400" /> Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={20} className="text-blue-400" /> Dark Mode
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
