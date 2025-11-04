import React from "react";
import { View, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
};

export default function SearchBar({ value, onChangeText }: SearchBarProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.cardBackground,
          borderBottomColor: theme.border,
        },
      ]}
    >
      {/* Search Icon */}
      <Ionicons
        name="search-outline"
        size={20}
        color={theme.textSecondary}
        style={styles.icon}
      />

      {/* Input Field */}
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Search todos..."
        placeholderTextColor={theme.textSecondary}
        style={[styles.input, { color: theme.text }]}
      />

      {/* Clear Button */}
      {value.length > 0 && (
        <TouchableOpacity onPress={() => onChangeText("")}>
          <Ionicons name="close-circle" size={20} color={theme.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderRadius: 5,
  },
  icon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
