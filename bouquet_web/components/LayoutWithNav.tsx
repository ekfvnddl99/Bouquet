import styled from 'styled-components';

import NavigationBar from './NavigationBar';
import RightBar from './RightBar';

import { colors } from '../styles/Colors';
import { motion } from 'framer-motion';

const Wrap = styled.div`
  height: 100%;

  display: flex;
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
  height: 100%;
  display: flex;
  position: fixed;
  

  align-items: flex-end;

  @media (min-width: 320px) and (max-width: 519px) {
    width: 100%;
    z-index: 30;
  }

  @media (min-width: 520px) and (max-width: 729px) {
    width: 60px;
    z-index: 10;
  }

  @media (min-width: 730px) and (max-width: 1279px) {
    width: 170px;
    z-index: 10;
  }

  @media (min-width: 1280px) {
    width: 170px;
    margin-right: 810px;
    z-index: 10;
  }
`;

const RightWrap = styled.div`
  height: 100%;
  display: flex;
  position: fixed;
  z-index: 6;

  justify-content: flex-end;

  @media (max-width: 979px) {
    display: none;
  }

  @media (min-width: 980px) and (max-width: 1279px) {
    width: 100%;
  }

  @media (min-width: 1280px) {
    width: 980px;
  }
`;

const ContentWrap = styled.div`
  z-index: 20;
  @media (min-width: 320px) and (max-width: 519px) {
    width: 100%;
    padding-bottom: 60px;
  }

  @media (min-width: 520px) and (max-width: 729px) {
    width: 100%;
    margin-left: 60px;
  }

  @media (min-width: 730px) and (max-width: 979px) {
    width: 100%;
    margin-left: 170px;
  }

  @media (min-width: 980px) and (max-width: 1279px) {
    width: 100%;
    margin-left: 170px;
    margin-right: 250px;
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

const Background = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${colors.grayscale.white};

  position: fixed;
  z-index: 0;
  display: flex;
  justify-content: center;
`;

const Gray0 = styled.div`
  width: 980px;
  height: 100%;
  background-color: ${colors.grayscale.gray0};
`;

type Props = {
  topElement?: React.ReactNode;
  children?: React.ReactNode;
}

export default function LayoutWithNav({ topElement, children }: Props) {
  return (
    <Wrap>
      <ContentWrap>
        {topElement}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{
            duration: 0.3,
            type: "spring",
            stiffness: 100,
          }}
        >
          {children}
        </motion.div>
      </ContentWrap>
      <NavWrap>
        <NavigationBar />
      </NavWrap>
      <RightWrap>
        <RightBar />
      </RightWrap>
      <Background>
        <Gray0 />
      </Background>
    </Wrap>
  )
}
