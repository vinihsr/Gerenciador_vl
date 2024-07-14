import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api', // Base URL da API
});

export const getClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar clientes:', error);
    throw error;
  }
};

// Você pode adicionar outras funções de CRUD conforme necessário
export const criarCliente = async (cliente) => {
  try {
    const response = await api.post('/clientes', cliente);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar cliente:', error);
    throw error;
  }
};

export const atualizarCliente = async (id, cliente) => {
  try {
    const response = await api.put(`/clientes/${id}`, cliente);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar cliente:', error);
    throw error;
  }
};

export const excluirCliente = async (id) => {
  try {
    const response = await api.delete(`/clientes/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir cliente:', error);
    throw error;
  }
};
