import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import { View, Text, TouchableOpacity, FlatList, Switch, RefreshControl, StyleSheet } from "react-native";
import {
  ChevronLeftIcon,
  MapPinIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  StarIcon,
  AdjustmentsVerticalIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const baseColor = "#0C6C41";

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
  // ... (previous mock data)
];

const Requests: React.FC = () => {
  const navigation = useNavigation();
  const [showLongDistanceOnly, setShowLongDistanceOnly] = useState(false);
  const [offerRides, setOfferRides] = useState([]);
  const [contact, setContact] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [sortOrder, setSortOrder] = useState("default");

  useEffect(() => {
    fetchPassengerDetails();
  }, []);

  const fetchPassengerDetails = async () => {
    try {
      const passengerDetailsString = await AsyncStorage.getItem("passengerDetails");
      if (passengerDetailsString) {
        const passengerDetails = JSON.parse(passengerDetailsString);
        if (passengerDetails.contact) {
          setContact(passengerDetails.contact);
          fetchOfferRides(passengerDetails.contact);
        }
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  const fetchOfferRides = async (contactNumber) => {
    try {
      const response = await axios.post(
        `http://192.168.8.174:5000/api/offerride/getallofferrides/${contactNumber}`
      );
      setOfferRides(response.data.ride);
    } catch (error) {
      console.error("Error fetching offer rides:", error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPassengerDetails().then(() => setRefreshing(false));
  }, []);

  const filteredRequests = showLongDistanceOnly
    ? rideRequests.filter((request) => parseFloat(request.distance) > 20)
    : rideRequests;

  const sortedRequests = [...filteredRequests].sort((a, b) => {
    if (sortOrder === "earnings") {
      return parseFloat(b.estimatedEarnings.slice(1)) - parseFloat(a.estimatedEarnings.slice(1));
    } else if (sortOrder === "distance") {
      return parseFloat(b.distance) - parseFloat(a.distance);
    }
    return 0;
  });

  const renderRideRequest = ({ item }: { item: RideRequest }) => (
    <TouchableOpacity style={styles.rideRequestCard}>
      <View style={styles.cardHeader}>
        <Text style={styles.earnings}>{item.estimatedEarnings}</Text>
        <View style={styles.ratingContainer}>
          <StarIcon size={18} color="#FFD700" />
          <Text style={styles.rating}>{item.passengerRating.toFixed(1)}</Text>
        </View>
      </View>

      <View style={styles.locationContainer}>
        <View style={styles.locationItem}>
          <Text style={styles.locationLabel}>Pickup Location</Text>
          <View style={styles.locationInfo}>
            <MapPinIcon size={22} color={baseColor} />
            <Text style={styles.locationText}>{item.pickup}</Text>
          </View>
        </View>
        <View style={styles.locationItem}>
          <Text style={styles.locationLabel}>Drop-off Location</Text>
          <View style={styles.locationInfo}>
            <MapPinIcon size={22} color="#FF6B6B" />
            <Text style={styles.locationText}>{item.drop}</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <View style={styles.tripInfo}>
          <Text style={styles.tripInfoText}>{item.distance}</Text>
          <Text style={styles.tripInfoText}>{item.duration}</Text>
        </View>
        <View style={styles.actionButtons}>
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

  const renderCurrentRide = ({ item }) => (
    <View style={styles.currentRideCard}>
      <Text style={styles.currentRideTitle}>Your Current Ride</Text>

      <View style={styles.routeContainer}>
        <View style={styles.routePoint}>
          <MapPinIcon size={24} color={baseColor} />
          <Text style={styles.routeText}>{item.start.address}</Text>
        </View>
        <View style={styles.routeIndicator} />
        <View style={styles.routePoint}>
          <MapPinIcon size={24} color="#FF6B6B" />
          <Text style={styles.routeText}>{item.end.address}</Text>
        </View>
      </View>

      <View style={styles.rideInfo}>
        <Text style={styles.rideInfoText}>Driver: Abhishek Peiris</Text>
        <Text style={styles.rideInfoText}>Estimated Time: 15 mins</Text>
      </View>

      <TouchableOpacity
        style={styles.mapButton}
        onPress={() =>
          navigation.navigate('real_tracking', {
            startAddress: item.start.address,
            endAddress: item.end.address,
            startLatitude: item.start.latitude,
            startLongitude: item.start.longitude,
            endLatitude: item.end.latitude,
            endLongitude: item.end.longitude,
            driverName: "Abhishek Peiris",
          })
        }
      >
        <Ionicons name="map" size={24} color="white" style={styles.mapIcon} />
        <Text style={styles.mapButtonText}>VIEW ON MAP</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={24} color={baseColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Available Rides</Text>
        <TouchableOpacity onPress={() => {
          // Toggle between sorting options
          setSortOrder(sortOrder === "default" ? "earnings" : sortOrder === "earnings" ? "distance" : "default");
        }}>
          <AdjustmentsVerticalIcon size={24} color={baseColor} />
        </TouchableOpacity>
      </View>

      <FlatList
        data={offerRides}
        renderItem={renderCurrentRide}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            No offer rides available at the moment.
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <View style={styles.filterContainer}>
        <Text style={styles.filterText}>Long distance only</Text>
        <Switch
          value={showLongDistanceOnly}
          onValueChange={setShowLongDistanceOnly}
          trackColor={{ false: "#767577", true: "#81b0ff" }}
          thumbColor={showLongDistanceOnly ? baseColor : "#f4f3f4"}
        />
      </View>

      <FlatList
        data={sortedRequests}
        renderItem={renderRideRequest}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <Text style={styles.emptyListText}>
            No ride requests available at the moment.
          </Text>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 16,
  },
  emptyListText: {
    textAlign: 'center',
    color: '#888',
    marginTop: 24,
  },
  filterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  filterText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  rideRequestCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  earnings: {
    fontSize: 24,
    fontWeight: 'bold',
    color: baseColor,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFD700',
  },
  locationContainer: {
    marginBottom: 16,
  },
  locationItem: {
    marginBottom: 12,
  },
  locationLabel: {
    fontSize: 12,
    textTransform: 'uppercase',
    color: '#888',
    marginBottom: 4,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tripInfo: {
    flexDirection: 'row',
  },
  tripInfoText: {
    marginRight: 16,
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    marginLeft: 12,
  },
  currentRideCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  currentRideTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  routeContainer: {
    marginBottom: 16,
  },
  routePoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  routeIndicator: {
    width: 2,
    height: 24,
    backgroundColor: '#ccc',
    marginLeft: 11,
    marginVertical: 4,
  },
  routeText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  rideInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  rideInfoText: {
    fontSize: 14,
    color: '#666',
  },
  mapButton: {
    backgroundColor: baseColor,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
  },
  mapIcon: {
    marginRight: 8,
  },
  mapButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Requests;