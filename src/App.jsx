import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Board from './components/Board';

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <ProtectedRoute>
          <Header />
          <main className="main-content">
            <Board />
          </main>
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
};

export default App;
