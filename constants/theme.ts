export type Theme = {
  // Backgrounds
  background: string;
  surface: string;
  cardBackground: string;

  // Text
  text: string;
  textLight: string;
  textSecondary: string;
  textCompleted: string;
  placeholder: string;
  muted: string;

  // UI Elements
  border: string;
  checkbox: string;
  checkboxActive: string;
  checkboxGradientStart: string;
  checkboxGradientEnd: string;

  // Interactive
  primary: string;
  hover: string;

  // Icons
  icon: string;
  iconActive: string;

  // Shadow
  shadow: string;
};

export const lightTheme: Theme = {
  // Backgrounds
  background: "#FAFAFA",
  surface: "#FFFFFF",
  cardBackground: "#FFFFFF",
  placeholder: "#9495A5",

  // Text
  text: "#494C6B",
  textLight: "#9495A5",
  textSecondary: "#494C6B",
  textCompleted: "#D1D2DA",

  // UI Elements
  border: "#E3E4F1",
  checkbox: "#E3E4F1",
  checkboxActive: "#57DDFF",
  checkboxGradientStart: "#57DDFF",
  checkboxGradientEnd: "#C058F3",

  // Interactive
  primary: "#3A7CFD",
  hover: "#E3E4F1",

  // Icons
  icon: "#9495A5",
  iconActive: "#FFFFFF",
  muted: "#9495A5",

  // Shadow
  shadow: "rgba(194, 195, 214, 0.5)",
};

export const darkTheme: Theme = {
  // Backgrounds
  background: "#171823",
  surface: "#25273D",
  cardBackground: "#25273D",

  // Text
  text: "#C8CBE7",
  textLight: "#5B5E7E",
  textSecondary: "#C8CBE7",
  textCompleted: "#4D5067",

  // UI Elements
  border: "#393A4B",
  checkbox: "#393A4B",
  checkboxActive: "#57DDFF",
  checkboxGradientStart: "#57DDFF",
  checkboxGradientEnd: "#C058F3",

  // Interactive
  primary: "#3A7CFD",
  hover: "#393A4B",

  // Icons
  icon: "#5B5E7E",
  iconActive: "#FFFFFF",
  muted: "#767992",

  // Shadow
  shadow: "rgba(0, 0, 0, 0.5)",
  placeholder: "#9495A5",
};
