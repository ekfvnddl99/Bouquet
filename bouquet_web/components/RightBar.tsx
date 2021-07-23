import styled from 'styled-components';

import { colors } from '../styles/Colors';

const Background = styled.div`
  width: 250px;
  height: 100%;
  background-color: ${colors.grayscale.white};

  position: fixed;
`;

export default function RightBar() {
  return (
    <Background>
      <p>Test</p>
    </Background>
  )
}