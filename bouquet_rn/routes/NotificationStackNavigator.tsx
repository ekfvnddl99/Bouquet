import React from 'react';

// navigation tools
import { createStackNavigator } from '@react-navigation/stack';
import * as Types from '../utils/types/NavigationTypes';

// screens
import NotificationScreen from '../screens/main/Notification/NotificationScreen';
import { ProfileDetailStackNavigator } from './CommonNavigator';

// noti
const NotificationStack = createStackNavigator<Types.NotificationStackParam>();
export default function NotificationStackNavigator(): React.ReactElement {
  return (
    <NotificationStack.Navigator initialRouteName="Notification">
      <NotificationStack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{ headerShown: false }}
      />
      <NotificationStack.Screen
        name="ProfileDetailStack"
        component={ProfileDetailStackNavigator}
        options={{ headerShown: false }}
      />
    </NotificationStack.Navigator>
  );
}
