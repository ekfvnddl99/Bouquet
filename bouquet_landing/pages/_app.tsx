import type { AppProps } from 'next/app';
import { GlobalStyle } from '../styles/GlobalStyle';

function MyApp({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <Component {...pageProps} key={router.route}/>
    </>
  )
}
export default MyApp
