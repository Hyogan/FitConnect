import { useThemeApp } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function CustomHeader() {
  const insets = useSafeAreaInsets();
  const { theme, toggleTheme } = useThemeApp();
  const styles = themedStyles(theme.colors);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Text style={styles.title}>Dashboard</Text>

      <View style={styles.right}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={26} color="#333" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={{ uri: "https://i.pravatar.cc/150?img=12" }}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}
const themedStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      backgroundColor: colors.card,
      paddingHorizontal: 20,
      paddingBottom: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    title: {
      fontSize: 22,
      fontWeight: "600",
      color: colors.text,
    },
    right: {
      flexDirection: "row",
      alignItems: "center",
    },
    iconButton: {
      marginRight: 15,
    },
    avatar: {
      width: 36,
      height: 36,
      borderRadius: 18,
    },
  });
