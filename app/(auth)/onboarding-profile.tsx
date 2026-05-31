import { SafeAreaView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { useOnboardingStore } from "@/store/onboarding-store";

export default function OnboardingProfileScreen() {
  const targetExam = useOnboardingStore((state) => state.targetExam);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020722" }}>
      <StatusBar style="light" />

      <View className="flex-1 px-6 pt-8">
        <Text className="font-poppins-semibold text-[16px] leading-[24px] text-[#17C9FF]">
          Selected exam: {targetExam ?? "None"}
        </Text>

        <View className="flex-1 items-center justify-center">
          <Text className="text-center font-poppins-bold text-[28px] leading-[36px] text-white">
            Profile setup coming next
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
