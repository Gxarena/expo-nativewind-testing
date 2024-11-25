import { View, Text, Image } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className=" items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode="contain"
        className="w-6 h-6"
        style={{ tintColor: color }}
      />
      {/* <Text
        className={`text-xs w-full ${focused ? 'font-semibold' : ''}`}
        style={{ color: color }}
      >
        {name}
      </Text> */}
    </View>
  );
};

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#000000',
        tabBarInactiveTintColor: '#CDCDE0',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopColor: '#232533',
          height: 70, // Adjusted height for better layout
          paddingTop: 10,
          alignItems: 'center'
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require('../../constants/icons/home.png')}
              color={color}
              name="Home"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="ingredients"
        options={{
          title: 'Ingredients',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require('../../constants/icons/burger.png')}
              color={color}
              name="Ingredients"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="recipe"
        options={{
          title: 'Recipe',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require('../../constants/icons/recipe.png')}
              color={color}
              name="Recipe"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={require('../../constants/icons/profile.png')}
              color={color}
              name="Profile"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
