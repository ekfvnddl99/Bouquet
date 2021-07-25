import styled from 'styled-components';
import { useRecoilState } from 'recoil';

import { ProfilePic } from './ProfilePic';

import { characterState } from '../features/atoms';

import { colors } from '../styles/Colors';
import * as Text from '../styles/TextStyles';

const Background = styled.div`
  width: 250px;
  height: 100%;
  background-color: ${colors.grayscale.white};

  position: fixed;
`;

const Wrap = styled.div`
  margin: 30px 20px 0 20px;
`;

const ProfileArea = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function RightBar() {
  const [character, setCharacter] = useRecoilState(characterState);

  return (
    <Background>
      <Wrap>
        <ProfileArea>
          <ProfilePic
            size={60}
            image={character.image}
          />
          <Text.Subtitle3 style={{marginTop: "10px"}}>
            {character.isLogined ? character.characterName : '캐릭터를 만들어 보세요!'}
          </Text.Subtitle3>
          <Text.Body2R style={{
            color: colors.grayscale.gray7,
            marginTop: "4px",
            }}>
            {character.caption}
          </Text.Body2R>
          <Text.Button2R style={{
            color: colors.primary.normal,
            marginTop: "10px",
            }}>
            {character.isLogined ? '캐릭터 변경' : ''}
          </Text.Button2R>
        </ProfileArea>
      </Wrap>
    </Background>
  )
}