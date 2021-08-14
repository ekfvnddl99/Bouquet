import styled from 'styled-components';

const Wrap = styled.div`
  border-radius: 32px;
  border: 1px solid #FA7268;
  transition: 0.5s;

  @media (min-width: 320px) and (max-width: 659px) {
    padding: 16px 36px 16px 36px;
  }

  @media (min-width: 660px) {
    padding: 20px 44px 20px 44px;
  }

  &:hover {
    background-color: rgba(250, 114, 104, 0.1);
    transition: 0.5s;
  }

  &:active {
    background-color: rgba(250, 114, 104, 0.2);
    transition: 0.5s;
  }
`;

const Text = styled.span`
  color: #FA7268;
  font-weight: 600;

  @media (min-width: 320px) and (max-width: 659px) {
    font-size: 16px;
  }

  @media (min-width: 660px) {
    font-size: 20px;
  }
`;

export default function Button({ text }: { text: string }) {
  return (
    <Wrap>
      <Text>{text}</Text>
    </Wrap>
  )
}