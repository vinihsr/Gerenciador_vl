import React, { useEffect, useState } from 'react';
import {
  Text,
  Button,
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react';
import { getOrders, addOrder } from '../services/api';
import { PlusSquareIcon } from '@chakra-ui/icons';

const OrderComponent: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<ModalOverlay />);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
        console.log(ordersData);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      }
    };

    fetchOrders();
  }, []);

  const handleAddOrder = async () => {
    const newOrder = {
      cliente_id: clienteId,
      data,
      valor: parseFloat(valor.replace(',', '.')), // Convertendo vírgula para ponto
    };
  
    try {
      await addOrder(newOrder);
      const ordersData = await getOrders();
      setOrders(ordersData);
      onClose(); // Fechar o modal após o cadastro
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
    }
  };

  const OverlayTwo = () => (
    <ModalOverlay
      bg='none'
      backdropFilter='auto'
      backdropInvert='10%'
      backdropBlur='6px'
    />
  );

  return (
    <Box>
      <Box display='flex' justifyContent='flex-end' mb={10}>
        <Button
          colorScheme='yellow'
          onClick={() => {
            setOverlay(<OverlayTwo />);
            onOpen();
          }}
        >
          <PlusSquareIcon mr={10} />
          Cadastrar Pedido
        </Button>
      </Box>
      <Box>
        <Text fontSize='x-large' fontFamily='sans-serif' mb={5}>Pedidos:</Text>
        <TableContainer>
          <Table variant='striped'>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Cliente Id</Th>
                <Th>Data</Th>
                <Th>Valor</Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.pedido_id}>
                  <Td>{order.pedido_id}</Td>
                  <Td>{order.cliente_id}</Td>
                  <Td>{order.data}</Td>
                  <Td>{order.valor}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Cadastro de Pedido</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel mb={2}>Cliente Id:</FormLabel>
              <Input
                mb={4}
                placeholder='Insira o ID do cliente aqui:'
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel mb={2}>Data:</FormLabel>
              <Input
                mb={4}
                type='date'
                placeholder='Insira a data aqui:'
                value={data}
                onChange={(e) => setData(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel mb={2}>Valor:</FormLabel>
              <Input
                mb={4}
                placeholder='Insira o valor aqui:'
                value={valor}
                onChange={(e) => setValor(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' onClick={onClose}>Fechar</Button>
            <Button ml={2} colorScheme='yellow' onClick={handleAddOrder}>Cadastrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OrderComponent;
