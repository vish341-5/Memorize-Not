// app/(auth)/onboarding-level.tsx
import { Stack, useRouter } from 'expo-router';
import { Image, View, Text, TouchableOpacity } from 'react-native';
import { useStore } from '@/store/onboarding-store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images'; // Import centralized images

export default function OnboardingLevel() {
  const router = useRouter();
  const { targetExam, level, setLevel } = useStore(); // Assuming level and setLevel are part of the store

  const levels = [
    { id: 'beginner', name: 'Beginner', description: 'Just starting out', icon: images.beginnerIcon },
    { id: 'basic', name: 'Basic', description: 'Know the basics', icon: images.basicIcon },
    { id: 'intermediate', name: 'Intermediate', description: 'Some practice done', icon: images.intermediateIcon },
    { id: 'advanced', name: 'Advanced', description: 'Ready for the next level', icon: images.advancedIcon },
  ];

  const handleSelectLevel = (levelId: string) => {
    setLevel(levelId);
  };

  const handleContinue = () => {
    // Navigate to the next onboarding screen or finish onboarding
    // For now, let's just log the selected exam and level
    console.log('Selected Exam:', targetExam);
    console.log('Selected Level:', level);
    // router.push('/next-screen'); // Replace with the actual next screen
    // For testing, let's navigate to a placeholder screen that shows the selected data
    router.push('/onboarding-summary');
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

        {/* Display selected exam for verification */}
        <View className="absolute top-16 left-4 right-4 items-center">
          <Text className="text-white text-lg font-bold">Selected Exam: {targetExam || 'None'}</Text>
        </View>

        <View className="mt-32 w-full">
          <Text className="text-2xl font-bold text-white mb-4 text-center">How would you describe your current level?</Text>
          <View className="flex-wrap flex-row justify-center gap-4">
            {levels.map((lvl) => (
              <TouchableOpacity
                key={lvl.id}
                onPress={() => handleSelectLevel(lvl.id)}
                className={`w-[45%] p-4 rounded-lg border-2 items-center justify-center ${level === lvl.id ? 'border-blue-400 bg-blue-900' : 'border-gray-700 bg-purple-800'}`}
              >
                <Image source={lvl.icon} className="w-12 h-12 mb-2" resizeMode="contain" />
                <Text className="text-white font-semibold text-sm text-center">{lvl.name}</Text>
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
