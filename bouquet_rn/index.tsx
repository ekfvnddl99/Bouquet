import React, {Component, useState, useRef, useEffect} from 'react';
import { View, Platform, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { TabBarArea } from './styles/styled-components/area';
import { useRecoilState } from 'recoil';

// navigation tools
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as Types from './utils/types/types';

// icons
import HomeSvg from './assets/Home';
import HomeFocusSvg from './assets/HomeFocus';
import SearchSvg from './assets/Search';
import SearchFocusSvg from './assets/SearchFocus';
import CrewSvg from './assets/Crew';
import CrewFocusSvg from './assets/CrewFocus';
import NotificationSvg from './assets/Notification';
import NotificationFocusSvg from './assets/NotificationFocus';
import ProfileSvg from './assets/Profile';
import ProfileFocusSvg from './assets/ProfileFocus';

import { bottomBarHideState } from './logics/atoms';
import useUser from './logics/useUser';
import useCharacter from './logics/hooks/useCharacter';

//// basics
// writing - fab
const WritingStack = createStackNavigator<Types.WritingStackParam>();
function WritingStackNavigator(){
  return(
    <WritingStack.Navigator
      initialRouteName="PostWriting">
      <WritingStack.Screen 
        name="PostWriting"
        component={PostWritingScreen}
        options={{headerShown : false}}/>
      <WritingStack.Screen 
        name="SelectTemplate"
        component={SelectTemplateScreen}
        options={{headerShown : false}}/>
      <WritingStack.Screen 
        name="PostStack"
        component={PostStackNavigator}
        options={{headerShown : false}}/>
    </WritingStack.Navigator>
  );
}
// post item
const PostStack = createStackNavigator<Types.PostStackParam>();
function PostStackNavigator(){
  return(
    <PostStack.Navigator
      initialRouteName="PostDetail">
      <PostStack.Screen 
        name="PostDetail"
        component={PostDetailScreen}
        options={{headerShown : false}}/>
      <PostStack.Screen 
        name="ProfileDetailStack"
        component={ProfileDetailStackNavigator}
        options={{headerShown : false}}/>
    </PostStack.Navigator>
  );
}
// profile item - profileoverview, character item
const ProfileDetailStack = createStackNavigator<Types.ProfileDetailStackParam>();
function ProfileDetailStackNavigator(){
  return(
    <ProfileDetailStack.Navigator
      initialRouteName="ProfileDetail">
      <ProfileDetailStack.Screen 
        name="ProfileDetail"
        component={ProfileDetailScreen}
        options={{headerShown : false}}/>
      <ProfileDetailStack.Screen 
        name="ProfileModification"
        component={ChaGenerationScreen}
        options={{headerShown : false}}/>
      <ProfileDetailStack.Screen 
        name="ProfileDeletion"
        component={ChaDeletionScreen}
        options={{headerShown : false}}/>
      <ProfileDetailStack.Screen 
        name="PostStack"
        component={PostStackNavigator}
        options={{headerShown : false}}/>
      <ProfileDetailStack.Screen 
        name="ProfileAccount"
        component={AccountStackNavigator}
        options={{headerShown : false}}/>
    </ProfileDetailStack.Navigator>
  );
}
// setting
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
        name="SettingAccount" 
        component={AccountStackNavigator}
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
// account
const AccountStack = createStackNavigator<Types.AccountStackParam>();
function AccountStackNavigator(){
  return(
    <AccountStack.Navigator
      initialRouteName="Account">
      <AccountStack.Screen 
        name="Account"
        component={AccountScreen}
        options={{headerShown : false}}/>
      <AccountStack.Screen 
        name="ProfileDetailStack"
        component={ProfileDetailStackNavigator}
        options={{headerShown : false}}/>
    </AccountStack.Navigator>
  );
}




//// tab screens
// home
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
        name="ProfileDetailStack" 
        component={ProfileDetailStackNavigator}
        options={{headerShown : false}}/>
      <HomeStack.Screen 
        name="PostStack" 
        component={PostStackNavigator}
        options={{headerShown : false}}/>
      <HomeStack.Screen  
        name="Floating" 
        component={WritingStackNavigator}
        options={{headerShown : false}}/>
      <HomeStack.Screen 
        name="ChaGeneration" 
        component={ChaGenerationScreen}
        options={{headerShown : false}}/>
    </HomeStack.Navigator>
  );
}
// search
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
        name="ProfileDetailStack" 
        component={ProfileDetailStackNavigator}
        options={{headerShown : false}}/>
      <SearchStack.Screen 
        name="PostStack" 
        component={PostStackNavigator}
        options={{headerShown : false}}/>
      <SearchStack.Screen 
        name="Floating" 
        component={WritingStackNavigator}
        options={{headerShown : false}}/>
    </SearchStack.Navigator>
  );
}
// noti
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
        name="ProfileDetailStack" 
        component={ProfileDetailStackNavigator}
        options={{headerShown : false}}/>
      <NotificationStack.Screen 
        name="ChaGeneration" 
        component={ChaGenerationScreen}
        options={{headerShown : false}}/>
    </NotificationStack.Navigator>
  );
}
// profile
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
        name="ProfileDetailStack"
        component={ProfileDetailStackNavigator}
        options={{headerShown : false}}/>
      <ProfileStack.Screen 
        name="Setting"
        component={SettingnStackNavigator}
        options={{headerShown : false}}/>
      <ProfileStack.Screen 
        name="Floating" 
        component={WritingStackNavigator}
        options={{headerShown : false}}/>
      <ProfileStack.Screen 
        name="ChaGeneration" 
        component={ChaGenerationScreen}
        options={{headerShown : false}}/>
    </ProfileStack.Navigator>
  );
}


