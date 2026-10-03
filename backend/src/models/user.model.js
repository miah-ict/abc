const bcrypt = require('bcryptjs');
const { query } = require('../config/db');

const ADMIN_PASSWORD_HASH = bcrypt.hashSync('admin123ah', 10);

let mockUsers = [
  {
    id: 'usr-superadmin',
    name: 'Harun Admin',
    initials: 'HA',
    email: 'hrn@miaict.com',
    phone: '+252 61 000 0000',
    role: 'SUPER_ADMIN',
    verified: true,
    centerName: 'ABC HQ',
    centerLocation: 'Mogadishu HQ',
    planName: 'Enterprise Multi-Center',
    planDetails: 'Full Access',
    daysLeft: 999,
    planStatus: 'Active',
    nextBillingDate: 'Jan 01, 2030',
    billingMethod: 'Internal System',
    autoRenew: true,
    userStatus: 'Active',
    enrolledKids: 500,
    maxKids: 500,
    enrolledStaff: 60,
    maxStaff: 60,
  },
  {
    id: 'usr-admin',
    name: 'Super Admin',
    initials: 'SA',
    email: 'admin@abcdaycare.so',
    phone: '+252 61 000 0000',
    role: 'SUPER_ADMIN',
    verified: true,
    centerName: 'ABC HQ',
    centerLocation: 'Mogadishu HQ',
    planName: 'Enterprise Multi-Center',
    planDetails: 'Full Access',
    daysLeft: 999,
    planStatus: 'Active',
    nextBillingDate: 'Jan 01, 2030',
    billingMethod: 'Internal System',
    autoRenew: true,
    userStatus: 'Active',
    enrolledKids: 500,
    maxKids: 500,
    enrolledStaff: 60,
    maxStaff: 60,
  },
  {
    id: 'usr-1',
    name: 'Dr. Farxaan Cali Jimcaale',
    initials: 'FJ',
    email: 'farxaan.jimcaale@abcdaycare.so',
    phone: '+252 61 558 9201',
    role: 'DAYCARE_OWNER',
    verified: true,
    centerName: 'ABC Main Center',
    centerLocation: 'Km4, Mogadishu HQ',
    planName: 'Enterprise Multi-Center',
    planDetails: 'Unlimited Staff • 500 Kids',
    daysLeft: 184,
    planStatus: 'Active',
    nextBillingDate: 'Oct 18, 2026',
    billingMethod: 'EVC / Dahabshiil',
    autoRenew: true,
    userStatus: 'Active',
    enrolledKids: 452,
    maxKids: 500,
    enrolledStaff: 52,
    maxStaff: 60,
  },
  {
    id: 'usr-2',
    name: 'Sahra Cabdi Nuur',
    initials: 'SN',
    email: 'sahra.admin@hodancampus.abc.so',
    phone: '+252 61 723 4410',
    role: 'DAYCARE_ADMIN',
    verified: true,
    centerName: 'Hodan Center',
    centerLocation: 'Taleex Street, Mogadishu',
    planName: 'Pro Annual',
    planDetails: 'Up to 380 Kids • 25 Staff',
    daysLeft: 312,
    planStatus: 'Active',
    nextBillingDate: 'Feb 24, 2027',
    billingMethod: 'Zaad Service',
    autoRenew: true,
    userStatus: 'Active',
    enrolledKids: 354,
    maxKids: 380,
    enrolledStaff: 38,
    maxStaff: 40,
  },
  {
    id: 'usr-3',
    name: 'Eng. Mahad Warsame Cigaal',
    initials: 'MC',
    email: 'mahad.cigaal@abdallahdaycare.com',
    phone: '+252 61 889 0041',
    role: 'DAYCARE_OWNER',
    verified: true,
    centerName: 'Abdallah Center',
    centerLocation: 'Waberi District',
    planName: 'Growth Tier (Quarterly)',
    planDetails: 'Max 300 Kids • 30 Staff',
    daysLeft: 5,
    planStatus: 'Expiring Soon',
    nextBillingDate: 'Aug 31, 2026',
    billingMethod: 'EVC / Dahabshiil',
    autoRenew: false,
    userStatus: 'Active',
    enrolledKids: 298,
    maxKids: 300,
    enrolledStaff: 30,
    maxStaff: 30,
  },
  {
    id: 'usr-4',
    name: 'Fartuun Axmed Maxamed',
    initials: 'FA',
    email: 'fartuun.teacher@abcdaycare.so',
    phone: '+252 61 332 9901',
    role: 'TEACHER',
    verified: true,
    centerName: 'ABC Main Center',
    centerLocation: 'Class: Pre-K Butterflies',
    planName: 'Tenant Seat License',
    planDetails: 'Included in Enterprise plan',
    daysLeft: 184,
    planStatus: 'Managed',
    nextBillingDate: 'Oct 18, 2026',
    billingMethod: 'Campus Billed',
    autoRenew: true,
    userStatus: 'Active',
  },
];

