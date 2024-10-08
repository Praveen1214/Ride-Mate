import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, SafeAreaView, FlatList, StatusBar } from 'react-native';
import { router } from 'expo-router';
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const RideCard = ({ ride }) => (
  <TouchableOpacity 
    onPress={() => router.navigate('/viewride')} 
    style={{ backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}
  >
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image source={{ uri: ride.driverImage }} style={{ width: 48, height: 48, borderRadius: 24, marginRight: 12 }} />
        <View>
          <Text style={{ fontSize: 18, fontWeight: '600', color: '#4A5568' }}>{ride.driverName}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <AntDesign name="star" size={16} color="#FFD700" />
            <Text style={{ fontSize: 14, color: '#718096', marginLeft: 4 }}>{ride.rating}</Text>
          </View>
        </View>
      </View>
      <View style={{ alignItems: 'flex-end' }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#48BB78' }}>LKR {ride.price}</Text>
        <Text style={{ fontSize: 14, color: '#A0AEC0' }}>{ride.distance}</Text>
      </View>
    </View>
    
    {/* Pickup and Dropoff Section */}
   <View className="mb-4">
  <View className="flex-row items-center mb-">
    <View className=" rounded-full  mr-3">
    <Ionicons name="location-sharp" size={25} color="#FFA500" />
    </View>
    <View>
      <Text className="text-sm font-medium text-gray-800">
        Anuradhapura
      </Text>
      <Text className="text-xs text-gray-600">Description</Text>
    </View>
    {/* Clock Icon and Arrival Text on the Same Line */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}> 
      <Ionicons name="time-outline" size={20} color="#4A5568" />
      <Text style={{ fontSize: 14, color: '#718096', marginLeft: 4 }}>Arrives in {ride.eta} mins</Text>
    </View>
  </View>

  <View className="w-0.5 h-4 bg-[#0C6C41] ml-3" />

  <View className="flex-row items-center">
    <View className=" rounded-full  mr-3">
    <Ionicons name="location-sharp" size={25} color="#08019C" />
    </View>
    <View>
      <Text className="text-sm font-medium text-gray-800">
        Colombo
      </Text>
      <Text className="text-xs text-gray-600">Description</Text>
    </View>
    {/* Car Icon and Car Type Text on the Same Line */}
    <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
      <MaterialCommunityIcons name="car-hatchback" size={24} color="#4A5568" />
      <Text style={{ fontSize: 14, color: '#718096', marginLeft: 8 }}>{ride.carType}</Text>
    </View>
  </View>
</View>

    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
       
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        
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
    <SafeAreaView style={{ flex: 1, backgroundColor: '#F7FAFC', marginTop: 24 }}>
      <StatusBar barStyle="dark-content" />
      <View style={{ backgroundColor: '#0C6C41', padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => router.back()}>
            <AntDesign name="arrowleft" size={24} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 24, fontWeight: '700', color: 'white', marginLeft: 16 }}>SearchRide</Text>
        </View>
      </View>
      <View style={{ paddingHorizontal: 16, paddingVertical: 8, marginTop: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', borderRadius: 50, paddingHorizontal: 16, paddingVertical: 8, marginBottom: 16, shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10 }}>
          <AntDesign name="search1" size={20} color="#4A5568" />
          <TextInput
            placeholder="Where to?"
            placeholderTextColor="#A0AEC0"
            value={searchQuery}
            onChangeText={setSearchQuery}
            style={{ flex: 1, marginLeft: 8, fontSize: 16, color: '#2D3748' }}
          />
        </View>
        
        <Text style={{ fontSize: 20, fontWeight: '700', color: '#2D3748', marginBottom: 16 }}>Available Rides</Text>
        
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
