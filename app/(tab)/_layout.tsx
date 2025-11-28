import { Tabs } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import AnimatedTabBar from "../components/nav/AnimatedTabBar";

const TAB_CONFIG = [
  { name: "home", title: "Home", icon: "home-outline" },
  { name: "profile", title: "Profile", icon: "person-outline" },
  { name: "notifications", title: "Alerts", icon: "notifications-outline" },
  { name: "settings", title: "Settings", icon: "settings-outline" },
];

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const BAR_HEIGHT = 70 + insets.bottom;

  const screenLayout = (props) => (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      {props.children}
    </SafeAreaView>
  );
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{ headerShown: false }}
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

// import { Ionicons } from "@expo/vector-icons";
// import { Tabs } from "expo-router";
// import React, { useEffect } from "react";
// import {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
// } from "react-native-reanimated";

// const TAB_CONFIG = [
//   { name: "home", title: "Home", icon: "home-outline" },
//   { name: "profile", title: "Profile", icon: "person-outline" },
//   { name: "notifications", title: "Alerts", icon: "notifications-outline" },
//   { name: "settings", title: "Settings", icon: "settings-outline" },
// ];

// export default function TabsLayout() {
//   const tabWidth = 70;
//   const pillOffset = useSharedValue(0);
//   const animatedTabBar = ({ state, descriptors, navigation }) => {
//     const tabWidth = 70;
//     const pillOffset = useSharedValue(0);

//     useEffect(() => {
//       pillOffset.value = withTiming(state.index * tabWidth, { duration: 250 });
//     }, state.index);
//   };

//   const pillStyle = useAnimatedStyle(() => ({
//     transform: [{ translateX: pillOffset.value }],
//   }));
//   return (
//     <Tabs
//       screenOptions={{
//         headerShown: false,
//         tabBarActiveTintColor: "#6A5AE0",

//         // 🎉 Rounded, floating tab bar
//         tabBarStyle: {
//           position: "absolute",
//           bottom: 20,
//           left: 30,
//           right: 30,
//           height: 70,
//           backgroundColor: "#fff",
//           borderRadius: 25,
//           elevation: 10,
//           shadowColor: "#000",
//           shadowOffset: { width: 0, height: 5 },
//           shadowOpacity: 0.15,
//           shadowRadius: 10,
//           borderTopWidth: 0,
//         },
//       }}
//     >
//       {TAB_CONFIG.map((tab) => (
//         <Tabs.Screen
//           key={tab.name}
//           name={tab.name}
//           options={{
//             title: tab.title,
//             tabBarIcon: ({ color, size }) => (
//               <Ionicons name={tab.icon} color={color} size={size} />
//             ),
//           }}
//         />
//       ))}
//     </Tabs>
//   );
// }
