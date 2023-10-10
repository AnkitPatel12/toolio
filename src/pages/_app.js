import '../styles/globals.css'

import { ThemeProvider } from "@material-tailwind/react";
import { DM_Sans } from 'next/font/google'
import {SessionProvider} from "next-auth/react"
const dm = DM_Sans({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps : {session, ...pageProps} }) {
  return (
    <SessionProvider session={session}>
      <main className={dm.className}>
        
          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
      </main>
      </SessionProvider>
  )
}
