import { AntDesign, Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { AuthCard } from "../components/AuthCard";
import { BackgroundLayout } from "../components/BackgroundLayout";

export default function LoginPage() {
  const router = useRouter();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState("");

  return (
    <BackgroundLayout>
      <AuthCard>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue</Text>

        <View style={styles.inputContainer}>
          <Ionicons name="mail-outline" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.inputContainer}>
          <Ionicons name="lock-closed-outline" size={20} color="#555" />
          <TextInput
            style={styles.input}
            placeholder="Password"
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

        <Pressable onPress={() => router.push("/(auth)/forgot-password")}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </Pressable>

        {/* Login Button */}
        <Pressable
          onPress={() => router.replace("/(tab)/home")}
          style={{ width: "100%", marginBottom: 20 }}
        >
          <LinearGradient
            colors={["#6A5AE0", "#8A76F1"]}
            style={styles.gradientButton}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </LinearGradient>
        </Pressable>

        {/* Social Login */}
        <Pressable style={styles.socialButton}>
          <AntDesign name="google" size={20} color="#DB4437" />
          <Text style={styles.socialText}>Login with Google</Text>
        </Pressable>
        <Pressable style={styles.socialButton}>
          <AntDesign name="apple" size={20} color="#000" />
          <Text style={styles.socialText}>Login with Apple</Text>
        </Pressable>

        {/* Signup */}
        <Pressable onPress={() => router.push("/(auth)/register")}>
          <Text style={styles.createAccount}>Create an account</Text>
        </Pressable>
      </AuthCard>
    </BackgroundLayout>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 28, fontWeight: "700", color: "#000", marginBottom: 5 },
  subtitle: { fontSize: 15, color: "#555", marginBottom: 20 },
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
  linkText: {
    color: "#8A76F1",
    fontWeight: "500",
    marginBottom: 20,
    alignSelf: "flex-end",
  },

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
