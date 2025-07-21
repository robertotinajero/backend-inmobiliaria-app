import jwt from 'jsonwebtoken';
import { loginUser } from '../services/auth.service.js';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await loginUser(email, password);

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const payload = {
      id_user: user.id_user,
      email: user.email,
      roles: user.roles.map(r => r.nm_role),
    };

    const token = jwt.sign(payload, process.env.SECRET_KEY, {
      expiresIn: '1h',
      issuer: 'http://localhost:5173', // Ajusta según entorno
    });

    return res.status(200).json({
      message: 'Login exitoso',
      access_token: token,
      user,
    });
  } catch (err) {
    console.error('Error en login:', err);
    return res.status(500).json({ error: 'Error interno del servidor' });
  }
};
