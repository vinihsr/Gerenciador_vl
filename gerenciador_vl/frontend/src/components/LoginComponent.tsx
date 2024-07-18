import { Box, Text, Input, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/api";

export const LoginComponent = ({ setIsLogin }) => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            if (!email || !senha) {
                setError('Por favor, preencha todos os campos.');
                return;
            }

            const response = await login(email, senha);
            localStorage.setItem('token', response.token); // Armazena o token no localStorage
            navigate('/dashboard');
        } catch (err) {
            console.error("Erro ao fazer login:", err);
            setError('Erro ao fazer login. Por favor, tente novamente.');
        }
    };

    return (
        <Box w="40vw" h="90vh" backgroundColor="white" display="flex" justifyContent="center" borderRadius="40">
            <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
                <Text fontWeight="bold" fontSize="40px" color="#1E2547" mb={5}>ENTRAR</Text>
                {error && <Text color="red">{error}</Text>}
                <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" gap={20}>
                    <Box display="flex" w="100%" flexDir="column" gap={5}>
                        <Input placeholder="Digite seu e-mail" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <Input placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} type="password" />
                        <Button bgColor="#1E2547" _hover={{ bgColor: '#4D5476' }} color="white" onClick={handleLogin}>Entrar</Button>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Text>Não possui uma conta?</Text>
                        <Button bgColor="#1E2547" h="5" _hover={{ bgColor: '#4D5476' }} color="white" onClick={() => setIsLogin(false)}>Cadastre-se</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
