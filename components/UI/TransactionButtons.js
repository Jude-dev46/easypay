import { Pressable, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../constants/style";

const TransactionButton = ({ children, onPress }) => {
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

export default TransactionButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary900,
    marginTop: 8,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 8,
    paddingVertical: 18,
    paddingHorizontal: 12,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "open-sans",
    fontSize: 20,
    color: Colors.primary50,
  },
  pressed: {
    opacity: 0.35,
  },
});
