import React, { useState } from 'react';
import { View } from 'react-native';

// styles
import { colors } from '../../styles/colors';
import * as input from '../../styles/styled-components/input';
import * as text from '../../styles/styled-components/text';

// components
import WarningText from '../text/WarningText';

// logics
import { getByte } from '../../logics/non-server/Calculation';

interface ConditionTextInputProps {
  height: number;
  placeholder: string;
  onChange: any;
  keyboard: any;
  active: boolean;
  value: string;
  warnText: string;
  conditions?: any;
  byte?: number;
  maxLen?: number;
}
export default function ConditionTextInput({
  height,
  placeholder,
  onChange,
  keyboard,
  active,
  value,
  warnText,
  conditions,
  byte,
  maxLen,
}: ConditionTextInputProps): React.ReactElement {
  const [IsFocus, setFocus] = useState(false);
  return (
    <View style={{ marginBottom: 16 }}>
      <input.FormInput
        height={height}
        placeholder={placeholder}
        onChangeText={(t) => onChange(t)}
        keyboardType={keyboard}
        value={value}
        onFocus={() => setFocus(true)}
        maxLength={maxLen}
        style={
          active && IsFocus
            ? { borderWidth: 1, borderColor: colors.warning_red }
            : null
        }
      />
      <View style={{ alignItems: 'flex-start', flexDirection: 'row' }}>
        <View style={{ flex: 1 }}>
          {active && IsFocus ? (
            <WarningText content={warnText} marginTop={8} />
          ) : null}
          {conditions || null}
        </View>
        {byte ? (
          <text.Caption color={colors.gray6} style={{ marginTop: 8 }}>
            {getByte(value)} / {byte} byte
          </text.Caption>
        ) : null}
      </View>
    </View>
  );
}
