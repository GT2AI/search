// src/pages/HomePage.jsx
import React from 'react';
import { 
  Container, 
  VStack, 
  Box, 
  Text, 
  useColorMode, 
  SlideFade, 
  Heading,
  Link
} from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import SearchUsageStats from '../components/SearchUsageStats';

const HomePage = () => {
  const { colorMode } = useColorMode();

  return (
    <Container maxW="container.md" centerContent>
      <VStack 
        spacing={8} 
        w="full" 
        justify="center" 
        minH="100vh"
        py={10}
      >
        <SlideFade in={true} offsetY="30px">
          <Box w="full" maxW="md">
            <SearchBar showLogo={true} size="lg" />
            <SearchUsageStats />
            
            <Box 
              mt={8} 
              p={6} 
              borderRadius="lg" 
              bg={colorMode === 'dark' ? 'gray.800' : 'white'} 
              boxShadow="md"
              borderWidth="1px"
              borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
              textAlign="center"
            >
              <Heading as="h2" size="md" mb={4} fontFamily="heading">
                About GT<sup>Search</sup>
              </Heading>
              
              <Text mb={4}>
                GT^Search is a semantic search engine for Georgia Tech resources,
                helping you find relevant information quickly across GT websites.
              </Text>
              
              <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                Part of the{' '}
                <Link 
                  href="https://gt-ai-home.vercel.app" 
                  color={colorMode === 'dark' ? 'brand.300' : 'brand.500'}
                  fontWeight="medium"
                  isExternal
                >
                  GT^AI
                </Link> 
                {' '}family of student-built AI products.
              </Text>
            </Box>
          </Box>
        </SlideFade>
      </VStack>
    </Container>
  );
};

export default HomePage;