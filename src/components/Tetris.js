import React, { useState } from "react";
import Stage from "./Stage";
import Display from "./Display";
import StartButton from "./StartButton";

import { StyledTetris, StyledTetrisWrapper } from "./styles/StyledTetris";
import { createStage } from "../gameHelpers";
import { usePlayer } from "../Hooks/usePlayer";
import { useStage } from "../Hooks/useStage";

const Tetris = () => {
  const [dropTime, setDropTime] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const [player] = usePlayer();
  const [stage, setStage] = useStage();

  console.log("re-render");
  const movePlayer = dir => {
    updatePlayerPos({ x: dir, y: 0 });
  };

  const startGame = () => {
    // Reset Everything
    setStage(createStage());
    resetPlayer();
  };

  const dropPlayer = () => {
    updatePlayerPos({ x: 0, y: 1, collided: false });
  };

  const move = ({ keyCode }) => {
    if (!gameOver) {
      if (keyCode === 37) {
        movePlayer(-1);
      } else if (keyCode === 39) {
        movePlayer(1);
      } else if (keyCode === 40) {
        dropPlayer(1);
      }
    }
  };
  return (
    <StyledTetrisWrapper role="button" tabIndex="0" onKeyDown={e => move(e)}>
      <StyledTetris>
        <Stage stage={stage} />
        <aside>
          {gameOver ? (
            <Display gameOver={gameOver} text="Game Over" />
          ) : (
            <div>
              <Display text="Score" />
              <Display text="Rows" />
              <Display text="Level" />
            </div>
          )}
          <StartButton onClick={startGame()} />
        </aside>
      </StyledTetris>
    </StyledTetrisWrapper>
  );
};

export default Tetris;
