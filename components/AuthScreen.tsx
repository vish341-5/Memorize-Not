import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from "react-native";

import { VerificationModal } from "@/components/VerificationModal";
import { images } from "@/constants/images";

type AuthMode = "sign-up" | "sign-in";

type AuthScreenProps = {
  mode: AuthMode;
};

export function AuthScreen({ mode }: AuthScreenProps) {
  const [isVerificationOpen, setIsVerificationOpen] = useState(false);

  const isSignUp = mode === "sign-up";
  const buttonLabel = isSignUp ? "Sign Up" : "Sign In";

  const goToSignUp = () => {
    router.push("/(auth)/sign-up");
  };

  const goToSignIn = () => {
    router.push("/(auth)/sign-in");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020722" }}>
      <StatusBar style="light" />

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
              className={`h-12 flex-1 items-center justify-center rounded-xl ${
                isSignUp ? "bg-[#7C22F3]" : ""
              }`}
              onPress={goToSignUp}
            >
              <Text
                className={`text-[16px] font-bold ${
                  isSignUp ? "text-white" : "text-[#A8ABD8]"
                }`}
              >
                Sign Up
              </Text>
            </Pressable>

            <Pressable
              className={`h-12 flex-1 items-center justify-center rounded-xl ${
                isSignUp ? "" : "bg-[#7C22F3]"
              }`}
              onPress={goToSignIn}
            >
              <Text
                className={`text-[16px] font-bold ${
                  isSignUp ? "text-[#A8ABD8]" : "text-white"
                }`}
              >
                Sign In
              </Text>
            </Pressable>
          </View>

          <View className="mt-5">
            {isSignUp ? (
              <TextInput
                placeholder="Full name"
                placeholderTextColor="#8F92C8"
                className="h-[58px] rounded-2xl border border-[#2D256B] bg-[#090E38] px-5 text-[17px] text-white"
              />
            ) : null}

            <TextInput
              placeholder="Email address"
              placeholderTextColor="#8F92C8"
              keyboardType="email-address"
              autoCapitalize="none"
              className={`h-[58px] rounded-2xl border border-[#2D256B] bg-[#090E38] px-5 text-[17px] text-white ${
                isSignUp ? "mt-4" : ""
              }`}
            />

            <TextInput
              placeholder="Password"
              placeholderTextColor="#8F92C8"
              secureTextEntry
              className="mt-4 h-[58px] rounded-2xl border border-[#2D256B] bg-[#090E38] px-5 text-[17px] text-white"
            />
          </View>

          <Pressable
            className="mt-auto h-[70px] w-full items-center justify-center rounded-2xl bg-[#7C22F3]"
            onPress={() => setIsVerificationOpen(true)}
          >
            <Text className="text-[24px] font-bold text-white">
              {buttonLabel}
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>

      <VerificationModal
        visible={isVerificationOpen}
        onClose={() => setIsVerificationOpen(false)}
      />
    </SafeAreaView>
  );
}
