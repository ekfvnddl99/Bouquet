import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import * as SecureStore from 'expo-secure-store';

import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

// logics
import useUser from '../logics/hooks/useUser';
import useLogin from '../logics/hooks/useLogin';

// screens, navigators
import SplashScreen from '../screens/former/SplashScreen';
import TabNavigator from './TabNavigator';
import WelcomeStackNavigator from './WelcomeStackNavigator';
import CharacterGenerationScreen from '../screens/character/CharacterGenerationScreen';

export default function AppStack(): React.ReactElement {
  const [isSplash, setIsSplash] = useState(true);
  const [login] = useLogin();
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
  const RootStack = createStackNavigator<Types.RootParam>();
  const normalScreen = (
    <RootStack.Navigator>
      {user.name !== '' ? (
        <>
          <RootStack.Screen
            name="RootTab"
            component={TabNavigator}
            options={{ headerShown: false }}
          />
          <RootStack.Screen
            name="CharacterGeneration"
            component={CharacterGenerationScreen}
            options={{ headerShown: false }}
          />
        </>
      ) : (
        <>
          <RootStack.Screen
            name="RootWelcome"
            component={WelcomeStackNavigator}
            options={{ headerShown: false }}
          />
        </>
      )}
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
