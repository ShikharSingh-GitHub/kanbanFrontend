import React from 'react';
import './App.css';
import Board from './components/Board';

const App = () => {
  return (
    <div className="app">
      <h1>Kanban Board</h1>
      <Board />
    </div>
  );
};

export default App;
