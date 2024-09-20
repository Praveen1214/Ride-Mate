import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { ArrowLeft } from "lucide-react";

const OfferRideScreen = () => {
  const [pickup, setPickup] = useState("Location fetched");
  const [drop, setDrop] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="bg-[#0C6C41] py-4 px-4 flex-row items-center">
        {/* <ArrowLeft color="#fff" size={24} /> */}
        <Text className="text-white text-xl font-bold ml-4">Offer Ride</Text>
      </View>

      <View className="p-5 flex-1">
        <View className="flex-row">
          <View className="flex-1">
            <View className="mb-0">
              <View className="flex-row items-center gap-10">
                <Text className="text-gray-500 text-sm mb-1 font-medium">PICKUP</Text>
                <Text className="text-black text-base">{pickup}</Text>
              </View>
              <View className="absolute h-[1px] bg-gray-300 top-[40px] left-16 right-0" />
            </View>
            <View className="mr-4 items-left ml-2 h-10 ">
              <View className="w-3 h-3 bg-gray-400 rounded-full" />
              <View className="w-0.5 flex-1 bg-gray-300 my-1 mx-1 " />
              <View className="w-3 h-3 bg-gray-400 rounded-full" />
            </View>
            <View>
              <View className="flex-row items-center gap-10 ">
                <Text className="text-gray-500 text-sm mt-[25px] font-medium">DROP</Text>
                <TextInput
                  className="text-gray-400 text-base"
                  value={drop}
                  onChangeText={setDrop}
                  placeholder="Where are you Drop ?"
                  placeholderTextColor="#888"
                />
              </View>
            </View>
          </View>
        </View>

        <Text className="text-gray-500 text-sm mt-6 mb-2">DATE AND TIME</Text>

        <TouchableOpacity className="bg-[#0C6C41] py-4 rounded-md mt-4">
          <Text className="text-white text-center text-base font-semibold">
            SET LOCATION ON MAP
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default OfferRideScreen;
