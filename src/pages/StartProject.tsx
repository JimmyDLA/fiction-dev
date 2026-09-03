import { useRef, useState, useEffect } from 'react';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Send,
  Smartphone,
  Monitor,
  Database,
  Cloud,
  Loader2,
  Calculator,
} from 'lucide-react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import emailjs from '@emailjs/browser';
import { PRICING_CONFIG, calculateEstimate } from '../data/pricingConstants';

const SERVICE_ID = import.meta.env.VITE_EJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EJS_WELCOME_TEMPLATE;
const PUBLIC_KEY = import.meta.env.VITE_EJS_PUBLIC_KEY;

// Track if the wizard has been visited in this session (module-level state)
let hasSessionVisit = false;

interface WizardFormData {
  serviceType: string;
  projectType: string[];
  features: string[];
  budget: string;
  timeline: string;
  name: string;
  email: string;
  details: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  [key: string]: string | undefined;
}

const StartProject = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const step = parseInt(searchParams.get('step') || '0', 10);
  const prevStep = useRef(step);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Initialize state with "Reload-Only" persistence logic
  const [formData, setFormData] = useState<WizardFormData>(() => {
    // 1. If we've visited this component before in this session (client-nav back), CLEAR data.
    if (hasSessionVisit) {
      localStorage.removeItem('wizard_data');
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
    }

    // 2. If it's a browser reload, RESTORE data.
    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (navEntry && navEntry.type === 'reload') {
      const saved = localStorage.getItem('wizard_data');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse saved wizard data', e);
        }
      }
    }

    // 3. Otherwise (Fresh load or unknown), CLEAR data to be safe.
    localStorage.removeItem('wizard_data');
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

  // Mark this session as "visited" after mount (delayed to handle Strict Mode double-mount)
  useEffect(() => {
    const timer = setTimeout(() => {
      hasSessionVisit = true;
    }, 500);
    return () => clearTimeout(timer);
  }, []);

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
    setSearchParams((prev) => {
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
      timeline: '',
    });
    paginate(1);
  };

  const handleCheckboxChange = (field: 'projectType' | 'features', value: string) => {
    const current = formData[field] || [];
    if (current.includes(value)) {
      setFormData({ ...formData, [field]: current.filter((item: string) => item !== value) });
    } else {
      setFormData({ ...formData, [field]: [...current, value] });
    }
  };

  const [errors, setErrors] = useState<FormErrors>({});

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validateStep2 = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = t('wizard.validation.name_required');
    if (!formData.email.trim()) {
      newErrors.email = t('wizard.validation.email_required');
    } else if (!validateEmail(formData.email)) {
      newErrors.email = t('wizard.validation.email_invalid');
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field: keyof WizardFormData, value: string) => {
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
      subject: `New Project Inquiry: ${formData.serviceType} (${formData.name})`,
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
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 nm-pill-inset px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-3">
          <span>Step 01</span>
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('wizard.steps.service')}
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          {
            id: 'web',
            label: t('wizard.services.web'),
            icon: Monitor,
            desc: t('wizard.services.web_desc'),
          },
          {
            id: 'mobile',
            label: t('wizard.services.mobile'),
            icon: Smartphone,
            desc: t('wizard.services.mobile_desc'),
          },
          {
            id: 'backend',
            label: t('wizard.services.backend'),
            icon: Database,
            desc: t('wizard.services.backend_desc'),
          },
          {
            id: 'other',
            label: t('wizard.services.other'),
            icon: Cloud,
            desc: t('wizard.services.other_desc'),
          },
        ].map((item) => (
          <motion.div
            key={item.id}
            whileHover={{ translateY: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleServiceSelect(item.id)}
            className="cursor-pointer p-8 rounded-[28px] nm-flat hover:nm-flat-lg transition-all duration-300 group"
          >
            <div className="h-14 w-14 rounded-2xl nm-inset-sm flex items-center justify-center text-blue-600 dark:text-blue-400 mb-5 group-hover:scale-105 transition-transform">
              <item.icon size={26} />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
              {item.label}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              {item.desc}
            </p>
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
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 nm-pill-inset px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-3">
            <span>Step 02</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {isApp
              ? t('wizard.steps.app_details')
              : isWeb
                ? t('wizard.steps.web_details')
                : t('wizard.steps.details')}
          </h2>
        </div>

        {/* Dynamic Questions based on type */}
        <div className="space-y-6">
          {/* Project Type */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {isApp
                ? t('wizard.labels.target_platform')
                : isWeb
                  ? t('wizard.labels.website_type')
                  : t('wizard.labels.project_focus')}
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
                  className={`cursor-pointer px-4 py-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                    formData.projectType.includes(opt)
                      ? 'nm-btn-accent text-white'
                      : 'nm-flat-sm hover:nm-flat text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <span className="text-sm font-semibold">{opt}</span>
                  {formData.projectType.includes(opt) && <Check size={16} />}
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-3">
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {t('wizard.labels.features')}
            </label>
            <div className="grid grid-cols-2 gap-3">
              {[
                'User Authentication',
                'Push Notifications',
                'Payments',
                'Admin Dashboard',
                'Analytics',
                'Social Integration',
                'Map / Location',
                'File Uploads',
                'Camera / Media',
                'Bluetooth / BLE',
                'Offline Mode',
                'Chat / Messaging',
                'AI Integration',
                'Calendar / Booking',
              ]
                .filter((f) => {
                  if (isApp) return true;
                  if (isWeb) return !['Bluetooth / BLE', 'Offline Mode'].includes(f);
                  return [
                    'User Authentication',
                    'Payments',
                    'Admin Dashboard',
                    'Analytics',
                    'File Uploads',
                    'AI Integration',
                  ].includes(f);
                })
                .map((opt) => (
                  <div
                    key={opt}
                    onClick={() => handleCheckboxChange('features', opt)}
                    className={`cursor-pointer px-4 py-3.5 rounded-2xl flex items-center justify-between transition-all duration-200 ${
                      formData.features.includes(opt)
                        ? 'nm-btn-accent text-white'
                        : 'nm-flat-sm hover:nm-flat text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    <span className="text-sm font-semibold">{opt}</span>
                    {formData.features.includes(opt) && <Check size={16} />}
                  </div>
                ))}
            </div>
          </div>

          {/* Timeline and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {t('wizard.labels.timeline')}
              </label>
              <select
                value={formData.timeline}
                onChange={(e) => handleInputChange('timeline', e.target.value)}
                className="w-full px-4 py-3.5 rounded-2xl nm-input text-slate-900 dark:text-white font-medium"
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
                <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  {t('wizard.labels.budget')}
                </label>
                <select
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  className="w-full px-4 py-3.5 rounded-2xl nm-input text-slate-900 dark:text-white font-medium"
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
            <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              {t('wizard.labels.details')}
            </label>
            <textarea
              rows={3}
              value={formData.details}
              onChange={(e) => handleInputChange('details', e.target.value)}
              className="w-full px-4 py-3.5 rounded-2xl nm-input text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none font-medium"
              placeholder={t('wizard.placeholders.details')}
            />
          </div>
        </div>

        <div className="flex justify-between pt-6">
          <button
            onClick={() => paginate(-1)}
            className="nm-btn px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-slate-700 dark:text-slate-200 font-bold text-sm sm:text-base flex items-center gap-2 whitespace-nowrap"
          >
            <ArrowLeft size={16} /> {t('wizard.buttons.back')}
          </button>
          <button
            onClick={() => paginate(1)}
            className="nm-btn-accent px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 whitespace-nowrap"
          >
            {t('wizard.buttons.next')} <ArrowRight size={16} />
          </button>
        </div>
      </div>
    );
  };

  const renderStep2_Contact = () => (
    <div className="space-y-8 max-w-xl mx-auto text-center">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 nm-pill-inset px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-3">
          <span>Step 03</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('wizard.steps.contact')}
        </h2>
      </div>

      <div className="space-y-5 text-left">
        <div>
          <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            {t('wizard.labels.name')}
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            className={`w-full px-4 py-3.5 rounded-2xl nm-input font-medium text-slate-900 dark:text-white transition-all ${
              errors.name ? 'border-red-500 ring-2 ring-red-400/30' : ''
            }`}
            placeholder={t('wizard.placeholders.name')}
          />
          {errors.name && (
            <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.name}</p>
          )}
        </div>
        <div>
          <label className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
            {t('wizard.labels.email')}
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange('email', e.target.value)}
            className={`w-full px-4 py-3.5 rounded-2xl nm-input font-medium text-slate-900 dark:text-white transition-all ${
              errors.email ? 'border-red-500 ring-2 ring-red-400/30' : ''
            }`}
            placeholder={t('wizard.placeholders.email')}
          />
          {errors.email && (
            <p className="text-red-500 text-xs font-semibold mt-1 ml-1">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="flex justify-between pt-6">
        <button
          onClick={() => paginate(-1)}
          className="nm-btn px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-slate-700 dark:text-slate-200 font-bold text-sm sm:text-base flex items-center gap-2 whitespace-nowrap"
        >
          <ArrowLeft size={16} /> {t('wizard.buttons.back')}
        </button>
        <button
          onClick={onReviewClick}
          className="nm-btn-accent px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 whitespace-nowrap"
        >
          {t('wizard.buttons.review')} <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );

  const renderStep3_Summary = () => (
    <div className="space-y-8 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 nm-inset-sm text-emerald-500 rounded-full mb-4">
          <Check size={32} />
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {t('wizard.steps.summary')}
        </h2>
        <p className="text-slate-600 dark:text-slate-400 mt-2 text-sm sm:text-base">
          {t('wizard.steps.success_subtitle')}
        </p>
      </div>

      <div className="nm-inset-deep rounded-3xl p-6 sm:p-8 space-y-4">
        <SummaryRow label={t('wizard.review.service_type')} value={formData.serviceType} />
        <SummaryRow label={t('wizard.review.platforms')} value={formData.projectType.join(', ')} />
        <SummaryRow label={t('wizard.review.features')} value={formData.features.join(', ')} />
        <SummaryRow label={t('wizard.review.timeline')} value={formData.timeline} />
        {searchParams.get('mode') !== 'quote' && (
          <SummaryRow label={t('wizard.review.budget')} value={formData.budget} />
        )}
        <SummaryRow
          label={t('wizard.review.contact')}
          value={`${formData.name} (${formData.email})`}
        />
      </div>

      <div className="flex justify-between pt-6 items-center">
        <button
          onClick={() => paginate(-1)}
          className="nm-btn px-5 py-2.5 sm:px-6 sm:py-3 rounded-full text-slate-700 dark:text-slate-200 font-bold text-sm sm:text-base flex items-center gap-2 whitespace-nowrap"
        >
          <ArrowLeft size={16} /> {t('wizard.buttons.edit')}
        </button>

        <div className="flex flex-col items-end gap-2">
          {submitStatus === 'error' && (
            <span className="text-red-500 text-xs font-semibold">
              {t('contact.error_send') || 'Failed to send. Try again.'}
            </span>
          )}
          <button
            onClick={handleWizardSubmit}
            disabled={isSubmitting}
            className="nm-btn-accent px-5 py-2.5 sm:px-7 sm:py-3 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 whitespace-nowrap"
          >
            {isSubmitting ? (
              <>
                <span>Sending...</span> <Loader2 size={16} className="animate-spin" />
              </>
            ) : (
              <>
                <span>{t('wizard.buttons.submit')}</span> <Send size={16} />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );

  const SummaryRow = ({ label, value }: { label: string; value: string }) => (
    <div className="flex justify-between border-b border-slate-200/40 dark:border-white/5 last:border-0 pb-3 last:pb-0">
      <span className="font-medium text-slate-500 dark:text-slate-400 text-sm">{label}</span>
      <span className="font-bold text-slate-900 dark:text-white text-right max-w-[60%] text-sm">
        {value || '-'}
      </span>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6">
      <div
        className={`max-w-7xl mx-auto ${searchParams.get('mode') === 'quote' ? 'lg:grid lg:grid-cols-3 lg:gap-8' : ''}`}
      >
        {/* Main Wizard Area */}
        <div
          className={`${searchParams.get('mode') === 'quote' ? 'lg:col-span-2' : 'max-w-4xl mx-auto'}`}
        >
          {/* Progress Bar */}
          <div className="mb-12">
            <div className="h-3 w-full nm-inset-sm rounded-full overflow-hidden p-0.5">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-600 to-sky-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / 4) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
            <div className="flex justify-between mt-3 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              <span className={step >= 0 ? 'text-blue-600 dark:text-blue-400' : ''}>
                {t('wizard.nav.service')}
              </span>
              <span className={step >= 1 ? 'text-blue-600 dark:text-blue-400' : ''}>
                {t('wizard.nav.details')}
              </span>
              <span className={step >= 2 ? 'text-blue-600 dark:text-blue-400' : ''}>
                {t('wizard.nav.contact')}
              </span>
              <span className={step >= 3 ? 'text-blue-600 dark:text-blue-400' : ''}>
                {t('wizard.nav.review')}
              </span>
            </div>
          </div>

          <div className="relative grid grid-cols-1">
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
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="col-start-1 row-start-1 w-full nm-flat-lg md:p-12 py-8 px-6 rounded-[36px] relative"
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onAnimationComplete={() => {
                setTimeout(() => navigate('/'), 3000);
              }}
              className="nm-flat-xl rounded-[32px] p-8 md:p-12 text-center max-w-md w-full relative overflow-hidden"
            >
              <div className="w-20 h-20 nm-inset-sm rounded-full flex items-center justify-center mx-auto mb-6">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                >
                  <Check size={36} className="text-emerald-500" />
                </motion.div>
              </div>

              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                {t('wizard.success_modal.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
                {t('wizard.success_modal.message')}
              </p>

              <button
                onClick={() => navigate('/')}
                className="nm-btn-accent w-full py-3.5 rounded-full font-bold"
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
  const { min, max } = calculateEstimate(serviceType, projectType, features);

  const hasSelection = serviceType || projectType.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="nm-flat-lg rounded-[28px] p-6 sm:p-8 sticky top-36"
    >
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2.5">
        <span className="p-2 nm-inset-sm rounded-xl text-blue-600 dark:text-blue-400">
          <Calculator size={20} />
        </span>
        {t('wizard.live_quote.title')}
      </h3>

      {!hasSelection ? (
        <div className="text-center py-10 text-slate-400 text-sm font-medium">
          {t('wizard.live_quote.empty_state')}
        </div>
      ) : (
        <div className="space-y-5">
          {/* Service */}
          {serviceType && PRICING_CONFIG.services[serviceType] && (
            <div className="flex justify-between items-start pb-4 border-b border-slate-200/40 dark:border-white/5">
              <div className="text-sm">
                <span className="block font-bold text-slate-800 dark:text-slate-200">
                  {PRICING_CONFIG.services[serviceType].label}
                </span>
                <span className="text-xs text-slate-400">
                  {t('wizard.live_quote.base_service')}
                </span>
              </div>
              <span className="font-bold text-slate-900 dark:text-white">
                ${PRICING_CONFIG.services[serviceType].basePrice.toLocaleString()}
              </span>
            </div>
          )}

          {/* Platform / Project Types */}
          {projectType.length > 0 && (
            <div className="space-y-3 pb-4 border-b border-slate-200/40 dark:border-white/5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t('wizard.live_quote.platforms_type')}
              </span>
              {projectType.map((type: string) => {
                const config = PRICING_CONFIG.projectTypes[type];
                return config ? (
                  <div key={type} className="flex justify-between items-center text-sm">
                    <span className="text-slate-600 dark:text-slate-400 font-medium">
                      {config.label}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">
                      ${config.basePrice.toLocaleString()}
                    </span>
                  </div>
                ) : null;
              })}
            </div>
          )}

          {/* Features */}
          {features.length > 0 && (
            <div className="space-y-3 pb-4 border-b border-slate-200/40 dark:border-white/5">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {t('wizard.live_quote.addons_promo')}
              </span>
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
                      <span className="text-slate-600 dark:text-slate-400 font-medium">
                        {config.label}
                        {isFree && (
                          <span className="text-emerald-500 font-bold text-xs ml-1.5">
                            {t('wizard.live_quote.included')}
                          </span>
                        )}
                      </span>
                      <div className="text-right">
                        {isFree ? (
                          <>
                            <span className="line-through text-slate-400 text-xs mr-2">
                              ${config.basePrice.toLocaleString()}
                            </span>
                            <span className="font-bold text-emerald-500">$0</span>
                          </>
                        ) : (
                          <span className="font-bold text-slate-900 dark:text-white">
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
              <span className="text-slate-500 text-xs font-bold uppercase tracking-wider">
                {t('wizard.live_quote.estimated_range')}
              </span>
            </div>
            <div className="flex items-baseline justify-between">
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400">
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
