import React, { useState } from 'react';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';

export default function App() {
  const [currentView, setCurrentView] = useState('landing'); // 'landing' | 'dashboard'

  if (currentView === 'dashboard') {
    return (
      <div>
        <div style={{ background: '#0f172a', padding: '0.75rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#94a3b8', fontSize: '0.875rem', fontWeight: 600 }}>PERN Stack Admin & Backend Inspector</span>
          <button 
            onClick={() => setCurrentView('landing')}
            style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(99, 102, 241, 0.2)', border: '1px solid rgba(99, 102, 241, 0.4)', color: '#a5b4fc', cursor: 'pointer', fontWeight: 600, fontSize: '0.8rem' }}
          >
            ← Back to ABC Landing Page
          </button>
        </div>
        <DashboardPage />
      </div>
    );
  }

  return <LandingPage onOpenDashboard={() => setCurrentView('dashboard')} />;
}
