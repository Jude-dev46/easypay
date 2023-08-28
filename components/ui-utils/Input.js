import { View, Text, TextInput, StyleSheet } from "react-native";

import { Colors } from "../../constants/style";

const Input = ({ label, textInputConfig, inValid, onFocus }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={[styles.label, inValid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput {...textInputConfig} style={styles.input} onFocus={onFocus} />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  label: {
    fontFamily: "roboto-bold",
    fontSize: 18,
    color: Colors.primary600,
    marginBottom: 4,
  },
  input: {
    backgroundColor: Colors.primary400,
    color: Colors.primary50,
    height: 58,
    padding: 6,
    borderRadius: 6,
    fontFamily: "open-sans",
    fontSize: 20,
  },
  invalidLabel: {
    color: Colors.error600,
  },
});
