import { Box, Text, Input, Button, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const LoginComponent = ({ setIsLogin }) => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(true);

    const handleTogglePassword = () => setShowPassword(!showPassword);

    const Login = () => {
        navigate('/dashboard');
    };

    return (
        <Box w="40vw" h="90vh" bg="white" display="flex" justifyContent="center" borderRadius="40" boxShadow="xl" p={6}>
            <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
                <Text fontWeight="bold" fontSize="40px" color="#1E2547" mb={5}>LOGIN</Text>
                <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" gap={8} >
                    <Box display="flex" w="100%" flexDir="column" gap={5}>
                        <Input placeholder="Digite seu e-mail" size="lg" />
                        <InputGroup size="lg">
                            <Input
                                type={showPassword ? "password" : "text"}
                                placeholder="Digite sua senha"
                                pr="4.5rem"
                            />
                            <InputRightElement width="4.5rem">
                                <Button h="1.75rem" size="sm" onClick={handleTogglePassword} bg="transparent">
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </Button>
                            </InputRightElement>
                        </InputGroup>
                        <Button onClick={Login} bg="#1E2547" _hover={{ bg: '#4D5476' }} color="white" size="lg">Entrar</Button>
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Text>Não possui uma conta?</Text>
                        <Button bg="#1E2547" h="5" _hover={{ bg: '#4D5476' }} color="white" onClick={() => setIsLogin(false)}>Cadastre-se</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
