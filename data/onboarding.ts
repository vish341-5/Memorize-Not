import type {
    AvatarType,
    ExamType,
    GoalType,
    GradeType,
    StudyLevel,
    SubjectType,
} from "@/types/onboarding";

export const EXAMS: {
  id: ExamType;
  title: string;
  description: string;
}[] = [
  {
    id: "jee-advanced",
    title: "JEE Advanced",
    description: "Prepare for India's toughest engineering entrance exam.",
  },
  {
    id: "jee-main",
    title: "JEE Main",
    description: "Build a strong foundation for engineering admissions.",
  },
  {
    id: "neet",
    title: "NEET",
    description: "Master Biology, Physics, and Chemistry for medical entrance.",
  },
  {
    id: "boards",
    title: "Boards",
    description: "Improve academic performance and board exam scores.",
  },
];

export const STUDY_LEVELS: {
  id: StudyLevel;
  title: string;
  description: string;
}[] = [
  {
    id: "beginner",
    title: "Beginner",
    description: "Just getting started.",
  },
  {
    id: "basic",
    title: "Basic",
    description: "Know some fundamentals.",
  },
  {
    id: "intermediate",
    title: "Intermediate",
    description: "Comfortable with most concepts.",
  },
  {
    id: "advanced",
    title: "Advanced",
    description: "Ready for challenging problems.",
  },
];

export const AVATARS: {
  id: AvatarType;
  title: string;
}[] = [
  { id: "default", title: "Default" },
  { id: "reader", title: "Reader" },
  { id: "gym", title: "Athlete" },
  { id: "scientist", title: "Scientist" },
  { id: "rocket", title: "Rocket" },
  { id: "explorer", title: "Explorer" },
  { id: "coder", title: "Coder" },
  { id: "surfer", title: "Surfer" },
];

export const GRADES: {
  id: GradeType;
  title: string;
}[] = [
  { id: "11th", title: "Class 11" },
  { id: "12th", title: "Class 12" },
  { id: "dropper", title: "Dropper" },
  { id: "college", title: "College" },
];

export const SUBJECTS: {
  id: SubjectType;
  title: string;
}[] = [
  { id: "physics", title: "Physics" },
  { id: "chemistry", title: "Chemistry" },
  { id: "mathematics", title: "Mathematics" },
];

export const GOALS: {
  id: GoalType;
  title: string;
  description: string;
}[] = [
  {
    id: "improve-rank",
    title: "Improve Rank",
    description: "Climb higher in rankings and exams.",
  },
  {
    id: "solve-more-problems",
    title: "Solve More Problems",
    description: "Increase problem-solving consistency.",
  },
  {
    id: "concept-clarity",
    title: "Concept Clarity",
    description: "Strengthen fundamentals and understanding.",
  },
  {
    id: "be-consistent",
    title: "Stay Consistent",
    description: "Build a sustainable study habit.",
  },
  {
    id: "score-high",
    title: "Score Higher",
    description: "Improve test scores and performance.",
  },
  {
    id: "compete-and-win",
    title: "Compete & Win",
    description: "Dominate contests and leaderboards.",
  },
  {
    id: "track-progress",
    title: "Track Progress",
    description: "Monitor growth over time.",
  },
  {
    id: "build-basics",
    title: "Build Basics",
    description: "Strengthen core concepts.",
  },
];