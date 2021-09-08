function TabNavigator() {
  const [hide, setHide] = useRecoilState(bottomBarHideState);
  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeStack"
        backBehavior="none"
        tabBar={({ state, navigation }) =>
          customTabBar({ state, navigation, hide })
        }
        lazy={false}
        tabBarOptions={{
          showLabel: false,
          keyboardHidesTabBar: true,
        }}
      >
        <Tab.Screen name="HomeStack" component={HomeStackNavigator} />
        <Tab.Screen name="SearchStack" component={SearchStackNavigator} />
        <Tab.Screen
          name="NotificationStack"
          component={NotificationStackNavigator}
        />
        <Tab.Screen name="ProfileStack" component={ProfileStackNavigator} />
      </Tab.Navigator>
    </>
  );
}
