// src/components/SearchBar.jsx
import React, { useState } from 'react';
import { 
  Input, 
  InputGroup, 
  InputRightElement, 
  IconButton,
  Box,
  Heading
} from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { useSearch } from '../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = ({ showLogo = true, size = 'lg', width = 'full' }) => {
  const { handleSearch } = useSearch();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

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
        <Heading 
          textAlign="center" 
          mb={4} 
          fontFamily="mono" 
          color="gtTech"
        >
          GT<sup>Search</sup>
        </Heading>
      )}
      <InputGroup size={size}>
        <Input
          placeholder="Search Georgia Tech..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          borderRadius="md"
          focusBorderColor="brand.500"
          variant="filled"
          _hover={{ bg: 'whiteAlpha.300' }}
          _focus={{ bg: 'whiteAlpha.400' }}
        />
        <InputRightElement>
          <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            size={size === 'lg' ? 'md' : 'sm'}
            type="submit"
            variant="ghost"
            colorScheme="brand"
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default SearchBar;