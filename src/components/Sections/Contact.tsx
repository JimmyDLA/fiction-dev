import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle, AlertCircle, Check, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const SERVICE_ID = import.meta.env.VITE_EJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EJS_CONTACT_TEMPLATE;
const PUBLIC_KEY = import.meta.env.VITE_EJS_PUBLIC_KEY;

const Contact = () => {
  const { t } = useTranslation();
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMessage(t('contact.error_fill'));
      setStatus('error');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      const response = await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current!,
        PUBLIC_KEY
      );

      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setShowSuccessModal(true);
      } else {
        setStatus('error');
        setErrorMessage(t('contact.error_send'));
      }
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus('error');
      setErrorMessage(t('contact.error_send'));
    }
  };

  return (
    <section id="contact" className="py-24 md:py-36 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <div className="inline-flex items-center gap-2 nm-pill-inset px-4 py-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 mb-4">
            <Mail size={14} />
            <span>Get in Touch</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400">{t('contact.subtitle')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="nm-flat-lg rounded-[32px] p-6 sm:p-10 md:p-12"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                >
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-2xl nm-input text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm sm:text-base font-medium"
                  placeholder={t('contact.placeholder_name')}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
                >
                  {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3.5 rounded-2xl nm-input text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 text-sm sm:text-base font-medium"
                  placeholder={t('contact.placeholder_email')}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-xs sm:text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2"
              >
                {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3.5 rounded-2xl nm-input text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-600 resize-none text-sm sm:text-base font-medium"
                placeholder={t('contact.placeholder_message')}
              />
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-rose-500 text-sm font-semibold p-3 nm-inset-sm rounded-xl">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {status === 'success' && (
              <div className="flex items-center gap-2 text-emerald-500 text-sm font-semibold p-3 nm-inset-sm rounded-xl">
                <CheckCircle size={16} />
                <span>{t('contact.success')}</span>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="nm-btn-accent px-8 py-4 rounded-full font-bold text-base sm:text-lg flex items-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <span>{t('contact.btn_sending')}</span>
                    <Loader2 size={18} className="animate-spin" />
                  </>
                ) : (
                  <>
                    <span>{t('contact.btn_send')}</span>
                    <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>

      {/* Success Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="nm-flat-xl rounded-3xl p-8 sm:p-12 text-center max-w-md w-full relative overflow-hidden"
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
                {t('contact.success_modal.title')}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 text-sm leading-relaxed">
                {t('contact.success_modal.message')}
              </p>

              <button
                onClick={() => setShowSuccessModal(false)}
                className="nm-btn-accent w-full py-3.5 rounded-full font-bold"
              >
                {t('contact.success_modal.button')}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;

