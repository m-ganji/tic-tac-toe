import React, { useState } from "react";
import Square from "./Square";

const WINNING_COMBINATIONS: number[][] = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8], // Horizontal wins
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8], // Vertical wins
  [0, 4, 8],
  [2, 4, 6], // Diagonal wins
];

const INITIAL_GAME_STATE: string[] = ["", "", "", "", "", "", "", "", ""];

function App(): JSX.Element {
  const [gameState, setGameState] = useState<string[]>(INITIAL_GAME_STATE);
  const [currentPlayer, setCurrentPlayer] = useState<string>("X");
  const [winner, setWinner] = useState<string | null>(null);

  const handleSquareClick = (index: number): void => {
    if (gameState[index] === "" && !winner) {
      const newGameState: string[] = [...gameState];
      newGameState[index] = currentPlayer;
      setGameState(newGameState);

      const winningPlayer: string | null = checkWinner(newGameState);
      if (winningPlayer) {
        setWinner(winningPlayer);
      } else {
        setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
      }
    }
  };

  const checkWinner = (currentGameState: string[]): string | null => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (
        currentGameState[a] &&
        currentGameState[a] === currentGameState[b] &&
        currentGameState[a] === currentGameState[c]
      ) {
        return currentGameState[a]; // Return the winning player ("X" or "O")
      }
    }
    return null; // No winner yet
  };

  const resetGame = (): void => {
    setGameState(INITIAL_GAME_STATE);
    setCurrentPlayer("X");
    setWinner(null);
  };

  return (
    <div className="h-full p-8 text-slate-800 bg-gradient-to-r from-cyan-500 to-blue-500">
      <h1 className="text-center text-5xl mb-4 font-display text-white ">
        Tic Tac Toe
      </h1>
      <div className="grid grid-cols-3 gap-3 mx-auto">
        {gameState.map((player, index) => (
          <Square
            key={index}
            index={index}
            player={player}
            onClick={() => handleSquareClick(index)}
          >
            {player}
          </Square>
        ))}
      </div>
      {winner && (
        <div className="text-center text-xl font-bold text-white mt-4">
          Player {winner} wins!
        </div>
      )}
      {!winner && gameState.every((square) => square !== "") && (
        <div className="text-center text-xl font-bold text-white mt-4">
          It's a draw!
        </div>
      )}
      <button
        onClick={resetGame}
        className="bg-white text-blue-500 text-lg font-semibold p-2 rounded-md mt-4 mx-auto block"
      >
        Restart Game
      </button>
    </div>
  );
}

export default App;
