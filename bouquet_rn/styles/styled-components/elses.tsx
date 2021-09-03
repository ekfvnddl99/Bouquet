import styled from 'styled-components/native';

interface BarProps {
  width: string;
  backgroundColor: string;
}
export const Bar = styled.View`
  width: ${(props: BarProps) => props.width};
  height: 8;
  borderradius: 10;
  backgroundcolor: ${(props: BarProps) => props.backgroundColor};
  position: absolute;
`;

interface CircleProps {
  diameter: number;
  backgroundColor?: string;
}
export const Circle = styled.View`
  width: ${(props: CircleProps) => props.diameter};
  height: ${(props: CircleProps) => props.diameter};
  border-radius: ${(props: CircleProps) => props.diameter / 2};
  background-color: ${(props: CircleProps) => props.backgroundColor};
  align-items: center;
  justify-content: center;
`;

export const CircleImg = styled.Image`
  width: ${(props: CircleProps) => props.diameter};
  height: ${(props: CircleProps) => props.diameter};
  border-radius: ${(props: CircleProps) => props.diameter / 2};
  align-items: center;
  justify-content: center;
`;

interface RectangleProps {
  width: number;
  height: number;
  backgroundColor?: string;
}
export const Rectangle = styled.View`
  width: ${(props: RectangleProps) => props.width};
  height: ${(props: RectangleProps) => props.height};
  border-radius: 10;
  background-color: ${(props: RectangleProps) => props.backgroundColor};
`;
export const RectangleImg = styled.Image`
  width: ${(props: RectangleProps) => props.width};
  height: ${(props: RectangleProps) => props.height};
  border-radius: 10;
`;

interface TagProps {
  backgroundColor: string;
}
export const Tag = styled.View`
  height: 25;
  border-radius: 10;
  background-color: ${(props: TagProps) => props.backgroundColor};
  margin-right: 4;
  padding-horizontal: 8;
  padding-vertical: 4;
`;
