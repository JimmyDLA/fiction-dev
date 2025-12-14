import { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Mouse parallax for the main title
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

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center pt-20"
      onMouseMove={handleMouseMove}
    >
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          style={{ y, opacity }}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <motion.h1
            style={{ x: titleX, y: titleY }}
            className="text-6xl md:text-8xl font-bold tracking-tight text-slate-900 dark:text-white mb-8"
          >
            Making <br />
            <span className="text-blue-600 dark:text-blue-500">Imagination</span> Reality.
          </motion.h1>

          <p className="mt-6 text-xl md:text-2xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto mb-12 font-medium">
            We build software that breaks limits and scales effortlessly.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <motion.button
              whileHover={{ scale: 1.05, translateY: -2 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 rounded-full bg-[#1a73e8] text-white font-medium text-lg hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center gap-2"
            >
              Start Project <ArrowRight size={20} />
            </motion.button>
            <a href="#services">
              <motion.button
                whileHover={{ scale: 1.05, translateY: -2 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 rounded-full bg-white dark:bg-white/10 text-slate-700 dark:text-white font-medium text-lg border border-slate-200 dark:border-white/10 hover:border-blue-200 hover:bg-blue-50/50 dark:hover:bg-white/20 transition-all"
              >
                Explore Solutions
              </motion.button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
