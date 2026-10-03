import React, { useState } from 'react';
import { Terminal, Send, Copy, Check } from 'lucide-react';

export default function ApiTester() {
  const [activeEndpoint, setActiveEndpoint] = useState('/api/health');
  const [responseJson, setResponseJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const fetchEndpoint = async (path) => {
    setActiveEndpoint(path);
    setLoading(true);
    try {
      const res = await fetch(path);
      const data = await res.json();
      setResponseJson(data);
    } catch (err) {
      setResponseJson({ error: err.message, note: 'Failed to fetch endpoint' });
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="glass-card" style={{ marginTop: '2rem' }}>
      <div className="card-header">
        <h3 className="card-title">
          <Terminal size={20} className="gradient-text" /> REST API Live Endpoint Inspector
        </h3>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem' }}>
        <button 
          className={`btn ${activeEndpoint === '/api/health' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => fetchEndpoint('/api/health')}
        >
          <Send size={14} /> GET /api/health
        </button>

        <button 
          className={`btn ${activeEndpoint === '/api/items' ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          onClick={() => fetchEndpoint('/api/items')}
        >
          <Send size={14} /> GET /api/items
        </button>
      </div>

      {responseJson && (
        <div style={{ position: 'relative' }}>
          <button 
            className="btn btn-secondary btn-sm"
            style={{ position: 'absolute', top: 10, right: 10, zIndex: 10 }}
            onClick={() => copyToClipboard(JSON.stringify(responseJson, null, 2))}
          >
            {copied ? <Check size={14} style={{ color: '#34d399' }} /> : <Copy size={14} />} {copied ? 'Copied' : 'Copy'}
          </button>

          <pre className="code-box">
            {loading ? 'Executing HTTP GET request...' : JSON.stringify(responseJson, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
