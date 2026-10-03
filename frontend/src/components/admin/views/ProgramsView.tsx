import React, { useState } from 'react';
import { ProgramItem } from '../../../types';

interface ProgramsViewProps {
  programs: ProgramItem[];
  onOpenNewProgram: () => void;
  onExport: () => void;
}

const statusTypeChip = (type: ProgramItem['statusType']) => {
  switch (type) {
    case 'active':
      return 'bg-emerald-50 text-emerald-600 border-emerald-100';
    case 'bilingual':
      return 'bg-sky-50 text-sky-600 border-sky-100';
    case 'accredited':
      return 'bg-indigo-50 text-indigo-600 border-indigo-100';
    case 'stem':
      return 'bg-purple-50 text-purple-600 border-purple-100';
    default:
      return 'bg-amber-50 text-amber-600 border-amber-100';
  }
};

export const ProgramsView: React.FC<ProgramsViewProps> = ({
  programs,
  onOpenNewProgram,
  onExport,
}) => {
  const [category, setCategory] = useState<'all' | ProgramItem['category']>('all');

  const categories = Array.from(new Set(programs.map((p) => p.category)));
  const filtered = programs.filter((p) => category === 'all' || p.category === category);

  const totalEnrolled = programs.reduce((sum, p) => sum + p.enrolled, 0);
  const totalCapacity = programs.reduce((sum, p) => sum + p.capacity, 0);
  const avgTuition =
    programs.length > 0
      ? Math.round(programs.reduce((sum, p) => sum + p.tuition, 0) / programs.length)
      : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-700 text-xs font-semibold mb-2">
            <i className="fa-solid fa-shapes text-[11px]"></i>
            <span>Academic Catalog</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight font-display">
            Programs &amp; Curriculum
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Age-tailored programs, ratios, tuition and enrollment capacity across the network.
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
            onClick={onOpenNewProgram}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm cursor-pointer transition-all flex items-center gap-1.5"
          >
            <i className="fa-solid fa-plus"></i>
            <span>New Program</span>
          </button>
        </div>
      </section>

      {/* Summary Row */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center">
              <i className="fa-solid fa-book-open text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Total Programs</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">{programs.length}</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <i className="fa-solid fa-child text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Enrolled Seats</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">
            {totalEnrolled.toLocaleString()}
            <span className="text-xs font-semibold text-slate-400 ml-1.5">
              / {totalCapacity.toLocaleString()}
            </span>
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <i className="fa-solid fa-chart-pie text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Capacity Used</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">
            {totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0}%
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-card">
          <div className="flex items-center gap-2.5 mb-2">
            <div className="w-9 h-9 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
              <i className="fa-solid fa-dollar-sign text-sm"></i>
            </div>
            <span className="text-xs font-semibold text-slate-500">Avg Tuition</span>
          </div>
          <div className="text-2xl font-black text-slate-800 font-display">
            ${avgTuition.toLocaleString()}
          </div>
        </div>
      </section>

      {/* Category Filter Chips */}
      <section className="flex flex-wrap items-center gap-2">
        {(['all', ...categories] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-3.5 py-1.5 rounded-full text-[11px] font-bold border transition-all cursor-pointer ${
              category === cat
                ? 'bg-blue-600 border-blue-600 text-white shadow-sm'
                : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-600'
            }`}
          >
            {cat === 'all' ? 'All Programs' : cat}
          </button>
        ))}
      </section>

      {/* Program Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
        {filtered.map((p) => {
          const fill = Math.min(100, Math.round((p.enrolled / p.capacity) * 100));
          return (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-card hover:border-blue-300 transition-all flex flex-col"
            >
              {/* Head */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-50 to-indigo-50 border border-blue-100/80 flex items-center justify-center text-2xl shrink-0">
                    {p.emoji}
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-500 font-mono shrink-0">
                        {p.code}
                      </span>
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full border text-[10px] font-bold whitespace-nowrap ${statusTypeChip(
                          p.statusType
                        )}`}
                      >
                        {p.statusType}
                      </span>
                    </div>
                    <h3 className="font-bold text-slate-800 text-sm font-display truncate mt-1">
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">{p.ageBracket}</p>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-[11px] text-slate-500 leading-relaxed mt-3 line-clamp-2">
                {p.description}
              </p>

              {/* Category Chip */}
              <div className="mt-2.5">
                <span className="inline-flex px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-bold">
                  {p.category}
                </span>
              </div>

              {/* Enrollment Bar */}
              <div className="mt-3.5">
                <div className="flex items-center justify-between text-[11px] mb-1.5">
                  <span className="font-semibold text-slate-500">Enrollment</span>
                  <span className="font-bold text-slate-700">
                    {p.enrolled}/{p.capacity} ({fill}%)
                  </span>
                </div>
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      fill >= 95 ? 'bg-rose-500' : fill >= 85 ? 'bg-amber-500' : 'bg-indigo-500'
                    }`}
                    style={{ width: `${fill}%` }}
                  ></div>
                </div>
              </div>

              {/* Facts Grid */}
              <div className="grid grid-cols-2 gap-2 mt-4 text-center">
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-sm font-extrabold text-slate-800 font-display">{p.ratio}</div>
                  <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                    {p.ratioType}
                  </div>
                </div>
                <div className="p-2 rounded-xl bg-slate-50">
                  <div className="text-sm font-extrabold text-slate-800 font-display">
                    ${p.tuition.toLocaleString()}
                  </div>
                  <div className="text-[9px] font-semibold text-slate-400 uppercase tracking-wide">
                    {p.tuitionType}
                  </div>
                </div>
              </div>

              {/* Foot */}
              <div className="mt-3.5 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                <span className="text-slate-500">
                  <i className="fa-solid fa-school text-slate-300 mr-1"></i>
                  {p.campusesCount}/{p.totalCampuses} campuses
                </span>
                <span className="text-slate-500">
                  Curriculum:{' '}
                  <b
                    className={
                      p.curriculumStatus === 'Approved'
                        ? 'text-emerald-600'
                        : 'text-amber-600'
                    }
                  >
                    {p.curriculumStatus}
                  </b>
                </span>
              </div>

              {/* Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                <button className="flex-1 py-2 rounded-xl bg-blue-50 hover:bg-blue-100 text-blue-700 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                  <i className="fa-solid fa-pen-to-square"></i>
                  <span>Edit Curriculum</span>
                </button>
                <button className="flex-1 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-600 text-[11px] font-bold flex items-center justify-center gap-1.5 cursor-pointer transition-all">
                  <i className="fa-solid fa-chart-column"></i>
                  <span>Enrollment</span>
                </button>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="md:col-span-2 xl:col-span-3 bg-white rounded-2xl p-10 border border-dashed border-slate-200 text-center">
            <i className="fa-solid fa-book-open text-2xl text-slate-300"></i>
            <p className="text-xs text-slate-500 mt-3 font-semibold">
              No programs in this category yet.
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
