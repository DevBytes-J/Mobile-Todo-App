// App.tsx
import HomeScreen from "./app/(tabs)/index";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ThemeProvider } from "./contexts/ThemeContext";

// 👈 NEW IMPORTS for Convex
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ConvexHttpClient } from "convex/browser"; // Needed for Expo/React Native setup

// ⚠️ Get your Convex URL. Replace the placeholder! ⚠️
// Use your actual Convex URL here.
const CONVEX_URL = process.env.EXPO_PUBLIC_CONVEX_URL as string;

// 👈 INITIALIZE the Convex client instance
const convex = new ConvexReactClient(CONVEX_URL, {
  // Required for React Native/Expo to correctly handle the WebSocket
  useHttpClient: new ConvexHttpClient(CONVEX_URL),
});

export type RootStackParamList = {
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    // 👈 ADDED: ConvexProvider must be at the top to give access to useQuery/useMutation
    <ConvexProvider client={convex}>
      <ThemeProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </ThemeProvider>
    </ConvexProvider>
    // 👆 END of ConvexProvider
  );
}
