import React, { useState } from 'react';
import { DaycareCenter } from '../../../types';

interface AnalyticsViewProps {
  centers: DaycareCenter[];
  onExport: () => void;
}

const monthsData = [
  { month: 'Jan', revenue: 41200, enrollments: 140 },
  { month: 'Feb', revenue: 43800, enrollments: 160 },
  { month: 'Mar', revenue: 46500, enrollments: 175 },
  { month: 'Apr', revenue: 48900, enrollments: 180 },
  { month: 'May', revenue: 51200, enrollments: 195 },
  { month: 'Jun', revenue: 53600, enrollments: 210 },
  { month: 'Jul', revenue: 55100, enrollments: 228 },
  { month: 'Aug', revenue: 57400, enrollments: 246 },
];

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ centers, onExport }) => {
  const [metric, setMetric] = useState<'revenue' | 'enrollments'>('revenue');

  const totalMonthlyRevenue = centers.reduce((sum, c) => sum + c.monthlyRevenue, 0);
  const avgAttendance = centers.length
    ? Math.round(centers.reduce((sum, c) => sum + c.attendanceRate, 0) / centers.length)
    : 0;
  const avgRetention = centers.length
    ? Math.round(centers.reduce((sum, c) => sum + c.retentionRate, 0) / centers.length)
    : 0;
  const avgQuality = centers.length
    ? Math.round(centers.reduce((sum, c) => sum + c.qualityScore, 0) / centers.length)
    : 0;

  const maxRevenue = Math.max(...monthsData.map((m) => m.revenue));
  const maxEnrollments = Math.max(...monthsData.map((m) => m.enrollments));
  const maxCenterRevenue = Math.max(...centers.map((c) => c.monthlyRevenue), 1);

  const topCenters = [...centers].sort((a, b) => b.monthlyRevenue - a.monthlyRevenue).slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
            <i className="fa-solid fa-chart-line text-[11px]"></i>
            <span>Business Intelligence</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-display">
            Executive Analytics
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Network-wide revenue, engagement and quality metrics — updated live from mock data.
          </p>
        </div>
        <button
          onClick={onExport}
          className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer transition-all flex items-center gap-1.5 self-start"
        >
          <i className="fa-solid fa-file-arrow-down"></i>
          <span>Export BI Report</span>
        </button>
      </section>

      {/* KPI Cards */}
      <section className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Monthly Revenue</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i className="fa-solid fa-sack-dollar text-xs"></i>
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">
            ${totalMonthlyRevenue.toLocaleString()}
          </div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <i className="fa-solid fa-arrow-up text-[10px]"></i>
            <span>11.4%</span>
            <span className="text-slate-400 font-normal">vs. last month</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Avg Attendance</span>
            <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-calendar-check text-xs"></i>
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">{avgAttendance}%</div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <i className="fa-solid fa-arrow-up text-[10px]"></i>
            <span>2.1%</span>
            <span className="text-slate-400 font-normal">vs. last month</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Avg Retention</span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <i className="fa-solid fa-repeat text-xs"></i>
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">{avgRetention}%</div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 mt-1">
            <i className="fa-solid fa-arrow-up text-[10px]"></i>
            <span>1.3%</span>
            <span className="text-slate-400 font-normal">vs. last month</span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500">Quality Score</span>
            <div className="w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <i className="fa-solid fa-star text-xs"></i>
            </div>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">{avgQuality}/100</div>
          <div className="flex items-center gap-1 text-[11px] font-semibold text-slate-400 mt-1">
            <span>Network average across {centers.length} centers</span>
          </div>
        </div>
      </section>

      {/* Charts Row */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Bar Chart */}
        <div className="lg:col-span-7 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                <i className="fa-solid fa-chart-column text-xs"></i>
              </div>
              <h3 className="font-bold text-slate-800 text-sm font-display">
                Monthly Performance Trend
              </h3>
            </div>
            <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
              {(['revenue', 'enrollments'] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => setMetric(m)}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-bold capitalize transition-all cursor-pointer ${
                    metric === m ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </div>

          {/* CSS Bars */}
          <div className="flex items-end justify-between gap-2.5 h-52 mt-5">
            {monthsData.map((m) => {
              const value = metric === 'revenue' ? m.revenue : m.enrollments;
              const max = metric === 'revenue' ? maxRevenue : maxEnrollments;
              const height = Math.round((value / max) * 100);
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-bold text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity">
                    {metric === 'revenue'
                      ? `$${(value / 1000).toFixed(1)}k`
                      : `${value} new`}
                  </span>
                  <div className="w-full flex-1 flex items-end">
                    <div
                      className="w-full rounded-t-lg bg-gradient-to-t from-blue-600 to-sky-400 group-hover:from-indigo-600 group-hover:to-blue-400 transition-all cursor-pointer"
                      style={{ height: `${height}%` }}
                    ></div>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">{m.month}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
            <span>Aug 2026 YTD • 8 months of data</span>
            <span className="font-bold text-emerald-600">
              <i className="fa-solid fa-arrow-trend-up mr-1"></i>
              +39% revenue since Jan
            </span>
          </div>
        </div>

        {/* Top Centers Ranking */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-500 flex items-center justify-center">
              <i className="fa-solid fa-trophy text-xs"></i>
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-display">
              Top Centers by Revenue
            </h3>
          </div>

          <div className="space-y-3.5 mt-3.5">
            {topCenters.map((c, idx) => (
              <div key={c.id} className="flex items-center gap-3">
                <span
                  className={`w-6 h-6 rounded-lg flex items-center justify-center text-[11px] font-black shrink-0 ${
                    idx === 0
                      ? 'bg-amber-100 text-amber-600'
                      : idx === 1
                        ? 'bg-slate-200 text-slate-600'
                        : idx === 2
                          ? 'bg-orange-100 text-orange-600'
                          : 'bg-slate-50 text-slate-400'
                  }`}
                >
                  {idx + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-bold text-slate-700 truncate">{c.name}</span>
                    <span className="text-xs font-bold text-slate-800 shrink-0">
                      ${c.monthlyRevenue.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-1.5 rounded-full bg-slate-100 mt-1.5 overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                      style={{ width: `${Math.round((c.monthlyRevenue / maxCenterRevenue) * 100)}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
            {topCenters.length === 0 && (
              <p className="text-xs text-slate-400 text-center py-6 font-semibold">
                No center data available.
              </p>
            )}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 rounded-xl bg-slate-50">
              <div className="text-sm font-extrabold text-slate-800 font-display">
                {avgAttendance}%
              </div>
              <div className="text-[9px] font-semibold text-slate-400 uppercase">Attendance</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <div className="text-sm font-extrabold text-slate-800 font-display">
                {avgRetention}%
              </div>
              <div className="text-[9px] font-semibold text-slate-400 uppercase">Retention</div>
            </div>
            <div className="p-2 rounded-xl bg-slate-50">
              <div className="text-sm font-extrabold text-slate-800 font-display">
                {avgQuality}
              </div>
              <div className="text-[9px] font-semibold text-slate-400 uppercase">Quality</div>
            </div>
          </div>
        </div>
      </section>

      {/* Insights Row */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <i className="fa-solid fa-lightbulb text-xs"></i>
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-display">Growth Insight</h3>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Enrollment grew <b className="text-slate-700">8%</b> this month — the strongest month
            of 2026. Kindergarten programs account for <b className="text-slate-700">34%</b> of new
            seats.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center">
              <i className="fa-solid fa-triangle-exclamation text-xs"></i>
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-display">Attention Needed</h3>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            <b className="text-slate-700">Karaama Center</b> is in a subscription grace period and
            <b className="text-slate-700"> Abdallah Center</b> is at 99% capacity — consider
            overflow routing.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-wand-magic-sparkles text-xs"></i>
            </div>
            <h3 className="font-bold text-slate-800 text-sm font-display">Recommendation</h3>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">
            Launching an after-school enrichment program in
            <b className="text-slate-700"> Hamarwayne</b> could capture an estimated
            <b className="text-slate-700"> +45 students</b> based on district demographics.
          </p>
        </div>
      </section>
    </div>
  );
};
