import { useState } from "react";
import { Alert, Linking, Text, View, StyleSheet } from "react-native";

import Input from "../../../ui-utils/Input";
import Button from "../../../UI/Button";
import { Colors } from "../../../../constants/style";

const PaymentForm = ({ onPress, isFunding, fundDetails, setIsFunding }) => {
  const [inputs, setInputs] = useState({
    email: { value: "", isValid: true },
    amount: { value: "", isValid: true },
  });

  // Handling input change
  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInput) => {
      return {
        ...currInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  // Submitting form
  function sumbitHandler() {
    const enteredData = {
      email: inputs.email.value,
      amount: +inputs.amount.value,
    };

    const emailIsValid =
      enteredData.email.includes("@") && enteredData.email.trim().length > 0;
    const amountIsValid = !isNaN(enteredData.amount) && enteredData.amount > 0;

    if (!emailIsValid || !amountIsValid) {
      setInputs((currInput) => {
        return {
          email: {
            value: currInput.email.value,
            isValid: emailIsValid,
          },
          amount: {
            value: currInput.amount.value,
            isValid: amountIsValid,
          },
        };
      });

      return;
    }

    onPress(enteredData);

    inputs.amount.value = "";
    inputs.email.value = "";
  }

  // Setting invalid variable for each input
  const formIsInvalid = !inputs.email.isValid || !inputs.amount.isValid;

  async function completeFundingHandler() {
    setIsFunding(false);
    const url = `${fundDetails.authorization_url}`;

    try {
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Alert.alert("Error!", "Can not open the specified url");
      }
    } catch (error) {
      Alert.alert("Error!", "Error completing funding");
    }
  }

  return (
    <View>
      <Input
        label="Email"
        textInputConfig={{
          placeholder: "Enter your email address",
          keyboardType: "email-address",
          value: inputs.email.value,
          onChangeText: inputChangeHandler.bind(this, "email"),
        }}
        inValid={!inputs.email.isValid}
      />
      <Input
        label="Amount"
        textInputConfig={{
          placeholder: "Enter the amount",
          keyboardType: "number-pad",
          value: inputs.amount.value,
          onChangeText: inputChangeHandler.bind(this, "amount"),
        }}
        inValid={!inputs.amount.isValid}
      />
      {formIsInvalid && <Text style={styles.error}>Invalid input</Text>}
      {!isFunding && <Button onPress={sumbitHandler}>Fund</Button>}
      {isFunding && (
        <Button onPress={completeFundingHandler}>Complete Funding</Button>
      )}
    </View>
  );
};

export default PaymentForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  error: {
    marginLeft: 16,
    marginTop: -8,
    color: Colors.error600,
  },
});
