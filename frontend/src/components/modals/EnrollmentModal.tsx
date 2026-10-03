import React, { useState } from 'react';
import { DaycareCenter } from '../../types';

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  centers: DaycareCenter[];
  onSuccess: (enrollment: any) => void;
}

export const EnrollmentModal: React.FC<EnrollmentModalProps> = ({
  isOpen,
  onClose,
  centers,
  onSuccess,
}) => {
  const [parentName, setParentName] = useState('');
  const [childName, setChildName] = useState('');
  const [childDob, setChildDob] = useState('2023-04-15');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedCenterId, setSelectedCenterId] = useState(centers[0]?.id || '');
  const [programChoice, setProgramChoice] = useState('Preschool Explorers (3-4 Years)');
  const [allergies, setAllergies] = useState('None');
  const [startDate, setStartDate] = useState('2026-11-01');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName.trim() || !childName.trim() || !email.trim()) return;

    const center = centers.find((c) => c.id === selectedCenterId) || centers[0];
    onSuccess({
      parentName,
      childName,
      childDob,
      email,
      phone,
      centerName: center.name,
      programChoice,
      allergies,
      startDate,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-graduation-cap"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Student Enrollment Application</h3>
              <p className="text-xs text-slate-500">Secure placement for Fall 2026 / Spring 2027 academic sessions</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Parent / Guardian Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Maryam Ali"
                value={parentName}
                onChange={(e) => setParentName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Child's Legal Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Zainab Ahmed"
                value={childName}
                onChange={(e) => setChildName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="maryam@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Primary Phone Number *</label>
              <input
                type="tel"
                required
                placeholder="+1 (555) 345-6789"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Campus Choice</label>
              <select
                value={selectedCenterId}
                onChange={(e) => setSelectedCenterId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
              >
                {centers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.district})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Child Date of Birth</label>
              <input
                type="date"
                value={childDob}
                onChange={(e) => setChildDob(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Enrolling Program</label>
            <select
              value={programChoice}
              onChange={(e) => setProgramChoice(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
            >
              <option value="Infant Nurture Care (6-12 Mos)">Infant Nurture Care (6-12 Mos)</option>
              <option value="Toddler Discoveries (1-2 Years)">Toddler Discoveries (1-2 Years)</option>
              <option value="Preschool Explorers (3-4 Years)">Preschool Explorers (3-4 Years)</option>
              <option value="Kindergarten Prep (4-5 Years)">Kindergarten Prep (4-5 Years)</option>
              <option value="STEM Explorers & Robotics">STEM Explorers & Robotics</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Start Date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Medical / Allergy Notes</label>
              <input
                type="text"
                placeholder="e.g. Peanut allergy, asthma"
                value={allergies}
                onChange={(e) => setAllergies(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-5 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 font-semibold text-slate-600 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all shadow-md flex items-center gap-2"
            >
              <i className="fa-solid fa-file-signature"></i>
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
