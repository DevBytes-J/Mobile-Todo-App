import React, { useState, useMemo } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  Text,
  StatusBar,
  Platform,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import { useQuery, useMutation } from "convex/react";
import TodoInput from "../../components/TodoInput";
import FilterButtons from "../../components/FilterButtons";
import SearchBar from "../../components/SearchBar";
import ThemeToggle from "../../components/ThemeToggle";
import EmptyState from "../../components/EmptyState";
import TodoItem from "../../components/TodoItem";
import { useTheme } from "../../contexts/ThemeContext";
import { api } from "../../convex/_generated/api";

type Filter = "all" | "active" | "completed";


const screenWidth = Dimensions.get("window").width;
const IS_LARGE_SCREEN = screenWidth >= 768; 

export default function HomeScreen() {
  const { theme, isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState<Filter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const todos = useQuery(api.todo.get, {
    filter: activeFilter,
    search: searchQuery,
  });

  const clearCompleted = useMutation(api.todo.clearCompleted);

  const stats = useMemo(() => {
    const allTodos = todos ?? [];
    return {
      total: allTodos.length,
      active: allTodos.filter((t) => !t.isCompleted).length,
      completed: allTodos.filter((t) => t.isCompleted).length,
    };
  }, [todos]);

  const handleClearCompleted = async () => {
    try {
      await clearCompleted();
    } catch (error) {
      console.error("Clear completed failed:", error);
    }
  };

  const backgroundImageSource = useMemo(() => {
    if (IS_LARGE_SCREEN) {
      return isDark
        ? require("../../assets/mountain-bg-dark-desktop.png") 
        : require("../../assets/mountain-bg-desktop.png"); 
    } else {
      return isDark
        ? require("../../assets/mountain-bg-dark.png") 
        : require("../../assets/mountain-bg.png"); 
    }
  }, [isDark]);

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDark ? "light-content" : "dark-content"}
        backgroundColor={isDark ? "#171823" : "#F2F2F2"}
      />

      {/* Header with mountain background and OVERLAY */}
      <ImageBackground
        source={backgroundImageSource}
        style={styles.headerBackground}
        resizeMode="cover"
      >

        <LinearGradient
          colors={["rgba(55, 16, 189, 0.7)", "rgba(164, 35, 149, 0.7)"]}

          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.gradientOverlay} 
        />

        <View style={styles.headerContent}>
          <Text style={styles.title}>TODO</Text>
          <ThemeToggle />
        </View>
      </ImageBackground>

      {/* Main content area */}
      <View
        style={[styles.contentContainer, { backgroundColor: theme.background }]}
      >
        {/* Todo Input */}
        <View style={styles.inputWrapper}>
          <TodoInput />
        </View>

        {/* Main todo card */}
        <View
          style={[styles.todoCard, { backgroundColor: theme.cardBackground }]}
        >
          {/* Search Bar */}
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search todos..."
          />

          {/* Todos List */}
          {!todos ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={theme.primary} />
            </View>
          ) : todos.length === 0 ? (
            <EmptyState />
          ) : (
            <ScrollView
              style={styles.listContainer}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            >
              {todos.map((todo, index) => (
                <TodoItem
                  key={todo._id}
                  todo={todo}
                  isLast={index === todos.length - 1}
                />
              ))}
            </ScrollView>
          )}

          {/* Footer stats */}
          <View style={[styles.footer, { borderTopColor: theme.border }]}>
            <Text style={[styles.statsText, { color: theme.text }]}>
              {stats.active} items left
            </Text>

            <TouchableOpacity onPress={handleClearCompleted}>
              <Text style={[styles.clearText, { color: theme.muted }]}>
                Clear Completed
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Filter buttons card */}
        <View
          style={[styles.filterCard, { backgroundColor: theme.cardBackground }]}
        >
          <FilterButtons
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
          />
        </View>

        {/* Hint text */}
        <Text style={[styles.hintText, { color: theme.muted }]}>
          Drag and drop to reorder list
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerBackground: {
    height: 200,
    width: "100%",
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: Platform.OS === "ios" ? 60 : 50,
    paddingHorizontal: 24, 
    zIndex: 1, 
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: "#FFFFFF",
    letterSpacing: 15,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
  },
  inputWrapper: {
    marginTop: -28,
    marginBottom: 16,
  },
  todoCard: {
    borderRadius: 5,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 8,
    overflow: "hidden",
  },
  loadingContainer: {
    paddingVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  listContainer: {
    maxHeight: 400,
  },
  listContent: {
    flexGrow: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
  },
  statsText: {
    fontSize: 14,
  },
  clearText: {
    fontSize: 14,
  },
  filterCard: {
    marginTop: 16,
    borderRadius: 5,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.2,
    shadowRadius: 25,
    elevation: 8,
  },
  hintText: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 14,
  },
});
