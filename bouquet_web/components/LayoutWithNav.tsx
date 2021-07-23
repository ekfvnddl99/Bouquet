import React from 'react';
import styled from 'styled-components';
import NavigationBar from './NavigationBar';

const Wrap = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  @media (min-width: 320px) and (max-width: 519px) {
    flex-direction: column;
  }
`;

const NavWrap = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  position: fixed;

  align-items: flex-end;
`;

const ContentWrap = styled.div`
  width: 100%;

  @media (min-width: 320px) and (max-width: 519px) {
    padding-bottom: 60px;
  }

  @media (min-width: 520px) and (max-width: 729px) {
    margin-left: 60px;
  }

  @media (min-width: 730px) {
    margin-left: 170px;
  }
`;

type Props = {
  children?: React.ReactNode;
}

export default function LayoutWithNav({ children }: Props) {
  return (
    <Wrap>
      <ContentWrap>
        {children}
      </ContentWrap>
      <NavWrap>
        <NavigationBar />
      </NavWrap>
    </Wrap>
  )
}
