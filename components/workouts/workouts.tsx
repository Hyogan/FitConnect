// import { FitConnectHeader } from "@/components/nav/FitConnectHeader";
import { useThemeApp } from "@/context/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
// import { BarChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

const MOCK_WORKOUTS = [
  {
    id: "1",
    title: "Morning Run",
    duration: "30 min",
    calories: 250,
    type: "cardio",
  },
  {
    id: "2",
    title: "Upper Body Strength",
    duration: "45 min",
    calories: 320,
    type: "strength",
  },
  {
    id: "3",
    title: "Yoga Flow",
    duration: "40 min",
    calories: 180,
    type: "flexibility",
  },
];

const WEEK_PROGRESS = {
  labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  data: [200, 300, 250, 400, 350, 0, 150],
};

export default function WorkoutScreen() {
  const { theme } = useThemeApp();
  const styles = themedStyles(theme.colors);

  return (
    <View style={styles.container}>
      {/* <FitConnectHeader title="Workouts" /> */}

      {/* Weekly Progress Chart */}
      <View style={styles.chartWrapper}>
        <Text style={styles.chartTitle}>Weekly Calories Burned</Text>
        {/* <BarChart
          data={{
            labels: WEEK_PROGRESS.labels,
            datasets: [{ data: WEEK_PROGRESS.data }],
          }}
          width={screenWidth - 32}
          height={220}
          fromZero
          showValuesOnTopOfBars
          chartConfig={{
            backgroundColor: theme.colors.background,
            backgroundGradientFrom: theme.colors.background,
            backgroundGradientTo: theme.colors.background,
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(106,90,224,${opacity})`,
            labelColor: (opacity = 1) => theme.colors.text,
            style: { borderRadius: 16 },
          }}
          style={{ borderRadius: 16 }}
        /> */}
      </View>

      {/* Add Workout Button */}
      <Pressable style={styles.addWorkoutBtn}>
        <Ionicons name="add-outline" size={26} color="#fff" />
        <Text style={styles.addWorkoutText}>Add Workout</Text>
      </Pressable>

      {/* Workout List */}
      <FlatList
        data={MOCK_WORKOUTS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ padding: 16 }}
        renderItem={({ item }) => (
          <View style={styles.workoutCard}>
            <View style={styles.cardLeft}>
              <Ionicons
                name={
                  item.type === "cardio"
                    ? "walk-outline"
                    : item.type === "strength"
                    ? "barbell-outline"
                    : "body-outline"
                }
                size={28}
                color="#6A5AE0"
              />
            </View>
            <View style={styles.cardRight}>
              <Text style={styles.workoutTitle}>{item.title}</Text>
              <Text style={styles.workoutDetails}>
                {item.duration} • {item.calories} cal
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const themedStyles = (c: any) =>
  StyleSheet.create({
    container: { flex: 1, width: "100%", backgroundColor: c.background },
    chartWrapper: {
      margin: 16,
      backgroundColor: c.card,
      borderRadius: 16,
      padding: 12,
      elevation: 3,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
    },
    chartTitle: {
      fontSize: 16,
      fontWeight: "600",
      marginBottom: 8,
      color: c.text,
    },
    addWorkoutBtn: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#6A5AE0",
      marginHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 25,
      marginBottom: 12,
    },
    addWorkoutText: {
      color: "#fff",
      fontSize: 16,
      fontWeight: "600",
      marginLeft: 8,
    },
    workoutCard: {
      flexDirection: "row",
      backgroundColor: c.card,
      borderRadius: 14,
      padding: 12,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: c.border,
      alignItems: "center",
    },
    cardLeft: {
      marginRight: 12,
      width: 40,
      alignItems: "center",
    },
    cardRight: { flex: 1 },
    workoutTitle: { fontSize: 16, fontWeight: "600", color: c.text },
    workoutDetails: { fontSize: 14, color: c.muted, marginTop: 2 },
  });
