import React, { useState } from 'react';
import { AdminTab, DaycareCenter, UserItem, ProgramItem } from '../../types';
import { AdminSidebar } from './AdminSidebar';
import { AdminHeader } from './AdminHeader';
import { DashboardView } from './views/DashboardView';
import { SchoolsView } from './views/SchoolsView';
import { UsersView } from './views/UsersView';
import { ProgramsView } from './views/ProgramsView';
import { AnalyticsView } from './views/AnalyticsView';
import { ReportsView } from './views/ReportsView';
import { SettingsView } from './views/SettingsView';
import { LogsView } from './views/LogsView';
import { BackupView } from './views/BackupView';
import { NewCenterModal } from '../modals/NewCenterModal';
import { NewUserModal } from '../modals/NewUserModal';
import { NewProgramModal } from '../modals/NewProgramModal';
import { CampusMapModal } from '../modals/CampusMapModal';

interface SuperAdminPortalProps {
  onSwitchToPublic: () => void;
  centers: DaycareCenter[];
  users: UserItem[];
  programs: ProgramItem[];
  onAddCenter: (center: DaycareCenter) => void;
  onAddUser: (user: UserItem) => void;
  onAddProgram: (program: ProgramItem) => void;
  initialTab?: AdminTab;
}

export const SuperAdminPortal: React.FC<SuperAdminPortalProps> = ({
  onSwitchToPublic,
  centers,
  users,
  programs,
  onAddCenter,
  onAddUser,
  onAddProgram,
  initialTab = 'dashboard',
}) => {
  const [currentTab, setCurrentTab] = useState<AdminTab>(initialTab);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Modals state
  const [isNewCenterOpen, setIsNewCenterOpen] = useState(false);
  const [isNewUserOpen, setIsNewUserOpen] = useState(false);
  const [isNewProgramOpen, setIsNewProgramOpen] = useState(false);
  const [isCampusMapOpen, setIsCampusMapOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleExport = (datasetName: string) => {
    showToast(`Exported ${datasetName} successfully (CSV/PDF)`);
  };

  return (
    <div className="admin-shell flex bg-[#f4f7fe] font-sans text-slate-900 relative z-0 h-screen overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-xl border border-slate-700 flex items-center gap-3 text-xs animate-bounce font-medium">
          <i className="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full">
        <AdminSidebar
          currentTab={currentTab}
          onSelectTab={(tab) => {
            setCurrentTab(tab);
            setIsMobileSidebarOpen(false);
          }}
          onSwitchToPublic={onSwitchToPublic}
        />
      </div>

      {/* Mobile Sidebar Backdrop & Drawer */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            onClick={() => setIsMobileSidebarOpen(false)}
          ></div>
          <div className="fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 flex flex-col">
            <div className="p-4 border-b border-slate-100 flex items-center justify-between">
              <span className="font-bold text-slate-800 text-sm">ABC Super Admin Menu</span>
              <button
                onClick={() => setIsMobileSidebarOpen(false)}
                className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-1">
              {[
                { id: 'dashboard', label: 'Overview Dashboard', icon: 'fa-gauge' },
                { id: 'schools', label: 'Schools & Campuses', icon: 'fa-school' },
                { id: 'users', label: 'Users & Subscriptions', icon: 'fa-users' },
                { id: 'programs', label: 'Curriculum & Programs', icon: 'fa-shapes' },
                { id: 'analytics', label: 'Executive Analytics', icon: 'fa-chart-line' },
                { id: 'reports', label: 'Compliance Reports', icon: 'fa-file-lines' },
                { id: 'settings', label: 'Network Settings', icon: 'fa-sliders' },
                { id: 'logs', label: 'Audit Logs', icon: 'fa-shield-halved' },
                { id: 'backup', label: 'Database Backup', icon: 'fa-database' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setCurrentTab(item.id as AdminTab);
                    setIsMobileSidebarOpen(false);
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-left transition-all ${currentTab === item.id
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100'
                    }`}
                >
                  <i className={`fa-solid ${item.icon} w-5 text-center`}></i>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100">
              <button
                onClick={onSwitchToPublic}
                className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold flex items-center justify-center gap-2"
              >
                <i className="fa-solid fa-globe text-blue-600"></i>
                <span>Switch to Public Website</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header */}
        <div className="relative">
          {/* Mobile hamburger button */}
          <div className="lg:hidden px-4 py-2.5 bg-white border-b border-slate-200 flex items-center justify-between">
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 focus:outline-none"
            >
              <i className="fa-solid fa-bars text-lg"></i>
            </button>
            <span className="font-bold text-sm text-slate-800 font-outfit">ABC Super Admin</span>
            <button
              onClick={onSwitchToPublic}
              className="text-xs px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 font-semibold"
            >
              Public Site
            </button>
          </div>

          <AdminHeader
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSwitchToPublic={onSwitchToPublic}
            onOpenNewCenter={() => setIsNewCenterOpen(true)}
            onOpenNewUser={() => setIsNewUserOpen(true)}
          />
        </div>

        {/* Scrollable Main Views */}
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 z-10 relative">
          {currentTab === 'dashboard' && (
            <DashboardView
              centers={centers}
              onNavigateTab={(tab) => setCurrentTab(tab)}
              onOpenNewCenter={() => setIsNewCenterOpen(true)}
              onOpenNewUser={() => setIsNewUserOpen(true)}
              onOpenNewProgram={() => setIsNewProgramOpen(true)}
            />
          )}

          {currentTab === 'schools' && (
            <SchoolsView
              centers={centers}
              onOpenNewCenter={() => setIsNewCenterOpen(true)}
              onOpenCampusMap={() => setIsCampusMapOpen(true)}
              onExport={() => handleExport('Schools_Directory_2026')}
            />
          )}

          {currentTab === 'users' && (
            <UsersView
              users={users}
              onOpenNewUser={() => setIsNewUserOpen(true)}
              onExport={() => handleExport('Users_Subscriptions_Audit')}
            />
          )}

          {currentTab === 'programs' && (
            <ProgramsView
              programs={programs}
              onOpenNewProgram={() => setIsNewProgramOpen(true)}
              onExport={() => handleExport('Curriculum_Programs_Dataset')}
            />
          )}

          {currentTab === 'analytics' && (
            <AnalyticsView
              centers={centers}
              onExport={() => handleExport('Executive_Analytics_BI')}
            />
          )}

          {currentTab === 'reports' && (
            <ReportsView
              centers={centers}
              onExport={() => handleExport('Network_Compliance_Audit')}
            />
          )}

          {currentTab === 'settings' && <SettingsView />}

          {currentTab === 'logs' && <LogsView />}

          {currentTab === 'backup' && <BackupView />}
        </main>
      </div>

      {/* Modals */}
      <NewCenterModal
        isOpen={isNewCenterOpen}
        onClose={() => setIsNewCenterOpen(false)}
        onAddCenter={(newCenter) => {
          onAddCenter(newCenter);
          showToast(`Campus "${newCenter.name}" registered successfully!`);
        }}
      />

      <NewUserModal
        isOpen={isNewUserOpen}
        onClose={() => setIsNewUserOpen(false)}
        centers={centers}
        onAddUser={(newUser) => {
          onAddUser(newUser);
          showToast(`User account for "${newUser.name}" created!`);
        }}
      />

      <NewProgramModal
        isOpen={isNewProgramOpen}
        onClose={() => setIsNewProgramOpen(false)}
        onAddProgram={(newProg) => {
          onAddProgram(newProg);
          showToast(`Curriculum program "${newProg.name}" created!`);
        }}
      />

      <CampusMapModal
        isOpen={isCampusMapOpen}
        onClose={() => setIsCampusMapOpen(false)}
        centers={centers}
      />
    </div>
  );
};
