import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, FlatList, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';


const RideCard = ({ ride }) => (
  <TouchableOpacity 
    onPress={() => router.navigate('/viewride')} 
    className="bg-white rounded-xl p-4 mb-4 shadow-md"
  >
    <View className="flex-row justify-between items-center mb-4">
      <View className="flex-row items-center">
        <Image source={{ uri: ride.driverImage }} className="w-12 h-12 rounded-full mr-3" />
        <View>
          <Text className="text-lg font-semibold text-gray-800">{ride.driverName}</Text>
          <View className="flex-row items-center">
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text className="text-sm text-gray-600 ml-1">{ride.rating}</Text>
          </View>
        </View>
      </View>
      <View className="items-end">
        <Text className="text-lg font-bold text-green-600">LKR {ride.price}</Text>
        <Text className="text-sm text-gray-500">{ride.distance}</Text>
      </View>
    </View>
    
    <View className="flex-row items-center mb-4">
      <View className="mr-4">
        <View className="w-3 h-3 rounded-full bg-blue-500 mb-1" />
        <View className="w-0.5 h-10 bg-gray-300 ml-1.5" />
        <View className="w-3 h-3 rounded-full bg-green-500 mt-1" />
      </View>
      <View className="flex-1">
        <Text className="text-base text-gray-800 mb-2">{ride.pickup}</Text>
        <Text className="text-base text-gray-800">{ride.dropoff}</Text>
      </View>
    </View>
    
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <MaterialCommunityIcons name="car-hatchback" size={24} color="#4A5568" />
        <Text className="text-sm text-gray-600 ml-2">{ride.carType}</Text>
      </View>
      <View className="flex-row items-center">
        <Ionicons name="time-outline" size={20} color="#4A5568" />
        <Text className="text-sm text-gray-600 ml-1">Arrives in {ride.eta} mins</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const SearchRide = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const rideData = [
    { 
      id: '1', 
      pickup: '123 Main St, Anuradhapura', 
      dropoff: '456 Park Ave, Colombo', 
      price: '1,000.00', 
      driverName: 'Praveen de Silva', 
      driverImage: 'https://i.pravatar.cc/300', 
      rating: '4.8', 
      eta: '10', 
      carType: 'Toyota Prius', 
      distance: '7.2 km'
    },
    { 
      id: '2', 
      pickup: '789 Oak Rd, Kandy', 
      dropoff: '101 Beach Blvd, Galle', 
      price: '1,200.00', 
      driverName: 'Samantha Perera', 
      driverImage: 'https://i.pravatar.cc/300?img=5', 
      rating: '4.9', 
      eta: '8', 
      carType: 'Honda Civic', 
      distance: '6.8 km'
    },
    // Add more ride data as needed
  ];

  return (
    <SafeAreaView className="flex-1 bg-gray-100 mt-6">
    <StatusBar barStyle="dark-content" />
    <View className="bg-[#0C6C41] p-4">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white ml-4">SearchRide</Text>
      </View>
    </View>
      <View className="px-4 py-2 mt-2">
        <View className="flex-row items-center bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
          <AntDesign name="search1" size={20} color="#4A5568" />
          <TextInput
            placeholder="Where to?"
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
            className="flex-1 ml-2 text-base text-gray-800 "
          />
        </View>
        
        <Text className="text-xl font-bold text-gray-800 mb-4">Available Rides</Text>
        
        <FlatList
          data={rideData}
          renderItem={({ item }) => <RideCard ride={item} />}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchRide;