import { useSafeAreaInsets, SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import {RecoilRoot, atom, useRecoilState} from 'recoil';

import AppStack from './screens/'

export default function App() {
  return (
    <RecoilRoot>
      <AppStack/>
    </RecoilRoot>
  );
}