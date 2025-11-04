import React from "react";
import { Stack } from "expo-router";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ThemeProvider } from "@/hooks/useTheme";
import Constants from "expo-constants";

const convexUrl =
  (Constants.expoConfig &&
    (Constants.expoConfig.extra as any)?.EXPO_PUBLIC_CONVEX_URL) ||
  process.env.EXPO_PUBLIC_CONVEX_URL ||
  "";

const convex = new ConvexReactClient(convexUrl);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <Stack>
          <Stack.Screen name="(tabs)/index" options={{ headerShown: false }} />
        </Stack>
      </ThemeProvider>
    </ConvexProvider>
  );
}
