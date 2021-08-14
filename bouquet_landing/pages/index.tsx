import Head from 'next/head'
import styled from 'styled-components';

import Main from '../components/Main';

export default function Home() {
  return (
    <>
      <Head>
        <title>Bouquet : 부캐들의 이야기 공간</title>
        <meta name="description" content="Bouquet는 여러 부캐를 만들어 활동할 수 있는 소셜 공간입니다. (어쩌구 더 써야 함)" />
      </Head>
      <Main />
    </>
  )
}
