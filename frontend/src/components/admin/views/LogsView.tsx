import React, { useState } from 'react';

type LogCategory = 'All' | 'Auth' | 'Data' | 'Billing' | 'System';

interface LogEntry {
  id: number;
  time: string;
  date: string;
  user: string;
  initials: string;
  action: string;
  detail: string;
  category: Exclude<LogCategory, 'All'>;
  status: 'Success' | 'Failed' | 'Warning';
  ip: string;
}

const LOGS: LogEntry[] = [
  {
    id: 1,
    time: '10:24 AM',
    date: 'Aug 21, 2026',
    user: 'Mohamed Hassan',
    initials: 'MH',
    action: 'Logged in',
    detail: 'Super Admin session started',
    category: 'Auth',
    status: 'Success',
    ip: '41.62.118.24',
  },
  {
    id: 2,
    time: '10:11 AM',
    date: 'Aug 21, 2026',
    user: 'Fatima Noor',
    initials: 'FN',
    action: 'Updated program',
    detail: 'Early Learning curriculum v3 approved',
    category: 'Data',
    status: 'Success',
    ip: '41.62.118.31',
  },
  {
    id: 3,
    time: '09:58 AM',
    date: 'Aug 21, 2026',
    user: 'System',
    initials: 'SY',
    action: 'Nightly backup',
    detail: 'Snapshot abc_prod_20260821 completed (248 MB)',
    category: 'System',
    status: 'Success',
    ip: 'internal',
  },
  {
    id: 4,
    time: '09:47 AM',
    date: 'Aug 21, 2026',
    user: 'Abdirahman Ali',
    initials: 'AA',
    action: 'Failed login attempt',
    detail: 'Invalid password (3rd attempt)',
    category: 'Auth',
    status: 'Failed',
    ip: '197.156.44.102',
  },
  {
    id: 5,
    time: '09:30 AM',
    date: 'Aug 21, 2026',
    user: 'System',
    initials: 'SY',
    action: 'Payment received',
    detail: '$1,250.00 school fees — Hodan Center',
    category: 'Billing',
    status: 'Success',
    ip: 'internal',
  },
  {
    id: 6,
    time: '09:02 AM',
    date: 'Aug 21, 2026',
    user: 'Amina Yusuf',
    initials: 'AY',
    action: 'Exported report',
    detail: 'Staff-to-Child Ratio Report — W34 (CSV)',
    category: 'Data',
    status: 'Success',
    ip: '41.62.119.7',
  },
  {
    id: 7,
    time: '08:45 AM',
    date: 'Aug 21, 2026',
    user: 'System',
    initials: 'SY',
    action: 'Subscription warning',
    detail: 'Karaama Center entered grace period',
    category: 'Billing',
    status: 'Warning',
    ip: 'internal',
  },
  {
    id: 8,
    time: '08:20 AM',
    date: 'Aug 21, 2026',
    user: 'Mohamed Hassan',
    initials: 'MH',
    action: 'Created user',
    detail: 'New teacher account: Hodan Center',
    category: 'Data',
    status: 'Success',
    ip: '41.62.118.24',
  },
  {
    id: 9,
    time: '07:55 AM',
    date: 'Aug 21, 2026',
    user: 'System',
    initials: 'SY',
    action: 'Health check',
    detail: 'All 8 centers online — API latency 42ms',
    category: 'System',
    status: 'Success',
    ip: 'internal',
  },
  {
    id: 10,
    time: '11:40 PM',
    date: 'Aug 20, 2026',
    user: 'System',
    initials: 'SY',
    action: 'Session expired',
    detail: 'Auto-logout after 30m inactivity (2 users)',
    category: 'Auth',
    status: 'Warning',
    ip: 'internal',
  },
  {
    id: 11,
    time: '10:15 PM',
    date: 'Aug 20, 2026',
    user: 'Fatima Noor',
    initials: 'FN',
    action: 'Changed settings',
    detail: 'Capacity alerts threshold: 90% → 85%',
    category: 'System',
    status: 'Success',
    ip: '41.62.118.31',
  },
  {
    id: 12,
    time: '06:02 PM',
    date: 'Aug 20, 2026',
    user: 'System',
    initials: 'SY',
    action: 'Invoice overdue',
    detail: 'Trial Tier (Expired) — Abdallah Center, $420',
    category: 'Billing',
    status: 'Failed',
    ip: 'internal',
  },
];

