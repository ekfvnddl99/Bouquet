import React from 'react';
import { View, Linking } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// components
import SettingItem from '../../components/item/SettingItem';
import HeaderItem from '../../components/item/HeaderItem';

// logics
import useUser from '../../logics/hooks/useUser';
import useLogin from '../../logics/hooks/useLogin';

export default function SettingScreen(): React.ReactElement {
  const user = useUser();
  const [, logout] = useLogin();
  const navigation = useNavigation();
  /**
   * 로그아웃 하는 함수
   */
  async function goOut() {
    await logout();
    navigation.reset({ index: 0, routes: [{ name: 'Welcome' }] });
  }

  async function openURL(url: string) {
    const isPossible = await Linking.canOpenURL(url);
    if (isPossible) await Linking.openURL(url);
    else alert('연결할 수 없는 링크예요. 다시 시도해 보거나, 문의해 주세요');
  }

  return (
    <area.Container>
      <HeaderItem
        isAccount
        isBackButton
        name={user.name}
        profileImg={user.profile_img}
        routePrefix="ProfileTab"
      />

      <View style={{ marginVertical: 20, paddingHorizontal: 30 }}>
        <text.Subtitle2B textColor={colors.black} style={{ marginBottom: 11 }}>
          {i18n.t('기본 설정')}
        </text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <SettingItem
            content={i18n.t('계정 프로필 수정')}
            onPress={() => navigation.navigate('SettingProfile')}
          />
          <SettingItem
            content={i18n.t('캐릭터별 알림 설정')}
            onPress={() => navigation.navigate('SettingAlarm')}
          />
          <SettingItem content={i18n.t('로그아웃')} onPress={() => goOut()} />
        </area.NoHeightArea>
      </View>

      <View style={{ marginVertical: 20, paddingHorizontal: 30 }}>
        <text.Subtitle2B textColor={colors.black} style={{ marginBottom: 11 }}>
          {i18n.t('정보')}
        </text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <SettingItem
            content={
              i18n.locale === 'en'
                ? `${i18n.t('소개')}Bouquet?`
                : `Bouquet ${i18n.t('소개')}`
            }
            onPress={() =>
              openURL(
                'https://www.notion.so/Bouquet-a3c86aea53414679b2fc2944a35bfcb9',
              )
            }
          />
          <SettingItem
            content={
              i18n.locale === 'en'
                ? `${i18n.t('소개') + i18n.t('달달한 오렌지 떡볶이')}?`
                : `${i18n.t('달달한 오렌지 떡볶이')} ${i18n.t('소개')}`
            }
            onPress={() =>
              openURL('https://www.notion.so/3a23a31569dd4a148b69a9d6a9461cbe')
            }
          />
          <SettingItem content={i18n.t('서비스 이용 약관')} />
          <SettingItem content={i18n.t('개인정보 취급 방침')} />
          <SettingItem content={i18n.t('오픈 소스 정보')} />
          <SettingItem
            content={i18n.t('문의/건의')}
            onPress={() => openURL('mailto:ekfvnddl99@naver.com')}
          />
        </area.NoHeightArea>
      </View>
    </area.Container>
  );
}
