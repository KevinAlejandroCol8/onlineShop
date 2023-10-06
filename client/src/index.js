import React from 'react';
import ReactDOM from 'react-dom'; // Importa ReactDOM desde react-dom
import App from './App';
import { AuthProvider } from './hoocks/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthProvider> {/* Envuelve tu aplicación con el AuthProvider */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);