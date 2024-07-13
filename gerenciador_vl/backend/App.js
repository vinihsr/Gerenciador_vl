import express from 'express';
import clienteRoutes from './routes/clienteRouter.js'

const app = express();
const PORT = 3001;

app.use(express.json);

app.use((req, res, next) => {
    console.log(`Recebendo solicitação para ${req.method} ${req.url}`);
    next();
  });

app.get('/test', (req, res) => {
    res.send('Servidor está funcionando!');
  });
  

app.use('/api', clienteRoutes);

app.listen(PORT, () => {
    console.log(`servidor rodando na porta ${PORT}`)
})

