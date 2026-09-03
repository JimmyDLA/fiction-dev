import { Link } from 'react-router-dom';

const Footer = () => {

  return (
    <footer className="py-12 relative z-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nm-inset-sm rounded-3xl p-8 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Fiction<span className="text-blue-600 dark:text-blue-400">Dev</span>
            </span>
          </div>

          <div className="flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-400">
            <a
              href="#about"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Services
            </a>
            <a
              href="#development"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Process
            </a>
            <Link
              to="/start-project"
              className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              Start Project
            </Link>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-500 font-medium">
            © {new Date().getFullYear()} Fiction Development. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
