import { View, Text, TextInput, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import React, { useState } from 'react';
import { Rating } from 'react-native-elements';
import tw from 'twrnc'; // Import Tailwind CSS for React Native
import { AntDesign } from '@expo/vector-icons';

const compliments = [
  { id: 1, label: 'No Compliment', icon: '😐' },
  { id: 2, label: 'Safe Driver', icon: '🛡️' },
  { id: 3, label: 'Professional', icon: '👔' },
  { id: 4, label: 'Route Expert', icon: '🗺️' },  // Map symbol for navigation/route expertise
  { id: 5, label: 'Service', icon: '🚗' },  // Corrected "Serviice" to "Service"
];


const Giverate: React.FC<{ visible: boolean; onClose: () => void }> = ({ visible, onClose }) => {
  const [rating, setRating] = useState(0)
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
          //https://via.placeholder.com/150
            source={{ uri: 'data:image/jpeg;base64,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' }} // Replace with an actual image URL or local image
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
          className='max-h-20'
          showsHorizontalScrollIndicator={false}
        />

        {/* Text Area for Additional Feedback */}
        <Text style={tw`text-lg font-semibold mt-5`}>Leave additional feedback</Text>
        <TextInput
          style={tw`bg-gray-100 p-3 rounded-lg mt-2 h-30`}
          multiline
          placeholder="Write your comments here..."
          textAlignVertical="top" // Ensures text starts at the top of the TextInput
        />

        {/* Done Button */}
        <View style={tw`p-5`}>
          <TouchableOpacity 
            style={tw`bg-green-600 py-3 rounded-full flex-row justify-center items-center mt-25`} 
            onPress={onClose}
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
