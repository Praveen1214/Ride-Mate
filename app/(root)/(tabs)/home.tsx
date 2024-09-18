import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PRIMARY_COLOR = "#0C6C41";

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState("find");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Map View */}
      <View className="flex-1 bg-gray-200">
        <Text className="text-center pt-4">Map Placeholder</Text>
      </View>

      {/* Header */}
      <View className="absolute top-12 left-0 right-0 bg-white px-4 py-2 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-black rounded-full items-center justify-center">
            <Text className="text-white text-lg font-bold">JD</Text>
          </View>
          <View className="flex-col gap-0 ml-3">
            <Text className="text-lg font-semibold">Welcome Abhishek</Text>
            <Text className="text-sm text-gray-600">Malabe</Text>
          </View>
        </View>
        <View className="w-6 h-6 items-center justify-center">
          <Text className="text-[#0C6C41] text-xl"></Text>
        </View>
      </View>

      {/* Ride Form */}
      <View className="absolute bottom-16 left-4 right-4 bg-white rounded-lg shadow-lg mb-10">
        <View className="flex-row mb-4">
          <TouchableOpacity
            className={`flex-1 py-3 flex-row justify-center items-center ${activeTab === "find" ? "bg-[#0C6C41]" : "bg-gray-200"} rounded-l-md`}
            onPress={() => setActiveTab("find")}
          >
            <Ionicons
              name={
                activeTab === "find" ? "location-outline" : "location-outline"
              } // Use outline icon
              size={18}
              color={activeTab === "find" ? "white" : "gray"}
              style={{ marginRight: 8 }}
            />
            <Text
              className={`text-center ${activeTab === "find" ? "text-white" : "text-gray-700"} text-[15px] font-regular`}
            >
              Find ride
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 flex-row justify-center items-center ${activeTab === "offer" ? "bg-[#0C6C41]" : "bg-gray-200"} rounded-r-md`}
            onPress={() => setActiveTab("offer")}
          >
            <Ionicons
              name={activeTab === "offer" ? "location" : "location"} // Use filled icon
              size={18}
              color={activeTab === "offer" ? "white" : "gray"}
              style={{ marginRight: 8 }}
            />
            <Text
              className={`text-center ${activeTab === "offer" ? "text-white" : "text-gray-700"} text-[15px] font-regular`}
            >
              Offer ride
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View className="flex-row mb-3 items-center gap-3 pl-5 border-b border-gray-100">
            <Text className="text-xs text-gray-700 w-20">PICKUP</Text>
            <TextInput
              value="Location fetched"
              className=" font-semibold flex-1 py-2 px-3 rounded"
            />
          </View>

          <View className="flex-row mb-3 items-center gap-3 pl-5 ">
            <Text className="text-xs text-gray-700 mb-1 w-20">DROP</Text>
            <TextInput
              placeholder="Where are you Drop?"
              placeholderTextColor="gray" // Add this to show the placeholder text clearly
              className="text-gray-700 flex-1 py-2 px-3 rounded"
            />
          </View>

          {/* <View className="flex-row mb-3 items-center gap-3 pl-5">
            <Text className="text-xs text-gray-700 mb-1 w-20">
              DATE AND TIME
            </Text>
            <TextInput
              placeholder="Select date and time"
              placeholderTextColor="gray" // Add this to show the placeholder text clearly
              className="text-gray-700 flex-1 py-2 px-3 rounded"
            />
          </View> */}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
