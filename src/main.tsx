// index.tsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Dashboard from './dashboard/Dashboard';
import FlowerShopLanding from './components/FlowerShopLanding';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}

const root = createRoot(rootElement);

root.render(
  <React.StrictMode>
    <BrowserRouter basename="/a14u">
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/flower-shop" element={<FlowerShopLanding />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
