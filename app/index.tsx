import { Image, StyleSheet, Text, View } from "react-native";
const Logo = require("../assets/img/logo_light.png");
import React from "react";

const Home = () => {
  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.img} />

      <Text style={styles.title}>The Number 1</Text>

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

      <View style={styles.card}>
        <Text
          style={{ paddingHorizontal: 5, width: "100%", textAlign: "center" }}
        >
          Hello, this is a Card
        </Text>
      </View>
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
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
    width: "60%", // Set card width to 90% to ensure it's not too wide
    alignItems: "center", // Center content within the card
  },
});

export default Home;
