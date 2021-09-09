import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

// logics
import useUser from '../logics/hooks/useUser';

// screens, navigators
import SplashScreen from '../screens/former/SplashScreen';
import TabNavigator from './TabNavigator';
import WelcomeStackNavigator from './WelcomeStackNavigator';
import { CharacterGenerationStackNavigator } from './CommonNavigator';
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
  const RootStack = createStackNavigator<Types.RootParam>();
  const normalScreen = (
    <RootStack.Navigator>
      {user.name !== '' ? (
        <RootStack.Screen
          name="RootTab"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
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
