import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { Link, router, Slot } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const SearchRide = () => {
  const route = useRoute();

  // Destructure pickup, drop, and date from route.params
  const { pickup, drop, date } = route.params;
  const [offerRides, setOfferRides] = useState([]);

  useEffect(() => {
    // Fetch offer rides from your API
    const fetchOfferRides = async () => {
      try {
        const response = await axios.get(
          `http://192.168.43.196:5000/api/offerride/getallofferrides/${drop.address}`
        );
        setOfferRides(response.data.searchride);
        console.log(response.data.searchride);
      } catch (error) {
        console.error("Error fetching offer rides:", error);
      }
    };
    fetchOfferRides();
  }, []);

  return (
    <View className="items-center flex-1 w-full">
      <View className="w-[339px] h-11 pl-[21px] pr-[17.25px] bg-[#e0e0e0] rounded-[10px] flex-row justify-between items-center mt-5 ">
        {/* Placeholder Text */}
        <TextInput
          placeholder="Search Rides"
          placeholderTextColor="#000"
          className="text-xs font-normal text-black"
        />
        <View className="w-[24.36px] h-[22px] bg-transparent">
          <AntDesign name="search1" size={24} color="black" />
        </View>
      </View>

      {/* Map over the fetched offer rides */}
      {offerRides.map((ride, index) => (
        <TouchableOpacity
          key={ride._id}
          onPress={() => router.navigate("/viewride", { rideId: ride._id })}
          className="w-[346px] h-[158px] relative bg-[#0c6c41]/5 rounded-[15px] mt-6"
        >
          <View className="absolute left-[80px] top-[11.53px]">
            <Text className="absolute left-[165px] top-[24.22px] text-black text-[15px] font-medium">
              LKR {ride.price.toFixed(2)}
            </Text>
          </View>

          {/* Labels for Pickup and Drop */}
          <View className="mt-2 ml-4">
            <View className="flex-row items-center mb-2">
              <View className="p-2 mr-3 bg-orange-100 rounded-full">
                <Ionicons name="location-sharp" size={16} color="#FFA500" />
              </View>
              <Text className="text-sm font-medium text-gray-800">
                {ride.start.address}
              </Text>
            </View>
            <View className="w-0.5 h-4 bg-[#0C6C41] ml-4" />
            <View className="flex-row items-center">
              <View className="p-2 mr-3 bg-blue-100 rounded-full">
                <Ionicons name="location-sharp" size={16} color="#08019C" />
              </View>
              <Text className="text-sm font-medium text-gray-800">
                {ride.end.address}
              </Text>
            </View>
          </View>

          {/* Line between Pickup and Drop */}
          <View className="absolute left-[58px] mt-12 w-[138px] border border-black/30" />

          <View
            className="top-[80px] w-full border border-black/30"
            style={{ borderStyle: "dotted" }}
          />

          {/* Driver Info and Arrival Time */}
          <View className="absolute left-[18px] top-[92px] flex-row justify-between items-center w-full pr-4">
            {/* Driver and Rating */}
            <View className="flex-row items-center mt-3">
              <View className="items-center justify-center bg-gray-200 rounded-full w-9 h-9">
                <Image
                  source={{ uri: "https://placekitten.com/0" }}
                  className="w-full h-full bg-gray-400 rounded-full"
                />
              </View>
              <View className="ml-4">
                <Text className="text-black text-[13px] font-medium">
                  {ride.driver}
                </Text>
                <Text className="text-black text-[10px] font-normal ">
                  {new Date(ride.datetime).toLocaleTimeString()} | 4.8 ★
                </Text>
              </View>
            </View>

            {/* Time and Car Info */}
            <View className="flex items-center px-10 mt-2">
              <Text className="text-black text-[10px] font-semibold">
                In 10 mins
              </Text>
              <View className="flex-col items-center">
                <Ionicons name="car-sport-outline" size={24} color="black" />
                <Text className="text-[#474747] text-[10px] font-normal ">
                  {ride.vehicletype}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SearchRide;
