import { m, useScroll, useTransform } from 'framer-motion';
import {
  Monitor,
  Smartphone,
  Server,
  Database,
  Cloud,
  Lock,
  Lightbulb,
  Zap,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

interface Service {
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  details: string;
  example: string;
}

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslation();

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      className="relative h-[410px] w-full perspective-1000"
    >
      <m.div
        className="w-full h-full relative transform-style-3d cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200, damping: 22 }}
      >
        {/* Front Face (Neumorphic Extruded Card) */}
        <div
          onClick={() => setIsFlipped(true)}
          className="absolute inset-0 w-full h-full backface-hidden p-8 rounded-[28px] nm-flat hover:nm-flat-lg transition-shadow duration-300 flex flex-col items-start justify-between group"
        >
          <div className="w-full">
            {/* Inset Icon Well */}
            <div className="h-14 w-14 rounded-2xl nm-inset-sm text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
              <service.icon size={26} />
            </div>

            {/* Service Title */}
            <h3 className="text-2xl font-bold mb-3 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {service.title}
            </h3>

            {/* Description */}
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal text-sm sm:text-base">
              {service.description}
            </p>
          </div>

          {/* Tactile Pill Button */}
          <div className="nm-flat-sm group-hover:nm-flat px-4 py-2 rounded-full text-xs font-bold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-shadow">
            <span>{t('services.click_more')}</span>
            <ChevronRight
              size={14}
              className="text-blue-600 dark:text-blue-400 transition-transform group-hover:translate-x-0.5"
            />
          </div>
        </div>

        {/* Back Face (Neumorphic Blueprint Details Panel) */}
        <div
          onClick={() => setIsFlipped(false)}
          className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 p-8 rounded-[28px] bg-gradient-to-br from-[#deebf7] via-[#e5eef8] to-[#d8e6f5] dark:from-[#313742] dark:via-[#2b2f36] dark:to-[#202329] border border-blue-300/30 dark:border-blue-500/20 shadow-xl flex flex-col justify-between relative overflow-hidden group"
        >
          <div className="w-full">
            {/* Header with flip back indicator */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl nm-inset-sm text-amber-500 bg-white/40 dark:bg-black/20">
                  <Lightbulb size={16} />
                </div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                  {t('services.example_label')}
                </h4>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsFlipped(false);
                }}
                className="nm-flat-sm active:nm-inset-sm p-1.5 rounded-full text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                aria-label="Flip card back"
              >
                <RotateCcw size={14} />
              </button>
            </div>

            {/* Example Well */}
            <div className="nm-inset-sm bg-white/50 dark:bg-black/30 rounded-2xl p-4 mb-4">
              <p className="text-slate-800 dark:text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">
                {service.example}
              </p>
            </div>

            {/* Details Section */}
            <div className="space-y-1">
              <h5 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                {t('services.more_info')}
              </h5>
              <p className="text-slate-700 dark:text-slate-300 text-xs sm:text-sm leading-relaxed font-normal">
                {service.details}
              </p>
            </div>
          </div>
        </div>
      </m.div>
    </m.div>
  );
};

const Services = () => {
  const { t } = useTranslation();

  const services = [
    {
      title: t('services.items.web_development.title'),
      description: t('services.items.web_development.description'),
      icon: Monitor,
      details: t('services.items.web_development.details'),
      example: t('services.items.web_development.example'),
    },
    {
      title: t('services.items.mobile_apps.title'),
      description: t('services.items.mobile_apps.description'),
      icon: Smartphone,
      details: t('services.items.mobile_apps.details'),
      example: t('services.items.mobile_apps.example'),
    },
    {
      title: t('services.items.backend_solutions.title'),
      description: t('services.items.backend_solutions.description'),
      icon: Server,
      details: t('services.items.backend_solutions.details'),
      example: t('services.items.backend_solutions.example'),
    },
    {
      title: t('services.items.database_design.title'),
      description: t('services.items.database_design.description'),
      icon: Database,
      details: t('services.items.database_design.details'),
      example: t('services.items.database_design.example'),
    },
    {
      title: t('services.items.cloud_infrastructure.title'),
      description: t('services.items.cloud_infrastructure.description'),
      icon: Cloud,
      details: t('services.items.cloud_infrastructure.details'),
      example: t('services.items.cloud_infrastructure.example'),
    },
    {
      title: t('services.items.cybersecurity.title'),
      description: t('services.items.cybersecurity.description'),
      icon: Lock,
      details: t('services.items.cybersecurity.details'),
      example: t('services.items.cybersecurity.example'),
    },
  ];

  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['end end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={containerRef} id="services" className="py-24 md:py-36 relative z-10">
      <m.div style={{ opacity, willChange: 'opacity' }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 nm-pill-inset px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-4">
              <Zap size={14} />
              <span>{t('services.title')}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Powerful Capabilities
            </h2>
          </div>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-md">
            Everything you need to succeed, built with precision, craftsmanship, and care.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </m.div>
    </section>
  );
};

export default Services;
