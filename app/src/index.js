import React from "react";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import { StyleSheet, Text, View } from "react-native";
import RootRoute from "./routes";

import COLORCONSTANT from "./constants/Constants";

export default function Main() {
  const theme = {
    ...DefaultTheme,
    roundness: 2,
    dark: false,
    mode: "adaptive",
    colors: {
      ...DefaultTheme.colors,
      primary: COLORCONSTANT.tintColor,
      accent: "#f1c40f",
    },
  };

  return (
    <PaperProvider theme={theme}>
        <RootRoute />
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
