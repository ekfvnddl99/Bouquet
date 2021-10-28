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
        <meta name="description" content="Bouquet는 여러 부캐를 만들어 활동할 수 있는 SNS입니다. Bouquet에서 주변에 보여준 하나의 모습이 아니라, 자신이 가진 여러 모습을 자유롭게 드러내 보세요." />
        <meta name="keywords" content="Bouquet,부케,부캐,SNS,메타버스,소셜,캐릭터,내면,페르소나,퍼소나,멀티 페르소나,다중 정체성" />

        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bouquet : 부캐들의 이야기 공간" />
        <meta property="og:description" content="Bouquet는 여러 부캐를 만들어 활동할 수 있는 SNS입니다. 자신의 여러 모습을 자유롭게 드러내 보세요." />
        <meta property="og:image" content="../public/OpenGraph.png" />
        <meta property="og:url" content="https://bouquet.ooo" />
        <meta property="og:site_name" content="Bouquet" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />

        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Bouquet : 부캐들의 이야기 공간" />
        <meta name="twitter:description" content="Bouquet는 여러 부캐를 만들어 활동할 수 있는 SNS입니다. 자신의 여러 모습을 자유롭게 드러내 보세요." />
        <meta name="twitter:image" content="../public/OpenGraph.png" />

        <meta property="al:ios:url" content="https://apps.apple.com/kr/app/bouquet-%EB%B6%80%EC%BA%90%EB%93%A4%EC%9D%98-%EC%9D%B4%EC%95%BC%EA%B8%B0-%EA%B3%B5%EA%B0%84/id1589432470" />
        <meta property="al:ios:app_store_id" content="1589432470" />
        <meta property="al:ios:app_name" content="Bouquet : 부캐들의 이야기 공간" />

        <meta property="al:android:url" content="https://play.google.com/store/apps/details?id=com.dot.bouquet" />
        <meta property="al:android:app_name" content="Bouquet : 부캐들의 이야기 공간" />
        <meta property="al:android:package" content="com.dot.bouquet" />
        <meta property="al:web:url" content="https://play.google.com/store/apps/details?id=com.dot.bouquet" />
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
