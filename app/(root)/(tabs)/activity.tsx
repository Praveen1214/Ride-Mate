import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  Modal,
} from "react-native";
import Giverate from "./Giverate";

type ActivityStatus = "Ongoing" | "Completed" | "Complaint" | "Cancelled";

interface Activity {
  id: string;
  type: string;
  date: string;
  time: string;
  forPerson: string;
  phoneNumber: string;
  pickup: string;
  pickupTime: string;
  drop: string;
  dropTime: string;
  status: ActivityStatus;
  amount: number;
  driverName?: string;
  vehicleInfo?: string;
  estimatedArrival?: string;
}

const ActivityCard: React.FC<{ activity: Activity }> = ({ activity }) => {
  const [showRating, setShowRating] = useState(false);
  const isOngoing = activity.status === "Ongoing";

  return (
    <View className="bg-white p-5 mx-4 my-3 rounded-lg shadow-md">
      <StatusBar barStyle="light-content" backgroundColor="#fffff" />
      <View className="flex-row justify-between mb-3">
        <View>
          <Text className="text-sm font-medium text-gray-800">
            {activity.forPerson}
          </Text>
          <Text className="text-xs text-gray-600">{activity.phoneNumber}</Text>
        </View>
        <View className="items-end">
          <Text className="text-sm font-medium text-gray-800">
            {activity.date}
          </Text>
          <Text className="text-xs text-gray-600">{activity.time}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <View
          className={`px-3 py-1 rounded-full ${isOngoing ? "bg-[#FFF4E5]" : "bg-[#E6F0EB]"}`}
        >
          <Text
            className={`text-sm font-medium ${isOngoing ? "text-[#FF9500]" : "text-[#0C6C41]"}`}
          >
            {activity.status}
          </Text>
        </View>

        {!isOngoing && !showRating && (
          <TouchableOpacity
            className="bg-[#0C6C41] px-4 py-2 rounded-full"
            onPress={() => setShowRating(true)}
          >
            <Text className="text-sm font-medium text-white">Rate now</Text>
          </TouchableOpacity>
        )}
      </View>

      {isOngoing && (
        <View className="mb-4 bg-[#F3F4F6] p-3 rounded-lg">
          <View className="flex-row items-center mb-2">
            <Ionicons name="person-circle-outline" size={24} color="#0C6C41" />
            <Text className="text-sm font-medium text-gray-800 ml-2">
              {activity.driverName}
            </Text>
          </View>
          <View className="flex-row items-center mb-2">
            <Ionicons name="car-outline" size={24} color="#0C6C41" />
            <Text className="text-sm text-gray-600 ml-2">
              {activity.vehicleInfo}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="time-outline" size={24} color="#0C6C41" />
            <Text className="text-sm text-gray-600 ml-2">
              Estimated arrival: {activity.estimatedArrival}
            </Text>
          </View>
        </View>
      )}

      <View className="mb-4">
        <View className="flex-row items-center mb-2">
          <View className="bg-orange-100 rounded-full p-2 mr-3">
            <Ionicons name="location-sharp" size={16} color="#FFA500" />
          </View>
          <View>
            <Text className="text-sm font-medium text-gray-800">
              {activity.pickup}
            </Text>
            <Text className="text-xs text-gray-600">{activity.pickupTime}</Text>
          </View>
        </View>
        <View className="w-0.5 h-4 bg-[#0C6C41] ml-4" />
        <View className="flex-row items-center">
          <View className="bg-blue-100 rounded-full p-2 mr-3">
            <Ionicons name="location-sharp" size={16} color="#08019C" />
          </View>
          <View>
            <Text className="text-sm font-medium text-gray-800">
              {activity.drop}
            </Text>
            <Text className="text-xs text-gray-600">{activity.dropTime}</Text>
          </View>
        </View>
      </View>

      {!isOngoing && (
        <View className="flex-row justify-between items-center border-t border-gray-200 pt-4">
          <Text className="text-base font-medium text-gray-700">Price</Text>
          <View className="flex-row items-center">
            <Text className="text-base font-bold text-[#0C6C41] mr-2">
              LKR {activity.amount.toFixed(2)}
            </Text>
            <View className="bg-[#E6F0EB] rounded-full p-1">
              <Ionicons name="cash-outline" size={16} color="#0C6C41" />
            </View>
          </View>
        </View>
      )}

      {isOngoing && (
        <TouchableOpacity className="bg-[#0C6C41] px-4 py-3 rounded-full mt-2">
          <Text className="text-sm font-medium text-white text-center">
            Contact Driver
          </Text>
        </TouchableOpacity>
      )}

      {showRating && (
        <Giverate onClose={() => setShowRating(false)} />
      )}
    </View>
  );
};

const RideSharingActivity: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActivityStatus>("Ongoing");

  const activities: Activity[] = [
    {
      id: "1",
      type: "Rides",
      date: "02 October 2024",
      time: "10:30 AM",
      forPerson: "Sasindu",
      phoneNumber: "786073966",
      pickup: "3A, Welivita Road, Malabe, Colombo",
      pickupTime: "10:30 AM",
      drop: "744/1, B47, Sri Jayawardenepura Kotte, Colombo",
      dropTime: "11:00 AM",
      status: "Ongoing",
      amount: 0,
      driverName: "Kumara Perera",
      vehicleInfo: "Toyota Prius - CAR 1234",
      estimatedArrival: "5 minutes",
    },
    {
      id: "2",
      type: "Rides",
      date: "29 September 2024",
      time: "02:18 PM",
      forPerson: "Sasindu",
      phoneNumber: "786073966",
      pickup: "3A, Welivita Road, Malabe, Colombo",
      pickupTime: "02:18 PM",
      drop: "744/1, B47, Sri Jayawardenepura Kotte, Colombo",
      dropTime: "02:40 PM",
      status: "Completed",
      amount: 450.6,
    },
    {
      id: "3",
      type: "Rides",
      date: "27 September 2024",
      time: "02:52 PM",
      forPerson: "Sasindu",
      phoneNumber: "786073966",
      pickup: "538, A2, Colombo 03, Colombo",
      pickupTime: "02:52 PM",
      drop: "20, Srimath Anagarika Mawatha, Colombo",
      dropTime: "02:59 PM",
      status: "Completed",
      amount: 270.14,
    },
  ];

  const platformSpecificStyle = Platform.select({
    ios: "mb-4",
    android: "mb-5 mt-8",
  });

  return (
    <SafeAreaView
      className={`flex-1 bg-gray-100 ${platformSpecificStyle} text-black`}
    >
      <StatusBar
        barStyle="light-content"
        backgroundColor="#000000"
        text-black
      />
      <View className="bg-white px-5 py-4 flex-row justify-between items-center border-b border-gray-200">
        <Text className="text-2xl font-bold text-[#0C6C41]">
          Your activities
        </Text>
        <TouchableOpacity>
          <Ionicons name="menu" size={28} color="#0C6C41" />
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-around bg-white py-2 border-b border-gray-200">
        {["Ongoing", "Completed", "Complaint", "Cancelled"].map((tab) => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab as ActivityStatus)}
            className={`py-2 px-3 ${
              activeTab === tab ? "border-b-2 border-[#0C6C41]" : ""
            }`}
          >
            <Text
              className={
                activeTab === tab
                  ? "text-[#0C6C41] font-medium"
                  : "text-gray-600"
              }
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <ScrollView className="flex-1">
        {activities
          .filter((activity) => activity.status === activeTab)
          .map((activity) => (
            <ActivityCard key={activity.id} activity={activity} />
          ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default RideSharingActivity;
