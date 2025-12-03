// components/ChatSearchBar.tsx
import { useThemeApp } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Keyboard, Pressable, StyleSheet, TextInput, View } from "react-native";

interface ChatSearchBarProps {
  onSearch?: (query: string) => void;
  onFilterPress?: () => void;
}

export const ChatSearchBar: React.FC<ChatSearchBarProps> = ({
  onSearch,
  onFilterPress,
}) => {
  const { theme } = useThemeApp();
  const [query, setQuery] = useState("");
  const styles = themedStyles(theme.colors);

  const handleSearchChange = (text: string) => {
    setQuery(text);
    onSearch?.(text);
  };

  const handleClear = () => {
    setQuery("");
    onSearch?.("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* Search input */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={theme.colors.muted} />
        <TextInput
          value={query}
          onChangeText={handleSearchChange}
          placeholder="Search chats"
          placeholderTextColor={theme.colors.muted}
          style={styles.input}
        />
        {query.length > 0 && (
          <Pressable onPress={handleClear} style={styles.clearButton}>
            <Ionicons
              name="close-circle"
              size={18}
              color={theme.colors.muted}
            />
          </Pressable>
        )}
      </View>

      {/* Filter button */}
      <Pressable style={styles.filterButton} onPress={onFilterPress}>
        <Ionicons name="funnel-outline" size={22} color={theme.colors.text} />
      </Pressable>
    </View>
  );
};

const themedStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: colors.background,
    },
    searchContainer: {
      flex: 1,
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: colors.card,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 14,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
    },
    input: {
      flex: 1,
      marginLeft: 8,
      fontSize: 16,
      color: colors.text,
    },
    clearButton: {
      marginLeft: 6,
    },
    filterButton: {
      marginLeft: 12,
      backgroundColor: colors.card,
      padding: 10,
      borderRadius: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.05,
      shadowRadius: 2,
      elevation: 2,
      alignItems: "center",
      justifyContent: "center",
    },
  });
