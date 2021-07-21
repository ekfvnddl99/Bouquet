import styled from 'styled-components/native';
import {colors} from '../colors';

export const PrimaryButton = styled.TouchableOpacity`
  height:45;
  border-radius:25;
  border-width:1;
  border-color:${colors.primary};
  align-items:center;
  justify-content:center;
  margin-top:16;
  padding-horizontal: 40;
`

export const BlackButton = styled.TouchableOpacity`
  border-radius:25;
  border-width:1;
  border-color:${colors.black};
  align-items:center;
  padding-horizontal: 12;
`

export const GrayBtnButton = styled.TouchableOpacity`
  height:45;
  border-radius:25;
  border-width:1;
  border-color:${colors.gray2};
  align-items:center;
  justify-content:center;
  margin-top:16;
  padding-horizontal: 40;
`

export const BackButton = styled.TouchableOpacity`
  margin-top:20;
`

export const SocialButton =styled.TouchableOpacity`
  background-color:${colors.white};
  border-radius:25;
  height:45;
  margin-top:10;
  align-items:center;
  justify-content:center;
  padding-horizontal:18;
  flex-direction: row;
  width: 100%;
`