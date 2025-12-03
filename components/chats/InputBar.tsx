// app/components/messaging/InputBar.tsx
import { useThemeApp } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";

interface InputBarProps {
  onSend: (text: string) => void;
}

export function InputBar({ onSend }: InputBarProps) {
  const [text, setText] = useState("");
  const { theme } = useThemeApp();
  const styles = themedStyles(theme.colors);

  const handleSend = () => {
    if (text.trim() === "") return;
    onSend(text);
    setText("");
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={text}
        onChangeText={setText}
        placeholder="Type a message..."
        placeholderTextColor={theme.colors.muted}
      />
      <Pressable onPress={handleSend} style={styles.sendBtn}>
        <Ionicons name="send" size={24} color="#fff" />
      </Pressable>
    </View>
  );
}

const themedStyles = (c: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      padding: 8,
      paddingHorizontal: 12,
      alignItems: "center",
      borderTopWidth: 1,
      borderTopColor: c.border,
      backgroundColor: c.background,
    },
    input: {
      flex: 1,
      backgroundColor: c.card,
      borderRadius: 25,
      paddingHorizontal: 16,
      paddingVertical: 8,
      color: c.text,
      fontSize: 14,
    },
    sendBtn: {
      backgroundColor: "#6A5AE0",
      padding: 10,
      borderRadius: 25,
      marginLeft: 8,
    },
  });
