import {
  AvatarType,
  ExamType,
  GoalType,
  GradeType,
  StudyLevel,
  SubjectType,
} from '@/types/onboarding';
import { create } from 'zustand';

interface OnboardingState {
  // Screen 1
  targetExam: ExamType | null;
  currentLevel: StudyLevel | null;
  // Screen 2
  avatar: AvatarType;
  nickname: string;
  grade: GradeType | null;
  // Screen 3
  subjects: SubjectType[];
  targetExamDate: string | null;
  dailyStudyHours: number | null;
  goals: GoalType[];
  // Completion
  completed: boolean;
  // Actions
  setTargetExam: (exam: ExamType) => void;
  setCurrentLevel: (level: StudyLevel) => void;
  setAvatar: (avatar: AvatarType) => void;
  setNickname: (nickname: string) => void;
  setGrade: (grade: GradeType) => void;
  toggleSubject: (subject: SubjectType) => void;
  setTargetExamDate: (date: string | null) => void;
  setDailyStudyHours: (hours: number) => void;
  toggleGoal: (goal: GoalType) => void;
  setCompleted: (value: boolean) => void;
}

const useOnboardingStore = create<OnboardingState>((set) => ({
  targetExam: null,
  currentLevel: null,
  avatar: 'default',
  nickname: '',
  grade: null,
  subjects: [],
  targetExamDate: null,
  dailyStudyHours: null,
  goals: [],
  completed: false,

  setTargetExam: (exam) => set({ targetExam: exam }),
  setCurrentLevel: (level) => set({ currentLevel: level }),
  setAvatar: (avatar) => set({ avatar }),
  setNickname: (nickname) => set({ nickname }),
  setGrade: (grade) => set({ grade }),
  toggleSubject: (subject) =>
    set((state) => ({
      subjects: state.subjects.includes(subject)
        ? state.subjects.filter((s) => s !== subject)
        : [...state.subjects, subject],
    })),
  setTargetExamDate: (date) => set({ targetExamDate: date }),
  setDailyStudyHours: (hours) => set({ dailyStudyHours: hours }),
  toggleGoal: (goal) =>
    set((state) => ({
      goals: state.goals.includes(goal)
        ? state.goals.filter((g) => g !== goal)
        : state.goals.length < 3
        ? [...state.goals, goal]
        : state.goals,
    })),
  setCompleted: (value) => set({ completed: value }),
}));

export default useOnboardingStore;