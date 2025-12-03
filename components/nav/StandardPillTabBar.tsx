import { Ionicons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
// BottomTabBarProps

const ICON_MAP = {
  home: "home-outline",
  profile: "person-outline",
  notifications: "notifications-outline",
  settings: "settings-outline",
};

const AnimatedTabBar = ({ state, descriptors, navigation }: any) => {
  const tabWidth = 70;
  const pillOffset = useSharedValue(0);
  useEffect(() => {
    pillOffset.value = withTiming(state.index * tabWidth, {
      duration: 250,
      reduceMotion: ReduceMotion.Never,
    });
  }, [state.index]);
  const pillStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: pillOffset.value }],
  }));
  return (
    <View style={styles.container}>
      <View style={styles.shadow}>
        {/* Moving pill */}
        <Animated.View style={[styles.pill, pillStyle]} />

        {/* Icons */}
        <View style={styles.row}>
          {state.routes.map((route: any, index: any) => {
            const { options } = descriptors[route.key];
            const label = options.title || route.name;
            //   const icon = options.tabBarIconName;
            const isFocused = state.index === index;
            //   const icon = descriptors[route.key].params?.icon;
            const icon = ICON_MAP[route.name];

            return (
              <Pressable
                key={route.key}
                onPress={() => navigation.navigate(route.name)}
                style={styles.btn}
              >
                <Ionicons
                  name={icon}
                  size={26}
                  color={isFocused ? "#fff" : "#6A5AE0"}
                />
              </Pressable>
            );
          })}
        </View>
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
    elevation: 20,
    justifyContent: "center",
    overflow: "hidden",
  },
  shadow: {},
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
    width: 70,
    height: 50,
    top: 10,
    backgroundColor: "#6A5AE0",
    borderRadius: 25,
    zIndex: 0,
  },
});

export default AnimatedTabBar;
