import React from "react";
import Tiles from "./Tiles";
import GameOver from "./GameOver";
import Keyboard from "./Keyboard";
import { useGlobalContext } from "../context";

const Board = () => {
  const { gameOver } = useGlobalContext();

  return (
    <>
      <Tiles />
      {gameOver.over ? <GameOver /> : <Keyboard />}
    </> 
  );
};

export default Board

