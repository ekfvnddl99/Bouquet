import styled from 'styled-components/native';

interface TextProps{
  color : string,
}
export const Title = styled.Text`
  font-weight: bold;
  font-size: 32px;
  color: ${(props : TextProps) => (props.color)}
`
export const Subtitle1 = styled.Text`
  font-weight: bold;
  font-size: 22px;
  color: ${(props : TextProps) => (props.color)}
`
export const Subtitle2B = styled.Text`
  font-weight: bold;
  font-size: 18px;
  color: ${(props : TextProps) => (props.color)}
`
export const Subtitle2R = styled.Text`
  font-weight: normal;
  font-size: 18px;
  color: ${(props : TextProps) => (props.color)}
`
export const Subtitle3 = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${(props : TextProps) => (props.color)}
`
export const Body1B = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${(props : TextProps) => (props.color)}
`
export const Body1R = styled.Text`
  font-weight: normal;
  font-size: 16px;
  color: ${(props : TextProps) => (props.color)}
`
export const Body2B = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: ${(props : TextProps) => (props.color)}
`
export const Body2R = styled.Text`
  font-weight: normal;
  font-size: 14px;
  color: ${(props : TextProps) => (props.color)}
`
export const Body3 = styled.Text`
  font-weight: normal;
  font-size: 12px;
  color: ${(props : TextProps) => (props.color)}
`
export const Button1B = styled.Text`
  font-weight: 600;
  font-size: 16px;
  color: ${(props : TextProps) => (props.color)}
`
export const Button1R = styled.Text`
  font-weight: normal;
  font-size: 16px;
  color: ${(props : TextProps) => (props.color)}
`
export const Button2B = styled.Text`
  font-weight: 600;
  font-size: 14px;
  color: ${(props : TextProps) => (props.color)}
`
export const Button2R = styled.Text`
  font-weight: normal;
  font-size: 14px;
  color: ${(props : TextProps) => (props.color)}
`
export const Button3 = styled.Text`
  font-weight: normal;
  font-size: 12px;
  color: ${(props : TextProps) => (props.color)}
`
export const Caption = styled.Text`
  font-weight: normal;
  font-size: 12px;
  color: ${(props : TextProps) => (props.color)}
`

export const DiarySubtitle3 = styled(Subtitle3)`
`;

export const DiaryBody2R = styled(Body2R)`
`;