import React from 'react';
import { useGlobalContext } from "../context";

const GameOver = () => {
    const { gameOver, currAttempt, correctWord} = useGlobalContext();

    return (
        <div className="gameOver">
        <h3>
            {gameOver.win ? "You Correctly Guessed the Wordle" : "You Failed to Guess the Word"}
        </h3>
        <h1>Correct Word: {correctWord.toUpperCase()}</h1>
        </div>
    )
}

export default GameOver