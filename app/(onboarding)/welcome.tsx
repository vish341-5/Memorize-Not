import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { images } from '@/constants/images';
import useOnboardingStore from '@/store/onboarding-store';
import { ExamType, StudyLevel } from '@/types/onboarding';

interface ExamOption {
  id: ExamType;
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconBg: string;
}

interface LevelOption {
  id: StudyLevel;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
}

const examOptions: ExamOption[] = [
  {
    id: 'jee_advanced',
    title: 'Crack JEE Advanced',
    icon: 'trophy-outline',
    iconBg: '#7C3AED',
  },
  {
    id: 'jee_main',
    title: 'Crack JEE Main',
    icon: 'rocket-outline',
    iconBg: '#1565FF',
  },
  {
    id: 'neet',
    title: 'Crack NEET',
    icon: 'medkit-outline',
    iconBg: '#16A34A',
  },
  {
    id: 'boards',
    title: 'Prepare for Boards',
    icon: 'book-outline',
    iconBg: '#EA580C',
  },
];

const levelOptions: LevelOption[] = [
  {
    id: 'beginner',
    title: 'Beginner',
    description: 'Just starting out',
    icon: 'leaf-outline',
    iconColor: '#22C55E',
  },
  {
    id: 'basic',
    title: 'Basic',
    description: 'Know the basics',
    icon: 'bar-chart-outline',
    iconColor: '#38BDF8',
  },
  {
    id: 'intermediate',
    title: 'Intermediate',
    description: 'Some practice done',
    icon: 'flash-outline',
    iconColor: '#FACC15',
  },
  {
    id: 'advanced',
    title: 'Advanced',
    description: 'Ready for the next level',
    icon: 'rocket-outline',
    iconColor: '#FF6B9D',
  },
];

const steps = ['Welcome', 'Profile', 'Goals', 'Done'];

function StepIndicator({ current }: { current: number }) {
  return (
    <View className="flex-row items-start justify-center pb-6 pt-4">
      {steps.map((step, index) => (
        <View key={step} className="items-center">
          <View className="flex-row items-center">
            <View
              className={`h-3 w-3 rounded-full ${
                index === current ? 'bg-dolphin-blue' : 'bg-border'
              }`}
            />
            {index < steps.length - 1 && (
              <View className="h-px w-15 bg-border" />
            )}
          </View>
          <Text
            className={`mt-1 text-caption ${
              index === current ? 'text-primary-text' : 'muted-text'
            }`}
          >
            {step}
          </Text>
        </View>
      ))}
    </View>
  );
}

function ExamCard({
  option,
  selected,
  onPress,
}: {
  option: ExamOption;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 rounded-brand-md border p-3"
      style={{ borderColor: selected ? '#6C8CFF' : '#1e2747', backgroundColor: '#0b1326' }}
    >
      <View className="flex-row items-start gap-3">
        <View
          className="h-11 w-11 items-center justify-center rounded-brand-sm"
          style={{ backgroundColor: option.iconBg }}
        >
          <Ionicons name={option.icon} size={22} color="#fff" />
        </View>
        <View className="flex-1 pr-1">
          <Text className="text-body-sm font-poppins-semibold text-primary-text">
            {option.title}
          </Text>
        </View>
        <View
          className="mt-1 h-5 w-5 items-center justify-center rounded-full border-2"
          style={{ borderColor: selected ? '#6C8CFF' : '#475569' }}
        >
          {selected && (
            <View className="h-2.5 w-2.5 rounded-full bg-dolphin-blue" />
          )}
        </View>
      </View>
    </Pressable>
  );
}

