// import { Github, Twitter, Linkedin } from 'lucide-react';
import logo from '../../assets/logo.png';
import logoWhite from '../../assets/logo-dark.png';
import { useTheme } from '../../lib/theme';

const Footer = () => {
  const { theme } = useTheme();
  return (
    <footer className="bg-slate-50 dark:bg-black/20 backdrop-blur-sm border-t border-slate-200 dark:border-white/5 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col` md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a
              href="#"
              className="flex-row flex items-center text-xl font-bold text-slate-900 dark:text-white transition-colors"
            >
            <img src={theme === 'dark' ? logoWhite : logo} alt="Fiction Dev" className="h-6 w-auto pr-2" />

              <span
              className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight"
            >
              Fiction<span className="text-blue-600 dark:text-blue-400">Dev</span>
            </span>
            </a>
            <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
              © {new Date().getFullYear()} Fiction Development. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
