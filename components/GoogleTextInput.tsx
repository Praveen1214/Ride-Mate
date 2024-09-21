import { View } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GoogleInputProps } from "@/types/type";

const googlePlacesApiKey = process.env.EXPO_PUBLIC_PLACES_API_KEY;

const GoogleTextInput = ({
  initialLocation,
  containerStyle,
  handlePress,
}: GoogleInputProps) => {
  return (
    <View
      className={`flex flex-row items-center justify-center relative z-50 rounded-xl ${containerStyle}`}
    >
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        debounce={200}
        styles={{
          textInputContainer: {
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 0, // Remove the rounded border if not needed
            marginHorizontal: 0, // Remove horizontal margins
            position: "relative",
            shadowColor: "transparent", // Remove the shadow
          },
          textInput: {
            backgroundColor: "transparent", // Remove background color
            fontSize: 14,
            fontWeight: "500",
            
            width: "100%",
          },
          listView: {
            backgroundColor: "white", // Keep the dropdown background for the search results
            top: 0,
            width: "100%",
            borderRadius: 10,
            shadowColor: "#d4d4d4",
            zIndex: 99,
          },
        }}
        onPress={(data, details = null) => {
          handlePress({
            latitude: details?.geometry.location.lat!,
            longitude: details?.geometry.location.lng!,
            address: data.description,
          });
        }}
        query={{
          key: googlePlacesApiKey,
          language: "en",
        }}
        // Remove the search button by omitting the renderLeftButton
        textInputProps={{
          placeholderTextColor: "gray",
          placeholder: initialLocation ?? "Where do you want to go?",
        }}
      />
    </View>
  );
};

export default GoogleTextInput;
