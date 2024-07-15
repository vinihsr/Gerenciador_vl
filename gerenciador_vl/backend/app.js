import express from 'express';
import clienteRouter from './routes/clienteRouter.js'
import dotenv from 'dotenv';
import cors from 'cors';
import pedidosRouter from './routes/pedidosRouter.js'

const app = express();
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

