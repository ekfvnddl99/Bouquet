import React, { useState } from 'react';
import { KeyboardTypeOptions, View } from 'react-native';

// styles
import colors from '../../styles/colors';
import * as input from '../../styles/styled-components/input';
import * as text from '../../styles/styled-components/text';

// components
import WarningText from '../text/WarningText';

// logics
import { getByte } from '../../logics/non-server/Calculation';

interface ConditionTextInputProps {
  height: number;
  placeholder: string;
  onChangeText: (param: string) => void;
  keyboardType: KeyboardTypeOptions;
  isWarning: boolean;
  textValue: string | undefined;
  warnText: string;
  conditionTag?: JSX.Element;
  byteNum?: number;
  maxLength?: number;
  multiline?: boolean;
}
/**
 * 조건을 맞춰야 하는 입력을 받는 textinput (레지스터, 캐릭터 생성)
 *
 * @param height 버튼 높이
 * @param placeholder textinput의 placeholder
 * @param onChangeText textinput의 onChangeText 함수 역할을 할 것
 * @param keyboardType textinput의 keyboard type
 * @param isWarning 조건을 모두 만족했는가
 * @param textValue textinput의 value가 될 것
 * @param warnText 조건에 맞지 않을 경우 띄우는 경고 문구
 * ---------------
 * @param conditionTag 조건들이 적힌 JSX 태그
 * @param byteNum 바이트 조건이 있다면 제한 바이트 수
 * @param maxLength 글자 수 제한이 있다면 최대 글자 길이
 * @param multiline 여러 줄 쓸 수 있는지
 */
export default function ConditionTextInput({
  height,
  placeholder,
  onChangeText,
  keyboardType,
  isWarning,
  textValue,
  warnText,
  conditionTag,
  byteNum,
  maxLength,
  multiline,
}: ConditionTextInputProps): React.ReactElement {
  // 지금 내가 누르고 있는 textinput인지
  const [isFocus, setFocus] = useState(false);
  return (
    <View style={{ marginBottom: 16 }}>
      <input.FormInput
        height={height}
        placeholder={placeholder}
        onChangeText={(t) => onChangeText(t)}
        keyboardType={keyboardType}
        value={textValue}
        onFocus={() => setFocus(true)}
        maxLength={maxLength}
        multiline={multiline}
        style={
          isWarning && isFocus
            ? { borderWidth: 1, borderColor: colors.warning_red }
            : null
        }
      />
      <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          {isWarning && isFocus ? (
            <WarningText content={warnText} marginTop={8} />
          ) : null}
          {conditionTag || null}
        </View>

        {byteNum && textValue ? (
          <text.Caption textColor={colors.gray6} style={{ marginTop: 8 }}>
            {getByte(textValue)} / {byteNum} byte
          </text.Caption>
        ) : null}
      </View>
    </View>
  );
}
