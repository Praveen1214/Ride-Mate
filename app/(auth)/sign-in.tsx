import React, { useState } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  Keyboard, 
  StatusBar, 
  Platform 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { styled } from "nativewind";

const PhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const router = useRouter();

  const handleNext = () => {
    if (phoneNumber.length === 9) {
      router.push({ pathname: "/(auth)/otp-verification", params: { phoneNumber: `+94${phoneNumber}` } });
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView className="flex-1 bg-white">
        {/* Show the Status Bar */}
        <StatusBar barStyle={Platform.OS === 'ios' ? 'dark-content' : 'default'} backgroundColor="white" />
        
        {/* Back Button */}
        <TouchableOpacity onPress={() => router.back()} className="absolute top-10 left-3 z-10">
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <View className="flex-1 justify-start px-5 pt-28">
          <Text className="text-center text-2xl font-bold mb-2">Enter your mobile number</Text>
          <Text className="text-center text-base text-gray-500 mb-8">We'll send you a verification code.</Text>

          <View className="flex-row border border-gray-200 rounded-lg mb-4">
            <View className="px-4 py-3 border-r border-gray-200">
              <Text className="text-lg">+94</Text>
            </View>
            <TextInput
              className="flex-1 text-lg px-4 py-3"
              placeholder="Enter mobile number"
              keyboardType="phone-pad"
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              maxLength={9}
              onSubmitEditing={handleNext}
            />
          </View>

          {/* Display an error message if phone number length is not valid */}
          {phoneNumber.length > 0 && phoneNumber.length < 9 && (
            <Text className="text-center text-red-500 mb-4">Please enter a valid 9-digit number.</Text>
          )}

          <TouchableOpacity
            className={`mt-5 py-4 rounded-lg ${phoneNumber.length === 9 ? 'bg-green-600' : 'bg-gray-400 opacity-70'}`}
            onPress={handleNext}
            disabled={phoneNumber.length !== 9}
          >
            <Text className="text-center text-white text-lg font-bold">Next</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default PhoneNumberScreen;
