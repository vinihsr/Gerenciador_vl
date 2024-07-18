import { Box, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { register } from "../services/api";

export const SignUpComponent = ({ setIsLogin }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');

    const handleRegister = async () => {
        try {
            // Verifica se todos os campos estão preenchidos
            if (!nome || !email || !senha) {
                setError('Por favor, preencha todos os campos.');
                return;
            }

            await register(nome, email, senha);
            setIsLogin(true);
        } catch (err) {
            console.error("Erro ao registrar:", err);
            setError('Erro ao registrar. Por favor, tente novamente.');
        }
    };

    return (
        <Box w="40vw" h="90vh" backgroundColor="white" display="flex" justifyContent="center" borderRadius="40">
            <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
                <Text fontWeight="bold" fontSize="40px" color="#1E2547" mb={5}>CADASTRE-SE</Text>
                {error && <Text color="red">{error}</Text>}
                <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" gap={20}>
                    <Box display="flex" w="100%" flexDir="column" gap={5}>
                        <Input placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
                        <Input placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password" />
                        <Button bgColor="#1E2547" _hover={{ bgColor: '#4D5476' }} color="white" onClick={handleRegister}>Cadastrar</Button>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Text>Já possui uma conta?</Text>
                        <Button bgColor="#1E2547" h="5" _hover={{ bgColor: '#4D5476' }} color="white" onClick={() => setIsLogin(true)}>Entrar</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
