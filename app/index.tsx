import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import Spacer from "../components/Spacer";
import ThemedLogo from "../components/ThemedLogo";
import ThemedText from "../components/ThemedText";
import ThemedView from "../components/ThemedView";

const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo />
      <Spacer />

      <ThemedText style={styles.title} title={true}>
        The Number 1
      </ThemedText>

      <ThemedText style={{ marginTop: 10, marginBottom: 30, width: "30%" }}>
        Reading List App
      </ThemedText>

      <Link href="/login" style={styles.link}>
        <ThemedText>Login</ThemedText>
      </Link>

      <Link href="/register" style={styles.link}>
        <ThemedText>Register</ThemedText>
      </Link>

      <Link href="/profile" style={styles.link}>
        <ThemedText>Profile</ThemedText>
      </Link>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // paddingHorizontal: 10, // Added padding to the main container
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    // textAlign: "center", // Added textAlign to title
  },
  link: {
    marginVertical: 10,
    borderBottomWidth: 1,
    width: "30%",
  },
});

export default Home;
