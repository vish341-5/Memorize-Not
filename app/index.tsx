import { useAuth, useClerk } from "@clerk/expo";
import { Redirect } from "expo-router";
import { useState } from "react";
import { Pressable, SafeAreaView, Text, View } from "react-native";
import { useOnboardingStore } from "@/store/onboarding-store";

export default function HomeScreen() {
  const { isSignedIn, isLoaded } = useAuth();
  const { signOut } = useClerk();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const hasCompletedOnboarding = useOnboardingStore(
    (state) => state.hasCompletedOnboarding,
  );

  const handleSignOut = async () => {
    setIsSigningOut(true);

    try {
      await signOut();
    } finally {
      setIsSigningOut(false);
    }
  };

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn || !hasCompletedOnboarding) {
    return <Redirect href="/(auth)/onboarding" />;
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020722" }}>
      <View className="flex-1 items-center justify-center gap-5 px-6">
        <View className="rounded-2xl bg-[#7C22F3] px-8 py-5 text-center">
          <Text className="text-lg font-bold text-white">Welcome Home!</Text>
        </View>

        <Pressable
          className="h-14 w-full max-w-[280px] items-center justify-center rounded-2xl border border-[#45358C] bg-[#11174A]"
          onPress={handleSignOut}
          disabled={isSigningOut}
        >
          <Text className="text-[17px] font-bold text-white">
            {isSigningOut ? "Logging out..." : "Log Out"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
