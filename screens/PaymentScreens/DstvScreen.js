import { useState, useEffect, useLayoutEffect } from "react";
import {
  Text,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
} from "react-native";

import { Colors } from "../../constants/style";
import { getBeneficiaries } from "../../utills/http/transfer";
import { initializeDstvPayment } from "../../utills/http/payment";
import Input from "../../components/ui-utils/Input";
import Button from "../../components/UI/Button";

const DstvScreen = ({ navigation }) => {
  const [beneficiariesList, setBeneficiariesList] = useState([]);
  const [inputs, setInputs] = useState({
    amount: { value: "", isValid: true },
    beneficiary: { value: "", isValid: true },
    email: { value: "", isValid: true },
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: "DSTV Bill" });
  }, [navigation]);

  useEffect(() => {
    async function fetchBeneficiaries() {
      try {
        const beneficiaries = await getBeneficiaries();

        const beneficiaryArray = Object.keys(beneficiaries).map((key) => {
          return { id: key, ...beneficiaries[key] };
        });

        setBeneficiariesList(beneficiaryArray);
      } catch (error) {
        Alert.alert("Error!", "Could not fetch beneficiaries.");
      }
    }

    fetchBeneficiaries();
  }, []);

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInput) => {
      return {
        ...currInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  async function confirmPayment() {
    const enteredData = {
      amount: +inputs.amount.value,
      beneficiary: inputs.beneficiary.value,
      email: inputs.email.value,
    };

    const filteredBeneList = beneficiariesList.filter(
      (beneficiary) => beneficiary.name === enteredData.beneficiary
    );

    const recipientCode = filteredBeneList[0].recipient_code;

    const amountIsValid = !isNaN(enteredData.amount) || enteredData.amount > 0;
    const beneficiaryIsValid = enteredData.beneficiary.trim().length > 0;
    const emailIsValid = enteredData.email.includes("@");

    if (!amountIsValid || !beneficiaryIsValid || !emailIsValid) {
      Alert.alert("Invalid Input!", "Check your credentials and try again.");
      setInputs((currInput) => {
        return {
          amount: { value: currInput.amount.value, isValid: false },
          beneficiary: { value: currInput.beneficiary.value, isValid: false },
          email: { value: currInput.email.value, isValid: false },
        };
      });
    }

    try {
      const data = await initializeDstvPayment(enteredData, recipientCode);
      Alert.alert("Message!", `${data.message}\n${data.data.message}`);
    } catch (error) {
      console.log("Error!", "Could not initialize payment. Try again!");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>
          Make sure you have your DSTV account details as a Beneficiary
        </Text>
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
          label="Beneficiary"
          textInputConfig={{
            placeholder: "Select DSTV as beneficiary",
            keyboardType: "default",
            value: inputs.beneficiary.value,
            onChangeText: inputChangeHandler.bind(this, "beneficiary"),
          }}
          inValid={!inputs.beneficiary.isValid}
        />
        <Input
          label="Amount"
          textInputConfig={{
            placeholder: "Enter amount",
            keyboardType: "number-pad",
            value: inputs.amount.value,
            onChangeText: inputChangeHandler.bind(this, "amount"),
          }}
          inValid={!inputs.amount.isValid}
        />
        <Button onPress={confirmPayment}>Confirm Payment</Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default DstvScreen;

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
});
