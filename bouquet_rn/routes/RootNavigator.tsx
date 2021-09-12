import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

// logics
import useLogin from '../logics/hooks/useLogin';

// screens, navigators
import SplashScreen from '../screens/former/SplashScreen';
import WelcomeStackNavigator from './WelcomeStackNavigator';

export default function AppStack(): React.ReactElement {
  const [isSplash, setIsSplash] = useState(true);
  const [login] = useLogin();

  useEffect(() => {
    login();
    setTimeout(() => {
      setIsSplash(false);
    }, 2000);
  }, []);

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
  const RootStack = createStackNavigator<Types.RootParam>();
  const normalScreen = (
    <RootStack.Navigator>
      <RootStack.Screen
        name="RootWelcome"
        component={WelcomeStackNavigator}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isSplash ? <SplashScreen /> : normalScreen}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
