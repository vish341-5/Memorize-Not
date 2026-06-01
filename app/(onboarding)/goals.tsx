import { Ionicons } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { images } from '@/constants/images';
import useOnboardingStore from '@/store/onboarding-store';
import { GoalType, SubjectType } from '@/types/onboarding';

interface SubjectOption {
  id: SubjectType;
  label: string;
  subtitle: string;
  source: ImageSourcePropType;
}

interface HourOption {
  label: string;
  value: number;
}

interface GoalOption {
  id: GoalType;
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
}

const subjectOptions: SubjectOption[] = [
  {
    id: 'physics',
    label: 'Physics',
    subtitle: 'Mechanics, Electricity, Optics & more',
    source: images.subjectPhysics,
  },
  {
    id: 'chemistry',
    label: 'Chemistry',
    subtitle: 'Physical, Organic, Inorganic & more',
    source: images.subjectChemistry,
  },
  {
    id: 'mathematics',
    label: 'Mathematics',
    subtitle: 'Algebra, Calculus, Coordinate & more',
    source: images.subjectMathematics,
  },
];

const hourOptions: HourOption[] = [
  { label: '< 1 hr', value: 0.5 },
  { label: '1–2 hrs', value: 1.5 },
  { label: '2–3 hrs', value: 2.5 },
  { label: '3–4 hrs', value: 3.5 },
  { label: '4+ hrs', value: 4.5 },
];

