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

export const addCliente = async (cliente) => {
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

export const getOrders = async () => {
  try {
    const response = await api.get('/pedidos');
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar pedidos:', error);
    throw error;
  }
};

export const addOrder = async (pedido) => {
  try {
    const response = await api.post('/pedidos', pedido);
    return response.data;
  } catch (error) {
    console.error('Erro ao criar pedido:', error);
    throw error;
  }
};

export const atualizarOrder = async (id, pedido) => {
  try {
    const response = await api.put(`/pedidos/${id}`, pedido);
    return response.data;
  } catch (error) {
    console.error('Erro ao atualizar pedido:', error);
    throw error;
  }
};

export const excluirOrder = async (id) => {
  try {
    const response = await api.delete(`/pedidos/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao excluir pedido:', error);
    throw error;
  }
};
