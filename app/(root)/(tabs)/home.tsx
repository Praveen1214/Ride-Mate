import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Keyboard,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

import GoogleTextInput from "@/components/GoogleTextInput";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";

const PRIMARY_COLOR = "#0C6C41";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("find");
  const [hasPermission, setHasPermission] = useState(false);

  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setHasPermission(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude!,
        longitude: location.coords?.longitude!,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const handleNavigateToFindRide = () => {
    router.push({
      pathname: "/(root)/find-ride",
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Map View */}
      <View className="flex flex-row items-center bg-transparent h-full">
        <Map />
      </View>

      {/* Header */}
      <View className="absolute top-12 left-0 right-0 bg-white px-4 py-2 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-9 h-9 bg-black rounded-full items-center justify-center">
            <Text className="text-white text-lg font-bold">JD</Text>
          </View>
          <View className="flex-col ml-3">
            <Text className="text-m font-semibold leading-6">
              Welcome! Praveen
            </Text>
            <Text className="text-sm text-gray-600 leading-4">Malabe</Text>
          </View>
        </View>
        <View className="w-6 h-6 items-center justify-center">
          <Icon name="bell" size={20} color="#000" />
        </View>
      </View>

      {/* Ride Form */}
      <View className="absolute bottom-16 left-4 right-4 bg-white rounded-lg shadow-lg mb-10">
        <View className="flex-row mb-4">
          <TouchableOpacity
            className={`flex-1 py-3 flex-row justify-center items-center ${
              activeTab === "find" ? "bg-[#0C6C41]" : "bg-gray-200"
            } rounded-l-md`}
            onPress={() => setActiveTab("find")}
          >
            <Ionicons
              name="location-outline"
              size={18}
              color={activeTab === "find" ? "white" : "gray"}
              style={{ marginRight: 8 }}
            />
            <Text
              className={`text-center ${
                activeTab === "find" ? "text-white" : "text-gray-700"
              } text-[15px] font-regular`}
            >
              Find ride
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className={`flex-1 py-3 flex-row justify-center items-center ${
              activeTab === "offer" ? "bg-[#0C6C41]" : "bg-gray-200"
            } rounded-r-md`}
            onPress={() => setActiveTab("offer")}
          >
            <Ionicons
              name="location"
              size={18}
              color={activeTab === "offer" ? "white" : "gray"}
              style={{ marginRight: 8 }}
            />
            <Text
              className={`text-center ${
                activeTab === "offer" ? "text-white" : "text-gray-700"
              } text-[15px] font-regular`}
            >
              Offer ride
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View className="flex-row mb-3 items-center gap-3 pl-5 border-b border-gray-100">
            <Text className="text-xs text-gray-700 w-20">PICKUP</Text>
            <TextInput
              placeholder={userAddress}
              placeholderTextColor="gray"
              className="text-gray-700 flex-1 py-2 px-3 rounded"
            />
          </View>

          <View className="flex-row mb-3 items-center gap-3 pl-5">
            <Text className="text-xs text-gray-700 mb-1 w-20">DROP</Text>
            <TouchableOpacity
              onPress={handleNavigateToFindRide}
              className="flex-1"
            >
              <Text className="text-gray-700 py-2 px-3 rounded">
                Where are you Drop?
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
