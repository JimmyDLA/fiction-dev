import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Award, Zap, Clock, TrendingUp } from 'lucide-react';
import { useRef } from 'react';

const About = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['end end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  const stats = [
    {
      value: '500k+',
      label: t('about.projects'),
      subtitle: '+12% this month',
      icon: Award,
    },
    {
      value: '99.99%',
      label: 'UPTIME SLA',
      subtitle: 'Enterprise grade',
      icon: Zap,
    },
    {
      value: '24/7',
      label: t('about.support'),
      subtitle: 'Global coverage',
      icon: Clock,
    },
    {
      value: '$10M+',
      label: 'CLIENT VALUE',
      subtitle: 'Annual impact',
      icon: TrendingUp,
    },
  ];

  return (
    <section ref={containerRef} id="about" className="py-24 md:py-36 relative overflow-hidden z-10">
      <motion.div style={{ opacity, willChange: 'opacity' }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mb-16 md:mb-20"
        >
          <div className="inline-flex items-center gap-2 nm-pill-inset px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-6">
            <span>About Fiction Dev</span>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-8 leading-[1.05]">
            {t('about.title_start')} <br />
            <span className="text-slate-400 dark:text-slate-500 font-semibold">
              {t('about.title_middle')}
            </span>{' '}
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-sky-500 dark:from-blue-400 dark:to-sky-400 bg-clip-text text-transparent">
              {t('about.title_end')}
            </span>
          </h2>

          <div className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed space-y-4 font-normal max-w-3xl">
            <p>{t('about.p1')}</p>
            <p>{t('about.p2')}</p>
          </div>
        </motion.div>

        {/* Neumorphic Stats Trough & Extruded Cards (Matching Reference Image 1) */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="nm-inset-deep rounded-3xl p-8 sm:p-12 md:p-12"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.1, y: -4 }}
                viewport={{ once: true }}
                transition={{
                  default: { duration: 0.5, delay: idx * 0.1 },
                  scale: { type: 'spring', stiffness: 350, damping: 22 },
                  y: { type: 'spring', stiffness: 350, damping: 22 },
                }}
                className="nm-flat hover:nm-flat-lg rounded-2xl p-6 sm:p-8 text-center flex flex-col items-center justify-center transition-shadow duration-300 cursor-pointer select-none group"
              >
                <div className="text-4xl sm:text-5xl font-black tracking-tight text-blue-600 dark:text-blue-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-wider uppercase text-slate-800 dark:text-slate-200 mb-1">
                  {stat.label}
                </div>
                <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {stat.subtitle}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default About;
