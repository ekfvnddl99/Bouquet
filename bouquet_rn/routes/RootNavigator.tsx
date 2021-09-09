import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

// logics
import useUser from '../logics/hooks/useUser';

// screens
import SplashScreen from '../screens/former/SplashScreen';
import TabNavigator from './TabNavigator';
import WelcomeStackNavigator from './WelcomeStackNavigator';

import CharacterGenerationScreen from '../screens/character/CharacterGenerationScreen';

export default function AppStack(): React.ReactElement {
  const [isSplash, setIsSplash] = useState(true);
  const user = useUser();

  useEffect(() => {
    setTimeout(() => {
      setIsSplash(false);
    }, 2000);
  });

  // // 2
  // let Screen;

  // if (isSplash) {
  //   Screen = <SplashScreen />;
  // } else if (user !== undefined) {
  //   Screen = <CharacterGenerationScreen />;
  // } else {
  //   Screen = <WelcomeStackNavigator />;
  // }

  // 3
  const normalScreen =
    user.name !== '' ? (
      <>
        <TabNavigator />
        <CharacterGenerationScreen />
      </>
    ) : (
      <WelcomeStackNavigator />
    );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isSplash ? <SplashScreen /> : normalScreen}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
