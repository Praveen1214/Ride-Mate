import React, { useState, useRef } from "react";
import {
  ScrollView,
  Text,
  Image,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import { Ionicons } from "@expo/vector-icons";
import { icons, images } from "@/constants";

const SignUp = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    gender: "",
  });

  const scrollViewRef = useRef(null);

  const handleSubmit = () => {
    if (!form.firstname || !form.lastname || !form.email || !form.gender) {
      Alert.alert("Error", "Please fill in all fields");
      return;
    }
    console.log("Form submitted:", form);
    Alert.alert("Success", "Account created successfully!");
  };

  const GenderOption = ({ value, icon }) => (
    <TouchableOpacity
      onPress={() => setForm({ ...form, gender: value })}
      className={`flex-row items-center justify-center p-4 rounded-full ${
        form.gender === value 
          ? "border border-[#169958] bg-[#169958]" 
          : "bg-gray-200"
      }`}
    >
      <Ionicons
        name={icon}
        size={24}
        color={form.gender === value ? "white" : "black"}
      />
      <Text
        className={`ml-2 font-semibold ${
          form.gender === value ? "text-white" : "text-black"
        }`}
      >
        {value}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAwareScrollView
        ref={scrollViewRef}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        enableOnAndroid={true}
        enableAutomaticScroll={Platform.OS === "ios"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="flex-1 bg-white">
            <Image
              source={images.signUpCar}
              className="w-full h-[200px]"
              resizeMode="cover"
            />
            <Text className="text-2xl text-center my-6 font-bold">
              Create Your Profile
            </Text>
            <View className="px-6 pb-6">
              <InputField
                label="First Name"
                placeholder="Enter your first name"
                icon={icons.person}
                value={form.firstname}
                onChangeText={(value) => setForm({ ...form, firstname: value })}
              />
              <InputField
                label="Last Name"
                placeholder="Enter your last name"
                icon={icons.person}
                value={form.lastname}
                onChangeText={(value) => setForm({ ...form, lastname: value })}
              />
              <InputField
                label="Email"
                placeholder="Enter your email"
                icon={icons.email}
                textContentType="emailAddress"
                keyboardType="email-address"
                value={form.email}
                onChangeText={(value) => setForm({ ...form, email: value })}
              />

              <Text className="text-sm font-semibold mb-3 mt-3">Gender</Text>
              <View className="flex-row justify-between mb-6">
                <View className="flex-1 mr-3">
                  <GenderOption value="Male" icon="male" />
                </View>
                <View className="flex-1 ml-3">
                  <GenderOption value="Female" icon="female" />
                </View>
              </View>

              <CustomButton
                title="Create Account"
                onPress={handleSubmit}
                className="mt-5"
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
