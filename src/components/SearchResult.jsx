// src/components/SearchResult.jsx
import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Link, 
  VStack, 
  HStack, 
  Icon,
  Badge,
  useColorMode 
} from '@chakra-ui/react';
import { FiExternalLink } from 'react-icons/fi';

const SearchResult = ({ result }) => {
  const { colorMode } = useColorMode();
  
  return (
    <Box 
      mb={6} 
      p={4} 
      borderRadius="lg"
      borderWidth="1px"
      borderColor={colorMode === 'dark' ? 'gray.700' : 'gray.200'}
      transition="all 0.2s"
      _hover={{
        transform: 'translateY(-2px)',
        boxShadow: 'md',
        borderColor: colorMode === 'dark' ? 'brand.700' : 'brand.200'
      }}
    >
      <VStack align="flex-start" spacing={2}>
        <HStack>
          <Text 
            fontSize="sm" 
            color={colorMode === 'dark' ? 'gray.400' : 'gray.500'}
            fontFamily="mono"
          >
            {result.displayLink}
          </Text>
          {/* Optional badge for result type - could be determined by URL patterns */}
          {result.displayLink.includes('gatech.edu') && (
            <Badge 
              variant="tech" 
              fontFamily="mono"
            >
              official
            </Badge>
          )}
        </HStack>
        
        <Link 
          href={result.link} 
          isExternal 
          color={colorMode === 'dark' ? 'brand.300' : 'brand.600'} 
          _hover={{ 
            textDecoration: 'none',
            color: colorMode === 'dark' ? 'brand.200' : 'brand.700'
          }}
        >
          <Heading 
            as="h3" 
            size="md" 
            fontWeight="semibold"
            fontFamily="heading"
            display="flex"
            alignItems="center"
          >
            {result.title}
            <Icon as={FiExternalLink} ml={2} boxSize={4} opacity={0.7} />
          </Heading>
        </Link>
        
        <Text 
          fontSize="md"
          color={colorMode === 'dark' ? 'gray.300' : 'gray.700'}
        >
          {result.snippet}
        </Text>
      </VStack>
    </Box>
  );
};

export default SearchResult;