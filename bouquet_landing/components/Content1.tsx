import styled from 'styled-components';

import { colors } from '../styles/Colors';

const Wrap = styled.div`
  width: 100%;
  position: relative;

  @media (min-width: 320px) and (max-width: 700px) {
    height: calc(((100vw - 40px - 30px) / 2) * (651 / 300) + 400px);
  }

  @media (min-width: 701px) {
    height: 1024px;
  }
`;

const Background = styled.div`
  width: 100%;
  height: 50%;
  position: absolute;
  top: 50%;
  background-color: ${colors.primary.normal};
  z-index: 0;
`;

const ContentWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
`;

const Text = styled.span`
  @media (min-width: 320px) and (max-width: 520px) {
    font-size: 7vw;
  }

  @media (min-width: 521px) {
    font-size: 36px;
  }
`;

const TextBold = styled(Text)`
  font-weight: 700;
`;

const TextLight = styled(Text)`
  font-weight: 300;
`;

const PhonesWrap = styled.div`
  display: flex;
`;

const PhoneFrame = styled.div<{bgImage: string}>`
  background-image: url("${props => props.bgImage}");
  background-size: cover;

  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.1);

  @media (min-width: 320px) and (max-width: 700px) {
    width: calc((100vw - 40px - 30px) / 2);
    height: calc(((100vw - 40px - 30px) / 2) * (651 / 300));
    border-radius: 3vw;
    margin: 0 15px 0 15px;
  }

  @media (min-width: 701px) {
    width: 300px;
    height: 651px;
    border-radius: 20px;
    margin: 0 30px 0 30px;
  }
`;

export default function Content1() {
  return (
    <Wrap>
      <Background />
      <ContentWrap>
        <TextWrap>
          <TextLight>나의 또 다른 모습,</TextLight>
          <span>
            <TextBold>부캐</TextBold>
            <TextLight>를 만들어 보세요!</TextLight>
          </span>
        </TextWrap>
        <PhonesWrap>
          <PhoneFrame bgImage="/contents/content1_1.png" />
        </PhonesWrap>
      </ContentWrap>
    </Wrap>
  )
}