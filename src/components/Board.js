import React, { useState, useEffect } from "react";
import createBoard from "../util/createBoard";
import Cell from "../components/Cell";
import { revealed } from "../util/reveal";
import Modal from "../components/Modal";
import Timer from "../components/Timer";

const Board = () => {
  const [grid, setGrid] = useState([]);
  const [nonMineCounting, setNonMineCounting] = useState(0);
  const [mineLocationsSeek, setMineLocationsSeek] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  // ComponentDidMount
  useEffect(() => {
    freshBoard();
  }, []);

  // TryAgain const
  const freshBoard = () => {
    const newBoard = createBoard(10, 15, 20);
    setNonMineCounting(10 * 10 - 15);
    setMineLocationsSeek(newBoard.mineLocation);
    setGrid(newBoard.board);
  };

  const restartGame = () => {
    freshBoard();
    setGameOver(false);
  };
  // On Right Click / flag Cell
  const updateFlag = (e, x, y) => {
    //  to not have a dropdown on the right click
    e.preventDefault();
    // Deep copy of a state
    let newGrid = JSON.parse(JSON.stringify(grid));
    console.log(newGrid[x][y]);
    newGrid[x][y].flagged = true;
    setGrid(newGrid);
  };

  // Reveal Cell
  const revealCell = (x, y) => {
    if (grid[x][y.revealed || gameOver]) {
      return;
    }
    let newGrid = JSON.parse(JSON.stringify(grid));
    if (newGrid[x][y].value === "X") {
      alert("mine found");
      for (let i = 0; i < mineLocationsSeek.length; i++) {
        newGrid[mineLocationsSeek[i][0]][
          mineLocationsSeek[i][1]
        ].revealed = true;
      }
      setGrid(newGrid);
      setGameOver(true);
    } else {
      let newRevealedBoard = revealed(newGrid, x, y, nonMineCounting);
      setGrid(newRevealedBoard.arr);
      setNonMineCounting(newRevealedBoard.newNonMinesCount);
      if (newRevealedBoard.newNonMinesCount === 0) {
        setGameOver(true);
      }
    }
  };

  return (
    <div>
      <p>MineSweeper</p>
      <Timer />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {gameOver && <Modal restartGame={restartGame} />}
        {grid.map((singleRow, index1) => {
          return (
            <div style={{ display: "flex" }} key={index1}>
              {singleRow.map((singleBlock, index2) => {
                return (
                  <Cell
                    revealCell={revealCell}
                    details={singleBlock}
                    updateFlag={updateFlag}
                    key={index2}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
