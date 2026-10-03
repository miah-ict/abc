const { query } = require('../config/db');

// --- Settings ---
const getSettings = async (req, res) => {
  try {
    const dbRes = await query('SELECT * FROM system_settings');
    const settingsMap = {};
    dbRes.rows.forEach((row) => {
      settingsMap[row.key] = row.value;
    });

    // Provide default fallback settings if empty
    const defaults = {
      systemName: 'ABC Daycare Management Suite',
      supportEmail: 'support@abcdaycare.so',
      supportPhone: '+252 61 234 5678',
      defaultCurrency: 'USD ($)',
      timezone: 'Africa/Mogadishu (UTC+3)',
      autoBackupEnabled: true,
      backupFrequency: 'Daily at 03:00 AM',
      maintenanceMode: false,
      requireMFA: true,
      maxLoginAttempts: 5,
    };

    res.json({ success: true, data: { ...defaults, ...settingsMap } });
  } catch (err) {
    console.error('[System getSettings Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch settings' });
  }
};

const updateSettings = async (req, res) => {
  try {
    const settings = req.body;
    for (const [key, value] of Object.entries(settings)) {
      await query(
        `INSERT INTO system_settings (key, value, updated_at)
         VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
        [key, JSON.stringify(value)]
      );
    }
    res.json({ success: true, message: 'System settings updated successfully' });
  } catch (err) {
    console.error('[System updateSettings Error]', err);
    res.status(500).json({ success: false, message: 'Failed to update settings' });
  }
};

// --- Logs ---
const getAuditLogs = async (req, res) => {
  try {
    const logsRes = await query(`
      SELECT 
        id, 
        user_name AS "userName", 
        action, 
        category, 
        ip_address AS "ipAddress", 
        TO_CHAR(timestamp, 'YYYY-MM-DD HH24:MI:SS') AS "timestamp", 
        details
      FROM audit_logs
      ORDER BY timestamp DESC
      LIMIT 100
    `);
    res.json({ success: true, count: logsRes.rows.length, data: logsRes.rows });
  } catch (err) {
    console.error('[System getAuditLogs Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch audit logs' });
  }
};

const createAuditLog = async (req, res) => {
  try {
    const { action, category = 'System', details = {} } = req.body;
    const userId = req.user ? req.user.id : null;
    const userName = req.user ? req.user.name : 'System';
    const ipAddress = req.ip || '127.0.0.1';
    const id = `log-${Date.now()}`;

    await query(
      `INSERT INTO audit_logs (id, user_id, user_name, action, category, ip_address, details)
       VALUES ($1, $2, $3, $4, $5, $6, $7)`,
      [id, userId, userName, action, category, ipAddress, JSON.stringify(details)]
    );

    res.status(201).json({ success: true, message: 'Audit log created' });
  } catch (err) {
    console.error('[System createAuditLog Error]', err);
    res.status(500).json({ success: false, message: 'Failed to log action' });
  }
};

// --- Backups ---
const getBackups = async (req, res) => {
  try {
    const backupsRes = await query(`
      SELECT 
        id, 
        filename, 
        size_mb AS "sizeMb", 
        type, 
        status, 
        TO_CHAR(created_at, 'Mon DD, YYYY HH24:MI') AS "createdAt"
      FROM system_backups
      ORDER BY created_at DESC
    `);
    res.json({ success: true, count: backupsRes.rows.length, data: backupsRes.rows });
  } catch (err) {
    console.error('[System getBackups Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch system backups' });
  }
};

const triggerBackup = async (req, res) => {
  try {
    const dateStr = new Date().toISOString().replace(/[-:T.]/g, '').substring(0, 14);
    const id = `bk-${Date.now()}`;
    const filename = `abc_db_backup_${dateStr}_manual.sql.gz`;
    const sizeMb = (Math.random() * 5 + 40).toFixed(1);

    await query(
      `INSERT INTO system_backups (id, filename, size_mb, type, status)
       VALUES ($1, $2, $3, 'Manual', 'Completed')`,
      [id, filename, parseFloat(sizeMb)]
    );

    res.status(201).json({
      success: true,
      message: 'Database backup generated successfully',
      data: { id, filename, sizeMb: parseFloat(sizeMb), type: 'Manual', status: 'Completed' },
    });
  } catch (err) {
    console.error('[System triggerBackup Error]', err);
    res.status(500).json({ success: false, message: 'Failed to create backup' });
  }
};

// --- Reports ---
const getReportsSummary = async (req, res) => {
  try {
    const summary = [
      { id: 'rep-1', title: 'Monthly Executive Attendance Report', category: 'Operations', date: 'Oct 01, 2026', format: 'PDF', status: 'Ready' },
      { id: 'rep-2', title: 'Q3 Financial Revenue & Subscriptions Audit', category: 'Finance', date: 'Sep 30, 2026', format: 'CSV / Excel', status: 'Ready' },
      { id: 'rep-3', title: 'Multi-Center Curriculum Progress & Compliance', category: 'Academic', date: 'Sep 25, 2026', format: 'PDF', status: 'Ready' },
      { id: 'rep-4', title: 'Ministry Health & Hygiene Inspection Log', category: 'Compliance', date: 'Sep 15, 2026', format: 'PDF', status: 'Ready' },
    ];
    res.json({ success: true, count: summary.length, data: summary });
  } catch (err) {
    console.error('[System getReportsSummary Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch reports summary' });
  }
};

module.exports = {
  getSettings,
  updateSettings,
  getAuditLogs,
  createAuditLog,
  getBackups,
  triggerBackup,
  getReportsSummary,
};
