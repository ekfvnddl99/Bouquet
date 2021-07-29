import React from 'react';
import styled from 'styled-components';

import NavigationBar from './NavigationBar';
import RightBar from './RightBar';
import TopBar from './TopBar';

import { colors } from '../styles/Colors';
import { motion } from 'framer-motion';

const Wrap = styled.div`
  display: flex;
  min-height: 100%;
  @media (min-width: 320px) and (max-width: 519px) {
    flex-direction: column;
    width: 100%;
  }

  @media (min-width: 520px) and (max-width: 1279px) {
    width: 100%;
  }

  @media (min-width: 1280px) {
    justify-content: center;
    background-color: ${colors.grayscale.white};
  }
`;

const NavWrap = styled.div`
  display: flex;
  position: fixed;

  align-items: flex-end;

  @media (min-width: 320px) and (max-width: 519px) {
    width: 100%;
    height: 60px;
    bottom: 0;
  }

  @media (min-width: 520px) and (max-width: 729px) {
    width: 60px;
    height: 100%;
    left: 0;
  }

  @media (min-width: 730px) and (max-width: 1279px) {
    width: 170px;
    height: 100%;
    left: 0;
  }

  @media (min-width: 1280px) {
    width: 170px;
    height: 100%;
    left: calc((100% - 980px) / 2);
  }
`;

const RightWrap = styled.div`
  height: 100%;
  display: flex;
  position: fixed;

  justify-content: flex-end;

  @media (min-width: 980px) and (max-width: 1279px) {
    width: 250px;
    right: 0;
    z-index: 6;
  }

  @media (min-width: 1280px) {
    width: 250px;
    right: calc((100% - 980px) / 2);
    z-index: 25;
  }
`;

const ContentWrap = styled.div`
  @media (min-width: 320px) and (max-width: 519px) {
    padding-bottom: 60px;
    width: 100%;
  }

  @media (min-width: 520px) and (max-width: 729px) {
    padding-left: 60px;
    width: 100%;
  }

  @media (min-width: 730px) and (max-width: 979px) {
    padding-left: 170px;
    width: 100%;
  }

  @media (min-width: 980px) and (max-width: 1279px) {
    margin-left: 170px;
    margin-right: 250px;
    width: 100%;
  }

  @media (min-width: 1280px) {
    width: 560px;
    margin-left: 170px;
    margin-right: 250px;

    flex: 0 0;
    flex-basis: 560px;

    background-color: ${colors.grayscale.gray0};
  }
`;

const InWrap = styled.div`
  transition: 0.3s;

  @media (min-width: 320px) and (max-width: 519px) {
    width: 100%;
    max-width: 400px;
  }

  @media (min-width: 520px) {
    width: 100%;
    max-width: 500px;
    padding-top: 20px;
  }
`;

type Props = {
  setScrolled?: Function;
  topElement?: React.ReactNode;
  children?: React.ReactNode;
}

export default function LayoutWithNav({ setScrolled, topElement, children }: Props) {
  return (
    <Wrap>
      <ContentWrap>
        <TopBar setScrolled={setScrolled}>
          {topElement}
        </TopBar>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
          }}
          style={{
            padding: "0 30px 20px 30px",
            display: "flex",
            justifyContent: "center",
            overflowX: 'hidden',
          }}
        >
          <InWrap>
            {children}
          </InWrap>
        </motion.div>
      </ContentWrap>
      <NavWrap>
        <NavigationBar />
      </NavWrap>
      <RightWrap>
        <RightBar />
      </RightWrap>
    </Wrap>
  )
}
