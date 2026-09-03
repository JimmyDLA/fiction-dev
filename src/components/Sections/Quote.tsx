import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Quote = () => {
  const { t } = useTranslation();

  return (
    <section className="py-20 md:py-28 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="nm-flat-lg rounded-[36px] p-8 sm:p-14 md:p-16 text-center relative overflow-hidden"
        >
          {/* Inset Icon Container */}
          <div className="w-20 h-20 nm-inset-sm rounded-3xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-8">
            <Calculator size={36} />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-6 tracking-tight">
            {t('quote.title')}
          </h2>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
            {t('quote.subtitle')}
          </p>

          <Link to="/start-project?mode=quote">
            <button className="nm-btn-accent px-9 py-4 rounded-full font-bold text-base sm:text-lg inline-flex items-center gap-2 group">
              <span>{t('quote.cta')}</span>
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Quote;

