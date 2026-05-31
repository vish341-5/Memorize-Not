// app/(auth)/onboarding-exam.tsx
import { Stack, useRouter } from 'expo-router';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/onboarding-store'; // Assuming onboarding-store.ts is correctly set up
import { images } from '@/constants/images'; // Centralized image imports
import { SafeAreaView } from 'react-native-safe-area-context'; // Use SafeAreaView for consistent padding

export default function OnboardingExam() {
  const router = useRouter();
  const { targetExam, setTargetExam } = useStore();

  const exams = [
    { id: 'jee_advanced', name: 'Crack JEE Advanced', description: 'Compete with the best and secure your dream rank', icon: images.jeeAdvancedIcon },
    { id: 'jee_main', name: 'Crack JEE Main', description: 'Score high and get into a top engineering college', icon: images.jeeMainIcon },
    { id: 'neet', name: 'Crack NEET', description: 'Pursue your dream of becoming a doctor', icon: images.neetIcon },
    { id: 'boards', name: 'Prepare for Boards', description: 'Score high in your board exams with confidence', icon: images.boardsIcon }, // Assuming boardsIcon is added
  ];

  const handleSelectExam = (examId: string) => {
    setTargetExam(examId);
  };

  const handleContinue = () => {
    // Navigate to the next onboarding screen
    router.push('/onboarding-level'); // Assuming the next route is /onboarding-level
  };

  return (
    <SafeAreaView className="flex-1 bg-purple-950">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1 items-center justify-center px-6">
        <Image
          source={images.firstOnboardingBg}
          className="absolute top-0 left-0 right-0 w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-16 left-4 right-4 items-center">
          <Image
            source={images.firstOnboardingTitle}
            className="w-64 h-16" // Adjust size as needed
            resizeMode="contain"
          />
        </View>

        <View className="mt-40 w-full">
          <Text className="text-2xl font-bold text-white mb-4 text-center">What will you achieve?</Text>
          <View className="flex-wrap flex-row justify-center gap-4">
            {exams.map((exam) => (
              <TouchableOpacity
                key={exam.id}
                onPress={() => handleSelectExam(exam.id)}
                className={`w-[45%] p-4 rounded-lg border-2 items-center justify-center ${targetExam === exam.id ? 'border-blue-400 bg-blue-900' : 'border-gray-700 bg-purple-800'}`}
              >
                <Image source={exam.icon} className="w-12 h-12 mb-2" resizeMode="contain" />
                <Text className="text-white font-semibold text-sm text-center">{exam.name}</Text>
                <Text className="text-gray-300 text-xs text-center mt-1">{exam.description}</Text>
                {targetExam === exam.id && (
                  <View className="absolute top-2 right-2 w-6 h-6 rounded-full bg-blue-500 items-center justify-center">
                    <Text className="text-white text-xs">✓</Text>
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View className="absolute bottom-20 w-full px-6">
          <TouchableOpacity
            onPress={handleContinue}
            disabled={!targetExam}
            className={`w-full py-4 rounded-lg items-center justify-center ${targetExam ? 'bg-purple-600' : 'bg-gray-600'}`}
          >
            <Text className="text-white text-lg font-bold">Let's Get Started</Text>
          </TouchableOpacity>
        </View>

        <View className="absolute bottom-0">
          <Image source={images.pixelMascot} className="w-32 h-32" resizeMode="contain" />
        </View>
      </View>
    </SafeAreaView>
  );
}
