// src/components/SearchResult.jsx
import React from 'react';
import { Box, Heading, Text, Link, VStack } from '@chakra-ui/react';

const SearchResult = ({ result }) => {
  return (
    <Box mb={6}>
      <VStack align="flex-start" spacing={1}>
        <Text fontSize="sm" color="gray.500">
          {result.displayLink}
        </Text>
        <Link 
          href={result.link} 
          isExternal 
          color="brand.500" 
          _hover={{ textDecoration: 'underline' }}
        >
          <Heading as="h3" size="md" fontWeight="semibold">
            {result.title}
          </Heading>
        </Link>
        <Text fontSize="md">
          {result.snippet}
        </Text>
      </VStack>
    </Box>
  );
};

export default SearchResult;