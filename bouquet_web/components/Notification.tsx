import styled from 'styled-components';
import { motion, useMotionValue, useTransform } from 'framer-motion';

import { ProfilePic } from './ProfilePic';
import Icon from './Icons';

import { colors } from '../styles/Colors';
import * as Text from '../styles/TextStyles';

const Wrap = styled.div`
  background-color: ${colors.grayscale.white};
  padding: 12px 18px 12px 18px;
  border-radius: 10px;

  display: flex;
  align-items: center;
`;

const MessageWrap = styled.div`
  margin-left: 10px;
  flex: 1;
`;

const DateText = styled(Text.Caption)`
  width: 65px;
  text-align: right;
  margin-left: 10px;
  color: ${colors.grayscale.gray5};
`;

type CharacterData = {
  isLogined: boolean;
  characterName: string;
  caption: string;
  image: string;
}

type NotiProps = {
  message: string;
  character: CharacterData;
}

export default function Notification({ message, character }: NotiProps) {
  const x = useMotionValue(0);
  const background = useTransform(
    x,
    [-50, 0, 0],
    [colors.warning_red, colors.grayscale.white, 'rgba(0, 0, 0, 0)']
  );

  const removeNotification = () => {
    x.set(0);
  }

  return (
    <motion.div
      style={{
        background,
        borderRadius: '10px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center'
      }}
    >
      <motion.div
        drag="x"
        dragConstraints={{ left: -50, right: 0 }}
        style={{
          x,
          flex: 1,
          zIndex: 1,
        }}
      >
        <Wrap>
          <ProfilePic
            image={character.image}
            size={20}
          />
          <MessageWrap>
            <Text.Body2B>{character.characterName}</Text.Body2B>
            <Text.Body2R>{message}</Text.Body2R>
          </MessageWrap>
          <DateText>4분 전</DateText>
        </Wrap>
      </motion.div>
      <div
        style={{
          position: 'absolute',
          width: '50px',
          zIndex: 0,
          display: 'flex',
          justifyContent: 'center'
        }}
        onClick={removeNotification}
      >
        <Icon
          name="bin"
          varient="outline"
          width={24}
          height={24}
          color={colors.grayscale.white}
        />
      </div>
    </motion.div>
  )
}