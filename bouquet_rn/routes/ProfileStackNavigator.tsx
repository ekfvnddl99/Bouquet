import React from 'react';

// navigation tools
import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

// screens
import ProfileOverviewScreen from '../screens/main/Profile/ProfileOverviewScreen';

import {
  ProfileDetailStackNavigator,
  SettingStackNavigator,
  WritingStackNavigator,
} from './CommonNavigator';

// profile
const ProfileStack = createStackNavigator<Types.ProfileStackParam>();
export default function ProfileStackNavigator(): React.ReactElement {
  return (
    <ProfileStack.Navigator initialRouteName="ProfileOverview">
      <ProfileStack.Screen
        name="ProfileOverview"
        component={ProfileOverviewScreen}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ProfileDetailStack"
        component={ProfileDetailStackNavigator}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="SettingStack"
        component={SettingStackNavigator}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="WritingStack"
        component={WritingStackNavigator}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}
