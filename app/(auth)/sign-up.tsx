import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link, router } from "expo-router";
import { register } from "@/api/api"; // Import register API

const SignUp = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submit = async () => {
        setIsSubmitting(true);
        try {
            const response = await register(form.email, form.password);

            Alert.alert("Registration Successful", "You can now log in.");
            router.push("/sign-in");
        } catch (error) {
            const errorMessage = (error as Error).message || "An unknown error occurred";
            Alert.alert("Registration Failed", errorMessage);
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
                        Sign up to Chefli
                    </Text>
                    <FormField
                        title="Username"
                        value={form.username}
                        handleChangeText={(e) =>
                            setForm({ ...form, username: e })
                        }
                        otherStyles="mt-10"
                    />
                    <FormField
                        title="Email"
                        value={form.email}
                        handleChangeText={(e) => setForm({ ...form, email: e })}
                        otherStyles="mt-7"
                        keyboardType="email-address"
                    />
                    <FormField
                        title="Password"
                        value={form.password}
                        handleChangeText={(e) =>
                            setForm({ ...form, password: e })
                        }
                        otherStyles="mt-7"
                    />

                    <CustomButton
                        title="Sign Up"
                        handlePress={submit}
                        containerStyles="mt-7"
                        isLoading={isSubmitting}
                    />

                    <View className="justify-center pt-5 flex-row gap-2">
                        <Text className="text-lg text-gray-100 font-pregular">
                            Have an account?
                        </Text>
                        <Link
                            href="/sign-in"
                            className="text-lg font-psemibold text-secondary"
                        >
                            Sign In
                        </Link>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignUp;
