// app/(auth)/onboarding-level.tsx
import { Stack, useRouter } from 'expo-router';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useStore } from '@/store/onboarding-store';
import { images } from '@/constants/images'; // Import centralized images
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for inline usage if needed

export default function OnboardingLevel() {
  const router = useRouter();
  const { targetExam, level, setLevel } = useStore();

  // Use the icons defined in constants/images.ts
  const levelIcons = {
    beginner: images.beginnerIcon,
    basic: images.basicIcon,
    intermediate: images.intermediateIcon,
    advanced: images.advancedIcon,
  };

  const levels = [
    { id: 'beginner', name: 'Beginner', description: 'Starting out', iconComponent: <Ionicons name={levelIcons.beginner} size={24} color="#fff" /> },
    { id: 'basic', name: 'Basic', description: 'Good foundation', iconComponent: <Ionicons name={levelIcons.basic} size={24} color="#fff" /> },
    { id: 'intermediate', name: 'Intermediate', description: 'Solid understanding', iconComponent: <Ionicons name={levelIcons.intermediate} size={24} color="#fff" /> },
    { id: 'advanced', name: 'Advanced', description: 'Mastery level', iconComponent: <Ionicons name={levelIcons.advanced} size={24} color="#fff" /> },
  ];

  // Dummy data for exam titles, as targetExam is just an ID
  const getExamTitle = (examId: string | null) => {
    switch (examId) {
      case 'jee_advanced': return 'JEE Advanced';
      case 'jee_main': return 'JEE Main';
      case 'neet': return 'NEET';
      case 'boards': return 'CBSE Boards';
      default: return 'Unknown Exam';
    }
  };

  const handleSelectLevel = (levelId: string) => {
    setLevel(levelId);
  };

  const handleContinue = () => {
    if (targetExam && level) {
      // Placeholder navigation, adjust as needed
      router.push('/onboarding-profile');
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
          <Text className="text-2xl font-bold text-white mb-4 text-center">
            Selected Exam: <Text className="text-blue-400">{getExamTitle(targetExam)}</Text>
          </Text>
          <Text className="text-2xl font-bold text-white mb-4 text-center">What's your current level?</Text>

          <View className="flex-wrap flex-row justify-center gap-4">
            {levels.map((lvl) => (
              <TouchableOpacity
                key={lvl.id}
                onPress={() => handleSelectLevel(lvl.id)}
                className={`w-[45%] p-4 rounded-lg border-2 items-center justify-center ${level === lvl.id ? 'border-blue-400 bg-blue-900' : 'border-gray-700 bg-purple-800'}`}
              >
                {/* Render the Ionicons component directly */}
                {lvl.iconComponent}
                <Text className="text-white font-semibold text-sm text-center mt-2">{lvl.name}</Text>
                <Text className="text-gray-300 text-xs text-center mt-1">{lvl.description}</Text>
                {level === lvl.id && (
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
            disabled={!level} // Disable if level is not selected
            className={`w-full py-4 rounded-lg items-center justify-center ${level ? 'bg-purple-600' : 'bg-gray-600'}`}
          >
            <Text className="text-white text-lg font-bold">Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
