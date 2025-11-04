import React from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useTheme } from "../contexts/ThemeContext";
import { Id } from "../convex/_generated/dataModel";

type TodoItemProps = {
  todo: {
    _id: Id<"todos">; // ✅ Corrected: Specify the table name
    title: string;
    description?: string;
    dueDate?: string;
    isCompleted: boolean;
  };
  isLast?: boolean;
};
export default function TodoItem({ todo, isLast = false }: TodoItemProps) {
  const { theme } = useTheme();
  const toggleTodo = useMutation(api.todo.toggleTodo);
  const deleteTodo = useMutation(api.todo.deleteTodo);

  const handleToggle = async () => {
    try {
      await toggleTodo({ id: todo._id });
    } catch (error) {
      console.error("Toggle failed:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteTodo({ id: todo._id });
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { borderBottomColor: theme.border },
        isLast && styles.lastItem,
      ]}
    >
      {/* Checkbox */}
      <TouchableOpacity onPress={handleToggle} style={styles.checkbox}>
        {todo.isCompleted ? (
          <LinearGradient
            colors={["#57DDFF", "#C058F3"]}
            style={styles.checkboxGradient}
          >
            <Ionicons name="checkmark" size={16} color="#fff" />
          </LinearGradient>
        ) : (
          <View style={[styles.checkboxEmpty, { borderColor: theme.border }]} />
        )}
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        <Text
          style={[
            styles.title,
            { color: theme.text },
            todo.isCompleted && styles.completedText,
          ]}
        >
          {todo.title}
        </Text>

        {todo.description && (
          <Text style={[styles.description, { color: theme.textSecondary }]}>
            {todo.description}
          </Text>
        )}

        {todo.dueDate && (
          <Text style={[styles.dueDate, { color: theme.textSecondary }]}>
            Due: {new Date(todo.dueDate).toLocaleDateString()}
          </Text>
        )}
      </View>

      {/* Delete button */}
      <TouchableOpacity onPress={handleDelete} style={styles.deleteButton}>
        <Ionicons name="trash-outline" size={20} color={theme.icon} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
  },
  lastItem: {
    borderBottomWidth: 0,
  },
  checkbox: {
    marginRight: 12,
  },
  checkboxEmpty: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
  },
  checkboxGradient: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
  },
  completedText: {
    textDecorationLine: "line-through",
    opacity: 0.6,
  },
  description: {
    fontSize: 14,
    marginTop: 4,
  },
  dueDate: {
    fontSize: 12,
    marginTop: 4,
  },
  deleteButton: {
    padding: 4,
  },
});
