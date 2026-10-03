import React, { useState, useEffect } from 'react';
import { ViewMode, DaycareCenter, UserItem, ProgramItem } from './types';
import { INITIAL_CENTERS, INITIAL_USERS, INITIAL_PROGRAMS } from './data/mockData';
import { centersApi, usersApi, programsApi, authApi } from './services/api';
import { PublicWebsite } from './components/PublicWebsite';
import { SuperAdminPortal } from './components/admin/SuperAdminPortal';
import { AuthPage } from './components/AuthPage';
import { TourBookingModal } from './components/modals/TourBookingModal';
import { EnrollmentModal } from './components/modals/EnrollmentModal';
import { JobApplyModal } from './components/modals/JobApplyModal';
import { StoryVideoModal } from './components/modals/StoryVideoModal';

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('public');
  const [centers, setCenters] = useState<DaycareCenter[]>(INITIAL_CENTERS);
  const [users, setUsers] = useState<UserItem[]>(INITIAL_USERS);
  const [programs, setPrograms] = useState<ProgramItem[]>(INITIAL_PROGRAMS);

  useEffect(() => {
    // Fetch live backend data on mount
    const fetchData = async () => {
      try {
        const [fetchedCenters, fetchedUsers, fetchedPrograms] = await Promise.all([
          centersApi.getAll(),
          usersApi.getAll(),
          programsApi.getAll(),
        ]);

        if (fetchedCenters && fetchedCenters.length > 0) setCenters(fetchedCenters);
        if (fetchedUsers && fetchedUsers.length > 0) setUsers(fetchedUsers);
        if (fetchedPrograms && fetchedPrograms.length > 0) setPrograms(fetchedPrograms);
      } catch (err) {
        console.warn('Backend API offline or unreachable, using default fixture datasets.');
      }
    };
    fetchData();
  }, []);

  // Global modals on public site
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'login' | 'signup'>('login');
  const [isTourOpen, setIsTourOpen] = useState(false);
  const [isEnrollOpen, setIsEnrollOpen] = useState(false);
  const [isJobApplyOpen, setIsJobApplyOpen] = useState(false);
  const [isStoryVideoOpen, setIsStoryVideoOpen] = useState(false);
  const [selectedJobTitle, setSelectedJobTitle] = useState('Early Childhood Lead Educator');
  const [defaultCampusId, setDefaultCampusId] = useState<string | undefined>(undefined);

  // Notification Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleAddCenter = async (newCenter: DaycareCenter) => {
    setCenters((prev) => [newCenter, ...prev]);
    try {
      await centersApi.create(newCenter);
    } catch (e) {
      console.error('Failed to sync center to backend', e);
    }
  };

  const handleAddUser = async (newUser: UserItem) => {
    setUsers((prev) => [newUser, ...prev]);
    try {
      await usersApi.create(newUser);
    } catch (e) {
      console.error('Failed to sync user to backend', e);
    }
  };

  const handleAddProgram = async (newProg: ProgramItem) => {
    setPrograms((prev) => [newProg, ...prev]);
    try {
      await programsApi.create(newProg);
    } catch (e) {
      console.error('Failed to sync program to backend', e);
    }
  };


  return (
    <div
      className={`${
        viewMode === 'admin' ? 'h-screen overflow-hidden' : 'min-h-screen'
      } bg-white text-slate-900 font-sans relative selection:bg-blue-100 selection:text-blue-900`}
    >
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3 rounded-2xl shadow-2xl border border-slate-700/80 flex items-center gap-3 text-xs animate-bounce font-medium">
          <i className="fa-solid fa-circle-check text-emerald-400 text-sm"></i>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Floating Quick View Switcher Bar */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-white/95 backdrop-blur-md p-1.5 rounded-2xl shadow-2xl border border-slate-200/90 text-xs">
        <button
          onClick={() => setViewMode('public')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
            viewMode === 'public'
              ? 'bg-blue-600 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <i className="fa-solid fa-earth-americas text-xs"></i>
          <span>Public Landing</span>
        </button>
        <button
          onClick={() => setViewMode('admin')}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold transition-all ${
            viewMode === 'admin'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          <i className="fa-solid fa-shield-halved text-xs text-amber-400"></i>
          <span>Super Admin Hub</span>
        </button>
      </div>

      {/* Active Experience */}
      {viewMode === 'public' ? (
        <div className="site-shell">
          <PublicWebsite
            onOpenAdmin={() => setViewMode('admin')}
            onOpenLogin={() => {
              setAuthInitialMode('login');
              setViewMode('auth');
            }}
            onOpenSignUp={() => {
              setAuthInitialMode('signup');
              setViewMode('auth');
            }}
            onOpenJobApply={(title) => {
              setSelectedJobTitle(title || 'Early Childhood Educator');
              setIsJobApplyOpen(true);
            }}
            onOpenStoryVideo={() => setIsStoryVideoOpen(true)}
            onOpenProgramEnroll={(programName) => {
              setIsEnrollOpen(true);
              showToast(`Opening enrollment for: ${programName}`);
            }}
          />
        </div>
      ) : viewMode === 'auth' ? (
        <AuthPage
          onBackToHome={() => setViewMode('public')}
          mode={authInitialMode}
          onLoginAsSuperAdmin={() => {
            setViewMode('admin');
            showToast('Authenticated as Super Admin (Central Director)');
          }}
          onLoginSuccess={(role, name) => {
            setViewMode('admin');
            showToast(`Welcome back, ${name}! (${role} Session Active)`);
          }}
        />
      ) : (
        <SuperAdminPortal
          onSwitchToPublic={() => setViewMode('public')}
          centers={centers}
          users={users}
          programs={programs}
          onAddCenter={handleAddCenter}
          onAddUser={handleAddUser}
          onAddProgram={handleAddProgram}
        />
      )}

      {/* Public Side Modals */}

      <TourBookingModal
        isOpen={isTourOpen}
        onClose={() => setIsTourOpen(false)}
        centers={centers}
        defaultCenterId={defaultCampusId}
        onSuccess={(details) => {
          showToast(
            `Tour booked for ${details.childAge} at ${details.centerName} on ${details.tourDate} (${details.tourTime})!`
          );
        }}
      />

      <EnrollmentModal
        isOpen={isEnrollOpen}
        onClose={() => setIsEnrollOpen(false)}
        centers={centers}
        onSuccess={(details) => {
          showToast(
            `Enrollment application submitted for ${details.childName} at ${details.centerName}! Our admissions director will call ${details.phone}.`
          );
        }}
      />

      <JobApplyModal
        isOpen={isJobApplyOpen}
        onClose={() => setIsJobApplyOpen(false)}
        jobTitle={selectedJobTitle}
        onSuccess={(candidate) => {
          showToast(`Application submitted for ${candidate.jobTitle}! Thank you, ${candidate.name}.`);
        }}
      />

      <StoryVideoModal
        isOpen={isStoryVideoOpen}
        onClose={() => setIsStoryVideoOpen(false)}
        onBookTour={() => {
          setIsStoryVideoOpen(false);
          setIsTourOpen(true);
        }}
      />
    </div>
  );
}
