import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function NotificationsPage() {
  const notifications = [
    { id: 1, text: "Your profile was viewed 3 times today" },
    { id: 2, text: "New login detected from Chrome" },
    { id: 3, text: "Your password will expire soon" },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Notifications</Text>

      {notifications.map((n) => (
        <View key={n.id} style={styles.notification}>
          <Text style={styles.text}>{n.text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  notification: {
    padding: 18,
    backgroundColor: "rgba(255,255,255,0.8)",
    borderRadius: 16,
    marginBottom: 15,
  },
  text: { color: "#333" },
});
