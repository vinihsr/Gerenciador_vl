import express from 'express';
import * as pedidoController from '../controllers/pedidosController.js';

const router = express.Router();

router.get('/pedidos', async (req, res) => {
  try {
    console.log('Recebendo solicitação para GET /pedidos');
    const pedidos = await pedidoController.getPedidos();
    res.json(pedidos);
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    res.status(500).json({ message: 'Erro ao buscar pedidos.' });
  }
});

router.post('/pedidos', async (req, res) => {
  const { cliente_id, data, valor } = req.body;
  console.log('Recebendo solicitação para POST /pedidos com dados:', { cliente_id, data, valor });
  try {
    const novoPedidoId = await pedidoController.criarPedido(cliente_id, data, valor);
    res.status(201).json({ id: novoPedidoId, message: 'Pedido criado com sucesso.' });
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    res.status(500).json({ message: 'Erro ao criar pedido.' });
  }
});

router.put('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  const { cliente_id, data, valor } = req.body;
  console.log('Recebendo solicitação para PUT /pedidos/:id com dados:', { id, cliente_id, data, valor });
  try {
    const rowsAffected = await pedidoController.atualizarPedido(id, cliente_id, data, valor);
    if (rowsAffected > 0) {
      res.json({ message: 'Pedido atualizado com sucesso.' });
    } else {
      res.status(404).json({ message: 'Pedido não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    res.status(500).json({ message: 'Erro ao atualizar pedido.' });
  }
});

router.delete('/pedidos/:id', async (req, res) => {
  const { id } = req.params;
  console.log('Recebendo solicitação para DELETE /pedidos/:id com id:', id);
  try {
    const rowsAffected = await pedidoController.excluirPedido(id);
    if (rowsAffected > 0) {
      res.json({ message: 'Pedido excluído com sucesso.' });
    } else {
      res.status(404).json({ message: 'Pedido não encontrado.' });
    }
  } catch (error) {
    console.error('Erro ao excluir pedido:', error);
    res.status(500).json({ message: 'Erro ao excluir pedido.' });
  }
});

export default router;
