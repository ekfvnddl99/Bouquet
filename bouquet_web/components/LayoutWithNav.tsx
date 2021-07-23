import React from 'react';
import styled from 'styled-components';
import NavigationBar from './NavigationBar';

const Wrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;

  @media (min-width: 320px) and (max-width: 519px) {
    flex-direction: column-reverse;
  }
`;

const ContentWrap = styled.div`
  width: 100%;
  height: 100%;
`;

type Props = {
  children?: React.ReactNode;
}

export default function LayoutWithNav({ children }: Props) {
  return (
    <Wrap>
      <NavigationBar />
      <ContentWrap>
        {children}
      </ContentWrap>
    </Wrap>
  )
}
