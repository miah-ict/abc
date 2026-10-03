import React from 'react';
import { Database, RefreshCw, CheckCircle2, AlertTriangle, Cpu, Clock, Server } from 'lucide-react';

export default function DbStatusCard({ status, loading, onRefresh }) {
  const isOnline = status && status.status === 'online';

  return (
    <div className="glass-card">
      <div className="card-header">
        <h3 className="card-title">
          <Database size={20} className="gradient-text" /> Database Connection
        </h3>
        <button 
          className="btn btn-secondary btn-sm" 
          onClick={onRefresh}
          disabled={loading}
          title="Refresh Status"
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} /> Refresh
        </button>
      </div>

      <div style={{ marginBottom: '1.25rem' }}>
        {loading ? (
          <div className="status-pill secondary">Checking connection...</div>
        ) : isOnline ? (
          <div className="status-pill online">
            <span className="status-indicator"></span>
            Connected to PostgreSQL
          </div>
        ) : (
          <div className="status-pill offline">
            <span className="status-indicator"></span>
            Database Offline / Standby
          </div>
        )}
      </div>

      <div className="info-list">
        <div className="info-row">
          <span className="info-label"><Server size={14} style={{ display: 'inline', marginRight: 6 }} /> Express API</span>
          <span className="info-value" style={{ color: '#34d399' }}>http://localhost:5000</span>
        </div>

        <div className="info-row">
          <span className="info-label"><Database size={14} style={{ display: 'inline', marginRight: 6 }} /> Target DB Host</span>
          <span className="info-value">localhost:5432 (perndb)</span>
        </div>

        {isOnline && (
          <>
            <div className="info-row">
              <span className="info-label"><Clock size={14} style={{ display: 'inline', marginRight: 6 }} /> DB Time</span>
              <span className="info-value">{new Date(status.timestamp).toLocaleTimeString()}</span>
            </div>
            <div className="info-row">
              <span className="info-label"><Cpu size={14} style={{ display: 'inline', marginRight: 6 }} /> Engine</span>
              <span className="info-value" style={{ fontSize: '0.75rem' }}>{status.postgresVersion.split(' ')[0]}</span>
            </div>
          </>
        )}
      </div>

      {!isOnline && !loading && (
        <div style={{ marginTop: '1.25rem', padding: '0.85rem', background: 'rgba(245, 158, 11, 0.1)', border: '1px solid rgba(245, 158, 11, 0.25)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: '#fcd34d' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 600, marginBottom: '0.3rem' }}>
            <AlertTriangle size={16} /> PostgreSQL Not Detected
          </div>
          <p style={{ color: '#fef08a', fontSize: '0.8rem', lineHeight: 1.4 }}>
            Run <code style={{ background: 'rgba(0,0,0,0.4)', padding: '0.1rem 0.4rem', borderRadius: 4 }}>docker-compose up -d</code> in the terminal to launch a PostgreSQL container, or ensure local PostgreSQL service is running. Express API is currently serving mock data for demonstration.
          </p>
        </div>
      )}
    </div>
  );
}
