import React from 'react';

// navigation tools
import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

// screens
import HomeScreen from '../screens/main/Home/HomeScreen';
import {
  ProfileDetailStackNavigator,
  PostStackNavigator,
  AccountStackNavigator,
} from './CommonNavigator';

// home
const HomeStack = createStackNavigator<Types.HomeStackParam>();
export default function HomeStackNavigator(): React.ReactElement {
  return (
    <HomeStack.Navigator initialRouteName="Home">
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="HomeTabProfileDetailStack"
        component={ProfileDetailStackNavigator}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="HomeTabPostStack"
        component={PostStackNavigator}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="HomeTabAccountStack"
        component={AccountStackNavigator}
        options={{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
}
