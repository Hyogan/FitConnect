import { useThemeApp } from "@/context/ThemeContext";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import {
  Alert,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const FITNESS_GOALS = ["Lose Weight", "Build Muscle", "Stay Fit", "Endurance"];

export default function OnboardingScreen() {
  const { theme, toggleTheme } = useThemeApp();
  const styles = themedStyles(theme.colors);

  const [username, setUsername] = useState("");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [goal, setGoal] = useState<string | null>(null);

  const pickAvatar = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert("Permission required", "Camera roll access is required!");
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.8,
      allowsEditing: true,
      aspect: [1, 1],
    });
    console.log(result);

    if (!result.canceled) {
      setAvatar(result.assets[0].uri);
    }
  };

  const handleStart = () => {
    if (!username || !goal) {
      Alert.alert(
        "Missing Info",
        "Please enter your username and select a goal."
      );
      return;
    }
    // Navigate to main app or save user onboarding info
    Alert.alert("Welcome!", `Hello ${username}, ready to crush your goal!`);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ padding: 24, alignItems: "center" }}
    >
      <Text style={styles.title}>Welcome to FitConnect</Text>
      <Text style={styles.subtitle}>Let’s set up your profile</Text>

      {/* Avatar Picker */}
      <Pressable onPress={pickAvatar} style={styles.avatarWrapper}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarPlaceholderText}>Add Photo</Text>
          </View>
        )}
      </Pressable>

      {/* Username Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        placeholderTextColor={theme.colors.muted}
        value={username}
        onChangeText={setUsername}
      />

      {/* Fitness Goals */}
      <Text style={styles.sectionTitle}>Choose your fitness goal</Text>
      <View style={styles.goalsContainer}>
        {FITNESS_GOALS.map((g) => (
          <Pressable
            key={g}
            onPress={() => setGoal(g)}
            style={[
              styles.goalBtn,
              goal === g && { backgroundColor: "#6A5AE0" },
            ]}
          >
            <Text
              style={[
                styles.goalText,
                goal === g && { color: "#fff", fontWeight: "600" },
              ]}
            >
              {g}
            </Text>
          </Pressable>
        ))}
      </View>

      {/* Theme Selection */}
      <Text style={styles.sectionTitle}>Theme</Text>
      <View style={styles.themeContainer}>
        <Pressable
          onPress={() => toggleTheme()}
          style={[
            styles.themeBtn,
            !theme.dark && { backgroundColor: "#6A5AE0" },
          ]}
        >
          <Text
            style={[
              styles.themeText,
              !theme.dark && { color: "#fff", fontWeight: "600" },
            ]}
          >
            Light
          </Text>
        </Pressable>

        <Pressable
          onPress={() => toggleTheme()}
          style={[
            styles.themeBtn,
            theme.dark && { backgroundColor: "#6A5AE0" },
          ]}
        >
          <Text
            style={[
              styles.themeText,
              theme.dark && { color: "#fff", fontWeight: "600" },
            ]}
          >
            Dark
          </Text>
        </Pressable>
      </View>

      {/* Start Button */}
      <Pressable style={styles.startBtn} onPress={handleStart}>
        <Text style={styles.startText}>Get Started</Text>
      </Pressable>
    </ScrollView>
  );
}

const themedStyles = (c: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: c.background },
    title: { fontSize: 28, fontWeight: "700", color: c.text, marginBottom: 8 },
    subtitle: { fontSize: 16, color: c.muted, marginBottom: 24 },
    avatarWrapper: {
      marginBottom: 16,
      borderRadius: 60,
      overflow: "hidden",
    },
    avatar: { width: 120, height: 120, borderRadius: 60 },
    avatarPlaceholder: {
      width: 120,
      height: 120,
      borderRadius: 60,
      backgroundColor: c.card,
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 1,
      borderColor: c.border,
    },
    avatarPlaceholderText: { color: c.muted },
    input: {
      width: "100%",
      padding: 12,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: c.border,
      marginBottom: 20,
      color: c.text,
      fontSize: 16,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "600",
      color: c.text,
      marginBottom: 8,
    },
    goalsContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginBottom: 20,
    },
    goalBtn: {
      paddingVertical: 10,
      paddingHorizontal: 16,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: c.border,
      marginRight: 8,
      marginBottom: 8,
    },
    goalText: { color: c.text, fontSize: 14 },
    themeContainer: { flexDirection: "row", marginBottom: 24 },
    themeBtn: {
      paddingVertical: 10,
      paddingHorizontal: 24,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: c.border,
      marginRight: 12,
    },
    themeText: { fontSize: 14, color: c.text },
    startBtn: {
      backgroundColor: "#6A5AE0",
      paddingVertical: 14,
      paddingHorizontal: 40,
      borderRadius: 25,
    },
    startText: { color: "#fff", fontSize: 16, fontWeight: "700" },
  });
