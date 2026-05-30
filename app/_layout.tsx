import "@/global.css";
import { fonts } from "@/theme";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

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
    <>
      <StatusBar style="light" backgroundColor="#070B1A" />
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#070B1A" },
          headerShown: false,
        }}
      />
    </>
  );
}
