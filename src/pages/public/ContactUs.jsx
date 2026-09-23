import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactUs() {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const contactData = content.contactPage || {};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12 bg-slate-50 min-h-screen">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <h1 className="text-4xl font-extrabold text-slate-900">
          {t('contact')} <span className="text-red-700">Blood Trust</span>
        </h1>
        <p className="text-lg text-slate-600 font-medium">
          {t('contactPageDesc')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info Sidebar */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-red-800 text-white p-8 rounded-3xl space-y-6 shadow-xl border border-red-700">
            <h2 className="text-2xl font-bold text-white tracking-tight">{t('contactInfo')}</h2>
            <p className="text-sm text-red-100 leading-relaxed font-normal">
              {contactData.description || 'Our 24/7 national blood emergency hotline is monitored continuously by medical dispatchers.'}
            </p>

            <div className="space-y-5 pt-5 border-t border-red-700/80 text-sm">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/20">
                  <Phone className="w-5 h-5 text-white" />
                </div>
                <div>
                  <strong className="block text-xs font-bold uppercase tracking-wider text-red-200">{t('emergencyLine')}</strong>
                  <span className="text-white font-bold text-base">{contactData.emergencyLine || '1800-BLOOD-HELP (1800-256-634)'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/20">
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <strong className="block text-xs font-bold uppercase tracking-wider text-red-200">{t('emailInquiry')}</strong>
                  <span className="text-white font-bold text-base">{contactData.emailInquiry || 'support@bloodtrust.org'}</span>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/10 text-white flex items-center justify-center shrink-0 border border-white/20">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <strong className="block text-xs font-bold uppercase tracking-wider text-red-200">{t('headquarters')}</strong>
                  <span className="text-white font-bold text-base">{contactData.headquarters || 'Blood Trust Medical Plaza, Suite 400, Healthcare District'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white p-8 rounded-3xl border border-slate-200 shadow-md">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                <Send className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">{t('messageSent')}</h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto font-medium">
                {t('messageSentDesc')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl text-sm shadow-md transition"
              >
                {t('sendAnother')}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <h2 className="text-2xl font-extrabold text-slate-900">{t('contact')}</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">{t('yourName')}</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">{t('emailAddress')}</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">{t('subject')}</label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={e => setFormData({...formData, subject: e.target.value})}
                  placeholder="Blood Bank Partnership / General Query"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wide mb-1.5">{t('message')}</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                  placeholder="How can we assist you?"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-slate-50 text-slate-900 placeholder:text-slate-400 font-medium text-sm focus:outline-none focus:bg-white focus:border-red-600 focus:ring-2 focus:ring-red-500/20"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-red-700 hover:bg-red-800 text-white font-bold rounded-xl shadow-lg shadow-red-700/30 flex items-center justify-center gap-2 transition hover:scale-[1.01]"
              >
                <Send className="w-4 h-4" />
                <span>{t('sendMessage')}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
