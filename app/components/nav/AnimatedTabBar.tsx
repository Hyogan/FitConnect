import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const ICON_MAP = {
  home: "home-outline",
  profile: "person-outline",
  notifications: "notifications-outline",
  settings: "settings-outline",
};
const TAB_PILL_SIZE = 50;

const AnimatedTabBar = ({ state, descriptors, navigation }: any) => {
  const tabWidth = 75.5;
  const pillOffset = useSharedValue(0);
  const pillPosition =
    state.index * tabWidth + tabWidth / 2 - TAB_PILL_SIZE / 2;
  // Animate pill position when active tab changes
  //   pillOffset.value = withTiming(pillPosition, { duration: 250 });

  pillOffset.value = withSpring(pillPosition, {
    damping: 20,
    stiffness: 100,
  });

  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pillOffset.value }],
  }));

  return (
    <View style={styles.container}>
      {/* Moving pill */}
      <Animated.View style={[styles.pill, pillStyle]} />

      {/* Icons */}
      <View style={styles.row}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const icon = ICON_MAP[route.name];

          // Animate icon Y position based on focus
          const animatedIconStyle = useAnimatedStyle(() => ({
            transform: [
              {
                translateY: withTiming(isFocused ? -20 : 0, { duration: 250 }),
              },
            ],
          }));

          return (
            <Pressable
              key={route.key}
              onPress={() => navigation.navigate(route.name)}
              style={styles.btn}
            >
              <Animated.View style={animatedIconStyle}>
                <Ionicons
                  name={icon}
                  size={26}
                  color={isFocused ? "#fff" : "#6A5AE0"}
                />
              </Animated.View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 30,
    right: 30,
    height: 70,
    backgroundColor: "#fff",
    borderRadius: 25,
    elevation: 10,
    justifyContent: "center",
    // overflow: "hidden",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  btn: {
    width: 70,
    height: 70,
    justifyContent: "center",
    alignItems: "center",
  },
  pill: {
    position: "absolute",
    width: 50,
    height: 50,
    top: -20,
    backgroundColor: "#6A5AE0",
    borderRadius: 50,
    zIndex: 0,
    boxShadow: "",
    // iOS shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    // Android shadow
    elevation: 8,
  },
});

export default AnimatedTabBar;
