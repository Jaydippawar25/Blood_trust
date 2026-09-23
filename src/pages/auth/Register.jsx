import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { Droplet, ArrowRight } from 'lucide-react';

export default function Register() {
  const { language, t } = useLanguage();
  const { content } = useSiteContent();
  const { register } = useAuth();
  const navigate = useNavigate();

  const donateData = content.donatePage || {};
  const isEn = language === 'en';
  const defaultDonateTitle = 'Donor Registration';
  const defaultDonateSub = 'Join the life-saving network. It takes less than 2 minutes.';

  const displayTitle = (!isEn || !donateData.title || donateData.title === defaultDonateTitle)
    ? t('donorRegistrationTitle')
    : donateData.title;

  const displaySubtitle = (!isEn || !donateData.subtitle || donateData.subtitle === defaultDonateSub)
    ? t('donorRegistrationSub')
    : donateData.subtitle;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    bloodGroup: 'O+',
    city: 'Mumbai',
    gender: 'Female',
    dateOfBirth: '',
    age: '25',
    weight: '65',
    rareGroupFlag: false
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/donor/dashboard');
    } catch (err) {
      if (err?.code === 'auth/operation-not-allowed') {
        setError('Firebase Auth Error: Email/Password sign-in method is disabled in your Firebase Console. Go to Firebase Console -> Authentication -> Sign-in method and enable Email/Password.');
      } else if (err?.code === 'auth/email-already-in-use') {
        setError('This email is already registered in Firebase. Try logging in instead.');
      } else if (err?.code === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (err?.code === 'auth/invalid-api-key') {
        setError('Firebase Error: Invalid API Key in .env file. Please check your VITE_FIREBASE_API_KEY.');
      } else {
        setError(err.message || 'Registration failed');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-navy-900 p-8 sm:p-10 rounded-3xl border border-gray-100 dark:border-navy-800 shadow-xl space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-trustred-700 flex items-center justify-center text-white mx-auto shadow-lg shadow-trustred-700/30">
            <Droplet className="w-7 h-7 fill-current" />
          </div>
          <h1 className="text-2xl font-extrabold text-gray-900 dark:text-white">
            {displayTitle}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {displaySubtitle}
          </p>
        </div>

        {error && (
          <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">{t('fullName')}</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({...formData, name: e.target.value})}
                placeholder="Jane Doe"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-trustred-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">{t('emailAddress')}</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
                placeholder="jane@example.com"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-trustred-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">{t('phoneNumber')}</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={e => setFormData({...formData, phone: e.target.value})}
                placeholder="+91 98200 11223"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-trustred-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">{t('password')}</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
                placeholder="••••••••"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-trustred-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">{t('bloodGroup')}</label>
              <select
                value={formData.bloodGroup}
                onChange={e => setFormData({...formData, bloodGroup: e.target.value})}
                className="w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-trustred-700 font-bold text-trustred-700"
              >
                {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map(g => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">{t('cityRegion')}</label>
              <input
                type="text"
                required
                value={formData.city}
                onChange={e => setFormData({...formData, city: e.target.value})}
                placeholder="Mumbai"
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-trustred-700"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-gray-700 dark:text-gray-300 mb-1">{t('weightKg')}</label>
              <input
                type="number"
                min="50"
                required
                value={formData.weight}
                onChange={e => setFormData({...formData, weight: e.target.value})}
                className="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-navy-700 bg-gray-50 dark:bg-navy-800 text-sm focus:outline-none focus:ring-2 focus:ring-trustred-700"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-trustred-700 hover:bg-trustred-800 text-white font-bold rounded-xl shadow-lg shadow-trustred-700/30 flex items-center justify-center gap-2 transition"
          >
            <span>{loading ? 'Creating Profile...' : t('registerBtn')}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="text-center text-xs text-gray-500">
          Already registered?{' '}
          <Link to="/login" className="text-trustred-700 font-bold hover:underline">
            {t('loginAccount')}
          </Link>
        </div>

      </div>
    </div>
  );
}
