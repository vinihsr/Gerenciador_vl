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
import { getOrders, addOrder, updateOrder, deleteOrder } from '../services/api';
import { DeleteIcon, EditIcon, PlusSquareIcon } from '@chakra-ui/icons';
import { format } from 'date-fns';

const OrderComponent: React.FC = () => {
  const [orders, setOrders] = useState([]);
  const [clienteId, setClienteId] = useState('');
  const [data, setData] = useState('');
  const [valor, setValor] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editOrderId, setEditOrderId] = useState(null);
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
    if (isNaN(clienteId)) {
      console.error('Cliente ID deve ser um número');
      return;
    }

    const formattedDate = format(new Date(data), 'yyyy-MM-dd');
    const newOrder = {
      cliente_id: parseInt(clienteId, 10), // Convertendo clienteId para inteiro
      data: formattedDate,
      valor: parseFloat(valor.replace(',', '.')), // Convertendo vírgula para ponto
    };

    console.log('Recebendo solicitação para POST /pedidos com dados:', newOrder);

    try {
      await addOrder(newOrder);
      const ordersData = await getOrders();
      setOrders(ordersData);
      onClose(); // Fechar o modal após o cadastro
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
    }
  };

  const handleEditOrder = (order) => {
    setClienteId(order.cliente_id);
    setData(format(new Date(order.data), 'yyyy-MM-dd'));
    setValor(order.valor);
    setEditOrderId(order.pedido_id);
    setIsEditOpen(true);
  };

  const handleUpdateOrder = async () => {
    const updatedOrder = {
      cliente_id: parseInt(clienteId, 10),
      data: format(new Date(data), 'yyyy-MM-dd'),
      valor: parseFloat(valor.replace(',', '.')),
    };

    try {
      await updateOrder(editOrderId, updatedOrder);
      const ordersData = await getOrders();
      setOrders(ordersData);
      setIsEditOpen(false); // Fechar o modal após a atualização
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await deleteOrder(id);
      const ordersData = await getOrders();
      setOrders(ordersData);
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
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
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              {orders.map((order) => (
                <Tr key={order.pedido_id}>
                  <Td>{order.pedido_id}</Td>
                  <Td>{order.cliente_id}</Td>
                  <Td>{format(new Date(order.data), 'dd/MM/yyyy')}</Td>
                  <Td>{order.valor}</Td>
                  <Td>
                    <Button
                      size="sm"
                      bgColor='#1E2547'
                      _hover={{ bgColor : '#1E2381' }}
                      color='white'
                      onClick={() => handleEditOrder(order)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      size="sm"
                      colorScheme="red"
                      ml={10}
                      onClick={() => handleDeleteOrder(order.pedido_id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </Td>
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
      <Modal isCentered isOpen={isEditOpen} onClose={() => setIsEditOpen(false)}>
        {overlay}
        <ModalContent>
          <ModalHeader>Editar Pedido</ModalHeader>
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
            <Button colorScheme='red' onClick={() => setIsEditOpen(false)}>Fechar</Button>
            <Button ml={2} colorScheme='blue' onClick={handleUpdateOrder}>Atualizar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default OrderComponent;
