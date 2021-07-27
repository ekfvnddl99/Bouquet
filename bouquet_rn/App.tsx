import { StatusBar } from 'expo-status-bar';
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