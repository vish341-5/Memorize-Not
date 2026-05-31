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

  // If the user is signed in, check if they have completed onboarding.
  // If not, redirect them to the onboarding screen.
  // Otherwise, redirect them to the home screen.
  if (isSignedIn) {
    if (!hasCompletedOnboarding) {
      return <Redirect href="/(auth)/onboarding" />;
    }
    return <Redirect href="/" />;
  }

  // If the user is not signed in, show the authentication stack.
  return <Stack screenOptions={{ headerShown: false }} />;
}
