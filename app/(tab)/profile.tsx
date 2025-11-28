import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
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

const ProfilePage: React.FC = () => {
  const router = useRouter();

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
              Here’s your feed & stats today
            </Text>
          </View>

          <Image
            source={{
              uri: "https://api.dicebear.com/8.x/thumbs/svg?seed=John",
            }}
            style={styles.avatar}
          />
        </View>

        {/* QUICK ACTIONS */}
        <View style={styles.quickActions}>
          <Pressable
            style={styles.quickButton}
            onPress={() => router.push("/post")}
          >
            <Text style={styles.quickIcon}>➕</Text>
            <Text style={styles.quickText}>New Post</Text>
          </Pressable>

          <Pressable
            style={styles.quickButton}
            onPress={() => router.push("/post?workout=true")}
          >
            <Text style={styles.quickIcon}>🏃‍♂️</Text>
            <Text style={styles.quickText}>Log Workout</Text>
          </Pressable>

          <Pressable style={styles.quickButton}>
            <Text style={styles.quickIcon}>📢</Text>
            <Text style={styles.quickText}>Notifications</Text>
          </Pressable>
        </View>

        {/* FITNESS STATS */}
        <View style={styles.statsContainer}>
          <View style={styles.statBox}>
            <Text style={styles.statValue}>3</Text>
            <Text style={styles.statLabel}>Workouts</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>12km</Text>
            <Text style={styles.statLabel}>Distance</Text>
          </View>

          <View style={styles.statBox}>
            <Text style={styles.statValue}>15,000</Text>
            <Text style={styles.statLabel}>Steps</Text>
          </View>
        </View>

        {/* RECENT POSTS / FEATURE CARDS */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Friend: Alice</Text>
          <Text style={styles.cardText}>
            Completed 5km run! 💪 Feeling great.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Friend: Bob</Text>
          <Text style={styles.cardText}>Shared a photo from the gym 📸</Text>
        </View>

        {/* NAVIGATION BUTTON */}
        <Pressable
          style={styles.button}
          onPress={() => router.push("/profile")}
        >
          <Text style={styles.buttonText}>Go to Profile</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: { flex: 1 },
  circle: { position: "absolute", borderRadius: 1000 },
  circleTop: {
    width: 140,
    height: 140,
    top: -60,
    left: -40,
    backgroundColor: "rgba(238,0,79,0.1)",
  },
  circleBottom: {
    width: 180,
    height: 180,
    bottom: -50,
    right: -30,
    backgroundColor: "rgba(0,122,255,0.1)",
  },

  content: { paddingTop: 80, paddingBottom: 60, paddingHorizontal: 20 },

  /* HEADER */
  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  welcome: { fontSize: 26, fontWeight: "700", color: "#000" },
  welcomeSub: { color: "#555", marginTop: 3 },
  avatar: { width: 50, height: 50, borderRadius: 25 },

  /* QUICK ACTIONS */
  quickActions: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  quickButton: {
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 15,
    borderRadius: 20,
    alignItems: "center",
    width: width * 0.28,
  },
  quickIcon: { fontSize: 24 },
  quickText: { fontSize: 13, marginTop: 6, color: "#333" },

  /* STATS */
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: "rgba(255,255,255,0.8)",
    width: width * 0.3,
    padding: 15,
    borderRadius: 18,
    alignItems: "center",
  },
  statValue: { fontSize: 20, fontWeight: "700" },
  statLabel: { fontSize: 12, color: "#555", marginTop: 5 },

  /* CARDS */
  card: {
    width: "100%",
    backgroundColor: "rgba(255,255,255,0.7)",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
  },
  cardTitle: { fontSize: 16, fontWeight: "600", marginBottom: 4 },
  cardText: { fontSize: 13, color: "#555" },

  /* BUTTON */
  button: {
    width: "100%",
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: "#6A5AE0",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
});

// export default function ProfilePage() {
//   return (
//     <View style={styles.container}>
//       <Image
//         source={{
//           uri: "https://api.dicebear.com/8.x/thumbs/svg?seed=John",
//         }}
//         style={styles.avatar}
//       />

//       <Text style={styles.name}>John Doe</Text>
//       <Text style={styles.email}>john.doe@mail.com</Text>

//       <View style={styles.section}>
//         <Text style={styles.sectionTitle}>Account Info</Text>
//         <Text style={styles.label}>Member since: 2023</Text>
//         <Text style={styles.label}>Plan: Premium</Text>
//       </View>

//       <Pressable style={styles.button}>
//         <Text style={styles.buttonText}>Edit Profile</Text>
//       </Pressable>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, paddingTop: 80, alignItems: "center" },
//   avatar: { width: 120, height: 120, borderRadius: 60, marginBottom: 20 },
//   name: { fontSize: 26, fontWeight: "700" },
//   email: { color: "#555", marginBottom: 20 },
//   section: {
//     width: "90%",
//     backgroundColor: "rgba(255,255,255,0.7)",
//     padding: 20,
//     borderRadius: 18,
//     marginTop: 20,
//   },
//   sectionTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },
//   label: { color: "#555", marginBottom: 5 },
//   button: {
//     marginTop: 30,
//     paddingVertical: 14,
//     width: "90%",
//     backgroundColor: "#6A5AE0",
//     borderRadius: 16,
//     alignItems: "center",
//   },
//   buttonText: { color: "#fff", fontSize: 16, fontWeight: "600" },
// });
