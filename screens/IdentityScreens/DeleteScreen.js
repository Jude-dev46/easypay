import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";

import { Colors } from "../../constants/style";
import Button from "../../components/UI/Button";
import Input from "../../components/ui-utils/Input";
import { removeAccount } from "../../utills/http/customer";

const DeleteScreen = ({ navigation }) => {
  const [inputs, setInputs] = useState({
    email: { value: "", isValid: true },
  });

  function cancelHandler() {
    navigation.goBack();
  }

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInput) => {
      return {
        ...currInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  async function confirmHandler() {
    const enteredData = { email: inputs.email.value };

    const emailIsValid = enteredData.email.includes("@") || enteredData.email;

    if (!emailIsValid) {
      Alert.alert("Invalid", "Enter a valid email address.");
      setInputs((currInput) => {
        return { email: { value: currInput.email.value, isValid: false } };
      });
    }

    try {
      await removeAccount(enteredData);
    } catch (error) {
      Alert.alert(
        "Error!",
        "Could not delete account. Try again if you are sure"
      );
    }

    inputs.email.value = "";
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Your account will be removed from EasyPay.
      </Text>
      <Input
        label="Email"
        textInputConfig={{
          placeholder: "Enter your registered email",
          keyboardType: "default",
          value: inputs.email.value,
          onChangeText: inputChangeHandler.bind(this, "email"),
        }}
        inValid={!inputs.email.isValid}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button onPress={cancelHandler}>Cancel</Button>
        </View>
        <View style={styles.button}>
          <Button onPress={confirmHandler}>Confirm</Button>
        </View>
      </View>
    </View>
  );
};

export default DeleteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: Colors.primary900,
    marginLeft: 16,
    marginVertical: 12,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 1,
  },
});
