import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows = 3, ncols = 3, chanceLightStartsOn = .5 }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    const initialBoard = Array.from({ length: nrows })
      // create nested array from num cols
      .map(() => Array.from({ length: ncols })
        // fill the spaces with true or false
        .map(() => Math.random() > chanceLightStartsOn))
    return initialBoard;
  }

  function hasWon() {
    // check the board in state to determine whether the player has won.
    return board.every((arr) => arr.every(bool => !bool))
  }

  function flipCellsAround(coord) {
    setBoard(oldBoard => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it
        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // Make a (deep) copy of the oldBoard
      const boardCopy = oldBoard.map(arr => [...arr])

      // in the copy, flip this cell and the cells around it
      flipCell(y, x, boardCopy)
      flipCell(y - 1, x, boardCopy)
      flipCell(y, x - 1, boardCopy)
      flipCell(y + 1, x, boardCopy)
      flipCell(y, x + 1, boardCopy)

      // return the copy
      return boardCopy
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  return hasWon() ? <h1>You won!</h1>
    // make table board
    : (
      <table className="Board">
        <tbody>
        {board.map((row, x) => (
          <tr className="Board-Row" key={`Row-${x}`}>
            {row.map((cell, y) => (<Cell flipCellsAroundMe={() => flipCellsAround(`${x}-${y}`)} isLit={cell} key={`${x}-${y}`} />))}
          </tr>
        ))}
        </tbody>
      </table>
    )
}

export default Board;
