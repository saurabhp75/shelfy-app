import { Image, useColorScheme } from "react-native";

// images
const DarkLogo = require("../assets/img/logo_dark.png");
const LightLogo = require("../assets/img/logo_light.png");

const ThemedLogo = ({...props}) => {
  const colorScheme = useColorScheme();

  const logo = colorScheme === "dark" ? DarkLogo : LightLogo;

  return <Image source={logo} {...props} />;
};

export default ThemedLogo;
