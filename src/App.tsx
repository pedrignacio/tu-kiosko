import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import OrderConfirmation from './pages/OrderConfirmation';
import Checkout from './components/Checkout';
import NotFound from './pages/NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Toaster 
          position="top-right"
          reverseOrder={false}
          toastOptions={{
            duration: 3000,
            style: {
              background: '#363636',
              color: '#fff',
              padding: '16px',
              borderRadius: '10px',
              fontSize: '16px',
            },
            success: {
              duration: 3000,
              iconTheme: {
                primary: '#4ade80',
                secondary: '#fff',
              },
            },
            error: {
              duration: 4000,
              iconTheme: {
                primary: '#ef4444',
                secondary: '#fff',
              },
            },
          }}
        />
        
        <Routes>
          <Route path="/" element={<><Header /><div className="flex-grow"><Home /></div><Footer /></>} />
          <Route path="/product/:id" element={<><Header /><div className="flex-grow"><ProductDetail /></div><Footer /></>} />
          <Route path="/checkout" element={<><Header /><div className="flex-grow"><Checkout /></div><Footer /></>} />
          <Route path="/order-confirmation" element={<><Header /><div className="flex-grow"><OrderConfirmation /></div><Footer /></>} />
          {/* 404 - Debe ser la última ruta */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;