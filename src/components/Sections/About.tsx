import { motion } from 'framer-motion';

const About = () => {
  return (
    <section
      id="about"
      className="py-20 md:py-32 relative overflow-hidden bg-white dark:bg-zinc-900 z-10 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl"
        >
          <h2 className="text-4xl md:text-7xl font-bold tracking-tight text-slate-900 dark:text-white mb-8 md:mb-12 leading-[0.9]">
            We don't just write code. <br />
            <span className="text-slate-400 dark:text-slate-600">We engineer</span> <br />
            <span className="text-blue-600 dark:text-blue-500">digital answers.</span>
          </h2>

          <div className="text-xl md:text-2xl text-slate-600 dark:text-gray-400 leading-relaxed space-y-8 font-medium max-w-2xl">
            <p>
              Fiction Development bridges the gap between complex technical requirements and
              intuitive user experiences.
            </p>
            <p>
              From startups to enterprises, we build the underlying reality that powers your digital
              presence.
            </p>
          </div>

          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-5xl font-bold text-slate-900 dark:text-white mb-2">50+</h4>
              <p className="text-slate-500 dark:text-gray-500 font-medium">Projects</p>
            </div>
            <div>
              <h4 className="text-5xl font-bold text-slate-900 dark:text-white mb-2">100%</h4>
              <p className="text-slate-500 dark:text-gray-500 font-medium">Satisfaction</p>
            </div>
            <div>
              <h4 className="text-5xl font-bold text-slate-900 dark:text-white mb-2">24/7</h4>
              <p className="text-slate-500 dark:text-gray-500 font-medium">Support</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
