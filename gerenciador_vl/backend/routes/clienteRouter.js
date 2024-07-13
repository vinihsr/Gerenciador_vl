import express from 'express';
import * as clienteController from '../controllers/clienteController.js';

const router = express.Router();

router.get('/clientes', async (req, res) => {
  try {
    const clientes = await clienteController.getClientes();
    res.json(clientes);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao buscar clientes.' });
  }
});

router.post('/clientes', async (req, res) => {
  const { nome, endereco, telefone, email } = req.body;
  try {
    const novoClienteId = await clienteController.criarCliente(nome, endereco, telefone, email);
    res.status(201).json({ id: novoClienteId, message: 'Cliente criado com sucesso.' });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao criar cliente.' });
  }
});

router.put('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, endereco, telefone, email } = req.body;
  try {
    const rowsAffected = await clienteController.atualizarCliente(id, nome, endereco, telefone, email);
    if (rowsAffected > 0) {
      res.json({ message: 'Cliente atualizado com sucesso.' });
    } else {
      res.status(404).json({ message: 'Cliente não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao atualizar cliente.' });
  }
});

router.delete('/clientes/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsAffected = await clienteController.excluirCliente(id);
    if (rowsAffected > 0) {
      res.json({ message: 'Cliente excluído com sucesso.' });
    } else {
      res.status(404).json({ message: 'Cliente não encontrado.' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Erro ao excluir cliente.' });
  }
});

export default router;
