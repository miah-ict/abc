const { query } = require('../config/db');

let mockCenters = [
  {
    id: 'abc-hq-01',
    name: 'ABC Main Campus (HQ)',
    code: 'ABC-HQ-01',
    isHq: true,
    address: 'Km4 Airport Road, Wadajir',
    district: 'Wadajir District',
    ownerName: 'Dr. Farxaan Cali Jimcaale',
    ownerRole: 'DAYCARE OWNER',
    ownerPhone: '+252 61 558 9201',
    ownerEmail: 'farxaan.jimcaale@abcdaycare.so',
    enrolled: 452,
    capacity: 500,
    teachersCount: 34,
    staffCount: 18,
    ratio: '1:8.7',
    programs: ['Infant', 'Toddler', 'Pre-K', 'Kinder'],
    subscriptionTier: 'Enterprise Multi',
    subscriptionDaysLeft: 184,
    monthlyFee: 450,
    status: 'Active',
    attendanceRate: 96.2,
    retentionRate: 98.4,
    monthlyRevenue: 38400,
    qualityScore: 98,
    trendText: '+14.2% ↑ High Velocity',
    trendType: 'positive',
  },
  {
    id: 'abc-hd-02',
    name: 'Hodan Center',
    code: 'ABC-HD-02',
    isHq: false,
    address: 'Taleex Street, Hodan District KM4',
    district: 'Hodan District',
    ownerName: 'Sahra Cabdi Nuur',
    ownerRole: 'DAYCARE ADMIN',
    ownerPhone: '+252 61 723 4410',
    ownerEmail: 'sahra.admin@hodancampus.abc.so',
    enrolled: 354,
    capacity: 380,
    teachersCount: 24,
    staffCount: 14,
    ratio: '1:9.3',
    programs: ['Toddler', 'Pre-K', 'Kinder'],
    subscriptionTier: 'Pro Annual',
    subscriptionDaysLeft: 312,
    monthlyFee: 280,
    status: 'Active',
    attendanceRate: 95.1,
    retentionRate: 96.5,
    monthlyRevenue: 29800,
    qualityScore: 95,
    trendText: '+18.5% Growth',
    trendType: 'positive',
  },
  {
    id: 'abc-wb-03',
    name: 'Abdallah Center',
    code: 'ABC-WB-03',
    isHq: false,
    address: 'Waberi Commercial Zone, Main Blvd',
    district: 'Waberi District',
    ownerName: 'Eng. Mahad Warsame Cigaal',
    ownerRole: 'DAYCARE OWNER',
    ownerPhone: '+252 61 889 0041',
    ownerEmail: 'mahad.cigaal@abdallahdaycare.com',
    enrolled: 298,
    capacity: 300,
    teachersCount: 20,
    staffCount: 10,
    ratio: '1:9.9',
    programs: ['Infant', 'Toddler', 'Pre-K'],
    subscriptionTier: 'Growth Tier',
    subscriptionDaysLeft: 5,
    monthlyFee: 240,
    status: 'Expiring',
    attendanceRate: 97.8,
    retentionRate: 99.1,
    monthlyRevenue: 24600,
    qualityScore: 99,
    trendText: 'Near Max Capacity',
    trendType: 'warning',
  },
  {
    id: 'abc-bd-04',
    name: 'Boondheere Center',
    code: 'ABC-BD-04',
    isHq: false,
    address: 'Daljirka Dahson Area, North Boondheere',
    district: 'Boondheere District',
    ownerName: 'Maryan Xasan Maxamuud',
    ownerRole: 'DAYCARE OWNER',
    ownerPhone: '+252 61 901 2288',
    ownerEmail: 'maryan.xasan@boondheere.abc.so',
    enrolled: 276,
    capacity: 320,
    teachersCount: 18,
    staffCount: 12,
    ratio: '1:9.2',
    programs: ['Infant', 'Toddler', 'Kinder'],
    subscriptionTier: 'Enterprise Multi',
    subscriptionDaysLeft: 94,
    monthlyFee: 350,
    status: 'Active',
    attendanceRate: 94.6,
    retentionRate: 95.0,
    monthlyRevenue: 21200,
    qualityScore: 92,
    trendText: '+9.8% YoY',
    trendType: 'positive',
  },
  {
    id: 'abc-km-05',
    name: 'Karaama Center',
    code: 'ABC-KM-05',
    isHq: false,
    address: 'Yaaqshiid Sector, Karaan Coastline',
    district: 'Yaaqshiid District',
    ownerName: 'Cabdullaahi Cumar Nuur',
    ownerRole: 'DAYCARE ADMIN',
    ownerPhone: '+252 61 544 1120',
    ownerEmail: 'cumar.karaama@gmail.com',
    enrolled: 230,
    capacity: 250,
    teachersCount: 16,
    staffCount: 8,
    ratio: '1:9.5',
    programs: ['Toddler', 'Pre-K'],
    subscriptionTier: 'Trial Tier (Expired)',
    subscriptionDaysLeft: 2,
    monthlyFee: 150,
    status: 'Grace Period',
    attendanceRate: 93.9,
    retentionRate: 96.2,
    monthlyRevenue: 22800,
    qualityScore: 94,
    trendText: 'Steady Yield',
    trendType: 'neutral',
  },
  {
    id: 'abc-tl-06',
    name: 'Taleex Campus',
    code: 'ABC-TL-06',
    isHq: false,
    address: 'Airport Junction Road, Taleex Expansion Zone',
    district: 'Hodan District',
    ownerName: 'Khadija Guuleed Warsame',
    ownerRole: 'DAYCARE OWNER',
    ownerPhone: '+252 61 223 9912',
    ownerEmail: 'khadija.taleex@abcdaycare.so',
    enrolled: 115,
    capacity: 150,
    teachersCount: 10,
    staffCount: 6,
    ratio: '1:7.1',
    programs: ['Infant', 'Toddler'],
    subscriptionTier: 'Growth Tier',
    subscriptionDaysLeft: 142,
    monthlyFee: 220,
    status: 'Active',
    attendanceRate: 92.4,
    retentionRate: 94.2,
    monthlyRevenue: 19650,
    qualityScore: 96,
    trendText: 'Expand Capacity',
    trendType: 'positive',
  },
  {
    id: 'abc-wd-07',
    name: 'Wadajir Campus',
    code: 'ABC-WD-07',
    isHq: false,
    address: 'Bulo Hubey Sector, Wadajir',
    district: 'Wadajir District',
    ownerName: 'Xasan Nuur Shire',
    ownerRole: 'DAYCARE ADMIN',
    ownerPhone: '+252 61 778 0144',
    ownerEmail: 'xasan.wadajir@abcdaycare.so',
    enrolled: 75,
    capacity: 100,
    teachersCount: 4,
    staffCount: 4,
    ratio: '1:9.3',
    programs: ['Toddler', 'Kinder'],
    subscriptionTier: 'Enterprise Multi',
    subscriptionDaysLeft: 204,
    monthlyFee: 200,
    status: 'Active',
    attendanceRate: 91.5,
    retentionRate: 93.8,
    monthlyRevenue: 16800,
    qualityScore: 93,
    trendText: '+11.0% MoM',
    trendType: 'positive',
  },
  {
    id: 'abc-kr-08',
    name: 'Kaaraan Center',
    code: 'ABC-KR-08',
    isHq: false,
    address: 'Kaaraan North Coastal Zone',
    district: 'Karaan District',
    ownerName: 'Fowsiya Jaamac Cawaale',
    ownerRole: 'DAYCARE OWNER',
    ownerPhone: '+252 61 991 3321',
    ownerEmail: 'fowsiya.kaaraan@abcdaycare.so',
    enrolled: 50,
    capacity: 100,
    teachersCount: 6,
    staffCount: 4,
    ratio: '1:5.0',
    programs: ['Pre-K', 'Kinder'],
    subscriptionTier: 'Enterprise Multi',
    subscriptionDaysLeft: 220,
    monthlyFee: 180,
    status: 'Active',
    attendanceRate: 94.0,
    retentionRate: 95.5,
    monthlyRevenue: 14200,
    qualityScore: 97,
    trendText: 'New Launch',
    trendType: 'positive',
  },
];

