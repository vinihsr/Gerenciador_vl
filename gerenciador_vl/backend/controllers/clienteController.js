import db from '../Db.js';

// Função para buscar todos os clientes
export async function getClientes() {
  try {
    const [rows] = await db.query('SELECT * FROM Clientes');
    return rows;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
}

// Função para criar um novo cliente
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

// Função para atualizar um cliente existente
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

// Função para excluir um cliente
export async function excluirCliente(id) {
  try {
    const [result] = await db.query('DELETE FROM Clientes WHERE id = ?', [id]);
    return result.affectedRows;
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    throw error;
  }
}
