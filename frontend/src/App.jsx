import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './pages/Layout';
import SupplyChain from './components/SupplyChain'; // assuming this is the correct path
import Coa from './components/Coa';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout component will always be rendered */}
        <Route element={<Layout />}>
          <Route
            path="/"
            element={<SupplyChain />}
          />
          <Route
            path="/coa"
            element={<Coa />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
