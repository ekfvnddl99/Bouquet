const WelcomeStack = createStackNavigator<Types.WelcomeStackParam>();
function WelcomeStackNavigator() {
  return (
    <WelcomeStack.Navigator initialRouteName="Welcome">
      <WelcomeStack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerShown: false }}
      />
      <WelcomeStack.Screen
        name="Tab"
        component={TabNavigator}
        options={{ headerShown: false }}
      />
    </WelcomeStack.Navigator>
  );
}
