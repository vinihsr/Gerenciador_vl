import express from 'express';
import clienteRouter from './routes/clienteRouter.js'
import dotenv from 'dotenv';
import cors from 'cors';
import pedidosRouter from './routes/pedidosRouter.js'
import settingsRoutes from './routes/settings.js';  // Caminho para o arquivo settings.js
import authRoutes from './routes/auth.js'

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000;

dotenv.config();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`Recebendo solicitação para ${req.method} ${req.url}`);
    next();
  });

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})

app.use('/api', clienteRouter);
app.use('/api', pedidosRouter);
app.use('/api/auth', authRoutes);
app.use('/settings', settingsRoutes);

