// app/(tabs)/chat/[chatId].tsx
import { ChatHeader } from "@/components/chats/ChatHeader";
import { useThemeApp } from "@/context/ThemeContext";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { InputBar } from "../../components/chats/InputBar";
import { MessageBubble } from "../../components/chats/MessageBubble";

const MOCK_MESSAGES = [
  { id: "1", text: "Hey! Ready for today’s workout?", sender: "other" },
  { id: "2", text: "Yes! Let’s crush it 💪", sender: "me" },
  { id: "3", text: "Don’t forget the stretch after", sender: "other" },
];

const MOCK_CHAT_INFOS = {
  //  {
  id: "3",
  name: "Michael Brown",
  avatar: "https://i.pravatar.cc/150?img=10",
  lastMessage: "Are we meeting for lunch?",
  //   },
};

export default function ChatScreen() {
  const [messages, setMessages] = useState(MOCK_MESSAGES);
  const [chat, setChat] = useState(MOCK_CHAT_INFOS);
  const { theme } = useThemeApp();
  const styles = themedStyles(theme.colors);
  const { id } = useLocalSearchParams<{ id: string }>();

  const handleSend = (text: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), text, sender: "me" },
    ]);
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MessageBubble text={item.text} sender={item.sender as any} />
        )}
        contentContainerStyle={{ padding: 16, paddingBottom: 80 }}
        ListHeaderComponent={
          <View>
            <ChatHeader title={chat.name} />
          </View>
        }
      />

      <View style={styles.inputBar}>
        <InputBar onSend={handleSend} />
      </View>
    </KeyboardAvoidingView>
  );
}

const themedStyles = (c: any) =>
  StyleSheet.create({
    container: { flex: 1, backgroundColor: c.background },
    inputBar: { marginBottom: 50 },
  });
