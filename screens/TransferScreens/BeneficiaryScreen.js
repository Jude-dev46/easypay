import { useState, useEffect } from "react";
import { Alert, Modal, View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../../constants/style";
import { createBeneficiary } from "../../utills/http/transfer";
import { getBanks } from "../../utills/http/transfer";
import Input from "../../components/ui-utils/Input";
import Button from "../../components/UI/Button";

const BeneficiaryScreen = ({ navigation }) => {
  const [banksList, setBankList] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [isTypeModalVisible, setIsTypeModalVisible] = useState(false);
  const [inputs, setInputs] = useState({
    name: { value: "", isValid: true },
    type: { value: "", isValid: true },
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

  function toggleModal() {
    setIsVisible(true);
  }

  function closeModalHandler() {
    setIsVisible(false);
  }

  function toggleTypeModal() {
    setIsTypeModalVisible(true);
  }

  function closeTypeModalHandler() {
    setIsTypeModalVisible(false);
  }

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

  async function createBeneficiaryHandler() {
    const enteredData = {
      name: inputs.name.value,
      type: inputs.type.value,
      account_no: inputs.account_no.value,
      bank_name: inputs.bank_name.value,
    };

    const nameIsValid = enteredData.name.trim().length > 0;
    const typeIsValid = enteredData.type.trim().length > 0;
    const accountNumbIsValid = enteredData.account_no > 0;
    const bankNameIsValid = enteredData.bank_name.trim().length > 0;

    if (
      !nameIsValid ||
      !typeIsValid ||
      !accountNumbIsValid ||
      !bankNameIsValid
    ) {
      Alert.alert("Invalid Input!", "Please enter valid crendentials.");
      setInputs((currInput) => {
        return {
          name: { value: currInput.name.value, isValid: nameIsValid },
          type: { value: currInput.type.value, isValid: typeIsValid },
          account_no: {
            value: currInput.account_no.value,
            isValid: accountNumbIsValid,
          },
          bank_name: {
            value: currInput.bank_name.value,
            isValid: bankNameIsValid,
          },
        };
      });

      return;
    }

    try {
      const message = await createBeneficiary(enteredData);
      Alert.alert("Message!", `${message}.`);
    } catch (error) {
      console.log("Error!", error);
    }

    (inputs.name.value = ""),
      (inputs.account_no.value = ""),
      (inputs.bank_name.value = "");
  }

  let content = false;

  if (selectedType === "nuban" || selectedType === "basa") {
    content = true;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Enter details of beneficiary to be created.
      </Text>
      <Input
        label="Name"
        textInputConfig={{
          placeholder: "Enter recipient name",
          keyboardType: "default",
          value: inputs.name.value,
          onChangeText: inputChangeHandler.bind(this, "name"),
        }}
        inValid={!inputs.name.isValid}
      />
      <Input
        label="Type"
        textInputConfig={{
          placeholder: "Enter recipient account type",
          keyboardType: "default",
          value: (inputs.type.value = selectedType),
          onChangeText: inputChangeHandler.bind(this, "type"),
        }}
        inValid={!inputs.type.isValid}
        onFocus={toggleTypeModal}
      />
      {content && (
        <Input
          label="Acount number"
          textInputConfig={{
            placeholder: "Enter beneficiary account number",
            keyboardType: "number-pad",
            value: inputs.account_no.value,
            onChangeText: inputChangeHandler.bind(this, "account_no"),
          }}
          inValid={!inputs.account_no.isValid}
        />
      )}
      <Input
        label="Bank Name"
        textInputConfig={{
          placeholder: "Enter recipient bank name",
          keyboardType: "default",
          value: (inputs.bank_name.value = selectedBank),
          onChangeText: inputChangeHandler.bind(this, "bank_name"),
        }}
        onFocus={toggleModal}
        inValid={!inputs.bank_name.isValid}
      />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button onPress={cancelHandler}>Cancel</Button>
        </View>
        <View style={styles.button}>
          <Button onPress={createBeneficiaryHandler}>Confirm</Button>
        </View>
      </View>
      <Modal visible={isTypeModalVisible}>
        <Picker
          selectedValue={selectedType}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedType(itemValue);
          }}
        >
          <Picker.Item label="nuban" value="nuban" />
          <Picker.Item label="mobile_wallet" value="mobile_wallet" />
          <Picker.Item label="basa" value="basa" />
        </Picker>
        <Button onPress={closeTypeModalHandler}>Close Modal</Button>
      </Modal>
      <Modal visible={isVisible}>
        <Picker
          selectedValue={selectedBank}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedBank(itemValue);
          }}
        >
          {banksList.map((bank) => (
            <Picker.Item key={bank.slug} label={bank.name} value={bank.name} />
          ))}
        </Picker>
        <Button onPress={closeModalHandler}>Close Modal</Button>
      </Modal>
    </View>
  );
};

export default BeneficiaryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
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
