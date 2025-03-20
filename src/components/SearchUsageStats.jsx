// src/components/SearchUsageStats.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Text, 
  Progress, 
  HStack, 
  VStack, 
  Badge,
  useColorModeValue
} from '@chakra-ui/react';
import { useSearch } from '../context/SearchContext';
import { formatDistanceToNow } from 'date-fns';

const SearchUsageStats = () => {
  const { searchesUsed, searchesLimit, resetTime } = useSearch();
  const [timeLeft, setTimeLeft] = useState('');
  
  const progressBg = useColorModeValue('gray.200', 'gray.700');
  const progressColorScheme = searchesUsed > 80 ? 'red' : searchesUsed > 50 ? 'yellow' : 'green';
  
  useEffect(() => {
    if (!resetTime) return;
    
    const updateTimeLeft = () => {
      if (Date.now() > resetTime) {
        setTimeLeft('Resetting...');
      } else {
        setTimeLeft(formatDistanceToNow(resetTime, { addSuffix: true }));
      }
    };
    
    updateTimeLeft();
    const interval = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [resetTime]);
  
  const percentUsed = (searchesUsed / searchesLimit) * 100;
  
  return (
    <Box 
      p={3} 
      borderRadius="md" 
      bg={useColorModeValue('white', 'gray.800')} 
      boxShadow="sm"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      maxW="sm"
      mx="auto"
      mt={4}
    >
      <VStack spacing={2} align="stretch">
        <HStack justify="space-between">
          <Text fontSize="sm" fontWeight="medium">Search Usage</Text>
          <Badge 
            variant="tech" 
            colorScheme={progressColorScheme}
          >
            {searchesUsed} / {searchesLimit}
          </Badge>
        </HStack>
        
        <Progress 
          value={percentUsed} 
          size="sm" 
          colorScheme={progressColorScheme}
          bg={progressBg}
          borderRadius="full"
        />
        
        <Text fontSize="xs" textAlign="right" color="gray.500">
          Resets: {timeLeft || 'After first search'}
        </Text>
      </VStack>
    </Box>
  );
};

export default SearchUsageStats;