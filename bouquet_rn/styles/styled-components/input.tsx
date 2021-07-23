import styled from 'styled-components/native';
import {colors} from '../colors';

interface FormProps{
  height : string,
}
export const FormInput = styled.TextInput`
  background-color:${colors.white};
  border-radius: 10;
  height:${(props: FormProps)=> props.height};
  align-items: center;
  margin-top:16;
  padding-horizontal: 16;
  flex-direction: row;
`

export const FormInputErr = styled.TextInput`
  background-color:${colors.white};
  border-radius: 10;
  border-width:1;
  border-color:${colors.primary};
  height:44;
  align-items: center;
  margin-top:16;
  padding-horizontal: 16;
  flex-direction: row;
`