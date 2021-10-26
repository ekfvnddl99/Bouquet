import styled from 'styled-components/native';
import colors from '../colors';

interface ButtonProps {
  height?: number;
  backgroundColor?: string;
  borderColor?: string;
  paddingH: number;
  paddingV: number;
}
export const ConditionButton = styled.TouchableOpacity`
  height: ${(props: ButtonProps) => props.height};
  border-width: 1;
  border-color: ${(props: ButtonProps) => props.borderColor};
  background-color: ${(props: ButtonProps) => props.backgroundColor};
  border-radius: 25;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${(props: ButtonProps) => props.paddingH};
  padding-vertical: ${(props: ButtonProps) => props.paddingV};
`;

export const BackgroundButton = styled.TouchableOpacity`
  background-color: ${(props: ButtonProps) => props.backgroundColor};
  height: ${(props: ButtonProps) => props.height};
  border-radius: 25;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${(props: ButtonProps) => props.paddingH};
  padding-vertical: ${(props: ButtonProps) => props.paddingV};
`;

export const LineButton = styled.TouchableOpacity`
  border-width: 1;
  border-color: ${(props: ButtonProps) => props.borderColor};
  background-color: ${(props: ButtonProps) => props.backgroundColor};
  border-radius: 25;
  align-items: center;
  justify-content: center;
  padding-horizontal: ${(props: ButtonProps) => props.paddingH};
  padding-vertical: ${(props: ButtonProps) => props.paddingV};
`;

interface MiniListButtonProps {
  height: number;
  backgroundColor: string;
  paddingH: number;
  paddingV: number;
  isWidth: boolean;
}
export const MiniListButton = styled.TouchableOpacity`
  flex: 1;
  ${(props: MiniListButtonProps) => (props.isWidth ? `width: 150;` : '')};
  height: ${(props: MiniListButtonProps) => props.height};
  background-color: ${(props: MiniListButtonProps) => props.backgroundColor};
  border-radius: 10;
  padding-horizontal: ${(props: MiniListButtonProps) => props.paddingH};
  padding-vertical: ${(props: MiniListButtonProps) => props.paddingV};
`;
interface BigListButtonProps {
  backgroundColor: string;
  paddingH: number;
  paddingV: number;
}
export const BigListButton = styled.TouchableOpacity`
  flex: 1;
  width: 100%;
  background-color: ${(props: BigListButtonProps) => props.backgroundColor};
  border-radius: 10;
  padding-horizontal: ${(props: BigListButtonProps) => props.paddingH};
  padding-vertical: ${(props: BigListButtonProps) => props.paddingV};
  margin-bottom: 10;
`;

export const NotificationButton = styled.TouchableOpacity`
  flex: 1;
  flex-direction: row;
  background-color: ${colors.white};
  border-radius: 10;
  align-items: center;
  padding-horizontal: 18;
  padding-vertical: 12;
  margin-bottom: 10;
`;

interface ButtonColorProps {
  backgroundColor: string;
}
export const TagModifyButton = styled.TouchableOpacity`
  background-color: ${(props: ButtonColorProps) => props.backgroundColor};
  border-radius: 10;
  margin-right: 4;
  margin-bottom: 2;
  padding-left: 8;
  padding-vertical: 5;
`;

export const SunButton = styled.TouchableOpacity`
  flex-direction: row;
  border-width: 1;
  border-color: ${colors.primary};
  border-radius: 10;
  background-color: ${(props: ButtonColorProps) => props.backgroundColor};
  align-items: center;
  padding-vertical: 4;
  padding-horizontal: 8;
`;

export const AddTemplate = styled.TouchableOpacity`
  height: 77;
  background-color: transparent;
  border-radius: 10;
  border-color: ${colors.black};
  border-style: dashed;
  border-width: 1;
  margin-vertical: 12;
  align-items: center;
  justify-content: center;
`;

interface noHeightButtonProps {
  marBottom: number;
  paddingH: number;
  paddingV: number;
}
export const NoHeightButton = styled.TouchableOpacity`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 10;
  margin-bottom: ${(props: noHeightButtonProps) => props.marBottom};
  padding-horizontal: ${(props: noHeightButtonProps) => props.paddingH};
  padding-vertical: ${(props: noHeightButtonProps) => props.paddingV};
`;

export const ProfileDetailButton = styled.TouchableOpacity`
  border-radius: 10;
  background-color: ${colors.white};
  padding-horizontal: 20;
  padding-vertical: 20;
`;
