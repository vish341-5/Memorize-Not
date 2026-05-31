// app/(auth)/welcome.tsx
import React, { useState, useEffect } from 'react';
import { Image, ScrollView, View, Text, TouchableOpacity, ImageSourcePropType } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

// Centralized image imports
import { images } from '@/constants/images';

// Exam data
import onboardingData from '@/data/onboarding';

// Zustand store
import useOnboardingStore from '@/store/onboarding-store';

// Define ExamType for type safety. This should ideally be imported from '@/types/onboarding'.
// For demonstration purposes, defining it here if it's not available.
interface ExamType {
  id: string;
  title: string;
  description: string;
  icon: ImageSourcePropType; // Use ImageSourcePropType for image assets
}

export default function OnboardingWelcomeScreen() {
  const router = useRouter();
  const { targetExam, setTargetExam } = useOnboardingStore();

  // State to track the selected exam's ID for visual highlighting
  const [selectedExamId, setSelectedExamId] = useState<string | null>(null);

  // Effect to initialize selectedExamId if targetExam is already set in the store (e.g., resuming flow)
  useEffect(() => {
    if (targetExam) {
      setSelectedExamId(targetExam.id);
    }
  }, [targetExam]);

  // Handler for selecting an exam
  const handleSelectExam = (exam: ExamType) => {
    setTargetExam(exam); // Update Zustand store
    setSelectedExamId(exam.id); // Update local state for UI feedback
  };

  // Handler for the continue button
  const handleContinue = () => {
    if (targetExam) {
      // Navigate to the next screen (e.g., onboarding-profile)
      // The prompt specifies navigating to the "next onboarding screen".
      // Assuming the next route is '/(auth)/onboarding-profile' for demonstration.
      router.push('/(auth)/onboarding-profile');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-black"> {/* Use 'black' or a dark primary color */}
      <Stack.Screen
        options={{
          headerShown: false, // Hide header for this screen
        }}
      />
      <Image
        source={images.firstOnboardingBg}
        className="absolute top-0 left-0 right-0 h-full w-full object-cover" // Cover the entire screen
        resizeMode="cover"
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}>
        {/* Content container for header, exam selection */}
        <View className="flex-1 px-5 pt-16 pb-8"> {/* Adjust padding */}

          {/* Header Section */}
          <View className="items-center mb-8"> {/* Centered header content */}
            <Image
              source={images.firstOnboardingTitle}
              className="w-64 h-20" // Adjust dimensions as per design
              resizeMode="contain"
            />
            <Text className="text-white text-2xl font-bold mt-4 text-center">WELCOME, ARYAN! 👋</Text> {/* Added emoji */}
            <Text className="text-gray-300 text-sm mt-2 text-center">We'll set up your profile, understand your goals and help you start strong! 🚀</Text>
            <Text className="text-gray-400 text-xs italic mt-2 text-center">"I'll be your study buddy through this adventure!"</Text>
          </View>

          {/* What will you achieve? Section */}
          <View className="mb-8">
            <Text className="text-white text-xl font-bold mb-4">What will you achieve?</Text>
            <View className="flex-row flex-wrap justify-between">
              {onboardingData.exams.map((exam: ExamType) => ( // Explicitly type exam
                <TouchableOpacity
                  key={exam.id}
                  className={`w-[48%] p-4 rounded-xl justify-center items-center mb-3 border-2 ${
                    selectedExamId === exam.id
                      ? 'bg-purple-700 border-purple-400' // Selected state
                      : 'bg-gray-800 border-gray-700' // Default state
                  }`}
                  onPress={() => handleSelectExam(exam)}
                >
                  <Image source={exam.icon} className="w-10 h-10 mb-2" resizeMode="contain" />
                  <Text className="text-white font-semibold text-center mb-1 text-sm">{exam.title}</Text>
                  <Text className="text-gray-300 text-xs text-center">{exam.description}</Text>
                  {/* Radio button indicator */}
                  <View className={`absolute top-3 right-3 w-6 h-6 rounded-full items-center justify-center ${
                      selectedExamId === exam.id ? 'bg-purple-400 border-purple-400' : 'bg-gray-700 border-gray-600'
                    }`}
                  >
                    {selectedExamId === exam.id && <View className="w-3 h-3 bg-white rounded-full"></View>}
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>

        {/* Pixel Mascot Section - Placed at the bottom of the ScrollView content */}
        <View className="items-center px-5 pb-4"> {/* Ensure padding */}
          <Image source={images.pixelMascot} className="w-32 h-32" resizeMode="contain" />
          <Text className="text-white text-xl font-bold mt-2">Pixel ✨</Text>
          <Text className="text-gray-300 text-sm text-center mt-1">I'm Pixel! I'll guide you, motivate you, and celebrate your progress with you.</Text>
          <Text className="text-blue-400 text-sm text-center mt-1">Together, we'll make every problem a step closer to your dream! ☔</Text>
        </View>

        {/* Continue Button - Placed at the very bottom */}
        <View className="p-5 bg-black/70"> {/* Semi-transparent background for the button area */}
          <TouchableOpacity
            className={`w-full py-3 rounded-full items-center justify-center ${
              selectedExamId ? 'bg-purple-600' : 'bg-gray-700'
            }`}
            onPress={handleContinue}
            disabled={!selectedExamId}
          >
            <Text className="text-white text-lg font-bold flex-row items-center">
              Let's Get Started <Text className="text-lg">→</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
