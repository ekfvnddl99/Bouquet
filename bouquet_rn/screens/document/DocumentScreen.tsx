import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';

// styles
import * as area from '../../styles/styled-components/area';

// components
import BackButton from '../../components/button/BackButton';
import colors from '../../styles/colors';

// view
import OpenSourceView from './OpenSourceView';
import PersonalInfoView from './PersonalInfoView';
import ServiceTermView from './ServiceTermView';

type ParamList = {
  Document: {
    screen: string;
  };
};
export default function DocumentScreen(): React.ReactElement {
  const [screen, setScreen] = useState('');
  const route = useRoute<RouteProp<ParamList, 'Document'>>();
  useEffect(() => {
    if (route.params !== undefined) setScreen(route.params.screen);
  }, []);
  const viewArray = [
    { screen: 'OpenSource', view: <OpenSourceView /> },
    { screen: 'PersonalInfo', view: <PersonalInfoView /> },
    { screen: 'ServiceTerm', view: <ServiceTermView /> },
  ];

  function setView() {
    for (let i = 0; i < viewArray.length; i += 1) {
      if (viewArray[i].screen === screen) return viewArray[i].view;
    }
    return null;
  }

  return (
    <area.Container style={{ backgroundColor: colors.white }}>
      <area.RowArea style={{ paddingHorizontal: 30, paddingVertical: 16 }}>
        <BackButton />
        <View style={{ flex: 1 }} />
      </area.RowArea>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 20 }}>
        {setView()}
      </View>
    </area.Container>
  );
}
