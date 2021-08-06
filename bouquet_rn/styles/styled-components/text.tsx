import styled from 'styled-components/native';

interface TextProps{
  color : string,
}
export const Title = styled.Text`
  font-family : 'bold';
  font-weight: bold;
  font-size: 32px;
  line-height : ${32*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Subtitle1 = styled.Text`
  font-family : 'bold';
  font-weight: bold;
  font-size: 22px;
  line-height : ${22*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Subtitle2B = styled.Text`
  font-family : 'bold';
  font-weight: bold;
  font-size: 18px;
  line-height : ${18*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Subtitle2R = styled.Text`
  font-family : 'regular';
  font-weight: normal;
  font-size: 18px;
  line-height : ${18*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Subtitle3 = styled.Text`
  font-family : 'semibold';
  font-weight: 600;
  font-size: 16px;
  line-height : ${16*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Body1B = styled.Text`
  font-family : 'semibold';
  font-weight: 600;
  font-size: 16px;
  line-height : ${16*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Body1R = styled.Text`
  font-family : 'regular';
  font-weight: normal;
  font-size: 16px;
  line-height : ${16*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Body2B = styled.Text`
  font-family : 'semibold';
  font-weight: 600;
  font-size: 14px;
  line-height : ${14*1.25}px;
  color: ${(props : TextProps) => (props.color)}
`
export const Body2R = styled.Text`
  font-family : 'regular';
  font-weight: normal;
  font-size: 14px;
  line-height : ${14*1.25}px;
  color: ${(props : TextProps) => (props.color)}
`
export const Body3 = styled.Text`
  font-family : 'regular';
  font-weight: normal;
  font-size: 12px;
  line-height : ${12*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Button1B = styled.Text`
  font-family : 'semibold';
  font-weight: 600;
  font-size: 16px;
  line-height : ${16*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Button1R = styled.Text`
  font-family : 'regular';
  font-weight: normal;
  font-size: 16px;
  line-height : ${16*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Button2B = styled.Text`
  font-family : 'semibold';
  font-weight: 600;
  font-size: 14px;
  line-height : ${14*1.25}px;
  color: ${(props : TextProps) => (props.color)}
`
export const Button2R = styled.Text`
  font-family : 'regular';
  font-weight: normal;
  font-size: 14px;
  line-height : ${14*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Button3 = styled.Text`
  font-family : 'regular';
  font-weight: normal;
  font-size: 12px;
  line-height : ${12*1.25};
  color: ${(props : TextProps) => (props.color)}
`
export const Caption = styled.Text`
  font-family : 'light';
  font-weight: normal;
  font-size: 12px;
  line-height : ${12*1.25};
  color: ${(props : TextProps) => (props.color)}
`

export const DiarySubtitle3 = styled(Subtitle3)`
`;

export const DiaryBody2R = styled(Body2R)`
`;