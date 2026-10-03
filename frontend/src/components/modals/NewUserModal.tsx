import React, { useState } from 'react';
import { UserItem, DaycareCenter } from '../../types';

interface NewUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  centers: DaycareCenter[];
  onAddUser: (user: UserItem) => void;
}

export const NewUserModal: React.FC<NewUserModalProps> = ({
  isOpen,
  onClose,
  centers,
  onAddUser,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('+1 (555) ');
  const [role, setRole] = useState<UserItem['role']>('DAYCARE_ADMIN');
  const [selectedCenterId, setSelectedCenterId] = useState(centers[0]?.id || '');
  const [planName, setPlanName] = useState('Pro Annual License');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const center = centers.find((c) => c.id === selectedCenterId) || centers[0];
    const initials = name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);

    const newUser: UserItem = {
      id: `usr-${Date.now()}`,
      name,
      initials: initials || 'US',
      email,
      phone: phone || '+1 (555) 012-3456',
      role,
      verified: true,
      centerName: center ? center.name : 'Central Network',
      centerLocation: center ? center.district : 'Network Wide',
      planName,
      planDetails: '365 Days • Active Tenant',
      daysLeft: 365,
      planStatus: 'Active',
      nextBillingDate: 'Oct 02, 2027',
      billingMethod: 'Visa •••• 4242',
      autoRenew: true,
      userStatus: 'Active',
      enrolledKids: 0,
      maxKids: center ? center.capacity : 150,
      enrolledStaff: 1,
      maxStaff: 25,
    };

    onAddUser(newUser);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Add Platform User</h3>
              <p className="text-xs text-slate-500">Assign role credentials and bind campus tenant</p>
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
          <div>
            <label className="block font-semibold text-slate-700 mb-1">Full Legal Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Marian Ali"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                required
                placeholder="marian@campus.abc.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 (555) 019-3321"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">User Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as any)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                <option value="DAYCARE_OWNER">DAYCARE_OWNER</option>
                <option value="DAYCARE_ADMIN">DAYCARE_ADMIN</option>
                <option value="TEACHER">TEACHER</option>
                <option value="TEACHER (Early)">TEACHER (Early Years)</option>
                <option value="SUPER_ADMIN">SUPER_ADMIN</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Assigned Campus</label>
              <select
                value={selectedCenterId}
                onChange={(e) => setSelectedCenterId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
              >
                {centers.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.district})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Assigned Subscription Tier</label>
            <input
              type="text"
              value={planName}
              onChange={(e) => setPlanName(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
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
              <i className="fa-solid fa-check"></i>
              Create User Account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
