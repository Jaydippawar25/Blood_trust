import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Activity, 
  CheckCircle, 
  Clock, 
  Hospital, 
  MapPin, 
  Phone, 
  User, 
  AlertTriangle, 
  Check, 
  Truck, 
  Plus, 
  ShieldCheck,
  RefreshCw
} from 'lucide-react';

export default function RequestTracker() {
  const [requests, setRequests] = useState([]);
  const [selectedReqId, setSelectedReqId] = useState(null);
  const [responding, setResponding] = useState(false);

  useEffect(() => {
    setRequests([]);
  }, []);

  const handleAccept = async (reqId) => {
    setResponding(true);
    // Optimistic UI update
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'In Transit', acceptedBy: 'Jane Doe' } : r));
    await acceptRequest(reqId, 'Jane Doe');
    setResponding(false);
  };

  const handleMarkFulfilled = async (reqId) => {
    setResponding(true);
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: 'Fulfilled' } : r));
    await markFulfilled(reqId);
    setResponding(false);
  };

  const activeReq = requests.find(r => r.id === selectedReqId) || requests[0] || {};
  const compatible = getCompatibleGroups(activeReq.bloodGroup || 'A+');

  // Progress Stepper Step Index Calculator
  const getStepIndex = (status) => {
    switch(status) {
      case 'Fulfilled': return 3;
      case 'In Transit': return 2;
      case 'Donors Matched': return 1;
      default: return 0;
    }
  };

  const currentStep = getStepIndex(activeReq.status);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 font-sans">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-navy-900 to-slate-950 text-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-bold uppercase mb-2">
              <Activity className="w-3.5 h-3.5 text-emerald-300 animate-pulse" />
              Live `onSnapshot` Request Fulfillment Feed
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Real-Time Emergency Blood Request Tracker
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              Track emergency requisitions, view compatible donor responses, and monitor fulfillment progress in real time.
            </p>
          </div>

          <Link
            to="/request-blood"
            className="px-6 py-3 rounded-2xl bg-trustred-700 hover:bg-trustred-800 text-white font-extrabold text-xs shadow-lg transition flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Submit Requisition</span>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Requisition Select Sidebar */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="text-xs font-black uppercase tracking-wider text-slate-500">
            Active Requisitions ({requests.length}):
          </h3>

          <div className="space-y-3">
            {requests.map((req) => {
              const isSelected = req.id === (selectedReqId || activeReq.id);
              return (
                <div
                  key={req.id}
                  onClick={() => setSelectedReqId(req.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all space-y-2 ${
                    isSelected
                      ? 'bg-trustred-50 border-trustred-700 shadow-md ring-2 ring-trustred-700/20'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-mono text-[10px] text-slate-500 uppercase">{req.id}</span>
                      <h4 className="font-extrabold text-sm text-slate-900">{req.patientName}</h4>
                    </div>
                    <span className="w-8 h-8 rounded-xl bg-red-100 text-trustred-700 font-black text-xs flex items-center justify-center border border-red-200">
                      {req.bloodGroup}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 flex items-center gap-1">
                    <Hospital className="w-3.5 h-3.5 text-slate-400" />
                    <span>{req.hospitalName} ({req.city})</span>
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-[11px]">
                    <span className={`px-2 py-0.5 rounded font-black uppercase text-[10px] ${
                      req.urgency === 'Critical Emergency' ? 'bg-red-100 text-red-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {req.urgency}
                    </span>
                    <span className="font-bold text-slate-700">{req.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Detailed Tracker Stepper & Donor Response Matrix */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Active Request Details & Progress Stepper */}
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-100 pb-4">
              <div>
                <span className="font-mono text-xs text-slate-500 font-bold">Serial ID: {activeReq.id}</span>
                <h2 className="text-2xl font-extrabold text-slate-900 mt-0.5">{activeReq.patientName}</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-1">
                  <Hospital className="w-4 h-4 text-trustred-700" />
                  <span>{activeReq.hospitalName}, {activeReq.city}</span>
                </p>
              </div>

              <div className="text-right">
                <div className="text-3xl font-black text-trustred-700">{activeReq.bloodGroup}</div>
                <div className="text-xs text-slate-500 font-bold">{activeReq.unitsRequired} Units ({activeReq.component || 'RBC'})</div>
              </div>
            </div>

            {/* Live Timeline Stepper (4 Steps) */}
            <div className="space-y-2">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-500 mb-4">
                Fulfillment Progress Stepper Timeline (`onSnapshot` Live):
              </h4>

              <div className="grid grid-cols-4 gap-2 relative">
                
                {/* Step 1: Requisition Pending */}
                <div className={`p-3 rounded-2xl border text-center space-y-1 transition ${
                  currentStep >= 0 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 text-slate-400'
                }`}>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto">
                    {currentStep > 0 ? <Check className="w-4 h-4" /> : '1'}
                  </div>
                  <div className="font-extrabold text-xs">Requisition Submitted</div>
                </div>

                {/* Step 2: Donors Matched */}
                <div className={`p-3 rounded-2xl border text-center space-y-1 transition ${
                  currentStep >= 1 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 text-slate-400'
                }`}>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto">
                    {currentStep > 1 ? <Check className="w-4 h-4" /> : '2'}
                  </div>
                  <div className="font-extrabold text-xs">Donors Matched</div>
                </div>

                {/* Step 3: In Transit */}
                <div className={`p-3 rounded-2xl border text-center space-y-1 transition ${
                  currentStep >= 2 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 text-slate-400'
                }`}>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto">
                    {currentStep > 2 ? <Check className="w-4 h-4" /> : '3'}
                  </div>
                  <div className="font-extrabold text-xs">In Transit</div>
                </div>

                {/* Step 4: Fulfilled */}
                <div className={`p-3 rounded-2xl border text-center space-y-1 transition ${
                  currentStep >= 3 ? 'bg-emerald-50 border-emerald-300 text-emerald-900' : 'bg-slate-50 text-slate-400'
                }`}>
                  <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center mx-auto">
                    4
                  </div>
                  <div className="font-extrabold text-xs">Fulfilled</div>
                </div>

              </div>
            </div>

            {/* Matched Local Donors List */}
            <div className="space-y-4 pt-4 border-t border-slate-100">
              <div className="flex justify-between items-center">
                <h4 className="font-extrabold text-sm text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-trustred-700" />
                  Matched Local Compatible Donors ({compatible.join(', ')}):
                </h4>
                {activeReq.status !== 'Fulfilled' && (
                  <button
                    onClick={() => handleMarkFulfilled(activeReq.id)}
                    disabled={responding}
                    className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg shadow"
                  >
                    Mark Request Fulfilled
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {(activeReq.matchedDonors || []).map((donor, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs">
                    <div>
                      <div className="flex items-center gap-2">
                        <strong className="font-extrabold text-slate-900 text-sm">{donor.name}</strong>
                        <span className="px-2 py-0.5 bg-red-100 text-trustred-700 font-black rounded text-[10px]">
                          {donor.bloodGroup}
                        </span>
                      </div>
                      <div className="text-slate-500 flex items-center gap-2 mt-1">
                        <Phone className="w-3.5 h-3.5 text-slate-400 font-mono" />
                        <span className="font-mono">{donor.phone}</span>
                        <span>• {donor.city}</span>
                      </div>
                    </div>

                    {activeReq.status === 'Donors Matched' ? (
                      <button
                        onClick={() => handleAccept(activeReq.id)}
                        disabled={responding}
                        className="px-4 py-2 bg-trustred-700 hover:bg-trustred-800 text-white font-bold rounded-xl shadow transition text-xs flex items-center gap-1"
                      >
                        <Check className="w-4 h-4" />
                        <span>Accept & Respond to Request</span>
                      </button>
                    ) : (
                      <span className="px-3 py-1 bg-emerald-100 text-emerald-800 font-black rounded-lg text-[10px] uppercase">
                        Donor Responded
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
