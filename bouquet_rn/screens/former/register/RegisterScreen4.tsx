import React from 'react';
import { View } from 'react-native';
import i18n from 'i18n-js';

// styles
import colors from '../../../styles/colors';
import * as area from '../../../styles/styled-components/area';
import * as text from '../../../styles/styled-components/text';
import * as elses from '../../../styles/styled-components/elses';

// logics
import { getPushNotificationsPermission } from '../../../logics/server/Notification';

// components
import ConditionButton from '../../../components/button/ConditionButton';
import NameNText from '../../../components/text/NameNText';
import { getImagePickerPermission } from '../../../logics/server/Post';

type RegisterScreen4Props = {
  name: string;
  profileImg: string;
  navigation: any;
  setNewPasswordString?: string;
};
/**
 * 회원가입 네 번째 화면.
 * @description 마지막 화면
 *
 * @param name 이름 변수
 * @param profileImg 이미지 변수
 * @param navigation 네비게이션 변수
 * @param setNewPasswordString 비밀번호 재설정 때 사용하게 될 문장
 * @returns
 */
export default function RegisterScreen4({
  name,
  profileImg,
  navigation,
  setNewPasswordString,
}: RegisterScreen4Props): React.ReactElement {
  /**
   * '메인 탭'으로 이동하는 함수
   */
  async function goNext() {
    if (setNewPasswordString !== undefined)
      navigation.reset({
        index: 1,
        routes: [{ name: 'Welcome' }, { name: 'Login' }],
      });
    else navigation.reset({ index: 0, routes: [{ name: 'Tab' }] });
  }

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          alignItems: 'center',
          flex: 1,
          justifyContent: 'center',
        }}
      >
        {setNewPasswordString !== undefined ? null : (
          <>
            <elses.CircleImg
              diameter={120}
              source={{ uri: profileImg }}
              style={{ marginBottom: 16 }}
            />
            <NameNText name={name} sub="님," />
          </>
        )}
        <text.Subtitle2R textColor={colors.black}>
          {setNewPasswordString !== undefined
            ? setNewPasswordString
            : i18n.t('환영합니다')}
        </text.Subtitle2R>
      </View>

      <area.ContainerBlank20>
        <area.BottomArea style={{ marginBottom: 16 }}>
          <ConditionButton
            isActive
            onPress={() => goNext()}
            content={i18n.t('시작')}
            paddingH={0}
            paddingV={14}
            height={45}
          />
        </area.BottomArea>
      </area.ContainerBlank20>
    </View>
  );
}
