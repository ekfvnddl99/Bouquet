import styled from 'styled-components';

import { ProfilePic } from './ProfilePic';

import { colors } from '../styles/Colors';
import * as Text from '../styles/TextStyles';

const Wrap = styled.div`
  width: 150px;
  height: 270px;
  background-color: ${colors.grayscale.white};
  border-radius: 10px;
  padding: 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const EpisodePic = styled.div<{image?: string}>`
  width: 118px;
  height: 153px;
  border-radius: 10px;
  background: ${props =>
  props.image ?
  `url(${props.image})` :
  colors.grayscale.white
  } no-repeat center/cover;
`;

const TitleText = styled(Text.Subtitle3)`
  width: 100%;
  height: 38px;
  margin-top: 16px;

  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
`;

const ProfileWrap = styled.div`
  width: 100%;
  margin-top: 8px;

  display: flex;
`;

type EpisodeMiniProps = {
  varient: string;
}

export default function EpisodeMini({ varient }: EpisodeMiniProps) {
  return (
    <Wrap>
      <EpisodePic
        image="https://images.unsplash.com/photo-1626688226927-33257a21236f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80"
      />
      <TitleText>
        떡볶이 전쟁 1 : 밀과 쌀
      </TitleText>
      <ProfileWrap>
        <ProfilePic
          size={20}
          image="https://images.unsplash.com/photo-1626688226927-33257a21236f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80"
        />
        <Text.Body2B
          style={{
            marginLeft: '8px'
          }}
        >
          단호좌현지
        </Text.Body2B>
      </ProfileWrap>
    </Wrap>
  )
}