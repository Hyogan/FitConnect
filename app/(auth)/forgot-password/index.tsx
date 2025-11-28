import { Ionicons } from "@expo/vector-icons";
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

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  return (
    <BackgroundLayout>
      <AuthCard>
        <View>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Enter your email to reset your password
          </Text>

          {/* Email Input */}
          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#555" />
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#555"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
          </View>

          {/* Reset Password Button */}
          <Pressable
            onPress={() => {
              // Ici tu peux appeler ton API de reset
              console.log("Reset password for:", email);
            }}
            style={{ width: "100%", marginBottom: 20 }}
          >
            <LinearGradient
              colors={["#6A5AE0", "#8A76F1"]}
              style={styles.gradientButton}
            >
              <Text style={styles.loginButtonText}>Send Reset Link</Text>
            </LinearGradient>
          </Pressable>

          {/* Back to Login */}
          <Pressable onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.createAccount}>Back to Login</Text>
          </Pressable>
        </View>
      </AuthCard>
    </BackgroundLayout>
  );
}

const styles = StyleSheet.create({
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
  input: { flex: 1, marginLeft: 8, paddingVertical: 17, color: "#000" },
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
