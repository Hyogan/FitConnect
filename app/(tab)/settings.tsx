import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";

export default function SettingsPage() {
  const [push, setPush] = React.useState(true);
  const [dark, setDark] = React.useState(false);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.item}>
        <Text style={styles.label}>Push Notifications</Text>
        <Switch value={push} onValueChange={setPush} />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch value={dark} onValueChange={setDark} />
      </View>

      <View style={styles.item}>
        <Text style={styles.label}>Language</Text>
        <Text style={styles.value}>English ›</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    borderBottomWidth: 0.5,
    borderColor: "#ccc",
  },
  label: { fontSize: 16 },
  value: { fontSize: 16, color: "#6A5AE0" },
});
