import styled from 'styled-components';

import { ProfilePic } from './ProfilePic';
import SunshineButton from './SunshineButton';

import { colors } from '../styles/Colors';
import * as Text from '../styles/TextStyles';

const Wrap = styled.div`
  width: 100%;
  border-radius: 10px;
  padding: 10px;
  background-color: ${colors.grayscale.white};
  margin-bottom: 10px;
`;

const ContentWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
`;

const TextFrame = styled.div`
  width: 100%;
  padding: 10px;
  margin-top: 10px;
`;

const SunshineWrap = styled.div`
  display: flex;
  margin-top: 10px;
`;

type CharacterData = {
  isLogined: boolean;
  characterName: string;
  caption: string;
  image: string;
}

type PostMiniProps = {
  character: CharacterData;
  text: string;
  sunshine: number;
}

export default function PostMini({ character, text, sunshine }: PostMiniProps) {
  return (
    <Wrap>
      <ContentWrap>
        <Top>
          <Profile>
            <ProfilePic size={30} image={character.image} />
            <Text.Body2B style={{ marginLeft: '8px' }}>{character.characterName}</Text.Body2B>
          </Profile>
          <Text.Caption
            style={{
              color: colors.grayscale.gray5,
              marginRight: '4px',
            }}
          >
            5분 전
          </Text.Caption>
        </Top>
        <TextFrame>
          <Text.Body2R>
            {text}
          </Text.Body2R>
        </TextFrame>
        <SunshineWrap>
          <SunshineButton sunshine={sunshine} />
        </SunshineWrap>
      </ContentWrap>
    </Wrap>
  )
}