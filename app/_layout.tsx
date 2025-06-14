import { Slot } from "expo-router";
import React from "react";
import { View, Text } from "react-native";

export default function RootLayout() {
  return (
    <View style={{ flex: 1 }}>
      <Slot />
      <Text>Footer</Text>
    </View>
  );
}
