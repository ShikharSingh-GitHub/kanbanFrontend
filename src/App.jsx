import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import UserProfile from './components/UserProfile';
import Board from './components/Board';

const App = () => {
  return (
    <AuthProvider>
      <div className="app">
        <ProtectedRoute>
          <div className="app-header">
            <h1>Kanban Board</h1>
            <UserProfile />
          </div>
          <Board />
        </ProtectedRoute>
      </div>
    </AuthProvider>
  );
};

export default App;
