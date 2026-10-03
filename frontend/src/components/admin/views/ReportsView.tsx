import React, { useState } from 'react';
import { DaycareCenter } from '../../../types';

interface ReportsViewProps {
  centers: DaycareCenter[];
  onExport: () => void;
}

interface ReportDef {
  id: string;
  name: string;
  description: string;
  category: 'Compliance' | 'Financial' | 'Academic' | 'Operations';
  icon: string;
  iconBg: string;
  schedule: string;
  status: 'Ready' | 'Scheduled' | 'Draft';
}

const REPORTS: ReportDef[] = [
  {
    id: 'licensure',
    name: 'Licensure & Permit Audit',
    description: 'Center licenses, health permits and insurance expiry across the network.',
    category: 'Compliance',
    icon: 'fa-file-shield',
    iconBg: 'bg-indigo-50 text-indigo-600',
    schedule: 'Monthly',
    status: 'Ready',
  },
  {
    id: 'staff-ratios',
    name: 'Staff-to-Child Ratio Report',
    description: 'Teacher/child ratios per classroom against regulatory requirements.',
    category: 'Compliance',
    icon: 'fa-scale-balanced',
    iconBg: 'bg-blue-50 text-blue-600',
    schedule: 'Weekly',
    status: 'Ready',
  },
  {
    id: 'revenue',
    name: 'Revenue & Collections',
    description: 'Tuition revenue, outstanding balances and payment method breakdown.',
    category: 'Financial',
    icon: 'fa-coins',
    iconBg: 'bg-emerald-50 text-emerald-600',
    schedule: 'Monthly',
    status: 'Ready',
  },
  {
    id: 'subscriptions',
    name: 'Subscription Billing Health',
    description: 'Plan tiers, renewals, grace periods and churn risk by center.',
    category: 'Financial',
    icon: 'fa-credit-card',
    iconBg: 'bg-amber-50 text-amber-600',
    schedule: 'Weekly',
    status: 'Scheduled',
  },
  {
    id: 'enrollment',
    name: 'Enrollment & Attendance',
    description: 'Seat utilization, attendance trends and waitlist movement.',
    category: 'Academic',
    icon: 'fa-graduation-cap',
    iconBg: 'bg-sky-50 text-sky-600',
    schedule: 'Daily',
    status: 'Ready',
  },
  {
    id: 'curriculum',
    name: 'Curriculum Coverage',
    description: 'Program delivery progress vs. planned curriculum milestones.',
    category: 'Academic',
    icon: 'fa-book-open-reader',
    iconBg: 'bg-purple-50 text-purple-600',
    schedule: 'Termly',
    status: 'Draft',
  },
  {
    id: 'safety',
    name: 'Safety & Incident Log',
    description: 'Incident reports, follow-ups and resolution SLA performance.',
    category: 'Operations',
    icon: 'fa-helmet-safety',
    iconBg: 'bg-rose-50 text-rose-600',
    schedule: 'Weekly',
    status: 'Ready',
  },
  {
    id: 'staff',
    name: 'Staffing & Payroll Summary',
    description: 'Headcount, shifts, overtime and payroll cost per center.',
    category: 'Operations',
    icon: 'fa-users-gear',
    iconBg: 'bg-teal-50 text-teal-600',
    schedule: 'Monthly',
    status: 'Scheduled',
  },
];

const statusChip = (status: ReportDef['status']) => {
  switch (status) {
    case 'Ready':
      return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'Scheduled':
      return 'bg-blue-50 text-blue-600 border-blue-100';
    default:
      return 'bg-slate-100 text-slate-500 border-slate-200';
  }
};

