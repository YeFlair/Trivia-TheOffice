import React from 'react';
import TriviaGame from './components/TriviaGame';
import Leaderboard from './components/Leaderboard';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>The Office Trivia Game</h1>
      </header>
      <main>
        <TriviaGame />
        <Leaderboard />
      </main>
    </div>
  );
}

export default App;
