import useOnboardingStore from "@/store/onboarding-store";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";

export default function HomeScreen() {
  const { isSignedIn, isLoaded } = useAuth();
  const { completed } = useOnboardingStore();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/(auth)/sign-in" />;
  }

  if (!completed) {
    return <Redirect href="/(onboarding)/welcome" />;
  }

  return <Redirect href="/(tabs)" />;
}