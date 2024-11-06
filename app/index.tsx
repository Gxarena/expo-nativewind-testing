import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View
      className="flex-1 items-center justify-center"
    >
      <Text className="font-bold text-6xl">Chefli!</Text>
      <Link href='/home'>
        <Text className="text-blue-500 underline">Click me</Text>
      </Link>
    </View>
  );
}
