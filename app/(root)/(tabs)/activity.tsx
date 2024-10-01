import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type ActivityStatus = "Ongoing" | "Completed" | "Cancelled";

interface Activity {
  id: string;
  name: string;
  date: string;
  time: string;
  pickup: string;
  drop: string;
  status: ActivityStatus;
  amount: number;
  rating?: number;
  feedback?: string;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingTop: StatusBar.currentHeight,
  },
  header: {
    backgroundColor: "#0C6C41",
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    fontSize: 22,
    color: "white",
    fontWeight: "bold",
  },
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#0C6C41",
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    alignItems: "center",
    borderBottomWidth: 4,
    borderBottomColor: "transparent",
  },
  tabTextActive: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
  tabTextInactive: {
    color: "#ddd",
    fontSize: 16,
  },
  activityCard: {
    backgroundColor: "#f8f8f8",
    padding: 20,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
    elevation: 2,
  },
  activityHeader: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activityContent: {
    marginTop: 5,
    fontSize: 16,
    color: "#666",
  },
  button: {
    padding: 10,
    borderRadius: 5,
  },
  mapViewButton: {
    backgroundColor: "#4CAF50",
    marginTop: 10,
  },
  cancelButton: {
    backgroundColor: "#FF5722",
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    color: "white",
  },
  starStyle: {
    color: "#FFD700",
  },
});

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  return (
    <View style={styles.activityCard}>
      <Text style={styles.activityHeader}>
        {activity.name} - {activity.status}
      </Text>
      <Text style={styles.activityContent}>
        {activity.pickup} to {activity.drop}
      </Text>
      <Text style={styles.activityContent}>
        Date: {activity.date} - Time: {activity.time}
      </Text>
      <Text style={styles.activityContent}>
        Amount: Rs {activity.amount.toFixed(2)}
      </Text>
      {activity.rating && (
        <Text style={styles.activityContent}>
          Rating: {"★".repeat(activity.rating)}
        </Text>
      )}
      {activity.feedback && (
        <Text style={styles.activityContent}>
          Feedback: {activity.feedback}
        </Text>
      )}
      {activity.status === "Ongoing" && (
        <TouchableOpacity style={[styles.button, styles.mapViewButton]}>
          <Text style={styles.buttonText}>Map View</Text>
        </TouchableOpacity>
      )}
      {activity.status === "Ongoing" && (
        <TouchableOpacity style={[styles.button, styles.cancelButton]}>
          <Text style={styles.buttonText}>Cancel Ride</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const RideSharingActivity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActivityStatus>("Ongoing");

  const activities: Activity[] = [
    {
      id: "1",
      name: "Dileepa",
      date: "26 Jul 2024",
      time: "10:30 PM",
      pickup: "Anuradhapura",
      drop: "Colombo",
      status: "Ongoing",
      amount: 1500.0,
      rating: 4,
    },
    {
      id: "2",
      name: "Praveen",
      date: "27 Jul 2024",
      time: "11:00 AM",
      pickup: "Colombo",
      drop: "Kandy",
      status: "Completed",
      amount: 800.0,
      rating: 5,
      feedback: "Very prompt and polite.",
    },
    {
      id: "3",
      name: "Chamara",
      date: "28 Jul 2024",
      time: "02:00 PM",
      pickup: "Galle",
      drop: "Matara",
      status: "Cancelled",
      amount: 0.0,
      feedback: "Cancelled due to weather conditions.",
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Activities</Text>
        <Ionicons name="menu" size={28} color="white" />
      </View>

      <View style={styles.tabContainer}>
        {["Ongoing", "Completed", "Cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => {
              setActiveTab(tab as ActivityStatus);
            }}
            style={[
              styles.tabButton,
              activeTab === tab ? { borderBottomColor: "#ffffff" } : {},
            ]}
          >
            <Text
              style={
                activeTab === tab
                  ? styles.tabTextActive
                  : styles.tabTextInactive
              }
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView>
        {activities
          .filter((activity) => activity.status === activeTab)
          .map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideSharingActivity;
