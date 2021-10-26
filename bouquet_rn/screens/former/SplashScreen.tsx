import React from 'react';
import { View, ImageBackground } from 'react-native';
import { StatusBar } from 'expo-status-bar';

/**
 * 스플래시 화면
 * @returns
 */
export default function SplashScreen(): React.ReactElement {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        source={require('../../assets/png/splash.png')}
        resizeMode="contain"
        style={{ flex: 1, justifyContent: 'center' }}
      >
        <StatusBar hidden />
      </ImageBackground>
    </View>
  );
}
