import { Link } from "expo-router";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Colors } from "../constants/Colors";

const About = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.title }]}>About Page</Text>

      <Link href="/" style={[styles.link, { color: theme.text }]}>
        Home Page
      </Link>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0dfe8",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});
