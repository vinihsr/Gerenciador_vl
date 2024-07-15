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
import { getClientes, addCliente } from '../services/api';
import { PlusSquareIcon } from '@chakra-ui/icons';

const ClientComponent: React.FC = () => {
  const [clientes, setClientes] = useState([]);
  const [nome, setNome] = useState('');
  const [endereco, setEndereco] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<ModalOverlay />);

  useEffect(() => {
    const fetchClientes = async () => {
      try {
        const clientesData = await getClientes();
        setClientes(clientesData);
        console.log(clientesData);
      } catch (error) {
        console.error('Erro ao buscar clientes:', error);
      }
    };

    fetchClientes();
  }, []);

  const handleAddCliente = async () => {
    const newCliente = {
      nome,
      endereco,
      telefone,
      email,
    };

    try {
      await addCliente(newCliente);
      const clientesData = await getClientes();
      setClientes(clientesData);
      onClose(); // Fechar o modal após o cadastro
    } catch (error) {
      console.error('Erro ao adicionar cliente:', error);
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
          Cadastrar Clientes
        </Button>
      </Box>
      <Box>
        <Text fontSize='x-large' fontFamily='sans-serif' mb={5}>Clientes:</Text>
        <TableContainer>
          <Table variant='striped'>
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
                <Tr key={cliente.cliente_id}>
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
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent>
          <ModalHeader>Cadastro de Clientes</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired>
              <FormLabel mb={2}>Nome:</FormLabel>
              <Input
                mb={4}
                placeholder='Insira o nome aqui:'
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel mb={2}>Endereço:</FormLabel>
              <Input
                mb={4}
                placeholder='Insira o endereço aqui:'
                value={endereco}
                onChange={(e) => setEndereco(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel mb={2}>Telefone:</FormLabel>
              <Input
                mb={4}
                placeholder='Insira o telefone aqui:'
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel mb={2}>Email:</FormLabel>
              <Input
                mb={4}
                placeholder='Insira o email aqui:'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' onClick={onClose}>Fechar</Button>
            <Button ml={2} colorScheme='yellow' onClick={handleAddCliente}>Cadastrar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ClientComponent;
