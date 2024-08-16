import { useState } from "react";
import Board from "./Board";

export default function Game() {
  const [history, setHistory] = useState<Array<Array<string | null>>>([
    Array(9).fill(null),
  ]);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAI, setIsAI] = useState(false);
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function jumpTo(nextMove: number) {
    const newHistory = history.slice(0, nextMove + 1);
    setHistory(newHistory);
    setCurrentMove(nextMove);
  }

  function handlePlay(nextSquares: Array<string | null>) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  const moves = history.map((_squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : "Go to game start";
    return (
      <li key={move} className="mb-1">
        <button
          onClick={() => jumpTo(move)}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none">
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="p-4 max-w-sm mx-auto">
      <div className="mb-4 flex justify-center space-x-4">
        <button
          onClick={() => setIsAI(false)}
          className={`px-4 py-2 rounded ${
            !isAI ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
          }`}>
          Play Manually
        </button>
        <button
          onClick={() => setIsAI(true)}
          className={`px-4 py-2 rounded ${
            isAI ? "bg-blue-500 text-white" : "bg-gray-300 text-gray-800"
          }`}>
          Play vs AI
        </button>
      </div>
      <Board
        xIsNext={xIsNext}
        squares={currentSquares}
        onPlay={handlePlay}
        isAI={isAI}
      />
      <ol className="mt-4">{moves}</ol>
    </div>
  );
}
