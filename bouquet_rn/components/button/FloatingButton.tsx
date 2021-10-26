import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// styles
import * as elses from '../../styles/styled-components/elses';
import colors from '../../styles/colors';

// assets
import Svg from '../../assets/Icon';

type FloatingButtonProps = {
  routePrefix: string;
};
/**
 * 글을 쓸 수 있는 플로팅 버튼
 *
 * @param routePrefix 라우트 접두사. 어느 탭에서 왔는가!
 */
export default function FloatingButton({
  routePrefix,
}: FloatingButtonProps): React.ReactElement {
  const navigation = useNavigation();
  /**
   * '글쓰기' 화면으로 이동하는 함수
   */
  function goWritingStack() {
    navigation.navigate('WritingStack', {
      screen: 'PostWriting',
      params: { routePrefix },
    });
  }

  return (
    <TouchableOpacity
      style={{ bottom: 20, position: 'absolute', right: 20 }}
      onPress={() => goWritingStack()}
    >
      <elses.Circle diameter={50} backgroundColor={colors.primary}>
        <Svg icon="writeWhite" size={24} />
      </elses.Circle>
    </TouchableOpacity>
  );
}