const WelcomeStack = createStackNavigator<Types.WelcomeStackParam>();
function WelcomeStackNavigator(){
  return(
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
  );
}

export default function AppStack(){
  const[splash, setSplash]=useState(true);
  const [user, setUser] = useUser();
  const [character, setCharacter] = useCharacter();

  useEffect(()=>{
    setTimeout( () => {
      setSplash(false);
    },2000);
  })
  return(
    <SafeAreaProvider>
      <NavigationContainer>
        {splash===true ? <SplashScreen/> :
        user.isLogined ?
        <TabNavigator />
        :
        <WelcomeStackNavigator/>
        }
      </NavigationContainer>
    </SafeAreaProvider>
  )
}


// screens
import SplashScreen from './SplashScreen';
import WelcomeScreen from './WelcomeScreen';
import LoginScreen from './screens/former/LoginScreen';
import RegisterScreen from './screens/former/register/RegisterScreen';

import HomeScreen from './screens/main/Home/HomeScreen';
import SearchScreen from './screens/main/Search/SearchScreen';
import NotificationScreen from './screens/main/Notification/NotificationScreen';
import ProfileOverviewScreen from './screens/main/Profile/ProfileOverviewScreen';
import ProfileDetailScreen from './screens/main/Profile/ProfileDetailScreen';
import AccountScreen from './screens/common/AccountScreen';

import SettingScreen from './screens/setting/SettingScreen';
import SettingProfileScreen from './screens/setting/SettingProfileScreen';
import SettingAlarmScreen from './screens/setting/SettingAlarmScreen';
import SettingAlarmCustomScreen from './screens/setting/SettingAlarmCustomScreen';
import AccountDeletionScreenOne from './screens/setting/AccountDeletionScreen1';
import AccountDeletionScreenTwo from './screens/setting/AccountDeletionScreen2';

import PostWritingScreen from './screens/common/PostWritingScreen';
import SelectTemplateScreen from './screens/common/SelectTemplateScreen';
import PostDetailScreen from './screens/common/PostDetailScreen';

import ChaGenerationScreen from './screens/character/ChaGenerationScreen';
import ChaDeletionScreen from './screens/character/ChaDeletionScreen';


//// tab
function CustomTabBar({ state, navigation, hide} : {state:any, navigation:any, hide:boolean}){
  if (hide) {
    return null;
  }
  return(
    <TabBarArea style={{height : Platform.OS==='ios' ? 60+18: 60}}>
      {state.routes.map((route : any, index: number) => {
        const isFocused = state.index === index;

        const setIcon=()=>{
          let icon;
          const len = String(24);
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
const Tab = createBottomTabNavigator<Types.TabParam>();
function TabNavigator(){
  const [hide, setHide] = useRecoilState(bottomBarHideState);
  return(
    <>
    <Tab.Navigator
      initialRouteName="Home"
      backBehavior='none'
      tabBar={({state, navigation})=>CustomTabBar({state, navigation, hide})}
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