import React, { useState } from 'react';
import { Button, Image, View, Alert, SafeAreaView, Text } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '@/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const profile = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFormat, setImageFormat] = useState<string | null>(null)

  const getImageFormat = (uri?: string) => {
    if (typeof uri === "string" && uri.includes('.')) {
        const extension = uri.split('.').pop()?.toLowerCase();
        return extension || null;
    }
    return null;
  };

  // Function to pick an image from the library
  const pickImage = async () => {
    // Ask for permission to access the library
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access the photo library is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const format = getImageFormat(result.assets[0].uri);
      setImageFormat(format);
      setImage(result.assets[0].uri);
    }
  };

  // Function to open the camera
  const takePhoto = async () => {
    // Ask for permission to access the camera
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission to access the camera is required!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const format = getImageFormat(result.assets[0].uri);
      setImageFormat(format);
      setImage(result.assets[0].uri);
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("access_token");
    router.push("/sign-in");
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <View className='w-full justify-center min-h-[85vh] px-4 my-6'>
      <View className='items-center'>
          {image ? (
            <Image 
              source={{ uri: image }} 
              className='w-64 h-64 border' 
            />
          ) : (
            <View 
              className='justify-center border items-center bg-slate-400 w-64 h-64'
            >
              <Text className='text-white'>No Image Selected</Text>
            </View>
          )}
          <Text className='text-white text-xl'>Image Format: {imageFormat}</Text>
        </View>
        <CustomButton 
          title="Select a photo from your Library"
          handlePress={pickImage}
          containerStyles="w-full mt-7"
        />
        
        <Text className='text-2xl text-white text-semibold mt-6 font-psemibold text-center'>Or</Text>

        <CustomButton 
          title="Take a Photo"
          handlePress={takePhoto}
          containerStyles="w-full mt-7"
        />
        <CustomButton
            title="Sign out"
            handlePress={signOut}
            containerStyles="mt-7"
        />
      </View>
    </SafeAreaView>
  )
}

export default profile