import React from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useRecoilValue } from 'recoil';

// utils
import * as Types from '../utils/types/NavigationTypes';

// logics
import { isNewNotification } from '../logics/atoms';

// styles
import { TabBarArea } from '../styles/styled-components/area';

// assets
import Svg from '../assets/Icon';

// screens
import HomeStackNavigator from './HomeStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import NotificationStackNavigator from './NotificationStackNavigator';
import ProfileStackNavigator from './ProfileStackNavigator';

const Tab = createBottomTabNavigator<Types.TabParam>();
export default function TabNavigator(): React.ReactElement {
  const isNew = useRecoilValue(isNewNotification);
  return (
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior="none"
      tabBar={({ state, navigation }) =>
        customTabBar({ state, navigation, isNew })
      }
      lazy={false}
      tabBarOptions={{
        showLabel: false,
        keyboardHidesTabBar: true,
      }}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Search" component={SearchStackNavigator} />
      <Tab.Screen name="Notification" component={NotificationStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

function customTabBar({
  state,
  navigation,
  isNew,
}: {
  state: any;
  navigation: any;
  isNew: boolean;
}) {
  return (
    <TabBarArea style={{ height: Platform.OS === 'ios' ? 60 + 18 : 60 }}>
      {state.routes.map((route: any, index: number) => {
        const isFocused = state.index === index;

        const setIcon = () => {
          let icon;
          const len = 24;
          if (route.name === 'Home') {
            if (isFocused) icon = <Svg icon="homeFocus" size={len} />;
            else icon = <Svg icon="home" size={len} />;
          } else if (route.name === 'Search') {
            if (isFocused) icon = <Svg icon="searchFocus" size={len} />;
            else icon = <Svg icon="search" size={len} />;
          } else if (route.name === 'Notification') {
            if (isFocused) icon = <Svg icon="notificationFocus" size={len} />;
            else if (isNew) icon = <Svg icon="notificationNew" size={len} />;
            else icon = <Svg icon="notification" size={len} />;
          } else if (route.name === 'Profile') {
            if (isFocused) icon = <Svg icon="profileFocus" size={len} />;
            else icon = <Svg icon="profile" size={len} />;
          }
          // You can return any component that you like here!
          return <View key={index.toString()}>{icon}</View>;
        };
        return (
          <TouchableOpacity
            onPress={() => navigation.navigate(route.name)}
            style={{ paddingHorizontal: 20 }}
            key={index.toString()}
          >
            {setIcon()}
          </TouchableOpacity>
        );
      })}
    </TabBarArea>
  );
}
