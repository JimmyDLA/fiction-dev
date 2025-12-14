import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const Contact = () => {
  return (
    <section id="contact" className="py-20 md:py-32 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight">
            Ready for the future?
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-400">
            Let's discuss how we can elevate your business.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-900/5 dark:shadow-none border border-slate-100 dark:border-white/5 backdrop-blur-sm"
        >
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                placeholder="Tell us about your project..."
              ></textarea>
            </div>

            <div className="flex justify-end">
              <button
                type="button"
                className="px-8 py-4 rounded-full bg-[#1a73e8] text-white font-medium text-lg hover:bg-black dark:hover:bg-slate-200 transition-colors flex items-center gap-2"
              >
                Send Message <ArrowRight size={20} />
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