const goalOptions: GoalOption[] = [
  { id: 'improve-rank',        label: 'Improve Rank',        icon: 'trophy-outline',      iconColor: '#7C3AED' },
  { id: 'solve-more-problems', label: 'Solve More Problems', icon: 'puzzle-outline',      iconColor: '#F59E0B' },
  { id: 'concept-clarity',     label: 'Concept Clarity',     icon: 'bulb-outline',        iconColor: '#22C55E' },
  { id: 'be-consistent',       label: 'Be Consistent',       icon: 'calendar-outline',    iconColor: '#38BDF8' },
  { id: 'score-high',          label: 'Score High',          icon: 'bar-chart-outline',   iconColor: '#EF4444' },
  { id: 'compete-and-win',     label: 'Compete & Win',       icon: 'flame-outline',       iconColor: '#7C3AED' },
  { id: 'track-progress',      label: 'Track Progress',      icon: 'trending-up-outline', iconColor: '#06B6D4' },
  { id: 'build-basics',        label: 'Build Basics',        icon: 'layers-outline',      iconColor: '#F59E0B' },
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

function SubjectCard({
  option,
  selected,
  onPress,
}: {
  option: SubjectOption;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 items-center rounded-brand-md border p-3"
      style={{
        borderColor: selected ? '#7C3AED' : '#1e2747',
        backgroundColor: selected ? '#1a1040' : '#0b1326',
      }}
    >
      <View className="flex-row justify-end w-full mb-1">
        <View
          className="h-5 w-5 items-center justify-center rounded-full border-2"
          style={{ borderColor: selected ? '#7C3AED' : '#475569' }}
        >
          {selected && (
            <Ionicons name="checkmark" size={11} color="#7C3AED" />
          )}
        </View>
      </View>
      <Image
        source={option.source}
        style={{ width: 52, height: 52 }}
        resizeMode="contain"
      />
      <Text className="text-body-sm font-poppins-semibold text-primary-text mt-2 text-center">
        {option.label}
      </Text>
      <Text className="text-caption muted-text mt-0.5 text-center">
        {option.subtitle}
      </Text>
    </Pressable>
  );
}

function GoalCard({
  option,
  selected,
  onPress,
}: {
  option: GoalOption;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-brand-md border px-3 py-3 flex-row items-center gap-2"
      style={{
        borderColor: selected ? '#7C3AED' : '#1e2747',
        backgroundColor: selected ? '#1a1040' : '#0b1326',
        minWidth: '45%',
        flex: 1,
      }}
    >
      <Ionicons name={option.icon} size={18} color={option.iconColor} />
      <Text className="text-body-sm text-primary-text flex-1" numberOfLines={2}>
        {option.label}
      </Text>
      {selected && (
        <Ionicons name="checkmark-circle" size={16} color="#7C3AED" />
      )}
    </Pressable>
  );
}

export default function GoalsScreen() {
  const {
    subjects,
    targetExamDate,
    dailyStudyHours,
    goals,
    toggleSubject,
    setTargetExamDate,
    setDailyStudyHours,
    toggleGoal,
  } = useOnboardingStore();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dontKnow, setDontKnow] = useState(false);
  const [error, setError] = useState('');

  const displayDate = dontKnow
    ? "I don't know yet"
    : targetExamDate
    ? new Date(targetExamDate).toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
      })
    : 'Select exam date';

  const handleDontKnow = () => {
    setDontKnow(true);
    setTargetExamDate(null);
    setShowDatePicker(false);
    setError('');
  };

  const handleDateChange = (_: unknown, date?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (date) {
      setDontKnow(false);
      setTargetExamDate(date.toISOString());
      setError('');
    }
  };

  const handleNext = () => {
    if (subjects.length === 0) {
      setError('Please select at least one subject.');
      return;
    }
    if (!targetExamDate && !dontKnow) {
      setError('Please select your target exam date or choose "I don\'t know yet".');
      return;
    }
    if (!dailyStudyHours) {
      setError('Please select how many hours you can study daily.');
      return;
    }
    if (goals.length === 0) {
      setError('Please select at least one goal.');
      return;
    }
    setError('');
    router.push('/(onboarding)/done');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#070b1a' }}>
      <ScrollView showsVerticalScrollIndicator={false}>

        {/* Hero */}
        <ImageBackground
          source={images.thirdOnboardingBg}
          className="w-full"
          style={{ height: 130, marginTop: 30 }}
          resizeMode="cover"
        >
        </ImageBackground>

        <View className="px-4 gap-6 mt-5">

          {/* Section 1 — Subjects */}
          <View>
            <Text className="text-h4 mb-1">1.  Which subjects will you focus on?</Text>
            <Text className="text-caption muted-text mb-3">You can change this anytime.</Text>
            <View className="flex-row gap-3">
              {subjectOptions.map((s) => (
                <SubjectCard
                  key={s.id}
                  option={s}
                  selected={subjects.includes(s.id)}
                  onPress={() => { toggleSubject(s.id); setError(''); }}
                />
              ))}
            </View>
          </View>

          {/* Section 2 — Exam Date */}
          <View>
            <Text className="text-h4 mb-3">2.  When is your target exam?</Text>
            <Pressable
              onPress={() => setShowDatePicker(true)}
              className="rounded-brand-md border flex-row items-center px-4 py-4"
              style={{ borderColor: '#1e2747', backgroundColor: '#0b1326' }}
            >
              <Ionicons name="calendar-outline" size={18} color="#6C8CFF" />
              <Text className="text-body-md text-primary-text flex-1 ml-3">
                {displayDate}
              </Text>
              <Ionicons name="chevron-down-outline" size={18} color="#475569" />
            </Pressable>

            <Pressable
              onPress={handleDontKnow}
              className="flex-row items-center gap-2 mt-2 px-1"
            >
              <View
                className="h-4 w-4 items-center justify-center rounded-full border-2"
                style={{ borderColor: dontKnow ? '#6C8CFF' : '#475569' }}
              >
                {dontKnow && (
                  <View className="h-2 w-2 rounded-full bg-dolphin-blue" />
                )}
              </View>
              <Text className="text-body-sm muted-text">I don't know yet</Text>
            </Pressable>

            {showDatePicker && (
              <DateTimePicker
                value={targetExamDate ? new Date(targetExamDate) : new Date()}
                mode="date"
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                minimumDate={new Date()}
                onChange={handleDateChange}
              />
            )}
          </View>

          {/* Section 3 — Daily Hours */}
          <View>
            <Text className="text-h4 mb-1">3.  How many hours can you study daily?</Text>
            <View className="flex-row items-center gap-1 mb-3">
              <Ionicons name="time-outline" size={13} color="#475569" />
              <Text className="text-caption muted-text">Don't worry, you can change this anytime.</Text>
            </View>
            <View className="flex-row flex-wrap gap-2">
              {hourOptions.map((h) => (
                <Pressable
                  key={h.value}
                  onPress={() => { setDailyStudyHours(h.value); setError(''); }}
                  className="rounded-brand-md border px-4 py-2 flex-row items-center gap-1"
                  style={{
                    borderColor: dailyStudyHours === h.value ? '#7C3AED' : '#1e2747',
                    backgroundColor: dailyStudyHours === h.value ? '#7C3AED' : '#0b1326',
                  }}
                >
                  <Text
                    className="text-body-sm"
                    style={{ color: dailyStudyHours === h.value ? '#fff' : '#f0f2fa' }}
                  >
                    {h.label}
                  </Text>
                  {dailyStudyHours === h.value && (
                    <Ionicons name="checkmark" size={14} color="#fff" />
                  )}
                </Pressable>
              ))}
            </View>
          </View>

          {/* Section 4 — Goals */}
          <View>
            <Text className="text-h4 mb-1">4.  What matters most to you?</Text>
            <Text className="text-caption muted-text mb-3">Choose up to 3</Text>
            <View className="flex-row flex-wrap gap-2">
              {goalOptions.map((g, index) => (
                index % 2 === 0 ? (
                  <View key={g.id} className="flex-row gap-2 w-full">
                    <GoalCard
                      option={goalOptions[index]}
                      selected={goals.includes(goalOptions[index].id)}
                      onPress={() => { toggleGoal(goalOptions[index].id); setError(''); }}
                    />
                    {goalOptions[index + 1] && (
                      <GoalCard
                        option={goalOptions[index + 1]}
                        selected={goals.includes(goalOptions[index + 1].id)}
                        onPress={() => { toggleGoal(goalOptions[index + 1].id); setError(''); }}
                      />
                    )}
                  </View>
                ) : null
              ))}
            </View>
          </View>

          {/* Mascot card */}
          <View className="brand-panel flex-row items-center gap-3 p-4">
            <Image
              source={images.pixelMascot}
              style={{ width: 70, height: 70 }}
              resizeMode="contain"
            />
            <View className="flex-1">
              <Text className="text-body-md text-primary-text">
                Perfect! We'll create a personalized plan, track your progress and keep you motivated. 💪
              </Text>
            </View>
          </View>

          {/* Error */}
          {error ? (
            <Text className="text-body-sm text-center" style={{ color: '#ff4d4f' }}>
              {error}
            </Text>
          ) : null}

          {/* CTA */}
          <Pressable
            className="h-16 w-full items-center justify-center rounded-brand-xl bg-atomic-purple mb-2"
            onPress={handleNext}
          >
            <Text className="text-h4 text-primary-text">Continue to Finish →</Text>
          </Pressable>

        </View>

        <StepIndicator current={2} />

      </ScrollView>
    </SafeAreaView>
  );
}