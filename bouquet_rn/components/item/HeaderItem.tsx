import React from 'react';
import { View, TouchableWithoutFeedback } from 'react-native';

// styles
import * as area from '../../styles/styled-components/area';

// components
import BackButton from '../button/BackButton';
import ProfileButton from '../button/ProfileButton';

type HeaderItemProps = {
  isAccount: boolean;
  isBackButton: boolean;
  name: string;
  profileImg: string;
};
/**
 * 가장 상단에 위치한 헤더
 * @description '뒤로가기 버튼'과 누르면 상세 디테일로 이동하는 '프로필 사진'이 같이 있다.
 *
 * @param isAccount 계정 프로필인지 아닌지
 * @param isBackButton '뒤로가기 버튼' 있는지 아닌지
 * @param name 프로필 이름
 * @param profileImg 프로필 이미지
 */
export default function HeaderItem({
  isAccount,
  isBackButton,
  name,
  profileImg,
}: HeaderItemProps): React.ReactElement {
  return (
    <area.RowArea style={{ paddingHorizontal: 30, paddingVertical: 16 }}>
      {isBackButton ? <BackButton /> : null}
      <View style={{ flex: 1 }} />
      <TouchableWithoutFeedback>
        <ProfileButton
          diameter={28}
          isAccount={isAccount}
          isJustImg
          name={name}
          profileImg={profileImg}
        />
      </TouchableWithoutFeedback>
    </area.RowArea>
  );
}
