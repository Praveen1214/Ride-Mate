import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Review from "./Review";
import { Ionicons } from "@expo/vector-icons";


const ViewRide = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Rider Info Section */}
      <View className="flex-row items-center p-4 bg-white mb-2">
        <Avatar
          rounded
          title="PD"
          size="medium"
          containerStyle={{ backgroundColor: 'black' }}
        />
        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold">Praveen de Silva</Text>
          <View className="flex-row items-center mt-1">
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text className="text-sm text-gray-600 ml-1">4.8 • 10 reviews</Text>
          </View>
          <Text className="text-sm text-gray-500 mt-1">Joined 2024</Text>
        </View>
        <Text className="text-xl font-bold">LKR 275.56</Text>
      </View>

      {/* Ride Details Section */}
      <View className="bg-white rounded-lg p-4 mb-2 mx-2">
        <Text className="text-lg font-bold mb-4">Ride Details</Text>
        <View className="flex-row items-center">
          <View className="items-center mr-4">
            {/* <View className="w-3 h-3 rounded-full bg-black" />
            <View className="w-0.5 h-8 bg-black my-1" />
            <View className="w-3 h-3 rounded-full bg-black" /> */}
          </View>
          <View className="mb-4">
        <View className="flex-row items-center mb-2">
          <View className="bg-orange-100 rounded-full p-2 mr-3">
            <Ionicons name="location-sharp" size={16} color="#FFA500" />
          </View>
          <View>
            <Text className="text-sm font-medium text-gray-800">
              Anuradhapura
            </Text>
            <Text className="text-xs text-gray-600">Disecriotion</Text>
          </View>
        </View>
        <View className="w-0.5 h-4 bg-[#0C6C41] ml-4" />
        <View className="flex-row items-center">
          <View className="bg-blue-100 rounded-full p-2 mr-3">
            <Ionicons name="location-sharp" size={16} color="#08019C" />
          </View>
          <View>
            <Text className="text-sm font-medium text-gray-800">
              Colombo
            </Text>
            <Text className="text-xs text-gray-600">Disecriotion</Text>
          </View>
        </View>
      </View>
          <TouchableOpacity className="px-2 py-1">
            <Text className="text-green-600 font-bold ml-32 mb-6">Map view</Text>
          </TouchableOpacity>
        </View>

        <View className="h-0.5 bg-gray-200 my-4" />

        <View className="flex-row justify-between">
          <RideInfoItem title="Start time" value="5 Aug, 9.30 a.m" />
          <RideInfoItem title="Ride with" value="5 People" />
          <RideInfoItem title="Luggage cap." value="Low" />
        </View>
      </View>

      {/* Passengers Details */}
      <View className="bg-white rounded-lg p-4 mb-2 mx-2">
        <Text className="text-base text-green-600 font-bold mb-4">2 seats Booked (Male - 1, Female - 1)</Text>
        <View className="flex-row justify-around">
          <PassengerItem name="Jayedewa Archchci" />
          <PassengerItem name="Praveen Silva" />
        </View>
      </View>

      {/* Vehicle Info */}
      <View className="bg-green-600 rounded-lg p-4 mb-2 mx-2">
        <View className="absolute right-2 top-2 flex-row items-center bg-white px-2 py-1 rounded">
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text className="ml-1 font-bold">4.8</Text>
        </View>
        <Text className="text-2xl font-bold text-white mb-2">QP8695</Text>
        <Text className="text-lg text-white mb-2">Tuk</Text>
        <Text className="text-base text-white mb-1">Facilities:</Text>
        <Text className="text-sm text-white">AC, luggage space - small, Music</Text>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-4 mx-2 mb-4">
        <TouchableOpacity className="bg-green-500 px-6 py-3 rounded flex-1 mr-2">
          <Text className="text-white text-center font-bold">Request ride</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-400 px-6 py-3 rounded flex-1 ml-2">
          <Text className="text-white text-center font-bold">Message</Text>
        </TouchableOpacity>
      </View>

      {/* Reviews */}
      <View className="mt-4">
        <Review />
      </View>
    </ScrollView>
  );
};

const RideInfoItem = ({ title, value }) => (
  <View className="items-center">
    <Text className="text-sm text-gray-500 mb-1">{title}</Text>
    <Text className="text-sm font-bold">{value}</Text>
  </View>
);

const PassengerItem = ({ name }) => (
  <View className="items-center">
    <Avatar
      rounded
      title={name.charAt(0)}
      size="medium"
      containerStyle={{ backgroundColor: 'black' }}
    />
    <Text className="text-center mt-2 max-w-[100px]">{name}</Text>
  </View>
);

export default ViewRide;