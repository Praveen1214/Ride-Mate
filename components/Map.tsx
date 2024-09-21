import { calculateRegion } from "@/lib/map";
import { useLocationStore } from "@/store";
import { Text, View } from "react-native";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";

const Map = () => {
  const {
    userLongitude,
    userLatitude,
    destinationLatitude,
    destinationLongitude,
  } = useLocationStore();

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
      titntColor="#0C6C41"
      mapType="mutedstandard"
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      showsMyLocationButton={true}
      userInterfaceStyle="light"
    >
      <Text>Map Placeholder</Text>
    </MapView>
  );
};

export default Map;
