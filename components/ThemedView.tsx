import { useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";

import React from "react";

const ThemedView = ({ style, ...props }: React.ComponentProps<typeof View>) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={[{ backgroundColor: theme.background }, style]} {...props} />
  );
};

export default ThemedView;
