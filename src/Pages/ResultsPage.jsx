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
  Divider
} from '@chakra-ui/react';
import SearchBar from '../components/SearchBar';
import SearchResult from '../components/SearchResult';
import SearchUsageStats from '../components/SearchUsageStats';
import { useSearch } from '../context/SearchContext';

const ResultsPage = () => {
  const { searchResults, loading, error, searchQuery } = useSearch();

  return (
    <Container maxW="container.lg" p={4}>
      <VStack align="stretch" spacing={4}>
        <Box py={2}>
          <SearchBar showLogo={false} size="md" width="full" />
        </Box>
        
        <Divider />
        
        <Box mt={2}>
          {loading ? (
            <VStack py={10}>
              <Spinner size="xl" color="brand.500" thickness="4px" />
              <Text mt={4}>Searching...</Text>
            </VStack>
          ) : error ? (
            <Alert status="error" borderRadius="md" mt={4}>
              <AlertIcon />
              {error}
            </Alert>
          ) : (
            <>
              <Text mb={4} fontSize="sm" color="gray.500">
                Found {searchResults.length} results for "{searchQuery}"
              </Text>
              
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <SearchResult key={index} result={result} />
                ))
              ) : (
                <Text py={10} textAlign="center">
                  No results found. Try a different search term.
                </Text>
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