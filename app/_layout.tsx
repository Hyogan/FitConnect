import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ThemeProviderApp, useThemeApp } from "../context/ThemeContext";

function NavigationWrapper() {
  const { theme } = useThemeApp(); // <-- our global theme

  return (
    <ThemeProvider value={theme.dark ? DarkTheme : DefaultTheme}>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }}>
          <StatusBar style={theme.dark ? "light" : "dark"} />
        </Stack>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProviderApp>
      {/* <SafeAreaView> */}
      <NavigationWrapper />
      {/* </SafeAreaView> */}
    </ThemeProviderApp>
  );
}
