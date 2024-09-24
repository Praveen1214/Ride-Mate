import React from 'react';
import { Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

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

const EmergencyContact = ({ icon, label, value }) => (
  <View className="bg-gray-200 rounded-lg p-4 items-center flex-1 mx-2">
    <Ionicons name={icon} size={24} color="#000" />
    <Text className="font-bold mt-2">{label}</Text>
    <Text>{value}</Text>
  </View>
);

const Profile = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="bg-[#0C6C41] p-6">
          <Text className="text-2xl font-bold text-white">Profile</Text>
        </View>
        
        <View className="p-4">
          <Text className="text-xl font-bold mb-4">Your Info</Text>
          <ProfileItem icon="person-outline" label="Full Name" value="Dileepa praveen" />
          <ProfileItem icon="mail-outline" label="Email Address" value="dileepapraveen32@gmail.com" />
          <ProfileItem icon="phone-portrait-outline" label="Mobile Number" value="778145785" />
          <ProfileItem icon="calendar-outline" label="Birthday" value="2000-12-14" />
          <ProfileItem icon="male-female-outline" label="Gender" value="Male" />
        </View>
        
        <View className="p-4">
          <Text className="text-xl font-bold mb-4">Emergency Contact</Text>
          <View className="flex-row">
            <EmergencyContact icon="shield-outline" label="Police" value="119" />
            <EmergencyContact icon="medkit-outline" label="Ambulance" value="1990" />
          </View>
        </View>
        
        <TouchableOpacity className="bg-white border border-[#0C6C41] mx-4 my-6 p-4 rounded-lg">
          <Text className="text-[#0C6C41] font-bold text-center text-lg">Log Out</Text>
        </TouchableOpacity>
      </ScrollView>
      
      
    </SafeAreaView>
  );
};

export default Profile;