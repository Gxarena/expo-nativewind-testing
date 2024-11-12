import CustomButton from "@/components/CustomButton";
import { Redirect, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Text, View } from "react-native";
import { ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView contentContainerStyle={{ height: '100%'}}>
        <View className="w-full justify-center items-center min-h-[85vh] px-4">
          <Image source={require('../constants/chefli_logo.png')} className="" resizeMode="contain"/>
          <View className="relative">
            <Text className="text-3xl text-white font-bold text-center">
              Discover endless food oportunities with{' '}
              <Text className="text-secondary-200">Chefli</Text>
            </Text>
          </View>
          <CustomButton 
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles="w-full mt-7"
          />
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
}
