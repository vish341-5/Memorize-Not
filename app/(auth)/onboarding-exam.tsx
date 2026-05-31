// app/(auth)/onboarding-exam.tsx
import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/onboarding-store';
import { images } from '@/constants/images'; // Import centralized images
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for inline usage if needed

export default function OnboardingExam() {
  const router = useRouter();
  const { targetExam, setTargetExam } = useStore();

  // Use the icons defined in constants/images.ts
  const examIcons = {
    jee_advanced: images.jeeAdvancedIcon,
    jee_main: images.jeeMainIcon,
    neet: images.neetIcon,
    boards: images.boardsIcon,
  };

  const exams = [
    { id: 'jee_advanced', name: 'JEE Advanced', description: 'For top engineering aspirants', iconComponent: <Ionicons name={examIcons.jee_advanced} size={24} color="#fff" /> },
    { id: 'jee_main', name: 'JEE Main', description: 'National level engineering entrance', iconComponent: <Ionicons name={examIcons.jee_main} size={24} color="#fff" /> },
    { id: 'neet', name: 'NEET', description: 'Medical entrance examination', iconComponent: <Ionicons name={examIcons.neetIcon} size={24} color="#fff" /> },
    { id: 'boards', name: 'CBSE Boards', description: 'School board examinations', iconComponent: <Ionicons name={examIcons.boardsIcon} size={24} color="#fff" /> },
  ];

  const handleSelectExam = (examId: string) => {
    setTargetExam(examId);
  };

  const handleContinue = () => {
    if (targetExam) {
      router.push('/onboarding-level');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-purple-950">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View className="flex-1 items-center px-6">
        <Image
          source={images.firstOnboardingBg} // Reusing background image
          className="absolute top-0 left-0 right-0 w-full h-full"
          resizeMode="cover"
        />

        <View className="mt-32 w-full">
          <Text className="text-2xl font-bold text-white mb-4 text-center">Which exam are you preparing for?</Text>
          <View className="flex-wrap flex-row justify-center gap-4">
            {exams.map((exam) => (
              <TouchableOpacity
                key={exam.id}
                onPress={() => handleSelectExam(exam.id)}
                className={`w-[45%] p-4 rounded-lg border-2 items-center justify-center ${targetExam === exam.id ? 'border-blue-400 bg-blue-900' : 'border-gray-700 bg-purple-800'}`}
              >
                {/* Render the Ionicons component directly */}
                {exam.iconComponent}
                <Text className="text-white font-semibold text-sm text-center mt-2">{exam.name}</Text>
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
            <Text className="text-white text-lg font-bold">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