class CenterModel {
  static async findAll() {
    try {
      const sql = `
        SELECT 
          c.id,
          c.name,
          c.code,
          c.is_hq AS "isHq",
          c.address,
          c.district,
          u.name AS "ownerName",
          u.role AS "ownerRole",
          u.phone AS "ownerPhone",
          u.email AS "ownerEmail",
          c.enrolled,
          c.capacity,
          c.teachers_count AS "teachersCount",
          c.staff_count AS "staffCount",
          CONCAT('1:', ROUND((c.enrolled::numeric / GREATEST(c.teachers_count, 1)), 1)) AS "ratio",
          COALESCE(
            (
              SELECT json_agg(p.name) 
              FROM center_programs cp 
              JOIN programs p ON cp.program_id = p.id 
              WHERE cp.center_id = c.id
            ),
            '["Infant", "Toddler", "Pre-K", "Kinder"]'::json
          ) AS "programs",
          COALESCE(pl.name, 'Growth Tier') AS "subscriptionTier",
          COALESCE(s.days_left, 30) AS "subscriptionDaysLeft",
          COALESCE(s.monthly_fee, c.monthly_revenue, 250) AS "monthlyFee",
          c.status,
          c.attendance_rate AS "attendanceRate",
          c.retention_rate AS "retentionRate",
          c.monthly_revenue AS "monthlyRevenue",
          c.quality_score AS "qualityScore",
          c.trend_text AS "trendText",
          c.trend_type AS "trendType"
        FROM centers c
        LEFT JOIN users u ON c.owner_id = u.id
        LEFT JOIN subscriptions s ON s.center_id = c.id
        LEFT JOIN plans pl ON s.plan_id = pl.id
        ORDER BY c.created_at DESC;
      `;
      const res = await query(sql);
      return res.rows;
    } catch (err) {
      console.warn('⚡ PostgreSQL offline, returning mock centers:', err.message);
      return mockCenters;
    }
  }

