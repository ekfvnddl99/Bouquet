import styled from 'styled-components';

import { colors } from '../styles/Colors';
import * as Text from '../styles/TextStyles';

import { ProfilePic } from './ProfilePic';

const Wrap = styled.div`
  width: 150px;
  height: 200px;
  background-color: ${colors.grayscale.white};
  border-radius: 10px;
  padding: 18px;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

const TextWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 8px;
`;

const CaptionWrap = styled.div`
  margin-top: 8px;

  span {
    color: ${colors.grayscale.gray7};
    text-align: center;

    display: block;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    max-height: ${1.25 * 2}em;
  }
`;

type ProfileMiniProps = {
  varient: string;
}

export default function ProfileMini({ varient }: ProfileMiniProps) {
  return (
    <Wrap>
      <ProfilePic
        size={100}
        image="https://images.unsplash.com/photo-1626688226927-33257a21236f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1268&q=80"
      />
      <TextWrap>
        <Text.Body2B>
          단호좌현지
        </Text.Body2B>
        <CaptionWrap>
          <Text.Caption>
            나는 나보다 약한 자의 말은 듣지 않는다
          </Text.Caption>
        </CaptionWrap>
      </TextWrap>
    </Wrap>
  )
}