// src/controllers/users/user.controller.js
import userService from "../services/user.services.js";
import bcrypt from "bcrypt";

// Obtener todos los usuarios
export async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Obtener usuario por ID
export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (!user) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error("Error al obtener usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Crear usuario
export async function createUser(req, res) {
  try {
    const {
      firstname,
      lastname,
      username,
      email,
      password,
      phone,
      profile_image_url,
      id_role,
      id_department,
    } = req.body;

    // Validación básica
    if (!username || !email || !password || !id_role || !id_department) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    // Hashear contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
      firstname,
      lastname,
      username,
      email,
      password: hashedPassword,
      phone,
      token: "", // puedes dejarlo vacío si lo gestionas en login
      profile_image_url,
      id_role,
      id_department,
      id_user_last_modification: req.user?.id_user || null, // si usas auth
    };

    const userId = await userService.createUser(newUser);

    res.status(201).json({ message: "Usuario creado", id_user: userId });
  } catch (error) {
    console.error("Error al crear usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Actualizar usuario
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const {
      firstname,
      lastname,
      username,
      email,
      phone,
      profile_image_url,
      id_role,
      id_department,
      password,
    } = req.body;

    const updatedUser = {
      firstname,
      lastname,
      username,
      email,
      phone,
      token: existingUser.token,
      profile_image_url,
      id_role,
      id_department,
      id_user_last_modification: req.user?.id_user || null,
    };

    // Si mandan una nueva contraseña, la hasheamos
    if (password) {
      updatedUser.password = await bcrypt.hash(password, 10);
    } else {
      updatedUser.password = existingUser.password;
    }

    await userService.updateUser(id, updatedUser);
    res.status(200).json({ message: "Usuario actualizado" });
  } catch (error) {
    console.error("Error al actualizar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Eliminar (borrado lógico)
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const existingUser = await userService.getUserById(id);
    if (!existingUser) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    await userService.deleteUser(id, req.user?.id_user || null);
    res.status(200).json({ message: "Usuario eliminado" });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
