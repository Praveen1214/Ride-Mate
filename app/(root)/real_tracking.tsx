import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon, PhoneIcon } from 'react-native-heroicons/outline';
import * as Location from 'expo-location';
import { useNavigation, useRoute } from '@react-navigation/native';

const baseColor = "#0C6C41";

interface DriverLocation {
    latitude: number;
    longitude: number;
}

interface RideDetails {
    startAddress: string;
    endAddress: string;
    startLatitude: number;
    startLongitude: number;
    endLatitude: number;
    endLongitude: number;
    driverName: string;
}

const RealTimeTracking: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { startAddress, endAddress, startLatitude, startLongitude, endLatitude, endLongitude, driverName } = route.params as RideDetails;

    const [driverLocation, setDriverLocation] = useState<DriverLocation | null>(null);
    const [eta, setEta] = useState<string>("Calculating...");

    useEffect(() => {
        let locationSubscription: Location.LocationSubscription;

        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                console.error('Permission to access location was denied');
                return;
            }

            // Start tracking the driver's location
            locationSubscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 5000,
                    distanceInterval: 10,
                },
                (location) => {
                    setDriverLocation({
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    });

                    // Here you would typically send this location to your backend
                    // updateDriverLocationOnServer(location.coords);
                }
            );

            // Simulate ETA updates
            const etaInterval = setInterval(() => {
                const minutes = Math.floor(Math.random() * 20) + 5;
                setEta(`${minutes} min`);
            }, 30000);

            return () => {
                if (locationSubscription) {
                    locationSubscription.remove();
                }
                clearInterval(etaInterval);
            };
        })();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={24} color={baseColor} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Track Your Ride</Text>
        <TouchableOpacity>
          <PhoneIcon size={24} color={baseColor} />
        </TouchableOpacity>
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: startLatitude,
          longitude: startLongitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {driverLocation && (
          <Marker
            coordinate={driverLocation}
            title="Driver"
            description="Current driver location"
          />
        )}
        <Marker
          coordinate={{ latitude: startLatitude, longitude: startLongitude }}
          title="Start"
          description={startAddress}
          pinColor={baseColor}
        />
        <Marker
          coordinate={{ latitude: endLatitude, longitude: endLongitude }}
          title="Destination"
          description={endAddress}
          pinColor="red"
        />
        {driverLocation && (
          <Polyline
            coordinates={[
              driverLocation,
              { latitude: endLatitude, longitude: endLongitude }
            ]}
            strokeColor={baseColor}
            strokeWidth={3}
          />
        )}
      </MapView>

      <View style={styles.infoCard}>
        <View style={styles.driverInfo}>
          <View style={styles.driverAvatar}>
            <Text style={styles.driverInitial}>{driverName[0]}</Text>
          </View>
          <View>
            <Text style={styles.driverName}>{driverName}</Text>
            <Text style={styles.vehicleInfo}>Toyota Camry • ABC 123</Text>
          </View>
        </View>
        <View style={styles.etaContainer}>
          <Text style={styles.etaLabel}>Estimated arrival</Text>
          <Text style={styles.etaTime}>{eta}</Text>
        </View>
        <View style={styles.addressContainer}>
          <Text style={styles.addressLabel}>Pickup</Text>
          <Text style={styles.addressText}>{startAddress}</Text>
          <Text style={styles.addressLabel}>Drop-off</Text>
          <Text style={styles.addressText}>{endAddress}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7"
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0"
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333333",
    letterSpacing: 0.15
  },
  map: {
    flex: 1
  },
  infoCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5
  },
  driverInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: baseColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15
  },
  driverInitial: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold"
  },
  driverName: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333"
  },
  vehicleInfo: {
    fontSize: 14,
    color: "#6B7280"
  },
  etaContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20
  },
  etaLabel: {
    fontSize: 16,
    color: "#6B7280"
  },
  etaTime: {
    fontSize: 18,
    fontWeight: "600",
    color: baseColor
  },
  addressContainer: {
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    paddingTop: 20
  },
  addressLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 5
  },
  addressText: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 15
  }
});

export default RealTimeTracking;
