import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useMutation } from "convex/react";
import { api } from "../convex/_generated/api";
import { useTheme } from "../contexts/ThemeContext";
import { Ionicons } from "@expo/vector-icons";

export default function TodoInput() {
  const [text, setText] = useState("");
  const { theme, isDark } = useTheme();
  const addTodo = useMutation(api.todo.addTodo);

  const submit = async () => {
    if (!text.trim()) return;
    try {
      await addTodo({ title: text.trim() });
      setText("");
      Keyboard.dismiss();
    } catch (e) {
      console.error("addTodo failed", e);
    }
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.cardBackground, shadowColor: theme.shadow },
      ]}
    >
      {/* Check Circle (for aesthetic consistency with TodoItem) */}
      <TouchableOpacity onPress={submit} activeOpacity={0.8}>
        <LinearGradient
          colors={
            text.trim() ? ["#57DDFF", "#C058F3"] : [theme.border, theme.border]
          }
          style={[
            styles.checkCircle,
            {
              borderColor: theme.border,
              backgroundColor: text.trim() ? "transparent" : theme.background,
            },
          ]}
        >
          {text.trim().length > 0 && (
            <Ionicons name="add" size={16} color="#fff" />
          )}
        </LinearGradient>
      </TouchableOpacity>

      {/* Input Field */}
      <TextInput
        placeholder="Create a new todo..."
        placeholderTextColor={theme.placeholder}
        value={text}
        onChangeText={setText}
        onSubmitEditing={submit}
        style={[styles.input, { color: theme.text }]}
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 18,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 8,
  },
  checkCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    marginRight: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  input: {
    flex: 1,
    fontSize: 18,
  },
});
