import React from 'react';
import { View } from 'react-native';

// navigation tools
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StackFrame } from 'react-native/Libraries/Core/Devtools/parseErrorStack';

import welcome from './welcome'

const Stack = createStackNavigator();

export default function AppStack(){
  return(
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="welcome">
        <Stack.Screen
        name="welcome" component={welcome} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}