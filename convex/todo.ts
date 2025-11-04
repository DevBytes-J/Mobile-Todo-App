import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
  args: {
    filter: v.optional(
      v.union(v.literal("all"), v.literal("active"), v.literal("completed"))
    ),
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let todos = await ctx.db.query("todos").order("desc").collect();

    if (args.search) {
      const searchLower = args.search.toLowerCase();
      todos = todos.filter(
        (todo) =>
          todo.title.toLowerCase().includes(searchLower) ||
          (todo.description &&
            todo.description.toLowerCase().includes(searchLower))
      );
    }

    if (args.filter === "active") {
      todos = todos.filter((todo) => !todo.isCompleted);
    } else if (args.filter === "completed") {
      todos = todos.filter((todo) => todo.isCompleted);
    }

    return todos;
  },
});

export const addTodo = mutation({
  args: {
    title: v.string(),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const order = Date.now();
    const todoId = await ctx.db.insert("todos", {
      title: args.title,
      description: args.description,
      dueDate: args.dueDate,
      isCompleted: false,
      createdAt: Date.now(),
      order,
    });
    return todoId;
  },
});

export const updateTodo = mutation({
  args: {
    id: v.id("todos"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    dueDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    await ctx.db.patch(id, updates);
  },
});

export const toggleTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get(args.id);
    if (todo) {
      await ctx.db.patch(args.id, { isCompleted: !todo.isCompleted });
    }
  },
});

export const deleteTodo = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});

export const clearCompleted = mutation({
  handler: async (ctx) => {
    const completedTodos = await ctx.db
      .query("todos")
      .filter((q) => q.eq(q.field("isCompleted"), true))
      .collect();

    await Promise.all(completedTodos.map((todo) => ctx.db.delete(todo._id)));
  },
});
