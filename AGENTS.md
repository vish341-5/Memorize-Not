You are an expert React Native and Expo engineer helping me build
'Memorize not'.

Write clean, simple, maintainable code. Prioritize clarity over
unnecessary abstraction.

Think like a senior mobile developer.

---

## Project Overview

We are building 'Memorize Not', a gamified study platform that helps JEE and NEET students stay consistent, maintain momentum, and enjoy solving problems.

The app includes:

- Onboarding flow
- Practice by Topic
- Practice by Chapter
- Book-based Practice (HC Verma, Cengage, etc.)
- PYQ Practice
- Daily Challenges
- XP System
- Levels
- Streaks
- Achievements
- Progress Analytics
- Topic Strength Tracking
- Leaderboards
- Weekly Contests
- Dolphin Mascot System
- Gamified Study Experience

Keep the implementation simple and readable.

---

## Tech Stack

- Expo
- React Native
- TypeScript
- Expo Router
- NativeWind
- Zustand
- AsyncStorage
- Clerk for authentication
- Supabase for database and backend services

Do not introduce new major libraries unless there is a strong reason.

---

## Development Philosophy

Build feature by feature.

For every feature:

1. Read this file first.
2. Keep the implementation simple.
3. Avoid overengineering.
4. Prefer readable code over clever code.
5. Build the smallest useful version first.
6. Refactor only when repetition appears.

---

## Decision Making

If something is unclear or could be improved, suggest a better approach.

If a new library would significantly help, recommend it, explain why, and ask before adding it.

Do not install new libraries without approval.

---

## Architecture

Use this folder structure:

```txt
app/
  (auth)/
  (tabs)/
components/
constants/
data/
hooks/
lib/
store/
types/
assets/
```

### app/

Use for routes and screens only.

Screens should compose components and call hooks/stores.

Screens should not contain large reusable UI blocks or business logic.

### components/

Use for reusable UI.

Create a component when:

- it is reused in multiple places
- it makes a screen easier to read
- it represents a clear UI concept

Examples for this app:

- PrimaryButton
- PixelMascot
- XPBar
- StreakCard
- TopicCard
- BookCard
- ChallengeCard
- ContestCard
- ProgressCard
- AchievementBadge

Do not create components too early.

### data/

Holds hardcoded content.

Keep it typed.

### store/

Holds Zustand stores.

Examples of state to keep here:

- userProgress
- xp
- level
- streak
- achievements
- dailyGoals
- completedProblems
- selectedExam
- userPreferences
- analytics

Persist with AsyncStorage when needed.

Supabase is the source of truth for user progress and account data.

AsyncStorage should primarily be used for caching, offline support, and local preferences.

### lib/

Holds external service helpers.

Examples:

- clerk.ts
- supabase.ts
- api.ts
- cn.ts

Never expose secret keys here.

---

## Database

Use Supabase as the primary backend and database.

Store:

- User profiles
- XP
- Levels
- Streaks
- Achievements
- Progress
- Daily goals
- Analytics
- Contest data
- Leaderboards

Supabase is the source of truth.

AsyncStorage should never be the primary storage location for important user progress.

---

## UI Rules

For any UI task:

- Replicate the provided design exactly.
- Match layout exactly.
- Match spacing and padding.
- Match font sizes and hierarchy.
- Match colors.
- Match border radius.
- Match shadows.
- Match alignment.
- Match proportions.

Do not approximate.

Do not simplify unless explicitly asked.

---

## Styling Rules

Use NativeWind classes.

Do not use StyleSheet unless it is not possible to style with className.

Use the NativeWind version installed in this project.

Check package.json before implementing NativeWind-related code.

Do not upgrade NativeWind without approval.

Reuse class patterns through utilities in global.css.

### Style Exception List

Use StyleSheet or inline styles for:

- SafeAreaView (className not supported)
- KeyboardAvoidingView (behavior props)
- Modal (visible, transparent props)
- Animated.View (animated style values)
- Dynamic styles calculated at runtime
- Platform-specific styles
- Pressable or TouchableOpacity pressed states
- Shadows (different per platform)

Everywhere else, use NativeWind.

---

## Image Rule

Use centralized image imports.

1. Check if `constants/images.ts` exists.
2. If not, create it.
3. Import all app images there.
4. Use them through the centralized object.

Example:

```ts
import mascot from "@/assets/images/mascot.png";

export const images = {
  mascot,
};
```

Usage:

```tsx
<Image source={images.mascot} />
```

Do not import image assets directly inside screens or components.

---

## State Management

- Zustand for global client state.
- Local state for temporary UI state.
- Supabase for persistent user data.
- AsyncStorage for caching and offline support.

---

## TypeScript

- Strict mode.
- No `any`.
- Keep types simple and readable.

---

## Feature Implementation

When building a feature:

1. Read this file first.
2. Identify the files to change.
3. Keep changes focused.
4. Do not rewrite unrelated code.
5. Follow existing patterns.
6. Make sure the feature works end to end.
7. Fix lint and type errors before finishing.

---

## Secrets

- Never expose secret keys in client code.
- Use server routes, Supabase Edge Functions, or backend services for tokens, AI calls, and sensitive external API access.

---

## Authentication

Use Clerk.

Do not build custom authentication.

---

## Communication

Be concise.

Explain:

- What changed
- Why it changed
- How to test it

---

## Final Reminder

Before every feature:

- Read this file.
- Follow it strictly.
- Build clean, simple code.
- Replicate UI exactly when designs are provided.

The app should feel:

- Gamified
- Polished
- Motivating
- Fun
- Pixel-art themed
- Mobile-first

The primary goal is helping students maintain momentum and consistency while preparing for competitive exams