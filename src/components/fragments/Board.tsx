import { useEffect } from "react";
import Square from "../elements/Square";
import CalculateWinner from "./CalculateWinner";

type BoardProps = {
  xIsNext: boolean;
  squares: Array<string | null>;
  onPlay: (nextSquares: Array<string | null>) => void;
  isAI: boolean;
};

function Board({ xIsNext, squares, onPlay, isAI }: BoardProps) {
  function handleClick(i: number) {
    if (squares[i] || CalculateWinner(squares)) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    onPlay(nextSquares);
  }

  useEffect(() => {
    if (isAI && !xIsNext) {
      const timer = setTimeout(() => {
        const availableMoves = squares.map((value, index) => (value === null ? index : -1)).filter(index => index !== -1);
        const randomMove = availableMoves[Math.floor(Math.random() * availableMoves.length)];
        if (randomMove !== undefined) {
          const nextSquares = squares.slice();
          nextSquares[randomMove] = "O";
          onPlay(nextSquares);
        }
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, squares, isAI, onPlay]);

  const winner = CalculateWinner(squares);
  const isDraw = !winner && squares.every(square => square !== null);
  const status = winner
    ? `Winner: ${winner}`
    : isDraw
    ? "Draw"
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <>
      <div className="text-2xl font-bold mb-4 text-center">{status}</div>
      <div className="flex flex-col items-center">
        {[0, 3, 6].map((rowStart) => (
          <div className="flex" key={rowStart}>
            {[0, 1, 2].map((col) => (
              <Square
                key={rowStart + col}
                value={squares[rowStart + col]}
                onSquareClick={() => handleClick(rowStart + col)}
              />
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

export default Board;
