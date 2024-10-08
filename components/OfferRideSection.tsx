import React from "react";
import { View, Text, TouchableOpacity, ScrollView, TextInput, Platform } from "react-native";
import { useLocationStore } from "@/store";
import { router } from "expo-router";

interface OfferRideSectionProps {
  userRole: "Passenger" | "Driver";
}

const OfferRideSection = ({ userRole }: OfferRideSectionProps) => {
  const { userAddress, setDestinationLocation } = useLocationStore();

  const handleNavigateToDrop = (location: { latitude: number; longitude: number; address: string; }) => {
    setDestinationLocation(location);
    router.push({
      pathname: "/(root)/offer-ride",
      params: {
        userAddress: userAddress
      }
    });
  };

  const dividerStyle = Platform.select({
    ios: "absolute h-[1px] bg-gray-300 top-[40px] left-16 right-12",
    android: "absolute h-[1px] bg-gray-300 top-[43px] left-16 right-12"
  });

  // If the user is a passenger, prompt them to register as a driver
  if (userRole === "Passenger") {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-lg font-bold">Become a Driver!</Text>
        <Text className="mb-4 text-gray-600">Only drivers can offer rides. Register as a driver to offer your ride.</Text>
        <TouchableOpacity
          onPress={() => router.push("/(auth)/driverRegister")} // Navigate to register driver screen
          className="px-4 py-2 bg-green-500 rounded"
        >
          <Text className="text-white">Register Now</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // If the user is a registered driver, show the ride offer form
  if (userRole === "Driver") {
    return (
      <ScrollView className="px-2">
        <View className="flex-row items-center justify-start">
          <Text className="w-20 ml-3 text-sm font-bold text-blue-500">
            START
          </Text>
          <TouchableOpacity onPress={handleNavigateToDrop} className="flex-1">
            <TextInput
              placeholder={userAddress}
              placeholderTextColor="gray"
              className="flex-1 px-3 ml-0 text-sm font-bold text-gray-700 rounded"
            />
          </TouchableOpacity>
        </View>

        <View className={dividerStyle} />
        <View className="h-10 mr-4 items-left ml-7">
          <View className="w-2 h-2 bg-gray-400 rounded-full" />
          <View className="w-0.5 flex-1 bg-gray-300 my-1 mx-0.5" />
          <View className="w-2 h-2 bg-gray-400 rounded-full" />
        </View>

        <View className="flex-row items-center pl-5 mb-3">
          <Text className="w-20 text-sm font-bold text-orange-500">END</Text>

          <TouchableOpacity onPress={handleNavigateToDrop} className="flex-1">
            <Text className="flex-1 px-3 mb-0 ml-0 text-sm font-bold text-gray-700 rounded">
              Where are you going?
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }

  return null;
};

export default OfferRideSection;
