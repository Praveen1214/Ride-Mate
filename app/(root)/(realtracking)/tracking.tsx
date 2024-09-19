import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image, Alert } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import axios from "axios";

// Set the Google Maps API Keys
const GOOGLE_API_KEY = "AIzaSyDa1olgsfiH0ktBXGGkG2P_PXy1f5bIUdE";

const CarpoolMap = () => {
  const [region, setRegion] = useState({
    latitude: 6.9271,
    longitude: 79.8612,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [coordinates, setCoordinates] = useState({
    start: { latitude: 6.9271, longitude: 79.8612 }, // Start point
    end: { latitude: 6.9344, longitude: 79.8428 }, // End point
  });

  const [route, setRoute] = useState([]);
  const [vehiclePosition, setVehiclePosition] = useState(coordinates.start);

  // Passenger locations (example coordinates)
  const [passengers, setPassengers] = useState([
    {
      id: 1,
      coordinate: { latitude: 6.9291, longitude: 79.8602 },
      pickedUp: false,
    },
    {
      id: 2,
      coordinate: { latitude: 6.93, longitude: 79.855 },
      pickedUp: false,
    },
    {
      id: 3,
      coordinate: { latitude: 6.932, longitude: 79.85 },
      pickedUp: false,
    },
  ]);

  // Fetch directions and decode the polyline for the route
  const getDirections = async () => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${coordinates.start.latitude},${coordinates.start.longitude}&destination=${coordinates.end.latitude},${coordinates.end.longitude}&key=${GOOGLE_API_KEY}`
      );

      const points = decode(response.data.routes[0].overview_polyline.points);
      const routeCoordinates = points.map((point: any) => ({
        latitude: point[0],
        longitude: point[1],
      }));

      setRoute(routeCoordinates);
    } catch (error) {
      console.error("Error fetching directions:", error);
    }
  };

  // Decode polyline points from Google Directions API
  const decode = (t: any, e: number = 5) => {
    let points = [],
      lat = 0,
      lng = 0,
      index = 0,
      shift = 0,
      result = 0,
      byte = null,
      latitude_change,
      longitude_change;

    while (index < t.length) {
      byte = null;
      shift = 0;
      result = 0;

      do {
        byte = t.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      latitude_change = result & 1 ? ~(result >> 1) : result >> 1;
      lat += latitude_change;

      shift = 0;
      result = 0;

      do {
        byte = t.charCodeAt(index++) - 63;
        result |= (byte & 0x1f) << shift;
        shift += 5;
      } while (byte >= 0x20);

      longitude_change = result & 1 ? ~(result >> 1) : result >> 1;
      lng += longitude_change;

      points.push([lat / Math.pow(10, e), lng / Math.pow(10, e)]);
    }

    return points;
  };

  // Function to calculate the distance between two coordinates
  const calculateDistance = (coord1, coord2) => {
    const radlat1 = (Math.PI * coord1.latitude) / 180;
    const radlat2 = (Math.PI * coord2.latitude) / 180;
    const theta = coord1.longitude - coord2.longitude;
    const radtheta = (Math.PI * theta) / 180;
    let dist =
      Math.sin(radlat1) * Math.sin(radlat2) +
      Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    if (dist > 1) dist = 1;
    dist = Math.acos(dist);
    dist = (dist * 180) / Math.PI;
    dist = dist * 60 * 1.1515; // Miles
    dist = dist * 1.609344; // Convert to kilometers
    return dist;
  };

  // Update the vehicle position to simulate real-time tracking
  const moveVehicle = () => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < route.length) {
        setVehiclePosition(route[index]);

        // Check if vehicle is close to any waiting passengers
        passengers.forEach((passenger, i) => {
          if (
            !passenger.pickedUp &&
            calculateDistance(route[index], passenger.coordinate) < 0.05
          ) {
            // within 50 meters
            Alert.alert(`Passenger ${passenger.id} has boarded the vehicle.`);
            passengers[i].pickedUp = true; // Mark as picked up
            setPassengers([...passengers]); // Update state
          }
        });

        index += 1;
      } else {
        clearInterval(interval);
      }
    }, 1000); // Moves the vehicle every second
  };

  useEffect(() => {
    getDirections();
  }, [coordinates]);

  useEffect(() => {
    if (route.length > 0) {
      moveVehicle(); // Start moving the vehicle once the route is available
    }
  }, [route]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true}
        followsUserLocation={true}
        zoomEnabled={true}
      >
        {/* Start Marker */}
        <Marker coordinate={coordinates.start} title="Start Location">
          <Image
            source={require("../../../assets/images/start_marker.png")}
            style={{ height: 43, width: 43 }}
          />
        </Marker>

        {/* End Marker */}
        <Marker coordinate={coordinates.end} title="End Location">
          <Image
            source={require("../../../assets/images/end_marker.png")}
            style={{ height: 43, width: 43 }}
          />
        </Marker>

        {/* Vehicle Marker (starting at the start point, then moving along the route) */}
        <Marker coordinate={vehiclePosition} title="Vehicle">
          <Image
            source={require("../../../assets/images/vehicle.png")}
            style={{ height: 35, width: 35 }}
          />
        </Marker>

        {/* Passenger Markers */}
        {passengers.map((passenger) =>
          !passenger.pickedUp ? (
            <Marker
              key={passenger.id}
              coordinate={passenger.coordinate}
              title={`Passenger ${passenger.id}`}
            >
              <Image
                source={require("../../../assets/images/passenger_marker.png")}
                style={{ height: 35, width: 35 }}
              />
            </Marker>
          ) : null
        )}

        {/* Route Polyline */}
        {route.length > 0 && (
          <Polyline coordinates={route} strokeColor="black" strokeWidth={3} />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height * 0.8,
  },
});

export default CarpoolMap;
