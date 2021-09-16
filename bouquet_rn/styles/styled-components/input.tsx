import styled from 'styled-components/native';
import colors from '../colors';

interface FormInputProps {
  height: number;
}
export const FormInput = styled.TextInput`
  background-color: ${colors.white};
  border-radius: 10;
  height: ${(props: FormInputProps) => props.height};
  align-items: center;
  padding-horizontal: 16;
  flex-direction: row;
`;

export const FormInputErr = styled.TextInput`
  border-width:1;
  border-color=${colors.primary}
  background-color:${colors.white};
  border-radius: 10;
  height:${(props: FormInputProps) => props.height};
  align-items: center;
  padding-horizontal: 16;
  flex-direction: row;
`;

export const TextTemplate = styled.TextInput`
  background-color: ${colors.white};
  border-radius: 10;
  justify-content: center;
  padding-horizontal: 10;
  padding-vertical: 10;
  flex-wrap: wrap;
`;
