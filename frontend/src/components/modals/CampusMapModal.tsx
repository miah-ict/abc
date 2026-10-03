import React, { useState } from 'react';
import { DaycareCenter } from '../../types';

interface CampusMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  centers: DaycareCenter[];
}

export const CampusMapModal: React.FC<CampusMapModalProps> = ({
  isOpen,
  onClose,
  centers,
}) => {
  const [selectedCenter, setSelectedCenter] = useState<DaycareCenter>(centers[0]);

  if (!isOpen) return null;

  // Geographic pin placements representing metropolitan branches
  const mapCoordinates: Record<string, { top: string; left: string }> = {
    'abc-hq-01': { top: '35%', left: '48%' }, // Hodan HQ
    'abc-wb-02': { top: '55%', left: '60%' }, // Waberi
    'abc-ab-03': { top: '38%', left: '42%' }, // Abdallah
    'abc-wj-04': { top: '65%', left: '30%' }, // Wadajir
    'abc-hw-05': { top: '50%', left: '68%' }, // Hamar Weyne
    'abc-bn-06': { top: '25%', left: '40%' }, // Banadir
    'abc-sh-07': { top: '30%', left: '56%' }, // Shibis
    'abc-kr-08': { top: '20%', left: '72%' }, // Karan
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-6 shadow-2xl border border-slate-100 max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-lg">
              <i className="fa-solid fa-map-location-dot"></i>
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900 font-outfit">Interactive Multi-Campus GIS Map</h3>
              <p className="text-xs text-slate-500">Live network footprint: 8 early learning centers across municipal districts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 flex items-center justify-center text-sm transition-colors"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Content Body */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mt-4 flex-1 overflow-hidden">
          {/* Left: Map Canvas */}
          <div className="md:col-span-8 bg-slate-950 rounded-2xl p-4 relative overflow-hidden border border-slate-800 flex flex-col justify-between min-h-[360px] md:min-h-[440px]">
            {/* Map Grid Background Pattern */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            ></div>

            {/* Radar Sweep Effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-sky-500/20 pointer-events-none"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 rounded-full border border-sky-500/30 pointer-events-none"></div>

            {/* Top Bar on Map */}
            <div className="relative z-10 flex items-center justify-between text-xs">
              <span className="px-2.5 py-1 rounded-full bg-slate-900/90 text-sky-400 border border-sky-500/30 font-mono flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE NETWORK STATUS: ALL CAMPUSES ONLINE
              </span>
              <span className="text-[11px] text-slate-400 font-mono">LAT 2.0469° N, LON 45.3182° E</span>
            </div>

            {/* Pins Placed on Map */}
            <div className="relative z-10 w-full h-full flex-1">
              {centers.map((c) => {
                const pos = mapCoordinates[c.id] || { top: '45%', left: '50%' };
                const isSelected = selectedCenter?.id === c.id;
                return (
                  <button
                    key={c.id}
                    onClick={() => setSelectedCenter(c)}
                    style={{ top: pos.top, left: pos.left }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 transition-all group z-20 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform ${
                        c.isHq
                          ? 'bg-amber-500 text-white ring-4 ring-amber-400/40'
                          : isSelected
                          ? 'bg-sky-500 text-white ring-4 ring-sky-400/50'
                          : 'bg-white text-slate-900 hover:bg-sky-100 ring-2 ring-slate-700'
                      }`}
                    >
                      <i className={`fa-solid ${c.isHq ? 'fa-crown text-xs' : 'fa-school text-[11px]'}`}></i>
                    </div>

                    {/* Pin Label */}
                    <div
                      className={`absolute top-full mt-1.5 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded text-[10px] whitespace-nowrap font-bold shadow-md transition-all ${
                        isSelected
                          ? 'bg-sky-500 text-white'
                          : 'bg-slate-900/90 text-slate-200 border border-slate-700 opacity-80 group-hover:opacity-100'
                      }`}
                    >
                      {c.name.split(' ')[0]} ({c.enrolled}/{c.capacity})
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Map Legend */}
            <div className="relative z-10 flex items-center gap-4 text-[11px] text-slate-400 bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block"></span>
                <span>HQ Main Campus</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-sky-500 inline-block"></span>
                <span>Selected Branch</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-white inline-block"></span>
                <span>Active Branch</span>
              </div>
            </div>
          </div>

          {/* Right: Selected Center Detail Card */}
          <div className="md:col-span-4 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col justify-between overflow-y-auto">
            {selectedCenter ? (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700">
                      {selectedCenter.district} District
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">{selectedCenter.code}</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 font-outfit">{selectedCenter.name}</h4>
                  <p className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                    <i className="fa-solid fa-location-dot text-slate-400 text-xs"></i>
                    {selectedCenter.address}
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="text-[11px] text-slate-400">Enrollment</div>
                    <div className="text-base font-bold text-slate-900">
                      {selectedCenter.enrolled} <span className="text-xs font-normal text-slate-400">/ {selectedCenter.capacity}</span>
                    </div>
                    <div className="text-[10px] text-emerald-600 font-semibold mt-0.5">
                      {Math.round((selectedCenter.enrolled / selectedCenter.capacity) * 100)}% load
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200">
                    <div className="text-[11px] text-slate-400">Staff Ratio</div>
                    <div className="text-base font-mono font-bold text-blue-600">
                      {selectedCenter.ratio}
                    </div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {selectedCenter.teachersCount} Certified Teachers
                    </div>
                  </div>
                </div>

                {/* Director */}
                <div className="bg-white p-3.5 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase">Campus Leadership</div>
                  <div className="font-bold text-slate-800">{selectedCenter.ownerName}</div>
                  <div className="text-slate-500">{selectedCenter.ownerRole}</div>
                  <div className="text-slate-500 flex items-center gap-1 mt-1">
                    <i className="fa-regular fa-envelope text-[11px]"></i>
                    {selectedCenter.ownerEmail}
                  </div>
                  <div className="text-slate-500 flex items-center gap-1">
                    <i className="fa-solid fa-phone text-[11px]"></i>
                    {selectedCenter.ownerPhone}
                  </div>
                </div>

                {/* Programs Active */}
                <div className="text-xs">
                  <div className="text-[11px] text-slate-400 font-semibold uppercase mb-1.5">Active Curriculums</div>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedCenter.programs.map((prog, idx) => (
                      <span key={idx} className="px-2 py-0.5 rounded-lg bg-blue-50 text-blue-700 text-[11px] font-semibold border border-blue-100">
                        {prog}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-slate-400 text-xs">
                Select a campus pin from the map to inspect details.
              </div>
            )}

            <button
              onClick={onClose}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors"
            >
              Close Map
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
