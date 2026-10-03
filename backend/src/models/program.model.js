const { query } = require('../config/db');

let mockPrograms = [
  {
    id: 'prg-1',
    code: 'PRG-INF-01',
    name: 'Infant Discovery & Nurture',
    emoji: '🍼',
    ageBracket: '6 mos – 2 yrs',
    enrolled: 331,
    capacity: 360,
    ratio: '1:4',
    ratioType: 'Specialized Nursery',
    campusesCount: 6,
    totalCampuses: 8,
    tuition: 220,
    tuitionType: '/ mo',
    curriculumStatus: 'Active • Wk 18',
    statusType: 'active',
    description: 'Gentle sensory stimuli, affectionate care, tummy time milestones, and individualized infant sleep schedules in sterile hygienic suites.',
    category: 'Early Years',
  },
  {
    id: 'prg-2',
    code: 'PRG-TOD-02',
    name: 'Toddler Explorer Foundation',
    emoji: '🧸',
    ageBracket: '2 – 3 yrs',
    enrolled: 405,
    capacity: 430,
    ratio: '1:6',
    ratioType: 'Sensory & Play',
    campusesCount: 8,
    totalCampuses: 8,
    tuition: 180,
    tuitionType: '/ mo',
    curriculumStatus: 'Active • Wk 18',
    statusType: 'active',
    description: 'Active motor development, vocabulary stimulation, circle time music, and hands-on tactile play promoting toddler independence.',
    category: 'Early Years',
  },
  {
    id: 'prg-3',
    code: 'PRG-PRE-03',
    name: 'Early Learning Pre-K Readiness',
    emoji: '🎨',
    ageBracket: '3 – 4 yrs',
    enrolled: 478,
    capacity: 520,
    ratio: '1:8',
    ratioType: 'Somali + English',
    campusesCount: 8,
    totalCampuses: 8,
    tuition: 195,
    tuitionType: '/ mo',
    curriculumStatus: 'Bilingual Core',
    statusType: 'bilingual',
    description: 'Bilingual immersion curriculum introducing basic phonics, numbers, group teamwork, creative coloring, and storytelling.',
    category: 'Preschool & Pre-K',
  },
  {
    id: 'prg-4',
    code: 'PRG-KDG-04',
    name: 'Kindergarten Academic Prep',
    emoji: '🎒',
    ageBracket: '5 – 6 yrs',
    enrolled: 628,
    capacity: 650,
    ratio: '1:10',
    ratioType: 'Primary Prep',
    campusesCount: 7,
    totalCampuses: 8,
    tuition: 240,
    tuitionType: '/ mo',
    curriculumStatus: 'Ministry Accredited',
    statusType: 'accredited',
    description: 'Rigorous preparation for primary grade transition with early mathematics, reading comprehension, science curiosity, and moral values.',
    category: 'Kindergarten',
  },
  {
    id: 'prg-5',
    code: 'PRG-STM-05',
    name: 'Early STEM & Junior Robotics',
    emoji: '🔬',
    ageBracket: '4 – 6 yrs',
    enrolled: 180,
    capacity: 200,
    ratio: '1:7',
    ratioType: 'Lab Instructors',
    campusesCount: 4,
    totalCampuses: 8,
    tuition: 110,
    tuitionType: '/ add-on',
    curriculumStatus: 'STEM Approved',
    statusType: 'stem',
    description: 'Interactive STEM lab introducing foundational scientific inquiry, building blocks, simple machines, and sensory coding toys.',
    category: 'Enrichment & After-School',
  },
  {
    id: 'prg-6',
    code: 'PRG-ISL-06',
    name: 'Islamic Values & Quran Memorization',
    emoji: '📖',
    ageBracket: '3 – 6 yrs',
    enrolled: 540,
    capacity: 600,
    ratio: '1:9',
    ratioType: 'Certified Ustadhs',
    campusesCount: 8,
    totalCampuses: 8,
    tuition: 60,
    tuitionType: '/ add-on',
    curriculumStatus: 'Universal Core',
    statusType: 'universal',
    description: 'Daily gentle Tajweed, short Surah memorization, morning prayers, and practical manners taught in an affectionate, uplifting atmosphere.',
    category: 'Enrichment & After-School',
  },
];

