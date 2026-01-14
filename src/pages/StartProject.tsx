import { useRef, useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, Check, Send, Smartphone, Monitor, Database, Cloud, Loader2, Calculator } from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { PRICING_CONFIG, calculateEstimate } from '../data/pricingConstants';

const SERVICE_ID = import.meta.env.VITE_EJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EJS_WELCOME_TEMPLATE;
const PUBLIC_KEY = import.meta.env.VITE_EJS_PUBLIC_KEY;

const StartProject = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = parseInt(searchParams.get('step') || '0', 10);
  const prevStep = useRef(step);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const [formData, setFormData] = useState<any>(() => {
    const saved = localStorage.getItem('wizard_data');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved wizard data", e);
      }
    }
    return {
      serviceType: '',
      projectType: [],
      features: [],
      budget: '',
      timeline: '',
      name: '',
      email: '',
      details: '',
    };
  });

  // Persist form data on change
  useEffect(() => {
    localStorage.setItem('wizard_data', JSON.stringify(formData));
  }, [formData]);

  // Calculate direction for animation
  const direction = step > prevStep.current ? 1 : -1;

  useEffect(() => {
    prevStep.current = step;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

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

  const paginate = (newDirection: number) => {
    const nextStep = step + newDirection;
    // Persist existing params (like mode=quote)
    setSearchParams(prev => {
      const newParams = new URLSearchParams(prev);
      newParams.set('step', nextStep.toString());
      return newParams;
    });
  };

  const handleServiceSelect = (service: string) => {
    setFormData({ 
      ...formData, 
      serviceType: service,
      projectType: [],
      features: [],
      budget: '',
      timeline: ''
    });
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

  const [errors, setErrors] = useState<any>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep2 = () => {
    const newErrors: any = {};
    if (!formData.name.trim()) newErrors.name = t('wizard.validation.name_required');
    if (!formData.email.trim()) {
      newErrors.email = t('wizard.validation.email_required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('wizard.validation.email_invalid');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors({ ...errors, [field]: '' });
    }
  };

  const onReviewClick = () => {
    if (validateStep2()) {
      paginate(1);
    }
  };

  const handleWizardSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const templateParams = {
      name: formData.name,
      email: formData.email,
      serviceType: formData.serviceType,
      projectType: formData.projectType.join(', '),
      features: formData.features.join(', '),
      timeline: formData.timeline,
      budget: formData.budget,
      details: formData.details,
      subject: `New Project Inquiry: ${formData.serviceType} (${formData.name})`
    };

    try {
      const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      if (response.status === 200) {
        setSubmitStatus('success');
        setShowSuccessModal(true);
        localStorage.removeItem('wizard_data');
        // Redirect handled in Modal component or useEffect
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep0_Service = () => (
    <div className="space-y-8">
      <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white text-center mb-12">
        {t('wizard.steps.service')}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { id: 'web', label: t('wizard.services.web'), icon: Monitor, desc: t('wizard.services.web_desc') },
          { id: 'mobile', label: t('wizard.services.mobile'), icon: Smartphone, desc: t('wizard.services.mobile_desc') },
          { id: 'backend', label: t('wizard.services.backend'), icon: Database, desc: t('wizard.services.backend_desc') },
          { id: 'other', label: t('wizard.services.other'), icon: Cloud, desc: t('wizard.services.other_desc') },
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
          {isApp ? t('wizard.steps.app_details') : isWeb ? t('wizard.steps.web_details') : t('wizard.steps.details')}
        </h2>

        {/* Dynamic Questions based on type */}
        <div className="space-y-6">
          {/* Project Type */}
          <div className="space-y-3">
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
               {isApp ? t('wizard.labels.target_platform') : isWeb ? t('wizard.labels.website_type') : t('wizard.labels.project_focus')}
             </label>
             <div className="grid grid-cols-2 gap-3">
               {(isApp 
                 ? ['iOS', 'Android', 'Tablet', 'Wearables'] 
                 : isWeb 
                   ? ['Marketing/Landing', 'E-commerce', 'SaaS / Web App', 'Blog/CMS']
                   : ['API Development', 'Database Design', 'Cloud Setup', 'Security Audit']
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

          {/* Features */}
          <div className="space-y-3">
             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
               {t('wizard.labels.features')}
             </label>
             <div className="grid grid-cols-2 gap-3">
               {[
                 'User Authentication', 'Push Notifications', 'Payments', 
                 'Admin Dashboard', 'Analytics', 'Social Integration',
                 'Map / Location', 'File Uploads', 'Camera / Media',
                 'Bluetooth / BLE', 'Offline Mode', 'Chat / Messaging',
                 'AI Integration', 'Calendar / Booking'
               ].filter(f => {
                 if (isApp) return true; // All features relevant for mobile
                 if (isWeb) return !['Bluetooth / BLE', 'Offline Mode'].includes(f); // Most valid for web
                 return ['User Authentication', 'Payments', 'Admin Dashboard', 'Analytics', 'File Uploads', 'AI Integration'].includes(f); // Backend filters
               }).map((opt) => (
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
                 <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('wizard.labels.timeline')}</label>
                 <select 
                    value={formData.timeline}
                    onChange={(e) => handleInputChange('timeline', e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                 >
                    <option value="">{t('wizard.options.timeline.default')}</option>
                    <option value="ASAP">{t('wizard.options.timeline.asap')}</option>
                    <option value="1-2 months">{t('wizard.options.timeline.months_1_2')}</option>
                    <option value="3-6 months">{t('wizard.options.timeline.months_3_6')}</option>
                    <option value="6+ months">{t('wizard.options.timeline.months_6_plus')}</option>
                 </select>
              </div>
              {searchParams.get('mode') !== 'quote' && (
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">{t('wizard.labels.budget')}</label>
                  <select 
                      value={formData.budget}
                      onChange={(e) => handleInputChange('budget', e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                      <option value="">{t('wizard.options.budget.default')}</option>
                      <option value="<5k">{t('wizard.options.budget.k1_5')}</option>
                      <option value="5k-10k">{t('wizard.options.budget.k5_10')}</option>
                      <option value="10k-25k">{t('wizard.options.budget.k10_25')}</option>
                      <option value="25k+">{t('wizard.options.budget.k25_plus')}</option>
                  </select>
                </div>
              )}
           </div>
           {/* Additional information */}
           <div className="space-y-2">
               <label className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  {t('wizard.labels.details')}
               </label>
               <textarea
                 rows={3}
                 value={formData.details}
                 onChange={(e) => handleInputChange('details', e.target.value)}
                 className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-zinc-800 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                 placeholder={t('wizard.placeholders.details')}
               />
           </div>

        </div>

        <div className="flex justify-between pt-6">
          <button onClick={() => paginate(-1)} className="px-6 py-3 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-medium flex items-center gap-2">
            <ArrowLeft size={18} /> {t('wizard.buttons.back')}
          </button>
          <button onClick={() => paginate(1)} className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2">
            {t('wizard.buttons.next')} <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep2_Contact = () => (
     <div className="space-y-8 max-w-xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          {t('wizard.steps.contact')}
        </h2>
        
        <div className="space-y-4 text-left">
           <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('wizard.labels.name')}</label>
              <input 
                 type="text"
                 value={formData.name}
                 onChange={(e) => handleInputChange('name', e.target.value)}
                 className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border focus:ring-2 outline-none dark:text-white transition-all ${
                   errors.name 
                     ? 'border-red-500 focus:ring-red-200' 
                     : 'border-slate-200 dark:border-white/10 focus:ring-blue-500'
                 }`}
                 placeholder={t('wizard.placeholders.name')}
              />
              {errors.name && <p className="text-red-500 text-sm mt-1 ml-1">{errors.name}</p>}
           </div>
           <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">{t('wizard.labels.email')}</label>
              <input 
                 type="email"
                 value={formData.email}
                 onChange={(e) => handleInputChange('email', e.target.value)}
                 className={`w-full px-4 py-3 rounded-xl bg-white dark:bg-zinc-800 border focus:ring-2 outline-none dark:text-white transition-all ${
                   errors.email 
                     ? 'border-red-500 focus:ring-red-200' 
                     : 'border-slate-200 dark:border-white/10 focus:ring-blue-500'
                 }`}
                 placeholder={t('wizard.placeholders.email')}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1 ml-1">{errors.email}</p>}
           </div>
        </div>

        <div className="flex justify-between pt-6">
          <button onClick={() => paginate(-1)} className="px-6 py-3 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-medium flex items-center gap-2">
            <ArrowLeft size={18} /> {t('wizard.buttons.back')}
          </button>
          <button 
            onClick={onReviewClick} 
            className="px-8 py-3 rounded-full bg-blue-600 text-white font-medium hover:bg-blue-700 flex items-center gap-2"
          >
            {t('wizard.buttons.review')} <ArrowRight size={18} />
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
             {t('wizard.steps.summary')}
           </h2>
           <p className="text-slate-600 dark:text-slate-400 mt-2">
             {t('wizard.steps.success_subtitle')}
           </p>
        </div>

        <div className="bg-slate-50 dark:bg-zinc-900 rounded-2xl p-6 border border-slate-200 dark:border-white/10 space-y-4">
          <SummaryRow label={t('wizard.review.service_type')} value={formData.serviceType} />
          <SummaryRow label={t('wizard.review.platforms')} value={formData.projectType.join(', ')} />
          <SummaryRow label={t('wizard.review.features')} value={formData.features.join(', ')} />
          <SummaryRow label={t('wizard.review.timeline')} value={formData.timeline} />
          {searchParams.get('mode') !== 'quote' && ( <SummaryRow label={t('wizard.review.budget')} value={formData.budget} />)}
          <SummaryRow label={t('wizard.review.contact')} value={`${formData.name} (${formData.email})`} />
        </div>

        <div className="flex justify-between pt-6 items-center">
          <button onClick={() => paginate(-1)} className="px-6 py-3 rounded-full text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 font-medium flex items-center gap-2">
            <ArrowLeft size={18} /> {t('wizard.buttons.edit')}
          </button>
          
          <div className="flex flex-col items-end gap-2">
            {submitStatus === 'error' && (
              <span className="text-red-500 text-sm">{t('contact.error_send') || 'Failed to send. Try again.'}</span>
            )}
            <button 
              onClick={handleWizardSubmit}
              disabled={isSubmitting}
              className="px-10 py-4 rounded-full bg-blue-600 text-white font-bold text-lg hover:bg-blue-700 disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 shadow-lg shadow-blue-500/30 transition-all"
            >
              {isSubmitting ? (
                <>Sending... <Loader2 size={20} className="animate-spin" /></>
              ) : (
                <>{t('wizard.buttons.submit')} <Send size={20} /></>
              )}
            </button>
          </div>
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
      <div className={`max-w-7xl mx-auto ${searchParams.get('mode') === 'quote' ? 'lg:grid lg:grid-cols-3 lg:gap-8' : ''}`}>
        
        {/* Main Wizard Area */}
        <div className={`${searchParams.get('mode') === 'quote' ? 'lg:col-span-2' : 'max-w-4xl mx-auto'}`}>
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
               <span>{t('wizard.nav.service')}</span>
               <span>{t('wizard.nav.details')}</span>
               <span>{t('wizard.nav.contact')}</span>
               <span>{t('wizard.nav.review')}</span>
             </div>
          </div>

          <div className="relative grid grid-cols-1 overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              {!showSuccessModal && (
                <motion.div
                  key={step}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                  className="col-start-1 row-start-1 w-full bg-white dark:bg-zinc-900 md:p-10 py-8 px-4 rounded-3xl relative"
                >
                  {step === 0 && renderStep0_Service()}
                  {step === 1 && renderStep1_Details()}
                  {step === 2 && renderStep2_Contact()}
                  {step === 3 && renderStep3_Summary()}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Sidebar Logic */}
        {searchParams.get('mode') === 'quote' && (
          <div className="hidden lg:block lg:col-span-1 mt-12 lg:mt-0">
             <LiveCart 
               serviceType={formData.serviceType}
               projectType={formData.projectType}
               features={formData.features}
             />
          </div>
        )}

      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              onAnimationComplete={() => {
                setTimeout(() => navigate('/'), 3000);
              }}
              className="bg-white dark:bg-zinc-900 rounded-3xl p-8 md:p-12 text-center max-w-md w-full shadow-2xl relative overflow-hidden"
            >
              <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: "spring" }}
                >
                  <Check size={40} className="text-green-600 dark:text-green-400" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {t('wizard.success_modal.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8">
                {t('wizard.success_modal.message')}
              </p>

              <button
                onClick={() => navigate('/')}
                className="w-full py-3 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold hover:opacity-90 transition-opacity"
              >
                {t('wizard.success_modal.button')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Extracted and Memoized LiveCart Component


interface LiveCartProps {
  serviceType: string;
  projectType: string[];
  features: string[];
}

const LiveCart = React.memo(({ serviceType, projectType, features }: LiveCartProps) => {
  const { t } = useTranslation();
  const { min, max } = calculateEstimate(
    serviceType,
    projectType,
    features
  );

  const hasSelection = serviceType || projectType.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white dark:bg-zinc-900 rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-xl sticky top-32"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600">
            <Calculator size={20} />
          </span>
          {t('wizard.live_quote.title')}
      </h3>

      {!hasSelection ? (
        <div className="text-center py-10 text-slate-400 text-sm">
          {t('wizard.live_quote.empty_state')}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Service */}
          {serviceType && PRICING_CONFIG.services[serviceType] && (
            <div className="flex justify-between items-start pb-4 border-b border-slate-100 dark:border-white/5">
              <div className="text-sm">
                <span className="block font-medium text-slate-700 dark:text-gray-200">
                  {PRICING_CONFIG.services[serviceType].label}
                </span>
                <span className="text-xs text-slate-400">{t('wizard.live_quote.base_service')}</span>
              </div>
              <span className="font-semibold text-slate-900 dark:text-white">
                ${PRICING_CONFIG.services[serviceType].basePrice.toLocaleString()}
              </span>
            </div>
          )}

          {/* Platform / Project Types */}
          {projectType.length > 0 && (
            <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-white/5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('wizard.live_quote.platforms_type')}</span>
              {projectType.map((type: string) => {
                const config = PRICING_CONFIG.projectTypes[type];
                return config ? (
                  <div key={type} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-gray-400">{config.label}</span>
                    <span className="font-medium text-slate-900 dark:text-white">
                      ${config.basePrice.toLocaleString()}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <div className="space-y-3 pb-4 border-b border-slate-100 dark:border-white/5">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{t('wizard.live_quote.addons_promo')}</span>
              {[...features]
                .sort((a, b) => {
                  const priceA = PRICING_CONFIG.features[a]?.basePrice || 0;
                  const priceB = PRICING_CONFIG.features[b]?.basePrice || 0;
                  return priceA - priceB;
                })
                .map((feat: string, index: number) => {
                  const config = PRICING_CONFIG.features[feat];
                  const isFree = index < 3;
                  return config ? (
                    <div key={feat} className="flex justify-between items-center text-sm">
                      <span className="text-slate-600 dark:text-gray-400">
                        {config.label}
                        {isFree && <span className="text-green-600 dark:text-green-400 text-xs ml-2 font-medium">{t('wizard.live_quote.included')}</span>}
                      </span>
                      <div className="text-right">
                        {isFree ? (
                            <>
                              <span className="line-through text-slate-300 text-xs mr-2 font-normal">${config.basePrice.toLocaleString()}</span>
                              <span className="font-medium text-green-600 dark:text-green-400">$0</span>
                            </>
                        ) : (
                            <span className="font-medium text-slate-900 dark:text-white">
                              ${config.basePrice.toLocaleString()}
                            </span>
                        )}
                      </div>
                    </div>
                  ) : null;
              })}
            </div>
          )}

          {/* Total */}
          <div className="pt-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-slate-500 text-sm">{t('wizard.live_quote.estimated_range')}</span>
            </div>
            <div className="flex items-baseline justify-between">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  ${min.toLocaleString()} - ${max.toLocaleString()}
                </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 italic">
              {t('wizard.live_quote.disclaimer')}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
});

export default StartProject;
