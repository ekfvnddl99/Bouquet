import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

// assets
import Svg from '../../assets/Icon';

/**
 * 뒤로가기 버튼 컴포넌트
 */
export default function BackButton(): React.ReactElement {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Svg icon="arrowLeft" size={24} />
    </TouchableOpacity>
  );
}
