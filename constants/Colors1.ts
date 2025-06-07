import { DefaultTheme } from "@react-navigation/native";
const white = "#FFFFFF";
const black = "#1D1D1F";
const purple = "#4f2fa2";
const lightpink = "#ffb9cc";
const ligthblue = "#95cae4";

const Colors = {
  background: white,
  secondary: purple,
  text: black,
  lightpink: lightpink,
  ligthblue: ligthblue,
};

export const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    ...Colors,
  },
};