class UserModel {
  static async findByEmail(email) {
    try {
      const res = await query('SELECT * FROM users WHERE email = $1', [email.toLowerCase().trim()]);
      return res.rows[0] || null;
    } catch (err) {
      const formattedEmail = email.toLowerCase().trim();
      if (formattedEmail === 'hrn@miaict.com' || formattedEmail === 'admin@abcdaycare.so') {
        return {
          id: formattedEmail === 'hrn@miaict.com' ? 'usr-superadmin' : 'usr-admin',
          name: formattedEmail === 'hrn@miaict.com' ? 'Harun Admin' : 'Super Admin',
          email: formattedEmail,
          password_hash: ADMIN_PASSWORD_HASH,
          role: 'SUPER_ADMIN',
          status: 'Active',
        };
      }
      const user = mockUsers.find((u) => u.email.toLowerCase() === formattedEmail);
      if (user) {
        return {
          ...user,
          password_hash: ADMIN_PASSWORD_HASH,
        };
      }
      return null;
    }
  }

  static async findById(id) {
    try {
      const res = await query('SELECT id, name, email, role, phone, initials, verified, status, created_at FROM users WHERE id = $1', [id]);
      return res.rows[0] || null;
    } catch (err) {
      return mockUsers.find((u) => u.id === id) || null;
    }
  }

  static async findAllEnriched() {
    try {
      const sql = `
        SELECT 
          u.id,
          u.name,
          u.initials,
          u.email,
          u.phone,
          u.role,
          u.verified,
          u.status AS "userStatus",
          c.name AS "centerName",
          c.address AS "centerLocation",
          p.name AS "planName",
          p.details AS "planDetails",
          s.days_left AS "daysLeft",
          s.status AS "planStatus",
          TO_CHAR(s.next_billing_date, 'Mon DD, YYYY') AS "nextBillingDate",
          s.billing_method AS "billingMethod",
          s.auto_renew AS "autoRenew",
          c.enrolled AS "enrolledKids",
          c.capacity AS "maxKids",
          (c.teachers_count + c.staff_count) AS "enrolledStaff",
          p.max_staff AS "maxStaff"
        FROM users u
        LEFT JOIN centers c ON c.owner_id = u.id
        LEFT JOIN subscriptions s ON s.center_id = c.id
        LEFT JOIN plans p ON s.plan_id = p.id
        ORDER BY u.created_at DESC;
      `;
      const res = await query(sql);
      return res.rows;
    } catch (err) {
      return mockUsers;
    }
  }

  static async create({ id, name, email, password_hash, role, phone, initials }) {
    try {
      const res = await query(
        `INSERT INTO users (id, name, email, password_hash, role, phone, initials)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         RETURNING id, name, email, role, phone, initials, verified, status, created_at`,
        [id, name, email.toLowerCase().trim(), password_hash, role, phone, initials]
      );
      return res.rows[0];
    } catch (err) {
      const newUser = {
        id: id || `usr-${Date.now()}`,
        name,
        email,
        phone,
        role,
        initials,
        verified: true,
        userStatus: 'Active',
        centerName: 'New Campus',
        planName: 'Pro Annual',
      };
      mockUsers.unshift(newUser);
      return newUser;
    }
  }

  static async update(id, fields) {
    try {
      const { name, email, role, phone, status } = fields;
      const res = await query(
        `UPDATE users 
         SET name = COALESCE($1, name),
             email = COALESCE($2, email),
             role = COALESCE($3, role),
             phone = COALESCE($4, phone),
             status = COALESCE($5, status),
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $6
         RETURNING id, name, email, role, phone, initials, verified, status, updated_at`,
        [name, email ? email.toLowerCase().trim() : null, role, phone, status, id]
      );
      return res.rows[0];
    } catch (err) {
      const item = mockUsers.find((u) => u.id === id);
      if (item) {
        if (fields.name) item.name = fields.name;
        if (fields.email) item.email = fields.email;
        if (fields.role) item.role = fields.role;
        if (fields.phone) item.phone = fields.phone;
        if (fields.status) item.userStatus = fields.status;
        return item;
      }
      return null;
    }
  }

  static async delete(id) {
    try {
      const res = await query('DELETE FROM users WHERE id = $1 RETURNING id', [id]);
      return res.rowCount > 0;
    } catch (err) {
      const idx = mockUsers.findIndex((u) => u.id === id);
      if (idx !== -1) {
        mockUsers.splice(idx, 1);
        return true;
      }
      return false;
    }
  }

  static async storeRefreshToken(userId, token, expiresAt) {
    try {
      await query(
        `INSERT INTO refresh_tokens (id, user_id, token, expires_at)
         VALUES ($1, $2, $3, $4)
         ON CONFLICT (token) DO UPDATE SET expires_at = EXCLUDED.expires_at`,
        [`rt-${Date.now()}`, userId, token, expiresAt]
      );
    } catch (err) {
      // ignore offline refresh token store
    }
  }

  static async findRefreshToken(token) {
    try {
      const res = await query('SELECT * FROM refresh_tokens WHERE token = $1 AND expires_at > CURRENT_TIMESTAMP', [token]);
      return res.rows[0] || null;
    } catch (err) {
      return { token, user_id: 'usr-admin' };
    }
  }

  static async revokeRefreshToken(token) {
    try {
      await query('DELETE FROM refresh_tokens WHERE token = $1', [token]);
    } catch (err) {
      // ignore offline revoke
    }
  }
}

module.exports = UserModel;
