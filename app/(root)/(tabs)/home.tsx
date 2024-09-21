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
      <View className="flex flex-row items-center h-full bg-transparent">
        <Map />
      </View>

      {/* Header */}
      <View className="absolute left-0 right-0 flex-row items-center justify-between px-4 py-2 bg-white top-12">
        <View className="flex-row items-center">
          <View className="items-center justify-center bg-black rounded-full w-9 h-9">
            <Text className="text-lg font-bold text-white">JD</Text>
          </View>
          <View className="flex-col ml-3">
            <Text className="font-semibold leading-6 text-m">
              Welcome! Praveen
            </Text>
            <Text className="text-sm leading-4 text-gray-600">Malabe</Text>
          </View>
        </View>
        <View className="items-center justify-center w-6 h-6">
          <Icon name="bell" size={20} color="#000" />
        </View>
      </View>

      {/* Ride Form */}
      <View
        className="absolute mb-8 bg-white shadow-md bottom-16 left-4 right-4 rounded-xl"
        style={{ elevation: 5 }}
      >
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
          <View className="flex-row items-center justify-start">
            <Text className="w-20 ml-3 text-xs font-medium text-blue-500">
              PICKUP
            </Text>
            <TextInput
              placeholder={userAddress}
              placeholderTextColor="gray"
              className="flex-1 px-3 ml-0 text-gray-700 rounded"
            />
          </View>
          <View className="absolute h-[1px] bg-gray-300 top-[38px] left-16 right-12" />
          <View className="h-10 mr-4 items-left ml-7">
            <View className="w-2 h-2 bg-gray-400 rounded-full" />
            <View className="w-0.5 flex-1 bg-gray-300 my-1 mx-0.5" />
            <View className="w-2 h-2 bg-gray-400 rounded-full" />
          </View>
          <View className="flex-row items-center pl-5 mb-3">
            <Text className="w-20 text-xs font-medium text-orange-500">
              DROP
            </Text>

            <TouchableOpacity
              onPress={handleNavigateToFindRide}
              className="flex-1"
            >
              <Text className="flex-1 px-3 mb-2 ml-0 font-medium text-gray-700 rounded">
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
