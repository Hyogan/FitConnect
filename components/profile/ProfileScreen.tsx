import { useThemeApp } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const MOCK_USER = {
  name: "Alex Johnson",
  avatar: "https://i.pravatar.cc/150?img=32",
  bio: "Fitness enthusiast 💪 | Marathon runner 🏃 | Gym rat",
  stats: {
    followers: 1023,
    following: 256,
    workouts: 128,
  },
  posts: [
    {
      id: "1",
      image: "https://images.unsplash.com/photo-1599058917212-d750089bc07d",
      likes: 82,
      comments: 14,
    },
    {
      id: "2",
      image: "https://images.unsplash.com/photo-1594737625785-c5c9c2a98901",
      likes: 143,
      comments: 22,
    },
  ],
};

export default function ProfileScreen() {
  const { theme } = useThemeApp();
  const styles = themedStyles(theme.colors);

  return (
    <View style={styles.container}>
      {/* <FitConnectHeader title="Profile" /> */}

      <View style={styles.profileHeader}>
        <View style={styles.avatarWrapper}>
          <Image source={{ uri: MOCK_USER.avatar }} style={styles.avatar} />
          <View style={styles.onlineDot} />
        </View>

        <View style={styles.userInfo}>
          <Text style={styles.username}>{MOCK_USER.name}</Text>
          <Text style={styles.bio}>{MOCK_USER.bio}</Text>

          <View style={styles.stats}>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{MOCK_USER.stats.followers}</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{MOCK_USER.stats.following}</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statNumber}>{MOCK_USER.stats.workouts}</Text>
              <Text style={styles.statLabel}>Workouts</Text>
            </View>
          </View>

          <Pressable style={styles.editBtn}>
            <Text style={styles.editText}>Edit Profile</Text>
          </Pressable>
        </View>
      </View>

      <FlatList
        data={MOCK_USER.posts}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={({ item }) => (
          <View style={styles.postCard}>
            <Image source={{ uri: item.image }} style={styles.postImage} />
            <View style={styles.postActions}>
              <Ionicons
                name="heart-outline"
                size={20}
                color={theme.colors.text}
              />
              <Text style={styles.postActionText}>{item.likes}</Text>
              <Ionicons
                name="chatbubble-outline"
                size={20}
                color={theme.colors.text}
                style={{ marginLeft: 12 }}
              />
              <Text style={styles.postActionText}>{item.comments}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const themedStyles = (c: any) =>
  StyleSheet.create({
    container: { flex: 1, width: "100%", backgroundColor: c.background },
    profileHeader: {
      flexDirection: "row",
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 16,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    avatarWrapper: { position: "relative" },
    avatar: { width: 100, height: 100, borderRadius: 50 },
    onlineDot: {
      position: "absolute",
      bottom: 4,
      right: 4,
      width: 14,
      height: 14,
      borderRadius: 7,
      backgroundColor: "#22C55E",
      borderWidth: 2,
      borderColor: c.card,
    },
    userInfo: { flex: 1, marginLeft: 16, justifyContent: "center" },
    username: { fontSize: 22, fontWeight: "700", color: c.text },
    bio: { fontSize: 14, color: c.muted, marginVertical: 4 },
    stats: { flexDirection: "row", marginVertical: 8 },
    stat: { marginRight: 20 },
    statNumber: { fontSize: 16, fontWeight: "700", color: c.text },
    statLabel: { fontSize: 12, color: c.muted },
    editBtn: {
      marginTop: 4,
      backgroundColor: "#6A5AE0",
      paddingVertical: 6,
      paddingHorizontal: 16,
      borderRadius: 20,
      alignSelf: "flex-start",
    },
    editText: { color: "#fff", fontWeight: "600", fontSize: 14 },
    postCard: {
      width: "48%",
      marginBottom: 16,
      borderRadius: 12,
      overflow: "hidden",
      backgroundColor: c.card,
    },
    postImage: { width: "100%", height: 150 },
    postActions: {
      flexDirection: "row",
      alignItems: "center",
      padding: 6,
    },
    postActionText: { marginLeft: 4, color: c.text },
  });
