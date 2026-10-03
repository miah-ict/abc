const CenterModel = require('../models/center.model');

const getAllCenters = async (req, res) => {
  try {
    const centers = await CenterModel.findAll();
    res.json({ success: true, count: centers.length, data: centers });
  } catch (err) {
    console.error('[Center getAll Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch daycare centers' });
  }
};

const getCenterById = async (req, res) => {
  try {
    const center = await CenterModel.findById(req.params.id);
    if (!center) {
      return res.status(404).json({ success: false, message: 'Center not found' });
    }
    res.json({ success: true, data: center });
  } catch (err) {
    console.error('[Center getById Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch center' });
  }
};

const createCenter = async (req, res) => {
  try {
    const { name, code } = req.body;
    if (!name || !code) {
      return res.status(400).json({ success: false, message: 'Center name and code are required' });
    }
    const center = await CenterModel.create(req.body);
    res.status(201).json({ success: true, message: 'Center created successfully', data: center });
  } catch (err) {
    console.error('[Center create Error]', err);
    res.status(500).json({ success: false, message: 'Failed to create center' });
  }
};

const updateCenter = async (req, res) => {
  try {
    const center = await CenterModel.update(req.params.id, req.body);
    if (!center) {
      return res.status(404).json({ success: false, message: 'Center not found' });
    }
    res.json({ success: true, message: 'Center updated successfully', data: center });
  } catch (err) {
    console.error('[Center update Error]', err);
    res.status(500).json({ success: false, message: 'Failed to update center' });
  }
};

const updateCenterStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const center = await CenterModel.updateStatus(req.params.id, status);
    if (!center) {
      return res.status(404).json({ success: false, message: 'Center not found' });
    }
    res.json({ success: true, message: `Center status updated to ${status}`, data: center });
  } catch (err) {
    console.error('[Center updateStatus Error]', err);
    res.status(500).json({ success: false, message: 'Failed to update center status' });
  }
};

const deleteCenter = async (req, res) => {
  try {
    const success = await CenterModel.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'Center not found' });
    }
    res.json({ success: true, message: 'Center deleted successfully' });
  } catch (err) {
    console.error('[Center delete Error]', err);
    res.status(500).json({ success: false, message: 'Failed to delete center' });
  }
};

module.exports = {
  getAllCenters,
  getCenterById,
  createCenter,
  updateCenter,
  updateCenterStatus,
  deleteCenter,
};
