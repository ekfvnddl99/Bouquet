import { useState, useCallback, useMemo } from 'react';
import styled from 'styled-components';

import Icon from './Icons';

import { colors } from '../styles/Colors';
import * as Text from '../styles/TextStyles';

const Wrap = styled.div<{active: boolean}>`
  padding: 4px 8px 4px 8px;
  border: 1px solid ${colors.primary.normal};
  ${props => props.active ? `background-color: ${colors.primary.normal};` : ''}
  border-radius: 10px;

  display: flex;
  align-items: center;

  transition: 0.3s;

  &:hover {
    ${props => props.active ? '' : `background-color: ${colors.primary.alpha20};`}
    transition: 0.3s;
  }
`;

type SunshineButtonProps = {
  sunshine: number;
}

export default function SunshineButton({ sunshine }: SunshineButtonProps) {
  const [active, setActive] = useState(false);
  const getVarient = useCallback(() => {
    return active ? "filled" : "outline";
  }, [active]);

  const varient = useMemo(() => getVarient(), [getVarient]);

  return (
    <Wrap onClick={() => setActive(!active)} active={active}>
      <Icon
        name="sunshine"
        varient={active ? "filled" : "outline"}
        width={20}
        height={20}
        color={active ? colors.grayscale.white : colors.primary.normal}
      />
      <Text.Body3
        style={{
          marginLeft: '4px',
          color: active ? colors.grayscale.white : colors.primary.normal,
        }}
      >{sunshine}</Text.Body3>
    </Wrap>
  )
}