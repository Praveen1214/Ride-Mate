import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen name="tracking" options={{ headerShown: false }} />
    </Stack>
  );
};

export default Layout;
