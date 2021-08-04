import React, {Component} from 'react';
import { View, Platform, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabBarArea } from '../styles/styled-components/area';

// navigation tools
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import WelcomeScreen from './WelcomeScreen';

import RegisterScreen from './register/RegisterScreen';

import ChaGenerationScreen from './character/ChaGenerationScreen';

import LoginScreen from './LoginScreen';

import HomeScreen from './main/Home/HomeScreen';

import SearchScreen from './main/Search/SearchScreen';
import EpisodeScreen from './common/EpisodeScreen';
import PostDetailScreen from './common/PostDetailScreen';

import CrewScreen from './main/Crew/CrewScreen';

import NotificationScreen from './main/Notification/NotificationScreen';

import ProfileOverviewScreen from './main/Profile/ProfileOverviewScreen';
import ProfileDetailScreen from './main/Profile/ProfileDetailScreen';
import AccountScreen from './common/AccountScreen';
import ChaDeletionScreen from './character/ChaDeletionScreen';

import PostWritingScreen from './common/PostWritingScreen';

import SettingScreen from './setting/SettingScreen';
import SettingAlarmScreen from './setting/SettingAlarmScreen';
import SettingAlarmCustomScreen from './setting/SettingAlarmCustomScreen';
import SettingProfileScreen from './setting/SettingProfileScreen';
import AccountDeletionScreenOne from './setting/AccountDeletionScreenOne';
import AccountDeletionScreenTwo from './setting/AccountDeletionScreenTwo';

import FloatingButton from './components/FloatingButton';

// icons
import HomeSvg from '../assets/Home';
import HomeFocusSvg from '../assets/HomeFocus';
import SearchSvg from '../assets/Search';
import SearchFocusSvg from '../assets/SearchFocus';
import CrewSvg from '../assets/Crew';
import CrewFocusSvg from '../assets/CrewFocus';
import NotificationSvg from '../assets/Notification';
import NotificationFocusSvg from '../assets/NotificationFocus';
import ProfileSvg from '../assets/Profile';
import ProfileFocusSvg from '../assets/ProfileFocus';

import * as Types from '../utils/types';
import { colors } from '../styles/colors';

const Tab = createBottomTabNavigator();
function CustomTabBar({ state, navigation} : {state:any, navigation:any}){
  return(
    <TabBarArea style={{height : Platform.OS==='ios' ? 60+18: 60}}>
      {state.routes.map((route : any, index: number) => {
        const isFocused = state.index === index;

        const setIcon=()=>{
          let icon;
          let len = String(24);
          if (route.name === "Home") {
            if(isFocused) icon = <HomeFocusSvg w={len} h={len}/>;
            else icon = <HomeSvg w={len} h={len}/>;
          } else if (route.name === "Search") {
            if(isFocused) icon = <SearchFocusSvg w={len} h={len}/>;
            else icon = <SearchSvg w={len} h={len}/>;
          }else if (route.name === "Crew") {
            if(isFocused) icon = <CrewFocusSvg w={len} h={len}/>;
            else icon = <CrewSvg w={len} h={len}/>;
          }else if (route.name === "Notification") {
            if(isFocused) icon = <NotificationFocusSvg w={len} h={len}/>;
            else icon = <NotificationSvg w={len} h={len}/>;
          }else if (route.name === "Profile") {
            if(isFocused) icon = <ProfileFocusSvg w={len} h={len}/>;
            else icon = <ProfileSvg w={len} h={len}/>;
          }

          // You can return any component that you like here!
          return <View>{icon}</View>;
        }
        return (
          <TouchableOpacity 
              onPress={()=>navigation.navigate(route.name)}
              style={{paddingHorizontal:20}}>
              {setIcon()}
            </TouchableOpacity>
        );
      })}
    </TabBarArea>
  );
}
function TabNavigator(){
  return(
    <>
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior='none'
      tabBar={({state, navigation})=>CustomTabBar({state, navigation})}
      lazy = {false}
      tabBarOptions={{
        showLabel : false,
        keyboardHidesTabBar: true,
      }}>
      <Tab.Screen name="Home" component={HomeStackNavigator}/>
      <Tab.Screen name="Search" component={SearchStackNavigator}/>
      <Tab.Screen name="Notification" component={NotificationStackNavigator}/>
      <Tab.Screen name="Profile" component={ProfileStackNavigator}/>
    </Tab.Navigator>
    </>
  );
}

const ChaGenerationStack = createStackNavigator<Types.ChaGenerationStackParam>();
function ChaGenerationStackNavigator(){
  return(
    <ChaGenerationStack.Navigator
      initialRouteName="ChaGeneration">
      <ChaGenerationStack.Screen 
        name="ChaGeneration" 
        component={ChaGenerationScreen}
        options={{headerShown : false}}/>
      <ChaGenerationStack.Screen 
        name="Profile" 
        component={ProfileStackNavigator}
        options={{headerShown : false}}/>
    </ChaGenerationStack.Navigator>
  );
}

const HomeStack = createStackNavigator<Types.HomeStackParam>();
function HomeStackNavigator(){
  return(
    <HomeStack.Navigator
      initialRouteName="Home">
      <HomeStack.Screen 
        name="Home" 
        component={HomeScreen}
        options={{headerShown : false}}/>
      <HomeStack.Screen 
        name="Generation" 
        component={ChaGenerationStackNavigator}
        options={{headerShown : false}}/>
      <HomeStack.Screen 
        name="PostingItem" 
        component={PostingStackNavigator}
        options={{headerShown : false}}/>
    </HomeStack.Navigator>
  );
}


