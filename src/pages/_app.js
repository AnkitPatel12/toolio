import '../styles/globals.css';

import { ThemeProvider } from "@material-tailwind/react";
import { SessionProvider } from "next-auth/react";
import { DM_Sans } from 'next/font/google';
import { RecoilRoot } from 'recoil';
const dm = DM_Sans({
  weight: ['300', '400', '500'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

export default function App({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <main className={dm.className}>

          <ThemeProvider>
            <Component {...pageProps} />
          </ThemeProvider>
        </main>
      </RecoilRoot>
    </SessionProvider>
  )
}
