const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');
const User = require('../models/user.model');
const env = require('../config/env');
const { sendMail } = require('../utils/mailer');

// Helper function to generate a signed JWT
function generateToken(userId) {
  return jwt.sign({ userId }, env.jwtSecret, {
    expiresIn: env.jwtExpiresIn
  });
}

exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!validator.isEmail(normalizedEmail)) {
      return res.status(400).json({ message: 'A valid email is required' });
    }

    if (!validator.isLength(String(password || ''), { min: 8 })) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: normalizedEmail });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = await User.create({
      email: normalizedEmail,
      password: hashedPassword,
      name: String(name || '').trim()
    });

    // Optional: auto-login after sign-up
    const token = generateToken(newUser._id);

    // Send response with token
    return res.status(201).json({
      message: 'User created successfully',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        name: newUser.name
      }
    });
  } catch (error) {
    console.error('Signup error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!validator.isEmail(normalizedEmail) || !password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check user
    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate token
    const token = generateToken(user._id);

    return res.status(200).json({
      message: 'Logged in successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.logout = (req, res) => {
  // If storing token in cookies, you can clear it here:
  // res.clearCookie('token');
  return res.status(200).json({ message: 'Logged out successfully' });
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    if (!validator.isEmail(normalizedEmail)) {
      return res.status(200).json({ message: 'If that email exists, a reset link has been sent' });
    }

    const user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      return res.status(200).json({ message: 'If that email exists, a reset link has been sent' });
    }

    // Create a reset token
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.passwordResetExpires = Date.now() + env.resetTokenExpiresMs;
    await user.save();

    const resetUrl = `${env.clientUrl}/reset-password/${resetToken}`;

    await sendMail({
      to: user.email,
      subject: 'Password Reset Request',
      html: `
        <p>You requested a password reset.</p>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password.</p>
      `
    });

    return res.status(200).json({ message: 'If that email exists, a reset link has been sent' });
  } catch (error) {
    console.error('Forgot password error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { resetToken, newPassword } = req.body;
    const hashedResetToken = crypto
      .createHash('sha256')
      .update(String(resetToken || ''))
      .digest('hex');

    if (!validator.isLength(String(newPassword || ''), { min: 8 })) {
      return res.status(400).json({ message: 'Password must be at least 8 characters' });
    }

    // Find user by token and check expiration
    const user = await User.findOne({
      passwordResetToken: hashedResetToken,
      passwordResetExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired reset token' });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update user
    user.password = hashedPassword;
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save();

    return res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error('Reset password error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};


exports.googleCallback = (req, res) => {
  // req.user is populated by the Passport strategy
  const token = generateToken(req.user._id);

  res.redirect(`${env.clientUrl}/oauth-callback?token=${token}`);
};
