import express from 'express';
import loginRoutes from './src/Routers/login.routes.js';
import catalogsRoutes from './src/Routers/catalogs.routes.js';
import homeRoutes from './src/Routers/home.routes.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

app.use(cors());
app.use(express.json()); // Esto permite recibir JSON del body en POST
app.use(loginRoutes);
app.use('/api/catalogs', catalogsRoutes);
app.use('/home', homeRoutes);

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
app.use('/images', express.static(path.join(_dirname, 'assets')));


export default app;