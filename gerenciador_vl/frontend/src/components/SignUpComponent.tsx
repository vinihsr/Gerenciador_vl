import { Box, Text, Input, Button } from "@chakra-ui/react";

export const SignUpComponent = ({ setIsLogin }) => {
    return (
        <Box w="40vw" h="90vh" backgroundColor="white" display="flex" justifyContent="center" borderRadius="40">
            <Box display="flex" flexDir="column" justifyContent="center" alignItems="center">
                <Text fontWeight="bold" fontSize="40px" color="#1E2547" mb={5}>SIGN UP</Text>
                <Box display="flex" flexDir="column" justifyContent="center" alignItems="center" gap={20} >
                    <Box display="flex" w="100%" flexDir="column" gap={5}>
                        <Input placeholder="Digite seu nome"></Input>
                        <Input placeholder="Digite seu e-mail"></Input>
                        <Input placeholder="Digite sua senha"></Input>
                        <Button bgColor="#1E2547" _hover={{ bgColor: '#4D5476' }} color="white">Cadastrar</Button>
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
