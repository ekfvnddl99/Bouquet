import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as elses from '../../styles/styled-components/elses';
import useCharacterView from '../../logics/hooks/useCharacterView';

type ProfileImageItemProps = {
  diameter: number;
  img: string;
  name: number;
};
/**
 * 원형의 프로필 사진 컴포넌트
 *
 * @param diameter 원형 지름
 * @param img 프로필 사진
 * @param name 프로필의 이름
 */
export default function ProfileImageItem({
  diameter,
  img,
  name,
}: ProfileImageItemProps): React.ReactElement {
  const [viewCharacter, setViewCharacter] = useCharacterView();
  const navigation = useNavigation();
  /**
   * '상세 프로필' 화면으로 이동하는 함수
   */
  function goProfileDetail() {
    setViewCharacter(name);
    navigation.navigate('ProfileDetailStack');
  }
  return (
    <TouchableOpacity activeOpacity={1} onPress={() => goProfileDetail}>
      <elses.CircleImg diameter={diameter} source={{ uri: img }} />
    </TouchableOpacity>
  );
}
