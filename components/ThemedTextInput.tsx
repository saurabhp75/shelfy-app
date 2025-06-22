import { TextInput, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

import type { TextInputProps, StyleProp, TextStyle } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
  style?: StyleProp<TextStyle>;
};

export default function ThemedTextInput({
  style,
  ...props
}: ThemedTextInputProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <TextInput
      style={[
        {
          backgroundColor: theme.uiBackground,
          color: theme.text,
          padding: 20,
          borderRadius: 6,
        },
        style,
      ]}
      {...props}
    />
  );
}
