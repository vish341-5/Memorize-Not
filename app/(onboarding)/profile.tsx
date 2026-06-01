import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import {
  Image,
  ImageBackground,
  ImageSourcePropType,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';

import { images } from '@/constants/images';
import useOnboardingStore from '@/store/onboarding-store';
import { AvatarType, GradeType } from '@/types/onboarding';

interface AvatarOption {
  id: AvatarType;
  source: ImageSourcePropType;
}

interface GradeOption {
  id: GradeType;
  label: string;
}

const avatarOptions: AvatarOption[] = [
  { id: 'default',   source: images.avatarDefault },
  { id: 'reader',    source: images.avatarReader },
  { id: 'gym',       source: images.avatarGym },
  { id: 'scientist', source: images.avatarScientist },
  { id: 'rocket',    source: images.avatarRocket },
  { id: 'explorer',  source: images.avatarExplorer },
  { id: 'coder',     source: images.avatarCoder },
  { id: 'surfer',    source: images.avatarSurfer },
];

const gradeOptions: GradeOption[] = [
  { id: '11th',    label: 'Class 11th' },
  { id: '12th',    label: 'Class 12th' },
  { id: 'dropper', label: '1st Year Dropper' },
  { id: 'college', label: '2nd Year Dropper' },
];

const steps = ['Welcome', 'Profile', 'Goals', 'Done'];
const MAX_NICKNAME = 20;

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

function AvatarCard({
  option,
  selected,
  onPress,
}: {
  option: AvatarOption;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="rounded-brand-md overflow-hidden"
      style={{
        width: '23%',
        aspectRatio: 1,
        borderWidth: 2,
        borderColor: selected ? '#7C3AED' : '#1e2747',
        backgroundColor: '#0b1326',
      }}
    >
      <Image
        source={option.source}
        className="h-full w-full"
        resizeMode="cover"
      />
      {selected && (
        <View
          className="absolute right-1 top-1 h-5 w-5 items-center justify-center rounded-full"
          style={{ backgroundColor: '#7C3AED' }}
        >
          <Ionicons name="checkmark" size={12} color="#fff" />
        </View>
      )}
    </Pressable>
  );
}

function GradeCard({
  option,
  selected,
  onPress,
}: {
  option: GradeOption;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      className="flex-1 flex-row items-center gap-3 rounded-brand-md border p-4"
      style={{ borderColor: selected ? '#6C8CFF' : '#1e2747', backgroundColor: '#0b1326' }}
    >
      <View
        className="h-5 w-5 items-center justify-center rounded-full border-2"
        style={{ borderColor: selected ? '#6C8CFF' : '#475569' }}
      >
        {selected && (
          <View className="h-2.5 w-2.5 rounded-full bg-dolphin-blue" />
        )}
      </View>
      <Text className="text-body-sm text-primary-text">{option.label}</Text>
    </Pressable>
  );
}

export default function ProfileScreen() {
  const { avatar, nickname, grade, setAvatar, setNickname, setGrade } =
    useOnboardingStore();

  const [error, setError] = useState('');

  const handleNext = () => {
    if (nickname.trim().length === 0 && !grade) {
      setError('Please enter a nickname and select your grade.');
      return;
    }
    if (nickname.trim().length === 0) {
      setError('Please enter a nickname.');
      return;
    }
    if (!grade) {
      setError('Please select your current grade.');
      return;
    }
    setError('');
    router.push('/(onboarding)/goals');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#070b1a' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* Hero */}
          <ImageBackground
            source={images.secondOnboardingBg}
            className="w-full"
            style={{ height: 130, marginTop: 30 }}
            resizeMode="cover"
          >
          </ImageBackground>

          <View className="px-4 gap-5 mt-5">

            {/* Section 1 — Avatar */}
            <View>
              <Text className="text-h4 mb-3">1. Choose Your Avatar</Text>
              <View className="flex-row flex-wrap gap-2">
                {avatarOptions.map((opt) => (
                  <AvatarCard
                    key={opt.id}
                    option={opt}
                    selected={avatar === opt.id}
                    onPress={() => setAvatar(opt.id)}
                  />
                ))}
              </View>
            </View>

            {/* Section 2 — Nickname */}
            <View>
              <View className="flex-row items-center gap-2 mb-3">
                <Ionicons name="person-outline" size={18} color="#6C8CFF" />
                <Text className="text-h4">2. What should we call you?</Text>
              </View>
              <View
                className="rounded-brand-md border px-4 py-3 flex-row items-center"
                style={{ borderColor: '#1e2747', backgroundColor: '#0b1326' }}
              >
                <TextInput
                  placeholder="Enter your name or nickname"
                  placeholderTextColor="#475569"
                  maxLength={MAX_NICKNAME}
                  value={nickname}
                  onChangeText={(val) => { setNickname(val); setError(''); }}
                  className="flex-1 text-body-md"
                  style={{ color: '#f0f2fa' }}
                />
                <Text className="text-caption muted-text">
                  {nickname.length}/{MAX_NICKNAME}
                </Text>
              </View>
              <View className="flex-row items-center gap-2 mt-2">
                <Ionicons name="lock-closed-outline" size={13} color="#475569" />
                <Text className="text-caption muted-text">
                  This will be visible to you only. You can change it later.
                </Text>
              </View>
            </View>

            {/* Section 3 — Grade */}
            <View>
              <View className="flex-row items-center gap-2 mb-3">
                <Ionicons name="school-outline" size={18} color="#6C8CFF" />
                <Text className="text-h4">3. What's your current grade?</Text>
              </View>
              <View className="gap-3">
                <View className="flex-row gap-3">
                  <GradeCard
                    option={gradeOptions[0]}
                    selected={grade === gradeOptions[0].id}
                    onPress={() => { setGrade(gradeOptions[0].id); setError(''); }}
                  />
                  <GradeCard
                    option={gradeOptions[1]}
                    selected={grade === gradeOptions[1].id}
                    onPress={() => { setGrade(gradeOptions[1].id); setError(''); }}
                  />
                </View>
                <View className="flex-row gap-3">
                  <GradeCard
                    option={gradeOptions[2]}
                    selected={grade === gradeOptions[2].id}
                    onPress={() => { setGrade(gradeOptions[2].id); setError(''); }}
                  />
                  <GradeCard
                    option={gradeOptions[3]}
                    selected={grade === gradeOptions[3].id}
                    onPress={() => { setGrade(gradeOptions[3].id); setError(''); }}
                  />
                </View>
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
              <Text className="text-h4 text-primary-text">
                Continue to Goals →
              </Text>
            </Pressable>

          </View>

          <StepIndicator current={1} />

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}