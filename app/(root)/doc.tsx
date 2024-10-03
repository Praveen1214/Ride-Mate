import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const UploadDocumentsScreen = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [nicFront, setNicFront] = useState(null);
  const [nicRear, setNicRear] = useState(null);
  const [licenseFront, setLicenseFront] = useState(null);
  const [licenseRear, setLicenseRear] = useState(null);

  

  // Function to open image picker
  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  // Function to upload files
  const uploadFiles = async () => {
    const formData = new FormData();

    const appendImage = (uri, name) => {
      // Determine the file extension and set the MIME type
      let fileType = uri.split(".").pop();
      fileType = fileType === "jpg" ? "jpeg" : fileType; // Normalize 'jpg' to 'jpeg'

      formData.append(name, {
        uri: uri,
        name: `${name}.${fileType}`,
        type: `image/${fileType}`, // Dynamically set MIME type
      });
    };

    if (profilePhoto) appendImage(profilePhoto, "profilePhoto");
    if (nicFront) appendImage(nicFront, "nicFront");
    if (nicRear) appendImage(nicRear, "nicRear");
    if (licenseFront) appendImage(licenseFront, "licenseFront");
    if (licenseRear) appendImage(licenseRear, "licenseRear");

    try {
      const response = await axios.post(
        "http://192.168.8.174:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Files uploaded successfully", response.data);
    } catch (error) {
      console.error("Error uploading files", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Document Upload</Text>

      {/* Profile Photo Upload */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Profile Photo</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage(setProfilePhoto)}
        >
          <Text style={styles.uploadText}>Profile Photo</Text>
          {profilePhoto && (
            <Image source={{ uri: profilePhoto }} style={styles.imagePreview} />
          )}
        </TouchableOpacity>
      </View>
      <Button title="Upload Documents" onPress={uploadFiles} />

      {/* NIC Upload */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>National Identity Card</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage(setNicFront)}
        >
          <Text style={styles.uploadText}>NIC - Front</Text>
          {nicFront && (
            <Image source={{ uri: nicFront }} style={styles.imagePreview} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage(setNicRear)}
        >
          <Text style={styles.uploadText}>NIC - Rear</Text>
          {nicRear && (
            <Image source={{ uri: nicRear }} style={styles.imagePreview} />
          )}
        </TouchableOpacity>
      </View>

      {/* Driving License Upload */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Driving License</Text>
        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage(setLicenseFront)}
        >
          <Text style={styles.uploadText}>Driving License - Front</Text>
          {licenseFront && (
            <Image source={{ uri: licenseFront }} style={styles.imagePreview} />
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.uploadBox}
          onPress={() => pickImage(setLicenseRear)}
        >
          <Text style={styles.uploadText}>Driving License - Rear</Text>
          {licenseRear && (
            <Image source={{ uri: licenseRear }} style={styles.imagePreview} />
          )}
        </TouchableOpacity>
      </View>

      {/* Upload Button */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  uploadBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 100,
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  uploadText: {
    fontSize: 16,
    color: "#888",
  },
  imagePreview: {
    marginTop: 10,
    width: 80,
    height: 80,
    borderRadius: 8,
  },
});

export default UploadDocumentsScreen;
