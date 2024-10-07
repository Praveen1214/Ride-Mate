import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform
} from "react-native";
import Map from "@/components/Map";
import { useLocationStore } from "@/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FindRideSection from "@/components/FindRideSection";
import OfferRideSection from "@/components/OfferRideSection";

const PRIMARY_COLOR = "#0C6C41";

const HomeScreen = () => {
  const navigation = useNavigation();
  const [activeTab, setActiveTab] = useState("find");
  const [hasPermission, setHasPermission] = useState(false);
  const [userName, setUserName] = useState("");

  const { userAddress, setUserLocation } = useLocationStore();

  useEffect(() => {
    const getPassengerDetails = async () => {
      try {
        const passengerDetailsString = await AsyncStorage.getItem("passengerDetails");
        if (passengerDetailsString) {
          const passengerDetails = JSON.parse(passengerDetailsString);
          setUserName(`${passengerDetails.firstname} ${passengerDetails.lastname}`);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getPassengerDetails();
  }, []);

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
        longitude: location.coords?.longitude
      });

      setUserLocation({
        latitude: location.coords?.latitude,
        longitude: location.coords?.longitude,
        address: `${address[0].name}, ${address[0].region}`
      });
    })();
  }, []);

  const platformSpecificStyle = Platform.select({
    ios: "mb-4",
    android: "mt-2 mb-2"
  });

  return (
    <SafeAreaView className={`flex-1 bg-gray-100 ${platformSpecificStyle} text-black`}>
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
          alignItems: "center"
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
              justifyContent: "center"
            }}
          >
            <Text style={{ color: "white", fontSize: 18, fontWeight: "bold" }}>
              JD
            </Text>
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>
              Welcome! {userName}
            </Text>
            <Text style={{ fontSize: 14, color: "gray" }}> {userAddress} </Text>
          </View>
        </View>
        <Ionicons name="notifications-outline" size={20} color="#000" />
      </View>

      {/* Ride Form */}
      <View
        className="absolute mb-8 bg-white shadow-md bottom-16 left-4 right-4 rounded-xl"
        style={{
          elevation: 5,
          bottom: Platform.OS === "ios" ? 60 : 40,
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84
        }}
      >
        <View className={`flex-row ${platformSpecificStyle}`}>
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

        {activeTab === "find" ? <FindRideSection /> : <OfferRideSection />}
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;