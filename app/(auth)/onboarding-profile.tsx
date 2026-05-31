import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { images } from "@/constants/images";
import { useOnboardingStore } from "@/store/onboarding-store";

export default function OnboardingProfileScreen() {
  const setHasCompletedOnboarding = useOnboardingStore(
    (state) => state.setHasCompletedOnboarding,
  );
  const targetExam = useOnboardingStore((state) => state.targetExam);

  const handleContinue = () => {
    setHasCompletedOnboarding(true);
    router.push("./onboarding-goals");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020722" }}>
      <StatusBar style="light" />

      <View className="flex-1 px-6 pt-8">
        <View className="flex-row items-center gap-3">
          <Pressable onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
          </Pressable>
          <Text className="font-poppins-bold text-[20px] leading-[28px] text-white">
            Set up your profile
          </Text>
        </View>

        <View className="flex-1 items-center justify-center">
          <Text className="text-center font-poppins-bold text-[28px] leading-[36px] text-white">
            Profile setup coming next
          </Text>
        </View>

        <Pressable
          className="mb-4 h-14 items-center justify-center rounded-[10px] bg-[#7C22F3]"
          onPress={handleContinue}
        >
          <Text className="font-poppins-bold text-[17px] leading-[24px] text-white">
            Continue
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
