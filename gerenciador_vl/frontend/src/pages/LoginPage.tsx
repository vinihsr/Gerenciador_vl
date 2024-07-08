import React, { useState } from 'react';
import { Box, Img } from '@chakra-ui/react';
import { LoginComponent } from '../components/LoginComponent';
import { SignUpComponent } from '../components/SignUpComponent';
import logo from "../assets/1.png";

export const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <Box display="flex" alignItems="center" backgroundColor="#1E2547" height="100vh" position="relative">
      <Box w="60vw" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
        <Img src={logo} alt="Logo" maxH="80vh" />    
      </Box> 
      <Box display="flex" w="30vw" justifyContent="center" alignItems="center" height="100%">
        {isLogin ? <LoginComponent setIsLogin={setIsLogin} /> : <SignUpComponent setIsLogin={setIsLogin} />}
      </Box>
    </Box>
  );
};
