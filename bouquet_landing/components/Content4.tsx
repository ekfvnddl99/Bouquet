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
  top: 0;
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

  bottom: 50px;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 48px;
`;

const Text = styled.span`
  color: ${colors.grayscale.white};

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

const PicsWrap = styled.div`
  display: flex;
  align-items: center;
`;

const PicFrame = styled.div<{bgImage: string}>`
  
  background-image: url("${props => props.bgImage}");
  background-size: cover;
  border-radius: 10px;
  box-shadow: 0 20px 30px 0 rgba(0, 0, 0, 0.2);

  @media (min-width: 320px) and (max-width: 520px) {
    width: calc((100vw - 40px - 40px) / 3);
    height: calc((100vw - 40px - 40px) / 3);
  }

  @media (min-width: 521px) {
    width: calc((100vw - 40px - 100px) / 3);
    max-width: 300px;
    height: calc((100vw - 40px - 100px) / 3);
    max-height: 300px;
  }
`;

const BadgeWrap = styled.div`
  padding: 8px 20px 8px 20px;
  border-radius: 32px;
  border: 1px solid ${colors.grayscale.white};
  margin-bottom: 8px;

  display: flex;
  align-items: center;
`;

const BadgeText = styled.span`
  font-weight: 600;
  color: ${colors.grayscale.white};

  @media (min-width: 320px) and (max-width: 470px) {
    font-size: 3.5vw;
  }

  @media (min-width: 471px) {
    font-size: 16px;
  }
`;

const ArrowText = styled.span`
  color: ${colors.primary.normal};

  @media (min-width: 320px) and (max-width: 520px) {
    font-size: 7vw;
    margin-left: 10px;
    margin-right: 10px;
  }

  @media (min-width: 521px) {
    font-size: 50px;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

export default function Content4() {
  return (
    <Wrap>
      <Background />
      <ContentWrap>
        <TextWrap>
          <BadgeWrap>
            <BadgeText>정식 버전 출시 예정</BadgeText>
          </BadgeWrap>
          <TextLight>캐릭터의 모습을 상상해 보세요.</TextLight>
          <span>
            <TextLight>이미지에 </TextLight>
            <TextBold>스타일</TextBold>
            <TextLight>을 입혀 드려요.</TextLight>
          </span>
        </TextWrap>
        <PicsWrap>
          <PicFrame bgImage="/contents/content4_1.png" style={{ marginRight: "10px" }} />
          <PicFrame bgImage="/contents/content4_2.png" />
          <ArrowText>➞</ArrowText>
          <PicFrame bgImage="/contents/content4_3.png" />
        </PicsWrap>
      </ContentWrap>
    </Wrap>
  )
}