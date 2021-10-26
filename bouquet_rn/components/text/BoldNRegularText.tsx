import React from 'react';
import { View } from 'react-native';

// styles
import * as text from '../../styles/styled-components/text';

type BoldNRegularTextProps = {
  boldContent: string;
  regularContent: string;
  textColor: string;
  isCenter: boolean;
  isMultiline: boolean;
};
/**
 * '상세 프로필' 화면에서 bold 글자, regular 글자 같이 되어있는 거 나타내는 컴포넌트
 * @description ex : bold(국적) regular(대한민국)
 *
 * @param boldContent bold 글자 내용
 * @param regularContent regular 글자 내용
 * @param textColor 글자 색
 * @param isCenter 가운데 정렬이 필요한가
 * @param isMultiline 여러 줄이 필요한가
 */
export default function BoldNRegularText({
  boldContent,
  regularContent,
  textColor,
  isCenter,
  isMultiline,
}: BoldNRegularTextProps): React.ReactElement {
  return (
    <View style={isCenter ? { alignItems: 'center' } : null}>
      <text.Body2B textColor={textColor}>{boldContent}</text.Body2B>
      <text.Body2R
        textColor={textColor}
        numberOfLines={isMultiline ? undefined : 1}
      >
        {regularContent}
      </text.Body2R>
    </View>
  );
}
