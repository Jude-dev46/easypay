import { Pressable, Text, StyleSheet, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../constants/style";

const IconButton = ({ name, onPress, icon }) => {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressed}
      onPress={onPress}
    >
      <View style={styles.container}>
        <Ionicons name={icon} size={24} color={Colors.primary900} />
        <Text style={styles.text}>{name}</Text>
      </View>
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginBottom: 32,
  },
  pressed: {
    opacity: 0.75,
  },
  text: {
    fontFamily: "open-sans",
    color: Colors.primary900,
  },
});
