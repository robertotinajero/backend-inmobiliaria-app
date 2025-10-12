import fs from 'fs';
import path from 'path';

// 1️⃣ Sanitiza el nombre
export const sanitizeFilename = (name) => {
  return name
    .replace(/\s+/g, '_')      // reemplaza espacios por _
    .replace(/[^\w.-]/g, '')   // elimina caracteres inválidos
    .toLowerCase();             // opcional: minúsculas
};

// 2️⃣ Asegura nombre único
export const ensureUniqueFilename = (dir, name) => {
  let fileName = name;
  let ext = path.extname(name);
  let base = path.basename(name, ext);
  let counter = 1;

  while (fs.existsSync(path.join(dir, fileName))) {
    fileName = `${base}-${counter}${ext}`;
    counter++;
  }
  return fileName;
};
