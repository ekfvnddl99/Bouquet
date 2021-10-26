import React, { useCallback, useState } from 'react';
import { Alert, View } from 'react-native';
import i18n from 'i18n-js';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';
import * as elses from '../../styles/styled-components/elses';

// logics
import { deleteUserAsync } from '../../logics/server/User';
import useUser from '../../logics/hooks/useUser';

// components
import ConditionButton from '../../components/button/ConditionButton';
import NameNText from '../../components/text/NameNText';
import HeaderItem from '../../components/item/HeaderItem';

export default function AccountDeletionScreenOne(): React.ReactElement {
  const user = useUser();

  const navigation = useNavigation();
  const resetAllLocalStorage = async () => {
    await AsyncStorage.clear();
  };

  const [loading, setLoading] = useState(false);
  const deleteNgoScreenTwo = useCallback(async () => {
    if (loading) return;
    setLoading(true);

    const serverResult = await deleteUserAsync();
    if (serverResult.isSuccess) {
      await resetAllLocalStorage();
      navigation.reset({
        index: 0,
        routes: [{ name: 'SettingAccountDeletion2' }],
      });
    } else alert(serverResult.result.errorMsg);
    setLoading(false);
  }, [deleteUserAsync]);

  return (
    <area.Container>
      <HeaderItem
        isAccount
        isBackButton
        name={user.name}
        profileImg={user.profile_img}
        routePrefix="ProfileTab"
      />

      <area.ContainerBlank20>
        <text.Subtitle1 textColor={colors.black} style={{ marginBottom: 32 }}>
          {i18n.t('계정 삭제')}
        </text.Subtitle1>
        <View style={{ alignItems: 'center' }}>
          <elses.CircleImg
            diameter={120}
            source={{ uri: user.profile_img }}
            style={{ marginBottom: 16 }}
          />
          <NameNText name={user.name} sub={`${i18n.t('님')},`} />
          <text.Subtitle2R textColor={colors.black}>
            {i18n.t('정말로') +
              i18n.t('삭제하시겠어요') +
              (i18n.locale === 'en' ? '?' : '')}
          </text.Subtitle2R>
        </View>
        <area.BottomArea style={{ marginBottom: 16 }}>
          <View style={{ alignItems: 'center' }}>
            <text.Button3 textColor={colors.gray6} style={{ marginBottom: 16 }}>
              {i18n.t('아쉽지만 계정은 삭제하면 복구하지 못해요')}
            </text.Button3>
          </View>
          <ConditionButton
            height={45}
            isActive
            onPress={deleteNgoScreenTwo}
            content={i18n.t('계정 삭제')}
            paddingH={0}
            paddingV={14}
          />
        </area.BottomArea>
      </area.ContainerBlank20>
    </area.Container>
  );
}
