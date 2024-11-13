import {
    View,
    Text,
    SafeAreaView,
    ScrollView,
    Switch,
    Image,
} from "react-native";
import React, { useState } from "react";
import Dropdown from "@/components/Dropdown";
import FormField from "@/components/FormField";
import Checkbox from "@/components/CheckBox";
import { useLocalSearchParams } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { generateRecipe } from "@/api/api";

const Recipe = () => {
    const { ingredients } = useLocalSearchParams();
    const parsedIngredients = ingredients ? ingredients.split(",") : [];
    const [cookingTime, setCookingTime] = useState<string>("");
    const [cookingDifficulty, setCookingDifficulty] = useState("easy");
    const [selectedAppliances, setSelectedAppliances] = useState<string[]>([]);
    const [isVegetarian, setIsVegetarian] = useState(false);
    const [isVegan, setIsVegan] = useState(false);
    const [isGlutenFree, setIsGlutenFree] = useState(false);
    const [recipe, setRecipe] = useState<any>(null);

    const difficultyOptions = ["easy", "medium", "hard"];
    const applianceOptions = ["oven", "stove", "microwave", "grill"];

    const toggleAppliance = (appliance: string) => {
        setSelectedAppliances((prev) =>
            prev.includes(appliance)
                ? prev.filter((item) => item !== appliance)
                : [...prev, appliance]
        );
    };

    const getRecipe = async () => {
        const parsedCookingTime = cookingTime
            ? parseInt(cookingTime.toString(), 10)
            : 0;
        const response = await generateRecipe(
            parsedIngredients,
            selectedAppliances,
            parsedCookingTime,
            cookingDifficulty,
            isVegetarian,
            isVegan,
            isGlutenFree
        );
        setRecipe(response[0]);
        console.log("Recipe:", response);
    };

    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView className="w-full h-full px-4 my-6">
                {/* Ingredients */}
                <View className="space-y-2">
                    <Text className="text-lg text-gray-100 font-bold">
                        Ingredients
                    </Text>
                    <View className="bg-black-100 p-4 rounded-lg">
                        {parsedIngredients.map((ingredient, index) => (
                            <Text key={index} className="text-white">
                                - {ingredient}
                            </Text>
                        ))}
                    </View>
                </View>

                {/* Cooking Time */}
                <FormField
                    title="Cooking Time (minutes)"
                    value={cookingTime}
                    handleChangeText={(num) => setCookingTime(num)}
                    keyboardType="numeric"
                    placeholder="Enter time in minutes"
                    otherStyles="my-2"
                />

                {/* Cooking Difficulty */}
                <Dropdown
                    title="Cooking Difficulty"
                    options={difficultyOptions}
                    selectedValue={cookingDifficulty}
                    onSelect={setCookingDifficulty}
                    otherStyles="z-30 my-2"
                />

                {/* Appliances */}
                <View className="space-y- my-2">
                    <Text className="text-lg text-gray-100 font-bold">
                        Appliances
                    </Text>
                    {applianceOptions.map((appliance) => (
                        <Checkbox
                            key={appliance}
                            label={appliance}
                            isChecked={selectedAppliances.includes(appliance)}
                            onToggle={() => toggleAppliance(appliance)}
                        />
                    ))}
                </View>

                {/* Dietary Options */}
                <View className="space-y-4">
                    <View className="flex-row items-center justify-between my-2">
                        <Text className="text-lg text-gray-100 font-bold">
                            Vegetarian
                        </Text>
                        <Switch
                            value={isVegetarian}
                            onValueChange={setIsVegetarian}
                        />
                    </View>
                    <View className="flex-row items-center justify-between my-2">
                        <Text className="text-lg text-gray-100 font-bold">
                            Vegan
                        </Text>
                        <Switch value={isVegan} onValueChange={setIsVegan} />
                    </View>
                    <View className="flex-row items-center justify-between my-2">
                        <Text className="text-lg text-gray-100 font-bold">
                            Gluten Free
                        </Text>
                        <Switch
                            value={isGlutenFree}
                            onValueChange={setIsGlutenFree}
                        />
                    </View>
                </View>
                <CustomButton title="Generate Recipe" handlePress={getRecipe} />
                {recipe && (
                    <View className="bg-black-100 p-4 rounded-lg mt-4">
                        <Text className="text-2xl text-white font-bold mb-2">
                            {recipe.title}
                        </Text>
                        <Image
                            source={{ uri: recipe.image_url }}
                            className="w-full h-64 rounded-lg mb-4"
                            resizeMode="cover"
                        />
                        <Text className="text-lg text-gray-300 mb-2">
                            {recipe.description}
                        </Text>
                        <Text className="text-lg text-white font-semibold">
                            Ingredients:
                        </Text>
                        <View className="pl-4 mb-2">
                            {recipe.ingredients.map((ingredient, index) => (
                                <Text key={index} className="text-white">
                                    - {ingredient.name}: {ingredient.quantity}{" "}
                                    {ingredient.unit}
                                </Text>
                            ))}
                        </View>
                        <Text className="text-lg text-white font-semibold">
                            Instructions:
                        </Text>
                        <View className="pl-4 mb-2">
                            {recipe.instructions.map((instruction, index) => (
                                <Text key={index} className="text-white mb-1">
                                    {index + 1}. {instruction}
                                </Text>
                            ))}
                        </View>
                        <Text className="text-lg text-white font-semibold">
                            Cooking Time:
                        </Text>
                        <Text className="text-white">
                            {recipe.preparation_time} minutes
                        </Text>
                        <Text className="text-lg text-white font-semibold mt-2">
                            Difficulty:
                        </Text>
                        <Text className="text-white">
                            {recipe.difficulty_level}
                        </Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Recipe;
