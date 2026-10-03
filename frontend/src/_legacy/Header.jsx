import React from 'react';
import { Layers, Database, Server, Code, Terminal } from 'lucide-react';

export default function Header() {
  return (
    <header className="header-banner">
      <div className="brand-section">
        <div className="brand-icon-box">
          <Layers size={26} />
        </div>
        <div>
          <h1 className="brand-title">
            <span className="gradient-text">PERN</span> Stack App
          </h1>
          <p className="brand-subtitle">
            PostgreSQL • Express • React • Node.js
          </p>
        </div>
      </div>

      <div className="badge-group">
        <span className="tech-badge active">
          <Database size={14} /> PostgreSQL 16
        </span>
        <span className="tech-badge active">
          <Server size={14} /> Express API
        </span>
        <span className="tech-badge active">
          <Code size={14} /> React 18 + Vite
        </span>
        <span className="tech-badge active">
          <Terminal size={14} /> Node.js Environment
        </span>
      </div>
    </header>
  );
}
