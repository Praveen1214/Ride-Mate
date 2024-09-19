import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Button, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useRouter } from "expo-router";

const HomeScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("find");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Full-page Map */}
      <View className="absolute top-0 bottom-0 left-0 right-0 bg-gray-200">
        {/* Replace this View with actual MapView component */}
        <Text className="pt-4 text-center">Map Placeholder</Text>
      </View>

      {/* Header */}
      <View className="px-4 pt-2 pb-4 bg-white">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <Avatar.Text size={40} label="JD" className="bg-black" />
            <View className="ml-3">
              <Text className="text-lg font-semibold">Welcome Abhishek</Text>
              <Text className="text-gray-600">Malabe</Text>
            </View>
          </View>
          <Icon name="notifications-none" size={24} color="#00A86B" />
        </View>
      </View>

      {/* Ride Component */}
      <View
        className="absolute bottom-0 left-0 right-0 p-4 m-5 mb-20 bg-white shadow-lg rounded-t-3xl"
        style={{ paddingBottom: Platform.OS === "ios" ? 20 : 0 }}
      >
        <TouchableOpacity onPress={() => router.push("/tracking")}>
          <Text>test-real-tracking</Text>
        </TouchableOpacity>
        {/* Find and Offer Ride Tabs */}
        <View className="flex-row mb-6">
          <Button
            icon="map-marker"
            mode={activeTab === "find" ? "contained" : "outlined"}
            onPress={() => setActiveTab("find")}
            className={`rounded-l-full flex-1 ${activeTab === "find" ? "bg-green-600" : "border-green-600"}`}
            labelStyle={{ color: activeTab === "find" ? "white" : "green" }}
          >
            Find ride
          </Button>
          <Button
            icon="car"
            mode={activeTab === "offer" ? "contained" : "outlined"}
            onPress={() => setActiveTab("offer")}
            className={`rounded-r-full flex-1 ${activeTab === "offer" ? "bg-green-600" : "border-green-600"}`}
            labelStyle={{ color: activeTab === "offer" ? "white" : "green" }}
          >
            Offer ride
          </Button>
        </View>

        {/* Form Inputs */}
        <View>
          {/* Pickup */}
          <View className="flex-row items-center mb-4">
            <Icon name="location-on" size={20} color="#00A86B" />
            <View className="flex-1 ml-2">
              <Text className="text-xs font-semibold text-gray-500">
                PICKUP
              </Text>
              <TextInput
                className="py-2 border-b border-gray-300"
                value="Location fetched"
                editable={false}
              />
            </View>
          </View>

          {/* Drop */}
          <View className="flex-row items-center mb-4">
            <Icon name="location-on" size={20} color="#00A86B" />
            <View className="flex-1 ml-2">
              <Text className="text-xs font-semibold text-gray-500">DROP</Text>
              <TextInput
                className="py-2 border-b border-gray-300"
                placeholder="Where are you Drop?"
                placeholderTextColor="#999"
              />
            </View>
          </View>

          {/* Date and Time */}
          <View className="flex-row items-center mb-4">
            <Icon name="location-on" size={20} color="#00A86B" />
            <Text className="text-xs font-semibold text-gray-500">
              DATE AND TIME
            </Text>
            <TextInput
              className="py-2 border-b border-gray-300"
              placeholder="Select Date and Time"
              placeholderTextColor="#999"
            />
          </View>

          {/* Find/Offer Ride Button */}
          <Button mode="contained" className="py-2 bg-green-600 rounded-full">
            {activeTab === "find" ? "Find ride" : "Offer ride"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
