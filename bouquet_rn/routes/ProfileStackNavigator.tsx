import React from 'react';

// navigation tools
import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

// screens
import ProfileOverviewScreen from '../screens/main/Profile/ProfileOverviewScreen';

import {
  ProfileDetailStackNavigator,
  PostStackNavigator,
  SettingStackNavigator,
  AccountStackNavigator,
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
        name="ProfileTabProfileDetailStack"
        component={ProfileDetailStackNavigator}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ProfileTabPostStack"
        component={PostStackNavigator}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="SettingStack"
        component={SettingStackNavigator}
        options={{ headerShown: false }}
      />
      <ProfileStack.Screen
        name="ProfileTabAccountStack"
        component={AccountStackNavigator}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}
