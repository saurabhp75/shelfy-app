import { useColorScheme, View } from "react-native";
import { Colors } from "../constants/Colors";

import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type ThemedViewProps = React.ComponentProps<typeof View> & {
  safe?: boolean;
};

const ThemedView = ({ style, safe = false, ...props }: ThemedViewProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

 if (!safe)
   return (
     <View style={[{ backgroundColor: theme.background }, style]} {...props} />
   );

 const insets = useSafeAreaInsets();

 return (
   <View
     style={[
       {
         backgroundColor: theme.background,
         paddingTop: insets.top,
         paddingBottom: insets.bottom,
       },
       style,
     ]}
     {...props}
   />
 );
};

export default ThemedView;
