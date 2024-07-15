import db from '../db.js';

export const getPedidos = async () => {
  const [rows] = await db.query('SELECT * FROM Pedidos');
  return rows;
};

export const criarPedido = async (cliente_id, data, valor) => {
  try {
    const [result] = await db.query('INSERT INTO Pedidos (cliente_id, data, valor) VALUES (?, ?, ?)', [cliente_id, data, valor]);
    return result.insertId;
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw error;
  }
};

export const atualizarPedido = async (id, cliente_id, data, valor) => {
  try {
    const [result] = await db.query('UPDATE Pedidos SET cliente_id = ?, data = ?, valor = ? WHERE pedido_id = ?', [cliente_id, data, valor, id]);
    return result.affectedRows;
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    throw error;
  }
};

export const excluirPedido = async (id) => {
  try {
    const [result] = await db.query('DELETE FROM Pedidos WHERE pedido_id = ?', [id]);
    return result.affectedRows;
  } catch (error) {
    console.error('Erro ao excluir pedido:', error);
    throw error;
  }
};
