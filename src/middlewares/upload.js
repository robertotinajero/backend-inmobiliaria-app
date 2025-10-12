import multer from 'multer';
import fs from 'fs';
import path from 'path';

/** 
 * Sanitiza el nombre del archivo
 */
const sanitizeFilename = (name) => {
  return name
    .replace(/\s+/g, '_')      // espacios por _
    .replace(/[^\w.-]/g, '')   // caracteres inválidos
    .toLowerCase();
};

/**
 * Garantiza que el archivo no sobreescriba existentes
 */
const ensureUniqueFilename = (dir, name) => {
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

/**
 * Genera timestamp con formato YYYYMMDD_HHMMSS
 */
const getFormattedTimestamp = () => {
  const now = new Date();
  const yyyy = now.getFullYear();
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  const hh = String(now.getHours()).padStart(2, '0');
  const min = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  return `${yyyy}${mm}${dd}_${hh}${min}${ss}`;
};

/**
 * Middleware de multer reutilizable con prefijo y timestamp
 * @param {Object} options
 * @param {string} options.folder Carpeta donde se guardarán los archivos
 * @param {Array<string>} options.allowedTypes Tipos MIME permitidos
 * @param {number} options.maxSize Tamaño máximo por archivo (default: 5MB)
 * @returns multer middleware
 */
export const uploadFiles = ({ folder, allowedTypes = [], maxSize = 5 * 1024 * 1024 }) => {
  const uploadDir = path.join(process.cwd(), folder);
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

  const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
      const fieldPrefixMap = {
        ine: 'ine',
        comprobante: 'comprobante_domicilio',
        estadoCuenta: 'estadoCuenta',
      };

      const prefix = fieldPrefixMap[file.fieldname] || '';
      const ext = path.extname(file.originalname).toLowerCase(); // obtener extensión
      const timestamp = getFormattedTimestamp();
      const finalName = ensureUniqueFilename(uploadDir, `${timestamp}_${prefix}${ext}`);

      cb(null, finalName);
    },
  });

  const fileFilter = (_req, file, cb) => {
    if (allowedTypes.length && !allowedTypes.includes(file.mimetype)) {
      return cb(new Error(`Tipo de archivo no permitido: ${file.mimetype}`), false);
    }
    cb(null, true);
  };

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  });
};
