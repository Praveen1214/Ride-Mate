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
  Platform,
} from "react-native";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";

const PRIMARY_COLOR = "#0C6C41";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("find");
  const [hasPermission, setHasPermission] = useState(false);

  const platformSpecificStyle = Platform.select({
    ios: "mb-4",
    android: "mb-2",
  });

  const dividerStyle = Platform.select({
    ios: "absolute h-[1px] bg-gray-300 top-[40px] left-16 right-12",
    android: "absolute h-[1px] bg-gray-300 top-[43px] left-16 right-12",
  });

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
      setHasPermission(true);

      let location = await Location.getCurrentPositionAsync({});
      const address = await Location.reverseGeocodeAsync({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`,
      });
    })();
  }, []);

  const handleNavigateToDrop = (location: {
    latitude: number;
    longitude: number;
    address: string;
  }) => {
    setDestinationLocation(location);
    if (activeTab === "find") {
      router.push({
        pathname: "/(root)/find-ride",
      });
    } else {
      router.push({
        pathname: "/(root)/offer-ride",
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#0C6C41] text-white">
      <StatusBar barStyle="dark-content" backgroundColor="white" />


      {/* Map View */}
      <View className="flex flex-row items-center h-full bg-transparent">
        <Map />
      </View>

      {/* Header */}
      <View
        style={{
          position: "absolute",
          top: Platform.OS === "ios" ? 45 : 25,
          left: 0,
          right: 0,
          backgroundColor: "white",
          paddingHorizontal: 16,
          paddingVertical: 12,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View
            style={{
              width: 36,
              height: 36,
              backgroundColor: "black",
              shadowColor: "#000",
              borderRadius: 18,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              JD
            </Text>
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Welcome! Praveen
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}>Malabe</Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={20} color="#000" />

      </View>

      {/* Ride Form */}
      <View

        className="absolute bottom-16 left-4 right-4 bg-white rounded-xl mb-8 shadow-md"
        style={{
          elevation: 5,
          bottom: Platform.OS === "ios" ? 60 : 40,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        }}

      >
        <View className={`flex-row ${platformSpecificStyle}`}>
          <TouchableOpacity 
            className={`flex-1 py-3 flex-row justify-center items-center ${
              activeTab === "find" ? "bg-[#0C6C41]" : "bg-gray-200"
            } rounded-l-md`}
            onPress={() => {
              setActiveTab("find");
              router.push("/search_ride");
            }}
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


        <ScrollView className="px-2">
          <View className="flex-row items-center justify-start">
            <Text className="text-sm text-blue-500 w-20 font-bold ml-3">
              PICKUP
            </Text>
            <TouchableOpacity onPress={handleNavigateToDrop} className="flex-1">
              <TextInput
                placeholder={userAddress}
                placeholderTextColor="gray"
                className="text-sm font-bold text-gray-700 flex-1 px-3 rounded ml-0"
              />
            </TouchableOpacity>
          </View>

          <View className={dividerStyle} />
          <View className="mr-4 items-left ml-7 h-10">

            <View className="w-2 h-2 bg-gray-400 rounded-full" />
            <View className="w-0.5 flex-1 bg-gray-300 my-1 mx-0.5" />
            <View className="w-2 h-2 bg-gray-400 rounded-full" />
          </View>

          <View className="flex-row mb-3 items-center pl-5">
            <Text className="text-sm text-orange-500 w-20 font-bold">DROP</Text>

            <TouchableOpacity onPress={handleNavigateToDrop} className="flex-1">
              <Text className="text-sm text-gray-700 flex-1 px-3 rounded ml-0 mb-0 font-bold">

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
