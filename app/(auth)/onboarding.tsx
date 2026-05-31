import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { images } from "@/constants/images";
import { EXAMS, STUDY_LEVELS } from "@/data/onboarding";
import { useOnboardingStore } from "@/store/onboarding-store";
import type { ExamType, StudyLevel } from "@/types/onboarding";

const examStyles: Record<
  ExamType,
  {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    tileClassName: string;
    title: string;
    description: string;
  }
> = {
  "jee-advanced": {
    icon: "target",
    tileClassName: "bg-[#6F26D9]",
    title: "Crack JEE Advanced",
    description: "Compete with the best and secure your dream rank",
  },
  "jee-main": {
    icon: "rocket-launch-outline",
    tileClassName: "bg-[#1E4DD4]",
    title: "Crack JEE Main",
    description: "Score high and get into a top engineering college",
  },
  neet: {
    icon: "medical-bag",
    tileClassName: "bg-[#18A94F]",
    title: "Crack NEET",
    description: "Pursue your dream of becoming a doctor",
  },
  boards: {
    icon: "book-open-page-variant-outline",
    tileClassName: "bg-[#D85F13]",
    title: "Prepare for Boards",
    description: "Score high in your board exams with confidence",
  },
};

const levelStyles: Record<
  StudyLevel,
  {
    icon: keyof typeof MaterialCommunityIcons.glyphMap;
    color: string;
    title: string;
    description: string;
  }
> = {
  beginner: {
    icon: "sprout",
    color: "#6BEE43",
    title: "Beginner",
    description: "Just starting out",
  },
  basic: {
    icon: "chart-bar",
    color: "#2496FF",
    title: "Basic",
    description: "Know the basics",
  },
  intermediate: {
    icon: "lightning-bolt",
    color: "#FFB21B",
    title: "Intermediate",
    description: "Some practice done",
  },
  advanced: {
    icon: "rocket-launch-outline",
    color: "#FF72D2",
    title: "Advanced",
    description: "Ready for the next level",
  },
};

