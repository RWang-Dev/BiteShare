import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import { Roboto_400Regular } from "@expo-google-fonts/dev";

import { useColorScheme } from "@/hooks/useColorScheme";

import { Provider } from "react-redux";
import { Auth0Provider } from "react-native-auth0";
import { store } from "../store/store";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    // SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    Roboto_400Regular,
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <Auth0Provider
        domain={"dev-z4uimkzxx4hb8ojn.us.auth0.com"}
        clientId={"2Wg8giThjtn0seet8S4Vkt5NvbcZNMfz"}
      >
        {/* <GestureHandlerRootView>
        <BottomSheetModalProvider> */}
        <ThemeProvider
          value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
        >
          <Stack>
            {/* <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> */}
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen
              name="CreateProfile"
              options={{ headerShown: false }}
            />
            <Stack.Screen name="MainLayout" options={{ headerShown: false }} />
            <Stack.Screen
              name="InfluencerApplication"
              options={{ headerShown: false }}
            />

            <Stack.Screen name="+not-found" />
          </Stack>
          {/* <StatusBar style="auto" /> */}
        </ThemeProvider>
      </Auth0Provider>
      {/* </BottomSheetModalProvider>
      </GestureHandlerRootView> */}
    </Provider>
  );
}
