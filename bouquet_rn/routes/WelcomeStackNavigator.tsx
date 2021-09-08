import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

// screens
import WelcomeScreen from '../screens/former/WelcomeScreen';
import LoginScreen from '../screens/former/LoginScreen';
import RegisterScreen from '../screens/former/register/RegisterScreen';
import TabNavigator from './TabNavigator';

const WelcomeStack = createStackNavigator<Types.WelcomeStackParam>();
export default function WelcomeStackNavigator(): React.ReactElement {
  return (
    <WelcomeStack.Navigator initialRouteName="Welcome">
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
    </WelcomeStack.Navigator>
  );
}
