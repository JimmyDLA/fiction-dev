import { motion } from 'framer-motion';
import { ArrowRight, Calculator } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

const Quote = () => {
    const { t } = useTranslation();

    return (
        <section className="py-24 bg-blue-600 dark:bg-blue-900 relative is-visible overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 right-0 p-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 p-32 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center"
                >
                    <div className="h-16 w-16 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-white mb-8 border border-white/20 shadow-xl">
                        <Calculator size={32} />
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                        {t('quote.title')}
                    </h2>
                    
                    <p className="text-xl text-blue-100 max-w-2xl mb-10 leading-relaxed">
                        {t('quote.subtitle')}
                    </p>

                    <Link to="/start-project?mode=quote">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-white text-blue-600 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all flex items-center gap-2"
                        >
                            {t('quote.cta')} <ArrowRight size={20} />
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default Quote;
