import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="find-ride" options={{ headerShown: false }} />
      <Stack.Screen name="offer-ride" options={{ headerShown: false }} />
      <Stack.Screen name="real_tracking" options={{ headerShown: false }} />
      <Stack.Screen name="SearchRide" options={{ headerShown: false }} />
      <Stack.Screen name="viewride" options={{ headerShown: false }} />
      <Stack.Screen name="ride_requests" options={{ headerShown: false }} />

    </Stack>
  );
};

export default Layout;
