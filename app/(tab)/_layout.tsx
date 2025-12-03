import { Tabs } from "expo-router";
import { PropsWithChildren } from "react";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { BackgroundLayout } from "../(auth)/components/BackgroundLayout";
import AnimatedTabBar from "../components/nav/AnimatedTabBar";
import { CustomHeader } from "../components/nav/CustomHeader";

const TAB_CONFIG = [
  { name: "home", title: "Home", icon: "home-outline" },
  { name: "profile", title: "Profile", icon: "person-outline" },
  { name: "notifications", title: "Alerts", icon: "notifications-outline" },
  { name: "settings", title: "Settings", icon: "settings-outline" },
];

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const BAR_HEIGHT = 70 + insets.bottom;
  const screenLayout = (props: PropsWithChildren) => (
    <SafeAreaView
      style={{
        flex: 1,
        paddingBottom: 0,
        paddingTop: 0,
      }}
      edges={[]}
    >
      <BackgroundLayout>{props.children}</BackgroundLayout>
    </SafeAreaView>
  );
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        header: () => <CustomHeader />, // apply to ALL tabs
      }}
      screenLayout={screenLayout}
    >
      {TAB_CONFIG.map((tab) => (
        <Tabs.Screen
          key={tab.name}
          name={tab.name}
          initialParams={{ icon: tab.icon }}
          options={{
            title: tab.title,
            animation: "shift",
            tabBarStyle: { height: BAR_HEIGHT },
          }}
        />
      ))}
    </Tabs>
  );
}
