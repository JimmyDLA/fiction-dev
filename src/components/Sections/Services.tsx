import { m } from 'framer-motion';
import { Monitor, Smartphone, Server, Database, Cloud, Lock, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Service {
  title: string;
  description: string;
  icon: any;
  details: string;
  example: string;
}

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="relative h-96 perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <m.div
        className="w-full h-full relative transform-style-3d cursor-pointer will-change-transform"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden">
          <m.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
            className="h-full group p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 shadow-lg shadow-slate-200/50 dark:shadow-none hover:border-blue-300 dark:hover:border-blue-500/50 transition-all duration-300 flex flex-col items-start justify-center"
          >
            <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/40 dark:to-blue-800/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-6 shadow-inner border border-white/50 dark:border-white/10 group-hover:scale-110 transition-transform duration-300">
              <service.icon size={26} />
            </div>
            <h3 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {service.title}
            </h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium mb-6">
              {service.description}
            </p>
            <div className="mt-auto text-sm font-semibold text-blue-600 dark:text-blue-400 flex items-center gap-1">
              {t('services.click_more')} <span className="text-lg">→</span>
            </div>
          </m.div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 h-full w-full">
          <div className="h-full p-8 rounded-3xl bg-blue-600 dark:bg-blue-900/80 text-white border border-blue-500 dark:border-white/10 shadow-xl flex flex-col justify-center relative overflow-hidden">
            {/* Decorative background elements */}
            {/* Decorative background elements - Removed for mobile performance */}

            <div className="relative z-10 flex flex-col h-full">
              {/* Example Section (Top) */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-blue-500/30 border border-blue-400/30">
                    <Lightbulb size={14} className="text-blue-100" />
                  </div>
                  <h3 className="text-lg font-bold text-white">{t('services.example_label')}</h3>
                </div>
                <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-sm hover:bg-white/15 transition-colors">
                  <p className="text-white text-sm font-medium leading-relaxed">
                    {service.example}
                  </p>
                </div>
              </div>

              {/* More Info Section (Bottom) */}
              <div className="mt-auto mb-12">
                <h3 className="text-lg font-bold mb-2 text-white/90">{t('services.more_info')}</h3>
                <p className="text-blue-50/90 dark:text-blue-100/90 text-sm leading-relaxed">
                  {service.details}
                </p>
              </div>
            </div>
          </div>
        </div>
      </m.div>
    </div>
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

  return (
    <section id="services" className="py-20 md:py-32 relative bg-white dark:bg-zinc-900 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-20">
          <m.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            {t('services.title')}
          </m.h2>
          <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-8 md:gap-y-16">
          {services.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
