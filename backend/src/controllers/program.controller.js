const ProgramModel = require('../models/program.model');

const getAllPrograms = async (req, res) => {
  try {
    const programs = await ProgramModel.findAll();
    res.json({ success: true, count: programs.length, data: programs });
  } catch (err) {
    console.error('[Program getAll Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch educational programs' });
  }
};

const getProgramById = async (req, res) => {
  try {
    const program = await ProgramModel.findById(req.params.id);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, data: program });
  } catch (err) {
    console.error('[Program getById Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch program' });
  }
};

const createProgram = async (req, res) => {
  try {
    const { name, code } = req.body;
    if (!name || !code) {
      return res.status(400).json({ success: false, message: 'Program name and code are required' });
    }
    const program = await ProgramModel.create(req.body);
    res.status(201).json({ success: true, message: 'Program created successfully', data: program });
  } catch (err) {
    console.error('[Program create Error]', err);
    res.status(500).json({ success: false, message: 'Failed to create program' });
  }
};

const updateProgram = async (req, res) => {
  try {
    const program = await ProgramModel.update(req.params.id, req.body);
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, message: 'Program updated successfully', data: program });
  } catch (err) {
    console.error('[Program update Error]', err);
    res.status(500).json({ success: false, message: 'Failed to update program' });
  }
};

const deleteProgram = async (req, res) => {
  try {
    const success = await ProgramModel.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Program not found' });
    }
    res.json({ success: true, message: 'Program deleted successfully' });
  } catch (err) {
    console.error('[Program delete Error]', err);
    res.status(500).json({ success: false, message: 'Failed to delete program' });
  }
};

module.exports = {
  getAllPrograms,
  getProgramById,
  createProgram,
  updateProgram,
  deleteProgram,
};
