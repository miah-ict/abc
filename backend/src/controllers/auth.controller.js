const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const UserModel = require('../models/user.model');

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email, role: user.role },
    env.jwt.secret,
    { expiresIn: env.jwt.expiresIn }
  );
};

const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id },
    env.jwt.refreshSecret,
    { expiresIn: env.jwt.refreshExpiresIn }
  );
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    const user = await UserModel.findByEmail(email);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    if (user.status === 'Restricted' || user.status === 'Inactive') {
      return res.status(403).json({ success: false, message: `Account is ${user.status.toLowerCase()}` });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await UserModel.storeRefreshToken(user.id, refreshToken, expiresAt);

    const { password_hash, ...safeUser } = user;

    res.json({
      success: true,
      message: 'Login successful',
      token: accessToken,
      refreshToken,
      user: safeUser,
    });
  } catch (err) {
    console.error('[Auth Login Error]', err);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

const refresh = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ success: false, message: 'Refresh token required' });
    }

    const storedToken = await UserModel.findRefreshToken(refreshToken);
    if (!storedToken) {
      return res.status(403).json({ success: false, message: 'Invalid or expired refresh token' });
    }

    jwt.verify(refreshToken, env.jwt.refreshSecret, async (err, decoded) => {
      if (err) {
        return res.status(403).json({ success: false, message: 'Invalid refresh token' });
      }

      const user = await UserModel.findById(decoded.id);
      if (!user) {
        return res.status(404).json({ success: false, message: 'User not found' });
      }

      const newAccessToken = generateAccessToken(user);
      res.json({
        success: true,
        token: newAccessToken,
      });
    });
  } catch (err) {
    console.error('[Auth Refresh Error]', err);
    res.status(500).json({ success: false, message: 'Server error during token refresh' });
  }
};

const logout = async (req, res) => {
  try {
    const { refreshToken } = req.body;
    if (refreshToken) {
      await UserModel.revokeRefreshToken(refreshToken);
    }
    res.json({ success: true, message: 'Logged out successfully' });
  } catch (err) {
    console.error('[Auth Logout Error]', err);
    res.status(500).json({ success: false, message: 'Server error during logout' });
  }
};

const me = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error('[Auth Me Error]', err);
    res.status(500).json({ success: false, message: 'Server error fetching user profile' });
  }
};

module.exports = {
  login,
  refresh,
  logout,
  me,
};
