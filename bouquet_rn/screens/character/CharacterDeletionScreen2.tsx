import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// components
import ConditionButton from '../../components/button/ConditionButton';
import NameNText from '../../components/text/NameNText';

type CharacterDeletionScreen2Props = {
  profileImg: string;
  name: string;
  navigation: any;
};
/**
 * 캐릭터 삭제 됐다고 말하는 화면
 *
 * @param profileImg 삭제될 캐릭터의 프로필 이미지
 * @param name 삭제될 캐릭터의 이름
 * @param navigation 돌아가기 버튼 누를 때 필요한 네비게이션 변수
 * @returns
 */
export default function CharacterDeletionScreen2({
  profileImg,
  name,
  navigation,
}: CharacterDeletionScreen2Props): React.ReactElement {
  // 돌아가기 버튼 누르면 실행되는 함수. 프로필 탭으로 이동한다.
  function goProfile() {
    navigation.replace('Profile');
  }

  return (
    <area.Container>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        <elses.CircleImg
          diameter={120}
          source={{ uri: profileImg }}
          style={{ marginBottom: 16 }}
        />
        <NameNText name={name} sub={i18n.t('님으로')} />
        <text.Subtitle2R textColor={colors.black}>
          {i18n.t('보여 주신 새로운 모습이')}
        </text.Subtitle2R>
        <text.Subtitle2R textColor={colors.black}>
          {i18n.t('아름다웠습니다')}
        </text.Subtitle2R>
      </View>

      <area.BottomArea style={{ marginBottom: 16 }}>
        <ConditionButton
          height={44}
          isActive
          onPress={() => goProfile()}
          content={i18n.t('캐릭터 목록으로 돌아가기')}
          paddingH={0}
          paddingV={14}
        />
      </area.BottomArea>
    </area.Container>
  );
}
