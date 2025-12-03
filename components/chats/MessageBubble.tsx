// app/components/messaging/MessageBubble.tsx
import { useThemeApp } from "@/context/ThemeContext";
import { StyleSheet, Text, View } from "react-native";

interface MessageBubbleProps {
  text: string;
  sender: "me" | "other";
}

export function MessageBubble({ text, sender }: MessageBubbleProps) {
  const { theme } = useThemeApp();
  const styles = themedStyles(theme.colors, sender);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const themedStyles = (c: any, sender: "me" | "other") =>
  StyleSheet.create({
    container: {
      backgroundColor: sender === "me" ? "#6A5AE0" : c.card,
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
      marginVertical: 4,
      alignSelf: sender === "me" ? "flex-end" : "flex-start",
      maxWidth: "75%",
    },
    text: {
      color: sender === "me" ? "#fff" : c.text,
      fontSize: 14,
    },
  });
