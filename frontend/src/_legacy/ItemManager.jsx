import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle, Clock, PlayCircle, Tag, Database, Layers } from 'lucide-react';

export default function ItemManager({ items, dataSource, loading, onAddItem, onUpdateItem, onDeleteItem }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    await onAddItem({ title, description, status });
    setTitle('');
    setDescription('');
    setStatus('pending');
    setIsSubmitting(false);
  };

  const getStatusTag = (st) => {
    switch (st) {
      case 'completed':
        return <span className="tag tag-completed"><CheckCircle size={10} style={{ display: 'inline', marginRight: 3 }} /> Completed</span>;
      case 'in-progress':
        return <span className="tag tag-in-progress"><PlayCircle size={10} style={{ display: 'inline', marginRight: 3 }} /> In Progress</span>;
      default:
        return <span className="tag tag-pending"><Clock size={10} style={{ display: 'inline', marginRight: 3 }} /> Pending</span>;
    }
  };

  return (
    <div className="glass-card">
      <div className="card-header">
        <h3 className="card-title">
          <Layers size={20} className="gradient-text" /> Data Items Management
        </h3>
        <span className="tech-badge">
          Source: <strong style={{ color: dataSource === 'database' ? '#34d399' : '#fbbf24', marginLeft: 4 }}>{dataSource}</strong>
        </span>
      </div>

      {/* Add New Item Form */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem', padding: '1.25rem', background: 'rgba(255, 255, 255, 0.02)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
        <h4 style={{ marginBottom: '1rem', fontSize: '0.95rem', color: 'var(--text-muted)' }}>Create New Record</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Item Title *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Implement User Authentication"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label className="form-label">Status</label>
            <select 
              className="form-select" 
              value={status} 
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Detailed description of task or data record..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={isSubmitting || !title.trim()}>
          <Plus size={16} /> Add Item to Database
        </button>
      </form>

      {/* List of Items */}
      <div className="items-stack">
        {loading ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>Loading items from API...</p>
        ) : items.length === 0 ? (
          <p style={{ color: 'var(--text-muted)', textAlign: 'center', padding: '2rem' }}>No records found. Create your first item above!</p>
        ) : (
          items.map((item) => (
            <div key={item.id} className="item-card">
              <div className="item-details">
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.25rem' }}>
                  <h4>{item.title}</h4>
                  {getStatusTag(item.status)}
                </div>
                {item.description && <p>{item.description}</p>}
                <small style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>
                  ID: #{item.id} • Created: {new Date(item.created_at).toLocaleDateString()}
                </small>
              </div>

              <div className="item-actions">
                {item.status !== 'completed' && (
                  <button 
                    className="btn btn-secondary btn-sm"
                    onClick={() => onUpdateItem(item.id, { status: 'completed' })}
                    title="Mark Completed"
                  >
                    <CheckCircle size={14} />
                  </button>
                )}
                <button 
                  className="btn btn-danger btn-sm"
                  onClick={() => onDeleteItem(item.id)}
                  title="Delete Record"
                >
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
