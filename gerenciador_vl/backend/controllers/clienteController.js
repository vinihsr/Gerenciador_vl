import db from '../db.js';

export async function getClientes() {
  try {
    const [rows] = await db.query('SELECT * FROM Clientes');
    return rows;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
}

export async function criarCliente(nome, endereco, telefone, email) {
  try {
    const [result] = await db.query(
      'INSERT INTO Clientes (nome, endereco, telefone, email) VALUES (?, ?, ?, ?)',
      [nome, endereco, telefone, email]
    );
    return result.insertId;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
}

export async function atualizarCliente(id, nome, endereco, telefone, email) {
  try {
    const [result] = await db.query(
      'UPDATE Clientes SET nome = ?, endereco = ?, telefone = ?, email = ? WHERE id = ?',
      [nome, endereco, telefone, email, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
}

export async function excluirCliente(id) {
  try {
    const [result] = await db.query('DELETE FROM Clientes WHERE id = ?', [id]);
    return result.affectedRows;
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    throw error;
  }
}
