import styled from 'styled-components/native';
import colors from '../colors';

// logics
import { StatusBarHeight } from '../../logics/non-server/StatusbarHeight';

/**
 * 가로로 쓸 때
 */
export const RowArea = styled.View`
  align-items: center;
  flex-direction: row;
`;

/**
 * 가로로 쓸 때인데 이제 flex를 곁들인...
 */
export const RowFlexArea = styled.View`
  flex: 1;
  align-items: center;
  flex-direction: row;
`;

/**
 * text 버튼인데 뒤에 배경을 곁들인...
 * @description 사용처: 웰컴(미리보기), 로그인(미리보기)
 */
export const TextBackgroundBtnArea = styled.View`
  width: 100%;
  flex-direction: row;
  background-color: ${colors.white};
  align-items: center;
  justify-content: center;
  padding-vertical: 20;
  margin-top: 30;
`;

/**
 * 맨 밑에 버튼이 위치한 경우
 * @description 사용처: 로그인, 레지스터, 캐릭터 생성
 */
export const BottomArea = styled.View`
  flex: 1;
  justify-content: flex-end;
`;

export const TabBarArea = styled.SafeAreaView`
  flex-direction: row;
  background-color: ${colors.white};
  justify-content: center;
  align-items: center;
`;

interface noHeightAreaProps {
  marBottom: number;
  paddingH: number;
  paddingV: number;
}
export const NoHeightArea = styled.View`
  width: 100%;
  background-color: ${colors.white};
  border-radius: 10;
  margin-bottom: ${(props: noHeightAreaProps) => props.marBottom};
  padding-horizontal: ${(props: noHeightAreaProps) => props.paddingH};
  padding-vertical: ${(props: noHeightAreaProps) => props.paddingV};
`;

interface FormAreaProps {
  height: string;
}
export const FormArea = styled.View`
  background-color: ${colors.white};
  border-radius: 10;
  height: ${(props: FormAreaProps) => props.height};
  align-items: center;
  padding-horizontal: 16;
  flex-direction: row;
`;

// contatiner
export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${colors.gray0};
  padding-top: ${StatusBarHeight};
`;

export const ContainerBlank20 = styled.View`
  flex: 1;
  background-color: ${colors.gray0};
  padding-horizontal: 20;
  padding-top: 20;
`;

export const ContainerBlank30 = styled.View`
  flex: 1;
  background-color: ${colors.gray0};
  padding-horizontal: 30;
  padding-top: 30;
`;
