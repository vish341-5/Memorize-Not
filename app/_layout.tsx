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
  const resetOnboarding = useOnboardingStore((state) => state.resetOnboarding);

  // This effect should now be minimal, mostly for resetting state on sign out.
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      // If signed out, reset onboarding state.
      resetOnboarding();
      // No router.replace here, let AuthLayout handle the redirect to sign-in.
    }
  }, [isLoaded, isSignedIn]); // Removed hasCompletedOnboarding and navigationReady

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
