import React, { useState } from 'react';
import { DaycareCenter } from '../../types';

interface NewCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddCenter: (center: DaycareCenter) => void;
}

export const NewCenterModal: React.FC<NewCenterModalProps> = ({ isOpen, onClose, onAddCenter }) => {
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [district, setDistrict] = useState('Hodan');
  const [address, setAddress] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerRole] = useState('Campus Director');
  const [ownerPhone, setOwnerPhone] = useState('');
  const [ownerEmail, setOwnerEmail] = useState('');
  const [capacity, setCapacity] = useState(150);
  const [monthlyFee, setMonthlyFee] = useState(8500);
  const [subscriptionTier, setSubscriptionTier] = useState<DaycareCenter['subscriptionTier']>('Pro Annual');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newCenter: DaycareCenter = {
      id: `abc-${Date.now()}`,
      name,
      code: code || `ABC-${district.slice(0, 2).toUpperCase()}-09`,
      address: address || `${district} Main Road, Block 4`,
      district,
      ownerName: ownerName || 'Staff Administrator',
      ownerRole,
      ownerPhone: ownerPhone || '+1 (555) 019-9000',
      ownerEmail: ownerEmail || `director@${name.toLowerCase().replace(/[^a-z0-9]/g, '')}.edu`,
      enrolled: 0,
      capacity: Number(capacity) || 120,
      teachersCount: Math.round(Number(capacity) / 8),
      staffCount: Math.round(Number(capacity) / 6),
      ratio: '1:6',
      programs: ['Toddler Discoveries', 'Preschool Explorers', 'Kindergarten Prep'],
      subscriptionTier,
      subscriptionDaysLeft: 365,
      monthlyFee: Number(monthlyFee),
      status: 'Active',
      attendanceRate: 98.0,
      retentionRate: 96.0,
      monthlyRevenue: Number(monthlyFee),
      qualityScore: 4.8,
      trendText: 'New Campus Provisioned',
      trendType: 'positive',
    };

    onAddCenter(newCenter);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-school"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Register New Campus</h3>
              <p className="text-xs text-slate-500">Provision tenant instance and initialize licensing credentials</p>
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
              <label className="block font-semibold text-slate-700 mb-1">Campus Full Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Al-Nour Early Learning"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Campus Code</label>
              <input
                type="text"
                placeholder="e.g. ABC-AN-09"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">District / Region</label>
              <select
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Hodan">Hodan District</option>
                <option value="Waberi">Waberi District</option>
                <option value="Wadajir">Wadajir District</option>
                <option value="Karan">Karan District</option>
                <option value="Hamar Weyne">Hamar Weyne</option>
                <option value="Shibis">Shibis District</option>
                <option value="Shanghani">Shanghani District</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Street Address</label>
              <input
                type="text"
                placeholder="e.g. Maka Al Mukarama St"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100">
            <h4 className="font-bold text-slate-800 mb-2">Director / Administrator Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Director Name</label>
                <input
                  type="text"
                  placeholder="e.g. Halima Farah"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Official Email</label>
                <input
                  type="email"
                  placeholder="halima@campus.abc.org"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Max Capacity (Seats)</label>
              <input
                type="number"
                min="30"
                max="500"
                value={capacity}
                onChange={(e) => setCapacity(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Monthly Billing ($)</label>
              <input
                type="number"
                min="1000"
                max="30000"
                step="500"
                value={monthlyFee}
                onChange={(e) => setMonthlyFee(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Subscription Plan</label>
              <select
                value={subscriptionTier}
                onChange={(e) => setSubscriptionTier(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="Pro Annual">Pro Annual</option>
                <option value="Enterprise Multi">Enterprise Multi</option>
                <option value="Growth Tier">Growth Tier</option>
              </select>
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
              className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all shadow-sm flex items-center gap-2"
            >
              <i className="fa-solid fa-plus"></i>
              Provision Campus
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
