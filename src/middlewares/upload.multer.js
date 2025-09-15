// src/middlewares/upload.multer.js
import multer from 'multer';
import path, { extname } from 'path';
import fs from 'fs';

const ensureDir = (dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
};

// Quita acentos y caracteres problemáticos, colapsa espacios, etc.
function sanitizeFilename(name) {
  // Evitar path traversal y quedarnos con el nombre base
  let base = path.basename(name);

  // Normalizar acentos → ASCII
  base = base.normalize('NFKD').replace(/[\u0300-\u036f]/g, '');

  // Reemplazar caracteres no válidos por guión bajo
  base = base.replace(/[^\w\s\-.()]/g, '_');

  // Colapsar espacios y recortar
  base = base.replace(/\s+/g, ' ').trim();

  // Evitar nombres vacíos
  if (!base) base = 'archivo';

  return base;
}

// Si ya existe, genera "nombre (1).ext", "nombre (2).ext", ...
function ensureUniqueFilename(dir, filename) {
  const ext = extname(filename);
  const name = filename.slice(0, -ext.length);

  let candidate = filename;
  let counter = 1;

  while (fs.existsSync(path.join(dir, candidate))) {
    candidate = `${name} (${counter})${ext}`;
    counter++;
  }
  return candidate;
}

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = 'uploads/receipts';
    ensureDir(dir);
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    // 1) Sanitiza el nombre original
    const original = sanitizeFilename(file.originalname);

    // 2) Garantiza que no sobreescriba (si ya existe, agrega sufijo incremental)
    const dir = 'uploads/receipts';
    const finalName = ensureUniqueFilename(dir, original);

    cb(null, finalName);
  },
});

function fileFilter(_req, file, cb) {
  // Permite PDF e imágenes comunes
  const allowed = /pdf|jpeg|jpg|png/i.test(file.mimetype);
  if (!allowed) return cb(new Error('Tipo de archivo no permitido'), false);
  cb(null, true);
}

export const uploadReceiptMulter = multer({
  storage,
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
}).single('file'); // <-- el campo en FormData debe llamarse 'file'
