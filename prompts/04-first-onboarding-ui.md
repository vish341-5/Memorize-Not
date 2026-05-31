Read agents.md first and follow it strictly.

Task:
Build the first onboarding screen from the attached design.

Assets:
- Background image: assets/images/first-onboarding-bg
- Title image/text: assets/images/first-onboarding-title
- Mascot image: assets/images/pixel.png

Requirements:
- Match the attached design exactly.
- Use the provided assets instead of recreating the artwork.
- The background image should be displayed at the top as shown in the design.
- Overlay/display the first-onboarding-text image exactly as shown.
- Display the Pixel mascot image at the bottom section as shown in the design.
- Use data from data/onboarding.ts to render the exam options.
- Use onboarding-store.ts for state management.
- When an exam is selected, save it using setTargetExam().
- Visually highlight the selected exam.
- Disable the Continue button until an exam is selected.
- On Continue, navigate to the next onboarding screen.
- For testing only, display the selected exam from Zustand at the top of the next screen so we can verify the state is being stored correctly.
- Use centralized image imports from constants/images.ts.
- Do not add AsyncStorage.
- Do not add Supabase.
- Keep the implementation simple and follow the existing project structure.