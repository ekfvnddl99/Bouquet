import React from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// assets
import Svg from '../../assets/Icon';

/**
 * 스플래시 화면
 * @returns
 */
export default function SplashScreen(): React.ReactElement {
  return (
    <View
      style={{
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
      }}
    >
      <StatusBar hidden />
      <Svg icon="logo" size={150} />
    </View>
  );
}
