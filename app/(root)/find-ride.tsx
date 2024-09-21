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
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import GoogleTextInput from "@/components/GoogleTextInput"; // Import the custom GoogleTextInput

const OfferRideScreen = () => {
  const [pickup, setPickup] = useState(null); // Updated to hold the location object
  const [drop, setDrop] = useState(null); // Updated to hold the location object
  const [date, setDate] = useState(new Date()); // Holds the selected date and time
  const [showPicker, setShowPicker] = useState(false); // Controls visibility of DateTimePicker
  const [isButtonPressed, setIsButtonPressed] = useState(false);

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

  const baseColor = '#0C6C41';


  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Hide StatusBar */}
      <StatusBar barStyle="dark-content" backgroundColor="white" />

      {/* Header */}
      <View className="bg-[#0C6C41] py-4 px-4 flex-row items-center">
        {/* Back Arrow */}
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-xl font-bold ml-4">Offer Ride</Text>
      </View>

      <View className="p-4 flex-1">
        {/* Pickup and Drop Form */}
        <View className="flex-row">
          <View className="flex-1">
            {/* Pickup Section */}
            <View>
              <View className="flex-row items-center">
                <Text className="text-xs text-blue-500 w-20 font-medium ml-3">
                  PICKUP
                </Text>
                {/* GoogleTextInput for Pickup */}
                <GoogleTextInput
                  icon={null} // You can specify a custom icon or use the default
                  initialLocation={pickup ? pickup.address : null}
                  handlePress={handlePickupLocation}
                  textInputBackgroundColor="white"
                  containerStyle="flex-1"
                />
              </View>
            </View>
            <View className="absolute h-[1px] bg-gray-300 top-[65px] left-16 right-12" />

            {/* Vertical Line between Pickup and Drop */}
            <View className="mr-4 items-left ml-5 h-10 p-0">
              <View className="w-2 h-2 bg-gray-400 rounded-full" />
              <View className="w-0.5 flex-1 bg-gray-300 my-1 mx-0.5" />
              <View className="w-2 h-2 bg-gray-400 rounded-full" />
            </View>

            {/* Drop Section */}
            <View>
              <View className="flex-row items-center">
                <Text className="text-xs text-orange-500 w-20 font-medium ml-2">
                  DROP
                </Text>
                {/* GoogleTextInput for Drop */}
                <GoogleTextInput
                  icon={null} // You can specify a custom icon or use the default
                  initialLocation={drop ? drop.address : null}
                  handlePress={handleDropLocation}
                  textInputBackgroundColor="white"
                  containerStyle="flex-1"
                />
              </View>
            </View>
          </View>
        </View>

        {/* Date and Time Section */}
        <View className="flex-row items-center mt-4">
          <Text className="text-xs text-gray-500 w-20 font-medium ml-2">
            DATE AND TIME
          </Text>
          <TouchableOpacity
            className="flex-1 bg-white border-b border-gray-300 px-3 py-2 rounded"
            onPress={() => setShowPicker(true)}
          >
            <Text className="text-gray-700">{date.toLocaleString()}</Text>
          </TouchableOpacity>
        </View>

        {/* iOS Picker */}
        {Platform.OS === "ios" && showPicker && (
          <Modal transparent={true} animationType="slide" visible={showPicker}>
            <View className="flex-1 justify-end bg-opacity-50 ">
              <View className="bg-white rounded-t-xl">
                <View
                  className="flex-row justify-between items-center px-4 py-2 rounded-t-xl"
                  style={{ backgroundColor: baseColor }}
                >
                  <TouchableOpacity
                    onPress={() => handleDateChange(null, date)}
                  >
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

        {/* Android Picker */}
        {Platform.OS === "android" && showPicker && (
          <DateTimePicker
            value={date}
            mode="datetime"
            display="default"
            onChange={handleDateChange}
            textColor={baseColor}
          />
        )}

        {/* Set Location on Map Button */}
        <TouchableOpacity
          className={`border-2 border-[#0C6C41] py-3 rounded-md mt-8 ${
            isButtonPressed ? "bg-[#0C6C41]" : "bg-transparent"
          }`}
          onPressIn={() => setIsButtonPressed(true)}
          onPressOut={() => setIsButtonPressed(false)}
        >
          <Text
            className={`text-center text-sm font-semibold ${
              isButtonPressed ? "text-white" : "text-[#0C6C41]"
            }`}
          >
            SET LOCATION ON MAP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OfferRideScreen;
