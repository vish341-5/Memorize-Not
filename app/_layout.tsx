import "@/global.css";
import { fonts } from "@/theme";
import { ClerkProvider, useAuth } from "@clerk/expo";
import { tokenCache } from "@clerk/expo/token-cache";
import { useFonts } from "expo-font";
import { Stack, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { useOnboardingStore } from "@/store/onboarding-store";

SplashScreen.preventAutoHideAsync();

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ?? "";

if (!publishableKey) {
  throw new Error("Add your Clerk Publishable Key to the .env file");
}

function ClerkStack() {
  const { isLoaded, isSignedIn } = useAuth();
  const hasCompletedOnboarding = useOnboardingStore(
    (state) => state.hasCompletedOnboarding,
  );
  const setHasCompletedOnboarding = useOnboardingStore(
    (state) => state.setHasCompletedOnboarding,
  );
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (isSignedIn) {
      // TODO: Fetch actual onboarding completion status from Supabase here
      // For now, we are using the Zustand store's state.
      if (!hasCompletedOnboarding) {
        router.replace("/(auth)/onboarding");
      } else {
        router.replace("/");
      }
    } else {
      // If signed out, reset onboarding state
      resetOnboarding();
      router.replace("/(auth)/sign-in");
    }
  }, [isLoaded, isSignedIn, hasCompletedOnboarding]); // Added hasCompletedOnboarding to dependencies

  return (
    <>
      <StatusBar style="light" backgroundColor="#070B1A" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#070B1A" },
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="(auth)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="welcome"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    [fonts.regular]: require("@/assets/fonts/Poppins-Regular.ttf"),
    [fonts.medium]: require("@/assets/fonts/Poppins-Medium.ttf"),
    [fonts.semiBold]: require("@/assets/fonts/Poppins-SemiBold.ttf"),
    [fonts.bold]: require("@/assets/fonts/Poppins-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkStack />
    </ClerkProvider>
  );
}
