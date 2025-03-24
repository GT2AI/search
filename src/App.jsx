// src/App.jsx
import React from 'react';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ResultsPage from './pages/ResultsPage';
import { SearchProvider } from './context/SearchContext';
import theme from './theme';
import './index.css';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
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