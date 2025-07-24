const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const CLIENT_URL = process.env.CLIENT_URL ;

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'Email requerido' });
  const user = await User.findOne({ email });
  if (!user) return res.status(200).json({ message: 'Si el email está registrado, recibirás instrucciones.' });
  const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
  user.resetToken = token;
  user.resetTokenExpires = Date.now() + 3600000;
  await user.save();
  // Configura tu transporte de correo
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
  const resetUrl = `${CLIENT_URL}/reset-password/${token}`;
  await transporter.sendMail({
    to: user.email,
    subject: 'Recupera tu contraseña',
    html: `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p><a href="${resetUrl}">${resetUrl}</a>`
  });
  res.json({ message: 'Si el email está registrado, recibirás instrucciones.' });
};

exports.resetPassword = async (req, res) => {
  const { token, password } = req.body;
  if (!token || !password) return res.status(400).json({ message: 'Datos incompletos' });
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch {
    return res.status(400).json({ message: 'Token inválido o expirado' });
  }
  const user = await User.findOne({ _id: payload.id, resetToken: token, resetTokenExpires: { $gt: Date.now() } });
  if (!user) return res.status(400).json({ message: 'Token inválido o expirado' });
  user.password = await bcrypt.hash(password, 10);
  user.resetToken = undefined;
  user.resetTokenExpires = undefined;
  await user.save();
  res.json({ message: 'Contraseña actualizada correctamente' });
};
