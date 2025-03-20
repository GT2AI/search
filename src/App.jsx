// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import { SearchProvider } from './context/SearchContext';
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <SearchProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/search" element={<ResultsPage />} />
          </Routes>
        </Router>
      </SearchProvider>
    </ChakraProvider>
  );
}

export default App;