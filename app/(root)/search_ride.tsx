import { View, Text, Image,TextInput,TouchableOpacity, } from 'react-native'
import { Link, router, Slot } from 'expo-router'
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react'

const search_ride = () => {
  return (
    <View className='w-full flex-1 items-center'>
        <View className="w-[339px] h-11 pl-[21px] pr-[17.25px] bg-[#e0e0e0] rounded-[10px] flex-row justify-between items-center mt-5 ">
  {/* Placeholder Text */}
  <TextInput
    placeholder="Search Rides"
    placeholderTextColor="#" // Placeholder text color
    className="text-xs text-black font-normal" // Ensures typed text is black
   
  />
  {/* Placeholder for Search Icon */}
  <View className="w-[24.36px] h-[22px] bg-transparent">
    <AntDesign name="search1" size={24} color="black" />
  </View>
</View>

<TouchableOpacity onPress={()=>router.navigate('/viewride')} className="w-[346px] h-[158px] relative bg-[#0c6c41]/5 rounded-[15px]  mt-6">
      {/* Ride Details */}
      <View className="absolute left-[80px] top-[11.53px]">
        {/* <Text className="text-black text-sm font-semibold">Anuradhapura</Text> */}
        <Text className="absolute left-[165px] top-[24.22px] text-black text-[15px] font-medium">LKR 1000.00</Text>
        {/* <Text className="mt-4 text-black text-sm font-semibold ml-2">Colombo</Text> */}
      </View>

      {/* Labels for Pickup and Drop */}
      <View className="mt-2 ml-4">
        <View className="flex-row items-center mb-2">
          <View className="bg-orange-100 rounded-full p-2 mr-3">
            <Ionicons name="location-sharp" size={16} color="#FFA500" />
          </View>
          <View>
            <Text className="text-sm font-medium text-gray-800">
             Anuradhapura
            </Text>
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
          </View>
        </View>
      </View>



      {/* Line between Pickup and Drop */}
      <View className="absolute left-[58px] mt-12 w-[138px] border border-black/30"></View>

      <View className="top-[80px] w-full border border-black/30" style={{ borderStyle: 'dotted' }}></View>

      {/* Driver Info and Arrival Time */}
      <View className="absolute left-[18px] top-[92px] flex-row justify-between items-center w-full pr-4">
            

        {/* Driver and Rating */}
        <View className="flex-row items-center mt-3">
          <View className="w-9 h-9 rounded-full bg-gray-200 justify-center items-center">
            {/* Placeholder for driver's image */}
            <Image source={{ uri: 'https://placekitten.com/0' }} className="w-full h-full rounded-full bg-gray-400" />
          </View>
          <View className="ml-4">
            <Text className="text-black text-[13px] font-medium">Praveen de silva</Text>
            <Text className="text-black text-[10px] font-normal ">10:30 a.m | 4.8 ★</Text>
          </View>
        </View>

        {/* Time and Car Info */}
        <View className="flex items-center px-10 mt-2">
          <Text className="text-black text-[10px] font-semibold">In 10 mins</Text>
          <View className="flex-col items-center">
            {/* Placeholder for car icon */}
           <Ionicons name="car-sport-outline" size={24} color="black" />
            <Text className="text-[#474747] text-[10px] font-normal ">Car</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    
    </View>
  )
}

export default search_ride