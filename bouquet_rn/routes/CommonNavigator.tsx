import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

// screens
import PostWritingScreen from '../screens/common/PostWritingScreen';
import SelectTemplateScreen from '../screens/common/SelectTemplateScreen';

import PostDetailScreen from '../screens/common/PostDetailScreen';

import ProfileDetailScreen from '../screens/main/Profile/ProfileDetailScreen';
import CharacterDeletionScreen from '../screens/character/CharacterDeletionScreen';
import AccountScreen from '../screens/common/AccountScreen';

import SettingScreen from '../screens/setting/SettingScreen';
import SettingProfileScreen from '../screens/setting/SettingProfileScreen';
import SettingAlarmScreen from '../screens/setting/SettingAlarmScreen';
import SettingAlarmCustomScreen from '../screens/setting/SettingAlarmCustomScreen';
import AccountDeletionScreen1 from '../screens/setting/AccountDeletionScreen1';

// writing - fab
const WritingStack = createStackNavigator<Types.WritingStackParam>();
export function WritingStackNavigator(): React.ReactElement {
  return (
    <WritingStack.Navigator initialRouteName="PostWriting">
      <WritingStack.Screen
        name="PostWriting"
        component={PostWritingScreen}
        options={{ headerShown: false }}
      />
      <WritingStack.Screen
        name="SelectTemplate"
        component={SelectTemplateScreen}
        options={{ headerShown: false }}
      />
      <WritingStack.Screen
        name="PostStack"
        component={PostStackNavigator}
        options={{ headerShown: false }}
      />
    </WritingStack.Navigator>
  );
}
// post item
const PostStack = createStackNavigator<Types.PostStackParam>();
export function PostStackNavigator(): React.ReactElement {
  return (
    <PostStack.Navigator initialRouteName="PostDetail">
      <PostStack.Screen
        name="PostDetail"
        component={PostDetailScreen}
        options={{ headerShown: false }}
      />
      <PostStack.Screen
        name="ProfileDetailStack"
        component={ProfileDetailStackNavigator}
        options={{ headerShown: false }}
      />
    </PostStack.Navigator>
  );
}
// profile item - profileoverview, character item
const ProfileDetailStack =
  createStackNavigator<Types.ProfileDetailStackParam>();
export function ProfileDetailStackNavigator(): React.ReactElement {
  return (
    <ProfileDetailStack.Navigator initialRouteName="ProfileDetail">
      <ProfileDetailStack.Screen
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{ headerShown: false }}
      />
      <ProfileDetailStack.Screen
        name="ProfileDeletion"
        component={CharacterDeletionScreen}
        options={{ headerShown: false }}
      />
      <ProfileDetailStack.Screen
        name="PostStack"
        component={PostStackNavigator}
        options={{ headerShown: false }}
      />
      <ProfileDetailStack.Screen
        name="AccountStack"
        component={AccountStackNavigator}
        options={{ headerShown: false }}
      />
    </ProfileDetailStack.Navigator>
  );
}

// setting
const SettingStack = createStackNavigator<Types.SettingStackParam>();
export function SettingStackNavigator(): React.ReactElement {
  return (
    <SettingStack.Navigator initialRouteName="Setting">
      <SettingStack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <SettingStack.Screen
        name="SettingAlarm"
        component={SettingAlarmScreen}
        options={{ headerShown: false }}
      />
      <SettingStack.Screen
        name="SettingAlarmCustom"
        component={SettingAlarmCustomScreen}
        options={{ headerShown: false }}
      />
      <SettingStack.Screen
        name="SettingProfile"
        component={SettingProfileScreen}
        options={{ headerShown: false }}
      />
      <SettingStack.Screen
        name="AccountStack"
        component={AccountStackNavigator}
        options={{ headerShown: false }}
      />
      <SettingStack.Screen
        name="SettingAccountDeletion1"
        component={AccountDeletionScreen1}
        options={{ headerShown: false }}
      />
    </SettingStack.Navigator>
  );
}
// account
const AccountStack = createStackNavigator<Types.AccountStackParam>();
export function AccountStackNavigator(): React.ReactElement {
  return (
    <AccountStack.Navigator initialRouteName="Account">
      <AccountStack.Screen
        name="Account"
        component={AccountScreen}
        options={{ headerShown: false }}
      />
      <AccountStack.Screen
        name="ProfileDetailStack"
        component={ProfileDetailStackNavigator}
        options={{ headerShown: false }}
      />
    </AccountStack.Navigator>
  );
}
