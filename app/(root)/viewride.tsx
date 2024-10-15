
import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Avatar } from "react-native-elements";
import Review from "./Review";
import axios from "axios";
import { useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, Ionicons, AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";


const ViewRide = () => {
  const [rideDetails, setRideDetails] = useState(null);
  const [requestedRides, setRequestedRides] = useState([]);
  const route = useRoute();
  const router = useRouter();
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
          `http://192.168.43.196:5000/api/offerride/getallofferrides/${contact}`
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
          `http://192.168.43.196:5000/api/requestride/getrequestrides/${contact}`
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
        "http://192.168.43.196:5000/api/requestride/addfindride",
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
        <Text className="ml-4 text-2xl font-bold text-white">ViewRide</Text>
      </View>
    </View>
      {/* Rider Info Section */}
      <View className="flex-row items-center p-4 mb-2 bg-white">
        <Avatar
          rounded
          title={rideDetails.driver.charAt(0)}
          size="medium"
          containerStyle={{ backgroundColor: "black" }}
        />
        <View className="flex-1 ml-4">
          <Text className="text-lg font-bold"> {rideDetails.driver} </Text>
          <View className="flex-row items-center mt-1">
            <FontAwesome name="star" size={16} color="#FFD700" />
            <Text className="ml-1 text-sm text-gray-600">
              {" "}
              4.8 • 10 reviews{" "}
            </Text>
          </View>
          <Text className="mt-1 text-sm text-gray-500">
            {" "}
            Contact: {rideDetails.contact}{" "}
          </Text>
        </View>

        <Text className="text-xl font-bold">
          {" "}
          LKR {rideDetails.price.toFixed(2)}{" "}
        </Text>

      </View>

      {/* Ride Details Section */}
      <View className="p-4 mx-2 mb-2 bg-white rounded-lg">
        <Text className="mb-4 text-lg font-bold"> Ride Details </Text>
        <View className="flex-row items-center">
          <View className="mb-4">
            <View className="flex-row items-center mb-2">
              <View className="p-2 mr-3 bg-orange-100 rounded-full">
                <Ionicons name="location-sharp" size={16} color="#FFA500" />
              </View>
              <View>
                <Text className="text-sm font-medium text-gray-800">
                  {" "}
                  {rideDetails.start.address}{" "}
                </Text>
              </View>
            </View>
            <View className="w-0.5 h-4 bg-[#0C6C41] ml-4" />
            <View className="flex-row items-center">
              <View className="p-2 mr-3 bg-blue-100 rounded-full">
                <Ionicons name="location-sharp" size={16} color="#08019C" />
              </View>
              <View>
                <Text className="text-sm font-medium text-gray-800">
                  {" "}
                  {rideDetails.end.address}{" "}
                </Text>
              </View>
            </View>
          </View>
          <TouchableOpacity className="px-2 py-1">
            <Text className="mb-6 ml-32 font-bold text-green-600">
              {" "}
              Map view{" "}
            </Text>
          </TouchableOpacity>
        </View>

        <View className="h-0.5 bg-gray-200 my-4" />

        <View className="flex-row justify-between">
          <RideInfoItem
            title="Start time"
            value={new Date(rideDetails.datetime).toLocaleString()}
          />
          <RideInfoItem
            title="Luggage cap."
            value={rideDetails.luggagecapacity}
          />
          <RideInfoItem title="Vehicle" value={rideDetails.vehicletype} />
        </View>
      </View>

      <PassengerDetails />

      {/* Vehicle Info */}
      <View className="p-4 mx-2 mb-2 bg-green-600 rounded-lg">
        <View className="absolute flex-row items-center px-2 py-1 bg-white rounded right-2 top-2">
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text className="ml-1 font-bold"> 4.8 </Text>
        </View>
        <Text className="mb-2 text-2xl font-bold text-white">
          {" "}
          {rideDetails.vehicletype}{" "}
        </Text>
        <Text className="mb-1 text-base text-white"> Facilities: </Text>
        <Text className="text-sm text-white"> {rideDetails.facilities} </Text>
      </View>

      {/* Action Buttons */}

      <View className="flex-row justify-between mx-2 mt-4 mb-4">
        {!rideRequested ? (
          <TouchableOpacity
            className="flex-1 px-6 py-3 mr-2 bg-green-500 rounded"
            onPress={handleScheduleRide}
          >
            <Text className="font-bold text-center text-white">
              {" "}
              Request Ride{" "}
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="flex-1 px-6 py-3 mr-2 bg-green-500 rounded"
            onPress={() =>
              navigation.navigate("real_tracking", {
                startAddress: rideDetails.start,
                endAddress: rideDetails.end,
                startLatitude: rideDetails.start.latitude,
                startLongitude: rideDetails.start.longitude,
                endLatitude: rideDetails.end.latitude,
                endLongitude: rideDetails.end.longitude,
                driverName: rideDetails.driver,
                passengerDetails: requestedRides // Pass all requested rides (passengers)
              })
            }
          >
            <Text className="font-bold text-center text-white"> View Map </Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity className="flex-1 px-6 py-3 ml-2 bg-gray-400 rounded">
          <Text className="font-bold text-center text-white"> Message </Text>

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
    <Text className="mb-1 text-sm text-gray-500"> {title} </Text>
    <Text className="text-sm font-bold"> {value} </Text>
  </View>
);

export default ViewRide;
