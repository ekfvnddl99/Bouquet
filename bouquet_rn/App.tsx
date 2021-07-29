import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import React from 'react';
import {RecoilRoot} from 'recoil';

import AppStack from './screens/'

export default function App() {
  return (
    <RecoilRoot>
      <AppStack/>
    </RecoilRoot>
  );
}