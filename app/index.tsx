import { Image, StyleSheet, Text, View } from "react-native";
const Logo = require("../assets/img/logo_light.png");
import React from "react";
import { Link } from "expo-router";

const Home = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.img} />

      <Text style={[styles.title, { color: "purple" }]}>The Number 1</Text>

      <Text
        style={{
          marginTop: 10,
          marginBottom: 30,
          paddingHorizontal: 5,
          width: "100%",
          textAlign: "center",
        }}
      >
        Reading List App
      </Text>

      <Link href="/about" style={styles.link}>
        About Page
      </Link>
      <Link href="/contact" style={styles.link}>
        Contact Page
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e0dfe8",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 10, // Added padding to the main container
  },
  img: {
    marginVertical: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center", // Added textAlign to title
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
  },
});

export default Home;
