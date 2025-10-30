import express from 'express';
import loginRoutes from './src/Routers/login.routes.js';
import catalogsRoutes from './src/Routers/catalogs.routes.js';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json()); // Esto permite recibir JSON del body en POST
app.use(loginRoutes);
app.use('/api/catalogs', catalogsRoutes);


export default app;