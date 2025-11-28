// app/(auth)/components/AuthCard.tsx
import { BlurView } from "expo-blur";
import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const { width } = Dimensions.get("window");

export const AuthCard: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <BlurView intensity={80} tint="light" style={styles.card}>
      {children}
    </BlurView>
  );
};

const styles = StyleSheet.create({
  card: {
    width: width * 0.85,
    padding: 28,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 50,
  },
});
