import React from 'react';
import { AdminTab } from '../../types';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onSwitchToPublic: () => void;
  centersCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onSwitchToPublic,
}) => {
  return (
    <aside
      className="w-[260px] bg-[#f8faff] flex flex-col justify-between shrink-0 select-none z-30 h-full border-r border-slate-100"
      data-purpose="main-sidebar"
    >
      <div>
        {/* Brand Logo Header */}
        <div className="px-6 pt-8 pb-8 flex flex-col items-center">
          <div className="flex items-center gap-1.5 justify-center mb-1">
            <div className="flex items-end gap-0.5">
              <i className="fa-solid fa-child-reaching text-blue-500 text-xl"></i>
              <i className="fa-solid fa-child text-orange-400 text-sm"></i>
              <i className="fa-solid fa-child-reaching text-red-500 text-lg"></i>
              <i className="fa-solid fa-child text-green-500 text-base"></i>
            </div>
            <span className="text-[26px] font-black tracking-tight text-[#2b3674] font-display">ABC</span>
          </div>
          <div className="text-[11px] font-bold text-[#4318FF]">
            Daycare & Kindergarten
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="px-4 space-y-1.5">
          <button
            onClick={() => onSelectTab('dashboard')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 text-left cursor-pointer ${
              currentTab === 'dashboard'
                ? 'bg-[#e2e8f0]/60 text-[#4318FF]'
                : 'text-[#a3aed1] hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <i className={`fa-solid fa-house text-lg w-5 text-center ${currentTab === 'dashboard' ? 'text-[#4318FF]' : 'text-[#a3aed1]'}`}></i>
            <span>Dashboard</span>
          </button>

          <button
            onClick={() => onSelectTab('users')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 text-left cursor-pointer ${
              currentTab === 'users'
                ? 'bg-[#e2e8f0]/60 text-[#4318FF]'
                : 'text-[#a3aed1] hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <i className={`fa-solid fa-user-group text-lg w-5 text-center ${currentTab === 'users' ? 'text-[#4318FF]' : 'text-[#a3aed1]'}`}></i>
            <span>Users</span>
          </button>

          <button
            onClick={() => onSelectTab('students')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 text-left cursor-pointer ${
              currentTab === 'students'
                ? 'bg-[#e2e8f0]/60 text-[#4318FF]'
                : 'text-[#a3aed1] hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <i className={`fa-solid fa-graduation-cap text-lg w-5 text-center ${currentTab === 'students' ? 'text-[#4318FF]' : 'text-[#a3aed1]'}`}></i>
            <span>Students</span>
          </button>

          <button
            onClick={() => onSelectTab('teachers')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 text-left cursor-pointer ${
              currentTab === 'teachers'
                ? 'bg-[#e2e8f0]/60 text-[#4318FF]'
                : 'text-[#a3aed1] hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <i className={`fa-solid fa-chalkboard-user text-lg w-5 text-center ${currentTab === 'teachers' ? 'text-[#4318FF]' : 'text-[#a3aed1]'}`}></i>
            <span>Teachers</span>
          </button>

          <button
            onClick={() => onSelectTab('classes')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 text-left cursor-pointer ${
              currentTab === 'classes'
                ? 'bg-[#e2e8f0]/60 text-[#4318FF]'
                : 'text-[#a3aed1] hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <i className={`fa-solid fa-layer-group text-lg w-5 text-center ${currentTab === 'classes' ? 'text-[#4318FF]' : 'text-[#a3aed1]'}`}></i>
            <span>Classes</span>
          </button>

          <button
            onClick={() => onSelectTab('attendance')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 text-left cursor-pointer ${
              currentTab === 'attendance'
                ? 'bg-[#e2e8f0]/60 text-[#4318FF]'
                : 'text-[#a3aed1] hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <i className={`fa-solid fa-calendar-check text-lg w-5 text-center ${currentTab === 'attendance' ? 'text-[#4318FF]' : 'text-[#a3aed1]'}`}></i>
            <span>Attendance</span>
          </button>

          <button
            onClick={() => onSelectTab('reports')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 text-left cursor-pointer ${
              currentTab === 'reports'
                ? 'bg-[#e2e8f0]/60 text-[#4318FF]'
                : 'text-[#a3aed1] hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <i className={`fa-solid fa-chart-simple text-lg w-5 text-center ${currentTab === 'reports' ? 'text-[#4318FF]' : 'text-[#a3aed1]'}`}></i>
            <span>Reports</span>
          </button>

          <button
            onClick={() => onSelectTab('settings')}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl font-bold text-[13px] transition-all duration-300 text-left cursor-pointer ${
              currentTab === 'settings'
                ? 'bg-[#e2e8f0]/60 text-[#4318FF]'
                : 'text-[#a3aed1] hover:bg-slate-100 hover:text-slate-800'
            }`}
          >
            <i className={`fa-solid fa-gear text-lg w-5 text-center ${currentTab === 'settings' ? 'text-[#4318FF]' : 'text-[#a3aed1]'}`}></i>
            <span>Settings</span>
          </button>
        </nav>
      </div>

      {/* Bottom Promo */}
      <div className="p-6 pb-8">
        <div className="relative overflow-hidden text-center cursor-pointer group" onClick={onSwitchToPublic}>
          <h4 className="text-[15px] font-black text-blue-600 leading-tight font-display italic transform -rotate-2 origin-left tracking-wide">
            Better Education<br />
            <span className="text-sky-500">Brighter Futures</span>
          </h4>
          <div className="mt-4 relative flex justify-center">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqJiwec_Buq3-gpQMzGrcCUqmm0u06g9rsZj7w5XGynDsLqdpVG2yFQjWEiwxzFEw1mDH8TmKQ7FLhHNjLw7NENRiOLxOKX9swj2CC5VcjaodjwgSzYi6S8MQzqKs0R6U17oLofZeo3k0yrhWbYlKGOdZ5ttJeYUPx7VxmjmRpFqUtV-oAT_Qjz3pMnPO5OK6ysaIlo7GFMMiQyRc9Kaw1JDu1JHJURw1gQBGd9veEyjesNBglmuQ3" alt="Kids playing" className="w-32 object-contain group-hover:scale-105 transition-transform" />
          </div>
        </div>
      </div>
    </aside>
  );
};
