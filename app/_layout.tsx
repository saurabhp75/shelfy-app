import { Stack } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Stack />
      <Text>Footer</Text>
    </View>
  );
}
