import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    Text,
    TextInput,
    View,
} from "react-native";

type VerificationModalProps = {
  visible: boolean;
  onClose: () => void;
  onVerify?: (code: string) => void;
};

export function VerificationModal({
  visible,
  onClose,
  onVerify,
}: VerificationModalProps) {
  const [code, setCode] = useState("");
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (!visible) {
      return;
    }

    const focusTimeout = setTimeout(() => {
      inputRef.current?.focus();
    }, 250);

    return () => clearTimeout(focusTimeout);
  }, [visible]);

  const handleCodeChange = (value: string) => {
    const nextCode = value.replace(/\D/g, "").slice(0, 6);
    setCode(nextCode);

    if (nextCode.length === 6) {
      if (onVerify) {
        onVerify(nextCode);
      } else {
        onClose();
        router.replace("/");
      }
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <View className="flex-1 justify-end bg-black/60 px-5 pb-8">
          <View className="rounded-3xl border border-[#32236F] bg-[#080D35] px-5 pb-6 pt-7">
            <Text className="text-center text-[25px] font-bold text-white">
              Check your email
            </Text>
            <Text className="mt-3 text-center text-[16px] leading-6 text-[#C8C9EB]">
              We sent you a verification code. Enter it below to continue.
            </Text>

            <View className="relative mt-7">
              <View className="flex-row justify-between">
                {Array.from({ length: 6 }).map((_, index) => (
                  <View
                    key={index}
                    className="h-[54px] w-[44px] items-center justify-center rounded-xl border border-[#45358C] bg-[#11174A]"
                  >
                    <Text className="text-[24px] font-bold text-white">
                      {code[index] ?? ""}
                    </Text>
                  </View>
                ))}
              </View>

              <TextInput
                ref={inputRef}
                value={code}
                onChangeText={handleCodeChange}
                keyboardType="number-pad"
                inputMode="numeric"
                textContentType="oneTimeCode"
                autoComplete="sms-otp"
                maxLength={6}
                autoFocus
                caretHidden
                selectionColor="transparent"
                className="absolute inset-0 text-transparent"
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
