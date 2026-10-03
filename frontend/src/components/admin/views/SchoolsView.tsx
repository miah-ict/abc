import React, { useState } from 'react';
import { DaycareCenter } from '../../../types';

interface SchoolsViewProps {
  centers: DaycareCenter[];
  onOpenNewCenter: () => void;
  onOpenCampusMap: () => void;
  onExport: () => void;
}

const statusChip = (status: DaycareCenter['status']) => {
  switch (status) {
    case 'Active':
      return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'Expiring':
      return 'bg-amber-50 text-amber-600 border-amber-100';
    default:
      return 'bg-rose-50 text-rose-600 border-rose-100';
  }
};

const trendIcon = (type: DaycareCenter['trendType']) => {
  if (type === 'positive') return 'fa-arrow-trend-up text-emerald-500';
  if (type === 'warning') return 'fa-triangle-exclamation text-amber-500';
  return 'fa-minus text-slate-400';
};

export const SchoolsView: React.FC<SchoolsViewProps> = ({
  centers,
  onOpenNewCenter,
  onOpenCampusMap,
  onExport,
}) => {
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | DaycareCenter['status']>('all');

  const filtered = centers.filter((c) => {
    const matchesQuery =
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.district.toLowerCase().includes(query.toLowerCase()) ||
      c.code.toLowerCase().includes(query.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const totalEnrolled = centers.reduce((sum, c) => sum + c.enrolled, 0);
  const totalCapacity = centers.reduce((sum, c) => sum + c.capacity, 0);
  const avgAttendance =
    centers.length > 0
      ? Math.round(centers.reduce((sum, c) => sum + c.attendanceRate, 0) / centers.length)
      : 0;
  const activeCount = centers.filter((c) => c.status === 'Active').length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
            <i className="fa-solid fa-school text-[11px]"></i>
            <span>Network Directory</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-display">
            Schools &amp; Centers
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Monitor every campus across the network — enrollment, staff, subscriptions and quality.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenCampusMap}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer transition-all flex items-center gap-1.5"
          >
            <i className="fa-solid fa-map-location-dot text-indigo-500"></i>
            <span>Campus Map</span>
          </button>
          <button
            onClick={onExport}
            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 cursor-pointer transition-all flex items-center gap-1.5"
          >
            <i className="fa-solid fa-file-arrow-down text-emerald-500"></i>
            <span>Export</span>
          </button>
          <button
            onClick={onOpenNewCenter}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus"></i>
            <span>Register New Center</span>
          </button>
        </div>
      </section>

      {/* Summary Stat Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-building text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Total Centers</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">{centers.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <i className="fa-solid fa-graduation-cap text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Total Enrolled</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">
            {totalEnrolled.toLocaleString()}
            <span className="text-xs font-semibold text-slate-400 ml-1.5">
              / {totalCapacity.toLocaleString()} cap.
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <i className="fa-solid fa-chart-simple text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Avg Attendance</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">{avgAttendance}%</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <i className="fa-solid fa-shield text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Active Subscriptions</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">
            {activeCount}
            <span className="text-xs font-semibold text-slate-400 ml-1.5">/ {centers.length}</span>
          </div>
        </div>
      </section>

      {/* Filters Bar */}
      <section className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-card flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1">
          <i className="fa-solid fa-magnifying-glass text-xs absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"></i>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-slate-700 placeholder-slate-400 transition-all"
            placeholder="Search by name, code or district..."
            type="text"
          />
        </div>
        <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/80 self-start">
          {(['all', 'Active', 'Expiring', 'Grace Period'] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                statusFilter === s
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {s === 'all' ? 'All' : s}
            </button>
          ))}
        </div>
      </section>

      {/* Centers Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((c) => {
          const fill = Math.min(100, Math.round((c.enrolled / c.capacity) * 100));
          return (
            <div
              key={c.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:border-blue-300 transition-all flex flex-col"
            >
              {/* Card Head */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0">
                  <span className="w-11 h-11 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-xl shrink-0">
                    🏫
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-slate-800 text-sm font-display truncate">
                        {c.name}
                      </h3>
                      {c.isHq && (
                        <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-full bg-indigo-50 text-indigo-600 border border-indigo-100 uppercase tracking-wider shrink-0">
                          HQ
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 truncate">
                      {c.code} • {c.district}
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-bold shrink-0 ${statusChip(
                    c.status
                  )}`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                  {c.status}
                </span>
              </div>

              {/* Address & Owner */}
              <p className="text-[11px] text-slate-500 mt-3 leading-relaxed line-clamp-1">
                <i className="fa-solid fa-location-dot text-slate-300 mr-1"></i>
                {c.address}
              </p>
              <p className="text-[11px] text-slate-500 mt-1">
                <i className="fa-solid fa-user-tie text-slate-300 mr-1"></i>
                {c.ownerName} ({c.ownerRole})
              </p>

              {/* Enrollment Bar */}
              <div className="mt-3.5">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-semibold text-slate-500">Enrollment</span>
                  <span className="font-bold text-slate-700">
                    {c.enrolled}/{c.capacity}
                    <span className="text-slate-400 font-normal ml-1">({fill}%)</span>
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      fill >= 95 ? 'bg-rose-500' : fill >= 85 ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${fill}%` }}
                  ></div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 text-center">
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-sm font-extrabold text-slate-800 font-display">
                    {c.teachersCount}
                  </div>
                  <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                    Teachers
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-sm font-extrabold text-slate-800 font-display">
                    {c.staffCount}
                  </div>
                  <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                    Staff
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-sm font-extrabold text-slate-800 font-display">{c.ratio}</div>
                  <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                    Ratio
                  </div>
                </div>
              </div>

              {/* Subscription & Metrics */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <div>
                  <span className="font-bold text-slate-700">{c.subscriptionTier}</span>
                  <span className="text-slate-400 ml-1">• {c.subscriptionDaysLeft}d left</span>
                </div>
                <span className="font-bold text-slate-800">
                  ${c.monthlyRevenue.toLocaleString()}
                  <span className="text-slate-400 font-normal">/mo</span>
                </span>
              </div>

              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  Attendance <b className="text-slate-700">{c.attendanceRate}%</b> • Retention{' '}
                  <b className="text-slate-700">{c.retentionRate}%</b>
                </span>
                <span className={`font-semibold flex items-center gap-1 ${trendIcon(c.trendType)}`}>
                  <i className={`fa-solid ${trendIcon(c.trendType)} text-[10px]`}></i>
                  <span className="text-slate-500">{c.trendText}</span>
                </span>
              </div>

              {/* Card Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button
                  onClick={onOpenCampusMap}
                  className="flex-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <i className="fa-solid fa-map"></i>
                  <span>View on Map</span>
                </button>
                <button
                  className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <i className="fa-solid fa-gear"></i>
                  <span>Manage</span>
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 bg-white rounded-2xl p-10 border border-dashed border-slate-200 text-center">
            <i className="fa-solid fa-magnifying-glass text-2xl text-slate-300"></i>
            <p className="text-xs text-slate-500 mt-3 font-semibold">
              No centers match your search.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
