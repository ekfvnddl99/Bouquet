import React, { useState } from 'react';
import styled from 'styled-components';

import Icon from './Icons';

import { colors } from '../styles/Colors';
import * as Text from '../styles/TextStyles';

const Wrap = styled.div<{scrolled: boolean}>`
  height: 35px;
  padding: 6px 18px 6px 18px;
  border-radius: 10px;

  display: flex;
  align-items: center;

  transition: 0.3s;

  @media (min-width: 320px) and (max-width: 519px) {
    background-color: ${props => props.scrolled ? colors.grayscale.gray0 : colors.grayscale.white};
  }

  @media (min-width: 520px) {
    background-color: ${colors.grayscale.gray0};
  }
`;

const Input = styled.input`
  width: 100%;
  border: 0;
  padding: 0;
  background-color: transparent;
  margin-left: 10px;

  ${Text.Body2R_css}
  color: ${colors.grayscale.black};

  &::placeholder {
    color: ${colors.grayscale.gray5};
    opacity: 1;
  }

  &:focus {
    outline: 0;
  }
`;

type SearchInputProps = {
  scrolled: boolean;
}

export default function SearchInput({ scrolled }: SearchInputProps) {
  const [value, setValue] = useState('');
  const [focused, setFocused] = useState(false);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const onFocus = () => {
    setFocused(true);
  }

  const onBlur = () => {
    setFocused(false);
  }

  return (
    <Wrap scrolled={scrolled}>
      <Icon
        name="search"
        varient="outline"
        color={focused || value ? colors.primary.normal : colors.grayscale.gray5}
        width={15}
        height={15}
      />
      <Input
        placeholder="무엇이 궁금한가요?"
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </Wrap>
  )
}