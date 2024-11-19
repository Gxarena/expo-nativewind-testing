import { View, Text, TextInput, Image, TouchableOpacity, KeyboardTypeOptions  } from "react-native";
import React, { useState } from "react";

type FormFieldProps = {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
    keyboardType?: KeyboardTypeOptions;
    multiline?: boolean;
    inputHeight?: number;
};

const FormField: React.FC<FormFieldProps> = ({
    title,
    value,
    placeholder = '',
    handleChangeText,
    otherStyles,
    keyboardType = "default",
    multiline = false,
    inputHeight = 100,
    ...props
}) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
                {title}
            </Text>

            <View className={`border-2 border-black-200 flex-row w-full px-4 bg-black-100 rounded-2xl ${multiline ? `h-[${inputHeight}px] items-start` : ''} h-16 items-center`}>
                <TextInput
                    className={`text-white font-psemibold text-base flex-1 w-full ${multiline ? 'text-top' : ''}`}
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                    keyboardType={keyboardType}
                    multiline={multiline} // Enable multiline
                />

                {title === 'Password' && !multiline && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image className="w-6 h-6" resizeMode="contain" source={!showPassword ? require('../constants/icons/eye.png') : require('../constants/icons/eyehide.png')} />
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
