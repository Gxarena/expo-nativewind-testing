import {
    View,
    Text,
    Image,
    TouchableOpacity,
    SafeAreaView,
} from "react-native";
import React from "react";

const Home = () => {
    return (
        <SafeAreaView className="h-full bg-white">
            {/* Header */}
            <View className="flex-row items-center justify-between px-8 pt-6">
                {/* Profile Image */}
                <View className="flex-row">
                  <View className="bg-slate-400 w-12 h-12 rounded-full mr-4">

                </View>
                {/* Title */}
                <View>
                    <Text className="text-lg font-bold">
                        Your kitchen companion!
                    </Text>
                    <Text className="text-sm text-gray-600">
                        Scan and surprise yourself!
                    </Text>
                </View>
                </View>
                {/* Notification Icon */}
                <TouchableOpacity>
                    <Image
                        source={require("../../constants/icons/notifcation_off.png")}
                        className="w-6 h-6 mr-2 "
                        resizeMode="contain"
                    />
                </TouchableOpacity>
            </View>

            {/* AI Powered Recipe Assistant */}
            <View className="bg-[#B4EEC6] mt-6 mx-6 p-6" style={{borderRadius: 24}}>
                <Image
                    source={require("../../constants/icons/test_veggies.png")}
                    className="w-full h-40 rounded-lg"
                    resizeMode="contain"
                />
                <Text className="font-psemibold text-center mt-4" style={{fontSize: 36, lineHeight: 36}}>
                    AI powered recipe assistant
                </Text>
                <Text className="text-lg text-center text-gray-600 mt-2">
                    Scan your ingredients, and let our AI generate recipes based
                    on what you have—simple, quick, and personalized!
                </Text>
                <TouchableOpacity className="mt-4 bg-white rounded-2xl border border-[#285034] p-3 flex-row items-center justify-center">
                    <Image
                        source={require("../../constants/icons/camera.png")}
                        className="w-5 h-5 mr-2"
                        resizeMode="contain"
                    />
                    <Text className="text-[#082511] font-bold">
                        Scan the ingredients
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Add Your Ingredients Section */}
            <View className="bg-[#FDDDC8] mt-6 mx-6 p-6 flex-row items-center" style={{borderRadius: 24 }}>
                <Image
                    source={require("../../constants/icons/test_ingredients.png")}
                    className="h-40 w-1/3 rounded-lg"
                    resizeMode="contain"
                />
                <View className="flex-1 pl-4">
                    <Text className="text-xl font-bold">
                        Add your ingredients
                    </Text>
                    <Text className="text-sm text-gray-600 mt-2">
                        Add your ingredients, and let our AI create quick,
                        personalized recipes!
                    </Text>
                    <TouchableOpacity className="mt-4 bg-white rounded-2xl border border-[#775C47] p-3 flex-row items-center justify-center">
                        <Text className="text-[#22150C] font-bold">
                            Add ingredients
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

export default Home;
