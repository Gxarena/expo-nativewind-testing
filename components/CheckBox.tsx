import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

type CheckboxProps = {
  label: string;
  isChecked: boolean;
  onToggle: () => void;
};

const Checkbox: React.FC<CheckboxProps> = ({ label, isChecked, onToggle }) => {
  return (
    <TouchableOpacity onPress={onToggle} className="flex-row items-center my-2">
      <View
        className={`w-6 h-6 rounded-md mr-2 ${
          isChecked ? 'bg-secondary' : 'bg-black-100 border border-white'
        }`}
      >
        {isChecked && (
          <View className="w-full h-full flex justify-center items-center">
            <Text className="text-white font-bold">✓</Text>
          </View>
        )}
      </View>
      <Text className="text-white text-lg">{label}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
