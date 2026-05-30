export const colors = {
  deepOcean: "#0B1326",
  oceanBlue: "#1565FF",
  skyBlue: "#38BDF8",
  aqua: "#00E5FF",
  dolphinBlue: "#6C8CFF",
  success: "#22C55E",
  warning: "#FACC15",
  streak: "#FF7A00",
  error: "#FF4D4F",
  info: "#38BDF8",
  atomicPurple: "#7C3AED",
  energyTeal: "#00D4C4",
  neonIndigo: "#4F46E5",
  scienceCyan: "#06B6D4",
  radiantBlue: "#2563EB",
  primaryText: "#F0F2FA",
  secondaryText: "#475569",
  border: "#1E2747",
  surface: "#141B2A",
  background: "#070B1A",
} as const;

export const fonts = {
  regular: "Poppins-Regular",
  medium: "Poppins-Medium",
  semiBold: "Poppins-SemiBold",
  bold: "Poppins-Bold",
} as const;

export const typography = {
  h1: { fontSize: 32, lineHeight: 38, fontFamily: fonts.bold },
  h2: { fontSize: 24, lineHeight: 31, fontFamily: fonts.semiBold },
  h3: { fontSize: 20, lineHeight: 26, fontFamily: fonts.semiBold },
  h4: { fontSize: 16, lineHeight: 22, fontFamily: fonts.medium },
  bodyLarge: { fontSize: 16, lineHeight: 26, fontFamily: fonts.regular },
  bodyMedium: { fontSize: 14, lineHeight: 22, fontFamily: fonts.regular },
  bodySmall: { fontSize: 13, lineHeight: 21, fontFamily: fonts.regular },
  caption: { fontSize: 11, lineHeight: 15, fontFamily: fonts.regular },
} as const;

export const radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const spacing = {
  screen: 24,
  section: 20,
  card: 16,
  control: 12,
} as const;
