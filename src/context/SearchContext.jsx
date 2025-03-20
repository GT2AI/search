// src/context/SearchContext.jsx
import React, { createContext, useState, useEffect, useContext } from 'react';

const SearchContext = createContext();

export const useSearch = () => useContext(SearchContext);

export const SearchProvider = ({ children }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchesUsed, setSearchesUsed] = useState(0);
  const [searchesLimit] = useState(100);
  const [resetTime, setResetTime] = useState(null);

  // Load search usage from localStorage on initial load
  useEffect(() => {
    const storedSearchesUsed = localStorage.getItem('searchesUsed');
    const storedResetTime = localStorage.getItem('resetTime');
    
    if (storedSearchesUsed) {
      setSearchesUsed(parseInt(storedSearchesUsed, 10));
    }
    
    if (storedResetTime) {
      setResetTime(parseInt(storedResetTime, 10));
    }
  }, []);

  // Initialize reset time if it doesn't exist and a search is made
  const initializeResetTimeIfNeeded = () => {
    if (!resetTime && searchesUsed === 0) {
      const newResetTime = Date.now() + 24 * 60 * 60 * 1000; // 24 hours from now
      setResetTime(newResetTime);
      localStorage.setItem('resetTime', newResetTime.toString());
    }
  };

  // Check if reset time has passed and reset counters if needed
  useEffect(() => {
    if (resetTime && Date.now() > resetTime) {
      setSearchesUsed(0);
      localStorage.setItem('searchesUsed', '0');
      
      const newResetTime = Date.now() + 24 * 60 * 60 * 1000;
      setResetTime(newResetTime);
      localStorage.setItem('resetTime', newResetTime.toString());
    }

    const interval = setInterval(() => {
      if (resetTime && Date.now() > resetTime) {
        setSearchesUsed(0);
        localStorage.setItem('searchesUsed', '0');
        
        const newResetTime = Date.now() + 24 * 60 * 60 * 1000;
        setResetTime(newResetTime);
        localStorage.setItem('resetTime', newResetTime.toString());
      }
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [resetTime]);

  const handleSearch = async (query) => {
    if (searchesUsed >= searchesLimit) {
      setError("Daily search limit reached. Please wait for the counter to reset.");
      return;
    }

    initializeResetTimeIfNeeded();
    
    setSearchQuery(query);
    setLoading(true);
    setError(null);

    try {
      // Replace with your actual Google Custom Search API key and engine ID
      const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;
      const SEARCH_ENGINE_ID = import.meta.env.VITE_SEARCH_ENGINE_ID;
      
      const response = await fetch(
        `https://www.googleapis.com/customsearch/v1?key=${API_KEY}&cx=${SEARCH_ENGINE_ID}&q=${encodeURIComponent(query)}`
      );
      
      if (!response.ok) {
        throw new Error('Search failed');
      }
      
      const data = await response.json();
      
      // Increment searches used
      const newSearchesUsed = searchesUsed + 1;
      setSearchesUsed(newSearchesUsed);
      localStorage.setItem('searchesUsed', newSearchesUsed.toString());
      
      setSearchResults(data.items || []);
    } catch (error) {
      console.error('Search error:', error);
      setError('An error occurred while searching. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const value = {
    searchQuery,
    searchResults,
    loading,
    error,
    handleSearch,
    searchesUsed,
    searchesLimit,
    resetTime
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
};