const statusStyle = (status: LogEntry['status']) => {
  switch (status) {
    case 'Success':
      return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'Failed':
      return 'bg-rose-50 text-rose-600 border-rose-100';
    default:
      return 'bg-amber-50 text-amber-600 border-amber-100';
  }
};

const categoryIcon: Record<Exclude<LogCategory, 'All'>, string> = {
  Auth: 'fa-key text-blue-600 bg-blue-50',
  Data: 'fa-database text-indigo-600 bg-indigo-50',
  Billing: 'fa-credit-card text-amber-600 bg-amber-50',
  System: 'fa-server text-slate-500 bg-slate-100',
};

export const LogsView: React.FC = () => {
  const [category, setCategory] = useState<LogCategory>('All');
  const [query, setQuery] = useState('');

  const filtered = LOGS.filter((l) => {
    const matchesCat = category === 'All' || l.category === category;
    const q = query.toLowerCase();
    const matchesQuery =
      l.user.toLowerCase().includes(q) ||
      l.action.toLowerCase().includes(q) ||
      l.detail.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  const failedCount = LOGS.filter((l) => l.status === 'Failed').length;
  const successCount = LOGS.filter((l) => l.status === 'Success').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
            <i className="fa-solid fa-shield-halved text-[11px]"></i>
            <span>Security Trail</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-display">
            Logs &amp; Activity
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Immutable audit trail of every admin, billing and system event across the network.
          </p>
        </div>
        <div className="flex items-center gap-2.5 self-start">
          <span className="px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-600 text-[11px] font-bold border border-emerald-100">
            {successCount} success
          </span>
          <span className="px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 text-[11px] font-bold border border-rose-100">
            {failedCount} failed
          </span>
        </div>
      </section>

      {/* Filters */}
      <section className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card flex flex-col lg:flex-row lg:items-center gap-3">
        <div className="relative flex-1">
          <i className="fa-solid fa-magnifying-glass text-xs absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 placeholder-slate-400 transition-all"
            placeholder="Search logs by user, action or details..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-start overflow-x-auto">
          {(['All', 'Auth', 'Data', 'Billing', 'System'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap ${
                category === c
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Log Timeline Table */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 bg-slate-50/60">
                <th className="py-3 px-4 font-semibold">Time</th>
                <th className="py-3 px-4 font-semibold">User</th>
                <th className="py-3 px-4 font-semibold">Event</th>
                <th className="py-3 px-4 font-semibold">Category</th>
                <th className="py-3 px-4 font-semibold">IP Address</th>
                <th className="py-3 px-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {filtered.map((l) => (
                <tr key={l.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="font-bold text-slate-700">{l.time}</div>
                    <div className="text-[11px] text-slate-400">{l.date}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {l.initials}
                      </span>
                      <span className="font-semibold text-slate-700 whitespace-nowrap">
                        {l.user}
                      </span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-800">{l.action}</div>
                    <div className="text-[11px] text-slate-400 max-w-[280px] truncate">
                      {l.detail}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span
                      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        categoryIcon[l.category]
                      }`}
                    >
                      <i className={`fa-solid ${categoryIcon[l.category].split(' ')[0]}`}></i>
                      {l.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                    {l.ip}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-bold ${statusStyle(
                        l.status
                      )}`}
                    >
                      {l.status}
                    </span>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-10 text-center text-slate-400 font-semibold">
                    No log entries match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>
            Showing <b className="text-slate-600">{filtered.length}</b> of{' '}
            <b className="text-slate-600">{LOGS.length}</b> events
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Live feed • retained 24 months
          </span>
        </div>
      </section>
    </div>
  );
};
