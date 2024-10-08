import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

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
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getPassengerDetails = async () => {
      try {
        const passengerDetailsString =
          await AsyncStorage.getItem("passengerDetails");

        if (passengerDetailsString) {
          const passengerDetails = JSON.parse(passengerDetailsString);
          setUserName(
            passengerDetails.firstname + " " + passengerDetails.lastname
          );
          setEmail(passengerDetails.email);
          setContact(passengerDetails.contact);
          setGender(passengerDetails.gender);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getPassengerDetails();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem("passengerDetails");
      router.replace("/(auth)/sign-in");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="bg-[#0C6C41] p-6">
          <Text className="text-2xl font-bold text-white">Profile</Text>
        </View>

        <View className="bg-[#0C6C41] mx-4 my-4 p-6 rounded-xl">
          <View className="items-center mb-4">
            <View className="items-center justify-center w-20 h-20 bg-black rounded-full">
              <Text className="text-3xl font-bold text-white">JD</Text>
            </View>
            <Text className="mt-2 text-xl font-bold text-white">
              {userName}
            </Text>
            <Text className="text-sm text-white">Toyota prius QW-8954</Text>
          </View>
          <View className="flex-row justify-between mt-4">
            <StatItem value="2,256" label="Trips" />
            <StatItem value="4.9" label="Ratings" />
            <StatItem value="2" label="Years" />
          </View>
        </View>

        <TouchableOpacity
          className="bg-[#0C6C41] mx-4 my-4 p-4 rounded-lg flex-row items-center"
          onPress={() =>
            router.push({
              pathname: "/(root)/ride_requests"
            })
          }
        >
          <Ionicons name="car" size={24} color="white" />
          <Text className="flex-1 ml-2 text-lg font-bold text-white">
            My Rides Requests
          </Text>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>

        <View className="p-4">
          <Text className="mb-4 text-xl font-bold">Your Info</Text>
          <ProfileItem
            icon="person-outline"
            label="Full Name"
            value={userName}
          />
          <ProfileItem
            icon="mail-outline"
            label="Email Address"
            value={email}
          />
          <ProfileItem
            icon="phone-portrait-outline"
            label="Mobile Number"
            value={contact}
          />
          <ProfileItem
            icon="calendar-outline"
            label="Birthday"
            value="Add Bithday"
          />
          <ProfileItem
            icon="male-female-outline"
            label="Gender"
            value={gender}
          />
        </View>
        <TouchableOpacity
          className="bg-white border border-[#0C6C41] mx-4 my-6 p-4 rounded-lg"
          onPress={handleLogout}
        >
          <Text className="text-[#0C6C41] font-bold text-center text-lg">
            Log Out
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
