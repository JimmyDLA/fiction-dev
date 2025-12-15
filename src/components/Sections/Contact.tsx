import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useTranslation } from 'react-i18next';

const SERVICE_ID = import.meta.env.VITE_EJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EJS_TEMPLATE_ID;
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
      const response = await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current!, PUBLIC_KEY);

      if (response.status === 200) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
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
    <section id="contact" className="py-20 md:py-32 relative z-10">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 md:mb-6 tracking-tight">
            {t('contact.title')}
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-400">
            {t('contact.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-zinc-900/50 rounded-3xl p-8 md:p-12 shadow-2xl shadow-blue-900/5 dark:shadow-none border border-slate-100 dark:border-white/5 backdrop-blur-sm"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                >
                  {t('contact.name')}
                </label>
                <input
                  type="text"
                  id="name"
                  name="name" // Matches default EmailJS template variable
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                  placeholder={t('contact.placeholder_name')}
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
                >
                   {t('contact.email')}
                </label>
                <input
                  type="email"
                  id="email"
                  name="email" // Matches default EmailJS template variable
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all placeholder:text-slate-400 dark:placeholder:text-gray-600"
                  placeholder={t('contact.placeholder_email')}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-slate-700 dark:text-gray-300 mb-2"
              >
                 {t('contact.message')}
              </label>
              <textarea
                id="message"
                name="message" // EmailJS standard name
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-black/50 border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none placeholder:text-slate-400 dark:placeholder:text-gray-600"
                placeholder={t('contact.placeholder_message')}
              ></textarea>
            </div>

            {status === 'error' && (
              <div className="flex items-center gap-2 text-red-500 text-sm">
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            {status === 'success' && (
              <div className="flex items-center gap-2 text-green-500 text-sm">
                <CheckCircle size={16} />
                <span>{t('contact.success')}</span>
              </div>
            )}

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="px-8 py-4 rounded-full bg-[#1a73e8] text-white font-medium text-lg hover:bg-black dark:hover:bg-slate-200 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    {t('contact.btn_sending')} <Loader2 size={20} className="animate-spin" />
                  </>
                ) : (
                  <>
                     {t('contact.btn_send')} <ArrowRight size={20} />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