class ProgramModel {
  static async findAll() {
    try {
      const sql = `
        SELECT 
          p.id,
          p.code,
          p.name,
          p.emoji,
          p.age_bracket AS "ageBracket",
          p.enrolled,
          p.capacity,
          p.ratio,
          p.ratio_type AS "ratioType",
          COALESCE(
            (SELECT COUNT(*) FROM center_programs cp WHERE cp.program_id = p.id),
            6
          )::int AS "campusesCount",
          (SELECT COUNT(*) FROM centers)::int AS "totalCampuses",
          p.tuition,
          p.tuition_type AS "tuitionType",
          p.curriculum_status AS "curriculumStatus",
          p.status_type AS "statusType",
          p.category,
          p.description
        FROM programs p
        ORDER BY p.created_at ASC;
      `;
      const res = await query(sql);
      return res.rows;
    } catch (err) {
      return mockPrograms;
    }
  }

  static async findById(id) {
    try {
      const res = await query('SELECT * FROM programs WHERE id = $1', [id]);
      return res.rows[0] || null;
    } catch (err) {
      return mockPrograms.find((p) => p.id === id) || null;
    }
  }

  static async create(data) {
    try {
      const {
        id = `prg-${Date.now()}`,
        code,
        name,
        emoji = '📚',
        ageBracket,
        enrolled = 0,
        capacity = 100,
        ratio = '1:8',
        ratioType = 'Standard',
        tuition = 150,
        tuitionType = '/ mo',
        curriculumStatus = 'Active',
        statusType = 'active',
        category = 'General',
        description = '',
      } = data;

      const res = await query(
        `INSERT INTO programs 
         (id, code, name, emoji, age_bracket, enrolled, capacity, ratio, ratio_type, tuition, tuition_type, curriculum_status, status_type, category, description)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
         RETURNING *`,
        [id, code, name, emoji, ageBracket, enrolled, capacity, ratio, ratioType, tuition, tuitionType, curriculumStatus, statusType, category, description]
      );
      return res.rows[0];
    } catch (err) {
      const newProgram = {
        id: `prg-${Date.now()}`,
        code: data.code || 'PRG-NEW',
        name: data.name,
        emoji: data.emoji || '📚',
        ageBracket: data.ageBracket || '3 - 5 yrs',
        enrolled: 0,
        capacity: 100,
        ratio: '1:8',
        ratioType: 'Standard',
        campusesCount: 1,
        totalCampuses: 8,
        tuition: data.tuition || 180,
        tuitionType: '/ mo',
        curriculumStatus: 'Active',
        statusType: 'active',
        category: data.category || 'General',
        description: data.description || '',
      };
      mockPrograms.push(newProgram);
      return newProgram;
    }
  }

  static async update(id, data) {
    try {
      const { name, code, emoji, ageBracket, enrolled, capacity, ratio, ratioType, tuition, tuitionType, curriculumStatus, statusType, category, description } = data;
      const res = await query(
        `UPDATE programs
         SET name = COALESCE($1, name),
             code = COALESCE($2, code),
             emoji = COALESCE($3, emoji),
             age_bracket = COALESCE($4, age_bracket),
             enrolled = COALESCE($5, enrolled),
             capacity = COALESCE($6, capacity),
             ratio = COALESCE($7, ratio),
             ratio_type = COALESCE($8, ratio_type),
             tuition = COALESCE($9, tuition),
             tuition_type = COALESCE($10, tuition_type),
             curriculum_status = COALESCE($11, curriculum_status),
             status_type = COALESCE($12, status_type),
             category = COALESCE($13, category),
             description = COALESCE($14, description)
         WHERE id = $15
         RETURNING *`,
        [name, code, emoji, ageBracket, enrolled, capacity, ratio, ratioType, tuition, tuitionType, curriculumStatus, statusType, category, description, id]
      );
      return res.rows[0];
    } catch (err) {
      const item = mockPrograms.find((p) => p.id === id);
      if (item) {
        Object.assign(item, data);
        return item;
      }
      return null;
    }
  }

  static async delete(id) {
    try {
      const res = await query('DELETE FROM programs WHERE id = $1 RETURNING id', [id]);
      return res.rowCount > 0;
    } catch (err) {
      const idx = mockPrograms.findIndex((p) => p.id === id);
      if (idx !== -1) {
        mockPrograms.splice(idx, 1);
        return true;
      }
      return false;
    }
  }
}

module.exports = ProgramModel;
