import React from 'react';
import { useGlobalContext } from "../context";

const GameOver = () => {
    const { gameOver, currAttempt, correctWord} = useGlobalContext();

    return (
        <div className="gameOver">
        <h3>
            {gameOver.win ? "You Correctly Guessed the Wordle" : "You Failed to Guess the Word"}
        </h3>
        <h1>Correct Word: {correctWord}</h1>
        {gameOver.win && (<h3>You guessed in {currAttempt.row} attempts</h3>)}
        </div>
    )
}

export default GameOver