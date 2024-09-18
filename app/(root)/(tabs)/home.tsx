import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  Platform,
} from "react-native";
import { Button, Avatar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const HomeScreen = () => {
  const [activeTab, setActiveTab] = useState("find");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Full-page Map */}
      <View className="absolute top-0 left-0 right-0 bottom-0 bg-gray-200">
        {/* Replace this View with actual MapView component */}
        <Text className="text-center pt-4">Map Placeholder</Text>
      </View>

      {/* Header */}
      <View className="bg-white px-4 pt-2 pb-4">
        <View className="flex-row justify-between items-center">
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
        className="bg-white rounded-t-3xl shadow-lg p-4 absolute bottom-0 left-0 right-0 m-5 mb-20"
        style={{ paddingBottom: Platform.OS === "ios" ? 20 : 0 }}
      >
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
            <View className="ml-2 flex-1">
              <Text className="text-xs font-semibold text-gray-500">
                PICKUP
              </Text>
              <TextInput
                className="border-b border-gray-300 py-2"
                value="Location fetched"
                editable={false}
              />
            </View>
          </View>

          {/* Drop */}
          <View className="flex-row items-center mb-4">
            <Icon name="location-on" size={20} color="#00A86B" />
            <View className="ml-2 flex-1">
              <Text className="text-xs font-semibold text-gray-500">DROP</Text>
              <TextInput
                className="border-b border-gray-300 py-2"
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
              className="border-b border-gray-300 py-2"
              placeholder="Select Date and Time"
              placeholderTextColor="#999"
            />
          </View>

          {/* Find/Offer Ride Button */}
          <Button mode="contained" className="bg-green-600 rounded-full py-2">
            {activeTab === "find" ? "Find ride" : "Offer ride"}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
