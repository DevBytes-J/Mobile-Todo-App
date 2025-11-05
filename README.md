Mobile Todo Application

📝 Project Overview

This is a modern, cross-platform mobile Todo List application built using React Native (Expo) and leveraging Convex for real-time, persistent backend data storage. The application provides a clean, responsive interface for users to manage tasks effectively.

The primary goal of this project was to demonstrate robust mobile development practices, including real-time data synchronization, local state management, and native asset compilation (APK generation).

✨ Key Features

CRUD Operations: Full functionality to Create, Read, Update (toggle completion), and Delete tasks.

Real-Time Sync: All changes (creation, updates, deletions) are instantly synchronized across devices using Convex.

Theme Management: Dark/Light theme toggle with persistent storage.

Filtering: Users can filter the task list to view All tasks, Active tasks, or Completed tasks.

Search: Real-time search functionality to quickly find tasks by title or description.

Responsive Design: Optimized layout for both mobile and tablet screen sizes.

⚙️ Tech Stack

Category

Technology

Purpose

Mobile Framework

React Native (via Expo SDK 54)

Cross-platform development.

Backend/Database

Convex

Real-time database and serverless functions.

Styling

 Tailwind CSS

Utility-first mobile styling and responsive design.

Language

TypeScript

Type safety and improved developer experience.

🚀 Getting Started (Local Development)

To set up and run this project locally, you will need Node.js, npm, and the Expo CLI installed.

1. Clone the Repository

git clone [https://github.com/DevBytes-J/Mobile-Todo-App.git](https://github.com/DevBytes-J/Mobile-Todo-App.git)
cd Mobile-Todo-App


2. Install Dependencies

npm install


3. Setup Convex Backend

This application uses Convex for its backend.

Initialize Convex:

npx convex dev


This command starts the local Convex server and generates the necessary convex/_generated files.

(If necessary) Deploy the database schema and functions:

npx convex push


4. Run the Application

Start the Expo development server:

npx expo start


Scan the QR code with the Expo Go app on your mobile device (iOS or Android), or press a to open on an Android emulator, or i for an iOS simulator.

📦 Build and Deployment (APK Generation)

The final Android APK was generated using EAS Build (Expo Application Services).

1. EAS Configuration

Ensure you are logged into EAS and have configured the build profile:

eas login
eas build:configure


2. Running the Build

The final application was compiled using the production profile, which generates a signed, standalone APK file.

eas build --platform android --profile production


3. Final APK Artifact

The last successful build generated the following artifact:

APK Download Link: [https://expo.dev/artifacts/eas/8KhaVDi3azoCMDP1SkeQkg.apk]

🧑‍💻 Author & Version

Author: Joanna Bassey

Project Version: 1.0.0

Date Completed: November 2025