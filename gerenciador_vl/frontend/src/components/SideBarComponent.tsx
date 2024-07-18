import { Box, Button, Grid, Img, Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import logo from '../assets/2.png';
import {
  ArrowLeftIcon,
  EditIcon,
  InfoOutlineIcon,
  PlusSquareIcon,
  SettingsIcon,
  ViewIcon,
  CalendarIcon,
  RepeatIcon,
  AddIcon,
  HamburgerIcon,
} from "@chakra-ui/icons";

const SideBar = ({ setCurrentSection, handleLogout }) => {
    return (
        <Box display='flex' flexDir='column' w='15vw' h='100vh' alignItems='center' bgColor='#1E2547' justifyContent='space-between'>
            <Img src={logo} w='50%' my='10px' />
            <Grid color="#FFDF2B" mb='80%' alignItems='center' justifyContent='center' gap='20%'>
                <Button
                    w='100%'
                    bgColor='#1E2547'
                    _hover={{ bgColor: '#121628' }}
                    color="#FFDF2B"
                    border="2px solid #FFDF2B"
                    h='40px'
                    onClick={() => setCurrentSection('orders')}
                >
                    <EditIcon mr={10} />Pedidos
                </Button>
                <Button
                    w='100%'
                    bgColor='#1E2547'
                    _hover={{ bgColor: '#121628' }}
                    color="#FFDF2B"
                    border="2px solid #FFDF2B"
                    h='40px'
                    onClick={() => setCurrentSection('clients')}
                >
                    <PlusSquareIcon mr={10} />Clientes
                </Button>
                <Button
                    w='100%'
                    bgColor='#1E2547'
                    _hover={{ bgColor: '#121628' }}
                    color="#FFDF2B"
                    border="2px solid #FFDF2B"
                    h='40px'
                    onClick={() => setCurrentSection('stats')}
                >
                    <InfoOutlineIcon mr={10} />Estatísticas
                </Button>
                <Button
                    w='100%'
                    bgColor='#1E2547'
                    _hover={{ bgColor: '#121628' }}
                    color="#FFDF2B"
                    border="2px solid #FFDF2B"
                    h='40px'
                    onClick={() => setCurrentSection('settings')}
                >
                    <SettingsIcon mr={10} />Config.
                </Button>
                <Menu>
                    <MenuButton
                        as={Button}
                        w='100%'
                        h='40px'
                        bgColor='#1E2547'
                        _hover={{ bgColor: '#121628' }}
                        color="#FFDF2B"
                        border="2px solid #FFDF2B"
                    >
                        <HamburgerIcon mr={10} /> Mais
                    </MenuButton>
                    <MenuList bgColor='#1E2547' color="#FFDF2B" border="2px solid #FFDF2B">
                        <MenuItem bgColor='#1E2547' onClick={() => setCurrentSection('products')} icon={<AddIcon color="#FFDF2B" />}>
                            Produtos
                        </MenuItem>
                        <MenuItem bgColor='#1E2547' onClick={() => setCurrentSection('sales')} icon={<ViewIcon color="#FFDF2B" />}>
                            Vendas
                        </MenuItem>
                        <MenuItem bgColor='#1E2547' onClick={() => setCurrentSection('expenses')} icon={<CalendarIcon color="#FFDF2B" />}>
                            Despesas
                        </MenuItem>
                        <MenuItem bgColor='#1E2547' onClick={() => setCurrentSection('returns')} icon={<RepeatIcon color="#FFDF2B" />}>
                            Devoluções
                        </MenuItem>
                    </MenuList>
                </Menu>
            </Grid>
            <Button
                w='40%'
                h='40px'
                mb='20px'
                bgColor='#FFDF2B'
                _hover={{ bgColor: '#FFD700' }}
                onClick={handleLogout}
            >
                <ArrowLeftIcon mr={10} /> Sair
            </Button>
        </Box>
    );
};

export default SideBar;
