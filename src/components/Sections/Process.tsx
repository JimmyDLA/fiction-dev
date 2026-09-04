import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PenTool, Rocket, Code, ClipboardCheck, Sparkles } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface ProcessStatItem {
  label: string;
  value: string;
}

interface ProcessStepItem {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  stats: ProcessStatItem[];
  icon: React.ComponentType<{ size?: number; className?: string }>;
  accentColor: string;
}

const useProcessSteps = (): ProcessStepItem[] => {
  const { t } = useTranslation();
  return [
    {
      id: 1,
      title: t('process.design.title'),
      subtitle: t('process.design.subtitle'),
      description: t('process.design.description'),
      tags: ['UI/UX Design', 'Prototyping', 'Design System'],
      stats: [
        { label: t('process.design.stat1'), value: '700+' },
        { label: t('process.design.stat2'), value: '100+' },
        { label: t('process.design.stat3'), value: '∞' },
      ],
      icon: PenTool,
      accentColor: 'text-purple-600 dark:text-purple-400',
    },
    {
      id: 2,
      title: t('process.development.title'),
      subtitle: t('process.development.subtitle'),
      description: t('process.development.description'),
      tags: ['React', 'Node.js', 'TypeScript', 'Tailwind'],
      stats: [
        { label: t('process.development.stat1'), value: 'A+' },
        { label: t('process.development.stat2'), value: '95%' },
        { label: t('process.development.stat3'), value: '100%' },
      ],
      icon: Code,
      accentColor: 'text-sky-600 dark:text-sky-400',
    },
    {
      id: 3,
      title: t('process.test.title'),
      subtitle: t('process.test.subtitle'),
      description: t('process.test.description'),
      tags: ['E2E Testing', 'Cypress', 'Jest', 'QA'],
      stats: [
        { label: t('process.test.stat1'), value: '100%' },
        { label: t('process.test.stat2'), value: 'Zero' },
        { label: t('process.test.stat3'), value: '99.99%' },
      ],
      icon: ClipboardCheck,
      accentColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 4,
      title: t('process.launch.title'),
      subtitle: t('process.launch.subtitle'),
      description: t('process.launch.description'),
      tags: ['Monitoring', 'Analytics', 'Support'],
      stats: [
        { label: t('process.launch.stat1'), value: '99.99%' },
        { label: t('process.launch.stat2'), value: 'A+' },
        { label: t('process.launch.stat3'), value: '24/7' },
      ],
      icon: Rocket,
      accentColor: 'text-green-600 dark:text-green-400',
    },
  ];
};

const ProcessStep = ({ step, index }: { step: ProcessStepItem; index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="mb-16 md:mb-24 last:mb-0 relative"
    >
      <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-start">
        {/* Sticky Tactile Step Number & Icon Column */}
        <div className="hidden md:flex flex-col items-center sticky top-36">
          <div className="w-16 h-16 rounded-2xl nm-flat hover:nm-flat-lg flex items-center justify-center text-slate-800 dark:text-white transition-all">
            <step.icon size={28} className={step.accentColor} />
          </div>
          <div className="w-0.5 h-32 nm-inset-sm my-3 -z-10" />
        </div>

        {/* Extruded Neumorphic Step Card */}
        <div className="flex-1 nm-flat hover:nm-flat-lg rounded-[28px] p-6 sm:p-10 transition-all duration-300">
          <div className="flex items-center gap-4 mb-4 md:hidden">
            <div className="w-12 h-12 rounded-xl nm-inset-sm flex items-center justify-center">
              <step.icon size={22} className={step.accentColor} />
            </div>
            <div>
              <span className={`${step.accentColor} text-xs font-bold uppercase tracking-wider`}>
                Step 0{index + 1}
              </span>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-between mb-2">
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
            <span className={`nm-pill-inset px-3.5 py-1 text-xs font-bold ${step.accentColor}`}>
              Phase 0{index + 1}
            </span>
          </div>

          <h4 className={`text-lg font-semibold ${step.accentColor} mb-4`}>{step.subtitle}</h4>

          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-6 font-normal">
            {step.description}
          </p>

          {/* Inset Tags */}
          <div className="flex flex-wrap gap-2.5 mb-8">
            {step.tags.map((tag: string) => (
              <span
                key={tag}
                className={`nm-inset-sm px-3.5 py-1.5 rounded-full text-slate-700 dark:text-slate-300 text-xs sm:text-sm font-medium ${step.accentColor}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Stats Wells */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-200/50 dark:border-white/5">
            {step.stats.map((stat: ProcessStatItem, i: number) => (
              <div key={i} className="nm-inset-sm p-4 rounded-2xl text-center">
                <div className={step.accentColor + ' text-xl sm:text-2xl font-bold mb-1'}>
                  {stat.value}
                </div>
                <div className="text-xs text-slate-600 dark:text-slate-400 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Process = () => {
  const steps = useProcessSteps();
  const { t } = useTranslation();
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['end end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section ref={containerRef} id="development" className="py-24 md:py-36 relative z-10">
      <motion.div style={{ opacity, willChange: 'opacity' }} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <div className="inline-flex items-center gap-2 nm-pill-inset px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-4">
            <Sparkles size={14} />
            <span>Workflow & Pipeline</span>
          </div>

          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            {t('process.title')}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            {t('process.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          {steps.map((step, index) => (
            <ProcessStep key={step.id} step={step} index={index} />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Process;
