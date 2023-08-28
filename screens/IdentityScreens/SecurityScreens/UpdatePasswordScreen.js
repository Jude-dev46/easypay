import { useState } from "react";
import { View, StyleSheet, Alert } from "react-native";

import { resetPassword } from "../../../utills/auth";
import Input from "../../../components/ui-utils/Input";
import Button from "../../../components/UI/Button";

const UpdatePasswordScreen = () => {
  const [inputs, setInputs] = useState({
    currPassword: { value: "", isValid: true },
    newPassword: { value: "", isValid: true },
    confirmPassword: { value: "", isValid: true },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInput) => {
      return {
        ...currInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  async function resetPasswordHandler() {
    const enteredData = {
      currPassword: inputs.currPassword.value,
      newPassword: inputs.newPassword.value,
      confirmPassword: inputs.confirmPassword.value,
    };

    const passwordIsValid =
      enteredData.currPassword.trim().length > 0 ||
      enteredData.newPassword.trim().length > 0 ||
      enteredData.currPassword.trim().length > 0;
    const passwordIsMatch =
      enteredData.newPassword === enteredData.confirmPassword;

    if (!passwordIsValid && !passwordIsMatch) {
      Alert.alert("Invalid Input", "Check your entered credentials");
      setInputs((currInput) => {
        return {
          currPassword: { value: currInput.currPassword.value, isValid: false },
          newPassword: { value: currInput.newPassword.value, isValid: false },
          confirmPassword: {
            value: currInput.confirmPassword.value,
            isValid: false,
          },
        };
      });
    }

    await resetPassword(enteredData);
  }

  return (
    <View style={styles.container}>
      <Input
        label="Current Password"
        textInputConfig={{
          placeholder: "Enter current password",
          keyboardType: "default",
          secureTextEntry: true,
          value: inputs.currPassword.value,
          onChangeText: inputChangeHandler.bind(this, "currPassword"),
        }}
        inValid={!inputs.currPassword.isValid}
      />
      <Input
        label="New Password"
        textInputConfig={{
          placeholder: "Enter new password",
          keyboardType: "default",
          secureTextEntry: true,
          value: inputs.newPassword.value,
          onChangeText: inputChangeHandler.bind(this, "newPassword"),
        }}
        inValid={!inputs.newPassword.isValid}
      />
      <Input
        label="Confirm new Password"
        textInputConfig={{
          placeholder: "Confirm entered new password",
          keyboardType: "default",
          secureTextEntry: true,
          value: inputs.confirmPassword.value,
          onChangeText: inputChangeHandler.bind(this, "confirmPassword"),
        }}
        inValid={!inputs.confirmPassword.isValid}
      />
      <Button onPress={resetPasswordHandler}>Confirm New Password</Button>
    </View>
  );
};

export default UpdatePasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
