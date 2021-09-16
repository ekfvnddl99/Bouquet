import React, { useState, useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';

// logics
import useLogin from '../logics/hooks/useLogin';

// screens, navigators
import SplashScreen from '../screens/former/SplashScreen';
import WelcomeStackNavigator from './WelcomeStackNavigator';

export default function AppStack(): React.ReactElement {
  const [isSplash, setIsSplash] = useState(true);
  const [login] = useLogin();

  useEffect(() => {
    async function callLogin() {
      await login();
      setTimeout(() => {
        setIsSplash(false);
      }, 2000);
    }
    callLogin();
  }, []);

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        {isSplash ? <SplashScreen /> : <WelcomeStackNavigator />}
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
