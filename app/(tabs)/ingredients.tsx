import { View, Text, Alert, SafeAreaView, ScrollView, Image, ActivityIndicator, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getImageHistory } from '@/api/api';
import { router } from 'expo-router';

type ImageHistoryItem = {
  id: string;
  public_url: string;
  ingredients: string[];
};

const Ingredients = () => {

    const[imageHistory, setImageHistory] = useState<ImageHistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const loadingItems = [1, 2]

    const handlePress = (ingredients: string[]) => {
        router.push({
        pathname: '/(tabs)/recipe',
        params: { ingredients },
        });
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getImageHistory();
                setImageHistory(response);
            } catch (error: any) {
                console.error("Error fetching image history:", error);
                Alert.alert("Failed to fetch image history", error.message);
            } 
            finally {
                setLoading(false); // Set loading to false once fetching is complete
            }
        };
        fetchImages();
    }, [])

  return (
    <SafeAreaView className='bg-primary h-full'>
        <ScrollView className='w-full h-full px-4 my-6'>
                    {loading ? (
<View className="w-full h-full items-center justify-center">
      {loadingItems.map((item, index) => (
        <View key={index} className="w-full items-center justify-center mb-6">
          {/* Loading indicator for the image */}
          <View className="w-full h-64 bg-gray-300 rounded-lg mb-4">
            <Image
              source={require('../../constants/foodLoading.gif')}
              className="w-full h-full rounded-xl"
              resizeMode="cover"
            />
          </View>

          {/* Loading indicator for the ingredients */}
          <Text className="text-2xl text-white font-bold mt-4">Ingredients:</Text>
          <View className="bg-black-100 p-4 rounded-lg mt-2 w-full items-center">
            <Image
              source={require('../../constants/icons/spinner.gif')}
              className="w-24 h-24"
              resizeMode="cover"
            />
          </View>
        </View>
      ))}
    </View>
        ) : (
          imageHistory.map((item) => (
            <TouchableOpacity key={item.id} className="mb-6" onPress={() => handlePress(item.ingredients)}>
              {/* Display the image */}
              <Image
                source={{ uri: item.public_url }}
                className="w-full h-64 rounded-lg"
                resizeMode="cover"
              />
              {/* Display the ingredients */}
              <Text className="text-2xl text-white font-bold mt-4">Ingredients:</Text>
              <View className="bg-black-100 p-4 rounded-lg mt-2">
                {item.ingredients.map((ingredient, i) => (
                  <Text key={i} className="text-white text-lg mb-1">
                    - {ingredient}
                  </Text>
                ))}
              </View>
            </TouchableOpacity>
          ))
        )}
        </ScrollView>
    </SafeAreaView>
  )
}

export default Ingredients