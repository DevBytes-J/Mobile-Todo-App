import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

type EmptyStateProps = {
  filter?: "all" | "active" | "completed";
  hasSearch?: boolean;
};

export default function EmptyState({
  filter = "all",
  hasSearch = false,
}: EmptyStateProps) {
  const { theme } = useTheme();

  const getMessage = () => {
    if (hasSearch) return "No todos match your search";
    if (filter === "active") return "No active todos";
    if (filter === "completed") return "No completed todos";
    return "No todos yet. Create one above!";
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      <Ionicons
        name="checkmark-done-circle-outline"
        size={48}
        color={theme.textSecondary}
      />
      <Text style={[styles.text, { color: theme.textSecondary }]}>
        {getMessage()}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 60,
    paddingHorizontal: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
    textAlign: "center",
    marginTop: 16,
  },
});
