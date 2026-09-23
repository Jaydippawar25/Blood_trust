import React, { useState } from 'react';
import { 
  Search, 
  MapPin, 
  Building, 
  Phone, 
  Clock, 
  CheckCircle, 
  Truck, 
  Users, 
  FileText, 
  ArrowRight,
  ShieldCheck,
  Droplet
} from 'lucide-react';

const trackingStages = [
  { key: 'Pending', label: 'Requisition Received', icon: FileText, desc: 'Request logged into blood trust network' },
  { key: 'Donors Matched', label: 'Donors Matched', icon: Users, desc: 'Compatible donors notified and confirmed' },
  { key: 'In Transit', label: 'Blood In Transit', icon: Truck, desc: 'Cold-chain dispatch team en route to hospital' },
  { key: 'Fulfilled', label: 'Fulfilled & Delivered', icon: CheckCircle, desc: 'Blood delivered and verified by medical staff' }
];

export default function AdminTrackRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [search, setSearch] = useState('');

  const activeRequest = requests.find(r => r.id === selectedId) || requests[0];

  const getStageIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Donors Matched': return 1;
      case 'In Transit': return 2;
      case 'Fulfilled': return 3;
      default: return 0;
    }
  };

  const handleSetStage = (newStatus) => {
    setRequests(prev => prev.map(req => {
      if (req.id === selectedId) {
        return { ...req, status: newStatus };
      }
      return req;
    }));
  };

  const filteredList = requests.filter(r => 
    r.id.toLowerCase().includes(search.toLowerCase()) ||
    r.patientName.toLowerCase().includes(search.toLowerCase()) ||
    r.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
    r.bloodGroup.toLowerCase().includes(search.toLowerCase())
  );

  const currentStageIndex = getStageIndex(activeRequest?.status);

  return (
    <div className="space-y-6 font-sans">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <Truck className="w-6 h-6 text-trustred-700" />
            Live Blood Delivery & Request Tracking Command
          </h2>
          <p className="text-xs text-slate-500 mt-1">Track emergency dispatches, cold-chain transport, and update delivery milestones in real-time</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Side: Request Selector List */}
        <div className="lg:col-span-4 bg-white p-5 rounded-3xl border border-slate-200 shadow-sm space-y-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Search REQ ID or patient..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-trustred-700"
            />
          </div>

          <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
            {filteredList.map((req) => (
              <button
                key={req.id}
                onClick={() => setSelectedId(req.id)}
                className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between ${
                  selectedId === req.id 
                    ? "bg-red-50 border-trustred-700 shadow-sm" 
                    : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                }`}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-black text-slate-900">{req.id}</span>
                    <span className="px-2 py-0.5 rounded bg-red-100 text-trustred-700 font-extrabold text-[10px]">
                      {req.bloodGroup}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-slate-900">{req.patientName}</div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[180px]">{req.hospitalName}</div>
                </div>

                <div className="text-right space-y-1">
                  <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase inline-block ${
                    req.status === 'Fulfilled' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Right Side: Active Request Tracking Monitor & Interactive Controls */}
        <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
          {activeRequest ? (
            <>
              {/* Header Info */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-5 gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 bg-slate-900 text-white font-mono font-bold text-xs rounded-xl">
                      {activeRequest.id}
                    </span>
                    <span className="px-2.5 py-1 rounded-full bg-rose-100 text-rose-800 text-[10px] font-black uppercase">
                      {activeRequest.urgency}
                    </span>
                  </div>
                  <h3 className="text-2xl font-black text-slate-900 mt-2">{activeRequest.patientName}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeRequest.hospitalName}, {activeRequest.city}</span>
                  </p>
                </div>

                <div className="bg-red-50 p-4 rounded-2xl border border-red-100 text-center min-w-[130px]">
                  <div className="text-[10px] font-bold uppercase text-slate-400">Blood Requested</div>
                  <div className="text-xl font-black text-trustred-700 flex items-center justify-center gap-1 mt-0.5">
                    <Droplet className="w-5 h-5 fill-current" />
                    {activeRequest.bloodGroup}
                  </div>
                  <div className="text-xs font-bold text-slate-700">{activeRequest.unitsRequired} Units • {activeRequest.component}</div>
                </div>
              </div>

              {/* Progress Stepper Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-extrabold uppercase text-slate-400 tracking-wider">
                  Live Dispatch & Fulfillment Stepper
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 relative">
                  {trackingStages.map((stage, idx) => {
                    const StageIcon = stage.icon;
                    const isCompleted = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <div
                        key={stage.key}
                        className={`p-4 rounded-2xl border transition space-y-2 relative ${
                          isCurrent
                            ? "bg-slate-900 text-white border-slate-900 shadow-lg ring-2 ring-trustred-700 ring-offset-2"
                            : isCompleted
                            ? "bg-emerald-50 border-emerald-200 text-emerald-900"
                            : "bg-slate-50 border-slate-200 text-slate-400"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <StageIcon className={`w-5 h-5 ${
                            isCurrent ? "text-trustred-500" : isCompleted ? "text-emerald-600" : "text-slate-400"
                          }`} />
                          <span className="font-mono text-[10px] font-bold">Step 0{idx + 1}</span>
                        </div>

                        <div>
                          <div className={`font-extrabold text-xs ${isCurrent ? "text-white" : ""}`}>
                            {stage.label}
                          </div>
                          <div className={`text-[10px] leading-tight mt-1 ${
                            isCurrent ? "text-slate-300" : isCompleted ? "text-emerald-700" : "text-slate-400"
                          }`}>
                            {stage.desc}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Admin Milestone Update Controller */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
                <h4 className="text-xs font-extrabold uppercase text-slate-700">
                  Update Delivery Milestone Stage
                </h4>
                <div className="flex flex-wrap gap-2">
                  {trackingStages.map((stg) => (
                    <button
                      key={stg.key}
                      onClick={() => handleSetStage(stg.key)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                        activeRequest.status === stg.key
                          ? "bg-trustred-700 text-white shadow-md"
                          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      <span>Mark: {stg.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Additional Dispatch Info */}
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-400 uppercase text-[10px]">Contact Person</div>
                  <div className="font-extrabold text-slate-900 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-trustred-700" />
                    <span>{activeRequest.contactPhone}</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-slate-200 space-y-1">
                  <div className="font-bold text-slate-400 uppercase text-[10px]">Reason for Request</div>
                  <div className="font-extrabold text-slate-900">{activeRequest.reason}</div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 font-semibold">
              Select a request from the left column to view tracking details.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
