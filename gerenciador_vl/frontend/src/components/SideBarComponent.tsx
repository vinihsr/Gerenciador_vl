import { Box, Button, Grid, Img } from "@chakra-ui/react";
import logo from '../assets/2.png';
import { useNavigate } from "react-router-dom";
import { ArrowLeftIcon, EditIcon, InfoOutlineIcon, PlusSquareIcon, SettingsIcon } from "@chakra-ui/icons";

const SideBar = ({ setCurrentSection }) => {
    const navigate = useNavigate();

    const Logout = () => {
        navigate('/')
    }

    return (
        <Box display='flex' flexDir='column' w='15vw' h='100vh' alignItems='center' bgColor='#1E2547'>
            <Img src={logo} w='50%' my='20%' />
            <Grid color="#FFDF2B" alignItems='center' justifyContent='center' justifyItems='center' gap='20%'>
                <Button w='150px' bgColor='#1E2547' _hover={{ bgColor: '#121628' }} color="#FFDF2B" border="#FFDF2B 3px solid" h='40px' onClick={() => setCurrentSection('orders')}><EditIcon mr={10} />Pedidos</Button>
                <Button w='150px' bgColor='#1E2547' _hover={{ bgColor: '#121628' }} color="#FFDF2B" border="#FFDF2B 3px solid" h='40px' onClick={() => setCurrentSection('clients')}><PlusSquareIcon mr={10} />Clientes</Button>
                <Button w='150px' bgColor='#1E2547' _hover={{ bgColor: '#121628' }} color="#FFDF2B" border="#FFDF2B 3px solid" h='40px' onClick={() => setCurrentSection('stats')}><InfoOutlineIcon mr={10} />Estatisticas</Button>
                <Button w='150px' bgColor='#1E2547' _hover={{ bgColor: '#121628' }} color="#FFDF2B" border="#FFDF2B 3px solid" h='40px' onClick={() => setCurrentSection('settings')}><SettingsIcon mr={10} />Config.</Button>
                <Button bgColor='#FFDF2B' mt='4vh' w='6vw' fontSize='small' onClick={Logout}><ArrowLeftIcon mr={10}/>Sair</Button>
            </Grid>
        </Box>
    );
};

export default SideBar;
