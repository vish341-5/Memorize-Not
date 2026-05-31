// data/onboarding.ts
import { images } from '@/constants/images'; // Assuming images are centrally imported

const onboardingData = {
  exams: [
    {
      id: 'jee_advanced',
      title: 'Crack JEE Advanced',
      description: 'Compete with the best and secure your dream rank',
      icon: images.jeeAdvancedIcon, // Use the correct key from constants/images.ts
    },
    {
      id: 'jee_main',
      title: 'Crack JEE Main',
      description: 'Score high and get into a top engineering college',
      icon: images.jeeMainIcon, // Use the correct key from constants/images.ts
    },
    {
      id: 'neet',
      title: 'Crack NEET',
      description: 'Pursue your dream of becoming a doctor',
      icon: images.neetIcon, // Use the correct key from constants/images.ts
    },
    {
      id: 'boards',
      title: 'Prepare for Boards',
      description: 'Score high in your board exams with confidence',
      icon: images.boardsIcon, // Use the correct key from constants/images.ts
    },
  ],
  // Add other onboarding related data here, e.g., levels
  levels: [
    { id: 'beginner', title: 'Beginner', description: 'Just starting out', icon: images.beginnerIcon },
    { id: 'basic', title: 'Basic', description: 'Know the basics', icon: images.basicIcon },
    { id: 'intermediate', title: 'Intermediate', description: 'Some practice done', icon: images.intermediateIcon },
    { id: 'advanced', title: 'Advanced', description: 'Ready for the next level', icon: images.advancedIcon },
  ],
};

export default onboardingData;
