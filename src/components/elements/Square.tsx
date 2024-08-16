type SquareProps = {
  value: string | null;
  onSquareClick: () => void;
};

function Square({ value, onSquareClick }: SquareProps) {
  return (
    <button
      className="w-16 h-16 border-2 border-gray-800 bg-white text-2xl font-bold hover:bg-gray-200 focus:outline-none"
      onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
