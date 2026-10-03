const { pool } = require('../config/db');

// Fallback in-memory dataset when PostgreSQL is offline
let mockItems = [
  { id: 1, title: 'Setup PERN Environment', description: 'PostgreSQL, Express, React, Node.js installed and operational', status: 'completed', created_at: new Date().toISOString() },
  { id: 2, title: 'Configure PostgreSQL Database', description: 'Connect Express server to local or Dockerized PostgreSQL instance', status: 'in-progress', created_at: new Date().toISOString() },
  { id: 3, title: 'Build Modern React Interface', description: 'Create dynamic responsive component interface with dark mode theme', status: 'pending', created_at: new Date().toISOString() }
];

class ItemModel {
  static async findAll() {
    try {
      const result = await pool.query('SELECT * FROM items ORDER BY id ASC');
      return { source: 'database', items: result.rows };
    } catch (err) {
      console.warn('⚡ PostgreSQL unavailable, serving mock data:', err.message);
      return { source: 'mock', items: mockItems, dbError: err.message };
    }
  }

  static async create({ title, description, status = 'pending' }) {
    try {
      const result = await pool.query(
        'INSERT INTO items (title, description, status) VALUES ($1, $2, $3) RETURNING *',
        [title, description, status]
      );
      return { source: 'database', item: result.rows[0] };
    } catch (err) {
      const newItem = {
        id: Date.now(),
        title,
        description,
        status,
        created_at: new Date().toISOString()
      };
      mockItems.unshift(newItem);
      return { source: 'mock', item: newItem, dbError: err.message };
    }
  }

  static async update(id, { title, description, status }) {
    try {
      const result = await pool.query(
        'UPDATE items SET title = COALESCE($1, title), description = COALESCE($2, description), status = COALESCE($3, status), updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
        [title, description, status, id]
      );
      if (result.rows.length === 0) return null;
      return { source: 'database', item: result.rows[0] };
    } catch (err) {
      const index = mockItems.findIndex(i => i.id === parseInt(id));
      if (index !== -1) {
        if (title) mockItems[index].title = title;
        if (description) mockItems[index].description = description;
        if (status) mockItems[index].status = status;
        return { source: 'mock', item: mockItems[index] };
      }
      return null;
    }
  }

  static async delete(id) {
    try {
      const result = await pool.query('DELETE FROM items WHERE id = $1 RETURNING *', [id]);
      if (result.rows.length === 0) return null;
      return { source: 'database', item: result.rows[0] };
    } catch (err) {
      const index = mockItems.findIndex(i => i.id === parseInt(id));
      if (index !== -1) {
        const deleted = mockItems.splice(index, 1)[0];
        return { source: 'mock', item: deleted };
      }
      return null;
    }
  }
}

module.exports = ItemModel;
