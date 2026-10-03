import React, { useState } from 'react';
import { UserItem } from '../../../types';

interface UsersViewProps {
  users: UserItem[];
  onOpenNewUser: () => void;
  onExport: () => void;
}

const roleBadge = (role: UserItem['role']) => {
  switch (role) {
    case 'SUPER_ADMIN':
      return 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'DAYCARE_OWNER':
      return 'bg-amber-50 text-amber-600 border-amber-100';
    case 'DAYCARE_ADMIN':
      return 'bg-blue-50 text-blue-600 border-blue-100';
    default:
      return 'bg-emerald-50 text-emerald-600 border-emerald-100';
  }
};

const planChip = (status: UserItem['planStatus']) => {
  switch (status) {
    case 'Active':
      return 'bg-emerald-50 text-emerald-600';
    case 'Expiring Soon':
      return 'bg-amber-50 text-amber-600';
    case 'Grace Period':
      return 'bg-rose-50 text-rose-600';
    default:
      return 'bg-indigo-50 text-indigo-600';
  }
};

const statusDot = (status: UserItem['userStatus']) => {
  switch (status) {
    case 'Active':
      return 'bg-emerald-500';
    case 'Pending':
      return 'bg-amber-500';
    default:
      return 'bg-rose-500';
  }
};

export const UsersView: React.FC<UsersViewProps> = ({ users, onOpenNewUser, onExport }) => {
  const [query, setQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState<'all' | UserItem['role']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | UserItem['userStatus']>('all');

  const filtered = users.filter((u) => {
    const q = query.toLowerCase();
    const matchesQuery =
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.centerName.toLowerCase().includes(q);
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    const matchesStatus = statusFilter === 'all' || u.userStatus === statusFilter;
    return matchesQuery && matchesRole && matchesStatus;
  });

  const activeUsers = users.filter((u) => u.userStatus === 'Active').length;
  const activePlans = users.filter((u) => u.planStatus === 'Active').length;
  const expiring = users.filter(
    (u) => u.planStatus === 'Expiring Soon' || u.planStatus === 'Grace Period'
  ).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
            <i className="fa-solid fa-users text-[11px]"></i>
            <span>Identity &amp; Billing</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-display">
            Users &amp; Subscriptions
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Every account in the network — roles, plans, billing health and access status.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onExport}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer transition-all flex items-center gap-1.5"
          >
            <i className="fa-solid fa-file-arrow-down text-emerald-500"></i>
            <span>Export</span>
          </button>
          <button
            onClick={onOpenNewUser}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
          >
            <i className="fa-solid fa-user-plus"></i>
            <span>Add User</span>
          </button>
        </div>
      </section>

      {/* Summary Cards */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center">
              <i className="fa-solid fa-users text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Total Users</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">{users.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <i className="fa-solid fa-user-check text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Active Accounts</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">{activeUsers}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-credit-card text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Active Plans</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">{activePlans}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <i className="fa-solid fa-clock text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Plans At Risk</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">{expiring}</div>
        </div>
      </section>

      {/* Users Table */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="relative flex-1">
            <i className="fa-solid fa-magnifying-glass text-xs absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 placeholder-slate-400 transition-all"
              placeholder="Search by name, email or center..."
              type="text"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as typeof roleFilter)}
              className="px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-600 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All roles</option>
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="DAYCARE_OWNER">Owner</option>
              <option value="DAYCARE_ADMIN">Admin</option>
              <option value="TEACHER">Teacher</option>
              <option value="TEACHER (Early)">Teacher (Early)</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
              className="px-3 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 text-slate-600 font-semibold focus:outline-none cursor-pointer"
            >
              <option value="all">All statuses</option>
              <option value="Active">Active</option>
              <option value="Pending">Pending</option>
              <option value="Restricted">Restricted</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 bg-slate-50/60">
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Role</th>
                <th className="py-3 px-4 font-semibold">Center</th>
                <th className="py-3 px-4 font-semibold">Subscription</th>
                <th className="py-3 px-4 font-semibold">Next Billing</th>
                <th className="py-3 px-4 font-semibold">Status</th>
                <th className="py-3 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <span className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-500 text-white flex items-center justify-center text-[11px] font-bold shrink-0">
                        {u.initials}
                      </span>
                      <div className="min-w-0">
                        <div className="font-bold text-slate-800 flex items-center gap-1.5 truncate">
                          <span className="truncate">{u.name}</span>
                          {u.verified && (
                            <i className="fa-solid fa-circle-check text-blue-500 text-[10px]"></i>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate">{u.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-bold whitespace-nowrap ${roleBadge(
                        u.role
                      )}`}
                    >
                      {u.role.replace('DAYCARE_', '').replace(' (Early)', ' (Early)')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-700 truncate max-w-[140px]">
                      {u.centerName}
                    </div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[140px]">
                      {u.centerLocation}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-700">{u.planName}</div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${planChip(
                          u.planStatus
                        )}`}
                      >
                        {u.planStatus}
                      </span>
                      <span className="text-[10px] text-slate-400">{u.daysLeft}d left</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-slate-600 whitespace-nowrap">{u.nextBillingDate}</div>
                    <div className="text-[11px] text-slate-400 flex items-center gap-1">
                      {u.billingMethod}
                      {u.autoRenew && (
                        <span className="text-emerald-500 font-bold" title="Auto-renew on">
                          • auto
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold whitespace-nowrap">
                      <span className={`w-1.5 h-1.5 rounded-full ${statusDot(u.userStatus)}`}></span>
                      {u.userStatus}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-blue-600 flex items-center justify-center cursor-pointer transition-colors"
                        title="View profile"
                      >
                        <i className="fa-solid fa-eye text-[11px]"></i>
                      </button>
                      <button
                        className="w-7 h-7 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-indigo-600 flex items-center justify-center cursor-pointer transition-colors"
                        title="Edit user"
                      >
                        <i className="fa-solid fa-pen text-[11px]"></i>
                      </button>
                      <button
                        className="w-7 h-7 rounded-lg hover:bg-rose-50 text-slate-400 hover:text-rose-500 flex items-center justify-center cursor-pointer transition-colors"
                        title="Suspend user"
                      >
                        <i className="fa-solid fa-ban text-[11px]"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-10 text-center text-slate-400 font-semibold">
                    No users match the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>
            Showing <b className="text-slate-600">{filtered.length}</b> of{' '}
            <b className="text-slate-600">{users.length}</b> users
          </span>
          <span>Page 1 of 1</span>
        </div>
      </section>
    </div>
  );
};
