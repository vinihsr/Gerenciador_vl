import React, { useState } from 'react';
import { Box } from "@chakra-ui/react";
import SideBar from "../components/SideBarComponent";
import ClientComponent from '../components/ClientComponent';
import OrderComponent from '../components/PedidosComponent';

export const DashboardPage = () => {
    const [currentSection, setCurrentSection] = useState('stats'); // Default section

    return (
        <Box display="flex">
            <SideBar setCurrentSection={setCurrentSection} />
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
        <OrderComponent/>
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
