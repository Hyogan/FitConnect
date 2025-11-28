// App.js
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function LoginForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Animated circle positions
  const topCircleAnim = useRef(new Animated.Value(0)).current;
  const bottomCircleAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(topCircleAnim, {
          toValue: 10,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(topCircleAnim, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(bottomCircleAnim, {
          toValue: -10,
          duration: 5000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bottomCircleAnim, {
          toValue: 0,
          duration: 5000,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  // Ripple animation
  const ripple = useRef(new Animated.Value(0)).current;

  const startRipple = () => {
    ripple.setValue(0);
    Animated.timing(ripple, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  };

  const rippleScale = ripple.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });

  const rippleOpacity = ripple.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.6],
  });

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["#EEF2F3", "#D9E8F5"]}
        start={[0, 0]}
        end={[1, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Animated Floating Circles */}
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

      {/* Center Card */}
      <View style={styles.center}>
        <BlurView intensity={80} tint="light" style={styles.card}>
          <Text style={styles.title}>Welcome Back Sir</Text>
          <Text style={styles.subtitle}>Log in to continue</Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#555"
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#555"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#555"
              />
            </Pressable>
          </View>

          {/* Forgot Password */}
          <Pressable style={{ alignSelf: "flex-end", marginBottom: 20 }}>
            <Text style={{ color: "#8A76F1", fontWeight: "500" }}>
              Forgot password?
            </Text>
          </Pressable>

          {/* Login Button with Ripple */}
          <Pressable
            onPress={startRipple}
            style={{ width: "100%", marginBottom: 20 }}
          >
            <Animated.View
              style={[
                styles.loginButton,
                {
                  transform: [{ scale: rippleScale }],
                  opacity: rippleOpacity,
                },
              ]}
            >
              <LinearGradient
                colors={["#6A5AE0", "#8A76F1"]}
                style={styles.gradientButton}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </LinearGradient>
            </Animated.View>
          </Pressable>

          {/* Social Login */}
          <View style={styles.socialContainer}>
            <Pressable style={styles.socialButton}>
              <AntDesign name="google" size={20} color="#DB4437" />
              <Text style={styles.socialText}>Login with Google</Text>
            </Pressable>
            <Pressable style={styles.socialButton}>
              <AntDesign name="apple" size={20} color="#000" />
              <Text style={styles.socialText}>Login with Apple</Text>
            </Pressable>
          </View>

          {/* Create Account */}
          <Pressable>
            <Text style={styles.createAccount}>Create an account</Text>
          </Pressable>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    width: width * 0.85,
    padding: 28,
    borderRadius: 28,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
    alignItems: "center",
  },
  title: { fontSize: 28, fontWeight: "700", color: "#000" },
  subtitle: { fontSize: 15, color: "#555", marginBottom: 25 },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.55)",
    borderRadius: 12,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  input: { flex: 1, marginLeft: 8, paddingVertical: 10, color: "#000" },
  loginButton: { width: "100%" },
  gradientButton: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
  createAccount: {
    color: "#8A76F1",
    fontSize: 15,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
  socialContainer: {
    width: "100%",
    marginBottom: 20,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 14,
    marginBottom: 12,
    justifyContent: "center",
  },
  socialText: { marginLeft: 8, fontSize: 16, fontWeight: "500" },
});
