import { Text, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

import type { TextProps, TextStyle } from "react-native";

type ThemedTextProps = TextProps & {
  title?: boolean;
  style?: TextStyle | TextStyle[];
};

const ThemedText = ({ style, title = false, ...props }: ThemedTextProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  const textColor = title ? theme.title : theme.text;

  return <Text style={[{ color: textColor }, style]} {...props} />;
};

export default ThemedText;
