import React, { useEffect, useState } from 'react';
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react';
import { getClientes } from '../services/api';

const ClientComponent: React.FC = () => {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesData = await getClientes();
        setClientes(clientesData);
        console.log(clientesData)
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  return (
    <Box>
      <TableContainer>
        <Table variant='simple'>
          <TableCaption>Clientes</TableCaption>
          <Thead>
            <Tr>
              <Th>Id</Th>
              <Th>Nome</Th>
              <Th>Endereço</Th>
              <Th>Telefone</Th>
              <Th>Email</Th>
            </Tr>
          </Thead>
          <Tbody>
            {clientes.map((cliente) => (
                <Tr>
                  <Td>{cliente.cliente_id}</Td>
                  <Td>{cliente.nome}</Td>
                  <Td>{cliente.endereco}</Td>
                  <Td>{cliente.telefone}</Td>
                  <Td>{cliente.email}</Td>
                </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default ClientComponent;
