// store/onboarding-store.ts
import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';

// Define ExamType for type safety. This should ideally be imported from '@/types/onboarding'.
// For demonstration purposes, defining it here if it's not available.
interface ExamType {
  id: string;
  title: string;
  description: string;
  icon: ImageSourcePropType;
}

interface OnboardingState {
  targetExam: ExamType | null;
  setTargetExam: (exam: ExamType | null) => void;
}

const useOnboardingStore = create<OnboardingState>((set) => ({
  targetExam: null,
  setTargetExam: (exam) => set({ targetExam: exam }),
}));

export default useOnboardingStore;
