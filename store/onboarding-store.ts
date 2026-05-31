import { create } from "zustand";

import type {
    AvatarType,
    ExamType,
    GoalType,
    GradeType,
    StudyLevel,
    SubjectType,
} from "@/types/onboarding";

interface OnboardingState {
  // Welcome Screen
  targetExam: ExamType | null;
  currentLevel: StudyLevel | null;

  // Profile Screen
  avatar: AvatarType | null;
  nickname: string;
  grade: GradeType | null;

  // Goals Screen
  subjects: SubjectType[];
  targetExamDate: string;
  dailyStudyHours: number;
  goals: GoalType[];

  // Completion
  hasCompletedOnboarding: boolean;

  // Actions
  setTargetExam: (exam: ExamType) => void;
  setCurrentLevel: (level: StudyLevel) => void;

  setAvatar: (avatar: AvatarType) => void;
  setNickname: (nickname: string) => void;
  setGrade: (grade: GradeType) => void;

  setSubjects: (subjects: SubjectType[]) => void;
  setTargetExamDate: (date: string) => void;
  setDailyStudyHours: (hours: number) => void;
  setGoals: (goals: GoalType[]) => void;

  setHasCompletedOnboarding: (completed: boolean) => void;
  resetOnboarding: () => void;
}

export const useOnboardingStore =
  create<OnboardingState>((set) => ({
    // Initial State
    targetExam: null,
    currentLevel: null,

    avatar: null,
    nickname: "",
    grade: null,

    subjects: [],
    targetExamDate: "",
    dailyStudyHours: 0,
    goals: [],

    // TODO: Ideally, hasCompletedOnboarding should be fetched from Supabase
    //       when the user signs in and reset on sign out.
    hasCompletedOnboarding: false,

    // Actions
    setTargetExam: (exam) =>
      set({ targetExam: exam }),

    setCurrentLevel: (level) =>
      set({ currentLevel: level }),

    setAvatar: (avatar) =>
      set({ avatar }),

    setNickname: (nickname) =>
      set({ nickname }),

    setGrade: (grade) =>
      set({ grade }),

    setSubjects: (subjects) =>
      set({ subjects }),

    setTargetExamDate: (date) =>
      set({ targetExamDate: date }),

    setDailyStudyHours: (hours) =>
      set({ dailyStudyHours: hours }),

    setGoals: (goals) =>
      set({ goals }),

    setHasCompletedOnboarding: (completed) =>
      set({ hasCompletedOnboarding: completed }),

    resetOnboarding: () =>
      set({
        targetExam: null,
        currentLevel: null,

        avatar: null,
        nickname: "",
        grade: null,

        subjects: [],
        targetExamDate: "",
        dailyStudyHours: 0,
        goals: [],

        // Reset to false on logout/app reset
        hasCompletedOnboarding: false,
      }),
  }));