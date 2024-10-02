import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { ChevronLeft, Upload } from 'lucide-react';
import { SafeAreaView } from 'react-native-safe-area-context';

const DocumentUploadField = ({ title, onPress }) => (
  <TouchableOpacity 
    onPress={onPress}
    className="border border-dashed border-gray-300 rounded-lg p-4 flex-row items-center mt-2"
  >
    <Upload size={24} className="text-gray-400 mr-2" />
    <Text className="text-gray-600">{title}</Text>
  </TouchableOpacity>
);

const DriverRegistration = () => {
  const [documents, setDocuments] = useState({
    profilePhoto: null,
    nicFront: null,
    nicRear: null,
    licenseFront: null,
    licenseRear: null,
  });

  const handleUpload = (docType) => {
    // Implement document upload logic here
    console.log(`Uploading ${docType}`);
    // After successful upload, update the state
    setDocuments(prev => ({ ...prev, [docType]: 'uploaded' }));
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-4 border-b border-gray-200 flex-row items-center">
        <TouchableOpacity>
          <ChevronLeft size={24} className="text-gray-800" />
        </TouchableOpacity>
        <Text className="text-xl font-semibold ml-4">Register as Driver</Text>
      </View>
      
      <ScrollView className="flex-1 p-4">
        <Text className="text-2xl font-bold mb-4">Personal Document Upload</Text>
        
        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <Text className="text-lg font-semibold mb-2">Profile Photo</Text>
          {documents.profilePhoto ? (
            <Image source={{ uri: documents.profilePhoto }} className="w-full h-40 rounded-lg" />
          ) : (
            <DocumentUploadField title="Profile Photo" onPress={() => handleUpload('profilePhoto')} />
          )}
        </View>
        
        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <Text className="text-lg font-semibold mb-2">National Identity Card</Text>
          <DocumentUploadField title="NIC - Front" onPress={() => handleUpload('nicFront')} />
          <DocumentUploadField title="NIC - Rear" onPress={() => handleUpload('nicRear')} />
        </View>
        
        <View className="bg-gray-50 rounded-lg p-4 mb-4">
          <Text className="text-lg font-semibold mb-2">Driving License</Text>
          <DocumentUploadField title="Driving License - Front" onPress={() => handleUpload('licenseFront')} />
          <DocumentUploadField title="Driving License - Rear" onPress={() => handleUpload('licenseRear')} />
        </View>
        
        <TouchableOpacity 
          className="bg-green-600 py-3 px-4 rounded-lg mt-4"
          onPress={() => console.log('Submit registration')}
        >
          <Text className="text-white text-center font-semibold">Submit Registration</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default DriverRegistration;