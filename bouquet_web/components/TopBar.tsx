import { motion } from 'framer-motion';
import { useState, useCallback, useEffect, useMemo } from 'react';
import styled from 'styled-components';

import { colors } from '../styles/Colors';

const TopWrap = styled.div<{scrolled: boolean}>`
  position: sticky;
  top: 0;
  transition: 0.3s;

  display: flex;
  justify-content: center;
  
  @media (min-width: 320px) and (max-width: 519px) {
    border-radius: 0 0 15px 15px;
    padding: ${props => props.scrolled ? 16 : 30}px 30px ${props => props.scrolled ? 16 : 20}px 30px;
    ${props => props.scrolled ? `background-color: ${colors.grayscale.white};` : ''}
    ${props => props.scrolled ? `height: 60px;` : ''}
    ${props => props.scrolled ? `span { opacity: 0; transition: 0.5s }` : ''}
  }

  @media (min-width: 520px) {
    padding: 30px 30px 20px 30px;
    background-color: ${colors.grayscale.white};
  }
`;

const TitleWrap = styled.div`
  @media (min-width: 320px) and (max-width: 519px) {
    width: 100%;
    max-width: 400px;
  }

  @media (min-width: 520px) {
    width: 100%;
    max-width: 500px;
  }
`;

type TopBarProps = {
  setScrolled?: Function;
  children?: React.ReactNode;
}

export default function TopBar({ setScrolled, children }: TopBarProps) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const setScroll = useCallback(() => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  },
  []);
  useEffect(() => {
    window.addEventListener('scroll', setScroll);
    return () => {
      window.removeEventListener('scroll', setScroll);
    }
  }, [setScroll]);

  const getScrolled = useCallback(() => {
    return scrollPosition > 0;
  }, [scrollPosition]);
  const scrolled = useMemo(() => getScrolled(), [getScrolled]);

  useEffect(() => {
    if (setScrolled) {
      setScrolled(scrolled);
    }
  }, [scrolled, setScrolled]);

  return (
    <TopWrap scrolled={scrolled}>
      <TitleWrap>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </TitleWrap>
    </TopWrap>
  )
}