import styled from 'styled-components';

import Logo from '../public/Logo.svg';
import Arrow from '../public/Arrow.svg';

import Button from './Button';

const Wrap = styled.div`
  width: 100%;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px;
`;

const TitleText = styled.span`
  @media (min-width: 320px) and (max-width: 659px) {
    font-size: 9vw;
  }

  @media (min-width: 660px) {
    font-size: 64px;
  }
`;

const TitleTextLight = styled(TitleText)`
  font-weight: 300;
`;

const TitleTextBold = styled(TitleText)`
  font-weight: 700;
`;

const ArrowWrap = styled.div`
  position: absolute;
  bottom: 20px;
`;

export default function Main({ finalRef } : { finalRef: React.MutableRefObject<any> }) {
  const onclick = () => {
    finalRef.current.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <Wrap>
      <ContentWrap>
        <Logo />
        <TextWrap>
          <span>
            <TitleTextBold>내면</TitleTextBold>
            <TitleTextLight>을 꽃피우는</TitleTextLight>
          </span>
          <span>
            <TitleTextBold>부캐</TitleTextBold>
            <TitleTextLight>들의 이야기 공간</TitleTextLight>
          </span>
          <TitleTextBold>BOUQUET</TitleTextBold>
        </TextWrap>
        <Button text="앱 다운로드" click={onclick} />
      </ContentWrap>
      <ArrowWrap><Arrow /></ArrowWrap>
    </Wrap>
  )
}