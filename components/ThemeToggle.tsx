import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme();

  return (
    <TouchableOpacity onPress={toggleTheme} style={styles.container}>
      <Ionicons
        name={isDark ? "sunny-outline" : "moon-outline"}
        size={24}
        color={isDark ? "#FFD700" : "#4B5563"}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
});
