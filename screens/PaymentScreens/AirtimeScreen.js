import { useState, useLayoutEffect } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../../constants/style";
import { purchaseAirtime } from "../../utills/http/payment";
import { NETWORK_PROVIDERS } from "../../model/Network";
import Input from "../../components/ui-utils/Input";
import Button from "../../components/UI/Button";

const AirtimeScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("");
  const [inputs, setInputs] = useState({
    amount: { value: "", isValid: true },
    email: { value: "", isValid: true },
    phoneNo: { value: "", isValid: true },
    network: { value: "", isValid: true },
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Data" });
  }, [navigation]);

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInput) => {
      return {
        ...currInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function toggleModal() {
    setIsVisible(true);
  }

  function closeModalHandler() {
    setIsVisible(false);
  }

  async function confirmPaymentHandler() {
    const enteredData = {
      amount: +inputs.amount.value,
      email: inputs.email.value,
      phone_number: inputs.phoneNo.value,
      network: inputs.network.value,
    };

    const amountIsValid = !isNaN(enteredData.amount) || enteredData.amount > 0;
    const emailIsValid =
      enteredData.email.includes("@") || enteredData.email.trim().length > 0;
    const phoneNoIsValid = enteredData.phone_number.length > 0;

    if (!amountIsValid || !emailIsValid || !phoneNoIsValid) {
      Alert.alert("Invalid Input", "Check your crendentials and try again");
      setInputs((currInput) => {
        return {
          amount: { value: currInput.amount.value, isValid: false },
          email: { value: currInput.email.value, isValid: false },
          network: { value: currInput.network.value, isValid: false },
          phoneNo: { value: currInput.phoneNo.value, isValid: false },
        };
      });
    }

    try {
      const data = await purchaseAirtime(enteredData);
      Alert.alert("Message!", `${data.message}\n${data.data.message}`);
    } catch (error) {
      console.log("Error!", "Could not complete payment. Try again!");
    }

    inputs.amount.value = "";
    inputs.phoneNo.value = "";
    inputs.email.value = "";
    selectedNetwork("");
  }

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>Purchase airtime</Text>
        <Input
          label="Email"
          textInputConfig={{
            placeholder: "Enter your email",
            keyboardType: "email-address",
            value: inputs.email.value,
            onChangeText: inputChangeHandler.bind(this, "email"),
          }}
          inValid={!inputs.email.isValid}
        />
        <Input
          label="Phone Number"
          textInputConfig={{
            placeholder: "Enter mobile number to be recharged",
            keyboardType: "number-pad",
            value: inputs.phoneNo.value,
            onChangeText: inputChangeHandler.bind(this, "phoneNo"),
          }}
          inValid={!inputs.phoneNo.isValid}
        />
        <Input
          label="Network"
          textInputConfig={{
            placeholder: "Enter network provider",
            keyboardType: "default",
            value: (inputs.network.value = selectedNetwork),
            onChangeText: inputChangeHandler.bind(this, "network"),
          }}
          inValid={!inputs.network.isValid}
          onFocus={toggleModal}
        />
        <Input
          label="Amount"
          textInputConfig={{
            placeholder: "Enter amount to be recharged",
            keyboardType: "number-pad",
            value: inputs.amount.value,
            onChangeText: inputChangeHandler.bind(this, "amount"),
          }}
          inValid={!inputs.amount.isValid}
        />
        <Modal visible={isVisible}>
          <Picker
            selectedValue={selectedNetwork}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedNetwork(itemValue);
            }}
          >
            <Picker.Item label="Select Network" value="Select Network" />
            {NETWORK_PROVIDERS.map((network, index) => (
              <Picker.Item
                key={network.id}
                label={network.name}
                value={network.name}
              />
            ))}
          </Picker>
          <Button onPress={closeModalHandler}>Close Modal</Button>
        </Modal>
        <Button onPress={confirmPaymentHandler}>Buy Airtime</Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default AirtimeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    color: Colors.primary900,
    marginLeft: 16,
    marginVertical: 8,
  },
});
