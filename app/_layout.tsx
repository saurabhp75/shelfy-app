import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack />
      <Text>Footer</Text>
    </View>
  );
}
