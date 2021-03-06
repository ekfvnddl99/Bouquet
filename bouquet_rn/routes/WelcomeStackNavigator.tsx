import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

import useUser from '../logics/hooks/useUser';

// screens
import WelcomeScreen from '../screens/former/WelcomeScreen';
import LoginScreen from '../screens/former/LoginScreen';
import RegisterScreen from '../screens/former/register/RegisterScreen';
import TabNavigator from './TabNavigator';
import CharacterGenerationScreen from '../screens/character/CharacterGenerationScreen';
import AccountDeletionScreen2 from '../screens/setting/AccountDeletionScreen2';
import { WritingStackNavigator } from './CommonNavigator';
import DocumentScreen from '../screens/document/DocumentScreen';
import FindPasswordScreen from '../screens/former/FindPasswordScreen';

// CharacterGeneration과 AccountDeletion2는 바텀 탭이 필요없는 스크린입니다.
const WelcomeStack = createStackNavigator<Types.WelcomeStackParam>();
export default function WelcomeStackNavigator(): React.ReactElement {
  const user = useUser();
  return (
    <WelcomeStack.Navigator
      initialRouteName={user.name !== '' ? 'Tab' : 'Welcome'}
    >
      <WelcomeStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="CharacterGeneration"
        component={CharacterGenerationScreen}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="SettingAccountDeletion2"
        component={AccountDeletionScreen2}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="WritingStack"
        component={WritingStackNavigator}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="DocumentScreen"
        component={DocumentScreen}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="FindPassword"
        component={FindPasswordScreen}
        options={{ headerShown: false }}
      />
    </WelcomeStack.Navigator>
  );
}
