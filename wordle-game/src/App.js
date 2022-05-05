import React from 'react';
import Loading from './components/Loading';
import Board from './components/Board';

import { useGlobalContext } from "./context";

import './App.scss';

const App = () => {
  const { loading, gameOver } = useGlobalContext();

  return (
    <div className="app">
      <nav>
        <h1>Wordle</h1>
      </nav>
      <div className='game'>
          {loading ? <Loading /> : <Board />}
      </div>
    </div>
  );
}

export default App;
