import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps"; // Correct import
import MapViewDirections from "react-native-maps-directions";

import { icons } from "@/constants"; // Ensure icons are imported correctly
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { useDriverStore, useLocationStore } from "@/store";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();
  const { selectedDriver } = useDriverStore(); // No need to setDrivers unless it's used elsewhere
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const directionsAPI = process.env.EXPO_PUBLIC_DIRECTIONS_API_KEY;

  // Drivers array (flattened, no need for an array of arrays)
  const drivers = [
   
  ];

  useEffect(() => {
    if (!userLatitude || !userLongitude) return; // Only proceed if coordinates are available

    const newMarkers = generateMarkersFromData({
      data: drivers,
      userLatitude,
      userLongitude,
    });

    setMarkers(newMarkers); // Set the generated markers
  }, [userLatitude, userLongitude]); // Depend on coordinates, not the drivers array

  // Region calculation
  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      className="w-full h-full rounded-2xl"
      tintColor="black"
      mapType="mutedStandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          image={
            selectedDriver === +marker.id ? icons.selectedMarker : icons.marker
          }
        />
      ))}

      {destinationLatitude && destinationLongitude && (
        <Marker
          key="destination"
          coordinate={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          title="Destination"
          image={icons.pin || null} // Fallback if icons.pin is undefined
          pinColor="red" // Fallback if the image is not valid
        />
      )}

      {destinationLatitude && destinationLongitude && (
        <MapViewDirections
          origin={{
            latitude: userLatitude!,
            longitude: userLongitude!,
          }}
          destination={{
            latitude: destinationLatitude,
            longitude: destinationLongitude,
          }}
          apikey={directionsAPI!}
          strokeColor="#0286FF"
          strokeWidth={2}
        />
      )}
    </MapView>
  );
};

export default Map;
