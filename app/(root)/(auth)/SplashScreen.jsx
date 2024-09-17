import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import { useTailwind } from 'nativewind';

const SplashScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading time for the splash screen
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000); // 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <View className="flex-1 bg-green-700 justify-center items-center">
      {loading ? (
        <>
          {/* Logo Image */}
          <Image 
            source={require('@/assets/images/logo.png')} // Replace with your logo path
            className="w-72 h-72 mb-5" // Tailwind width, height, and margin-bottom
            resizeMode="contain"
          />
          {/* Loading Indicator */}
          <ActivityIndicator size="large" color="#fff" />
        </>
      ) : null}
    </View>
  );
};

export default SplashScreen;
