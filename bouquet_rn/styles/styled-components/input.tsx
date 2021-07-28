import styled from 'styled-components/native';
import {colors} from '../colors';

interface FormProps{
  height : string|number,
}
export const FormInput = styled.TextInput`
  background-color:${colors.white};
  border-radius: 10;
  height:${(props: FormProps)=> props.height};
  align-items: center;
  padding-horizontal: 16;
  flex-direction: row;
`

export const FormInputErr = styled.TextInput`
  border-width:1;
  border-color=${colors.primary}
  background-color:${colors.white};
  border-radius: 10;
  height:${(props: FormProps)=> props.height};
  align-items: center;
  padding-horizontal: 16;
  flex-direction: row;
`