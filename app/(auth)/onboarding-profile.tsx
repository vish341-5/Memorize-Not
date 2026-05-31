// app/(auth)/onboarding-profile.tsx
import { Stack } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';

// Zustand store
import useOnboardingStore from '@/store/onboarding-store';

export default function OnboardingProfileScreen() {
  const { targetExam } = useOnboardingStore();

  return (
    <View className="flex-1 bg-black items-center justify-center p-5">
      <Stack.Screen
        options={{
          headerTitle: 'Onboarding - Profile',
          headerShown: true, // Show header for this screen
        }}
      />
      <Text className="text-white text-lg font-bold mb-4">Selected Exam (for verification):</Text>
      {targetExam ? (
        <Text className="text-purple-400 text-2xl font-bold">{targetExam.title}</Text>
      ) : (
        <Text className="text-gray-500 text-xl">No exam selected</Text>
      )}
      {/* Add profile-related content here */}
      <Text className="text-white text-lg mt-8">Profile Screen Content Goes Here</Text>
    </View>
  );
}
