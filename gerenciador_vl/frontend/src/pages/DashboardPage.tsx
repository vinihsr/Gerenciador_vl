import React, { useEffect, useState } from 'react';
import { Box } from "@chakra-ui/react";
import SideBar from "../components/SideBarComponent";
import ClientComponent from '../components/ClientComponent';
import OrderComponent from '../components/PedidosComponent';
import { useNavigate } from 'react-router-dom';

export const DashboardPage = () => {
    const [currentSection, setCurrentSection] = useState('stats');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/'); // Redireciona para a página de login se não houver token
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove o token do localStorage ao deslogar
        navigate('/'); // Redireciona para a página de login após o logout
    };

    return (
        <Box display="flex">
            <SideBar setCurrentSection={setCurrentSection} handleLogout={handleLogout} />
            <Box flex="1" p="4">
                {currentSection === 'stats' && <StatsSection />}
                {currentSection === 'orders' && <OrdersSection />}
                {currentSection === 'clients' && <ClientsSection />}
                {currentSection === 'settings' && <SettingsSection />}
            </Box>
        </Box>
    );
};

// Placeholder components for different sections
const StatsSection = () => (
    <Box>
        <h1>Fake Stats</h1>
        <p>Display some fake stats here.</p>
    </Box>
);

const OrdersSection = () => (
    <Box>
        <OrderComponent />
    </Box>
);

const ClientsSection = () => (
    <Box>
        <ClientComponent />
    </Box>
);

const SettingsSection = () => (
    <Box>
        <h1>Configurações</h1>
        <p>Display settings information here.</p>
    </Box>
);
