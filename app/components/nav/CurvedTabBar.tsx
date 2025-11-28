import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const ICON_MAP = {
  home: "home-outline",
  profile: "person-outline",
  notifications: "notifications-outline",
  settings: "settings-outline",
};

const TAB_PILL_SIZE = 50;
const TAB_WIDTH = 75.5;
const TAB_BAR_HEIGHT = 70;

const AnimatedPath = Animated.createAnimatedComponent(Path);

const AnimatedTabBar = ({ state, descriptors, navigation }: any) => {
  const screenWidth = Dimensions.get("window").width;

  // Shared value for the center X of the active tab
  const pillOffset = useSharedValue(state.index * TAB_WIDTH + TAB_WIDTH / 2);

  // Update pillOffset when active tab changes
  pillOffset.value = withSpring(state.index * TAB_WIDTH + TAB_WIDTH / 2, {
    damping: 20,
    stiffness: 100,
  });

  // Animated SVG path
  const animatedProps = useAnimatedProps(() => {
    const x = pillOffset.value; // center of the notch
    const notchWidth = 80;
    const notchHeight = 20;

    return {
      d: `
        M0,0
        H${x - notchWidth / 2}
        C${x - notchWidth / 4},0 ${
        x - notchWidth / 4
      },${notchHeight} ${x},${notchHeight}
        C${x + notchWidth / 4},${notchHeight} ${x + notchWidth / 4},0 ${
        x + notchWidth / 2
      },0
        H${screenWidth}
        V${TAB_BAR_HEIGHT}
        H0
        Z
      `,
    };
  });

  return (
    <View style={styles.container}>
      {/* SVG background with notch */}
      <Svg
        width={screenWidth}
        height={TAB_BAR_HEIGHT}
        style={StyleSheet.absoluteFill}
      >
        <AnimatedPath animatedProps={animatedProps} fill="#fff" />
      </Svg>

      {/* Tab icons */}
      <View style={styles.row}>
        {state.routes.map((route: any, index: number) => {
          const isFocused = state.index === index;
          const icon = ICON_MAP[route.name];

          const animatedIconStyle = useAnimatedStyle(() => ({
            transform: [
              {
                translateY: withSpring(isFocused ? -20 : 0, {
                  damping: 20,
                  stiffness: 100,
                }),
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

      {/* Pill */}
      <Animated.View
        style={[
          styles.pill,
          {
            transform: [
              { translateX: pillOffset.value - TAB_PILL_SIZE / 2 },
              { translateY: -TAB_PILL_SIZE / 2 }, // sit nicely in notch
            ],
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    height: TAB_BAR_HEIGHT,
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    bottom: 0,
    height: TAB_BAR_HEIGHT,
  },
  btn: {
    width: TAB_WIDTH,
    height: TAB_BAR_HEIGHT,
    justifyContent: "center",
    alignItems: "center",
  },
  pill: {
    position: "absolute",
    width: TAB_PILL_SIZE,
    height: TAB_PILL_SIZE,
    borderRadius: TAB_PILL_SIZE / 2,
    backgroundColor: "#6A5AE0",
    zIndex: 1,
    elevation: 10,
  },
});

export default AnimatedTabBar;
