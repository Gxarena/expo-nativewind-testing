import { View, Text, ScrollView, Image, Alert, TextInput } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { login } from "@/api/api";

const SignIn = () => {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        setIsSubmitting(true);
        try {
            // Call the login API with email and password
            const response = await login(form.email, form.password);

            Alert.alert("Login Successful", `Welcome back!`);
            router.push("/(tabs)/profile"); // Navigate to profile or home screen after login
        } catch (error) {
            Alert.alert("Login Failed", error.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView>
                <View className="w-full justify-center min-h-[85vh] px-4 my-6">
                    <Image
                        source={require("../../constants/chefli_logo.png")}
                        resizeMode="contain"
                        className="w-[115px] h-[115px]"
                    />
                    <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
                        Log in to Chefli
                    </Text>
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm((prev) => ({ ...prev, email: e }))}
                        handleBlur={() => {
                            setForm((prev) => ({ ...prev, email: prev.email.trim() })); // Optional trimming
                        }}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                        textContentType="emailAddress"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) =>
                            setForm({ ...form, password: e })
                        }
                        otherStyles="mt-7"
                        textContentType="password"
                    />

                    <CustomButton
                        title="Sign In"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Don’t have an account?
                        </Text>
                        <Link
                            href="/sign-up"
                            className="text-lg font-psemibold text-secondary"
                        >
                            Sign Up
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
