import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Send, Smartphone, Monitor, Database, Cloud } from 'lucide-react';

const StartProject = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<any>({
    serviceType: '',
    projectType: [],
    features: [],
    budget: '',
    timeline: '',
    name: '',
    email: '',
    details: '',
  });

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    window.scrollTo({
      top: 0,
    }); 
    setPage([page + newDirection, newDirection]);
    setStep(step + newDirection);
  };

  const handleServiceSelect = (service: string) => {
    setFormData({ ...formData, serviceType: service });
    paginate(1);
  };

  const handleCheckboxChange = (field: string, value: string) => {
    const current = formData[field] || [];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter((item: string) => item !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const renderStep0_Service = () => (
    <div className="space-y-8">
      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white text-center mb-12">
        What do you want to build?
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'web', label: 'Web Application', icon: Monitor, desc: 'Websites, SaaS, Portfolios' },
          { id: 'mobile', label: 'Mobile App', icon: Smartphone, desc: 'iOS, Android, Cross-platform' },
          { id: 'backend', label: 'Backend API', icon: Database, desc: 'Server logic, Database design' },
          { id: 'other', label: 'Other / Consulting', icon: Cloud, desc: 'Cloud, Security, Custom' },
        ].map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleServiceSelect(item.id)}
            className="cursor-pointer p-8 rounded-3xl bg-white dark:bg-zinc-900 border border-slate-200 dark:border-white/10 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-xl transition-all group"
          >
            <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
              <item.icon size={24} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{item.label}</h3>
            <p className="text-slate-500 dark:text-slate-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderStep1_Details = () => {
    const isApp = formData.serviceType === 'mobile';
    const isWeb = formData.serviceType === 'web';
    
    return (
      <div className="space-y-8 max-w-2xl mx-auto">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white text-center mb-8">
          {isApp ? 'App Details' : isWeb ? 'Web Details' : 'Project Details'}
        </h2>

        {/* Dynamic Questions based on type */}
        <div className="space-y-6">
          {/* Project Type */}
          {(isApp || isWeb) && (
             <div className="space-y-3">
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                 {isApp ? 'Target Platform' : 'Website Type'}
               </label>
               <div className="grid grid-cols-2 gap-3">
                 {(isApp 
                   ? ['iOS', 'Android', 'Tablet'] 
                   : ['Marketing/Landing', 'E-commerce', 'SaaS / Web App', 'Blog/CMS']
                 ).map((opt) => (
                   <div
                     key={opt}
                     onClick={() => handleCheckboxChange('projectType', opt)}
                     className={`cursor-pointer px-4 py-3 rounded-xl border flex items-center justify-between transition-all ${
                       formData.projectType.includes(opt)
                         ? 'bg-blue-600 border-blue-600 text-white'
                         : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-700'
                     }`}
                   >
                     <span className="text-sm font-medium">{opt}</span>
                     {formData.projectType.includes(opt) && <Check size={16} />}
                   </div>
                 ))}
               </div>
             </div>
          )}

          {/* Features */}
          <div className="space-y-3">
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
               Key Features Needed
             </label>
             <div className="grid grid-cols-2 gap-3">
               {[
                 'User Authentication', 'Push Notifications', 'Payments', 
                 'Admin Dashboard', 'Analytics', 'Social Integration',
                 'Map / Location', 'File Uploads'
               ].map((opt) => (
                 <div
                   key={opt}
                   onClick={() => handleCheckboxChange('features', opt)}
                   className={`cursor-pointer px-4 py-3 rounded-xl border flex items-center justify-between transition-all ${
                     formData.features.includes(opt)
                       ? 'bg-blue-600 border-blue-600 text-white'
                       : 'bg-slate-50 dark:bg-zinc-800 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-zinc-700'
                   }`}
                 >
                   <span className="text-sm font-medium">{opt}</span>
                   {formData.features.includes(opt) && <Check size={16} />}
                 </div>
               ))}
             </div>
          </div>

          {/* Timeline and Budget */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Timeline</label>
                 <select 
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                 >
                    <option value="">Select duration</option>
                    <option value="ASAP">ASAP (Rush)</option>
                    <option value="1-2 months">1-2 Months</option>
                    <option value="3-6 months">3-6 Months</option>
                    <option value="6+ months">6+ Months</option>
                 </select>
              </div>
              <div className="space-y-2">
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">Budget Estimate</label>
                 <select 
                    value={formData.budget}
                    onChange={(e) => handleInputChange('budget', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                 >
                    <option value="">Select range</option>
                    <option value="<5k">$1k - $5k</option>
                    <option value="5k-10k">$5k - $10k</option>
                    <option value="10k-25k">$10k - $25k</option>
                    <option value="25k+">$25k+</option>
                 </select>
              </div>
           </div>
           {/* Additional information */}
           <div className="space-y-2">
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Anything else?
               </label>
               <textarea
                 rows={3}
                 value={formData.details}
                 onChange={(e) => handleInputChange('details', e.target.value)}
                 className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                 placeholder="Briefly describe your idea or specific requirements..."
               />
           </div>

        </div>

        <div className="flex justify-between pt-6">
          <button onClick={() => paginate(-1)} className="px-6 py-3 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-medium flex items-center gap-2">
            <ArrowLeft size={18} /> Back
          </button>
          <button onClick={() => paginate(1)} className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2">
            Next <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep2_Contact = () => (
     <div className="space-y-8 max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Almost done! Where should we send the quote?
        </h2>
        
        <div className="space-y-4 text-left">
           <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
              <input 
                 type="text"
                 value={formData.name}
                 onChange={(e) => handleInputChange('name', e.target.value)}
                 className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                 placeholder="Your Name"
              />
           </div>
           <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
              <input 
                 type="email"
                 value={formData.email}
                 onChange={(e) => handleInputChange('email', e.target.value)}
                 className="w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border border-slate-200 dark:border-white/10 focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                 placeholder="your@email.com"
              />
           </div>
        </div>

        <div className="flex justify-between pt-6">
          <button onClick={() => paginate(-1)} className="px-6 py-3 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-medium flex items-center gap-2">
            <ArrowLeft size={18} /> Back
          </button>
          <button onClick={() => paginate(1)} className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2">
            Review <ArrowRight size={18} />
          </button>
        </div>
     </div>
  );

  const renderStep3_Summary = () => (
     <div className="space-y-8 max-w-2xl mx-auto">
        <div className="text-center mb-8">
           <div className="inline-flex items-center justify-center p-4 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full mb-4">
              <Check size={32} />
           </div>
           <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
             Ready to Submit?
           </h2>
           <p className="text-slate-600 dark:text-slate-400 mt-2">
             We'll review your requirements and get back to you within 24 hours.
           </p>
        </div>

        <div className="bg-slate-50 dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-4">
           <SummaryRow label="Service Type" value={formData.serviceType} />
           <SummaryRow label="Platforms" value={formData.projectType.join(', ')} />
           <SummaryRow label="Features" value={formData.features.join(', ')} />
           <SummaryRow label="Timeline" value={formData.timeline} />
           <SummaryRow label="Budget" value={formData.budget} />
           <SummaryRow label="Contact" value={`${formData.name} (${formData.email})`} />
        </div>

        <div className="flex justify-between pt-6">
          <button onClick={() => paginate(-1)} className="px-6 py-3 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-medium flex items-center gap-2">
            <ArrowLeft size={18} /> Edit
          </button>
          <button className="px-10 py-4 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 flex items-center gap-2 shadow-lg shadow-blue-500/30">
            Submit Request <Send size={20} />
          </button>
        </div>
     </div>
  );

  const SummaryRow = ({ label, value }: { label: string, value: string }) => (
     <div className="flex justify-between border-b border-slate-200 dark:border-white/5 last:border-0 pb-2 last:pb-0">
        <span className="font-medium text-slate-500 dark:text-slate-400">{label}</span>
        <span className="font-semibold text-slate-900 dark:text-white text-right max-w-[60%]">{value || '-'}</span>
     </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-12">
           <div className="h-2 w-full bg-slate-100 dark:bg-white/10 rounded-full overflow-hidden">
             <motion.div 
               className="h-full bg-blue-600"
               initial={{ width: 0 }}
               animate={{ width: `${((step + 1) / 4) * 100}%` }}
               transition={{ duration: 0.5 }}
             />
           </div>
           <div className="flex justify-between mt-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
             <span>Service</span>
             <span>Details</span>
             <span>Contact</span>
             <span>Review</span>
           </div>
        </div>

        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 10 },
              opacity: { duration: 0.2 }
            }}
            className="w-full bg-white dark:bg-zinc-900 md:p-10 py-8 px-4 rounded-3xl relative"
          >
            {step === 0 && renderStep0_Service()}
            {step === 1 && renderStep1_Details()}
            {step === 2 && renderStep2_Contact()}
            {step === 3 && renderStep3_Summary()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default StartProject;
