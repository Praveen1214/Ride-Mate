import { View, Text, Image, TextInput, TouchableOpacity } from "react-native";
import { router } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import Ionicons from "@expo/vector-icons/Ionicons";
import React, { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import axios from "axios";

const SearchRide = () => {
  const route = useRoute();
  const { pickup, drop, date } = route.params;
  const [offerRides, setOfferRides] = useState([]);

  useEffect(() => {
    const fetchOfferRides = async () => {
      try {
        const response = await axios.get(
          `http://192.168.43.196:5000/api/offerride/getallofferrides/${drop.address}`
        );
        setOfferRides(response.data.searchride || []);
      } catch (error) {
        console.error("Error fetching offer rides:", error);
      }
    };
    fetchOfferRides();
  }, [drop]);

  const handleRideSelection = (contact) => {
    router.push({
      pathname: "/viewride",
      params: { contact: contact }
    });
  };

  return (
    <View className="items-center flex-1 w-full">
      {/* Search bar */}
      <View className="w-[339px] h-11 pl-[21px] pr-[17.25px] bg-[#e0e0e0] rounded-[10px] flex-row justify-between items-center mt-5 ">
        <TextInput
          placeholder="Search Rides"
          placeholderTextColor="#000"
          className="text-xs font-normal text-black"
        />
        <View className="w-[24.36px] h-[22px] bg-transparent">
          <AntDesign name="search1" size={24} color="black" />
        </View>
      </View>

      {/* Offer rides list */}
      {offerRides.map((ride) => (
        <TouchableOpacity
          key={ride.contact}
          onPress={() => handleRideSelection(ride.contact)}
          className="w-[346px] h-[158px] relative bg-[#0c6c41]/5 rounded-[15px] mt-6"
        >
          {/* Ride details */}
          <View className="absolute left-[80px] top-[11.53px]">
            <Text className="absolute left-[165px] top-[24.22px] text-black text-[15px] font-medium">
              LKR {ride.price.toFixed(2)}
            </Text>
          </View>

          {/* Pickup and Drop locations */}
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

          {/* Decorative lines */}
          <View className="absolute left-[58px] mt-12 w-[138px] border border-black/30" />
          <View
            className="top-[80px] w-full border border-black/30"
            style={{ borderStyle: "dotted" }}
          />

          {/* Driver info and arrival time */}
          <View className="absolute left-[18px] top-[92px] flex-row justify-between items-center w-full pr-4">
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
