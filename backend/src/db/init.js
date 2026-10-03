const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');
const { pool, query } = require('../config/db');

async function initDB() {
  console.log('[DB Init] Starting database schema setup & seeding...');
  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    // 1. Run Schema SQL
    const schemaSql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf-8');
    await client.query(schemaSql);
    console.log('[DB Init] Schema tables created/verified successfully.');

    // 2. Hash default password
    const defaultPasswordHash = await bcrypt.hash('password123', 10);
    const adminPasswordHash = await bcrypt.hash('admin123', 10);

    // 3. Seed Users
    const users = [
      {
        id: 'usr-admin',
        name: 'Super Admin',
        email: 'admin@abcdaycare.so',
        password_hash: adminPasswordHash,
        role: 'SUPER_ADMIN',
        phone: '+252 61 000 0000',
        initials: 'SA',
        verified: true,
        status: 'Active',
      },
      {
        id: 'usr-1',
        name: 'Dr. Farxaan Cali Jimcaale',
        email: 'farxaan.jimcaale@abcdaycare.so',
        password_hash: defaultPasswordHash,
        role: 'DAYCARE_OWNER',
        phone: '+252 61 558 9201',
        initials: 'FJ',
        verified: true,
        status: 'Active',
      },
      {
        id: 'usr-2',
        name: 'Sahra Cabdi Nuur',
        email: 'sahra.admin@hodancampus.abc.so',
        password_hash: defaultPasswordHash,
        role: 'DAYCARE_ADMIN',
        phone: '+252 61 723 4410',
        initials: 'SN',
        verified: true,
        status: 'Active',
      },
      {
        id: 'usr-3',
        name: 'Eng. Mahad Warsame Cigaal',
        email: 'mahad.cigaal@abdallahdaycare.com',
        password_hash: defaultPasswordHash,
        role: 'DAYCARE_OWNER',
        phone: '+252 61 889 0041',
        initials: 'MC',
        verified: true,
        status: 'Active',
      },
      {
        id: 'usr-4',
        name: 'Fartuun Axmed Maxamed',
        email: 'fartuun.teacher@abcdaycare.so',
        password_hash: defaultPasswordHash,
        role: 'TEACHER',
        phone: '+252 61 332 9901',
        initials: 'FA',
        verified: true,
        status: 'Active',
      },
      {
        id: 'usr-5',
        name: 'Maryan Xasan Maxamuud',
        email: 'maryan.xasan@boondheere.abc.so',
        password_hash: defaultPasswordHash,
        role: 'DAYCARE_OWNER',
        phone: '+252 61 901 2288',
        initials: 'MX',
        verified: true,
        status: 'Active',
      },
      {
        id: 'usr-6',
        name: 'Cabdullaahi Cumar Nuur',
        email: 'cumar.karaama@gmail.com',
        password_hash: defaultPasswordHash,
        role: 'DAYCARE_ADMIN',
        phone: '+252 61 544 1120',
        initials: 'CN',
        verified: true,
        status: 'Restricted',
      },
      {
        id: 'usr-7',
        name: 'Amina Yusuf Xuseen',
        email: 'amina.yusuf@hodancampus.abc.so',
        password_hash: defaultPasswordHash,
        role: 'TEACHER',
        phone: '+252 61 772 3012',
        initials: 'AY',
        verified: true,
        status: 'Active',
      },
    ];

    for (const u of users) {
      await client.query(
        `INSERT INTO users (id, name, email, password_hash, role, phone, initials, verified, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
         ON CONFLICT (email) DO UPDATE SET
         name = EXCLUDED.name,
         role = EXCLUDED.role,
         phone = EXCLUDED.phone,
         initials = EXCLUDED.initials,
         status = EXCLUDED.status`,
        [u.id, u.name, u.email, u.password_hash, u.role, u.phone, u.initials, u.verified, u.status]
      );
    }
    console.log('[DB Init] Users seeded.');

    // 4. Seed Plans
    const plans = [
      { id: 'plan-ent-multi', name: 'Enterprise Multi-Center', details: 'Unlimited Staff • 500 Kids', monthly_fee: 450, max_kids: 500, max_staff: 60 },
      { id: 'plan-pro-annual', name: 'Pro Annual', details: 'Up to 380 Kids • 25 Staff', monthly_fee: 280, max_kids: 380, max_staff: 40 },
      { id: 'plan-growth', name: 'Growth Tier (Quarterly)', details: 'Max 300 Kids • 30 Staff', monthly_fee: 240, max_kids: 300, max_staff: 30 },
      { id: 'plan-trial', name: 'Trial Tier (14-Day Free)', details: '100 Kids • 10 Staff max', monthly_fee: 0, max_kids: 100, max_staff: 10 },
      { id: 'plan-tenant', name: 'Tenant Seat License', details: 'Included in center plan', monthly_fee: 0, max_kids: 0, max_staff: 1 },
    ];

    for (const p of plans) {
      await client.query(
        `INSERT INTO plans (id, name, details, monthly_fee, max_kids, max_staff)
         VALUES ($1, $2, $3, $4, $5, $6)
         ON CONFLICT (id) DO UPDATE SET
         name = EXCLUDED.name,
         details = EXCLUDED.details,
         monthly_fee = EXCLUDED.monthly_fee,
         max_kids = EXCLUDED.max_kids,
         max_staff = EXCLUDED.max_staff`,
        [p.id, p.name, p.details, p.monthly_fee, p.max_kids, p.max_staff]
      );
    }
    console.log('[DB Init] Plans seeded.');

    // 5. Seed Centers
    const centers = [
      {
        id: 'abc-hq-01',
        code: 'ABC-HQ-01',
        name: 'ABC Main Campus (HQ)',
        is_hq: true,
        address: 'Km4 Airport Road, Wadajir',
        district: 'Wadajir District',
        owner_id: 'usr-1',
        enrolled: 452,
        capacity: 500,
        teachers_count: 34,
        staff_count: 18,
        attendance_rate: 96.2,
        retention_rate: 98.4,
        quality_score: 98,
        monthly_revenue: 38400,
        trend_text: '+14.2% ↑ High Velocity',
        trend_type: 'positive',
        status: 'Active',
      },
      {
        id: 'abc-hd-02',
        code: 'ABC-HD-02',
        name: 'Hodan Center',
        is_hq: false,
        address: 'Taleex Street, Hodan District KM4',
        district: 'Hodan District',
        owner_id: 'usr-2',
        enrolled: 354,
        capacity: 380,
        teachers_count: 24,
        staff_count: 14,
        attendance_rate: 95.1,
        retention_rate: 96.5,
        quality_score: 95,
        monthly_revenue: 29800,
        trend_text: '+18.5% Growth',
        trend_type: 'positive',
        status: 'Active',
      },
      {
        id: 'abc-wb-03',
        code: 'ABC-WB-03',
        name: 'Abdallah Center',
        is_hq: false,
        address: 'Waberi Commercial Zone, Main Blvd',
        district: 'Waberi District',
        owner_id: 'usr-3',
        enrolled: 298,
        capacity: 300,
        teachers_count: 20,
        staff_count: 10,
        attendance_rate: 97.8,
        retention_rate: 99.1,
        quality_score: 99,
        monthly_revenue: 24600,
        trend_text: 'Near Max Capacity',
        trend_type: 'warning',
        status: 'Expiring',
      },
      {
        id: 'abc-bd-04',
        code: 'ABC-BD-04',
        name: 'Boondheere Center',
        is_hq: false,
        address: 'Daljirka Dahson Area, North Boondheere',
        district: 'Boondheere District',
        owner_id: 'usr-5',
        enrolled: 276,
        capacity: 320,
        teachers_count: 18,
        staff_count: 12,
        attendance_rate: 94.6,
        retention_rate: 95.0,
        quality_score: 92,
        monthly_revenue: 21200,
        trend_text: '+9.8% YoY',
        trend_type: 'positive',
        status: 'Active',
      },
      {
        id: 'abc-km-05',
        code: 'ABC-KM-05',
        name: 'Karaama Center',
        is_hq: false,
        address: 'Yaaqshiid Sector, Karaan Coastline',
        district: 'Yaaqshiid District',
        owner_id: 'usr-6',
        enrolled: 230,
        capacity: 250,
        teachers_count: 16,
        staff_count: 8,
        attendance_rate: 93.9,
        retention_rate: 96.2,
        quality_score: 94,
        monthly_revenue: 22800,
        trend_text: 'Steady Yield',
        trend_type: 'neutral',
        status: 'Grace Period',
      },
      {
        id: 'abc-tl-06',
        code: 'ABC-TL-06',
        name: 'Taleex Campus',
        is_hq: false,
        address: 'Airport Junction Road, Taleex Expansion Zone',
        district: 'Hodan District',
        owner_id: 'usr-1',
        enrolled: 115,
        capacity: 150,
        teachers_count: 10,
        staff_count: 6,
        attendance_rate: 92.4,
        retention_rate: 94.2,
        quality_score: 96,
        monthly_revenue: 19650,
        trend_text: 'Expand Capacity',
        trend_type: 'positive',
        status: 'Active',
      },
      {
        id: 'abc-wd-07',
        code: 'ABC-WD-07',
        name: 'Wadajir Campus',
        is_hq: false,
        address: 'Bulo Hubey Sector, Wadajir',
        district: 'Wadajir District',
        owner_id: 'usr-2',
        enrolled: 75,
        capacity: 100,
        teachers_count: 4,
        staff_count: 4,
        attendance_rate: 91.5,
        retention_rate: 93.8,
        quality_score: 93,
        monthly_revenue: 16800,
        trend_text: '+11.0% MoM',
        trend_type: 'positive',
        status: 'Active',
      },
      {
        id: 'abc-kr-08',
        code: 'ABC-KR-08',
        name: 'Kaaraan Center',
        is_hq: false,
        address: 'Kaaraan North Coastal Zone',
        district: 'Karaan District',
        owner_id: 'usr-5',
        enrolled: 50,
        capacity: 100,
        teachers_count: 6,
        staff_count: 4,
        attendance_rate: 94.0,
        retention_rate: 95.5,
        quality_score: 97,
        monthly_revenue: 14200,
        trend_text: 'New Launch',
        trend_type: 'positive',
        status: 'Active',
      },
    ];

    for (const c of centers) {
      await client.query(
        `INSERT INTO centers (id, code, name, is_hq, address, district, owner_id, enrolled, capacity, teachers_count, staff_count, attendance_rate, retention_rate, quality_score, monthly_revenue, trend_text, trend_type, status)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18)
         ON CONFLICT (id) DO UPDATE SET
         code = EXCLUDED.code,
         name = EXCLUDED.name,
         is_hq = EXCLUDED.is_hq,
         address = EXCLUDED.address,
         district = EXCLUDED.district,
         owner_id = EXCLUDED.owner_id,
         enrolled = EXCLUDED.enrolled,
         capacity = EXCLUDED.capacity,
         teachers_count = EXCLUDED.teachers_count,
         staff_count = EXCLUDED.staff_count,
         attendance_rate = EXCLUDED.attendance_rate,
         retention_rate = EXCLUDED.retention_rate,
         quality_score = EXCLUDED.quality_score,
         monthly_revenue = EXCLUDED.monthly_revenue,
         trend_text = EXCLUDED.trend_text,
         trend_type = EXCLUDED.trend_type,
         status = EXCLUDED.status`,
        [
          c.id,
          c.code,
          c.name,
          c.is_hq,
          c.address,
          c.district,
          c.owner_id,
          c.enrolled,
          c.capacity,
          c.teachers_count,
          c.staff_count,
          c.attendance_rate,
          c.retention_rate,
          c.quality_score,
          c.monthly_revenue,
          c.trend_text,
          c.trend_type,
          c.status,
        ]
      );
    }
    console.log('[DB Init] Centers seeded.');

    // 6. Seed Subscriptions
    const subscriptions = [
      { id: 'sub-1', center_id: 'abc-hq-01', plan_id: 'plan-ent-multi', user_id: 'usr-1', status: 'Active', days_left: 184, next_billing_date: '2026-10-18', billing_method: 'EVC / Dahabshiil', auto_renew: true, monthly_fee: 450 },
      { id: 'sub-2', center_id: 'abc-hd-02', plan_id: 'plan-pro-annual', user_id: 'usr-2', status: 'Active', days_left: 312, next_billing_date: '2027-02-24', billing_method: 'Zaad Service', auto_renew: true, monthly_fee: 280 },
      { id: 'sub-3', center_id: 'abc-wb-03', plan_id: 'plan-growth', user_id: 'usr-3', status: 'Expiring Soon', days_left: 5, next_billing_date: '2026-08-31', billing_method: 'EVC / Dahabshiil', auto_renew: false, monthly_fee: 240 },
      { id: 'sub-4', center_id: 'abc-bd-04', plan_id: 'plan-ent-multi', user_id: 'usr-5', status: 'Active', days_left: 94, next_billing_date: '2026-11-28', billing_method: 'Premier Bank', auto_renew: true, monthly_fee: 350 },
      { id: 'sub-5', center_id: 'abc-km-05', plan_id: 'plan-trial', user_id: 'usr-6', status: 'Grace Period', days_left: 2, next_billing_date: '2026-08-24', billing_method: 'EVC / Card Declined', auto_renew: false, monthly_fee: 150 },
    ];

    for (const s of subscriptions) {
      await client.query(
        `INSERT INTO subscriptions (id, center_id, plan_id, user_id, status, days_left, next_billing_date, billing_method, auto_renew, monthly_fee)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (id) DO UPDATE SET
         status = EXCLUDED.status,
         days_left = EXCLUDED.days_left,
         next_billing_date = EXCLUDED.next_billing_date,
         billing_method = EXCLUDED.billing_method,
         auto_renew = EXCLUDED.auto_renew,
         monthly_fee = EXCLUDED.monthly_fee`,
        [s.id, s.center_id, s.plan_id, s.user_id, s.status, s.days_left, s.next_billing_date, s.billing_method, s.auto_renew, s.monthly_fee]
      );
    }
    console.log('[DB Init] Subscriptions seeded.');

    // 7. Seed Programs
    const programs = [
      { id: 'prg-1', code: 'PRG-INF-01', name: 'Infant Discovery & Nurture', emoji: '🍼', age_bracket: '6 mos – 2 yrs', enrolled: 331, capacity: 360, ratio: '1:4', ratio_type: 'Specialized Nursery', tuition: 220, tuition_type: '/ mo', curriculum_status: 'Active • Wk 18', status_type: 'active', category: 'Early Years', description: 'Gentle sensory stimuli, affectionate care, tummy time milestones, and individualized infant sleep schedules in sterile hygienic suites.' },
      { id: 'prg-2', code: 'PRG-TOD-02', name: 'Toddler Explorer Foundation', emoji: '🧸', age_bracket: '2 – 3 yrs', enrolled: 405, capacity: 430, ratio: '1:6', ratio_type: 'Sensory & Play', tuition: 180, tuition_type: '/ mo', curriculum_status: 'Active • Wk 18', status_type: 'active', category: 'Early Years', description: 'Active motor development, vocabulary stimulation, circle time music, and hands-on tactile play promoting toddler independence.' },
      { id: 'prg-3', code: 'PRG-PRE-03', name: 'Early Learning Pre-K Readiness', emoji: '🎨', age_bracket: '3 – 4 yrs', enrolled: 478, capacity: 520, ratio: '1:8', ratio_type: 'Somali + English', tuition: 195, tuition_type: '/ mo', curriculum_status: 'Bilingual Core', status_type: 'bilingual', category: 'Preschool & Pre-K', description: 'Bilingual immersion curriculum introducing basic phonics, numbers, group teamwork, creative coloring, and storytelling.' },
      { id: 'prg-4', code: 'PRG-KDG-04', name: 'Kindergarten Academic Prep', emoji: '🎒', age_bracket: '5 – 6 yrs', enrolled: 628, capacity: 650, ratio: '1:10', ratio_type: 'Primary Prep', tuition: 240, tuition_type: '/ mo', curriculum_status: 'Ministry Accredited', status_type: 'accredited', category: 'Kindergarten', description: 'Rigorous preparation for primary grade transition with early mathematics, reading comprehension, science curiosity, and moral values.' },
      { id: 'prg-5', code: 'PRG-STM-05', name: 'Early STEM & Junior Robotics', emoji: '🔬', age_bracket: '4 – 6 yrs', enrolled: 180, capacity: 200, ratio: '1:7', ratio_type: 'Lab Instructors', tuition: 110, tuition_type: '/ add-on', curriculum_status: 'STEM Approved', status_type: 'stem', category: 'Enrichment & After-School', description: 'Interactive STEM lab introducing foundational scientific inquiry, building blocks, simple machines, and sensory coding toys.' },
      { id: 'prg-6', code: 'PRG-ISL-06', name: 'Islamic Values & Quran Memorization', emoji: '📖', age_bracket: '3 – 6 yrs', enrolled: 540, capacity: 600, ratio: '1:9', ratio_type: 'Certified Ustadhs', tuition: 60, tuition_type: '/ add-on', curriculum_status: 'Universal Core', status_type: 'universal', category: 'Enrichment & After-School', description: 'Daily gentle Tajweed, short Surah memorization, morning prayers, and practical manners taught in an affectionate, uplifting atmosphere.' },
    ];

    for (const prg of programs) {
      await client.query(
        `INSERT INTO programs (id, code, name, emoji, age_bracket, enrolled, capacity, ratio, ratio_type, tuition, tuition_type, curriculum_status, status_type, category, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
         ON CONFLICT (id) DO UPDATE SET
         code = EXCLUDED.code,
         name = EXCLUDED.name,
         emoji = EXCLUDED.emoji,
         age_bracket = EXCLUDED.age_bracket,
         enrolled = EXCLUDED.enrolled,
         capacity = EXCLUDED.capacity,
         ratio = EXCLUDED.ratio,
         ratio_type = EXCLUDED.ratio_type,
         tuition = EXCLUDED.tuition,
         tuition_type = EXCLUDED.tuition_type,
         curriculum_status = EXCLUDED.curriculum_status,
         status_type = EXCLUDED.status_type,
         category = EXCLUDED.category,
         description = EXCLUDED.description`,
        [
          prg.id,
          prg.code,
          prg.name,
          prg.emoji,
          prg.age_bracket,
          prg.enrolled,
          prg.capacity,
          prg.ratio,
          prg.ratio_type,
          prg.tuition,
          prg.tuition_type,
          prg.curriculum_status,
          prg.status_type,
          prg.category,
          prg.description,
        ]
      );
    }
    console.log('[DB Init] Programs seeded.');

    // 8. Seed Audit Logs
    const auditLogs = [
      { id: 'log-1', user_id: 'usr-admin', user_name: 'Super Admin', action: 'SYSTEM_BOOTUP', category: 'System', ip_address: '127.0.0.1', details: JSON.stringify({ note: 'Super Admin Portal Backend Initialized' }) },
      { id: 'log-2', user_id: 'usr-1', user_name: 'Dr. Farxaan Cali Jimcaale', action: 'CENTER_UPDATED', category: 'Center', ip_address: '197.220.84.12', details: JSON.stringify({ center: 'ABC Main Campus (HQ)' }) },
      { id: 'log-3', user_id: 'usr-2', user_name: 'Sahra Cabdi Nuur', action: 'BILLING_PAYMENT_SUCCESS', category: 'Billing', ip_address: '197.220.84.45', details: JSON.stringify({ amount: 280, method: 'Zaad Service' }) },
    ];

    for (const log of auditLogs) {
      await client.query(
        `INSERT INTO audit_logs (id, user_id, user_name, action, category, ip_address, details)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (id) DO NOTHING`,
        [log.id, log.user_id, log.user_name, log.action, log.category, log.ip_address, log.details]
      );
    }
    console.log('[DB Init] Audit Logs seeded.');

    // 9. Seed System Backups
    const backups = [
      { id: 'bk-1', filename: 'abc_db_backup_20261001_0300.sql.gz', size_mb: 42.8, type: 'Automated', status: 'Completed' },
      { id: 'bk-2', filename: 'abc_db_backup_20261002_0300.sql.gz', size_mb: 43.1, type: 'Automated', status: 'Completed' },
      { id: 'bk-3', filename: 'abc_db_backup_20261003_0300.sql.gz', size_mb: 43.5, type: 'Automated', status: 'Completed' },
    ];

    for (const bk of backups) {
      await client.query(
        `INSERT INTO system_backups (id, filename, size_mb, type, status)
         VALUES ($1, $2, $3, $4, $5)
         ON CONFLICT (id) DO NOTHING`,
        [bk.id, bk.filename, bk.size_mb, bk.type, bk.status]
      );
    }
    console.log('[DB Init] Backups seeded.');

    await client.query('COMMIT');
    console.log('[DB Init] ✅ Database initialization and seeding completed successfully!');
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('[DB Init Error]', err);
    process.exit(1);
  } finally {
    client.release();
    pool.end();
  }
}

if (require.main === module) {
  initDB();
}

module.exports = initDB;
