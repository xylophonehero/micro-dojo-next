import { useRouter } from "next/router"
import { firebase } from "../src/initFirebase"

const db = firebase.database()

export default function Home()
{
  const router = useRouter()

  function handleSubmit(e: React.FormEvent<HTMLFormElement>)
  {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    console.log(data)
    const gamesRef = db.ref("games")
    const newGameRef = gamesRef.push()
    newGameRef.set({
      player1Name: data.player1,
      player2Name: data.player2,
      first: 0,
      turn: 0,
      baseBoard: [
        "G", "F/F", "F",
        "G/G", "A/A", "G/F",
        "B", "GF/B", "A",
      ],
      board: [
        "sumo", "", "ninja",
        "", "", "",
        "geisha", "", "warrior",
      ],
    })
    router.push(`/games/${newGameRef.key}`)
  }
  return (
    <form onSubmit={handleSubmit} >
      <input name="player1" />
      <input name="player2" />
      <button type="submit">Begin</button>
    </form>
  )
}
