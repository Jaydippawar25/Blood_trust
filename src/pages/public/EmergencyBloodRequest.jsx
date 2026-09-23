import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  AlertTriangle, 
  Hospital, 
  User, 
  MapPin, 
  Droplet, 
  Phone, 
  FileText, 
  Upload, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function EmergencyBloodRequest() {
  const navigate = useNavigate();

  const [patientName, setPatientName] = useState('Robert Chen');
  const [hospitalName, setHospitalName] = useState('Lilavati Hospital & Research Centre');
  const [city, setCity] = useState('Mumbai');
  const [bloodGroup, setBloodGroup] = useState('A+');
  const [component, setComponent] = useState('RBC');
  const [unitsRequired, setUnitsRequired] = useState(2);
  const [urgency, setUrgency] = useState('Critical Emergency'); // 'Normal' | 'Urgent' | 'Critical Emergency'
  const [contactPhone, setContactPhone] = useState('+91 98201 99887');
  const [reason, setReason] = useState('Emergency Surgery Requisition');
  const [fileName, setFileName] = useState('Doctor_Requisition_Slip.pdf');

  const [loading, setLoading] = useState(false);
  const [submittedRequest, setSubmittedRequest] = useState(null);

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const components = ['RBC', 'Plasma', 'Platelets', 'Whole Blood'];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newReq = {
      id: `REQ-${Date.now().toString().slice(-4)}`,
      patientName,
      hospitalName,
      city,
      bloodGroup,
      component,
      unitsRequired: Number(unitsRequired),
      urgency,
      contactPhone,
      reason,
      fileName,
      status: 'Broadcasted'
    };

    setSubmittedRequest(newReq);
    setLoading(false);
  };

  const compatibleGroups = getCompatibleGroups(bloodGroup);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-trustred-700 via-rose-700 to-trustred-900 text-white p-8 rounded-3xl shadow-xl space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-bold uppercase">
          <Zap className="w-4 h-4 text-amber-300 animate-pulse" />
          24/7 Emergency Dispatch Network
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Submit Patient Emergency Blood Requisition
        </h1>
        <p className="text-xs sm:text-sm text-red-100 max-w-2xl">
          Submit blood requisitions directly to nearby partner blood banks and certified voluntary donors. Critical emergency requests trigger instant SMS & Email alert dispatches.
        </p>
      </div>

      {submittedRequest ? (
        /* Success Screen with Direct Tracker Link */
        <div className="bg-white p-8 sm:p-10 rounded-3xl border border-emerald-200 shadow-xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-black text-slate-900">
              Requisition Successfully Dispatched!
            </h2>
            <p className="text-xs text-slate-500 font-mono">
              Requisition Serial ID: <strong className="text-trustred-700">{submittedRequest.id}</strong>
            </p>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
              Automated donor matching identified <strong>{compatibleGroups.join(', ')}</strong> compatible donors in <strong>{city}</strong>. SMS & Email alerts have been dispatched to local voluntary donors.
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-4">
            <Link
              to="/track-requests"
              className="px-8 py-3.5 rounded-xl bg-trustred-700 hover:bg-trustred-800 text-white font-extrabold text-xs shadow-lg transition flex items-center gap-2"
            >
              <span>View Live Real-Time Request Tracker</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      ) : (
        /* Form Card */
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-xl space-y-6">
          
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Priority Urgency Level Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700">
                1. Select Requisition Priority Urgency
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <button
                  type="button"
                  onClick={() => setUrgency('Normal')}
                  className={`p-4 rounded-2xl border text-left transition ${
                    urgency === 'Normal'
                      ? 'bg-blue-50 border-blue-500 text-blue-900 ring-2 ring-blue-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="font-extrabold text-sm flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
                    Normal (Within 72 Hours)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Scheduled surgeries or elective procedures</div>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('Urgent')}
                  className={`p-4 rounded-2xl border text-left transition ${
                    urgency === 'Urgent'
                      ? 'bg-amber-50 border-amber-500 text-amber-900 ring-2 ring-amber-500/20'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="font-extrabold text-sm flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                    Urgent (Within 24 Hours)
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Urgent medical requirements</div>
                </button>

                <button
                  type="button"
                  onClick={() => setUrgency('Critical Emergency')}
                  className={`p-4 rounded-2xl border text-left transition ${
                    urgency === 'Critical Emergency'
                      ? 'bg-red-50 border-trustred-700 text-trustred-900 ring-2 ring-trustred-700/20 shadow-md'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="font-extrabold text-sm flex items-center gap-1.5 text-trustred-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-trustred-700 animate-ping"></span>
                    Critical Emergency
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1">Triggers immediate SMS & Email alerts</div>
                </button>

              </div>
            </div>

            {/* Patient & Hospital Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Patient Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={e => setPatientName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Hospital / Medical Center Name</label>
                <div className="relative">
                  <Hospital className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={hospitalName}
                    onChange={e => setHospitalName(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm font-semibold"
                  />
                </div>
              </div>

            </div>

            {/* Blood Group, City, Component, Units */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Blood Group Needed</label>
                <select
                  value={bloodGroup}
                  onChange={e => setBloodGroup(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-extrabold text-sm text-trustred-700"
                >
                  {bloodGroups.map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Component</label>
                <select
                  value={component}
                  onChange={e => setComponent(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-sm"
                >
                  {components.map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Units Required</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  required
                  value={unitsRequired}
                  onChange={e => setUnitsRequired(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-extrabold text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">City / Region</label>
                <input
                  type="text"
                  required
                  value={city}
                  onChange={e => setCity(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-sm"
                />
              </div>

            </div>

            {/* Contact Phone & Reason */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Attendant Contact Phone</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    required
                    value={contactPhone}
                    onChange={e => setContactPhone(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 font-mono text-sm font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-700 mb-1">Medical Reason / Notes</label>
                <input
                  type="text"
                  required
                  value={reason}
                  onChange={e => setReason(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 text-sm font-medium"
                />
              </div>
            </div>

            {/* Compatibility Summary Banner */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-trustred-700 shrink-0" />
                <span>
                  <strong>ABO/Rh Compatibility Engine:</strong> Patients with <strong>{bloodGroup}</strong> can receive blood from: <strong>{compatibleGroups.join(', ')}</strong>.
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-2xl bg-trustred-700 hover:bg-trustred-800 text-white font-extrabold text-sm shadow-xl shadow-trustred-700/30 flex items-center justify-center gap-2 transition hover:scale-[1.01]"
            >
              <span>{loading ? 'Dispatching Emergency Alerts...' : 'Dispatch Emergency Blood Requisition'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>

          </form>

        </div>
      )}

    </div>
  );
}
