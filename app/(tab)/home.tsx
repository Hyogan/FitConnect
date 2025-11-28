import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

// Dummy posts
const POSTS = [
  {
    id: "1",
    user: "Alice",
    avatar: "https://api.dicebear.com/8.x/thumbs/svg?seed=Alice",
    time: "2h ago",
    text: "Just finished a 5km run! Feeling amazing 💪",
    image: "https://picsum.photos/400/300",
  },
  {
    id: "2",
    user: "Bob",
    avatar: "https://api.dicebear.com/8.x/thumbs/svg?seed=Bob",
    time: "4h ago",
    text: "Gym session done! #gains",
    image: "https://picsum.photos/401/300",
  },
  {
    id: "3",
    user: "Charlie",
    avatar: "https://api.dicebear.com/8.x/thumbs/svg?seed=Charlie",
    time: "6h ago",
    text: "Morning yoga is the best way to start the day 🌞",
  },
];

const HomePage: React.FC = () => {
  const router = useRouter();

  const renderPost = ({ item }: any) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{item.user}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      {item.text ? <Text style={styles.postText}>{item.text}</Text> : null}

      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      ) : null}

      <View style={styles.postActions}>
        <Pressable style={styles.actionButton}>
          <Text>❤️ Like</Text>
          <Ionicons name="mail-outline" size={20} color="#555" />
        </Pressable>
        <Pressable style={styles.actionButton}>
          <Text>
            <Ionicons name="mail-outline" size={20} color="#555" />
            Comment
          </Text>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ paddingVertical: 10 }}
      />

      {/* Floating new post button */}
      <Pressable
        style={styles.floatingButton}
        onPress={() => router.push("/post")}
      >
        <Text style={styles.floatingButtonText}>＋</Text>
      </Pressable>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 50, backgroundColor: "#fff" },

  postCard: {
    backgroundColor: "#fff",
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 14,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  postHeader: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  userName: { fontWeight: "600" },
  time: { fontSize: 12, color: "#666" },
  postText: { marginBottom: 8 },
  postImage: {
    width: width - 24,
    height: 200,
    borderRadius: 12,
    marginBottom: 8,
  },
  postActions: { flexDirection: "row", justifyContent: "space-around" },
  actionButton: { paddingVertical: 6 },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 20,
    backgroundColor: "#6A5AE0",
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    elevation: 6,
  },
  floatingButtonText: { fontSize: 30, color: "#fff", lineHeight: 32 },
});