export default function OnboardingScreen() {
  const targetExam = useOnboardingStore((state) => state.targetExam);
  const currentLevel = useOnboardingStore((state) => state.currentLevel);
  const setTargetExam = useOnboardingStore((state) => state.setTargetExam);
  const setCurrentLevel = useOnboardingStore((state) => state.setCurrentLevel);

  const handleContinue = () => {
    if (!targetExam) {
      return;
    }

    router.push("./onboarding-profile");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#020722" }}>
      <StatusBar style="light" />

      <ScrollView
        className="flex-1 bg-[#020722]"
        contentContainerClassName="pb-8"
        showsVerticalScrollIndicator={false}
      >
        <View className="relative h-[608px] w-full overflow-hidden">
          <Image
            source={images.firstOnboardingBg}
            className="absolute inset-0 h-full w-full"
            resizeMode="cover"
          />
          <Image
            source={images.firstOnboardingTitle}
            className="absolute left-0 top-0 h-full w-full"
            resizeMode="cover"
          />
        </View>

        <View className="-mt-1 px-4">
          <View className="rounded-[10px] border border-[#24346D] bg-[#050B2A]/95 px-3 py-5">
            <Text className="mb-5 px-1 font-poppins-bold text-[25px] leading-[32px] text-white">
              What will you achieve?
            </Text>

            <View className="flex-row flex-wrap gap-3">
              {EXAMS.map((exam) => {
                const isSelected = targetExam === exam.id;
                const styles = examStyles[exam.id];

                return (
                  <Pressable
                    key={exam.id}
                    className={[
                      "min-h-[143px] w-[48%] flex-row rounded-[10px] border bg-[#050B2A] p-3",
                      isSelected ? "border-[#7C22F3]" : "border-[#16285C]",
                    ].join(" ")}
                    onPress={() => setTargetExam(exam.id)}
                  >
                    <View
                      className={[
                        "h-[78px] w-[72px] items-center justify-center rounded-[8px]",
                        styles.tileClassName,
                      ].join(" ")}
                    >
                      <MaterialCommunityIcons
                        name={styles.icon}
                        size={38}
                        color="#FFFFFF"
                      />
                    </View>

                    <View className="ml-3 flex-1 justify-center">
                      <Text className="font-poppins-bold text-[16px] leading-[22px] text-white">
                        {styles.title}
                      </Text>
                      <Text className="mt-2 font-poppins text-[13px] leading-[20px] text-[#C4C7EF]">
                        {styles.description}
                      </Text>
                    </View>

                    <View
                      className={[
                        "ml-2 mt-8 h-[30px] w-[30px] items-center justify-center rounded-full border-2",
                        isSelected
                          ? "border-[#7C22F3] bg-[#7C22F3]"
                          : "border-[#6F78BF]",
                      ].join(" ")}
                    >
                      {isSelected ? (
                        <Ionicons name="checkmark" size={17} color="#FFFFFF" />
                      ) : null}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="mt-5 rounded-[10px] border border-[#24346D] bg-[#050B2A]/95 px-5 py-5">
            <Text className="font-poppins-bold text-[25px] leading-[32px] text-white">
              How would you describe your current level?
            </Text>

            <View className="mt-4 flex-row gap-3">
              {STUDY_LEVELS.map((level) => {
                const isSelected = currentLevel === level.id;
                const styles = levelStyles[level.id];

                return (
                  <Pressable
                    key={level.id}
                    className={[
                      "h-[150px] flex-1 items-center justify-center rounded-[8px] border bg-[#050B2A] px-2",
                      isSelected ? "border-[#7C22F3]" : "border-[#1D3269]",
                    ].join(" ")}
                    onPress={() => setCurrentLevel(level.id)}
                  >
                    <MaterialCommunityIcons
                      name={styles.icon}
                      size={34}
                      color={styles.color}
                    />
                    <Text className="mt-4 text-center font-poppins-bold text-[16px] leading-[22px] text-white">
                      {styles.title}
                    </Text>
                    <Text className="mt-1 text-center font-poppins text-[12px] leading-[18px] text-[#C4C7EF]">
                      {styles.description}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>

          <View className="mt-4 flex-row items-center rounded-[10px] border border-[#24346D] bg-[#050B2A]/95 p-5">
            <View className="h-[156px] w-[156px] overflow-hidden rounded-[8px] bg-[#06123E]">
              <Image
                source={images.pixel}
                className="h-full w-full"
                resizeMode="cover"
              />
            </View>

            <View className="ml-6 flex-1">
              <Text className="font-poppins-bold text-[27px] leading-[34px] text-white">
                Pixel ✨
              </Text>
              <Text className="mt-3 font-poppins text-[16px] leading-[25px] text-[#D3D6F5]">
                I&apos;m Pixel! I&apos;ll guide you, motivate you, and celebrate
                your progress with you.
              </Text>
              <Text className="mt-3 font-poppins text-[16px] leading-[25px] text-[#17C9FF]">
                Together, we&apos;ll make every problem a step closer to your
                dream! 🐬
              </Text>
            </View>
          </View>

          <Pressable
            className={[
              "mt-6 h-[88px] w-full items-center justify-center rounded-[10px]",
              targetExam ? "bg-[#7C22F3]" : "bg-[#302D63]",
            ].join(" ")}
            disabled={!targetExam}
            onPress={handleContinue}
          >
            <Text
              className={[
                "font-poppins-bold text-[27px] leading-[34px]",
                targetExam ? "text-white" : "text-[#9699C8]",
              ].join(" ")}
            >
              Let&apos;s Get Started →
            </Text>
          </Pressable>

          <View className="mt-8 flex-row items-start justify-center px-12">
            {["Welcome", "Profile", "Goals", "Done"].map((label, index) => (
              <View key={label} className="flex-1 items-center">
                <View className="w-full flex-row items-center">
                  {index > 0 ? <View className="h-[3px] flex-1 bg-[#4B5080]" /> : <View className="flex-1" />}
                  <View
                    className={[
                      "h-[24px] w-[24px] rounded-full",
                      index === 0 ? "bg-[#7C22F3]" : "bg-[#4B5080]",
                    ].join(" ")}
                  />
                  {index < 3 ? <View className="h-[3px] flex-1 bg-[#4B5080]" /> : <View className="flex-1" />}
                </View>
                <Text className="mt-4 font-poppins text-[14px] leading-[20px] text-[#C8CBF3]">
                  {label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
