import { firebase } from "../../src/initFirebase";
import { GetServerSideProps } from "next";
import Image from "next/image"
import { useEffect, useRef, useState } from "react";
import Meeple from "@/components/Meeple";
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from "react-dnd-html5-backend";
import { AnimateSharedLayout, PanInfo } from "framer-motion";
import Cell from "@/components/Cell";
import { useDragging } from "context/DraggingContext";

const db = firebase.database()
interface IProps
{
  id: string;
}

// type IRow = [string, string, string];

interface IGame
{
  player1Name: string;
  player2Name: string;
  first: string;
  turn: string;
  baseBoard: string[];
  board: string[];
}

export default function Game({ id }: IProps)
{
  const { setCells } = useDragging()
  const [game, setGame] = useState<IGame | null>(null)
  const cell0 = useRef<HTMLDivElement>(null)
  const cell3 = useRef<HTMLDivElement>(null)
  const cell1 = useRef<HTMLDivElement>(null)
  const cell2 = useRef<HTMLDivElement>(null)
  const cell4 = useRef<HTMLDivElement>(null)
  const cell5 = useRef<HTMLDivElement>(null)
  const cell6 = useRef<HTMLDivElement>(null)
  const cell7 = useRef<HTMLDivElement>(null)
  const cell8 = useRef<HTMLDivElement>(null)
  const cells = [
    cell0, cell1, cell2,
    cell3, cell4, cell5,
    cell6, cell7, cell8
  ]
  useEffect(() =>
  {
    setCells(cells)
  }, [])


  useEffect(() =>
  {
    const ref = db.ref(`games/${id}`)

    ref.on("value", (snapshot) =>
    {
      setGame(snapshot.val())
    })

    return () => ref.off()
  }, [id])

  if (!game) return <div>Loading...</div>

  return <div className="flex flex-col items-center ">
    <h1>{game.player1Name}&apos;s turn</h1>

    <AnimateSharedLayout>
      <div className="border-2 border-white grid grid-cols-3">
        {game.board.map((cell, index) => (
          <Cell
            key={index}
            index={index}
            value={cell}
            ref={cells[index]}
          />
          // <div key={`row-${rowIndex}`} className="flex flex-row z-10">
          // {/* {row.map((col, colIndex) => ( */}
          // <Cell
          //   key={index}
          //   index={`cell:${index}`}
          //   value={cell}
          //   ref={cells[index]}
          // />
          // <div
          //   key={`${rowIndex}-${colIndex}`}
          //   className="bg-yellow-200 border-2 border-white h-28 w-28"
          // >
          //   {col !== "" && <Meeple name={col} />}
          // </div>
          //   ))}
          // </div>
        ))}
      </div>
    </AnimateSharedLayout>

  </div>
}

export const getServerSideProps: GetServerSideProps = async ({ query }) =>
{
  return { props: { id: query.id } };
};