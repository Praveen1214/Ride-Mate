import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Avatar } from "react-native-elements";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import Review from "./Review";
import axios from "axios";
import { useRoute } from "@react-navigation/native";

const ViewRide = () => {
  const [rideDetails, setRideDetails] = useState(null);
  const route = useRoute();
  const { contact } = route.params || {};

  useEffect(() => {
    console.log("Fetching ride details for contact:", contact);
    const fetchRideDetails = async () => {
      if (!contact) {
        console.error("No contact provided");
        return;
      }
      try {
        const response = await axios.post(
          `http://192.168.43.196:5000/api/offerride/getallofferrides/${contact}`
        );
        if (response.data.ride && response.data.ride.length > 0) {
          setRideDetails(response.data.ride[0]);
          console.log("Fetched ride details:", response.data.ride[0]);
        } else {
          console.log("No ride details found");
        }
      } catch (error) {
        console.error("Error fetching ride details:", error);
      }
    };
    fetchRideDetails();
  }, [contact]);

  if (!rideDetails) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Rider Info Section */}
      <View className="flex-row items-center p-4 mb-2 bg-white">
        <Avatar
          rounded
          title={rideDetails.driver.charAt(0)}
          size="medium"
          containerStyle={{ backgroundColor: "black" }}
        />
        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold"> {rideDetails.driver} </Text>
          <View className="flex-row items-center mt-1">
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text className="ml-1 text-sm text-gray-600">
              {" "}
              4.8 • 10 reviews{" "}
            </Text>
          </View>
          <Text className="mt-1 text-sm text-gray-500">
            {" "}
            Contact: {rideDetails.contact}{" "}
          </Text>
        </View>
        <Text className="text-xl font-bold">
          {" "}
          LKR {rideDetails.price.toFixed(2)}{" "}
        </Text>
      </View>

      {/* Ride Details Section */}
      <View className="p-4 mx-2 mb-2 bg-white rounded-lg">
        <Text className="mb-4 text-lg font-bold"> Ride Details </Text>
        <View className="flex-row items-center">
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <View className="p-2 mr-3 bg-orange-100 rounded-full">
                <Ionicons name="location-sharp" size={16} color="#FFA500" />
              </View>
              <View>
                <Text className="text-sm font-medium text-gray-800">
                  {" "}
                  {rideDetails.start.address}{" "}
                </Text>
              </View>
            </View>
            <View className="w-0.5 h-4 bg-[#0C6C41] ml-4" />
            <View className="flex-row items-center">
              <View className="p-2 mr-3 bg-blue-100 rounded-full">
                <Ionicons name="location-sharp" size={16} color="#08019C" />
              </View>
              <View>
                <Text className="text-sm font-medium text-gray-800">
                  {" "}
                  {rideDetails.end.address}{" "}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity className="px-2 py-1">
            <Text className="mb-6 ml-32 font-bold text-green-600">
              {" "}
              Map view{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-0.5 bg-gray-200 my-4" />

        <View className="flex-row justify-between">
          <RideInfoItem
            title="Start time"
            value={new Date(rideDetails.datetime).toLocaleString()}
          />
          <RideInfoItem
            title="Luggage cap."
            value={rideDetails.luggagecapacity}
          />
          <RideInfoItem title="Vehicle" value={rideDetails.vehicletype} />
        </View>
      </View>

      {/* Vehicle Info */}
      <View className="p-4 mx-2 mb-2 bg-green-600 rounded-lg">
        <View className="absolute flex-row items-center px-2 py-1 bg-white rounded right-2 top-2">
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text className="ml-1 font-bold"> 4.8 </Text>
        </View>
        <Text className="mb-2 text-2xl font-bold text-white">
          {" "}
          {rideDetails.vehicletype}{" "}
        </Text>
        <Text className="mb-1 text-base text-white"> Facilities: </Text>
        <Text className="text-sm text-white"> {rideDetails.facilities} </Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between mx-2 mt-4 mb-4">
        <TouchableOpacity className="flex-1 px-6 py-3 mr-2 bg-green-500 rounded">
          <Text className="font-bold text-center text-white">
            {" "}
            Request ride{" "}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="flex-1 px-6 py-3 ml-2 bg-gray-400 rounded">
          <Text className="font-bold text-center text-white"> Message </Text>
        </TouchableOpacity>
      </View>

      {/* Reviews */}
      <View className="mt-4">
        <Review />
      </View>
    </ScrollView>
  );
};

const RideInfoItem = ({ title, value }) => (
  <View className="items-center">
    <Text className="mb-1 text-sm text-gray-500"> {title} </Text>
    <Text className="text-sm font-bold"> {value} </Text>
  </View>
);

export default ViewRide;
