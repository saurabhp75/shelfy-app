import {
  Pressable,
  StyleSheet,
  PressableProps,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Colors } from "../constants/Colors";

interface ThemedButtonProps extends PressableProps {
  style?: StyleProp<ViewStyle>;
}

function ThemedButton({ style, ...props }: ThemedButtonProps) {
  return (
    <Pressable
      style={({ pressed }) => [styles.btn, pressed && styles.pressed, style]}
      {...props}
    />
  );
}
const styles = StyleSheet.create({
  btn: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 6,
    marginVertical: 10,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default ThemedButton;