const SearchStack = createStackNavigator<Types.SearchStackParam>();
function SearchStackNavigator(){
  return(
    <SearchStack.Navigator
      initialRouteName="Search">
      <SearchStack.Screen 
        name="Search" 
        component={SearchScreen}
        options={{headerShown : false}}/>
      <SearchStack.Screen 
        name="Episode" 
        component={EpisodeScreen}
        options={{headerShown : false}}/>
      <SearchStack.Screen 
        name="PostingItem" 
        component={PostingStackNavigator}
        options={{headerShown : false}}/>
    </SearchStack.Navigator>
  );
}

const CrewStack = createStackNavigator<Types.CrewStackParam>();
function CrewStackNavigator(){
  return(
    <CrewStack.Navigator
      initialRouteName="Crew">
      <CrewStack.Screen 
        name="Crew" 
        component={CrewScreen}
        options={{headerShown : false}}/>
    </CrewStack.Navigator>
  );
}

const NotificationStack = createStackNavigator<Types.NotificationStackParam>();
function NotificationStackNavigator(){
  return(
    <NotificationStack.Navigator
      initialRouteName="Notification">
      <NotificationStack.Screen 
        name="Notification" 
        component={NotificationScreen}
        options={{headerShown : false}}/>
      <NotificationStack.Screen 
        name="Generation" 
        component={ChaGenerationStackNavigator}
        initialParams={{modify : 0}}
        options={{headerShown : false}}/>
    </NotificationStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<Types.ProfileStackParam>();
function ProfileStackNavigator(){
  return(
    <ProfileStack.Navigator
      initialRouteName="ProfileOverview">
      <ProfileStack.Screen 
        name="ProfileOverview"
        component={ProfileOverviewScreen}
        options={{headerShown : false}}/>
      <ProfileStack.Screen 
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{headerShown : false}}/>
      <ProfileStack.Screen 
        name="ProfileDeletion"
        component={ChaDeletionScreen}
        options={{headerShown : false}}/>
      <ProfileStack.Screen 
        name="ProfileModification"
        component={ChaGenerationScreen}
        options={{headerShown : false}}/>
      <ProfileStack.Screen 
        name="Account"
        component={AccountScreen}
        options={{headerShown : false}}/>
      <ProfileStack.Screen 
        name="Setting"
        component={SettingnStackNavigator}
        options={{headerShown : false}}/>
    </ProfileStack.Navigator>
  );
}

const SettingStack = createStackNavigator<Types.SettingStackParam>();
function SettingnStackNavigator(){
  return(
    <SettingStack.Navigator
      initialRouteName="Setting">
      <SettingStack.Screen 
        name="Setting" 
        component={SettingScreen}
        options={{headerShown : false}}/>
      <SettingStack.Screen 
        name="SettingAlarm" 
        component={SettingAlarmScreen}
        options={{headerShown : false}}/>
      <SettingStack.Screen 
        name="SettingAlarmCustom" 
        component={SettingAlarmCustomScreen}
        options={{headerShown : false}}/>
      <SettingStack.Screen 
        name="SettingProfile" 
        component={SettingProfileScreen}
        options={{headerShown : false}}/>
      <SettingStack.Screen 
        name="SettingAccountDeletionOne" 
        component={AccountDeletionScreenOne}
        options={{headerShown : false}}/>
      <SettingStack.Screen 
        name="SettingAccountDeletionTwo" 
        component={AccountDeletionScreenTwo}
        options={{headerShown : false}}/>
    </SettingStack.Navigator>
  );
}

const WritingStack = createStackNavigator<Types.WritingStackParam>();
function WritingStackNavigator(){
  return(
    <WritingStack.Navigator
      initialRouteName="PostWriting">
      <WritingStack.Screen 
        name="PostWriting"
        component={ProfileOverviewScreen}
        options={{headerShown : false}}/>
    </WritingStack.Navigator>
  );
}

const PostingStack = createStackNavigator<Types.PostingStackParam>();
function PostingStackNavigator(){
  return(
    <PostingStack.Navigator
      initialRouteName="Posting">
      <PostingStack.Screen 
        name="Posting"
        component={PostDetailScreen}
        options={{headerShown : false}}/>
      <PostingStack.Screen 
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{headerShown : false}}/>
    </PostingStack.Navigator>
  );
}

const WelcomeStack = createStackNavigator<Types.WelcomeStackParam>();
export default function AppStack(){
  return(
    <SafeAreaProvider>
      <NavigationContainer>
        <WelcomeStack.Navigator
          initialRouteName="Welcome">
            <WelcomeStack.Screen
              name="Welcome"
              component={WelcomeScreen}
              options={{headerShown: false}}/>
            <WelcomeStack.Screen
              name="Login"
              component={LoginScreen}
              options={{headerShown: false}}/>
            <WelcomeStack.Screen
              name="Register"
              component={RegisterScreen}
              options={{headerShown : false}}/>
            <WelcomeStack.Screen
              name="Tab"
              component={TabNavigator}
              options={{headerShown : false}}/>
        </WelcomeStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}