import { useState } from "react";
import { Alert, SafeAreaView, Modal, StyleSheet } from "react-native";

import Input from "./Input";
import Button from "../UI/Button";

const CustomerForm = ({ isModalVisible, setModalVisible, onPress }) => {
  const [inputs, setInputs] = useState({
    email: { value: "", isValid: true },
    firstName: { value: "", isValid: true },
    lastName: { value: "", isValid: true },
    phoneNo: { value: "", isValid: true },
  });

  function closeModalHandler() {
    setModalVisible(false);
  }

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currVal) => {
      return {
        ...currVal,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function sumbitHandler() {
    let enteredData = {
      email: inputs.email.value,
      firstName: inputs.firstName.value,
      lastName: inputs.lastName.value,
      phoneNo: inputs.phoneNo.value,
    };

    const emailIsValid =
      enteredData.email.includes("@") && enteredData.email.trim().length > 0;
    const firstNameIsValid = enteredData.firstName.trim().length > 0;
    const lastNameIsValid = enteredData.lastName.trim().length > 0;
    const phoneNoIsValid =
      !isNaN(enteredData.phoneNo) &&
      enteredData.phoneNo.toString().includes("+") &&
      enteredData.phoneNo.toString().length === 14;

    if (
      !emailIsValid ||
      !firstNameIsValid ||
      !lastNameIsValid ||
      !phoneNoIsValid
    ) {
      setInputs((currInp) => {
        return {
          email: { value: currInp.email, isValid: emailIsValid },
          firstName: {
            value: currInp.firstName,
            isValid: firstNameIsValid,
          },
          lastName: { value: currInp.lastName, isValid: lastNameIsValid },
          phoneNo: { value: currInp.phoneNo, isValid: phoneNoIsValid },
        };
      });
    }
    onPress(enteredData);
    setModalVisible(false);

    inputs.email.value = "";
    inputs.firstName.value = "";
    inputs.lastName.value = "";
    inputs.phoneNo.value = "";
  }

  const formIsInvalid =
    !inputs.email.isValid ||
    !inputs.firstName.isValid ||
    !inputs.lastName.isValid ||
    !inputs.phoneNo.isValid;

  return (
    <Modal visible={isModalVisible} animationType="slide">
      <SafeAreaView style={styles.container}>
        <Input
          label="Email"
          textInputConfig={{
            placeholder: "test@test.com",
            keyboardType: "email-address",
            value: inputs.email.value,
            onChangeText: inputChangeHandler.bind(this, "email"),
          }}
          inValid={!inputs.email.isValid}
        />
        <Input
          label="First Name"
          textInputConfig={{
            placeholder: "John",
            keyboardType: "default",
            value: inputs.firstName.value,
            onChangeText: inputChangeHandler.bind(this, "firstName"),
          }}
          inValid={!inputs.firstName.isValid}
        />
        <Input
          label="Last Name"
          textInputConfig={{
            placeholder: "Doe",
            keyboardType: "default",
            value: inputs.lastName.value,
            onChangeText: inputChangeHandler.bind(this, "lastName"),
          }}
          inValid={!inputs.lastName.isValid}
        />
        <Input
          label="Phone Number"
          textInputConfig={{
            placeholder: "+2346768686868",
            keyboardType: "phone-pad",
            value: inputs.phoneNo.value,
            onChangeText: inputChangeHandler.bind(this, "phoneNo"),
          }}
          inValid={!inputs.phoneNo.isValid}
        />
        {formIsInvalid &&
          Alert.alert("Invalid Input", "Please check your crendentials.")}
        <Button onPress={sumbitHandler}>Create</Button>
        <Button onPress={closeModalHandler}>Close Modal</Button>
      </SafeAreaView>
    </Modal>
  );
};

export default CustomerForm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
