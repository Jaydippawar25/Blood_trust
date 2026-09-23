import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { 
  getDonorByUserId,
  updateDonor,
  getNextEligibleDate 
} from '../../services/donorService';
import { generateDonationCertificatePDF } from '../../services/pdfService';
import { 
  User, 
  MapPin, 
  Phone, 
  CheckCircle, 
  Download, 
  Edit3, 
  FileText
} from 'lucide-react';

export default function DonorDashboard() {
  const { t } = useLanguage();
  const { currentUser, userProfile } = useAuth();
  const [profile, setProfile] = useState({
    donorId: 'BT-DONOR-...',
    name: currentUser?.displayName || userProfile?.name || 'Valued Donor',
    email: currentUser?.email || userProfile?.email || '',
    phone: userProfile?.phone || '',
    bloodGroup: userProfile?.bloodGroup || 'O+',
    city: userProfile?.city || 'Mumbai',
    gender: 'Female',
    lastDonationDate: null,
    totalDonations: 0
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDonorData() {
      if (currentUser?.uid) {
        try {
          const donorDoc = await getDonorByUserId(currentUser.uid);
          if (donorDoc) {
            setProfile(donorDoc);
          } else {
            setProfile(prev => ({
              ...prev,
              donorId: `BT-DONOR-${currentUser.uid.slice(0, 5).toUpperCase()}`,
              name: userProfile?.name || currentUser.email.split('@')[0],
              email: currentUser.email
            }));
          }
        } catch (err) {
          console.warn('Error loading donor profile:', err);
        } finally {
          setLoading(false);
        }
      }
    }
    loadDonorData();
  }, [currentUser, userProfile]);

  const handleProfileSave = async (e) => {
    e.preventDefault();
    if (profile.id) {
      await updateDonor(profile.id, {
        name: profile.name,
        city: profile.city,
        phone: profile.phone
      });
    }
    setIsEditing(false);
  };

  const nextEligible = getNextEligibleDate(profile.lastDonationDate, profile.gender);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 font-sans">
      
      {/* Header Profile Banner */}
      <div className="bg-gradient-to-r from-trustred-700 via-rose-700 to-trustred-900 text-white p-8 rounded-3xl shadow-xl flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase mb-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-300" />
            Health Status: {nextEligible === 'Eligible Now' ? 'Eligible to Donate' : `Eligible on ${nextEligible}`}
          </div>
          <h1 className="text-3xl font-extrabold">{profile.name}</h1>
          <p className="text-xs text-red-100 mt-1 font-mono">
            {t('donorId')}: <span className="bg-white/10 px-2.5 py-0.5 rounded text-white font-bold">{profile.donorId || 'BT-DONOR-REGISTERED'}</span>
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/40 p-4 rounded-2xl border border-white/20">
          <div className="text-center">
            <div className="text-3xl font-black text-white">{profile.bloodGroup || 'O+'}</div>
            <div className="text-[10px] text-red-200 uppercase font-bold">{t('bloodGroup')}</div>
          </div>
          <div className="h-10 w-px bg-white/20"></div>
          <div className="text-center">
            <div className="text-3xl font-black text-white">{profile.totalDonations || 0}</div>
            <div className="text-[10px] text-red-200 uppercase font-bold">{t('unitsDonated')}</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Profile */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Profile Edit Card */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <User className="w-4 h-4 text-trustred-700" />
                Donor Profile Information
              </h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-xs font-bold text-trustred-700 flex items-center gap-1 hover:underline"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>{isEditing ? 'Cancel' : 'Edit Profile'}</span>
              </button>
            </div>

            {isEditing ? (
              <form onSubmit={handleProfileSave} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold mb-1">{t('fullName')}</label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({...profile, name: e.target.value})}
                    className="w-full px-3 py-2 rounded-xl border dark:bg-slate-800"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold mb-1">{t('cityRegion')}</label>
                    <input
                      type="text"
                      value={profile.city}
                      onChange={e => setProfile({...profile, city: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl border dark:bg-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block font-bold mb-1">{t('phoneNumber')}</label>
                    <input
                      type="text"
                      value={profile.phone}
                      onChange={e => setProfile({...profile, phone: e.target.value})}
                      className="w-full px-3 py-2 rounded-xl border dark:bg-slate-800"
                    />
                  </div>
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-trustred-700 text-white font-bold rounded-xl text-xs"
                >
                  Save Profile Changes
                </button>
              </form>
            ) : (
              <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-medium text-slate-400">Email Address</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100">{profile.email}</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-slate-800">
                  <span className="font-medium text-slate-400">Phone Number</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    <Phone className="w-3 h-3 text-emerald-600" />
                    {profile.phone || 'Not provided'}
                  </span>
                </div>
                <div className="flex items-center justify-between py-1">
                  <span className="font-medium text-slate-400">City / Location</span>
                  <span className="font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-red-600" />
                    {profile.city || 'Mumbai'}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Certificates */}
        <div className="lg:col-span-6 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-trustred-700" />
              Download Official Lifesaver Certificate
            </h3>
            <p className="text-xs text-slate-500">
              Generate an official PDF certificate recognizing your voluntary blood donation contribution.
            </p>
            <button
              onClick={() => generateDonationCertificatePDF({
                donorName: profile.name,
                certificateId: `CERT-${profile.donorId || 'DONOR'}`,
                date: new Date().toISOString().split('T')[0],
                bloodBankName: 'Blood Trust Certified Network',
                units: 1,
                component: 'RBC / Whole Blood'
              })}
              className="px-4 py-2.5 bg-trustred-700 text-white rounded-xl font-bold text-xs flex items-center gap-2 hover:bg-trustred-800 transition shadow-md"
            >
              <Download className="w-4 h-4" />
              Download Certificate PDF
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
