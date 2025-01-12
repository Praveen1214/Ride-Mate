import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, ActivityIndicator } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import axios from 'axios';

const ReviewCard = ({ name, ratecount, date, description, img }) => {
  return (
    <View>
      <View className="flex-row p-4 border-b border-gray-200">
        <Image
          source={{ uri: img }}
          className="w-12 h-12 rounded-full"
        />
        <View className="flex-1 ml-4">
          <View className="flex-row items-center justify-between">
            <Text className="text-lg font-bold">{name}</Text>
            <View className="flex-row items-center">
              {Array.from({ length: 5 }, (_, index) => (
                <FontAwesome
                  key={index}
                  name={index < parseInt(ratecount) ? 'star' : 'star-o'}
                  size={16}
                  color="gold"
                />
              ))}
            </View>
          </View>
          <Text className="text-sm text-gray-500">{date}</Text>
        </View>
      </View>
      <View className='px-5'>
        <Text className="mt-2 mb-4 text-gray-500">{description}</Text>
      </View>
    </View>
  );
};

const Review = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://192.168.134.196:5000/api/feedback/getallfeedback"
      );
      setFeedback(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      setError("Failed to load reviews. Please try again later.");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <View className="items-center justify-center flex-1">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View className="items-center justify-center flex-1">
        <Text className="text-red-500">{error}</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white">
      <View className="justify-center h-12 px-4 bg-gray-300">
        <Text className="text-xl font-semibold text-black">Reviews</Text>
      </View>
      <ScrollView>
        {feedback.map((review) => (
          <ReviewCard
            key={review._id}
            name={review.name}
            ratecount={review.ratecount}
            date={review.date}
            description={review.description}
            img={review.img}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default Review;