import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { StatusBarStyle, StyleSheet } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
const STYLES = ["default", "dark-content", "light-content"] as const;
const TRANSITIONS = ["fade", "slide", "none"] as const;
export default function RootLayout() {
  const [hidden, setHidden] = useState(false);
  const [statusBarStyle, setStatusBarStyle] = useState<StatusBarStyle>(
    STYLES[0]
  );
  const [statusBarTransition, setStatusBarTransition] = useState<
    "fade" | "slide" | "none"
  >(TRANSITIONS[0]);

  const changeStatusBarVisibility = () => setHidden(!hidden);

  const changeStatusBarStyle = () => {
    const styleId = STYLES.indexOf(statusBarStyle) + 1;
    if (styleId === STYLES.length) {
      setStatusBarStyle(STYLES[0]);
    } else {
      setStatusBarStyle(STYLES[styleId]);
    }
  };

  const changeStatusBarTransition = () => {
    const transition = TRANSITIONS.indexOf(statusBarTransition) + 1;
    if (transition === TRANSITIONS.length) {
      setStatusBarTransition(TRANSITIONS[0]);
    } else {
      setStatusBarTransition(TRANSITIONS[transition]);
    }
  };
  return (
    <SafeAreaProvider>
      {/* <SafeAreaView style={styles.container}> */}
      <Stack screenOptions={{ headerShown: false }}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          showHideTransition={statusBarTransition}
          hidden={hidden}
        />
      </Stack>
      {/* </SafeAreaView> */}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#ECF0F1",
  },
});
