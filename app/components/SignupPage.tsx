// SignupPage.js
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
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

const { width } = Dimensions.get("window");

export default function SignupPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const router = useRouter();

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#EEF2F3", "#D9E8F5"]}
        start={[0, 0]}
        end={[1, 1]}
        style={StyleSheet.absoluteFill}
      />
      <View style={styles.center}>
        <BlurView intensity={80} tint="light" style={styles.card}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>Sign up to get started</Text>

          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Full Name"
              placeholderTextColor="#555"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#555"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#555" />
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

          <Pressable style={{ width: "100%", marginVertical: 20 }}>
            <LinearGradient
              colors={["#6A5AE0", "#8A76F1"]}
              style={styles.gradientButton}
            >
              <Text style={styles.loginButtonText}>Sign Up</Text>
            </LinearGradient>
          </Pressable>

          <Pressable onPress={() => router.back()}>
            <Text style={styles.createAccount}>
              Already have an account? Login
            </Text>
          </Pressable>
        </BlurView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
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
});
