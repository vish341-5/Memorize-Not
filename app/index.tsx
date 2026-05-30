import { Link } from "expo-router";
import { SafeAreaView, View } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020722" }}>
      <View className="flex-1 items-center justify-center px-6">
        <Link
          href="/welcome"
          className="rounded-2xl bg-[#7C22F3] px-8 py-5 text-center text-lg font-bold text-white"
        >
          Open Welcome Screen
        </Link>
      </View>
    </SafeAreaView>
  );
}
