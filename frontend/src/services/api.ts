import { DaycareCenter, UserItem, ProgramItem } from '../types';

const API_BASE = '/api';

const getHeaders = () => {
  const token = localStorage.getItem('abc_access_token');
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

export const authApi = {
  login: async (email: string, password: string) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.token) {
      localStorage.setItem('abc_access_token', data.token);
      localStorage.setItem('abc_refresh_token', data.refreshToken);
      localStorage.setItem('abc_user', JSON.stringify(data.user));
    }
    return data;
  },

  logout: async () => {
    const refreshToken = localStorage.getItem('abc_refresh_token');
    try {
      await fetch(`${API_BASE}/auth/logout`, {
        method: 'POST',
        headers: getHeaders(),
        body: JSON.stringify({ refreshToken }),
      });
    } catch (e) {
      // silent catch
    }
    localStorage.removeItem('abc_access_token');
    localStorage.removeItem('abc_refresh_token');
    localStorage.removeItem('abc_user');
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, { headers: getHeaders() });
    return res.json();
  },
};

export const centersApi = {
  getAll: async (): Promise<DaycareCenter[]> => {
    const res = await fetch(`${API_BASE}/admin/centers`, { headers: getHeaders() });
    const json = await res.json();
    return json.data || [];
  },

  create: async (center: Partial<DaycareCenter>): Promise<DaycareCenter> => {
    const res = await fetch(`${API_BASE}/admin/centers`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(center),
    });
    const json = await res.json();
    return json.data;
  },

  update: async (id: string, center: Partial<DaycareCenter>): Promise<DaycareCenter> => {
    const res = await fetch(`${API_BASE}/admin/centers/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(center),
    });
    const json = await res.json();
    return json.data;
  },

  updateStatus: async (id: string, status: string): Promise<DaycareCenter> => {
    const res = await fetch(`${API_BASE}/admin/centers/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    return json.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/admin/centers/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const json = await res.json();
    return json.success;
  },
};

export const usersApi = {
  getAll: async (): Promise<UserItem[]> => {
    const res = await fetch(`${API_BASE}/admin/users`, { headers: getHeaders() });
    const json = await res.json();
    return json.data || [];
  },

  create: async (user: Partial<UserItem>): Promise<UserItem> => {
    const res = await fetch(`${API_BASE}/admin/users`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(user),
    });
    const json = await res.json();
    return json.data;
  },

  update: async (id: string, user: Partial<UserItem>): Promise<UserItem> => {
    const res = await fetch(`${API_BASE}/admin/users/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(user),
    });
    const json = await res.json();
    return json.data;
  },

  updateStatus: async (id: string, status: string): Promise<UserItem> => {
    const res = await fetch(`${API_BASE}/admin/users/${id}/status`, {
      method: 'PATCH',
      headers: getHeaders(),
      body: JSON.stringify({ status }),
    });
    const json = await res.json();
    return json.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/admin/users/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const json = await res.json();
    return json.success;
  },
};

export const programsApi = {
  getAll: async (): Promise<ProgramItem[]> => {
    const res = await fetch(`${API_BASE}/admin/programs`, { headers: getHeaders() });
    const json = await res.json();
    return json.data || [];
  },

  create: async (program: Partial<ProgramItem>): Promise<ProgramItem> => {
    const res = await fetch(`${API_BASE}/admin/programs`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(program),
    });
    const json = await res.json();
    return json.data;
  },

  update: async (id: string, program: Partial<ProgramItem>): Promise<ProgramItem> => {
    const res = await fetch(`${API_BASE}/admin/programs/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(program),
    });
    const json = await res.json();
    return json.data;
  },

  delete: async (id: string): Promise<boolean> => {
    const res = await fetch(`${API_BASE}/admin/programs/${id}`, {
      method: 'DELETE',
      headers: getHeaders(),
    });
    const json = await res.json();
    return json.success;
  },
};

export const analyticsApi = {
  getOverview: async () => {
    const res = await fetch(`${API_BASE}/admin/analytics/overview`, { headers: getHeaders() });
    const json = await res.json();
    return json.data;
  },

  getCharts: async () => {
    const res = await fetch(`${API_BASE}/admin/analytics/charts`, { headers: getHeaders() });
    const json = await res.json();
    return json.data;
  },
};

export const systemApi = {
  getSettings: async () => {
    const res = await fetch(`${API_BASE}/admin/system/settings`, { headers: getHeaders() });
    const json = await res.json();
    return json.data;
  },

  updateSettings: async (settings: any) => {
    const res = await fetch(`${API_BASE}/admin/system/settings`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(settings),
    });
    return res.json();
  },

  getLogs: async () => {
    const res = await fetch(`${API_BASE}/admin/system/logs`, { headers: getHeaders() });
    const json = await res.json();
    return json.data || [];
  },

  getBackups: async () => {
    const res = await fetch(`${API_BASE}/admin/system/backups`, { headers: getHeaders() });
    const json = await res.json();
    return json.data || [];
  },

  triggerBackup: async () => {
    const res = await fetch(`${API_BASE}/admin/system/backups/trigger`, {
      method: 'POST',
      headers: getHeaders(),
    });
    const json = await res.json();
    return json.data;
  },

  getReportsSummary: async () => {
    const res = await fetch(`${API_BASE}/admin/system/reports/summary`, { headers: getHeaders() });
    const json = await res.json();
    return json.data || [];
  },
};
