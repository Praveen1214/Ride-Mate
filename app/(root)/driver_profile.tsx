import React from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

const ProfileItem = ({ icon, label, value }) => (
  <View className="flex-row items-center py-4 border-b border-gray-200">
    <Ionicons name={icon} size={24} color="#000" />
    <View className="flex-1 ml-4">
      <Text className="text-base text-black">{label}</Text>
      <Text className="text-sm text-gray-600">{value}</Text>
    </View>
    <Ionicons name="chevron-forward" size={24} color="#ccc" />
  </View>
);

const StatItem = ({ value, label }) => (
  <View className="items-center">
    <Text className="text-xl font-bold text-white">{value}</Text>
    <Text className="text-sm text-white">{label}</Text>
  </View>
);

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="bg-[#0C6C41] p-6">
          <Text className="text-2xl font-bold text-white">Profile</Text>
        </View>

        <View className="bg-[#0C6C41] mx-4 my-4 p-6 rounded-xl">
          <View className="items-center mb-4">
            <View className="w-20 h-20 bg-black rounded-full items-center justify-center">
              <Text className="text-white text-3xl font-bold">JD</Text>
            </View>
            <Text className="text-xl font-bold text-white mt-2">
              Praveen de Silva
            </Text>
            <Text className="text-sm text-white">Toyota prius QW-8954</Text>
          </View>
          <View className="flex-row justify-between mt-4">
            <StatItem value="2,256" label="Trips" />
            <StatItem value="4.9" label="Ratings" />
            <StatItem value="2" label="Years" />
          </View>
        </View>

        <TouchableOpacity className="bg-[#0C6C41] mx-4 my-4 p-4 rounded-lg flex-row items-center">
          <Ionicons name="car" size={24} color="white" />
          <Text className="text-white font-bold text-lg ml-2 flex-1">
            My Rides Requests
          </Text>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>

        <View className="p-4">
          <Text className="text-xl font-bold mb-4">Your Info</Text>
          <ProfileItem
            icon="person-outline"
            label="Full Name"
            value="Dileepa praveen"
          />
          <ProfileItem
            icon="mail-outline"
            label="Email Address"
            value="dileepapraveen32@gmail.com"
          />
          <ProfileItem
            icon="phone-portrait-outline"
            label="Mobile Number"
            value="778145785"
          />
          <ProfileItem
            icon="calendar-outline"
            label="Birthday"
            value="2000-12-14"
          />
          <ProfileItem icon="male-female-outline" label="Gender" value="Male" />
        </View>
      </ScrollView>

      <TouchableOpacity className="bg-white border border-[#0C6C41] mx-4 my-6 p-4 rounded-lg">
        <Text className="text-[#0C6C41] font-bold text-center text-lg">
          Log Out
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Profile;
