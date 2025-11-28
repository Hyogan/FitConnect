// app/(auth)/components/BackgroundLayout.tsx
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef } from "react";
import { Animated, Dimensions, Easing, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export const BackgroundLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const topCircleAnim = useRef(new Animated.Value(0)).current;
  const bottomCircleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const animate = (anim: Animated.Value, toValue: number, duration: number) =>
      Animated.loop(
        Animated.sequence([
          Animated.timing(anim, {
            toValue,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(anim, {
            toValue: 0,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ])
      ).start();

    animate(topCircleAnim, 10, 4000);
    animate(bottomCircleAnim, -10, 5000);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient
        colors={["#EEF2F3", "#D9E8F5"]}
        start={[0, 0]}
        end={[1, 1]}
        style={StyleSheet.absoluteFill}
      />
      <Animated.View
        style={[
          styles.circle,
          styles.circleTop,
          { transform: [{ translateY: topCircleAnim }] },
        ]}
      />
      <Animated.View
        style={[
          styles.circle,
          styles.circleBottom,
          { transform: [{ translateY: bottomCircleAnim }] },
        ]}
      />
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    width: "100%",
    height: "100%",
    flex: 1,
    backgroundColor: "#0000",
    justifyContent: "center",
    alignItems: "center",
  },
  circle: { position: "absolute", borderRadius: 1000 },
  circleTop: {
    width: 140,
    height: 140,
    top: -60,
    left: -40,
    backgroundColor: "rgba(238,0,79,0.3)",
  },
  circleBottom: {
    width: 180,
    height: 180,
    bottom: -50,
    right: -30,
    backgroundColor: "rgba(0,122,255,0.25)",
  },
});
