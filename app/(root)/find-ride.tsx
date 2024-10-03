import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Modal,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";

import GoogleTextInput from "@/components/GoogleTextInput"; // Import the custom GoogleTextInput
import { useLocationStore } from "@/store";
import { router } from "expo-router";

const FindRideScreen = () => {
  const [pickup, setPickup] = useState(null);
  const [drop, setDrop] = useState(null);
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const {
    userAddress,
    destinationAddress,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();

  const handlePickupLocation = (location: { latitude }) => {
    setPickup(location);
  };

  const handleDropLocation = (location) => {
    setDrop(location);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS !== "ios") {
      setShowPicker(false);
    }
  };

  const handleConfirmDate = () => {
    setShowDatePicker(false);
  };

  const baseColor = "#0C6C41";

  const platformSpecificStyle = Platform.select({
    ios: "mb-4",
    android: "mt-2 mb-2",
  });

  return (
    <SafeAreaView
      className={`flex-1 bg-gray-100 ${platformSpecificStyle} text-black`}
    >
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        {/* Header */}
        <View className="bg-[#0C6C41] py-4 px-4 flex-row items-center">
          {/* Back Arrow */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-white text-xl font-bold ml-4">Find Ride</Text>
        </View>

        <View className="bg-white rounded-lg shadow-md p-4 mt-4 mx-4">
          {/* Pickup Section */}
          <View className="mb-2">
            <View className="flex-row items-center">
              <Text className="text-sm text-blue-500 w-20 font-bold">
                PICKUP
              </Text>
              <GoogleTextInput
                icon={null}
                initialLocation={userAddress}
                handlePress={handlePickupLocation}
                textInputBackgroundColor="white"
                containerStyle="flex-1"
              />
            </View>
          </View>

          {/* Vertical Line between Pickup and Drop */}
          <View className="mr-4 items-left ml-5 h-10 p-0">
            <View className="w-2 h-2 bg-gray-400 rounded-full" />
            <View className="w-0.5 flex-1 bg-gray-300 my-1 mx-0.5" />
            <View className="w-2 h-2 bg-gray-400 rounded-full" />
          </View>

          {/* Drop Section */}
          <View>
            <View className="flex-row items-center">
              <Text className="text-sm text-orange-500 w-20 font-bold">
                DROP
              </Text>
              <GoogleTextInput
                icon={null}
                initialLocation={drop ? drop.address : null}
                handlePress={handleDropLocation}
                textInputBackgroundColor="white"
                containerStyle="flex-1"
              />
            </View>
          </View>
        </View>

        <ScrollView className="flex-1 px-4">
          <View className="bg-white rounded-lg shadow-md p-4 mb-6">
            <Text className="text-sm font-bold mb-2 text-[#0C6C41]">
              DATE AND TIME
            </Text>
            <TouchableOpacity
              className="flex-row items-center bg-[#E8F5E9] rounded-lg px-3 py-2"
              onPress={() => setShowDatePicker(true)}
            >
              <Ionicons
                name="calendar"
                size={24}
                color={baseColor}
                className="mr-2"
              />
              <Text className="text-gray-700 ml-4">
                {date.toLocaleString()}
              </Text>
            </TouchableOpacity>
          </View>

          {showDatePicker && (
            <Modal
              transparent={true}
              animationType="slide"
              visible={showDatePicker}
            >
              <View className="flex-1 justify-end bg-opacity-50">
                <View className="bg-white rounded-t-xl">
                  <View className="flex-row justify-between items-center px-4 py-3 rounded-t-xl bg-[#0C6C41]">
                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                      <Text className="text-white font-semibold">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="text-white font-bold text-lg">
                      Select Date & Time
                    </Text>
                    <TouchableOpacity onPress={handleConfirmDate}>
                      <Text className="text-white font-semibold">Done</Text>
                    </TouchableOpacity>
                  </View>
                  <DateTimePicker
                    value={date}
                    mode="datetime"
                    display="spinner"
                    onChange={handleDateChange}
                    textColor={baseColor}
                  />
                </View>
              </View>
            </Modal>
          )}

          {/* Set Location on Map Button */}
          <TouchableOpacity className="bg-[#E8F5E9] py-4 rounded-lg mt-4 flex-row items-center justify-center">
            <Ionicons name="map" size={24} color={baseColor} className="mr-2" />
            <Text className="text-[#0C6C41] font-bold">
              SET LOCATION ON MAP
            </Text>
          </TouchableOpacity>

          {/* Find Ride Button */}
          <TouchableOpacity
            className="bg-[#0C6C41] py-4 rounded-lg mt-6 flex-row items-center justify-center"
            onPress={() => {
              setIsButtonPressed(true);
              router.push("/search_ride");
            }}
          >
            <Text className="text-white font-bold">FIND RIDE</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FindRideScreen;
