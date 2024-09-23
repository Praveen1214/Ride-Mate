import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Platform,
  Modal,
  Button,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import GoogleTextInput from "@/components/GoogleTextInput"; // Import the custom GoogleTextInput

const FindRideScreen = () => {
  const [pickup, setPickup] = useState(null); // Updated to hold the location object
  const [drop, setDrop] = useState(null); // Updated to hold the location object
  const [date, setDate] = useState(new Date()); // Holds the selected date and time
  const [showPicker, setShowPicker] = useState(false); // Controls visibility of DateTimePicker
  const [isButtonPressed, setIsButtonPressed] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const navigation = useNavigation();

  const handlePickupLocation = (location) => {
    setPickup(location);
  };

  const handleDropLocation = (location) => {
    setDrop(location);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS !== "ios") {
      setShowPicker(false); // Close the picker immediately on Android
    }
  };

  const handleConfirmDate = () => {
    setShowPicker(false);
  };

  const baseColor = "#0C6C41";

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      {/* Hide StatusBar */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* Header */}
        <View
          style={{
            backgroundColor: baseColor,
            paddingVertical: 16,
            paddingHorizontal: 16,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {/* Back Arrow */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text
            style={{
              color: "white",
              fontSize: 20,
              fontWeight: "bold",
              marginLeft: 16,
            }}
          >
            Offer Ride
          </Text>
        </View>

        <ScrollView style={{ flex: 1, paddingHorizontal: 16 }}>
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 8,
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              padding: 16,
              marginTop: 16,
              marginBottom: 24,
            }}
          >
            {/* Pickup and Drop Form */}
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                {/* Pickup Section */}
                <View style={{ marginBottom: 4}}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#1E90FF",
                        width: 80,
                        fontWeight: "bold",
                      }}
                    >
                      PICKUP
                    </Text>
                    <GoogleTextInput
                      icon={null}
                      initialLocation={pickup ? pickup.address : null}
                      handlePress={handlePickupLocation}
                      textInputBackgroundColor="white"
                      containerStyle={{ flex: 1 }}
                    />
                  </View>
                </View>

                {/* Vertical Line between Pickup and Drop */}
                <View
                  style={{
                    marginRight: 10,
                    alignItems: "flex-start",
                    marginLeft: 20,
                    height: 40,
                    padding: 0,
                  }}
                >
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: "#C0C0C0",
                      borderRadius: 50,
                    }}
                  />
                  <View
                    style={{
                      width: 1,
                      flex: 1,
                      backgroundColor: "#C0C0C0",
                      marginVertical: 4,
                    }}
                  />
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      backgroundColor: "#C0C0C0",
                      borderRadius: 50,
                    }}
                  />
                </View>

                {/* Drop Section */}
                <View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        color: "#FFA500",
                        width: 80,
                        fontWeight: "bold",
                      }}
                    >
                      DROP
                    </Text>
                    <GoogleTextInput
                      icon={null}
                      initialLocation={drop ? drop.address : null}
                      handlePress={handleDropLocation}
                      textInputBackgroundColor="white"
                      containerStyle={{ flex: 1 }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>

          <View className="bg-white rounded-lg shadow-md p-4 mb-6 ">
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
              <View className="flex-1 justify-end  bg-opacity-50">
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
          <TouchableOpacity className="bg-[#E8F5E9] p-4 rounded-lg mb-6 flex-row items-center justify-center">
            <Ionicons name="map" size={24} color={baseColor} className="mr-2" />
            <Text className="text-[#0C6C41] font-semibold ml-4">
              SET LOCATION ON MAP
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FindRideScreen;
