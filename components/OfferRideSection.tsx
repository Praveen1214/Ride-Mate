// OfferRideSection.js
import React from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useLocationStore } from "@/store";

const OfferRideSection = () => {
  const { userAddress, setDestinationLocation } = useLocationStore();

  const handleNavigateToDrop = (location) => {
    setDestinationLocation(location);
    router.push({
      pathname: "/(root)/offer-ride"
    });
  };

  const dividerStyle = Platform.select({
    ios: "absolute h-[1px] bg-gray-300 top-[40px] left-16 right-12",
    android: "absolute h-[1px] bg-gray-300 top-[43px] left-16 right-12"
  });

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
};

export default OfferRideSection;