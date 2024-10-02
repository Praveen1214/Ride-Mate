import React from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons'; // For stars rating
import Review from "./Review";

const ViewRide = () => {
  return (
    <ScrollView className="flex-1 bg-gray-100">
      {/* Rider Info Section */}
      <View className="flex-row justify-between items-center mb-5 mt-4 p-3">
        <Avatar
          rounded
          title="JD"
          size="medium"
          containerStyle={{ backgroundColor: 'black' }}
          titleStyle={{ color: 'white' }} // Make text visible on black background
        />
        <View className="flex-1 ml-3 mr-3">
          <Text className="text-lg font-bold">Praveen de Silva</Text>
          <Text className="text-gray-500">4.8 ★ | 10 reviews</Text>
          <Text className="text-sm text-gray-500">Joined 2024</Text>
        </View>
        <Text className="text-xl font-bold">LKR 275.56</Text>
      </View>

      {/* Ride Details Section */}
      <View className="bg-white rounded-lg p-4 mb-5 mx-3">
        <Text className="text-base font-bold mb-3">Ride Details</Text>
        <View>
          <View className="left-[80px] top-[1.53px]">
            <Text className="text-black text-sm font-semibold">Anuradhapura</Text>
            <TouchableOpacity>
              <Text className="absolute left-[165px] text-green-600 text-[15px] font-medium">Map view</Text>
            </TouchableOpacity>
            {/* Horizontal line */}
            <View className="w-28 h-[1px] bg-gray-300 mt-2" />
            <Text className="mt-2 text-black text-sm font-semibold">Colombo</Text>
          </View>

          {/* Labels for Pickup and Drop */}
          <View className="absolute left-[18px] top-[1px]">
            <Text className="text-black text-[11px] font-medium">PICKUP</Text>
            <View className="flex items-center">
              {/* Vertical Line with Circles */}
              <View className="w-[6px] h-[6px] bg-black rounded-full" />
              <View className="w-[1px] h-[14px] bg-black mx-2" />
              <View className="w-[6px] h-[6px] bg-black rounded-full" />
            </View>
            <Text className="absolute top-[41px] text-black text-[11px] font-medium">DROP</Text>
          </View>
        </View>

        <View className="border-b border-gray-300 my-3 mt-6" />

        <View className="flex-row justify-between">
          <View>
            <Text className="text-xs text-gray-500">Start time</Text>
            <Text className="text-sm font-bold">5 Aug, 9.30 a.m</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-500">Ride with</Text>
            <Text className="text-sm font-bold">5 Peoples</Text>
          </View>
          <View>
            <Text className="text-xs text-gray-500">Luggage cap.</Text>
            <Text className="text-sm font-bold">Low</Text>
          </View>
        </View>
      </View>

      {/* Passengers Details */}
      <View className="bg-white rounded-lg p-4 mb-5 mx-3">
        <Text className="text-base text-green-600 font-bold mb-3">2 seats Booked Male - 1 Female - 1</Text>
        <View className="flex-row items-center">
          {/* First Passenger */}
          <View className="flex flex-col items-center">
            <Avatar
              rounded
              title="JD"
              size="medium"
              containerStyle={{ backgroundColor: 'black' }}
              titleStyle={{ color: 'white' }}
            />
            <View className="w-24 flex items-center justify-center">
              <Text className="text-center">Jayedewa Archchci</Text>
            </View>
          </View>

          {/* Second Passenger */}
          <View className="flex flex-col items-center mb-3">
            <Avatar
              rounded
              title="JD"
              size="medium"
              containerStyle={{ backgroundColor: 'black' }}
              titleStyle={{ color: 'white' }}
            />
            <View className="w-24 flex items-center justify-center">
              <Text className="text-center">Praveen Silva</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Vehicle Info */}
      <View className="bg-green-600 rounded-lg p-6 mb-5 relative mx-3">
        <View className="absolute right-2 top-2 flex-row items-center bg-white px-2 rounded-lg">
          <Icon name="star" color="gold" />
          <Text className="ml-1">4.8</Text>
        </View>
        <View className="ml-3">
          <Text className="text-lg font-bold">QP8695</Text>
          <Text className="text-white text-sm">Tuk</Text>
          <Text className="text-ls">Facilities:</Text>
          <Text className="text-white text-sm">AC, luggage space - small, Music</Text>
        </View>
      </View>

      {/* Action Buttons */}
      <View className="flex-row justify-between mt-5 mx-3">
        <TouchableOpacity className="bg-green-500 px-14 py-2 rounded">
          <Text className="text-white text-center">Request ride</Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-gray-400 px-16 py-3 rounded">
          <Text className="text-white text-center">Message</Text>
        </TouchableOpacity>
      </View>
      <View className='mt-10'>
      <Review />
      </View>
      
    </ScrollView>
  );
};

export default ViewRide;
