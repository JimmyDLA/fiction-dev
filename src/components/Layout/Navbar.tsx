import { useTheme } from '../../lib/theme';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { name: 'About', href: '#about' },
    { name: 'Development', href: '#development' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
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
          <div className="flex-shrink-0">
            <a
              href="#"
              className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              Fiction<span className="text-blue-600 dark:text-blue-400">Dev</span>
            </a>
          </div>

          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              {links.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="px-3 py-2 rounded-full text-sm font-medium text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-blue-50 dark:hover:bg-white/10 transition-all duration-300"
                >
                  {link.name}
                </a>
              ))}
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
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-white hover:bg-gray-700"
                >
                  {link.name}
                </a>
              ))}
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
