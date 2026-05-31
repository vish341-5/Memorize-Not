// constants/images.ts
import { ImageSourcePropType } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

// --- Main Images ---
// It's good practice to have these, even if they are just placeholders for now.
// If you have actual image files for these, please ensure they are in the correct path.
// Example: Assuming you have these files in assets/images/
import splashIcon from '@/assets/images/splash-icon.png';
import firstOnboardingBg from '@/assets/images/first-onboarding-bg.png'; // Assuming this exists
import firstOnboardingTitle from '@/assets/images/first-onboarding-title.png'; // Assuming this exists
import pixelMascot from '@/assets/images/pixel-mascot.png'; // Assuming this exists

export const images = {
  // Main Images
  splashIcon,
  firstOnboardingBg,
  firstOnboardingTitle,
  pixelMascot,

  // Icons using Expo Vector Icons
  // We'll use specific Ionicons names. You can change these if needed.
  jeeAdvancedIcon: Ionicons.க்கார, // Example: Use a relevant Ionicons name
  jeeMainIcon: Ionicons.build,     // Example: Use a relevant Ionicons name
  neetIcon: Ionicons.heart,        // Example: Use a relevant Ionicons name
  boardsIcon: Ionicons.book,       // Example: Use a relevant Ionicons name

  beginnerIcon: Ionicons.flag,     // Example: Use a relevant Ionicons name
  basicIcon: Ionicons.flag,        // Example: Use a relevant Ionicons name
  intermediateIcon: Ionicons.flag, // Example: Use a relevant Ionicons name
  advancedIcon: Ionicons.flag,     // Example: Use a relevant Ionicons name
};

// Helper type for when you need to pass an ImageSourcePropType specifically
export type AppImageSource = ImageSourcePropType;
