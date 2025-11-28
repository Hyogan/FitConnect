import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Dimensions,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { AuthCard } from "../components/AuthCard";
import { BackgroundLayout } from "../components/BackgroundLayout";

const { width } = Dimensions.get("window");

export default function RegisterPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

  return (
    <BackgroundLayout>
      <AuthCard>
        <View style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          {/* Name Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#555"
            />
          </View>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#555"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={25} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor="#555"
              secureTextEntry={!passwordVisible}
            />
            <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
              <Ionicons
                name={passwordVisible ? "eye-outline" : "eye-off-outline"}
                size={20}
                color="#555"
              />
            </Pressable>
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor="#555"
              secureTextEntry={!confirmPasswordVisible}
            />
            <Pressable
              onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            >
              <Ionicons
                name={
                  confirmPasswordVisible ? "eye-outline" : "eye-off-outline"
                }
                size={20}
                color="#555"
              />
            </Pressable>
          </View>

          {/* Register Button */}
          <Pressable
            onPress={() => router.replace("/(auth)/register")}
            style={{ width: "100%", marginBottom: 20 }}
          >
            <LinearGradient
              colors={["#6A5AE0", "#8A76F1"]}
              style={styles.gradientButton}
            >
              <Text style={styles.loginButtonText}>Register</Text>
            </LinearGradient>
          </Pressable>

          {/* Social Signup */}
          <Pressable style={styles.socialButton}>
            <AntDesign name="google" size={20} color="#DB4437" />
            <Text style={styles.socialText}>Sign up with Google</Text>
          </Pressable>
          <Pressable style={styles.socialButton}>
            <AntDesign name="apple" size={20} color="#000" />
            <Text style={styles.socialText}>Sign up with Apple</Text>
          </Pressable>

          {/* Login Link */}
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.createAccount}>
              Already have an account? Log in
            </Text>
          </Pressable>
        </View>
      </AuthCard>
    </BackgroundLayout>
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
  input: { flex: 1, marginLeft: 8, paddingVertical: 14, color: "#000" },
  gradientButton: {
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
  },
  loginButtonText: { color: "#fff", fontSize: 18, fontWeight: "600" },
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
  createAccount: {
    color: "#8A76F1",
    fontSize: 15,
    fontWeight: "500",
    textDecorationLine: "underline",
  },
});
