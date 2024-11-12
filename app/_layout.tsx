import { useFonts } from 'expo-font';
import '../global.css';
import { router, SplashScreen, Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

SplashScreen.preventAutoHideAsync();

const RootLayout = () => {

  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("../assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("../assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("../assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("../assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("../assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("../assets/fonts/Poppins-Thin.ttf"),
  });

  const [authChecked, setAuthChecked] = useState(false);

  const checkAuthStatus = async () => {
    const token = await AsyncStorage.getItem("access_token");
    if (token) {
      router.replace("/(tabs)/profile");
    } else {
      router.replace("/sign-in");
    }
    setAuthChecked(true);
  };

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      checkAuthStatus()
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name='index' options={{ headerShown: false }}/>
      <Stack.Screen name='(auth)' options={{ headerShown: false }}/>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }}/>
    </Stack>
  )
}

export default RootLayout;