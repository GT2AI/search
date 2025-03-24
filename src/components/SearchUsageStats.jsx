// src/components/SearchUsageStats.jsx
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Text, 
  Progress, 
  HStack, 
  VStack, 
  Badge,
  Icon,
  Flex,
  useColorModeValue
} from '@chakra-ui/react';
import { useSearch } from '../context/SearchContext';
import { formatDistanceToNow } from 'date-fns';
import { FiClock, FiBarChart2 } from 'react-icons/fi';

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
      p={4} 
      borderRadius="lg" 
      bg={useColorModeValue('white', 'gray.800')} 
      boxShadow="md"
      borderWidth="1px"
      borderColor={useColorModeValue('gray.200', 'gray.700')}
      maxW="sm"
      mx="auto"
      mt={4}
      transition="all 0.3s"
      _hover={{
        boxShadow: 'lg',
        borderColor: useColorModeValue('brand.200', 'brand.700')
      }}
    >
      <VStack spacing={3} align="stretch">
        <Flex justify="space-between" align="center">
          <HStack>
            <Icon as={FiBarChart2} color={`${progressColorScheme}.500`} />
            <Text fontSize="sm" fontWeight="medium" fontFamily="heading">Search Usage</Text>
          </HStack>
          <Badge 
            variant="tech" 
            colorScheme={progressColorScheme}
            fontFamily="mono"
            px={2}
          >
            {searchesUsed} / {searchesLimit}
          </Badge>
        </Flex>
        
        <Progress 
          value={percentUsed} 
          size="sm" 
          colorScheme={progressColorScheme}
          bg={progressBg}
          borderRadius="full"
        />
        
        <Flex 
          fontSize="xs"
          color="gray.500"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Icon as={FiClock} mr={1} />
          <Text>
            Resets: {timeLeft || 'After first search'}
          </Text>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SearchUsageStats;