import { useState } from "react";
import { View } from "react-native";
import Input from "../../utils/Input";
import Button from "../../UI/Button";

const TransactionForm = ({ onSubmit }) => {
  const [inputs, setInputs] = useState({
    email: { value: "", isValid: true },
    amount: { value: 1000, isValid: true },
  });

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currVal) => {
      return {
        ...currVal,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

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
    onSubmit(enteredData);
  }

  return (
    <View>
      <Input
        label="Email"
        textInputConfig={{
          keyboardType: "",
          value: inputs.email.value,
          onChangeText: inputChangeHandler.bind(this, "email"),
        }}
      />
      <Input
        label="Amount"
        textInputConfig={{
          keyboardType: "decimal-pad",
          value: inputs.amount.value,
          onChangeText: inputChangeHandler.bind(this, "amount"),
        }}
      />
      <Button onPress={sumbitHandler}>Send</Button>
    </View>
  );
};

export default TransactionForm;
