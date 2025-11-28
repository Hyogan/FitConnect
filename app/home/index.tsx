import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useEffect, useRef } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

const HomePage: React.FC = () => {
  const router = useRouter();

  const topCircleAnim = useRef(new Animated.Value(0)).current;
  const bottomCircleAnim = useRef(new Animated.Value(0)).current;

  // Floating circles animation
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

    animate(topCircleAnim, 15, 4000);
    animate(bottomCircleAnim, -15, 5000);
  }, []);

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={["#EEF2F3", "#D9E8F5"]}
        start={[0, 0]}
        end={[1, 1]}
        style={StyleSheet.absoluteFill}
      />

      {/* Floating Circles */}
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

      <ScrollView contentContainerStyle={styles.content}>
        {/* HEADER */}
        <View style={styles.header}>
          <View>
            <Text style={styles.welcome}>Hello, John 👋</Text>
            <Text style={styles.welcomeSub}>
              Welcome back to your dashboard
            </Text>
          </View>

          <Image
            source={{
              uri: "https://api.dicebear.com/8.x/thumbs/svg?seed=John",
            }}
            style={styles.avatar}
          />
        </View>

        {/* QUICK ACTION BUTTONS */}
        <View style={styles.quickActions}>
          <Pressable style={styles.quickButton}>
            <Text style={styles.quickIcon}>📄</Text>
            <Text style={styles.quickText}>My Files</Text>
          </Pressable>

          <Pressable style={styles.quickButton}>
            <Text style={styles.quickIcon}>⚙️</Text>
            <Text style={styles.quickText}>Settings</Text>
          </Pressable>

          <Pressable style={styles.quickButton}>
            <Text style={styles.quickIcon}>📢</Text>
            <Text style={styles.quickText}>Alerts</Text>
          </Pressable>
        </View>

        {/* STATS SECTION */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>New Messages</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>Tasks Due</Text>
          </View>
        </View>

        {/* FEATURE CARDS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Profile</Text>
          <Text style={styles.cardText}>View and edit your personal info</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Activity</Text>
          <Text style={styles.cardText}>Check your recent actions</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Notifications</Text>
          <Text style={styles.cardText}>See all alerts and updates</Text>
        </View>

        {/* NAVIGATION BUTTON */}
        <Pressable
          style={styles.button}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.buttonText}>Go to Profile</Text>
        </Pressable>

        {/* LOGOUT BUTTON */}
        <Pressable
          style={styles.logoutButton}
          onPress={() => router.replace("/")}
        >
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1 },
  circle: { position: "absolute", borderRadius: 1000 },
  circleTop: {
    width: 140,
    height: 140,
    top: -60,
    left: -40,
    backgroundColor: "rgba(238,0,79,0.2)",
  },
  circleBottom: {
    width: 180,
    height: 180,
    bottom: -50,
    right: -30,
    backgroundColor: "rgba(0,122,255,0.2)",
  },

  content: { paddingTop: 80, paddingBottom: 60, paddingHorizontal: 20 },

  /* HEADER */
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  welcome: { fontSize: 26, fontWeight: "700", color: "#000" },
  welcomeSub: { color: "#555", marginTop: 3 },
  avatar: { width: 50, height: 50, borderRadius: 25 },

  /* QUICK ACTIONS */
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 30,
  },
  quickButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: width * 0.25,
  },
  quickIcon: { fontSize: 24 },
  quickText: { fontSize: 13, marginTop: 6, color: "#333" },

  /* STATS */
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  statBox: {
    backgroundColor: "rgba(255,255,255,0.8)",
    width: width * 0.42,
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
  },
  statValue: { fontSize: 22, fontWeight: "700" },
  statLabel: { fontSize: 14, color: "#555", marginTop: 5 },

  /* CARDS */
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 20,
    borderRadius: 18,
    marginBottom: 20,
  },
  cardTitle: { fontSize: 18, fontWeight: "600", marginBottom: 6 },
  cardText: { fontSize: 14, color: "#555" },

  /* BUTTONS */
  button: {
    width: "100%",
    paddingVertical: 15,
    borderRadius: 14,
    backgroundColor: "#6A5AE0",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },

  logoutButton: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#8A76F1",
    alignItems: "center",
  },
  logoutText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});
