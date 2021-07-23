import React from 'react';
import { View } from 'react-native';

// navigation tools
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// screens
import WelcomeScreen from './WelcomeScreen';

import RegisterScreenOne from './register/RegisterScreenOne';
import RegisterScreenTwo from './register/RegisterScreenTwo';
import RegisterScreenThree from './register/RegisterScreenThree';
import RegisterScreenFour from './register/RegisterScreenFour'; 

import ChaGenerationScreenOne from './characterGeneration/ChaGenerationScreenOne';
import ChaGenerationScreenTwo from './characterGeneration/ChaGenerationScreenTwo';
import ChaGenerationScreenThree from './characterGeneration/ChaGenerationScreenThree';
import ChaGenerationScreenFour from './characterGeneration/ChaGenerationScreenFour';

import LoginScreen from './LoginScreen';

import HomeScreen from './main/Home/HomeScreen';
import SearchScreen from './main/Search/SearchScreen';
import CrewScreen from './main/Crew/CrewScreen';
import NotificationScreen from './main/Notification/NotificationScreen';
import ProfileScreen from './main/Profile/ProfileScreen';

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


const Tab = createBottomTabNavigator();
function TabNavigator(){
  return(
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route})=>({
        tabBarIcon: ({ focused, color, size }) => {
          let icon;

          if (route.name === "Home") {
            if(focused) icon = <HomeFocusSvg w='30' h='30'/>;
            else icon = <HomeSvg w='30' h='30'/>;
          } else if (route.name === "Search") {
            if(focused) icon = <SearchFocusSvg w='30' h='30'/>;
            else icon = <SearchSvg w='30' h='30'/>;
          }else if (route.name === "Crew") {
            if(focused) icon = <CrewFocusSvg w='30' h='30'/>;
            else icon = <CrewSvg w='30' h='30'/>;
          }else if (route.name === "Notification") {
            if(focused) icon = <NotificationFocusSvg w='30' h='30'/>;
            else icon = <NotificationSvg w='30' h='30'/>;
          }else if (route.name === "Profile") {
            if(focused) icon = <ProfileFocusSvg w='30' h='30'/>;
            else icon = <ProfileSvg w='30' h='30'/>;
          }

          // You can return any component that you like here!
          return <View>{icon}</View>;
        },
      })}
      lazy = {false}
      tabBarOptions={{
        showLabel : false,
        safeAreaInsets : {bottom : 20},
        style : {
          height : 60,
          borderColor : "#ffffff",
          borderTopWidth : 0,
        }
      }}>
      <Tab.Screen name="Home" component={HomeStackNavigator}/>
      <Tab.Screen name="Search" component={SearchStackNavigator}/>
      <Tab.Screen name="Crew" component={CrewStackNavigator}/>
      <Tab.Screen name="Notification" component={NotificationStackNavigator}/>
      <Tab.Screen name="Profile" component={ProfileStackNavigator}/>
    </Tab.Navigator>
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
    </NotificationStack.Navigator>
  );
}

const ProfileStack = createStackNavigator<Types.ProfileStackParam>();
function ProfileStackNavigator(){
  return(
    <ProfileStack.Navigator
      initialRouteName="Profile">
      <ProfileStack.Screen 
        name="Profile"
        component={ProfileScreen}
        options={{headerShown : false}}/>
    </ProfileStack.Navigator>
  );
}

const ChaGenerationStack = createStackNavigator<Types.ChaGenerationStackParam>();
function ChaGenerationStackNavigator(){
  return(
    <ChaGenerationStack.Navigator
      initialRouteName="ChaGenerationOne">
        <ChaGenerationStack.Screen
          name="ChaGenerationOne"
          component={ChaGenerationScreenOne}
          options={{headerShown : false}}/>
        <ChaGenerationStack.Screen
          name="ChaGenerationTwo"
          component={ChaGenerationScreenTwo}
          options={{headerShown : false}}/>
        <ChaGenerationStack.Screen
          name="ChaGenerationThree"
          component={ChaGenerationScreenThree}
          options={{headerShown : false}}/>
        <ChaGenerationStack.Screen
          name="ChaGenerationFour"
          component={ChaGenerationScreenFour}
          options={{headerShown : false}}/>
      </ChaGenerationStack.Navigator>
  );
}

const RegisterStack = createStackNavigator<Types.RegisterStackParam>();
function RegisterStackNavigator(){
  return(
    <RegisterStack.Navigator
      initialRouteName="RegisterOne">
      <RegisterStack.Screen
        name="RegisterOne"
        component={RegisterScreenOne}
        options={{headerShown : false}}/>
        <RegisterStack.Screen
        name="RegisterTwo"
        component={RegisterScreenTwo}
        options={{headerShown : false}}/>
        <RegisterStack.Screen
        name="RegisterThree"
        component={RegisterScreenThree}
        options={{headerShown : false}}/>
        <RegisterStack.Screen
        name="RegisterFour"
        component={RegisterScreenFour}
        options={{headerShown : false}}/>
    </RegisterStack.Navigator>
  );
}

const WelcomeStack = createStackNavigator<Types.WelcomeStackParam>();
export default function AppStack(){
  return(
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
            component={RegisterStackNavigator}
            options={{headerShown : false}}/>
          <WelcomeStack.Screen
            name="Tab"
            component={TabNavigator}
            options={{headerShown : false}}/>
      </WelcomeStack.Navigator>
  </NavigationContainer>
  );
}