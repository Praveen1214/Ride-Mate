import React, { useCallback, useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import axios from "axios";
import { useFocusEffect, useRouter } from "expo-router";
import { Avatar } from 'react-native-elements';
import { FontAwesome } from '@expo/vector-icons';
import Review from "./Review";
import { Ionicons,AntDesign } from "@expo/vector-icons";
import { router } from 'expo-router';
import Entypo from '@expo/vector-icons/Entypo';



const ViewRide = () => {
  const [rideDetails, setRideDetails] = useState(null);
  const [requestedRides, setRequestedRides] = useState([]);
  const route = useRoute();
  const { contact } = route.params || {};
  const [userName, setUserName] = useState("");
  const [passengercontact, setPassengerContact] = useState("");
  const [passengergender, setPassengerGender] = useState("");
  const navigation = useNavigation();
  const [rideRequested, setRideRequested] = useState(false); // New state to track ride request status

  useEffect(() => {
    const fetchRideDetails = async () => {
      if (!contact) {
        console.error("No contact provided");
        return;
      }
      try {
        const response = await axios.post(
          `http://192.168.8.174:5000/api/offerride/getallofferrides/${contact}`
        );
        if (response.data.ride && response.data.ride.length > 0) {
          setRideDetails(response.data.ride[0]);
        } else {
          console.log("No ride details found");
        }
      } catch (error) {
        console.error("Error fetching ride details:", error);
      }
    };
    fetchRideDetails();

    const getPassengerDetails = async () => {
      try {
        const passengerDetailsString =
          await AsyncStorage.getItem("passengerDetails");

        if (passengerDetailsString) {
          const passengerDetails = JSON.parse(passengerDetailsString);
          setUserName(
            passengerDetails.firstname + " " + passengerDetails.lastname
          );
          setPassengerContact(passengerDetails.contact);
          setPassengerGender(passengerDetails.gender);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    getPassengerDetails();

    const fetchReqDetails = async () => {
      if (!contact) {
        console.error("No contact provided");
        return;
      }
      try {
        const response = await axios.post(
          `http://192.168.8.174:5000/api/requestride/getrequestrides/${contact}`
        );
        if (response.data.ride && response.data.ride.length > 0) {
          setRequestedRides(response.data.ride);
          console.log("Ride details found: ", response.data.ride);
        } else {
          console.log("No ride details found");
        }
      } catch (error) {
        console.error("Error fetching ride details:", error);
      }
    };
    fetchReqDetails();
  }, [contact, userName, passengercontact, passengergender]);

  const handleScheduleRide = async () => {
    try {
      const response = await axios.post(
        "http://192.168.8.174:5000/api/requestride/addfindride",
        {
          passenger: userName,
          passengercontact,
          passengergender,
          driver: rideDetails.driver,
          drivercontact: contact,
          start: rideDetails.start,
          end: rideDetails.end,
          datetime: new Date(rideDetails.datetime).toISOString(),
          price: parseFloat(rideDetails.price)
        }
      );

      if (response.status === 200) {
        setRideRequested(true); // Set to true on successful ride request
        Alert.alert("Success", "Ride request successfully!", [
          {
            text: "OK",
            onPress: () => console.log("Ride Requested")
          }
        ]);
      }
    } catch (error) {
      console.error("Error details:", error.response?.data);
      Alert.alert("Error", "Failed to request ride. Please try again later.", [
        { text: "OK" }
      ]);
    }
  };

  const PassengerDetails = () => {
    const maleCount = requestedRides.filter(
      (ride) => ride.passengergender === "Male"
    ).length;
    const femaleCount = requestedRides.filter(
      (ride) => ride.passengergender === "Female"
    ).length;

    return (
      <View className="p-4 mx-2 mb-2 bg-white rounded-lg">
        <Text className="mb-4 text-lg font-bold"> Passengers Details </Text>
        <Text className="mb-2">
          {" "}
          {requestedRides.length} seats Booked Male - {maleCount} Female -{" "}
          {femaleCount}{" "}
        </Text>
        {requestedRides.map((ride, index) => (
          <View key={index} className="flex-row items-center mb-2">
            <Avatar
              rounded
              title={ride.passenger.charAt(0)}
              size="small"
              containerStyle={{ backgroundColor: "black", marginRight: 10 }}
            />
            <Text> {ride.passenger} </Text>
          </View>
        ))}
      </View>
    );
  };

  if (!rideDetails) {
    return <Text>Loading...</Text>;
  }


 
  return (
    <ScrollView className="flex-1 bg-gray-100">
       <View className="bg-[#0C6C41] p-4 mt-7">
      <View className="flex-row items-center">
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-2xl font-bold text-white ml-4">ViewRide</Text>
      </View>
    </View>
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
        <View>
        <Text className="text-xl font-bold">LKR 275.56</Text>
        <View className="ml-9  mt-4">
        <Entypo name="mail" size={24} color="gray" />
        </View>
      
        </View>
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
      <View className="flex-row justify-between mt-4 mx-1 ml-2 mr-0 mb-4 ">
        <TouchableOpacity className="bg-green-700 px-6 py-3 w-full h-14 rounded flex-1 mr-2">
          <Text className="text-white text-xl text-center font-bold ">Request ride</Text>
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