import express, { urlencoded, json } from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import routes from './src/routes/index.routes.js';

dotenv.config();

const app = express();
app.use(express.json());
const corsOptions = {
    origin: ['http://localhost:5173','https://grupopenainmobiliaria.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    optionSuccessStatus: 200
}
// Configuracion del servicio
app.use(urlencoded({ extended: true, limit: '100mb' }))
app.use(json({ limit: '100mb' }))
app.use(cors(corsOptions))

// Ruta de monitoreo
app.get('/health', (req, res) => res.json({ ok: true }));

// Todas las rutas centralizadas
app.use('/api', routes);

const port = 3000;
app.listen(port, () => {
  console.log(`Listen on:${process.env.BASE_URL}:${port}`)
});