function LevelCard({
  option,
  selected,
  onPress,
}: {
  option: LevelOption;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center rounded-brand-md border p-3"
      style={{
        borderColor: selected ? '#6C8CFF' : '#1e2747',
        backgroundColor: selected ? '#141b2a' : '#0b1326',
      }}
    >
      <Ionicons name={option.icon} size={26} color={option.iconColor} />
      <Text className="text-body-sm font-poppins-semibold text-primary-text mt-2 text-center">
        {option.title}
      </Text>
      <Text className="text-caption muted-text mt-0.5 text-center">
        {option.description}
      </Text>
    </Pressable>
  );
}

export default function WelcomeScreen() {
  const { targetExam, currentLevel, setTargetExam, setCurrentLevel } =
    useOnboardingStore();

  const [error, setError] = useState('');

  const handleNext = () => {
    if (!targetExam && !currentLevel) {
      setError('Please select your target exam and current level.');
      return;
    }
    if (!targetExam) {
      setError('Please select your target exam.');
      return;
    }
    if (!currentLevel) {
      setError('Please select your current level.');
      return;
    }
    setError('');
    router.push('/(onboarding)/profile');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#070b1a' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <ImageBackground
          source={images.firstOnboardingBg}
          className="w-full"
          style={{ height: 200, marginTop: 30 }}
          resizeMode="cover"
        >
        </ImageBackground>

        {/* Content */}
        <View className="px-4 gap-4 mt-4">

          {/* What will you achieve */}
          <View className="brand-panel p-4">
            <Text className="text-h4 mb-3">What will you achieve?</Text>
            <View className="gap-3">
              <View className="flex-col gap-3">
                <ExamCard
                  option={examOptions[0]}
                  selected={targetExam === examOptions[0].id}
                  onPress={() => { setTargetExam(examOptions[0].id); setError(''); }}
                />
                <ExamCard
                  option={examOptions[1]}
                  selected={targetExam === examOptions[1].id}
                  onPress={() => { setTargetExam(examOptions[1].id); setError(''); }}
                />
              </View>
              <View className="flex-col gap-3">
                <ExamCard
                  option={examOptions[2]}
                  selected={targetExam === examOptions[2].id}
                  onPress={() => { setTargetExam(examOptions[2].id); setError(''); }}
                />
                <ExamCard
                  option={examOptions[3]}
                  selected={targetExam === examOptions[3].id}
                  onPress={() => { setTargetExam(examOptions[3].id); setError(''); }}
                />
              </View>
            </View>
          </View>

          {/* Current Level */}
          <View className="brand-panel p-4">
            <Text className="text-h4 mb-3">
              How would you describe your current level?
            </Text>
            <View className="flex-col gap-2">
              {levelOptions.map((level) => (
                <LevelCard
                  key={level.id}
                  option={level}
                  selected={currentLevel === level.id}
                  onPress={() => { setCurrentLevel(level.id); setError(''); }}
                />
              ))}
            </View>
          </View>

          {/* Pixel Mascot Card */}
          <View className="brand-panel flex-row items-center gap-3 p-4">
            <Image
              source={images.pixelMascot}
              style={{ width: 90, height: 90 }}
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-h4">Pixel ✨</Text>
              <Text className="text-body-sm muted-text mt-1">
                I'm Pixel! I'll guide you, motivate you, and celebrate your progress with you.
              </Text>
              <Text className="text-body-sm mt-2" style={{ color: '#00e5ff' }}>
                Together, we'll make every problem a step closer to your dream! 🐬
              </Text>
            </View>
          </View>

          {/* Error */}
          {error ? (
            <Text className="text-body-sm text-center" style={{ color: '#ff4d4f' }}>
              {error}
            </Text>
          ) : null}

          {/* CTA Button */}
          <Pressable
            className="h-16 w-full items-center justify-center rounded-brand-xl bg-atomic-purple mb-2"
            onPress={handleNext}
          >
            <Text className="text-h4 text-primary-text">Let's Get Started →</Text>
          </Pressable>
        </View>

        {/* Step Indicator */}
        <StepIndicator current={0} />

      </ScrollView>
    </SafeAreaView>
  );
}