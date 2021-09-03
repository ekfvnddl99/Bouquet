import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// styles
import * as elses from '../../styles/styled-components/elses';
import colors from '../../styles/colors';

// assets
import Svg from '../../assets/Icon';

/**
 * 글을 쓸 수 있는 플로팅 버튼
 */
export default function FloatingButton(): React.ReactElement {
  const navigation = useNavigation();

  /**
   * '글쓰기' 화면으로 이동하는 함수
   */
  function goPostWriting() {
    navigation.navigate('WritingStack');
  }

  return (
    <TouchableOpacity
      style={{ bottom: 20, position: 'absolute', right: 20 }}
      onPress={() => goPostWriting}
    >
      <elses.Circle diameter={50} backgroundColor={colors.primary}>
        <Svg icon="writeWhite" size={24} />
      </elses.Circle>
    </TouchableOpacity>
  );
}