export const ReportsView: React.FC<ReportsViewProps> = ({ centers, onExport }) => {
  const [category, setCategory] = useState<'all' | ReportDef['category']>('all');

  const categories: Array<'all' | ReportDef['category']> = [
    'all',
    'Compliance',
    'Financial',
    'Academic',
    'Operations',
  ];
  const filtered = REPORTS.filter((r) => category === 'all' || r.category === category);

  const readyCount = REPORTS.filter((r) => r.status === 'Ready').length;
  const complianceAvg = centers.length
    ? Math.round(
        (centers.filter((c) => c.status === 'Active').length / centers.length) * 100
      )
    : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
            <i className="fa-solid fa-clipboard-list text-[11px]"></i>
            <span>Reporting Center</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-display">
            Compliance Reports
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Regulatory, financial and operational report catalog — generate or schedule exports.
          </p>
        </div>
        <button
          onClick={onExport}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer transition-all flex items-center gap-1.5 self-start"
        >
          <i className="fa-solid fa-file-arrow-down"></i>
          <span>Export Full Pack</span>
        </button>
      </section>

      {/* Compliance Overview */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card flex items-center gap-4">
          <div className="relative w-14 h-14 shrink-0">
            <svg viewBox="0 0 36 36" className="w-14 h-14 -rotate-90">
              <circle cx="18" cy="18" r="15.5" fill="none" stroke="#e2e8f0" strokeWidth="5"></circle>
              <circle
                cx="18"
                cy="18"
                r="15.5"
                fill="none"
                stroke="#10b981"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={`${(complianceAvg / 100) * 97.4} 97.4`}
              ></circle>
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[11px] font-black text-slate-700">
              {complianceAvg}%
            </span>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">Network Compliance</div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {centers.filter((c) => c.status === 'Active').length} of {centers.length} centers
              fully compliant
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-file-circle-check text-lg"></i>
          </div>
          <div>
            <div className="text-xl font-black text-slate-800 font-display">
              {readyCount}/{REPORTS.length}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Reports ready to download</p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card flex items-center gap-4">
          <div className="w-11 h-11 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-hourglass-half text-lg"></i>
          </div>
          <div>
            <div className="text-xl font-black text-slate-800 font-display">5 days</div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Until next license renewal deadline
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
              category === cat
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {cat === 'all' ? 'All Reports' : cat}
          </button>
        ))}
      </section>

      {/* Report Catalog Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((r) => (
          <div
            key={r.id}
            className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:border-blue-300 transition-all flex flex-col"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 min-w-0">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${r.iconBg}`}
                >
                  <i className={`fa-solid ${r.icon} text-sm`}></i>
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-slate-800 text-sm font-display">{r.name}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500">
                      {r.category}
                    </span>
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-bold ${statusChip(
                        r.status
                      )}`}
                    >
                      {r.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed mt-3 flex-1">
              {r.description}
            </p>

            <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                <i className="fa-solid fa-rotate mr-1"></i>
                Auto: {r.schedule}
              </span>
              <div className="flex items-center gap-2">
                <button className="px-3 py-1.5 rounded-lg text-[11px] font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer transition-all flex items-center gap-1.5">
                  <i className="fa-solid fa-eye"></i>
                  <span>Preview</span>
                </button>
                <button
                  onClick={onExport}
                  className="px-3 py-1.5 rounded-lg text-[11px] font-bold bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-all flex items-center gap-1.5 shadow-sm"
                >
                  <i className="fa-solid fa-download"></i>
                  <span>Generate</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Recent Exports */}
      <section className="bg-white rounded-2xl border border-slate-200/80 shadow-card overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center">
              <i className="fa-solid fa-clock-rotate-left text-xs"></i>
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-display">Recent Exports</h3>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="text-slate-400 border-b border-slate-100 bg-slate-50/60">
                <th className="py-2.5 px-4 font-semibold">Report</th>
                <th className="py-2.5 px-4 font-semibold">Requested by</th>
                <th className="py-2.5 px-4 font-semibold">Date</th>
                <th className="py-2.5 px-4 font-semibold">Format</th>
                <th className="py-2.5 px-4 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {[
                {
                  name: 'Revenue & Collections — July 2026',
                  by: 'Mohamed Hassan',
                  date: 'Aug 2, 2026',
                  format: 'PDF',
                },
                {
                  name: 'Staff-to-Child Ratio Report — W32',
                  by: 'System (auto)',
                  date: 'Aug 1, 2026',
                  format: 'CSV',
                },
                {
                  name: 'Licensure & Permit Audit — Q2',
                  by: 'Fatima Noor',
                  date: 'Jul 28, 2026',
                  format: 'PDF',
                },
                {
                  name: 'Enrollment & Attendance — July',
                  by: 'System (auto)',
                  date: 'Jul 27, 2026',
                  format: 'XLSX',
                },
              ].map((row) => (
                <tr key={row.name} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-2.5 px-4 font-semibold text-slate-700">{row.name}</td>
                  <td className="py-2.5 px-4 text-slate-500">{row.by}</td>
                  <td className="py-2.5 px-4 text-slate-500 whitespace-nowrap">{row.date}</td>
                  <td className="py-2.5 px-4">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 text-[10px] font-bold">
                      {row.format}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-right">
                    <button className="text-blue-600 font-bold hover:text-blue-700 cursor-pointer text-[11px]">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
