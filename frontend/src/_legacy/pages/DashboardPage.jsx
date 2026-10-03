import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import DbStatusCard from '../components/DbStatusCard';
import ItemManager from '../components/ItemManager';
import ApiTester from '../components/ApiTester';
import { getHealthStatus } from '../services/health.service';
import { getItems, createItem, updateItem, deleteItem } from '../services/items.service';

export default function DashboardPage() {
  const [dbStatus, setDbStatus] = useState(null);
  const [dbLoading, setDbLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [dataSource, setDataSource] = useState('loading');
  const [itemsLoading, setItemsLoading] = useState(true);

  const checkDbHealth = async () => {
    setDbLoading(true);
    const data = await getHealthStatus();
    setDbStatus(data);
    setDbLoading(false);
  };

  const fetchItems = async () => {
    setItemsLoading(true);
    try {
      const data = await getItems();
      setItems(data.items || []);
      setDataSource(data.source || 'unknown');
    } catch (err) {
      console.error('Failed to load items:', err);
    } finally {
      setItemsLoading(false);
    }
  };

  useEffect(() => {
    checkDbHealth();
    fetchItems();
  }, []);

  const handleAddItem = async (newItemData) => {
    try {
      const data = await createItem(newItemData);
      if (data.item) {
        setItems(prev => [data.item, ...prev]);
      }
    } catch (err) {
      console.error('Failed to create item:', err);
    }
  };

  const handleUpdateItem = async (id, updates) => {
    try {
      const data = await updateItem(id, updates);
      if (data.item) {
        setItems(prev => prev.map(item => item.id === id ? data.item : item));
      }
    } catch (err) {
      console.error('Failed to update item:', err);
    }
  };

  const handleDeleteItem = async (id) => {
    try {
      await deleteItem(id);
      setItems(prev => prev.filter(item => item.id !== id));
    } catch (err) {
      console.error('Failed to delete item:', err);
    }
  };

  return (
    <div className="app-container">
      <Header />

      <main className="dashboard-grid">
        <aside>
          <DbStatusCard 
            status={dbStatus} 
            loading={dbLoading} 
            onRefresh={checkDbHealth} 
          />
        </aside>

        <section>
          <ItemManager 
            items={items}
            dataSource={dataSource}
            loading={itemsLoading}
            onAddItem={handleAddItem}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        </section>
      </main>

      <ApiTester />

      <footer className="footer-credits">
        <p>⚡ PERN Stack Starter • Built with PostgreSQL, Express, React & Node.js</p>
      </footer>
    </div>
  );
}
