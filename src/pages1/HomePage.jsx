// src/pages/HomePage.jsx
import React from 'react';
import { Container, VStack, Box } from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import SearchUsageStats from '../components/SearchUsageStats';

const HomePage = () => {
  return (
    <Container maxW="container.md" centerContent>
      <VStack 
        spacing={8} 
        w="full" 
        justify="center" 
        minH="100vh"
        py={10}
      >
        <Box w="full" maxW="md">
          <SearchBar showLogo={true} size="lg" />
          <SearchUsageStats />
        </Box>
      </VStack>
    </Container>
  );
};

export default HomePage;