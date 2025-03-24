// src/pages/ResultsPage.jsx
import React from 'react';
import { 
  Container, 
  VStack, 
  Box, 
  Text, 
  Spinner, 
  Alert, 
  AlertIcon,
  Divider,
  Heading,
  HStack,
  Icon,
  useColorMode,
  SlideFade
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import SearchUsageStats from '../components/SearchUsageStats';
import { useSearch } from '../context/SearchContext';

const ResultsPage = () => {
  const { searchResults, loading, error, searchQuery } = useSearch();
  const { colorMode } = useColorMode();

  return (
    <Container maxW="container.lg" p={4}>
      <VStack align="stretch" spacing={4}>
        <Box py={3}>
          <SearchBar showLogo={false} size="md" width="full" />
        </Box>
        
        <Divider />
        
        <Box mt={2}>
          {loading ? (
            <VStack py={10} spacing={4}>
              <Spinner 
                size="xl" 
                color="brand.500" 
                thickness="4px" 
                speed="0.8s"
                emptyColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
              />
              <Text mt={2} fontFamily="mono">Searching...</Text>
            </VStack>
          ) : error ? (
            <Alert 
              status="error" 
              borderRadius="md" 
              mt={4}
              variant={colorMode === 'dark' ? 'subtle' : 'left-accent'}
            >
              <AlertIcon />
              {error}
            </Alert>
          ) : (
            <>
              <HStack mb={6} spacing={4} align="center">
                <Icon as={FaSearch} color="brand.500" />
                <Heading 
                  as="h2" 
                  size="md" 
                  fontFamily="heading"
                >
                  Search Results
                </Heading>
                <Text 
                  fontSize="sm" 
                  color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
                  fontWeight="medium"
                >
                  Found {searchResults.length} results for "{searchQuery}"
                </Text>
              </HStack>
              
              {searchResults.length > 0 ? (
                <VStack spacing={4} align="stretch">
                  {searchResults.map((result, index) => (
                    <SlideFade 
                      key={index} 
                      in={true} 
                      offsetY="20px"
                      delay={0.1 * index}
                    >
                      <SearchResult result={result} />
                    </SlideFade>
                  ))}
                </VStack>
              ) : (
                <Box 
                  py={10} 
                  textAlign="center"
                  bg={colorMode === 'dark' ? 'gray.800' : 'gray.50'}
                  borderRadius="lg"
                  borderWidth="1px"
                  borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
                  p={8}
                >
                  <Text fontSize="lg" mb={2}>
                    No results found for "{searchQuery}"
                  </Text>
                  <Text fontSize="sm" color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}>
                    Try a different search term or check your spelling
                  </Text>
                </Box>
              )}
            </>
          )}
        </Box>
        
        <SearchUsageStats />
      </VStack>
    </Container>
  );
};

export default ResultsPage;