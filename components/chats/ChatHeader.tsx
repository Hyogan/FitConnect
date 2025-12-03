// components/ChatHeader.tsx
import { useThemeApp } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

interface ChatHeaderProps {
  title: string;
  onEllipsisPress?: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  title,
  onEllipsisPress,
}) => {
  const { theme } = useThemeApp();
  const router = useRouter();
  const styles = themedStyles(theme.colors);

  return (
    <View style={styles.container}>
      {/* Back button */}
      <Pressable
        style={styles.iconButton}
        onPress={() => router.navigate("/(tab)/home")}
      >
        <Ionicons name="chevron-back" size={28} color={theme.colors.text} />
      </Pressable>

      {/* Title */}
      <Text style={styles.title} numberOfLines={1}>
        {title ?? "Chat List"}
      </Text>

      {/* Ellipsis button */}
      <Pressable style={styles.iconButton} onPress={onEllipsisPress}>
        <Ionicons
          name="ellipsis-vertical"
          size={24}
          color={theme.colors.text}
        />
      </Pressable>
    </View>
  );
};

const themedStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingHorizontal: 16,
      marginTop: 20,
      height: 70,
      //   backgroundColor: colors.card,
      //   shadowColor: "#000",
      //   shadowOffset: { width: 0, height: 3 },
      //   shadowOpacity: 0.1,
      //   shadowRadius: 4,
      //   elevation: 5,
      //   borderBottomLeftRadius: 20,
      //   borderBottomRightRadius: 20,
    },
    iconButton: {
      width: 44,
      height: 44,
      borderRadius: 22,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: colors.cardHover ?? "rgba(0,0,0,0.05)",
    },
    title: {
      flex: 1,
      textAlign: "center",
      fontSize: 22,
      fontWeight: "700",
      color: colors.text,
    },
  });
