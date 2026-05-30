import { Link } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";

import { images } from "@/constants/images";

export default function WelcomeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020722" }}>
      <StatusBar style="light" />

      <View className="h-1/2 w-full overflow-hidden">
        <Image
          source={images.welcomeImage}
          className="h-full w-full"
          resizeMode="cover"
          accessibilityLabel="Welcome illustration"

        />
      </View>

      <View className="flex-1 items-center px-3 pb-3 pt-3">
        <Image
          source={images.welcomeText}
          className="h-[150px] w-full"
          resizeMode="contain"
        />

        <Text className="mt-0 text-center text-[15px] leading-9 text-[#D7D8F5]">
          Let&apos;s learn, practice and achieve{"\n"}your dreams together. 🚀
        </Text>

        <Link href="/(auth)/onboarding" asChild>
          <Pressable className="mt-15 h-[60px] w-full items-center justify-center rounded-2xl bg-[#7C22F3]">
            <Text className="text-[20px] font-bold text-white">
              Let&apos;s Get Started →
            </Text>
          </Pressable>
        </Link>
      </View>
    </SafeAreaView>
  );
}
