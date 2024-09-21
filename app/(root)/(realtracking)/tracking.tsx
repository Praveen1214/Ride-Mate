import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, Image, Text, ScrollView, TouchableOpacity } from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker, Polyline } from "react-native-maps";
import axios from "axios";

// Set the Google Maps API Key
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
      movingWithVehicle: false,
    },
    {
      id: 2,
      coordinate: { latitude: 6.93, longitude: 79.855 },
      pickedUp: false,
      movingWithVehicle: false,
    },
    {
      id: 3,
      coordinate: { latitude: 6.932, longitude: 79.85 },
      pickedUp: false,
      movingWithVehicle: false,
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
        setPassengers((prevPassengers) =>
          prevPassengers.map((passenger) => {
            if (
              !passenger.pickedUp &&
              calculateDistance(route[index], passenger.coordinate) < 0.05
            ) {
              // within 50 meters
              return {
                ...passenger,
                pickedUp: true,
                movingWithVehicle: true,
                coordinate: route[index], // Move the passenger with the vehicle
              };
            }

            // If the passenger is moving with the vehicle, update their position
            if (passenger.movingWithVehicle) {
              return {
                ...passenger,
                coordinate: route[index], // Move passenger along with vehicle
              };
            }

            return passenger;
          })
        );

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
    <View style= { styles.container } >
    {/* Map View */ }
    < MapView
  style = { styles.map }
  provider = { PROVIDER_GOOGLE }
  initialRegion = { region }
  showsUserLocation = { true}
  followsUserLocation = { true}
  zoomEnabled = { true}
    >
    {/* Start Marker */ }
    < Marker coordinate = { coordinates.start } title = "Start Location" >
      <Image
            source={ require("../../../assets/images/start_marker.png") }
  style = {{ height: 43, width: 43 }
}
          />
  </Marker>

{/* End Marker */ }
<Marker coordinate={ coordinates.end } title = "End Location" >
  <Image
            source={ require("../../../assets/images/end_marker.png") }
style = {{ height: 43, width: 43 }}
          />
  </Marker>

{/* Vehicle Marker */ }
<Marker coordinate={ vehiclePosition } title = "Vehicle" >
  <Image
            source={ require("../../../assets/images/vehicle.png") }
style = {{ height: 35, width: 35 }}
          />
  </Marker>

{/* Passenger Markers */ }
{
  passengers.map((passenger) => (
    <Marker
            key= { passenger.id }
            coordinate = { passenger.coordinate }
            title = {`Passenger ${passenger.id}`}
          >
  <Image
              source={ require("../../../assets/images/passenger_marker.png") }
style = {{ height: 35, width: 35 }}
            />
  </Marker>
        ))}

{/* Route Polyline */ }
{
  route.length > 0 && (
    <Polyline coordinates={ route } strokeColor = "black" strokeWidth = { 3} />
        )
}
</MapView>

{/* Ride Information at the Bottom */ }
<View style={ styles.infoContainer }>
  <Text style={ styles.rideTitle }> Tracking Activity </Text>
    < View style = { styles.rideDetails } >
      <View style={ styles.segmentHeader }>
        <Text style={ styles.segmentTitle }> Route </Text>
          < TouchableOpacity style = { styles.routeButton } >
            <Text style={ styles.routeButtonText }> Start </Text>
              </TouchableOpacity>
              </View>

              < ScrollView >
              <View style={ styles.rideItem }>
                <Text style={ styles.rideText }> Start trip(10:00 am) </Text>
                  < Text style = { styles.rideSubText } > 453 A ABCD Street, Colombo </Text>
                    </View>

{
  passengers.map((passenger, index) =>
    passenger.pickedUp ? (
      <View style= { styles.rideItem } key = { passenger.id } >
      <Text style={ styles.rideText } >
  Pick up(10: { 10 + index } am)
  </Text>
  < Text style = { styles.rideSubText } >
  Passenger { passenger.id }: 453 A ABCD Street, Colombo
  </Text>
  </View>
  ) : null
            )
}

<View style={ styles.rideItem }>
  <Text style={ styles.rideText }> End trip(11:00 am) </Text>
    < Text style = { styles.rideSubText } > 453 A ABCD Street, Colombo </Text>
      </View>
      </ScrollView>
      </View>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  infoContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: Dimensions.get("window").height * 0.4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  rideTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  rideDetails: {
    backgroundColor: "#f0f0f0",
    borderRadius: 15,
    padding: 15,
  },
  segmentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  segmentTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  routeButton: {
    backgroundColor: "#007BFF",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  routeButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  rideItem: {
    marginBottom: 10,
  },
  rideText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#555",
  },
  rideSubText: {
    fontSize: 14,
    color: "#888",
  },
});

export default CarpoolMap;
