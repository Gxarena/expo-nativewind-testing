import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList, Image, ScrollView } from "react-native";

type DropdownProps = {
  title: string;
  options: string[];
  selectedValue: string;
  onSelect: (value: string) => void;
  placeholder?: string;
  otherStyles?: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  title,
  options,
  selectedValue,
  onSelect,
  placeholder = "Select an option",
  otherStyles,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium">
        {title}
      </Text>
      <TouchableOpacity
        onPress={() => setIsOpen(!isOpen)}
        className="border-2 border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary flex-row items-center justify-between"
      >
        <Text className="text-white font-psemibold text-base">
          {selectedValue || placeholder}
        </Text>
        <Image
          source={require("../constants/icons/down-arrow.png")}
          className="w-4 h-4 ml-2"
          resizeMode="contain"
          style={{ transform: [{ rotate: isOpen ? "180deg" : "0deg" }] }}
        />
      </TouchableOpacity>
      {isOpen && (
        <View
          style={{
            position: 'absolute',
            top: 70, // Adjust this value based on the height of the dropdown toggle
            width: '100%',
          }}
          className="bg-black-100 border border-black-200 rounded-2xl mt-2 z-40"
        >
          <ScrollView>
            {options.map((item, index) => (
              <TouchableOpacity
                key={item}
                className={`p-4 ${index < options.length - 1 ? 'border-b border-gray-700' : ''}`}
                onPress={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
              >
                <Text className="text-white font-psemibold text-base">{item}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default Dropdown;
