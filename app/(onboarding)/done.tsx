import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
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

const SAMPLE_PLAN = {
  totalProblems: 3,
  estimatedMinutes: 20,
  problems: [
    { id: '1', topic: 'Mechanics', difficulty: 'Easy' },
    { id: '2', topic: 'Algebra', difficulty: 'Medium' },
    { id: '3', topic: 'Coordinate Geometry', difficulty: 'Medium' },
  ],
  dailyGoal: { completed: 3, total: 3 },
  weeklyTarget: { completed: 15, total: 21 },
};

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

function ProgressBar({ progress }: { progress: number }) {
  return (
    <View
      className="h-2 w-full rounded-full overflow-hidden"
      style={{ backgroundColor: '#1e2747' }}
    >
      <View
        className="h-full rounded-full"
        style={{
          width: `${Math.min(progress * 100, 100)}%`,
          backgroundColor: '#7C3AED',
        }}
      />
    </View>
  );
}

export default function DoneScreen() {
  const { setCompleted } = useOnboardingStore();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#070b1a' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <ImageBackground
          source={images.fourthOnboardingBg}
          className="w-full"
          style={{ height: 130, marginTop: 25 }}
          resizeMode="cover"
        >
        </ImageBackground>

        <View className="px-4 gap-4 mt-4">

          {/* Here's What You Get */}
          <View className="brand-panel p-4">
            <Text className="section-label mb-4">Here's What You Get</Text>
            <View className="flex-row justify-between">

              <View className="items-center flex-1">
                <View
                  className="h-12 w-12 items-center justify-center rounded-brand-sm mb-2"
                  style={{ backgroundColor: '#1a1040' }}
                >
                  <Image
                    source={images.iconStreak}
                    style={{ width: 28, height: 28 }}
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-body-sm font-poppins-semibold text-primary-text text-center">
                  Track Streaks
                </Text>
                <Text className="text-caption muted-text text-center mt-0.5">
                  Build consistency
                </Text>
              </View>

              <View className="items-center flex-1">
                <View
                  className="h-12 w-12 items-center justify-center rounded-brand-sm mb-2"
                  style={{ backgroundColor: '#1a1040' }}
                >
                  <Image
                    source={images.iconReward}
                    style={{ width: 28, height: 28 }}
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-body-sm font-poppins-semibold text-primary-text text-center">
                  Solve & Learn
                </Text>
                <Text className="text-caption muted-text text-center mt-0.5">
                  High quality problems
                </Text>
              </View>

              <View className="items-center flex-1">
                <View
                  className="h-12 w-12 items-center justify-center rounded-brand-sm mb-2"
                  style={{ backgroundColor: '#1a1040' }}
                >
                  <Image
                    source={images.iconStats}
                    style={{ width: 28, height: 28 }}
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-body-sm font-poppins-semibold text-primary-text text-center">
                  See Your Progress
                </Text>
                <Text className="text-caption muted-text text-center mt-0.5">
                  Smart analytics
                </Text>
              </View>

              <View className="items-center flex-1">
                <View
                  className="h-12 w-12 items-center justify-center rounded-brand-sm mb-2"
                  style={{ backgroundColor: '#1a1040' }}
                >
                  <Image
                    source={images.iconTrophy}
                    style={{ width: 28, height: 28 }}
                    resizeMode="contain"
                  />
                </View>
                <Text className="text-body-sm font-poppins-semibold text-primary-text text-center">
                  Compete & Win
                </Text>
                <Text className="text-caption muted-text text-center mt-0.5">
                  Join contests and win
                </Text>
              </View>

            </View>
          </View>

          {/* Starter Kit */}
          <View className="brand-panel p-4">
            <Text className="section-label mb-4">Your Starter Kit</Text>
            <View className="flex-col items-center gap-3">
              <Image
                source={images.treasureChest}
                style={{ width: 600, height: 250 }}
                resizeMode="contain"
              />
              <View className="flex-1 gap-2">
                <Text className="text-body-sm text-primary-text">
                  Kickstart your journey with these exciting rewards! 🎁
                </Text>
                <View className="flex-row gap-2">
                  <View
                    className="flex-1 rounded-brand-sm p-3"
                    style={{ backgroundColor: '#0b1326', borderWidth: 1, borderColor: '#1e2747' }}
                  >
                    <View className="flex-row items-center gap-1 mb-1">
                      <Image
                        source={images.iconStreak}
                        style={{ width: 18, height: 18 }}
                        resizeMode="contain"
                      />
                      <Text className="text-h4">3</Text>
                    </View>
                    <Text className="text-body-sm font-poppins-semibold text-primary-text">
                      Day Streak Shield
                    </Text>
                    <Text className="text-caption muted-text">Protect your streak</Text>
                  </View>

                  <View
                    className="flex-1 rounded-brand-sm p-3"
                    style={{ backgroundColor: '#0b1326', borderWidth: 1, borderColor: '#1e2747' }}
                  >
                    <View className="flex-row items-center gap-1 mb-1">
                      <Image
                        source={images.iconReward}
                        style={{ width: 18, height: 18 }}
                        resizeMode="contain"
                      />
                      <Text className="text-h4">100</Text>
                    </View>
                    <Text className="text-body-sm font-poppins-semibold text-primary-text">
                      Welcome Points
                    </Text>
                    <Text className="text-caption muted-text">Use in the store</Text>
                  </View>
                </View>
              </View>
            </View>

            <Pressable
              className="flex-row items-center gap-3 rounded-brand-sm mt-3 px-3 py-3"
              style={{ backgroundColor: '#0b1326', borderWidth: 1, borderColor: '#1e2747' }}
            >
              <Ionicons name="star" size={18} color="#FACC15" />
              <Text className="text-body-sm text-primary-text flex-1">
                Complete the Daily Challenge every day to earn XP, Points and keep your streak alive!
              </Text>
              <Ionicons name="chevron-forward" size={16} color="#475569" />
            </Pressable>
          </View>

          {/* Study Plan Preview */}
          <View className="brand-panel p-4">
            <Text className="section-label mb-4">Your Study Plan Preview</Text>

            <View className="flex-col gap-3">
              <View className="flex-1">
                <View className="flex-row items-center gap-2 mb-2">
                  <Ionicons name="calendar-outline" size={14} color="#6C8CFF" />
                  <Text className="text-caption muted-text">Today's Plan</Text>
                </View>
                <View className="flex-row items-center gap-2 mb-2">
                  <Text className="text-h3 text-primary-text">
                    {SAMPLE_PLAN.totalProblems} Problems
                  </Text>
                  <View
                    className="rounded-full px-2 py-0.5"
                    style={{ backgroundColor: '#1e2747' }}
                  >
                    <Text className="text-caption muted-text">
                      ~{SAMPLE_PLAN.estimatedMinutes} min
                    </Text>
                  </View>
                </View>
                {SAMPLE_PLAN.problems.map((p) => (
                  <View key={p.id} className="flex-row items-center gap-2 mb-1">
                    <View
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: '#7C3AED' }}
                    />
                    <Text className="text-caption text-primary-text">
                      1 {p.topic} ({p.difficulty})
                    </Text>
                  </View>
                ))}
              </View>

              <View className="flex-1 gap-4">
                <View>
                  <View className="flex-row items-center gap-2 mb-1">
                    <Ionicons name="trophy-outline" size={14} color="#6C8CFF" />
                    <Text className="text-caption muted-text">Daily Goal</Text>
                  </View>
                  <Text className="text-body-sm text-primary-text mb-1">
                    {SAMPLE_PLAN.dailyGoal.completed} / {SAMPLE_PLAN.dailyGoal.total} problems
                  </Text>
                  <ProgressBar
                    progress={SAMPLE_PLAN.dailyGoal.completed / SAMPLE_PLAN.dailyGoal.total}
                  />
                </View>

                <View>
                  <View className="flex-row items-center gap-2 mb-1">
                    <Ionicons name="calendar-outline" size={14} color="#6C8CFF" />
                    <Text className="text-caption muted-text">Weekly Target</Text>
                  </View>
                  <Text className="text-body-sm text-primary-text mb-1">
                    {SAMPLE_PLAN.weeklyTarget.completed} / {SAMPLE_PLAN.weeklyTarget.total} problems
                  </Text>
                  <ProgressBar
                    progress={SAMPLE_PLAN.weeklyTarget.completed / SAMPLE_PLAN.weeklyTarget.total}
                  />
                </View>
              </View>
            </View>

            <View className="flex-row items-center gap-3 mt-4">
              <Image
                source={images.pixelMascot}
                style={{ width: 50, height: 50 }}
                resizeMode="contain"
              />
              <View
                className="flex-1 rounded-brand-sm px-3 py-2"
                style={{ backgroundColor: '#0b1326', borderWidth: 1, borderColor: '#1e2747' }}
              >
                <Text className="text-body-sm text-primary-text">
                  Don't worry if you miss a day.{'\n'}I'll help you bounce back! 💪
                </Text>
              </View>
            </View>
          </View>

          {/* CTA */}
          <Pressable
            className="h-16 w-full items-center justify-center rounded-brand-xl bg-atomic-purple mb-2"
            onPress={() => {
              setCompleted(true);
              router.replace('/');
            }}
          >
            <Text className="text-h4 text-primary-text">Let's Go to Home →</Text>
          </Pressable>

        </View>

        <StepIndicator current={3} />

      </ScrollView>
    </SafeAreaView>
  );
}