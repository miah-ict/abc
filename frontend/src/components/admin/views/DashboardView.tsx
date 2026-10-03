import React from 'react';
import { DaycareCenter, AdminTab } from '../../../types';

interface DashboardViewProps {
  centers: DaycareCenter[];
  onNavigateTab: (tab: AdminTab) => void;
  onOpenNewCenter: () => void;
  onOpenNewUser: () => void;
  onOpenNewProgram: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigateTab,
}) => {
  return (
    <div className="space-y-6 max-w-[1400px] mx-auto pb-10 px-2 text-[#2b3674]">
      {/* Top Banner Row */}
      <div className="flex flex-col xl:flex-row gap-6">
        <div className="flex-1 flex flex-col sm:flex-row justify-between items-center sm:items-start bg-transparent py-4 relative">
          <div>
            <h1 className="text-[28px] font-bold tracking-tight mb-2 flex items-center gap-3">
              <span className="text-3xl animate-wave origin-bottom-right">👋</span> Welcome back, Admin!
            </h1>
            <p className="text-[14px] text-[#a3aed1] font-medium">
              Here's what's happening at ABC Daycare & Kindergarten today.
            </p>
          </div>
          <div className="mt-4 sm:mt-0 flex items-center gap-3 bg-white px-5 py-3 rounded-[20px] shadow-sm">
            <i className="fa-regular fa-calendar text-[#4318FF] text-lg"></i>
            <div>
              <div className="text-[13px] font-bold leading-tight">Aug 21, 2026</div>
              <div className="text-[11px] text-[#a3aed1] font-medium">Friday</div>
            </div>
          </div>
        </div>
        
        {/* Banner Graphic */}
        <div className="w-full xl:w-[450px] shrink-0 h-[100px] bg-gradient-to-r from-blue-100 to-indigo-100 rounded-[20px] relative overflow-hidden flex items-center justify-end px-6 shadow-sm">
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqJiwec_Buq3-gpQMzGrcCUqmm0u06g9rsZj7w5XGynDsLqdpVG2yFQjWEiwxzFEw1mDH8TmKQ7FLhHNjLw7NENRiOLxOKX9swj2CC5VcjaodjwgSzYi6S8MQzqKs0R6U17oLofZeo3k0yrhWbYlKGOdZ5ttJeYUPx7VxmjmRpFqUtV-oAT_Qjz3pMnPO5OK6ysaIlo7GFMMiQyRc9Kaw1JDu1JHJURw1gQBGd9veEyjesNBglmuQ3" 
            alt="Teacher and Kids" 
            className="absolute left-0 top-0 w-full h-full object-cover opacity-80 mix-blend-multiply" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-white/90"></div>
          <div className="relative z-10 bg-white/90 backdrop-blur-sm px-4 py-2.5 rounded-[14px] shadow-sm text-center transform rotate-2">
            <span className="block text-[13px] font-bold text-[#4318FF] font-display leading-tight">Small Steps</span>
            <span className="block text-[13px] font-bold text-[#4318FF] font-display leading-tight">Big Dreams <span className="text-[#4318FF]">♡</span></span>
          </div>
        </div>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-[20px] p-5 shadow-sm flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-full bg-blue-50 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-graduation-cap text-[#4318FF] text-xl"></i>
          </div>
          <div>
            <div className="text-[13px] font-medium text-[#a3aed1]">Total Students</div>
            <div className="text-2xl font-bold mt-1">248</div>
            <div className="text-[11px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
              <i className="fa-solid fa-arrow-up"></i> 12% <span className="text-[#a3aed1] font-medium">vs. last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-5 shadow-sm flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-full bg-purple-50 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-chalkboard-user text-purple-600 text-xl"></i>
          </div>
          <div>
            <div className="text-[13px] font-medium text-[#a3aed1]">Teachers</div>
            <div className="text-2xl font-bold mt-1">18</div>
            <div className="text-[11px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
              <i className="fa-solid fa-arrow-up"></i> 5% <span className="text-[#a3aed1] font-medium">vs. last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-5 shadow-sm flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-user-tie text-emerald-500 text-xl"></i>
          </div>
          <div>
            <div className="text-[13px] font-medium text-[#a3aed1]">Staff Members</div>
            <div className="text-2xl font-bold mt-1">12</div>
            <div className="text-[11px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
              <i className="fa-solid fa-arrow-up"></i> 9% <span className="text-[#a3aed1] font-medium">vs. last month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[20px] p-5 shadow-sm flex items-center gap-4">
          <div className="w-[50px] h-[50px] rounded-full bg-rose-50 flex items-center justify-center shrink-0">
            <i className="fa-solid fa-calendar-days text-rose-500 text-xl"></i>
          </div>
          <div>
            <div className="text-[13px] font-medium text-[#a3aed1]">Total Classes</div>
            <div className="text-2xl font-bold mt-1">10</div>
            <div className="text-[11px] font-bold text-emerald-500 mt-1 flex items-center gap-1">
              <i className="fa-solid fa-arrow-up"></i> 0% <span className="text-[#a3aed1] font-medium">vs. last month</span>
            </div>
          </div>
        </div>
      </div>

      {/* Middle Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Student Enrollment Chart */}
        <div className="lg:col-span-5 bg-white rounded-[20px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-user-group text-[#4318FF]"></i>
              <h3 className="font-bold text-[16px]">Student Enrollment</h3>
            </div>
            <div className="text-[11px] text-[#a3aed1] font-medium flex items-center gap-1 cursor-pointer">
              Last 6 Months <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          
          <div className="h-[200px] relative mt-4">
             {/* Chart grid lines */}
             <div className="absolute inset-0 flex flex-col justify-between text-[11px] text-[#a3aed1] font-medium">
               <div className="flex justify-between items-center w-full"><span className="w-6 text-right">300</span><div className="flex-1 ml-3 border-b border-dashed border-slate-100"></div></div>
               <div className="flex justify-between items-center w-full"><span className="w-6 text-right">250</span><div className="flex-1 ml-3 border-b border-dashed border-slate-100"></div></div>
               <div className="flex justify-between items-center w-full"><span className="w-6 text-right">200</span><div className="flex-1 ml-3 border-b border-dashed border-slate-100"></div></div>
               <div className="flex justify-between items-center w-full"><span className="w-6 text-right">150</span><div className="flex-1 ml-3 border-b border-dashed border-slate-100"></div></div>
               <div className="flex justify-between items-center w-full"><span className="w-6 text-right">100</span><div className="flex-1 ml-3 border-b border-dashed border-slate-100"></div></div>
               <div className="flex justify-between items-center w-full"><span className="w-6 text-right">50</span><div className="flex-1 ml-3 border-b border-dashed border-slate-100"></div></div>
               <div className="flex justify-between items-center w-full"><span className="w-6 text-right">0</span><div className="flex-1 ml-3 border-b border-solid border-slate-200"></div></div>
             </div>
             
             {/* Graph Line */}
             <div className="absolute inset-0 ml-[36px] pt-1">
               <svg className="w-full h-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 400 200">
                 <defs>
                   <linearGradient id="chartGrad" x1="0" x2="0" y1="0" y2="1">
                     <stop offset="0%" stopColor="#4318FF" stopOpacity="0.2" />
                     <stop offset="100%" stopColor="#4318FF" stopOpacity="0" />
                   </linearGradient>
                 </defs>
                 <path d="M 0 160 Q 60 150 120 140 T 240 130 T 320 110 T 400 80 L 400 200 L 0 200 Z" fill="url(#chartGrad)" />
                 <path d="M 0 160 Q 60 150 120 140 T 240 130 T 320 110 T 400 80" fill="none" stroke="#4318FF" strokeWidth="3" />
                 
                 <circle cx="0" cy="160" r="4" fill="#4318FF" />
                 <circle cx="80" cy="148" r="4" fill="#4318FF" />
                 <circle cx="160" cy="138" r="4" fill="#4318FF" />
                 <circle cx="240" cy="130" r="4" fill="#4318FF" />
                 <circle cx="320" cy="110" r="4" fill="#4318FF" />
                 <circle cx="400" cy="80" r="5" fill="#4318FF" stroke="white" strokeWidth="2" />
               </svg>
             </div>
             
             {/* X axis labels */}
             <div className="absolute bottom-[-24px] left-[36px] right-0 flex justify-between text-[11px] text-[#a3aed1] font-medium">
               <span>Mar</span>
               <span>Apr</span>
               <span>May</span>
               <span>Jun</span>
               <span>Jul</span>
               <span>Aug</span>
             </div>
          </div>
        </div>

        {/* Class Distribution Donut */}
        <div className="lg:col-span-4 bg-white rounded-[20px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-chart-pie text-[#4318FF]"></i>
              <h3 className="font-bold text-[16px]">Class Distribution</h3>
            </div>
            <button className="text-[12px] font-bold text-[#4318FF]">View All</button>
          </div>
          
          <div className="flex items-center justify-between mt-8 pr-4">
            <div className="relative w-[150px] h-[150px] ml-4">
              {/* SVG Donut */}
              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f1f5f9" strokeWidth="20" />
                
                {/* Primary 18% (Yellow) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#fbbf24" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.18)} />
                {/* KG 2 27% (Green) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#10b981" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.27)} transform="rotate(64.8, 50, 50)" />
                {/* KG 1 29% (Purple) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#8b5cf6" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.29)} transform="rotate(162, 50, 50)" />
                {/* Nursery 15% (Blue) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#3b82f6" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.15)} transform="rotate(266.4, 50, 50)" />
                {/* Others 10% (Gray) */}
                <circle cx="50" cy="50" r="40" fill="transparent" stroke="#cbd5e1" strokeWidth="20" strokeDasharray="251.2" strokeDashoffset={251.2 * (1 - 0.10)} transform="rotate(320.4, 50, 50)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">248</span>
                <span className="text-[11px] text-[#a3aed1] font-medium">Students</span>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-8 text-[12px]">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span><span className="text-slate-600 font-medium">Nursery</span></div>
                <div><span className="font-bold">38</span> <span className="text-[#a3aed1] font-medium">(15%)</span></div>
              </div>
              <div className="flex items-center justify-between gap-8 text-[12px]">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span><span className="text-slate-600 font-medium">KG 1</span></div>
                <div><span className="font-bold">72</span> <span className="text-[#a3aed1] font-medium">(29%)</span></div>
              </div>
              <div className="flex items-center justify-between gap-8 text-[12px]">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span><span className="text-slate-600 font-medium">KG 2</span></div>
                <div><span className="font-bold">68</span> <span className="text-[#a3aed1] font-medium">(27%)</span></div>
              </div>
              <div className="flex items-center justify-between gap-8 text-[12px]">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span><span className="text-slate-600 font-medium">Primary</span></div>
                <div><span className="font-bold">45</span> <span className="text-[#a3aed1] font-medium">(18%)</span></div>
              </div>
              <div className="flex items-center justify-between gap-8 text-[12px]">
                <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-slate-300"></span><span className="text-slate-600 font-medium">Others</span></div>
                <div><span className="font-bold">25</span> <span className="text-[#a3aed1] font-medium">(10%)</span></div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activities Timeline */}
        <div className="lg:col-span-3 bg-white rounded-[20px] p-6 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-clock text-[#4318FF]"></i>
              <h3 className="font-bold text-[16px]">Recent Activities</h3>
            </div>
            <button className="text-[12px] font-bold text-[#4318FF]">View All</button>
          </div>
          
          <div className="space-y-5 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-100 before:to-transparent">
            {/* 1 */}
            <div className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-emerald-100 text-emerald-500 shadow shrink-0">
                <i className="fa-solid fa-user-plus text-[9px]"></i>
              </div>
              <div className="ml-3 w-full flex items-start justify-between">
                <div>
                  <div className="text-[13px] font-bold text-slate-800">New student registration</div>
                  <div className="text-[11px] text-[#a3aed1] font-medium">Amina Hassan (KG 1)</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-[11px] text-[#a3aed1] font-medium">2h ago</div>
                  <i className="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
                </div>
              </div>
            </div>
            
            {/* 2 */}
            <div className="relative flex items-center justify-between group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-purple-100 text-purple-500 shadow shrink-0">
                <i className="fa-regular fa-calendar-check text-[9px]"></i>
              </div>
              <div className="ml-3 w-full flex items-start justify-between">
                <div>
                  <div className="text-[13px] font-bold text-slate-800">Teacher attendance updated</div>
                  <div className="text-[11px] text-[#a3aed1] font-medium">Fadumo Ali (KG 2)</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-[11px] text-[#a3aed1] font-medium">3h ago</div>
                  <i className="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
                </div>
              </div>
            </div>

            {/* 3 */}
            <div className="relative flex items-center justify-between group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-blue-100 text-blue-500 shadow shrink-0">
                <i className="fa-solid fa-wallet text-[9px]"></i>
              </div>
              <div className="ml-3 w-full flex items-start justify-between">
                <div>
                  <div className="text-[13px] font-bold text-slate-800">Payment received</div>
                  <div className="text-[11px] text-[#a3aed1] font-medium">Parent: Ahmed Mohamed</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-[11px] text-[#a3aed1] font-medium">4h ago</div>
                  <i className="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
                </div>
              </div>
            </div>

            {/* 4 */}
            <div className="relative flex items-center justify-between group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-orange-100 text-orange-500 shadow shrink-0">
                <i className="fa-solid fa-briefcase text-[9px]"></i>
              </div>
              <div className="ml-3 w-full flex items-start justify-between">
                <div>
                  <div className="text-[13px] font-bold text-slate-800">New job application</div>
                  <div className="text-[11px] text-[#a3aed1] font-medium">Teacher Assistant</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-[11px] text-[#a3aed1] font-medium">5h ago</div>
                  <i className="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
                </div>
              </div>
            </div>

            {/* 5 */}
            <div className="relative flex items-center justify-between group is-active">
              <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-white bg-emerald-100 text-emerald-500 shadow shrink-0">
                <i className="fa-solid fa-cloud-arrow-up text-[9px]"></i>
              </div>
              <div className="ml-3 w-full flex items-start justify-between">
                <div>
                  <div className="text-[13px] font-bold text-slate-800">System backup completed</div>
                  <div className="text-[11px] text-[#a3aed1] font-medium">Daily backup</div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="text-[11px] text-[#a3aed1] font-medium">6h ago</div>
                  <i className="fa-solid fa-chevron-right text-[10px] text-slate-300"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Recent Students */}
        <div className="lg:col-span-5 bg-white rounded-[20px] p-6 shadow-sm overflow-hidden flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <i className="fa-solid fa-user-graduate text-[#4318FF]"></i>
              <h3 className="font-bold text-[16px]">Recent Students</h3>
            </div>
            <button className="text-[12px] font-bold text-[#4318FF]">View All</button>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left text-[13px]">
              <thead>
                <tr className="text-[#a3aed1] border-b border-slate-100 font-medium">
                  <th className="py-2.5 w-6">#</th>
                  <th className="py-2.5">Name</th>
                  <th className="py-2.5">Class</th>
                  <th className="py-2.5">Status</th>
                  <th className="py-2.5 w-6 text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
                <tr>
                  <td className="py-3 text-[#a3aed1]">1</td>
                  <td className="py-3 flex items-center gap-2">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" className="w-6 h-6 rounded-full" alt="Amina" />
                    <span>Amina Hassan</span>
                  </td>
                  <td className="py-3 text-[#a3aed1]">KG 1</td>
                  <td className="py-3"><span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span></td>
                  <td className="py-3 text-right"><i className="fa-solid fa-ellipsis text-[#a3aed1] cursor-pointer"></i></td>
                </tr>
                <tr>
                  <td className="py-3 text-[#a3aed1]">2</td>
                  <td className="py-3 flex items-center gap-2">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026024d" className="w-6 h-6 rounded-full" alt="Mohamed" />
                    <span>Mohamed Ali</span>
                  </td>
                  <td className="py-3 text-[#a3aed1]">KG 2</td>
                  <td className="py-3"><span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span></td>
                  <td className="py-3 text-right"><i className="fa-solid fa-ellipsis text-[#a3aed1] cursor-pointer"></i></td>
                </tr>
                <tr>
                  <td className="py-3 text-[#a3aed1]">3</td>
                  <td className="py-3 flex items-center gap-2">
                    <img src="https://i.pravatar.cc/150?u=a04258114e29026702d" className="w-6 h-6 rounded-full" alt="Fatima" />
                    <span>Fatima Abdullahi</span>
                  </td>
                  <td className="py-3 text-[#a3aed1]">Nursery</td>
                  <td className="py-3"><span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span></td>
                  <td className="py-3 text-right"><i className="fa-solid fa-ellipsis text-[#a3aed1] cursor-pointer"></i></td>
                </tr>
                <tr>
                  <td className="py-3 text-[#a3aed1]">4</td>
                  <td className="py-3 flex items-center gap-2">
                    <img src="https://i.pravatar.cc/150?u=a04258114e29026704d" className="w-6 h-6 rounded-full" alt="Yusuf" />
                    <span>Yusuf Omar</span>
                  </td>
                  <td className="py-3 text-[#a3aed1]">Primary</td>
                  <td className="py-3"><span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span></td>
                  <td className="py-3 text-right"><i className="fa-solid fa-ellipsis text-[#a3aed1] cursor-pointer"></i></td>
                </tr>
                <tr>
                  <td className="py-3 text-[#a3aed1]">5</td>
                  <td className="py-3 flex items-center gap-2">
                    <img src="https://i.pravatar.cc/150?u=a04258114e29026702f" className="w-6 h-6 rounded-full" alt="Layla" />
                    <span>Layla Ahmed</span>
                  </td>
                  <td className="py-3 text-[#a3aed1]">KG 1</td>
                  <td className="py-3"><span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Active</span></td>
                  <td className="py-3 text-right"><i className="fa-solid fa-ellipsis text-[#a3aed1] cursor-pointer"></i></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="lg:col-span-3 bg-white rounded-[20px] p-6 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <i className="fa-regular fa-calendar-days text-[#4318FF]"></i>
              <h3 className="font-bold text-[16px]">Upcoming Events</h3>
            </div>
            <button className="text-[12px] font-bold text-[#4318FF]">View All</button>
          </div>
          
          <div className="space-y-4">
            <div className="flex gap-4 items-center">
              <div className="w-[45px] h-[45px] rounded-2xl bg-[#f4f7fe] flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-[#a3aed1] uppercase tracking-wider leading-none">Aug</span>
                <span className="text-[16px] font-black text-[#4318FF] leading-none mt-1">25</span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-slate-800">Parent-Teacher Meeting</div>
                <div className="text-[11px] text-[#a3aed1] font-medium mt-0.5">10:00 AM - 12:00 PM</div>
              </div>
              <div className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full whitespace-nowrap">School Event</div>
            </div>
            
            <div className="flex gap-4 items-center">
              <div className="w-[45px] h-[45px] rounded-2xl bg-[#f4f7fe] flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-[#a3aed1] uppercase tracking-wider leading-none">Aug</span>
                <span className="text-[16px] font-black text-[#4318FF] leading-none mt-1">28</span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-slate-800">Sports Day</div>
                <div className="text-[11px] text-[#a3aed1] font-medium mt-0.5">9:00 AM - 4:00 PM</div>
              </div>
              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full whitespace-nowrap">Event</div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-[45px] h-[45px] rounded-2xl bg-[#f4f7fe] flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-[#a3aed1] uppercase tracking-wider leading-none">Sep</span>
                <span className="text-[16px] font-black text-[#4318FF] leading-none mt-1">05</span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-slate-800">Science Fair</div>
                <div className="text-[11px] text-[#a3aed1] font-medium mt-0.5">9:00 AM - 12:00 PM</div>
              </div>
              <div className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full whitespace-nowrap">Event</div>
            </div>

            <div className="flex gap-4 items-center">
              <div className="w-[45px] h-[45px] rounded-2xl bg-[#f4f7fe] flex flex-col items-center justify-center shrink-0">
                <span className="text-[10px] font-bold text-[#a3aed1] uppercase tracking-wider leading-none">Sep</span>
                <span className="text-[16px] font-black text-[#4318FF] leading-none mt-1">12</span>
              </div>
              <div className="flex-1">
                <div className="text-[13px] font-bold text-slate-800">Open Day</div>
                <div className="text-[11px] text-[#a3aed1] font-medium mt-0.5">10:00 AM - 2:00 PM</div>
              </div>
              <div className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full whitespace-nowrap">School Event</div>
            </div>
          </div>
        </div>

        {/* Quick Actions & Safe Banner */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          <div className="bg-white rounded-[20px] p-6 shadow-sm flex-1">
            <div className="flex items-center gap-2 mb-4">
              <i className="fa-solid fa-bolt text-[#4318FF]"></i>
              <h3 className="font-bold text-[16px]">Quick Actions</h3>
            </div>
            
            <div className="grid grid-cols-3 gap-3">
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#f8faff] hover:bg-blue-50 transition-colors">
                <i className="fa-solid fa-user-plus text-[#4318FF] text-lg"></i>
                <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">Add Student</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#f8faff] hover:bg-purple-50 transition-colors">
                <i className="fa-solid fa-chalkboard-user text-purple-500 text-lg"></i>
                <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">Add Teacher</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#f8faff] hover:bg-emerald-50 transition-colors">
                <i className="fa-solid fa-layer-group text-emerald-500 text-lg"></i>
                <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">Create Class</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#f8faff] hover:bg-orange-50 transition-colors">
                <i className="fa-regular fa-calendar-check text-orange-400 text-lg"></i>
                <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">Attendance</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#f8faff] hover:bg-indigo-50 transition-colors">
                <i className="fa-solid fa-file-invoice text-indigo-500 text-lg"></i>
                <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">Generate Report</span>
              </button>
              <button className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-[#f8faff] hover:bg-slate-100 transition-colors">
                <i className="fa-solid fa-gear text-slate-500 text-lg"></i>
                <span className="text-[11px] font-bold text-slate-600 text-center leading-tight">Settings</span>
              </button>
            </div>
          </div>
          
          <div className="bg-[#4318FF] rounded-[20px] p-6 shadow-sm relative overflow-hidden flex items-center justify-between text-white">
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/4 opacity-10">
               <i className="fa-solid fa-shield-halved text-8xl"></i>
            </div>
            <div className="flex gap-4 relative z-10">
              <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <i className="fa-solid fa-shield-halved text-xl"></i>
              </div>
              <div>
                <h3 className="font-bold text-[15px]">Keep Our Children Safe</h3>
                <p className="text-[12px] text-white/80 mt-0.5">A secure and nurturing environment for every child.</p>
                <button className="mt-3 text-[11px] font-bold bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors flex items-center gap-1.5">
                  View Safety Details <i className="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
            <div className="relative z-10 mr-2 opacity-50 cursor-pointer hover:opacity-100 transition-opacity">
               <i className="fa-regular fa-heart text-2xl"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
