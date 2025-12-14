import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { PenTool, Rocket, Code, ClipboardCheck } from 'lucide-react';

const steps = [
  {
    id: 1,
    title: 'Design',
    subtitle: 'Crafting Visual Brilliance',
    description:
      "Every great product begins with vision. We don't just design; we shape emotion, intent, and usability into captivating visuals that leave lasting impressions. Your brand's soul starts breathing here.",
    tags: ['UI/UX Design', 'Prototyping', 'Design System'],
    stats: [
      { label: 'Designs Delivered', value: '700+' },
      { label: 'Reusable Components', value: '100+' },
      { label: 'Creative Iterations', value: '∞' },
    ],
    icon: PenTool,
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 2,
    title: 'Development',
    subtitle: 'Architecture Meets Artistry',
    description:
      'We translate potential into performance. Using cutting-edge frameworks like React and Node.js, we build scalable, lightning-fast applications that stand the test of time.',
    tags: ['React', 'Node.js', 'Typescript', 'Tailwind'],
    stats: [
      { label: 'Code Quality', value: 'A+' },
      { label: 'Test Coverage', value: '95%' },
      { label: 'Performance', value: '100%' },
    ],
    icon: Code,
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 3,
    title: 'Test',
    subtitle: 'Perfection is the Standard',
    description:
      "We don't just hope it works; we prove it. Through rigorous automated testing, user acceptance trials, and stress testing, we ensure your product is bulletproof before it ever meets the world.",
    tags: ['E2E Testing', 'Cypress', 'Jest', 'QA'],
    stats: [
      { label: 'Test Coverage', value: '100%' },
      { label: 'Bugs Swatted', value: 'Zero' },
      { label: 'Reliability', value: '99.99%' },
    ],
    icon: ClipboardCheck,
    color: 'from-orange-400 to-red-500',
  },
  {
    id: 4,
    title: 'Launch',
    subtitle: 'When We Launch, We Soar',
    description:
      "Going live isn't just a date—it's a declaration. With rigorous testing, airtight security, and around-the-clock monitoring, we launch your vision with confidence, clarity, and celebration.",
    tags: ['Monitoring', 'Analytics', 'Support'],
    stats: [
      { label: 'Uptime', value: '99.99%' },
      { label: 'Security Grade', value: 'A+' },
      { label: 'Client Support', value: '24/7' },
    ],
    icon: Rocket,
    color: 'from-blue-500 to-indigo-500',
  },
];

const ProcessStep = ({ step }: { step: (typeof steps)[0]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);

  return (
    <motion.div ref={ref} style={{ opacity, scale }} className="mb-16 md:mb-32 last:mb-0 relative">
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 items-start">
        {/* Number / Icon Column */}
        <div className="hidden md:flex flex-col items-center sticky top-32">
          <div
            className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white shadow-lg`}
          >
            <step.icon size={32} />
          </div>
          <div className="h-full w-px bg-slate-200 dark:bg-white/10 my-4 absolute top-16 -z-10 h-[calc(100%+128px)]" />
        </div>

        {/* Content Column */}
        <div className="flex-1 bg-white dark:bg-zinc-900/50 rounded-3xl p-6 md:p-12 border border-slate-100 dark:border-white/5 shadow-2xl shadow-slate-200/50 dark:shadow-none backdrop-blur-sm">
          <div className="flex items-center gap-4 mb-4 md:mb-6 md:hidden">
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white`}
            >
              <step.icon size={20} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{step.title}</h3>
          </div>

          <h3 className="hidden md:block text-4xl font-bold text-slate-900 dark:text-white mb-2">
            {step.title}
          </h3>
          <h4
            className={`text-lg md:text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r ${step.color} mb-4 md:mb-6`}
          >
            {step.subtitle}
          </h4>

          <p className="text-base md:text-lg text-slate-600 dark:text-gray-300 leading-relaxed mb-6 md:mb-8">
            {step.description}
          </p>

          <div className="flex flex-wrap gap-2 md:gap-3 mb-8 md:mb-10">
            {step.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 md:px-4 md:py-2 rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-gray-300 text-xs md:text-sm font-medium border border-slate-200 dark:border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8 border-t border-slate-100 dark:border-white/5">
            {step.stats.map((stat, i) => (
              <div key={i} className="bg-slate-50 dark:bg-black/20 p-3 md:p-4 rounded-xl">
                <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-xs md:text-sm text-slate-500 dark:text-gray-400 font-medium">
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
  return (
    <section id="development" className="py-20 md:py-32 relative z-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight">
            Our Development Process
          </h2>
          <p className="text-lg md:text-xl text-slate-600 dark:text-gray-400 max-w-2xl mx-auto">
            From concept to launch, we follow a comprehensive development pipeline ensuring quality
            and excellence at every step.
          </p>
        </motion.div>

        <div className="relative">
          {/* Central Line for mobile if needed, or stick to the per-item line */}
          {steps.map((step, index) => (
            <ProcessStep key={step.id} step={step} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Process;
