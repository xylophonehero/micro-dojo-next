import '../styles/globals.css'
import type { AppProps } from 'next/app'
import DraggingContextProvider from 'context/DraggingContext'
import GameContextProvider from 'context/GameContext'

function MyApp({ Component, pageProps }: AppProps)
{
  return (
    <GameContextProvider>
      <DraggingContextProvider>
        <Component {...pageProps} />
      </DraggingContextProvider>
    </GameContextProvider>
  )

}
export default MyApp
