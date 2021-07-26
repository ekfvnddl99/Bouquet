import type { AppProps } from 'next/app';
import { RecoilRoot } from 'recoil';
import { GlobalStyle } from '../styles/GlobalStyle';
import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

function MyApp({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);
  return (
    <RecoilRoot>
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route}/>
      </AnimatePresence>
    </RecoilRoot>
  )
}
export default MyApp
