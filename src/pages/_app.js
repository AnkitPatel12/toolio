import '@/styles/globals.css'

import { ThemeProvider } from "@material-tailwind/react";
import { DM_Sans } from 'next/font/google'
const dm = DM_Sans({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps }) {
  return (
    
      <main className={dm.className}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </main>
  )
}
