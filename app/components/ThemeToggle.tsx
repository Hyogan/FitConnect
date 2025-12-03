import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef } from "react";
import { Animated, Pressable, StyleSheet, ViewStyle } from "react-native";

type ThemeToggleProps = {
  dark: boolean;
  onToggle: () => void;
  color: string;
  backgroundColor: string;
  style?: ViewStyle;
};

export const ThemeToggle: React.FC<ThemeToggleProps> = ({
  dark,
  onToggle,
  color,
  style,
  backgroundColor,
}) => {
  // Animated value for rotation
  const rotation = useRef(new Animated.Value(dark ? 0 : 1)).current;

  useEffect(() => {
    Animated.timing(rotation, {
      toValue: dark ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [dark]);

  // Convert numeric value → degrees
  const rotateInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  return (
    <Pressable
      style={[styles.button, { backgroundColor }, style]}
      onPress={onToggle}
    >
      <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
        <Ionicons name={dark ? "sunny" : "moon"} size={26} color={color} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#333",
  },
});
