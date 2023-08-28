import { useState, useEffect } from "react";
import { Modal, View, Text, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../../constants/style";
import { getBanks } from "../../utills/http/transfer";
import { verifyIdentity } from "../../utills/http/verification";
import Input from "../../components/ui-utils/Input";
import Button from "../../components/UI/Button";

const VerificationScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [inputs, setInputs] = useState({
    account_no: { value: "", isValid: true },
    bank_name: { value: "", isValid: true },
  });

  useEffect(() => {
    async function fetchBanks() {
      const banks = await getBanks();
      setBankList(banks);
    }

    fetchBanks();
  }, []);

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

  async function verificationHandler() {
    const enteredData = {
      account_no: inputs.account_no.value,
      bank_name: inputs.bank_name.value,
    };

    const accountNumberIsValid = enteredData.account_no.length > 0;
    const bankNameIsValid = enteredData.bank_name.trim().length > 0;

    if (!accountNumberIsValid || !bankNameIsValid) {
      Alert.alert("Invalid input!", "Kindly check your entered crendentials.");
      setInputs((currInput) => {
        return {
          account_no: {
            value: currInput.account_no.value,
            isValid: accountNumberIsValid,
          },
          bank_name: {
            value: currInput.bank_name.value,
            isValid: bankNameIsValid,
          },
        };
      });
    }

    try {
      const data = await verifyIdentity(enteredData);
      const accountName = data.data.account_name;
      const accountNumber = data.data.account_number;
      Alert.alert(
        "Message",
        `${data.message}\n\nAccount Name: ${accountName}\nAccount Number: ${accountNumber}`
      );
    } catch (error) {
      Alert.alert("Error!", "An error occurred, try again.");
    }

    (inputs.account_no.value = ""), (inputs.bank_name.value = "");
  }

  function toggleModal() {
    setIsVisible(true);
  }

  function closeModalHandler() {
    setIsVisible(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Account Verification</Text>
      <Input
        label="Account Number"
        textInputConfig={{
          placeholder: "Enter your account number",
          keyboardType: "numeric",
          value: inputs.account_no.value,
          onChangeText: inputChangeHandler.bind(this, "account_no"),
        }}
        inValid={!inputs.account_no.isValid}
      />
      <Input
        label="Bank Name"
        textInputConfig={{
          placeholder: "Enter bank name",
          keyboardType: "default",
          value: (inputs.bank_name.value = selectedBank),
          onChangeText: inputChangeHandler.bind(this, "bank_name"),
        }}
        inValid={!inputs.bank_name.isValid}
        onFocus={toggleModal}
      />
      <Modal visible={isVisible}>
        <Picker
          selectedValue={selectedBank}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedBank(itemValue);
          }}
        >
          <Picker.Item label="Select Bank" value="Bank" />
          {bankList.map((bank) => (
            <Picker.Item key={bank.slug} label={bank.name} value={bank.name} />
          ))}
        </Picker>
        <Button onPress={closeModalHandler}>Close Modal</Button>
      </Modal>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button onPress={cancelHandler}>Cancel</Button>
        </View>
        <View style={styles.button}>
          <Button onPress={verificationHandler}>Confirm</Button>
        </View>
      </View>
    </View>
  );
};

export default VerificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 24,
    color: Colors.primary900,
    marginBottom: 12,
    marginLeft: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    flex: 1,
  },
});
