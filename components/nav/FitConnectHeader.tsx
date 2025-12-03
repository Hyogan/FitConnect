import { useThemeApp } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function FitConnectHeader({
  title = "FitConnect",
  streak = 12,
  onSearch,
  onFriends,
  onNotifications,
  onProfile,
}: {
  title?: string;
  streak?: number;
  onSearch?: () => void;
  onFriends?: () => void;
  onNotifications?: () => void;
  onProfile?: () => void;
}) {
  const insets = useSafeAreaInsets();
  const { theme } = useThemeApp();
  const styles = themedStyles(theme.colors);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Left Section: Title + Streak */}
      <View>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.streakBadge}>
          <Ionicons name="flame" size={14} color="#FF6A00" />
          <Text style={styles.streakText}>{streak}-day streak</Text>
        </View>
      </View>

      {/* Right Section */}
      <View style={styles.right}>
        <Pressable style={styles.iconBtn} onPress={onSearch}>
          <Ionicons name="search-outline" size={24} color={theme.colors.text} />
        </Pressable>

        <Pressable style={styles.iconBtn} onPress={onFriends}>
          <Ionicons name="people-outline" size={26} color={theme.colors.text} />
        </Pressable>

        <Pressable style={styles.iconBtn} onPress={onNotifications}>
          <Ionicons
            name="notifications-outline"
            size={26}
            color={theme.colors.text}
          />
        </Pressable>

        {/* Avatar with online status */}
        <Pressable onPress={onProfile} style={styles.avatarWrapper}>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />
          <View style={styles.onlineDot} />
        </Pressable>
      </View>
    </View>
  );
}

const themedStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      paddingBottom: 10,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 24,
      fontWeight: "700",
      color: colors.text,
    },
    streakBadge: {
      flexDirection: "row",
      marginTop: 2,
      backgroundColor: "#FFE8D5",
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 8,
      alignItems: "center",
      alignSelf: "flex-start",
    },
    streakText: {
      marginLeft: 4,
      fontSize: 12,
      fontWeight: "600",
      color: "#FF6A00",
    },
    right: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconBtn: {
      marginHorizontal: 6,
    },
    avatarWrapper: {
      marginLeft: 10,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
    onlineDot: {
      position: "absolute",
      bottom: 0,
      right: 0,
      width: 10,
      height: 10,
      borderRadius: 10,
      backgroundColor: "#22C55E",
      borderWidth: 2,
      borderColor: colors.card,
    },
  });
