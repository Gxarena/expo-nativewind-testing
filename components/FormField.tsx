import { View, Text, TextInput, Image, TouchableOpacity, KeyboardTypeOptions  } from "react-native";
import React, { useState } from "react";

type FormFieldProps = {
    title: string;
    value: string;
    placeholder?: string;
    handleChangeText: (text: string) => void;
    otherStyles?: string;
    keyboardType?: KeyboardTypeOptions;
};

const FormField: React.FC<FormFieldProps> = ({
    title,
    value,
    placeholder = '',
    handleChangeText,
    otherStyles,
    keyboardType = "default",
    ...props
}) => {

    const [showPassword, setShowPassword] = useState(false)
    return (
        <View className={`space-y-2 ${otherStyles}`}>
            <Text className="text-base text-gray-100 font-pmedium">
                {title}
            </Text>

            <View className="border-2 border-black-200 flex-row w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary items-center">
                <TextInput
                    className="flex-1 text-white font-psemibold text-base"
                    value={value}
                    placeholder={placeholder}
                    placeholderTextColor="#7b7b8b"
                    onChangeText={handleChangeText}
                    secureTextEntry={title === 'Password' && !showPassword}
                />

                {title === 'Password' && (
                    <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                        <Image className="w-6 h-6" resizeMode='contain' source={!showPassword ? require('../constants/icons/eye.png') : require('../constants/icons/eyehide.png')}/>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

export default FormField;
