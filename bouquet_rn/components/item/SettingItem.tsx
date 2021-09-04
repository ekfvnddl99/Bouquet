import React from 'react';
import { TouchableOpacity } from 'react-native';
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// assets
import Icon from '../../assets/Icon';

type SettingItemProps = {
  content: string;
  onPress: () => void;
};
/**
 * '설정' 화면에서 설정 항목 컴포넌트
 *
 * @param content 설정 항목 내용
 * @param onPress 항목 눌렀을 때 실행되는 함수
 */
export default function SettingItem({
  content,
  onPress,
}: SettingItemProps): React.ReactElement {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ paddingVertical: 8, paddingHorizontal: 8 }}
    >
      <area.RowArea>
        <text.Body2B textColor={colors.black} style={{ flex: 1 }}>
          {content}
        </text.Body2B>
        <Icon icon="arrowRight" size={16} />
      </area.RowArea>
    </TouchableOpacity>
  );
}
