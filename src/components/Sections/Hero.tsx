import { ArrowDown, ArrowRight, Play } from 'lucide-react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const Hero = () => {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // Subtle Mouse parallax for the graphic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = (clientX - left) / width - 0.5;
    const y = (clientY - top) / height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const springX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 150, damping: 20 });

  const titleX = useTransform(springX, [-0.5, 0.5], [-25, 25]);
  const titleY = useTransform(springY, [-0.5, 0.5], [-25, 25]);

  const widgetRotateX = useTransform(springY, [-0.5, 0.5], [8, -8]);
  const widgetRotateY = useTransform(springX, [-0.5, 0.5], [-8, 8]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-0 lg:min-h-[92vh] flex items-center justify-center pt-24 sm:pt-28 lg:pt-36 pb-12 sm:pb-16 lg:pb-24 overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center"
        >
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-left">
            {/* Headline with Mouse Parallax & Gradient Highlight */}
            <motion.h1
              style={{ x: titleX, y: titleY }}
              className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.08] mb-6"
            >
              {t('hero.making')} <br />
              <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-sky-500 dark:from-blue-400 dark:via-sky-400 dark:to-blue-300 bg-clip-text text-transparent">
                {t('hero.imagination')}
              </span>{' '}
              {t('hero.reality')}
            </motion.h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-xl mb-8 sm:mb-10 leading-relaxed font-normal">
              {t('hero.subtitle')}
            </p>

            {/* Dual Neumorphic Action Buttons (Side-by-side on mobile & desktop) */}
            <div className="flex flex-row items-center gap-3 sm:gap-6 max-w-lg">
              <Link to="/start-project" className="flex-1 sm:flex-initial">
                <button className="nm-btn-accent w-full px-4 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-base lg:text-lg flex items-center justify-center gap-1.5 sm:gap-2 group whitespace-nowrap">
                  <span>{t('hero.start_project')}</span>
                  <ArrowRight
                    size={16}
                    className="transition-transform group-hover:translate-x-1 shrink-0"
                  />
                </button>
              </Link>

              <a href="#services" className="flex-1 sm:flex-initial">
                <button className="nm-btn w-full px-4 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold text-xs sm:text-base lg:text-lg flex items-center justify-center gap-1.5 sm:gap-2 text-slate-800 dark:text-slate-100 whitespace-nowrap">
                  <Play
                    size={13}
                    className="text-blue-600 dark:text-blue-400 fill-blue-600 dark:fill-blue-400 shrink-0"
                  />
                  <span>{t('hero.explore_solutions')}</span>
                </button>
              </a>
            </div>
          </div>

          {/* Right Column: Tactile Neumorphic Web Component Skeleton Widget */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end w-full sm:mt-20 lg:mt-0">
            <motion.div
              style={{ rotateX: widgetRotateX, rotateY: widgetRotateY }}
              className="perspective-1000 relative w-full max-w-[340px] sm:max-w-[400px] lg:max-w-[440px]"
            >
              {/* Outer Recessed Base Plate */}
              <div className="nm-inset-deep rounded-[28px] sm:rounded-[36px] lg:rounded-[40px] p-4 sm:p-6 w-full aspect-[4/3] sm:aspect-square flex flex-col justify-between select-none transition-transform duration-300">
                {/* Skeleton Top Navbar */}
                <div className="flex items-center justify-between w-full pb-1">
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 lg:w-5 lg:h-5 rounded-full bg-blue-600 dark:bg-blue-500 nm-flat-sm" />
                    <div className="w-10 sm:w-14 lg:w-16 h-2 sm:h-2.5 lg:h-3 rounded-full nm-inset-sm" />
                  </div>
                  <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-2">
                    <div className="w-6 sm:w-8 lg:w-10 h-1.5 sm:h-2 lg:h-2.5 rounded-full nm-inset-sm" />
                    <div className="w-5 sm:w-6 lg:w-8 h-1.5 sm:h-2 lg:h-2.5 rounded-full nm-inset-sm" />
                    <div className="w-8 sm:w-10 lg:w-12 h-3.5 sm:h-4 lg:h-5 rounded-full nm-flat-sm bg-blue-50/40 dark:bg-blue-950/40" />
                  </div>
                </div>

                {/* Skeleton Hero / Main Feature Card */}
                <div className="nm-flat rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col gap-2 sm:gap-2.5 lg:gap-3">
                  <div className="w-3/5 h-2.5 sm:h-3.5 lg:h-4 rounded-md nm-inset-sm bg-blue-500/15 dark:bg-blue-400/20" />
                  <div className="space-y-1 sm:space-y-1.5">
                    <div className="w-full h-1.5 sm:h-2 lg:h-2.5 rounded-md nm-inset-sm" />
                    <div className="w-4/5 h-1.5 sm:h-2 lg:h-2.5 rounded-md nm-inset-sm" />
                  </div>
                  <div className="flex items-center justify-between pt-0.5">
                    <div className="w-14 sm:w-16 lg:w-20 h-5 sm:h-6 lg:h-7 rounded-lg bg-gradient-to-r from-blue-600 to-sky-500 shadow-sm shadow-blue-500/30" />
                    <div className="w-6 sm:w-8 lg:w-10 h-2 sm:h-2.5 lg:h-3 rounded-md nm-inset-sm" />
                  </div>
                </div>

                {/* Skeleton Bottom Grid (2 Sub-Cards) */}
                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                  <div className="nm-flat rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-3.5 flex flex-col gap-1.5 sm:gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-md sm:rounded-lg nm-inset-sm" />
                    <div className="w-3/4 h-1.5 sm:h-2 lg:h-2.5 rounded-md nm-inset-sm" />
                    <div className="w-1/2 h-1.5 sm:h-2 lg:h-2.5 rounded-md nm-inset-sm" />
                  </div>
                  <div className="nm-flat rounded-lg sm:rounded-xl p-2.5 sm:p-3 lg:p-3.5 flex flex-col gap-1.5 sm:gap-2">
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-md sm:rounded-lg nm-inset-sm" />
                    <div className="w-3/4 h-1.5 sm:h-2 lg:h-2.5 rounded-md nm-inset-sm" />
                    <div className="w-1/2 h-1.5 sm:h-2 lg:h-2.5 rounded-md nm-inset-sm" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="hidden md:flex absolute bottom-6 left-1/2 -translate-x-1/2 nm-flat-sm hover:nm-flat p-2.5 rounded-full text-slate-500 dark:text-slate-400 animate-bounce transition-all"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="w-4 h-4" />
      </a>
    </section>
  );
};

export default Hero;
