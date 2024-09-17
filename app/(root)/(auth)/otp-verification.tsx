import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Animated,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const OTPVerificationScreen = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const router = useRouter();
  const route = useRoute();
  const { phoneNumber = "+947XXXXXXXXX" } = route.params || {};
  const inputRefs = useRef([]);
  const shakeAnimation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleNext = async () => {
    if (otp.join("").length === 4) {
      setIsLoading(true);
      try {
        // Simulating API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push("/(tabs)/home");
      } catch (error) {
        console.error("OTP verification failed:", error);
        shakeInputs();
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleOtpChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const shakeInputs = () => {
    Animated.sequence([
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: -10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 10, duration: 100, useNativeDriver: true }),
      Animated.timing(shakeAnimation, { toValue: 0, duration: 100, useNativeDriver: true })
    ]).start();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1"
    >
      <SafeAreaView className="flex-1 bg-white">
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "default"}
          backgroundColor="white"
        />

        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-12 left-2 z-10"
        >
          <Ionicons name="chevron-back" size={28} color="#000" />
        </TouchableOpacity>

        <View className="flex-1 justify-center items-center px-6">
          <Text className="text-xl text-center mb-2 font-semibold">
            Enter 4-Digit Verification Code
          </Text>
          <Text className="text-lg text-center mb-6">
            Sent to {phoneNumber}{" "}
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-green-600 font-semibold">Change</Text>
            </TouchableOpacity>
          </Text>

          <Animated.View 
            className="flex-row justify-center space-x-4 mb-6"
            style={{ transform: [{ translateX: shakeAnimation }] }}
          >
            {otp.map((digit, index) => (
              <View
                key={index}
                className={`w-14 h-14 border-2 ${
                  digit ? "border-green-600" : "border-gray-300"
                } rounded-lg overflow-hidden`}
              >
                <TextInput
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  className="w-full h-full text-2xl text-center"
                  keyboardType="numeric"
                  maxLength={1}
                  value={digit}
                  onChangeText={(value) => handleOtpChange(value, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                />
              </View>
            ))}
          </Animated.View>

          <View className="flex-row justify-between w-full px-4 mb-6">
            <TouchableOpacity
              onPress={() => {
                if (countdown === 0) {
                  setCountdown(30);
                  // Implement resend logic here
                }
              }}
              disabled={countdown > 0}
            >
              <Text className={`text-sm ${countdown > 0 ? "text-gray-400" : "text-green-600"}`}>
                {countdown > 0 ? `Resend in ${countdown}s` : "Resend Code"}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleNext}
            className={`w-full h-12 rounded-lg ${
              otp.join("").length === 4 ? "bg-green-600" : "bg-gray-300"
            } justify-center items-center`}
            disabled={otp.join("").length !== 4 || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text className="text-white text-lg font-bold">Verify</Text>
            )}
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default OTPVerificationScreen;