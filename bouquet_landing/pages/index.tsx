import { useRef } from 'react';
import Head from 'next/head'
import styled from 'styled-components';

import Main from '../components/Main';
import Content1 from '../components/Content1';
import Content2 from '../components/Content2';
import Content3 from '../components/Content3';
import Content4 from '../components/Content4';
import Final from '../components/Final';

export default function Home() {
  const finalRef = useRef(null);

  return (
    <>
      <Head>
        <title>Bouquet : 부캐들의 이야기 공간</title>
        <meta name="description" content="Bouquet는 여러 부캐를 만들어 활동할 수 있는 소셜 공간입니다. (어쩌구 더 써야 함)" />
      </Head>
      <Main finalRef={finalRef} />
      <Content1 />
      <Content2 />
      <Content3 />
      <Content4 />
      <Final finalRef={finalRef} />
    </>
  )
}
