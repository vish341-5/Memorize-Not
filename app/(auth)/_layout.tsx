import { useAuth } from "@clerk/expo";
import { Redirect, Stack } from "expo-router";

export default function AuthLayout() {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return null;
  }

  // If the user is signed in, redirect them to the home screen.
  if (isSignedIn) {
    return <Redirect href="/" />;
  }

  // If the user is not signed in, show the authentication stack.
  return <Stack screenOptions={{ headerShown: false }} />;
}
