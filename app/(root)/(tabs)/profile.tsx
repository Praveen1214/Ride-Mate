import React from 'react';
import { Text, View, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

// Simulated user data (to be replaced with MongoDB data in the future)
const userData = {
  fullName: "Dileepa Praveen",
  email: "dileepapraveen32@gmail.com",
  mobileNumber: "778145785",
  birthday: "2000-12-14",
  gender: "Male"
};

const ProfileItem = ({ icon, label, value }) => (
  <View className="flex-row items-center py-3 border-b border-gray-200">
    <Ionicons name={icon} size={20} color="#000" />
    <View className="flex-1 ml-3">
      <Text className="text-sm text-black">{label}</Text>
      <Text className="text-xs text-gray-600">{value}</Text>
    </View>
    <Ionicons name="chevron-forward" size={20} color="#ccc" />
  </View>
);

const EmergencyContact = ({ icon, label, value }) => (
  <View className="bg-gray-200 rounded-lg p-3 items-center flex-1 mx-1">
    <Ionicons name={icon} size={20} color="#000" />
    <Text className="font-bold mt-1 text-xs">{label}</Text>
    <Text className="text-xs">{value}</Text>
  </View>
);

const Profile = () => {
  const platformSpecificStyle = Platform.select({
    ios: 'mb-4',
    android: 'mb-2',
  });

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="bg-[#0C6C41] p-4">
          <Text className="text-xl font-bold text-white">Profile</Text>
        </View>
        
        <View className="p-3">
          <Text className="text-lg font-bold mb-3">Your Info</Text>
          <ProfileItem icon="person-outline" label="Full Name" value={userData.fullName} />
          <ProfileItem icon="mail-outline" label="Email Address" value={userData.email} />
          <ProfileItem icon="phone-portrait-outline" label="Mobile Number" value={userData.mobileNumber} />
          <ProfileItem icon="calendar-outline" label="Birthday" value={userData.birthday} />
          <ProfileItem icon="male-female-outline" label="Gender" value={userData.gender} />
        </View>
        
        <View className="p-3">
          <Text className="text-lg font-bold mb-3">Emergency Contact</Text>
          <View className={`flex-row ${platformSpecificStyle}`}>
            <EmergencyContact icon="shield-outline" label="Police" value="119" />
            <EmergencyContact icon="medkit-outline" label="Ambulance" value="1990" />
          </View>
        </View>
        
        <TouchableOpacity className="bg-white border border-[#0C6C41] mx-3 my-4 p-3 rounded-lg">
          <Text className="text-[#0C6C41] font-bold text-center text-base">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;