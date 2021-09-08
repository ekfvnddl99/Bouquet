export default function AppStack() {
  const [splash, setSplash] = useState(true);
  const [user, setUser] = useUser();
  const [character, setCharacter] = useCharacter();

  useEffect(() => {
    setTimeout(() => {
      setSplash(false);
    }, 2000);
  });

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {splash === true ? (
          <SplashScreen />
        ) : user.isLogined ? (
          <TabNavigator />
        ) : (
          <WelcomeStackNavigator />
        )}
        <ModalStack.Navigator>
          <ModalStack.screen name="QRCode" component={QRCodeScreen} />
        </ModalStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
