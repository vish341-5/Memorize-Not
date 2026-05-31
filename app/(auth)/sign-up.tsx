import { useSignUp } from "@clerk/expo/legacy";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TextInput,
  View,
} from "react-native";

import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";
import { getClerkErrorMessage, getResultError } from "@/lib/clerkErrors";

export default function SignUpScreen() {
  const { isLoaded, setActive, signUp } = useSignUp();
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");

  const handleSubmit = async () => {
    setAuthError("");

    if (!isLoaded || !signUp) {
      return;
    }

    const firstName = fullName.trim();

    try {
      const result = await signUp.create({
        emailAddress,
        password,
        ...(firstName ? { firstName } : {}),
      });
      const error = getResultError(result);

      if (error) {
        setAuthError(getClerkErrorMessage(error, "Unable to create account."));
        return;
      }

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });
      setIsVerificationOpen(true);
    } catch (error) {
      setAuthError(getClerkErrorMessage(error, "Unable to create account."));
    }
  };

  const handleVerify = async (code: string) => {
    if (!isLoaded || !signUp) {
      return;
    }

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });
      const error = getResultError(result);

      if (error) {
        setAuthError(getClerkErrorMessage(error, "Invalid verification code."));
        return;
      }

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        setIsVerificationOpen(false);
        router.replace("/");
      } else {
        setAuthError("Verification could not be completed. Please try again.");
      }
    } catch (error) {
      setAuthError(getClerkErrorMessage(error, "Invalid verification code."));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020722" }}>
      <StatusBar barStyle="light-content" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={{ flex: 1 }}
      >
        <View className="flex-1 px-7 pb-7">
          <View className="h-[34%] w-full overflow-hidden">
            <Image
              source={images.authImage}
              className="h-full w-full"
              resizeMode="cover"
            />
          </View>

          <Image
            source={images.authText}
            className="mt-5 h-[92px] w-full"
            resizeMode="contain"
          />

          <View className="mt-5 flex-row rounded-2xl border border-[#2D256B] bg-[#090E38] p-1">
            <Pressable
              className="h-12 flex-1 items-center justify-center rounded-xl bg-[#7C22F3]"
              onPress={() => router.push("/(auth)/sign-up")}
            >
              <Text className="text-[16px] font-bold text-white">
                Sign Up
              </Text>
            </Pressable>

            <Pressable
              className="h-12 flex-1 items-center justify-center rounded-xl"
              onPress={() => router.push("/(auth)/sign-in")}
            >
              <Text className="text-[16px] font-bold text-[#A8ABD8]">
                Sign In
              </Text>
            </Pressable>
          </View>

          <View className="mt-5">
            <TextInput
              placeholder="Full name"
              placeholderTextColor="#8F92C8"
              className="h-[58px] rounded-2xl border border-[#2D256B] bg-[#090E38] px-5 text-[17px] text-white"
              value={fullName}
              onChangeText={(value) => {
                setFullName(value);
                setAuthError("");
              }}
            />

            <TextInput
              placeholder="Email address"
              placeholderTextColor="#8F92C8"
              keyboardType="email-address"
              autoCapitalize="none"
              className="mt-4 h-[58px] rounded-2xl border border-[#2D256B] bg-[#090E38] px-5 text-[17px] text-white"
              value={emailAddress}
              onChangeText={(value) => {
                setEmailAddress(value);
                setAuthError("");
              }}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#8F92C8"
              secureTextEntry
              className="mt-4 h-[58px] rounded-2xl border border-[#2D256B] bg-[#090E38] px-5 text-[17px] text-white"
              value={password}
              onChangeText={(value) => {
                setPassword(value);
                setAuthError("");
              }}
            />

            {authError ? (
              <Text className="mt-3 text-[14px] font-medium text-[#FF7A90]">
                {authError}
              </Text>
            ) : null}
          </View>

          <Pressable
            className="mt-auto h-[70px] w-full items-center justify-center rounded-2xl bg-[#7C22F3]"
            onPress={handleSubmit}
            disabled={!isLoaded}
          >
            <Text className="text-[24px] font-bold text-white">
              Sign Up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
        onVerify={handleVerify}
      />
    </SafeAreaView>
  );
}
