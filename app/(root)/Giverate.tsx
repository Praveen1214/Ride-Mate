import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, Image, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { Rating } from 'react-native-elements';
import axios from 'axios';
import tw from 'twrnc'; // Import Tailwind CSS for React Native
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const compliments = [
  { id: 1, label: 'No Compliment', icon: '😐' },
  { id: 2, label: 'Safe Driver', icon: '🛡️' },
  { id: 3, label: 'Professional', icon: '👔' },
  { id: 4, label: 'Route Expert', icon: '🗺️' },
  { id: 5, label: 'Service', icon: '🚗' },
];

const Giverate: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [rating, setRating] = useState(0);
  const [driverid, setDriverid] = useState('');
  const [userid, setUserid] = useState('');
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchPassengerDetails = async () => {
      try {
        const passengerDetailsString = await AsyncStorage.getItem('passengerDetails');
        if (passengerDetailsString) {
          const passengerDetails = JSON.parse(passengerDetailsString);
          setUserid(passengerDetails._id);
          setName(`${passengerDetails.firstname} ${passengerDetails.lastname}`);
        } else {
          Alert.alert('Error', 'No passenger details found');
        }
      } catch (error) {
        console.error('Error fetching passenger details from AsyncStorage', error);
      }
    };

    fetchPassengerDetails();
  }, []);

  const giveFeedback = async () => {
    // Validation
    if (rating === 0) {
      Alert.alert('Validation Error', 'Please select a rating.');
      return;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Please provide a description.');
      return;
    }

    const getCurrentDate = () => {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const day = String(today.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    };

    const feedback = {
      driverid,
      userid,
      name,
      date: getCurrentDate(),
      ratecount: rating,
      description,
    };

    try {
      const result = await axios.post('http://192.168.8.154:5000/api/feedback/addfeedback', feedback);
      if (!result.data.success) {
        Alert.alert('Success', 'Feedback submitted successfully'); // Display success message
        onClose(); // Close modal on successful submission
      } else {
        Alert.alert('Error', 'Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'An error occurred while submitting feedback');
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={tw`flex-1 p-5 bg-white`}>
        {/* Header */}
        <View style={tw`flex-row justify-end`}>
          <TouchableOpacity onPress={onClose}>
            <Text style={tw`text-gray-500 text-lg`}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Driver Info */}
        <View style={tw`items-center my-5`}>
          <Image
            source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuR6lY1HPFS4Q_R2A5r70ECdchXmR_n1b8g&s' }} // Replace with actual image URL
            style={tw`w-15 h-15 rounded-full bg-gray-300`}
          />
          <View style={tw`mt-2 bg-gray-100 py-1 px-3 rounded-full`}>
            <Text style={tw`font-bold text-lg`}>⭐ 4.6</Text>
          </View>
          <Text style={tw`mt-2 text-xl font-semibold`}>Eladuwage</Text>
        </View>

        {/* Rating Section */}
        <Text style={tw`text-xl font-bold text-center`}>Rate your driver</Text>
        <Text style={tw`text-center text-gray-600`}>
          What do you think about your driver’s service?
        </Text>
        <Rating
          type="custom"
          ratingCount={5}
          imageSize={40}
          startingValue={rating}
          onFinishRating={setRating}
          style={tw`self-center mb-4 mt-4`}
          ratingBackgroundColor="#D1D5DB"
          tintColor="#FFFFFD"
        />

        {/* Compliment Section */}
        <Text style={tw`text-lg font-semibold text-center mb-3`}>Give a compliment</Text>
        <FlatList
          horizontal
          data={compliments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={tw`items-center mx-2`}>
              <Text style={tw`text-3xl`}>{item.icon}</Text>
              <Text style={tw`mt-2 text-center text-sm`}>{item.label}</Text>
            </TouchableOpacity>
          )}
          className="max-h-20"
          showsHorizontalScrollIndicator={false}
        />

        {/* Text Area for Additional Feedback */}
        <Text style={tw`text-lg font-semibold mt-5`}>Leave additional feedback</Text>
        <TextInput
          style={tw`bg-gray-100 p-3 rounded-lg mt-2 h-30`}
          multiline
          placeholder="Write your comments here..."
          textAlignVertical="top"
          value={description}
          onChangeText={setDescription}
        />

        {/* Done Button */}
        <View style={tw`p-5`}>
          <TouchableOpacity
            style={tw`bg-green-600 py-3 rounded-full flex-row justify-center items-center mt-25`}
            onPress={giveFeedback}
          >
            <Text style={tw`text-white text-lg font-semibold mr-2`}>Submit Rating</Text>
            <AntDesign name="check" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default Giverate;
