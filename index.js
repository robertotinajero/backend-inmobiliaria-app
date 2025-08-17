import express, { urlencoded, json } from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/index.routes.js';

dotenv.config();

const app = express();
app.use(express.json());

// Orígenes permitidos (dev + prod)
const ALLOWED_ORIGINS = [
  'http://localhost:5173',
  'http://127.0.0.1:5173',
  process.env.FRONTEND_URL,           // e.g. https://grupopenainmobiliaria.com
  'https://grupopenainmobiliaria.com',
  'https://www.grupopenainmobiliaria.com',
].filter(Boolean);


const corsOptions = {
    //origin: 'http://localhost:5173',
    origin(origin, cb) {
      // Permite curl/Postman (sin Origin)
      if (!origin) return cb(null, true);
      const ok = ALLOWED_ORIGINS.some(o => o === origin);
      return ok ? cb(null, true) : cb(new Error(`CORS blocked for origin ${origin}`), false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    //allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionSuccessStatus: 200
}
// Configuracion del servicio
app.use(urlencoded({ extended: true, limit: '100mb' }))
app.use(json({ limit: '100mb' }))
app.use(cors(corsOptions))
app.options('*', cors(corsOptions));

app.get('/health', (req, res) => res.json({ ok: true }));

// Todas las rutas centralizadas
app.use('/api', routes);

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listen on: http://localhost:${port}`)
});
