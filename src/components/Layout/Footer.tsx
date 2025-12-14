// import { Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-black/20 backdrop-blur-sm border-t border-slate-200 dark:border-white/5 py-12 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <a
              href="#"
              className="text-xl font-bold text-slate-900 dark:text-white transition-colors"
            >
              Fiction<span className="text-blue-600 dark:text-blue-400">Dev</span>
            </a>
            <p className="mt-2 text-sm text-slate-500 dark:text-gray-400">
              © {new Date().getFullYear()} Fiction Development. All rights reserved.
            </p>
          </div>

          {/* Social Icons Removed for now */}
          {/* <div className="flex space-x-6">
            <a
              href="#"
              className="text-slate-400 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <Github size={24} />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-400 dark:text-gray-400 dark:hover:text-blue-400 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <Twitter size={24} />
            </a>
            <a
              href="#"
              className="text-slate-400 hover:text-blue-700 dark:text-gray-400 dark:hover:text-blue-600 transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <Linkedin size={24} />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
