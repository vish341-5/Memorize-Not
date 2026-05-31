import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";
import { useOnboardingStore } from "@/store/onboarding-store";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();
  const hasCompletedOnboarding = useOnboardingStore(
    (state) => state.hasCompletedOnboarding,
  );

  if (!isLoaded) {
    return null;
  }

  if (isSignedIn) {
    if (!hasCompletedOnboarding) {
      return <Redirect href="/(auth)/onboarding" />;
    }
    return <Redirect href="/" />;
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}
