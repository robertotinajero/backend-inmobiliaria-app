// src/controllers/users/user.controller.js
import roleService from "../services/role.services.js";
import bcrypt from "bcrypt";

// Obtener todos los roles
export async function getRoles(req, res) {
  try {
    const users = await roleService.getRoles();
    res.status(200).json(users);
  } catch (error) {
    console.error("Error al obtener roles:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Obtener roles por ID
export async function getRoleById(req, res) {
  try {
    const { id } = req.params;
    const role = await roleService.getRoleById(id);
    if (!role) {
      return res.status(404).json({ error: "Role no encontrado" });
    }
    res.status(200).json(role);
  } catch (error) {
    console.error("Error al obtener el role:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Crear role
export async function createRole(req, res) {
  try {
    const {
      nm_role
    } = req.body;

    // Validación básica
    if (!nm_role) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const newRole = {
      nm_role,
      id_user_last_modification: req.user?.id_user || null, // si usas auth
    };

    const roleId = await roleService.createRole(newRole);

    res.status(201).json({ message: "Role creado", id_role: roleId });
  } catch (error) {
    console.error("Error al crear el role:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Actualizar role
export async function updateRole(req, res) {
  try {
    const { id } = req.params;
    const existingRole = await roleService.getRoleById(id);
    if (!existingRole) {
      return res.status(404).json({ error: "Role no encontrado" });
    }

    const {
      nm_role
    } = req.body;

    const updatedRole = {
      nm_role,
      id_user_last_modification: req.user?.id_user || null,
    };

    await roleService.updateRole(id, updatedRole);
    res.status(200).json({ message: "Role actualizado" });
  } catch (error) {
    console.error("Error al actualizar role:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}

// Eliminar (borrado lógico)
export async function deleteRole(req, res) {
  try {
    const { id } = req.params;
    const existingRole = await roleService.getRoleById(id);
    if (!existingRole) {
      return res.status(404).json({ error: "Role no encontrado" });
    }

    await roleService.deleteRole(id, req.user?.id_user || null);
    res.status(200).json({ message: "Role eliminado" });
  } catch (error) {
    console.error("Error al eliminar role:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
