// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { 
  Input, 
  InputGroup, 
  InputRightElement, 
  IconButton,
  Box,
  Heading,
  Text,
  useColorMode
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useSearch } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ showLogo = true, size = 'lg', width = 'full' }) => {
  const { handleSearch } = useSearch();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();
  const { colorMode } = useColorMode();

  const onSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
      navigate('/search');
    }
  };

  return (
    <Box as="form" onSubmit={onSubmit} width={width} mx="auto">
      {showLogo && (
        <Box textAlign="center" mb={4}>
          <Heading 
            fontFamily="heading" 
            fontWeight="bold" 
            fontSize="3xl"
            bgGradient={colorMode === 'dark' 
              ? 'linear(to-r, brand.200, brand.400)'
              : 'linear(to-r, brand.500, brand.700)'
            }
            bgClip="text"
            letterSpacing="tight"
            className="hover-scale"
            display="inline-block"
          >
            GT<sup>Search</sup>
          </Heading>
          <Text 
            fontSize="sm" 
            color={colorMode === 'dark' ? 'gray.400' : 'gray.600'}
            mt={1}
          >
            Semantic search for Georgia Tech resources
          </Text>
        </Box>
      )}
      
      <InputGroup size={size}>
        <Input
          placeholder="Search Georgia Tech..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          borderRadius="md"
          focusBorderColor="brand.500"
          variant="filled"
          fontFamily="body"
          _hover={{ bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'gray.100' }}
          _focus={{ 
            bg: colorMode === 'dark' ? 'whiteAlpha.300' : 'white',
            boxShadow: 'outline'
          }}
          boxShadow="sm"
          transition="all 0.2s"
        />
        <InputRightElement>
          <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            size={size === 'lg' ? 'md' : 'sm'}
            type="submit"
            variant="ghost"
            colorScheme="brand"
            _hover={{
              bg: colorMode === 'dark' ? 'whiteAlpha.200' : 'brand.50'
            }}
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default SearchBar;