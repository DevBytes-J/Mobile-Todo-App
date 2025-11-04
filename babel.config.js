// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        // This is the essential plugin for resolving path aliases in Metro
        "module-resolver",
        {
          alias: {
            // Map the '@/' prefix to the project root directory
            "@": "./",
            // Explicitly map key directories for better clarity and reliability
            "@/components": "./components",
            "@/hooks": "./hooks",
            "@/assets": "./assets",
            "@/screens": "./src/screens",
            "@/convex": "./convex",
          },
          extensions: [".js", ".jsx", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
