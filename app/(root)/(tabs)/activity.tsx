import React from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  MapPinIcon,
  PhoneIcon,
  ChatBubbleLeftIcon,
  ClockIcon,
  CurrencyDollarIcon,
  MapIcon,
} from "react-native-heroicons/outline";

interface RideRequest {
  id: string;
  pickup: string;
  drop: string;
  riderName: string;
  estimatedEarnings: string;
  distance: string;
  duration: string;
  passengerRating: number;
}

const rideRequests: RideRequest[] = [
  {
    id: "1",
    pickup: "Anuradhapura",
    drop: "Maradana",
    riderName: "Ahmed Ali",
    estimatedEarnings: "$25.00",
    distance: "15.5 km",
    duration: "25 min",
  },
  {
    id: "2",
    pickup: "Anuradhapura",
    drop: "Colombo",
    riderName: "Samantha Perera",
    estimatedEarnings: "$35.00",
    distance: "22 km",
    duration: "40 min",
  },
];

const primaryColor = "#169958";

const Requests: React.FC = () => {
  const renderRideRequest = ({ item }: { item: RideRequest }) => (
    <View className="bg-white rounded-lg p-4 mb-4 shadow-md">
      <View className="flex-row justify-between items-center mb-4">
        <View className="flex-row items-center">
          <CurrencyDollarIcon size={24} color={primaryColor} />
          <Text className="text-lg font-bold text-green-700 ml-2">
            {item.estimatedEarnings}
          </Text>
        </View>
        <View className="flex-row space-x-4">
          <View className="flex-row items-center">
            <MapIcon size={16} color={primaryColor} />
            <Text className="text-gray-600 ml-1">{item.distance}</Text>
          </View>
          <View className="flex-row items-center">
            <ClockIcon size={16} color={primaryColor} />
            <Text className="text-gray-600 ml-1">{item.duration}</Text>
          </View>
        </View>
      </View>

      <View className="mb-4">
        <View className="flex-row items-center mb-2">
          <MapPinIcon size={20} color={primaryColor} />
          <View className="ml-2">
            <Text className="text-xs text-gray-500">Pickup</Text>
            <Text className="text-base font-medium text-gray-800">
              {item.pickup}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center">
          <MapPinIcon size={20} color="#E53E3E" />
          <View className="ml-2">
            <Text className="text-xs text-gray-500">Drop-off</Text>
            <Text className="text-base font-medium text-gray-800">
              {item.drop}
            </Text>
          </View>
        </View>
      </View>

      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-lg font-semibold text-gray-800">
            {item.riderName}
          </Text>
        </View>
        <View className="flex-row space-x-3">
          <TouchableOpacity className="p-2 rounded-full bg-green-100">
            <PhoneIcon size={20} color={primaryColor} />
          </TouchableOpacity>
          <TouchableOpacity className="p-2 rounded-full bg-green-100">
            <ChatBubbleLeftIcon size={20} color={primaryColor} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="flex-row items-center justify-between p-4 bg-white shadow-md">
        <TouchableOpacity>
          <ChevronLeftIcon size={24} color={primaryColor} />
        </TouchableOpacity>
        <Text className="text-lg font-semibold text-gray-900">
          Available Rides
        </Text>
        <Text className="text-sm text-gray-500">25 June, 10:30 AM</Text>
      </View>

      <View className="bg-white rounded-lg p-4 m-4 shadow-lg">
        <Text className="text-lg font-bold text-gray-900 mb-2">
          Current Route
        </Text>
        <View className="flex-row items-center mb-4">
          <View className="flex-row items-center space-x-2">
            <View className="w-2 h-2 bg-green-500 rounded-full" />
            <Text className="text-base font-semibold text-gray-700">
              Anuradhapura
            </Text>
          </View>
          <View className="h-1 w-12 bg-gray-300 mx-2" />
          <View className="flex-row items-center space-x-2">
            <View className="w-2 h-2 bg-red-500 rounded-full" />
            <Text className="text-base font-semibold text-gray-700">
              Colombo
            </Text>
          </View>
        </View>
        <TouchableOpacity className="bg-green-600 rounded-full px-4 py-2 self-end">
          <Text className="text-white font-semibold">View on Map</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={rideRequests}
        renderItem={renderRideRequest}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 16, paddingHorizontal: 16 }}
      />
    </SafeAreaView>
  );
};

export default Requests;
