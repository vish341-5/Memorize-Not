export type ExamType =
  | "jee-advanced"
  | "jee-main"
  | "neet"
  | "boards";

export type StudyLevel =
  | "beginner"
  | "basic"
  | "intermediate"
  | "advanced";

export type AvatarType =
  | "default"
  | "reader"
  | "gym"
  | "scientist"
  | "rocket"
  | "explorer"
  | "coder"
  | "surfer";

export type GradeType =
  | "11th"
  | "12th"
  | "dropper"
  | "college";

export type SubjectType =
  | "physics"
  | "chemistry"
  | "mathematics";

export type GoalType =
  | "improve-rank"
  | "solve-more-problems"
  | "concept-clarity"
  | "be-consistent"
  | "score-high"
  | "compete-and-win"
  | "track-progress"
  | "build-basics";

export interface OnboardingData {
  // Welcome Screen
  targetExam: ExamType | null;
  currentLevel: StudyLevel | null;

  // Profile Screen
  avatar: AvatarType | null;
  nickname: string | null;
  grade: GradeType | null;

  // Goals Screen
  subjects: SubjectType[];
  targetExamDate: string;
  dailyStudyHours: number;
  goals: GoalType[];

  // Completion
  completed: boolean;
}