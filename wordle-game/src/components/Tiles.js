import React from 'react';
import { useGlobalContext } from "../context";


const Letter = ({row, tile}) => {

  const { board, currAttempt, correctWord } = useGlobalContext();

  const letter = board[row][tile];
  const correct = correctWord.toUpperCase()[tile] === letter;

  const presentInCorrectWord = !correct && letter !== "" && correctWord.toUpperCase().includes(letter);

  const state = currAttempt.row > row && (correct ? "green" : presentInCorrectWord ? "yellow" : "disabled");


  return (
    <div className="letter" id={state}>
      {letter}
    </div>
  );
};

const Row = ({row}) => {
  return (
    <div className='row'>
        <Letter row={row} tile={0}/>
        <Letter row={row} tile={1}/>
        <Letter row={row} tile={2}/>
        <Letter row={row} tile={3}/>
        <Letter row={row} tile={4}/>
    </div>
  );
};

const Tiles = () => {
  return (
    <div className='board'>
      <Row row={0} />
      <Row row={1} />
      <Row row={2} />
      <Row row={3} />
      <Row row={4} />
    </div>
  )
}

export default Tiles;