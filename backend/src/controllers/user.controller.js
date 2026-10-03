const bcrypt = require('bcryptjs');
const UserModel = require('../models/user.model');

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAllEnriched();
    res.json({ success: true, count: users.length, data: users });
  } catch (err) {
    console.error('[User getAll Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch users' });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, data: user });
  } catch (err) {
    console.error('[User getById Error]', err);
    res.status(500).json({ success: false, message: 'Failed to fetch user' });
  }
};

const createUser = async (req, res) => {
  try {
    const { name, email, role, phone, password } = req.body;
    if (!name || !email) {
      return res.status(400).json({ success: false, message: 'Name and email are required' });
    }

    const existing = await UserModel.findByEmail(email);
    if (existing) {
      return res.status(400).json({ success: false, message: 'User with this email already exists' });
    }

    const initials = name
      .split(' ')
      .map((part) => part[0])
      .join('')
      .substring(0, 2)
      .toUpperCase();

    const password_hash = await bcrypt.hash(password || 'password123', 10);
    const id = `usr-${Date.now()}`;

    const user = await UserModel.create({
      id,
      name,
      email,
      password_hash,
      role: role || 'DAYCARE_OWNER',
      phone: phone || '',
      initials,
    });

    res.status(201).json({ success: true, message: 'User created successfully', data: user });
  } catch (err) {
    console.error('[User create Error]', err);
    res.status(500).json({ success: false, message: 'Failed to create user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await UserModel.update(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User updated successfully', data: user });
  } catch (err) {
    console.error('[User update Error]', err);
    res.status(500).json({ success: false, message: 'Failed to update user' });
  }
};

const updateUserStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ success: false, message: 'Status is required' });
    }
    const user = await UserModel.update(req.params.id, { status });
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: `User status updated to ${status}`, data: user });
  } catch (err) {
    console.error('[User updateStatus Error]', err);
    res.status(500).json({ success: false, message: 'Failed to update user status' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const success = await UserModel.delete(req.params.id);
    if (!success) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, message: 'User deleted successfully' });
  } catch (err) {
    console.error('[User delete Error]', err);
    res.status(500).json({ success: false, message: 'Failed to delete user' });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserStatus,
  deleteUser,
};
