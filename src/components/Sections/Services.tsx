import { motion } from 'framer-motion';
import { Monitor, Smartphone, Server, Database, Cloud, Lock, X, Lightbulb } from 'lucide-react';
import { useState } from 'react';

interface Service {
  title: string;
  description: string;
  icon: any;
  details: string;
  example: string;
}

const ServiceCard = ({ service, index }: { service: Service; index: number }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="relative h-96 perspective-1000" onClick={() => setIsFlipped(!isFlipped)}>
      <motion.div
        className="w-full h-full relative transform-style-3d transition-all duration-500 cursor-pointer"
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 260, damping: 20 }}
      >
        {/* Front Face */}
        <div className="absolute inset-0 backface-hidden">
          <motion.div
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
              Click to learn more <span className="text-lg">→</span>
            </div>
          </motion.div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 h-full w-full">
          <div className="h-full p-8 rounded-3xl bg-blue-600 dark:bg-blue-900/80 text-white border border-blue-500 dark:border-white/10 shadow-xl flex flex-col justify-center relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 p-32 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 p-32 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <div className="relative z-10 flex flex-col h-full pt-4">
              {/* Example Section (Top) */}
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-1.5 rounded-lg bg-blue-500/30 border border-blue-400/30">
                    <Lightbulb size={14} className="text-blue-100" />
                  </div>
                  <h3 className="text-lg font-bold text-white">Example</h3>
                </div>
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 shadow-sm hover:bg-white/15 transition-colors">
                  <p className="text-white text-sm font-medium leading-relaxed">
                    {service.example}
                  </p>
                </div>
              </div>

              {/* More Info Section (Bottom) */}
              <div className="mt-auto mb-12">
                <h3 className="text-lg font-bold mb-2 text-white/90">More Info</h3>
                <p className="text-blue-50/90 dark:text-blue-100/90 text-sm leading-relaxed">
                  {service.details}
                </p>
              </div>
            </div>

            <div className="mt-auto flex justify-center">
              <button className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <X size={20} />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const Services = () => {
  const services = [
    {
      title: 'Web Development',
      description: 'High-performance websites built with modern frameworks.',
      icon: Monitor,
      details:
        'We build fast, beautiful websites that work perfectly on phones, tablets, and computers. From simple informational sites to complex online stores.',
      example:
        'Personal Portfolios, Restaurant Websites with Booking, Online Clothing Stores, Real Estate Listings.',
    },
    {
      title: 'Mobile Apps',
      description: 'Native and cross-platform applications for iOS and Android.',
      icon: Smartphone,
      details:
        'Custom apps for iPhone and Android that your customers can download. We handle everything from design to publishing on the App Store.',
      example:
        'Fitness Tracking Apps, Food Delivery Platforms, Social Networking Apps, Employee Scheduling Tools.',
    },
    {
      title: 'Backend Solutions',
      description: 'Scalable architectures and robust API design.',
      icon: Server,
      details:
        'The "engine" under the hood that powers your app. We ensure your data is processed quickly, correctly, and securely.',
      example:
        'User Login Systems, Payment Processing (Stripe/PayPal), Live Chat Features, Inventory Management Systems.',
    },
    {
      title: 'Database Design',
      description: 'Optimized data structures for growing needs.',
      icon: Database,
      details:
        'We organize your business data so it is safe, easy to find, and never gets lost. Think of it as a super-powered digital filing cabinet.',
      example:
        'Customer Contact Lists (CRM), Product Catalogs, Order Transaction Histories, Employee Records.',
    },
    {
      title: 'Cloud Infrastructure',
      description: 'Secure deployments on AWS, Google Cloud, or Azure.',
      icon: Cloud,
      details:
        "We host your software on reliable servers (like Amazon or Google) so it stays online 24/7 and doesn't crash when many people visit.",
      example:
        'Hosting for High-Traffic Blogs, Automatic Data Backups, Scalable Web Applications for Startups.',
    },
    {
      title: 'Cybersecurity',
      description: 'Implementing best practices for data security.',
      icon: Lock,
      details:
        "We lock the digital doors to keep hackers out. Protecting your business secrets and your customers' private information.",
      example:
        'Secure Login (Two-Factor Auth), Encryption for Credit Cards, Spam Protection, Data Leak Prevention.',
    },
  ];

  return (
    <section id="services" className="py-20 md:py-32 relative bg-white dark:bg-zinc-900 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-6 tracking-tight"
          >
            Capabilities.
          </motion.h2>
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
