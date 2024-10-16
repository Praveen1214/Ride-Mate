import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Platform,
  Modal,
  KeyboardAvoidingView,
  Alert,
  ActivityIndicator
} from "react-native";
import axios from 'axios';

import GoogleTextInput from "@/components/GoogleTextInput";
import { useRoute } from "@react-navigation/native";
import { router } from "expo-router";

const OfferRideScreen = () => {
  const route = useRoute();
  const { userAddress } = route.params || {};

  const [pickup, setPickup] = useState(userAddress || {});
  const [drop, setDrop] = useState({});
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showVehiclePicker, setShowVehiclePicker] = useState(false);
  const [showLuggagePicker, setShowLuggagePicker] = useState(false);
  const [price, setPrice] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [availableSeats, setAvailableSeats] = useState("");
  const [luggageCapacity, setLuggageCapacity] = useState("");
  const [facilities, setFacilities] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation();

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }
  };

  const handlePickupLocation = (location) => {
    setPickup(location);
  };

  const handleDropLocation = (location) => {
    setDrop(location);
  };

  const validateInputs = () => {
    if (!pickup.address || !drop.address || !date || !price || !vehicleType || !availableSeats || !luggageCapacity || !facilities) {
      Alert.alert("Incomplete Information", "Please fill in all the details before scheduling the ride.");
      return false;
    }
    return true;
  };

  const handleScheduleRide = async () => {
    if (!validateInputs()) return;

    setIsLoading(true);
    try {

      const response = await axios.post('http://192.168.8.174:5000/api/offerride/addofferride', {
        driver: userName,
        contact: contact,

        start: pickup,
        end: drop,
        datetime: date.toISOString(),
        price: parseFloat(price),
        vehicletype: vehicleType,
        availableSeats: parseInt(availableSeats),
        luggagecapacity: luggageCapacity,
        facilities: facilities
      });

      if (response.status === 200) {
        Alert.alert("Success", "Ride scheduled successfully!", [
          { text: "OK", onPress: () => router.push({ pathname: "/(root)/ride_requests" }) }
        ]);
      }
    } catch (error) {
      console.error('Error details:', error.response?.data);
      Alert.alert(
        "Error",
        "Failed to schedule ride. Please try again later.",
        [{ text: "OK" }]
      );
    } finally {
      setIsLoading(false);
    }
  };

  

  const baseColor = "#0C6C41";
  const lightColor = "#E8F5E9";

  const renderInputField = (
    label,
    value,
    setValue,
    placeholder,
    keyboardType = "default",
    icon
  ) => (
    <View className="mb-6">
      <Text className="text-sm font-bold mb-2 text-[#0C6C41]">{label}</Text>
      <View className="flex-row items-center px-3 py-2 bg-white border border-gray-300 rounded-lg ">
        {icon && (
          <Ionicons name={icon} size={24} color={baseColor} className="mr-5 " />
        )}
        <TextInput
          className="flex-1 ml-4"
          value={value}
          onChangeText={setValue}
          placeholder={placeholder}
          placeholderTextColor="#888"
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );

  const renderPicker = (
    label,
    value,
    setValue,
    items,
    showPicker,
    setShowPicker,
    icon
  ) => (
    <View className="mb-6">
      <Text className="text-sm font-bold mb-2 text-[#0C6C41] ">{label}</Text>
      <TouchableOpacity
        className="flex-row items-center px-3 py-2 bg-white border border-gray-300 rounded-lg "
        onPress={() => setShowPicker(true)}
      >
        {icon && (
          <Ionicons name={icon} size={24} color={baseColor} className="mr-2" />
        )}
        <Text className="flex-1 ml-4">
          {value || `Select ${label.toLowerCase()}`}
        </Text>
        <Ionicons name="chevron-down" size={24} color={baseColor} />
      </TouchableOpacity>
      <Modal transparent={true} animationType="slide" visible={showPicker}>
        <View className="justify-end flex-1 bg-opacity-50">
          <View className="bg-white rounded-t-xl">
            <View className="flex-row justify-between items-center px-4 py-3 rounded-t-xl bg-[#0C6C41]">
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text className="font-semibold text-white">Cancel</Text>
              </TouchableOpacity>
              <Text className="text-lg font-bold text-white">{`Select ${label}`}</Text>
              <TouchableOpacity onPress={() => setShowPicker(false)}>
                <Text className="font-semibold text-white">Done</Text>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => {
                setValue(itemValue);
                setShowPicker(false);
              }}
            >
              {items.map((item, index) => (
                <Picker.Item
                  key={index}
                  label={item.label}
                  value={item.value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#F9FBF9]">
      <StatusBar barStyle="light-content" backgroundColor={baseColor} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="bg-[#0C6C41] p-4 flex-row items-center">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="mr-4"
          >
            <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text className="text-xl font-bold text-white">Offer Ride</Text>
        </View>

        <View className="p-4 m-4 mt-4 bg-white rounded-lg shadow-md">
          {/* Pickup Section */}
          <View className="mb-2">
            <View className="flex-row items-center">
              <Text className="w-20 text-sm font-bold text-blue-500">
                START
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
          {/* Vertical Line between Pickup and Drop */}
          <View className="h-10 p-0 ml-5 mr-4 items-left">
            <View className="w-2 h-2 bg-gray-400 rounded-full" />
            <View className="w-0.5 flex-1 bg-gray-300 my-1 mx-0.5" />
            <View className="w-2 h-2 bg-gray-400 rounded-full" />
          </View>

          {/* Drop Section */}
          <View>
            <View className="flex-row items-center">
              <Text className="w-20 text-sm font-bold text-orange-500">
                END
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
          <View className="p-4 mb-6 bg-white rounded-lg shadow-md ">
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
              <Text className="ml-4 text-gray-700">
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
              <View className="justify-end flex-1 bg-opacity-50">
                <View className="bg-white rounded-t-xl">
                  <View className="flex-row justify-between items-center px-4 py-3 rounded-t-xl bg-[#0C6C41]">
                    <TouchableOpacity onPress={() => setShowDatePicker(false)}>
                      <Text className="font-semibold text-white">Cancel</Text>
                    </TouchableOpacity>
                    <Text className="text-lg font-bold text-white">
                      Select Date & Time
                    </Text>
                    <TouchableOpacity onPress={handleConfirmDate}>
                      <Text className="font-semibold text-white">Done</Text>
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

          <TouchableOpacity className="bg-[#E8F5E9] p-4 rounded-lg mb-6 flex-row items-center justify-center">
            <Ionicons name="map" size={24} color={baseColor} className="mr-2" />
            <Text className="text-[#0C6C41] font-semibold ml-4">
              SET LOCATION ON MAP
            </Text>
          </TouchableOpacity>

          {renderInputField(
            "PRICE",
            price,
            setPrice,
            "Enter price",
            "numeric",
            "cash"
          )}

          {renderPicker(
            "VEHICLE TYPE",
            vehicleType,
            setVehicleType,
            [
              { label: "Select vehicle type", value: "" },
              { label: "Sedan", value: "Sedan" },
              { label: "SUV", value: "SUV" },
              { label: "Hatchback", value: "Hatchback" },
              { label: "Van", value: "Van" }
            ],
            showVehiclePicker,
            setShowVehiclePicker,
            "car"
          )}

          {renderInputField(
            "AVAILABLE SEATS",
            availableSeats,
            setAvailableSeats,
            "Enter available seats",
            "numeric",
            "people"
          )}

          {renderPicker(
            "LUGGAGE CAPACITY",
            luggageCapacity,
            setLuggageCapacity,
            [
              { label: "Select luggage capacity", value: "" },
              { label: "Small", value: "Small" },
              { label: "Medium", value: "Medium" },
              { label: "Large", value: "Large" }
            ],
            showLuggagePicker,
            setShowLuggagePicker,
            "briefcase"
          )}

          {renderInputField(
            "FACILITIES",
            facilities,
            setFacilities,
            "Enter Your Vehicle facilities",
            "default",
            "options"
          )}

          <TouchableOpacity
            className="bg-[#0C6C41] p-4 rounded-lg mb-8 mt-3"
            onPress={handleScheduleRide}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-lg font-semibold text-center text-white">
                Schedule Ride
              </Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default OfferRideScreen;
