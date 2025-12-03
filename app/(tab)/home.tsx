// app/index.tsx
import { useThemeApp } from "@/context/ThemeContext";
import { Post, POSTS } from "@/data/posts";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemeToggle } from "../../components/ThemeToggle";

export default function HomePage() {
  const router = useRouter();
  const { theme, toggleTheme } = useThemeApp();
  const styles = themedStyles(theme.colors);
  const renderPost = ({ item }: { item: Post }) => (
    <View style={styles.postCard}>
      <View style={styles.postHeader}>
        <Image source={{ uri: item.user.avatar }} style={styles.avatar} />
        <View>
          <Text style={styles.userName}>{item.user.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      {item.text ? <Text style={styles.postText}>{item.text}</Text> : null}

      {item.image ? (
        <Image source={{ uri: item.image }} style={styles.postImage} />
      ) : null}

      <View style={styles.postActions}>
        <Pressable style={styles.actionButton}>
          <View style={styles.actionContent}>
            <Ionicons name="heart-outline" size={20} color="#ff0000" />
            <Text style={styles.statsText}>{item.likes ?? 0}</Text>
            <Text style={styles.actionText}>Like</Text>
          </View>
        </Pressable>

        <Pressable style={styles.actionButton}>
          <View style={styles.actionContent}>
            <Ionicons
              name="chatbubble-outline"
              size={20}
              color={theme.colors.text}
            />
            <Text style={styles.statsText}>{item.comments ?? 0}</Text>
            <Text style={styles.actionText}>Comment</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );

  return (
    <View style={[styles.container]}>
      <FlatList
        data={POSTS}
        keyExtractor={(item) => item.id}
        renderItem={renderPost}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsVerticalScrollIndicator={false}
      />
      <View style={styles.floatingButtons}>
        {/* Floating new post button */}
        <Pressable
          style={styles.floatingButton}
          onPress={() => router.push("/post")}
        >
          <Text style={styles.floatingButtonText}>＋</Text>
        </Pressable>
        <ThemeToggle
          dark={theme.dark}
          onToggle={toggleTheme}
          color={theme.colors.text}
          backgroundColor={theme.colors.card}
        />
      </View>
    </View>
  );
}

const themedStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      //   paddingTop: 20,
    },
    postCard: {
      backgroundColor: colors.card,
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

    userName: { fontWeight: "600", color: colors.text },
    time: { fontSize: 12, color: colors.text },

    postText: { marginBottom: 8, color: colors.text },

    postImage: {
      width: "100%",
      height: 200,
      borderRadius: 12,
      marginBottom: 8,
    },

    postActions: {
      flexDirection: "row",
      justifyContent: "space-around",
    },

    actionButton: { paddingVertical: 6 },
    actionContent: { flexDirection: "row", alignItems: "center" },
    actionText: { marginLeft: 5, fontSize: 16, color: colors.text },
    floatingButtons: {
      position: "absolute",
      bottom: 120,
      right: 20,
      gap: 6,
    },
    floatingButton: {
      backgroundColor: "#6A5AE0",
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      elevation: 6,
    },
    floatingButtonText: { fontSize: 30, color: "#fff", lineHeight: 32 },

    themeButton: {
      backgroundColor: colors.card,
      width: 50,
      height: 50,
      borderRadius: 25,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: colors.border,
    },
    themeButtonText: { fontSize: 25, color: colors.text },

    iconWrapper: {
      transform: [{ rotate: colors.dark ? "0deg" : "180deg" }],
    },
    postStats: {
      flexDirection: "row",
      justifyContent: "flex-start",
      gap: 16,
      marginTop: 8,
    },
    statsText: { color: colors.text, fontSize: 12 },
  });
