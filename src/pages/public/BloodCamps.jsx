import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { useSiteContent } from '../../context/SiteContentContext';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Users, 
  Plus, 
  CheckCircle, 
  Search, 
  Building, 
  Heart,
  Droplet,
  Sparkles
} from 'lucide-react';

export default function BloodCamps() {
  const { t } = useLanguage();
  const { content } = useSiteContent();
  const [camps, setCamps] = useState([]);
  const [selectedCity, setSelectedCity] = useState('ALL');

  const campsData = content.campsPage || {};
  
  // Book Slot Modal State
  const [showBookModal, setShowBookModal] = useState(false);
  const [activeCamp, setActiveCamp] = useState(null);
  const [donorName, setDonorName] = useState('Jane Doe');
  const [donorEmail, setDonorEmail] = useState('donor@bloodtrust.org');
  const [donorPhone, setDonorPhone] = useState('+91 98200 11223');
  const [bookSuccess, setBookSuccess] = useState(false);

  // Organize Camp Modal State
  const [showOrganizeModal, setShowOrganizeModal] = useState(false);
  const [orgTitle, setOrgTitle] = useState('');
  const [orgName, setOrgName] = useState('');
  const [orgCity, setOrgCity] = useState('Mumbai');
  const [orgVenue, setOrgVenue] = useState('');
  const [orgDate, setOrgDate] = useState('2026-09-25');
  const [orgSuccess, setOrgSuccess] = useState(false);

  useEffect(() => {
    setCamps([]);
  }, []);

  const handleBookSlot = (e) => {
    e.preventDefault();
    setBookSuccess(true);
    setTimeout(() => {
      setBookSuccess(false);
      setShowBookModal(false);
    }, 2000);
  };

  const handleOrganizeSubmit = (e) => {
    e.preventDefault();
    setOrgSuccess(true);
    setTimeout(() => {
      setOrgSuccess(false);
      setShowOrganizeModal(false);
    }, 2000);
  };

  const filteredCamps = camps.filter(c => selectedCity === 'ALL' || c.city === selectedCity);
  const cities = ['ALL', 'Mumbai', 'Pune', 'Nashik'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-trustred-700 via-rose-700 to-trustred-900 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Voluntary Mobile Blood Camps
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              {t('upcomingBloodCamps')}
            </h1>
            <p className="text-xs sm:text-sm text-red-100 mt-1 max-w-2xl">
              {campsData.subtitle || 'Locate mobile blood donation camps, register for donation slots, or partner with us to organize a blood camp at your corporate office, college, or community center.'}
            </p>
          </div>

          <button
            onClick={() => setShowOrganizeModal(true)}
            className="px-6 py-3.5 rounded-2xl bg-white text-trustred-700 hover:bg-slate-100 font-extrabold text-xs shadow-lg transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-trustred-700" />
            <span>{t('organizeCamp')}</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-extrabold text-slate-700 uppercase">
          <Calendar className="w-4 h-4 text-trustred-700" />
          <span>Filter Camps by City:</span>
        </div>

        <div className="flex items-center gap-2">
          {cities.map(c => (
            <button
              key={c}
              onClick={() => setSelectedCity(c)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                selectedCity === c
                  ? 'bg-trustred-700 text-white shadow'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {c === 'ALL' ? 'All Cities' : c}
            </button>
          ))}
        </div>
      </div>

      {/* Camps Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredCamps.map((camp) => {
          const progressPercent = Math.min(100, Math.round((camp.registeredCount / (camp.targetUnits || 100)) * 100));
          return (
            <div key={camp.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition">
              
              <div>
                <div className="h-44 relative overflow-hidden">
                  <img src={camp.img} alt={camp.title} className="w-full h-full object-cover" />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-xl bg-trustred-700 text-white font-extrabold text-xs shadow">
                    {camp.city}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{camp.id}</span>
                  <h3 className="font-extrabold text-base text-slate-900 leading-snug">{camp.title}</h3>
                  <p className="text-xs text-slate-500 font-medium">Organizer: <strong className="text-slate-800">{camp.organizer}</strong></p>

                  <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 text-trustred-700 shrink-0 mt-0.5" />
                      <span>{camp.venue}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                      <span>{camp.date} ({camp.time})</span>
                    </div>
                  </div>

                  {/* Registered Progress Bar */}
                  <div className="pt-2 space-y-1">
                    <div className="flex justify-between text-[11px] font-bold text-slate-600">
                      <span>Slots Registered</span>
                      <span className="text-trustred-700">{camp.registeredCount} / {camp.targetUnits} Units</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div className="h-full bg-trustred-700 rounded-full" style={{ width: `${progressPercent}%` }}></div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="p-6 pt-0">
                <button
                  onClick={() => {
                    setActiveCamp(camp);
                    setShowBookModal(true);
                  }}
                  className="w-full py-3 bg-trustred-700 hover:bg-trustred-800 text-white font-bold rounded-xl text-xs shadow transition flex items-center justify-center gap-1.5"
                >
                  <Heart className="w-4 h-4 fill-current text-white" />
                  <span>{t('bookCampSlot')}</span>
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Book Camp Slot Modal */}
      {showBookModal && activeCamp && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            
            {bookSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-extrabold text-slate-900">Camp Slot Booked!</h3>
                <p className="text-xs text-slate-500">Your donation slot has been reserved for {activeCamp.title}.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-extrabold text-slate-900">Book Camp Donation Slot</h3>
                <p className="text-xs text-slate-500">{activeCamp.title} ({activeCamp.date})</p>

                <form onSubmit={handleBookSlot} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Donor Name</label>
                    <input
                      type="text"
                      required
                      value={donorName}
                      onChange={e => setDonorName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={donorEmail}
                      onChange={e => setDonorEmail(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Phone</label>
                    <input
                      type="text"
                      required
                      value={donorPhone}
                      onChange={e => setDonorPhone(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border font-mono font-semibold"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowBookModal(false)}
                      className="w-1/2 py-2.5 rounded-xl border font-bold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 rounded-xl bg-trustred-700 text-white font-bold shadow"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}

      {/* Organize Camp Modal */}
      {showOrganizeModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 shadow-2xl space-y-4">
            
            {orgSuccess ? (
              <div className="text-center py-6 space-y-3">
                <CheckCircle className="w-12 h-12 text-emerald-600 mx-auto" />
                <h3 className="text-lg font-extrabold text-slate-900">Camp Proposal Submitted!</h3>
                <p className="text-xs text-slate-500">Our medical team will review your camp proposal shortly.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-extrabold text-slate-900">{t('organizeCamp')}</h3>

                <form onSubmit={handleOrganizeSubmit} className="space-y-3 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Camp Title / Drive Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Corporate Tech Park Drive"
                      value={orgTitle}
                      onChange={e => setOrgTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Organizing Body / Company Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rotary Club / Tech Corp"
                      value={orgName}
                      onChange={e => setOrgName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border font-semibold"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">City</label>
                      <input
                        type="text"
                        required
                        value={orgCity}
                        onChange={e => setOrgCity(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Proposed Date</label>
                      <input
                        type="date"
                        required
                        value={orgDate}
                        onChange={e => setOrgDate(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl border font-semibold"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Venue Address</label>
                    <input
                      type="text"
                      required
                      placeholder="Full street address"
                      value={orgVenue}
                      onChange={e => setOrgVenue(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border font-semibold"
                    />
                  </div>

                  <div className="flex gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowOrganizeModal(false)}
                      className="w-1/2 py-2.5 rounded-xl border font-bold text-slate-600"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="w-1/2 py-2.5 rounded-xl bg-trustred-700 text-white font-bold shadow"
                    >
                      Submit Proposal
                    </button>
                  </div>
                </form>
              </>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
