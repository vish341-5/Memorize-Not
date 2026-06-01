export type ExamType =
  | "jee_advanced"
  | "jee_main"
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
  | "Class 11th"
  | "Class 12th"
  | "1st Year Dropper"
  | "2nd Year Dropper";

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
  targetExam: ExamType | null;
  currentLevel: StudyLevel | null;
  avatar: AvatarType | null;
  nickname: string | null;
  grade: GradeType | null;
  subjects: SubjectType[];
  targetExamDate: string;
  dailyStudyHours: number;
  goals: GoalType[];
  completed: boolean;
}