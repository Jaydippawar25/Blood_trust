import React, { useState, useEffect } from 'react';
import { 
  AlertTriangle, 
  Plus, 
  Search, 
  Filter, 
  CheckCircle, 
  Clock, 
  Truck, 
  XCircle, 
  Users, 
  Phone, 
  MapPin, 
  Building, 
  Droplet,
  X
} from 'lucide-react';

export default function AdminManageRequests() {
  const [requests, setRequests] = useState([]);
  const [search, setSearch] = useState('');
  const [urgencyFilter, setUrgencyFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // New Emergency Request Modal
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedRequestForDonors, setSelectedRequestForDonors] = useState(null);

  // New Request Form State
  const [newReq, setNewReq] = useState({
    patientName: '',
    hospitalName: '',
    city: 'Mumbai',
    bloodGroup: 'A+',
    component: 'RBC',
    unitsRequired: 2,
    urgency: 'Critical Emergency',
    contactPhone: '',
    reason: 'Surgical Requisition'
  });

  useEffect(() => {
    const unsubscribe = subscribeToBloodRequests((data) => {
      if (data && data.length > 0) {
        setRequests(data);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleUpdateStatus = (id, newStatus) => {
    setRequests(prev => prev.map(req => {
      if (req.id === id) {
        return { ...req, status: newStatus };
      }
      return req;
    }));
  };

  const handleCreateRequest = (e) => {
    e.preventDefault();
    if (!newReq.patientName || !newReq.hospitalName) return;

    const created = {
      id: `REQ-${Math.floor(9000 + Math.random() * 999)}`,
      patientName: newReq.patientName,
      hospitalName: newReq.hospitalName,
      city: newReq.city,
      bloodGroup: newReq.bloodGroup,
      component: newReq.component,
      unitsRequired: Number(newReq.unitsRequired),
      urgency: newReq.urgency,
      contactPhone: newReq.contactPhone || '+91 98000 11122',
      reason: newReq.reason,
      status: 'Pending',
      matchedDonorsCount: 2,
      createdAt: new Date().toISOString(),
      matchedDonors: [
        { name: 'Jane Doe', bloodGroup: 'O+', phone: '+1 555-019-2834', city: newReq.city, responded: false },
        { name: 'Vikram Mehta', bloodGroup: newReq.bloodGroup, phone: '+91 98200 11223', city: newReq.city, responded: true }
      ]
    };

    setRequests(prev => [created, ...prev]);
    setShowCreateModal(false);
    setNewReq({
      patientName: '',
      hospitalName: '',
      city: 'Mumbai',
      bloodGroup: 'A+',
      component: 'RBC',
      unitsRequired: 2,
      urgency: 'Critical Emergency',
      contactPhone: '',
      reason: 'Surgical Requisition'
    });
  };

  const filteredRequests = requests.filter(r => {
    const matchesSearch =
      r.patientName.toLowerCase().includes(search.toLowerCase()) ||
      r.hospitalName.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.city.toLowerCase().includes(search.toLowerCase()) ||
      r.bloodGroup.toLowerCase().includes(search.toLowerCase());

    const matchesUrgency = urgencyFilter === 'All' || r.urgency === urgencyFilter;
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;

    return matchesSearch && matchesUrgency && matchesStatus;
  });

  return (
    <div className="space-y-6 font-sans">
      {/* Header & Action Bar */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <AlertTriangle className="w-6 h-6 text-trustred-700" />
            Emergency Blood Requisition Command Center
          </h2>
          <p className="text-xs text-slate-500 mt-1">Review hospital requisitions, dispatch donor alerts, and manage emergency fulfillment</p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 bg-trustred-700 hover:bg-trustred-800 text-white font-bold rounded-xl text-xs flex items-center gap-2 shadow-md transition"
        >
          <Plus className="w-4 h-4" />
          <span>Create Emergency Request</span>
        </button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200 text-center">
          <div className="text-2xl font-black text-slate-900">{requests.length}</div>
          <div className="text-[10px] font-extrabold uppercase text-slate-500 mt-0.5">Total Requisitions</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-rose-200 bg-rose-50/50 text-center">
          <div className="text-2xl font-black text-rose-700">
            {requests.filter(r => r.urgency === 'Critical Emergency').length}
          </div>
          <div className="text-[10px] font-extrabold uppercase text-rose-800 mt-0.5">Critical Emergency</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-amber-200 bg-amber-50/50 text-center">
          <div className="text-2xl font-black text-amber-700">
            {requests.filter(r => r.status === 'Pending').length}
          </div>
          <div className="text-[10px] font-extrabold uppercase text-amber-800 mt-0.5">Pending Dispatch</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-emerald-200 bg-emerald-50/50 text-center">
          <div className="text-2xl font-black text-emerald-700">
            {requests.filter(r => r.status === 'Fulfilled').length}
          </div>
          <div className="text-[10px] font-extrabold uppercase text-emerald-800 mt-0.5">Fulfilled & Saved</div>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search REQ ID, patient, hospital, city..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs font-semibold focus:outline-none focus:border-trustred-700"
          />
        </div>

        <div className="flex flex-wrap gap-2 w-full md:w-auto items-center">
          <select
            value={urgencyFilter}
            onChange={e => setUrgencyFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
          >
            <option value="All">All Urgency Levels</option>
            <option value="Critical Emergency">Critical Emergency</option>
            <option value="Urgent">Urgent</option>
            <option value="Normal">Normal</option>
          </select>

          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 bg-white"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Donors Matched">Donors Matched</option>
            <option value="In Transit">In Transit</option>
            <option value="Fulfilled">Fulfilled</option>
          </select>
        </div>
      </div>

      {/* Requests Grid / Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredRequests.length === 0 ? (
          <div className="col-span-2 bg-white p-8 rounded-3xl border border-slate-200 text-center text-slate-400 font-semibold">
            No blood requisitions match the query.
          </div>
        ) : (
          filteredRequests.map((req) => (
            <div
              key={req.id}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col justify-between space-y-4 hover:shadow-md transition"
            >
              <div className="space-y-3">
                {/* Header line */}
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <span className="font-mono text-[11px] font-extrabold text-slate-400">{req.id}</span>
                    <h3 className="text-base font-extrabold text-slate-900">{req.patientName}</h3>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                    req.urgency === 'Critical Emergency'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : req.urgency === 'Urgent'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {req.urgency}
                  </span>
                </div>

                {/* Details */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-slate-50 p-2.5 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Required Group</div>
                    <div className="font-black text-trustred-700 text-sm flex items-center gap-1">
                      <Droplet className="w-3.5 h-3.5 fill-current" />
                      {req.bloodGroup} ({req.component})
                    </div>
                    <div className="text-[11px] text-slate-500 font-semibold">{req.unitsRequired} Units</div>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl space-y-1">
                    <div className="text-[10px] uppercase font-bold text-slate-400">Location</div>
                    <div className="font-bold text-slate-900 truncate flex items-center gap-1">
                      <Building className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{req.hospitalName}</span>
                    </div>
                    <div className="text-[11px] text-slate-500 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-slate-400" />
                      <span>{req.city}</span>
                    </div>
                  </div>
                </div>

                {/* Contact & Reason */}
                <div className="text-xs text-slate-600 flex justify-between items-center border-t border-slate-100 pt-2">
                  <span className="font-semibold">{req.reason}</span>
                  <span className="font-mono text-slate-500 font-bold">{req.contactPhone}</span>
                </div>
              </div>

              {/* Status & Controls */}
              <div className="border-t border-slate-100 pt-3 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-semibold">Status:</span>
                  <span className={`px-2 py-0.5 rounded-md text-[10px] font-extrabold uppercase ${
                    req.status === 'Fulfilled'
                      ? 'bg-emerald-100 text-emerald-800'
                      : req.status === 'In Transit'
                      ? 'bg-blue-100 text-blue-800'
                      : req.status === 'Donors Matched'
                      ? 'bg-purple-100 text-purple-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}>
                    {req.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {req.matchedDonors && req.matchedDonors.length > 0 && (
                    <button
                      onClick={() => setSelectedRequestForDonors(req)}
                      className="px-2.5 py-1.5 rounded-xl bg-purple-50 text-purple-700 border border-purple-200 hover:bg-purple-100 text-xs font-bold transition flex items-center gap-1"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>{req.matchedDonors.length} Donors</span>
                    </button>
                  )}

                  <select
                    value={req.status}
                    onChange={e => handleUpdateStatus(req.id, e.target.value)}
                    className="px-2.5 py-1.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-800 bg-white"
                  >
                    <option value="Pending">Set Pending</option>
                    <option value="Donors Matched">Set Donors Matched</option>
                    <option value="In Transit">Set In Transit</option>
                    <option value="Fulfilled">Mark Fulfilled</option>
                  </select>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Matched Donors Modal */}
      {selectedRequestForDonors && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-md w-full rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-700" />
                  Matched Donors for {selectedRequestForDonors.id}
                </h3>
                <p className="text-xs text-slate-500">{selectedRequestForDonors.patientName} • {selectedRequestForDonors.bloodGroup}</p>
              </div>
              <button 
                onClick={() => setSelectedRequestForDonors(null)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
              {selectedRequestForDonors.matchedDonors.map((m, idx) => (
                <div key={idx} className="p-3 bg-slate-50 rounded-2xl flex justify-between items-center text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{m.name}</div>
                    <div className="text-slate-500 font-mono">{m.phone} • {m.city}</div>
                  </div>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold ${
                    m.responded ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                  }`}>
                    {m.responded ? 'Responded' : 'Alert Sent'}
                  </span>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedRequestForDonors(null)}
              className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Create Request Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white max-w-lg w-full rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="flex justify-between items-center border-b border-slate-100 pb-3">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Plus className="w-5 h-5 text-trustred-700" />
                Create Emergency Blood Requisition
              </h3>
              <button 
                onClick={() => setShowCreateModal(false)}
                className="p-1 text-slate-400 hover:text-slate-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRequest} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Patient Full Name</label>
                  <input
                    type="text"
                    required
                    value={newReq.patientName}
                    onChange={e => setNewReq({ ...newReq, patientName: e.target.value })}
                    placeholder="Robert Chen"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hospital Name</label>
                  <input
                    type="text"
                    required
                    value={newReq.hospitalName}
                    onChange={e => setNewReq({ ...newReq, hospitalName: e.target.value })}
                    placeholder="Lilavati Hospital"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Required Blood Group</label>
                  <select
                    value={newReq.bloodGroup}
                    onChange={e => setNewReq({ ...newReq, bloodGroup: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-xs bg-white text-trustred-700"
                  >
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Component</label>
                  <select
                    value={newReq.component}
                    onChange={e => setNewReq({ ...newReq, component: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-xs bg-white"
                  >
                    <option value="RBC">RBC (Packed Red Cells)</option>
                    <option value="Platelets">Platelets</option>
                    <option value="Plasma">Fresh Frozen Plasma</option>
                    <option value="Whole Blood">Whole Blood</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Units Needed</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={newReq.unitsRequired}
                    onChange={e => setNewReq({ ...newReq, unitsRequired: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Urgency Priority</label>
                  <select
                    value={newReq.urgency}
                    onChange={e => setNewReq({ ...newReq, urgency: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-bold text-xs bg-white"
                  >
                    <option value="Critical Emergency">Critical Emergency</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Normal">Normal</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    required
                    value={newReq.contactPhone}
                    onChange={e => setNewReq({ ...newReq, contactPhone: e.target.value })}
                    placeholder="+91 98201 99887"
                    className="w-full px-3 py-2.5 rounded-xl border border-slate-200 font-semibold text-xs"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-trustred-700 hover:bg-trustred-800 text-white font-bold shadow-md transition"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
