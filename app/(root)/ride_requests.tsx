import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Switch,
  StyleSheet,
} from "react-native";
import {
  ChevronLeftIcon,
  MapPinIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapIcon,
  StarIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

interface RideRequest {
  id: string;
  pickup: string;
  drop: string;
  riderName: string;
  estimatedEarnings: string;
  distance: string;
  duration: string;
  passengerRating: number;
}

const rideRequests: RideRequest[] = [
  {
    id: "1",
    pickup: "Anuradhapura",
    drop: "Maradana",
    riderName: "Ahmed Ali",
    estimatedEarnings: "$25.00",
    distance: "15.5 km",
    duration: "25 min",
    passengerRating: 4.7,
  },
  {
    id: "2",
    pickup: "Anuradhapura",
    drop: "Colombo",
    riderName: "Samantha Perera",
    estimatedEarnings: "$35.00",
    distance: "22 km",
    duration: "40 min",
    passengerRating: 4.9,
  },
];

const baseColor = "#0C6C41";
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
    letterSpacing: 0.15,
  },
  currentRouteCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentRouteTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333333",
    marginBottom: 12,
    letterSpacing: 0.1,
  },
  routeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#4A4A4A",
  },
  rideRequestCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  earningsText: {
    fontSize: 21,
    fontWeight: "700",
    color: baseColor,
    letterSpacing: 0.25,
  },
  ratingText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#F59E0B",
    marginLeft: 4,
  },
  locationLabel: {
    fontSize: 10,
    fontWeight: "500",
    color: "#6B7280",
    marginBottom: 4,
    letterSpacing: 0.4,
    textTransform: "uppercase",
  },
  locationText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#333333",
    marginLeft: 8,
    letterSpacing: 0.15,
  },
  infoText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    letterSpacing: 0.1,
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#F0F0F0",
  },
  switchLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#4A4A4A",
    letterSpacing: 0.1,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#6B7280",
    textAlign: "center",
    marginTop: 24,
    letterSpacing: 0.15,
  },
});

const Requests: React.FC = () => {
  const [showLongDistanceOnly, setShowLongDistanceOnly] = useState(false);

  const filteredRequests = showLongDistanceOnly
    ? rideRequests.filter((request) => parseFloat(request.distance) > 20)
    : rideRequests;

  const renderRideRequest = ({ item }: { item: RideRequest }) => (
    <TouchableOpacity style={[styles.rideRequestCard, styles.shadow]}>
      {/* Earnings and Rating Section */}
      <View className="flex-row justify-between items-center mb-4">
        <Text style={[styles.earningsText, styles.highlightText]}>
          {item.estimatedEarnings}
        </Text>
        <View className="flex-row items-center">
          <StarIcon size={18} color="#FFD700" />
          <Text style={styles.ratingText}>
            {item.passengerRating.toFixed(1)}
          </Text>
        </View>
      </View>

      {/* Pickup and Drop-off Section */}
      <View className="mb-2">
        <View className="mb-3">
          <Text style={styles.locationLabel}>Pickup Location</Text>
          <View className="flex-row items-center">
            <MapPinIcon size={22} color={baseColor} />
            <Text style={styles.locationText}>{item.pickup}</Text>
          </View>
        </View>
        <View>
          <Text style={styles.locationLabel}>Drop-off Location</Text>
          <View className="flex-row items-center">
            <MapPinIcon size={22} color="#FF6B6B" />
            <Text style={styles.locationText}>{item.drop}</Text>
          </View>
        </View>
      </View>

      {/* Distance and Duration Section */}
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Text style={styles.infoText}>{item.distance}</Text>
          <Text style={[styles.infoText, { marginLeft: 12 }]}>
            {item.duration}
          </Text>
        </View>

        {/* Action Buttons (Call and Chat) */}
        <View className="flex-row space-x-4">
          <TouchableOpacity style={styles.actionButton}>
            <PhoneIcon size={22} color={baseColor} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <ChatBubbleLeftIcon size={22} color={baseColor} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <ChevronLeftIcon size={24} color={baseColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Rides</Text>
        <TouchableOpacity>
          <AdjustmentsVerticalIcon size={24} color={baseColor} />
        </TouchableOpacity>
      </View>

      <View style={styles.currentRouteCard}>
        <Text style={styles.currentRouteTitle}>Current Route</Text>
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center space-x-2">
            <MapPinIcon size={22} color={baseColor} />
            <Text style={styles.routeText}>Anuradhapura</Text>
          </View>
          <View className="h-1 w-12 bg-gray-300 mx-2" />
          <View className="flex-row items-center space-x-2">
            <MapPinIcon size={22} color="#FF6B6B" />
            <Text style={styles.routeText}>Colombo</Text>
          </View>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#E8F5E9",
            padding: 16,
            borderRadius: 8,
            marginTop: 16,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Ionicons
            name="map"
            size={24}
            color={baseColor}
            style={{ marginRight: 8 }}
          />
          <Text style={{ color: baseColor, fontWeight: "bold" }}>
            VIEW LOCATION ON MAP
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between items-center px-4 mb-4">
        <Text style={styles.switchLabel}>Long distance only</Text>
        <Switch
          value={showLongDistanceOnly}
          onValueChange={setShowLongDistanceOnly}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={showLongDistanceOnly ? baseColor : "#f4f3f4"}
        />
      </View>

      <FlatList
        data={filteredRequests}
        renderItem={renderRideRequest}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
        ListEmptyComponent={
          <Text style={styles.emptyStateText}>
            No ride requests available at the moment.
          </Text>
        }
      />
    </SafeAreaView>
  );
};

export default Requests;
