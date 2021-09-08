import React, { useState } from 'react';
import { View, FlatList, TouchableWithoutFeedback } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import colors from '../../styles/colors';
import * as area from '../../styles/styled-components/area';
import * as text from '../../styles/styled-components/text';

// props & logic
import type { SettingProps } from '../../utils/types/NavigationTypes';

// components
import SettingToggleItem from '../../components/item/SettingToggleItem';
import HeaderItem from '../../components/item/HeaderItem';
import useUser from '../../logics/hooks/useUser';
import useCharacterList from '../../logics/hooks/useCharacterList';

type ParamList = {
  SettingAlarm: {
    title: string;
  };
};
export default function SettingAlarmCustomScreen({
  props,
}: {
  props: SettingProps;
}): React.ReactElement {
  const user = useUser();
  const characterList = useCharacterList();

  const [selectId, setSelectId] = useState(-1);
  const route = useRoute<RouteProp<ParamList, 'SettingAlarm'>>();
  const title: string = route.params?.title;

  return (
    <area.Container>
      <HeaderItem
        isAccount
        isBackButton
        name={user.name}
        profileImg={user.profile_img}
      />

      <View style={{ paddingHorizontal: 30 }}>
        <text.Subtitle2B textColor={colors.black} style={{ marginBottom: 11 }}>
          {title}
        </text.Subtitle2B>
        <area.NoHeightArea marBottom={0} paddingH={8} paddingV={8}>
          <FlatList
            data={characterList}
            keyExtractor={(item) => item.id.toString()}
            renderItem={(obj) => (
              <TouchableWithoutFeedback
                onPress={() => {
                  if (selectId === obj.index) setSelectId(-1);
                  else setSelectId(obj.index);
                }}
              >
                <SettingToggleItem characterInfo={obj.item} />
              </TouchableWithoutFeedback>
            )}
          />
        </area.NoHeightArea>
      </View>
    </area.Container>
  );
}
