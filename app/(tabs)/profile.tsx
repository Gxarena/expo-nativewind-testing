import React, { useState } from 'react';
import { Button, Image, View, Alert, SafeAreaView, Text, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '@/components/CustomButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { getUploadUrl, processImage } from '@/api/api'

const profile = () => {
  const [image, setImage] = useState<string | null>(null);
  const [imageFormat, setImageFormat] = useState<string | null>(null)
  const [imageIngredients, setImageIngredients] = useState<string[]>([]);

  const getImageFormat = (uri?: string) => {
    if (typeof uri === "string" && uri.includes('.')) {
        const extension = uri.split('.').pop()?.toLowerCase();
        return extension || null;
    }
    return null;
  };

  const uriToBlob = async (uri) => {
    const response = await fetch(uri);
    return await response.blob();
  };

  const uploadImageToSignedUrl = async (uploadUrl, imageUri, contentType) => {
    try {
      // Convert the image URI to a Blob
      const imageBlob = await uriToBlob(imageUri);

      // Make the PUT request to upload the image
      const response = await fetch(uploadUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': contentType,
        },
        body: imageBlob,
      });

      // Check the response status
      if (response.status === 200) {
        console.log("Image uploaded successfully!");
        return true;
      } else {
        console.error("Failed to upload image:", response.status);
        Alert.alert("Upload failed", `Error code: ${response.status}`);
        return false;
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      Alert.alert("Upload failed", error.message);
      return false;
    }
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
      const uri = result.assets[0].uri;
      const format = getImageFormat(uri);
      console.log('Image URI:', uri);  // Log the URI
      console.log('Detected image format:', format);
      const adjustedFormat = format === 'jpg' ? 'jpeg' : format;
      setImageFormat(adjustedFormat);
      setImage(uri);
      
      try {
        const contentType = 'image/' + adjustedFormat
        console.log('content type', contentType)
        const uploadURLResponse = await getUploadUrl(contentType);
        if (uploadURLResponse.upload_url && uploadURLResponse.image_id) {
          console.log('Upload Response:', uploadURLResponse)
          const uploadStorageResponse = await uploadImageToSignedUrl(uploadURLResponse.upload_url, uri, contentType);
          if(uploadStorageResponse){
            Alert.alert("Image uploaded successfully!");
            try {
              const processIngredientsResponse = await processImage(uploadURLResponse.image_id)
              if (processIngredientsResponse) {
                setImageIngredients(processIngredientsResponse);
              }
            } catch (error) {
              console.error("Error processing image:", error);
              Alert.alert("Failed to process image", error.message);
            }
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert("Failed to upload image", error.message);
      }
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
      const uri = result.assets[0].uri;
      const format = getImageFormat(uri);
      console.log('image format:', format)
      const adjustedFormat = format === 'jpg' ? 'jpeg' : format;
      setImageFormat(adjustedFormat);
      setImage(uri);

      try {
        const contentType = 'image/' + adjustedFormat
        console.log('content type:', contentType)
        const uploadURLResponse = await getUploadUrl(contentType);
        if (uploadURLResponse.upload_url && uploadURLResponse.image_id) {
          console.log('Upload Response:', uploadURLResponse)
          const uploadStorageResponse = await uploadImageToSignedUrl(uploadURLResponse.upload_url, uri, contentType);
          if(uploadStorageResponse){
            Alert.alert("Image uploaded successfully!");
            try {
              const processIngredientsResponse = await processImage(uploadURLResponse.image_id)
              if (processIngredientsResponse) {
                setImageIngredients(processIngredientsResponse);
              }
            } catch (error) {
              console.error("Error processing image:", error);
              Alert.alert("Failed to process image", error.message);
            }
          }
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        Alert.alert("Failed to upload image", error.message);
      }
    }
  };

  const signOut = async () => {
    await AsyncStorage.removeItem("access_token");
    router.push("/sign-in");
  };

  return (
    <SafeAreaView className='bg-primary h-full'>
      <ScrollView className='w-full h-full px-4 my-6'>
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
        {imageIngredients.length > 0 && (
          <View className='mt-10'>
            <Text className='text-2xl text-white text-semibold mb-4 '>Processed Ingredients:</Text>
            <ScrollView className='bg-black-100 p-4 rounded-lg h-48'>
              {imageIngredients.map((ingredient, index) => (
                <Text key={index} className='text-white text-lg mb-2'>{ingredient}</Text>
              ))}
            </ScrollView>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  )
}

export default profile