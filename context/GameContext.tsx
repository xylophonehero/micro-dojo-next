import { createContext, useContext, useState } from "react";

interface IGameContext
{
  game: IGame | null
  setGame: React.Dispatch<React.SetStateAction<IGame | null>>
}

interface IGame
{
  player1Name: string;
  player2Name: string;
  first: string;
  turn: string;
  baseBoard: string[];
  board: string[];
}

const GameContext = createContext<IGameContext | null>(null)

const GameContextProvider: React.FC = ({ children }) =>
{
  const [game, setGame] = useState<IGame | null>(null)
  const [cells, setCells] = useState()

  return (
    <GameContext.Provider value={{ game, setGame }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () =>
{
  const context = useContext(GameContext)
  if (!context) throw new Error("useGame must be used within a context provider")
  return context
}

export default GameContextProvider