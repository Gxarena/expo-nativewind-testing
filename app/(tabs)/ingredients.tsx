import {
    View,
    Text,
    Alert,
    SafeAreaView,
    ScrollView,
    Image,
    ActivityIndicator,
    TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { getImageHistory } from "@/api/api";
import { router } from "expo-router";

type ImageHistoryItem = {
    id: string;
    public_url: string | null;
    ingredients: string[];
};

const Ingredients = () => {
    const [imageHistory, setImageHistory] = useState<ImageHistoryItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const loadingItems = [1, 2];

    const handlePress = (ingredients: string[]) => {
        router.push({
            pathname: "/(tabs)/recipe",
            params: { ingredients },
        });
    };

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await getImageHistory();
                setImageHistory(response);
                console.log(response);
                setLoading(false);
            } catch (error: any) {
                console.error("Error fetching image history:", error);
                Alert.alert("Failed to fetch image history", error.message);
            }
        };
        fetchImages();
    }, []);

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="w-full h-full px-4 my-6">
                {imageHistory.map((item) => (
                    <TouchableOpacity
                        key={item.id}
                        className="mb-6"
                        onPress={() => handlePress(item.ingredients)}
                    >
                        {/* Display the image */}
                        {item.public_url ? (
                            <Image
                                source={{ uri: item.public_url }}
                                className="w-full h-64 rounded-lg"
                                resizeMode="cover"
                            />
                        ) : (
                            <Image
                                source={require("../../constants/foodLoading.gif")}
                                className="w-full h-64 rounded-lg"
                                resizeMode="cover"
                            />
                        )}
                        {/* Display the ingredients */}
                        <Text className="text-2xl text-white font-bold mt-4">
                            Ingredients:
                        </Text>
                        <View className="bg-black-100 p-4 rounded-lg mt-2">
                            {item.ingredients.length > 0 ? (
                                item.ingredients.map((ingredient, i) => (
                                    <Text
                                        key={i}
                                        className="text-white text-lg mb-1"
                                    >
                                        - {ingredient}
                                    </Text>
                                ))
                            ) : (
                                <Image
                                    source={require("../../constants/icons/spinner.gif")}
                                    className="w-24 h-24"
                                    resizeMode="cover"
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Ingredients;