  static async findById(id) {
    try {
      const sql = `
        SELECT 
          c.*,
          u.name AS "ownerName",
          u.email AS "ownerEmail"
        FROM centers c
        LEFT JOIN users u ON c.owner_id = u.id
        WHERE c.id = $1
      `;
      const res = await query(sql, [id]);
      return res.rows[0] || null;
    } catch (err) {
      return mockCenters.find((c) => c.id === id) || null;
    }
  }

  static async create(data) {
    try {
      const {
        id = `abc-${data.code ? data.code.toLowerCase() : Date.now()}`,
        code,
        name,
        isHq = false,
        address,
        district,
        ownerId = null,
        enrolled = 0,
        capacity = 100,
        teachersCount = 5,
        staffCount = 3,
        monthlyFee = 200,
        status = 'Active',
        trendText = 'New Launch',
        trendType = 'positive',
      } = data;

      const res = await query(
        `INSERT INTO centers 
         (id, code, name, is_hq, address, district, owner_id, enrolled, capacity, teachers_count, staff_count, monthly_revenue, status, trend_text, trend_type)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
         RETURNING *`,
        [id, code, name, isHq, address, district, ownerId, enrolled, capacity, teachersCount, staffCount, monthlyFee, status, trendText, trendType]
      );

      return res.rows[0];
    } catch (err) {
      const newCenter = {
        id: `abc-${Date.now()}`,
        code: data.code || 'ABC-NEW',
        name: data.name,
        isHq: false,
        address: data.address || '',
        district: data.district || '',
        enrolled: data.enrolled || 0,
        capacity: data.capacity || 100,
        teachersCount: 5,
        staffCount: 3,
        ratio: '1:8.0',
        programs: ['Toddler', 'Pre-K'],
        subscriptionTier: 'Growth Tier',
        subscriptionDaysLeft: 30,
        monthlyFee: 250,
        status: 'Active',
        attendanceRate: 95.0,
        retentionRate: 96.0,
        monthlyRevenue: 15000,
        qualityScore: 95,
        trendText: 'Newly Added',
        trendType: 'positive',
      };
      mockCenters.unshift(newCenter);
      return newCenter;
    }
  }

  static async update(id, data) {
    try {
      const fields = [];
      const values = [];
      let idx = 1;

      const mapping = {
        name: 'name',
        code: 'code',
        address: 'address',
        district: 'district',
        enrolled: 'enrolled',
        capacity: 'capacity',
        teachersCount: 'teachers_count',
        staffCount: 'staff_count',
        monthlyRevenue: 'monthly_revenue',
        status: 'status',
        qualityScore: 'quality_score',
        attendanceRate: 'attendance_rate',
        retentionRate: 'retention_rate',
        trendText: 'trend_text',
        trendType: 'trend_type',
      };

      for (const [key, dbCol] of Object.entries(mapping)) {
        if (data[key] !== undefined) {
          fields.push(`${dbCol} = $${idx}`);
          values.push(data[key]);
          idx++;
        }
      }

      if (fields.length === 0) return await this.findById(id);

      fields.push(`updated_at = CURRENT_TIMESTAMP`);
      values.push(id);

      const sql = `UPDATE centers SET ${fields.join(', ')} WHERE id = $${idx} RETURNING *`;
      const res = await query(sql, values);
      return res.rows[0];
    } catch (err) {
      const item = mockCenters.find((c) => c.id === id);
      if (item) {
        Object.assign(item, data);
        return item;
      }
      return null;
    }
  }

  static async updateStatus(id, status) {
    try {
      const res = await query(
        `UPDATE centers SET status = $1, updated_at = CURRENT_TIMESTAMP WHERE id = $2 RETURNING *`,
        [status, id]
      );
      return res.rows[0];
    } catch (err) {
      const item = mockCenters.find((c) => c.id === id);
      if (item) {
        item.status = status;
        return item;
      }
      return null;
    }
  }

  static async delete(id) {
    try {
      const res = await query(`DELETE FROM centers WHERE id = $1 RETURNING id`, [id]);
      return res.rowCount > 0;
    } catch (err) {
      const idx = mockCenters.findIndex((c) => c.id === id);
      if (idx !== -1) {
        mockCenters.splice(idx, 1);
        return true;
      }
      return false;
    }
  }
}

module.exports = CenterModel;
