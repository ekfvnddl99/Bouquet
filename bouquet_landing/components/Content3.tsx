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

const BadgeWrap = styled.div`
  padding: 8px 20px 8px 20px;
  border-radius: 32px;
  border: 1px solid ${colors.primary.normal};
  margin-bottom: 8px;

  display: flex;
  align-items: center;
`;

const BadgeText = styled.span`
  font-weight: 600;
  color: ${colors.primary.normal};

  @media (min-width: 320px) and (max-width: 470px) {
    font-size: 3.5vw;
  }

  @media (min-width: 471px) {
    font-size: 16px;
  }
`;

export default function Content3() {
  return (
    <Wrap>
      <Background />
      <ContentWrap>
        <TextWrap>
          <BadgeWrap>
            <BadgeText>정식 버전 출시 예정</BadgeText>
          </BadgeWrap>
          <span>
            <TextLight>게시글을 엮은 </TextLight>
            <TextBold>에피소드</TextBold>
            <TextLight>,</TextLight>
          </span>
          <span>
            <TextLight>마음 맞는 </TextLight>
            <TextBold>크루</TextBold>
            <TextLight>도 곧 나와요.</TextLight>
          </span>
        </TextWrap>
        <PhonesWrap>
          <PhoneFrame bgImage="/contents/content3_1.png" />
        </PhonesWrap>
      </ContentWrap>
    </Wrap>
  )
}