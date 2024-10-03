import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";

const UploadDocumentsScreen = () => {
  const [documents, setDocuments] = useState({
    profilePhoto: { uri: null, progress: 0 },
    nicFront: { uri: null, progress: 0 },
    nicRear: { uri: null, progress: 0 },
    licenseFront: { uri: null, progress: 0 },
    licenseRear: { uri: null, progress: 0 },
  });
  const [isUploading, setIsUploading] = useState(false);

  const pickImage = async (documentKey) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled) {
      setDocuments(prev => ({
        ...prev,
        [documentKey]: { ...prev[documentKey], uri: result.assets[0].uri }
      }));
    }
  };

  const removeImage = (documentKey) => {
    setDocuments(prev => ({
      ...prev,
      [documentKey]: { uri: null, progress: 0 }
    }));
  };

  const uploadFiles = async () => {
    if (Object.values(documents).some(doc => !doc.uri)) {
      Alert.alert(
        "Incomplete Upload",
        "Please upload all required documents before proceeding."
      );
      return;
    }

    Alert.alert(
      "Confirm Upload",
      "Are you sure you want to upload these documents?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Upload", onPress: performUpload }
      ]
    );
  };

  const performUpload = async () => {
    setIsUploading(true);
    const formData = new FormData();

    Object.entries(documents).forEach(([key, value]) => {
      if (value.uri) {
        const uriParts = value.uri.split(".");
        const fileType = uriParts[uriParts.length - 1];

        formData.append(key, {
          uri: Platform.OS === "android" ? value.uri : value.uri.replace("file://", ""),
          name: `${key}.${fileType}`,
          type: `image/${fileType}`,
        });
      }
    });

    try {
      const response = await axios.post(
        "http://192.168.8.187:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setDocuments(prev => 
              Object.fromEntries(
                Object.entries(prev).map(([key, value]) => [key, { ...value, progress: percentCompleted }])
              )
            );
          },
          timeout: 60000,
        }
      );
      console.log("Files uploaded successfully", response.data);
      Alert.alert("Success", "Your documents have been uploaded successfully!");
    } catch (error) {
      console.error("Upload error:", error);
      Alert.alert(
        "Upload Failed",
        "There was an error uploading your documents. Please try again."
      );
    } finally {
      setIsUploading(false);
      setDocuments(prev => 
        Object.fromEntries(
          Object.entries(prev).map(([key, value]) => [key, { ...value, progress: 0 }])
        )
      );
    }
  };

  const renderUploadBox = (title, documentKey) => (
    <View className="mb-4">
      <Text className="text-lg font-bold mb-2">{title}</Text>
      <TouchableOpacity
        className={`border-2 rounded-lg p-2 items-center justify-center h-28 bg-white ${
          documents[documentKey].uri ? "border-solid border-green-500" : "border-dashed border-gray-300"
        }`}
        onPress={() => pickImage(documentKey)}
        accessibilityLabel={`Upload ${title}`}
        accessibilityHint="Double tap to select an image from your gallery"
      >
        {documents[documentKey].uri ? (
          <View className="w-full h-full">
            <Image source={{ uri: documents[documentKey].uri }} className="w-full h-full rounded-lg" />
            <TouchableOpacity
              className="absolute top-2 right-2 bg-red-500 rounded-full p-1"
              onPress={() => removeImage(documentKey)}
              accessibilityLabel={`Remove ${title}`}
            >
              <MaterialIcons name="close" size={20} color="white" />
            </TouchableOpacity>
          </View>
        ) : (
          <View className="items-center">
            <MaterialIcons name="add-a-photo" size={24} color="#888" />
            <Text className="text-base text-gray-500 mt-2">{title}</Text>
          </View>
        )}
      </TouchableOpacity>
      {documents[documentKey].progress > 0 && documents[documentKey].progress < 100 && (
        <View className="mt-2 bg-gray-200 rounded-full">
          <View 
            className="bg-green-500 h-2 rounded-full" 
            style={{ width: `${documents[documentKey].progress}%` }}
          />
        </View>
      )}
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-[#0C6C41]">
      <View className="bg-[#0C6C41] p-4">
        <Text className="text-2xl font-bold text-white">Document Upload</Text>
      </View>
      <ScrollView className="flex-1 p-5 bg-gray-100">
        <Text className="text-2xl font-bold mb-5 text-center">Personal Documents</Text>

        {renderUploadBox("Profile Photo", "profilePhoto")}
        {renderUploadBox("NIC - Front", "nicFront")}
        {renderUploadBox("NIC - Rear", "nicRear")}
        {renderUploadBox("License - Front", "licenseFront")}
        {renderUploadBox("License - Rear", "licenseRear")}

        <TouchableOpacity
          className={`p-4 rounded-lg items-center mt-5 mb-20 ${
            Object.values(documents).some(doc => !doc.uri) ? "bg-green-200" : "bg-green-500"
          }`}
          onPress={uploadFiles}
          disabled={isUploading || Object.values(documents).some(doc => !doc.uri)}
          accessibilityLabel="Upload Documents"
          accessibilityHint="Double tap to start uploading all documents"
        >
          {isUploading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text className="text-white text-lg font-bold">
              Upload Documents
            </Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UploadDocumentsScreen;

