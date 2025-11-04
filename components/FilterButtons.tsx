import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useTheme } from "../contexts/ThemeContext";

type Filter = "all" | "active" | "completed";

type FilterButtonsProps = {
  activeFilter: Filter;
  setActiveFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

export default function FilterButtons({ activeFilter, setActiveFilter }: FilterButtonsProps) {
  const { theme } = useTheme();

  const filters: { key: Filter; label: string }[] = [
    { key: "all", label: "All" },
    { key: "active", label: "Active" },
    { key: "completed", label: "Completed" },
  ];

  return (
    <View style={[styles.container, { backgroundColor: theme.cardBackground }]}>
      {filters.map((filter) => (
        <TouchableOpacity
          key={filter.key}
          onPress={() => setActiveFilter(filter.key)}
          style={styles.button}
        >
          <Text
            style={[
              styles.label,
              {
                color:
                  activeFilter === filter.key ? theme.primary : theme.textSecondary,
                fontWeight: activeFilter === filter.key ? "700" : "400",
              },
            ]}
          >
            {filter.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 18,
    paddingVertical: 10,
    borderRadius: 5,
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 14,
  },
});
