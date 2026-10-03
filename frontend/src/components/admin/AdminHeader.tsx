import React, { useState } from 'react';

interface AdminHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSwitchToPublic: () => void;
  onOpenNewCenter: () => void;
  onOpenNewUser: () => void;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <header className="h-20 px-8 flex items-center justify-between z-30 bg-transparent">
      {/* Search Bar */}
      <div className="relative w-full max-w-[280px]">
        <i className="fa-solid fa-magnifying-glass text-[#a3aed1] text-sm absolute left-4 top-1/2 -translate-y-1/2"></i>
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-full text-[13px] bg-white border-none focus:outline-none focus:ring-2 focus:ring-[#4318FF]/20 text-slate-700 placeholder-[#a3aed1] shadow-sm"
          placeholder="Search anything..."
          type="text"
        />
      </div>

      {/* Right Utility Actions */}
      <div className="flex items-center gap-4 bg-white rounded-full px-4 py-2 shadow-sm">
        {/* Notification Bell with Red Badge */}
        <button className="relative w-8 h-8 flex items-center justify-center text-[#a3aed1] hover:text-[#4318FF] transition-colors">
          <i className="fa-regular fa-bell text-lg"></i>
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* Light/Dark Mode Switcher */}
        <div className="flex items-center gap-2">
          <button className="w-6 h-6 flex items-center justify-center text-amber-400">
            <i className="fa-solid fa-sun text-[15px]"></i>
          </button>
          <button className="w-6 h-6 flex items-center justify-center text-indigo-900 bg-indigo-50 rounded-full">
            <i className="fa-solid fa-moon text-[11px]"></i>
          </button>
        </div>

        <div className="w-px h-6 bg-slate-100 mx-1"></div>

        {/* Admin Profile */}
        <div
          onClick={() => setShowProfileMenu(!showProfileMenu)}
          className="flex items-center gap-3 cursor-pointer pl-1 relative"
        >
          <div className="hidden sm:block text-right">
            <div className="text-[13px] font-bold text-[#2b3674] leading-tight">Admin</div>
            <div className="text-[11px] font-medium text-[#a3aed1]">System Administrator</div>
          </div>
          <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 shrink-0">
            <img
              alt="Admin"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDiyb3rsdIg5NTN_VTeFmaTjq4Njnce1WIdCiZzopLtw5FAEHOX7BfZceZfNQuboDunEpmOn7aXMaVEFpSrmqlKt67HxsXBZMaRu2HXzqG8ceQSf_ZoN_u1IOXQjco2wFnfZdNWKv8WAjFZsqcnaWO6A0LO8uTjtkob1R35rY51qA-zaUIXW-m1c3rUeK-Fb-DJxee5Daqb7-iQDRyqRkqOITXvzDDUc_FJKgZ51BIWqeEeY5vDR7NZ"
            />
          </div>
          <i className="fa-solid fa-chevron-down text-[10px] text-slate-400"></i>
        </div>
      </div>
    </header>
  );
};
