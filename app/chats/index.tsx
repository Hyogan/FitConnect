import { ChatHeader } from "@/components/chats/ChatHeader";
import { ChatSearchBar } from "@/components/chats/ChatSearchBar";
import { useThemeApp } from "@/context/ThemeContext";
import { MOCK_CHATS } from "@/data/chats";
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

export default function ChatListScreen() {
  const { theme } = useThemeApp();
  const styles = themedStyles(theme.colors);
  const router = useRouter();

  const renderChatItem = ({ item }: any) => (
    <Pressable
      style={({ pressed }) => [
        styles.chatCard,
        pressed && { backgroundColor: theme.colors.background },
      ]}
      onPress={() =>
        router.push({
          pathname: "/chats/[id]",
          params: item.id,
        })
      }
    >
      <Image source={{ uri: item.avatar }} style={styles.avatar} />
      <View style={styles.chatInfo}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.lastMessage} numberOfLines={1}>
          {item.lastMessage}
        </Text>
      </View>
      <View style={styles.unreadBadge}>
        <Text style={styles.unreadText}>2</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {/* Ch</View> */}
      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={renderChatItem}
        contentContainerStyle={{ paddingVertical: 8 }}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <ChatHeader title="Chat List" />
            <ChatSearchBar />
          </View>
        }
        ListHeaderComponentStyle={{ backgroundColor: "transparent" }}
      />
    </View>
  );
}

const themedStyles = (c: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      //   backgroundColor: c.background,
    },
    chatCard: {
      flexDirection: "row",
      alignItems: "center",
      padding: 12,
      //   marginHorizontal: 12,
      //   marginVertical: 4,
      //   borderRadius: 12,
      backgroundColor: c.card,
      shadowColor: "#000",
      borderBottomColor: c.background,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 2,
    },
    avatar: { width: 55, height: 55, borderRadius: 27.5, marginRight: 12 },
    chatInfo: { flex: 1 },
    name: { fontSize: 16, fontWeight: "600", color: c.text },
    lastMessage: { fontSize: 14, color: c.muted, marginTop: 2 },
    unreadBadge: {
      backgroundColor: "#6A5AE0",
      width: 24,
      height: 24,
      borderRadius: 12,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 8,
    },
    unreadText: {
      color: "#fff",
      fontSize: 12,
      fontWeight: "600",
    },
  });
