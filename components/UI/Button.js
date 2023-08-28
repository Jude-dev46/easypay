import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/style";

const Button = ({ children, onPress }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => (pressed ? styles.pressed : null)}
    >
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary700,
    marginTop: 8,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "roboto-light",
    fontSize: 16,
    color: Colors.primary50,
  },
  pressed: {
    opacity: 0.35,
  },
});
