import { useEffect, useState } from "react";
import { Modal, Text, View, StyleSheet, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../../constants/style";
import { getBanks } from "../../utills/http/transfer";
import { getBeneficiaries } from "../../utills/http/transfer";
import { initiateTransfer } from "../../utills/http/transfer";
import Input from "../../components/ui-utils/Input";
import Button from "../../components/UI/Button";

const TransferToMobileMoneyScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isBankModal, setIsBankModal] = useState(false);
  const [bankList, setBankList] = useState([]);
  const [beneficiariesList, setBeneficiariesList] = useState([]);
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [selectedBank, setSelectedBank] = useState("");
  const [inputs, setInputs] = useState({
    amount: { value: "", isValid: true },
    recipient: { value: "", isValid: true },
    bank: { value: "", isValid: true },
  });

  useEffect(() => {
    async function fetchBeneficiaries() {
      try {
        const beneficiaries = await getBeneficiaries();
        const banks = await getBanks();

        const beneficiaryArray = Object.keys(beneficiaries).map((key) => {
          return { id: key, ...beneficiaries[key] };
        });

        setBeneficiariesList(beneficiaryArray);
        setBankList(banks);
      } catch (error) {
        Alert.alert("Error!", "Could not fetch Beneficiaries.");
      }
    }

    fetchBeneficiaries();
  }, []);

  function cancelHandler() {
    navigation.goBack();
  }

  function toggleModal() {
    setIsVisible(true);
  }

  function closeModalHandler() {
    setIsVisible(false);
  }

  function toggleBankModal() {
    setIsBankModal(true);
  }

  function closeBankModal() {
    setIsBankModal(false);
  }

  function inputChangeHandler(inputIdentifier, enteredValue) {
    setInputs((currInput) => {
      return {
        ...currInput,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  async function sendMoneyHandler() {
    const enteredData = {
      amount: inputs.amount.value,
      recipient: inputs.recipient.value,
      bank: inputs.bank.value,
    };

    const filteredBeneList = beneficiariesList.filter(
      (beneficiary) => beneficiary.name === enteredData.recipient
    );

    const recipientCode = filteredBeneList[0].recipient_code;
    console.log(recipientCode);

    const amountIsValid = !isNaN(enteredData.amount) && enteredData.amount > 0;
    const recipientISValid = enteredData.recipient.trim().length > 0;
    const bankIsValid = enteredData.bank.trim().length > 0;

    if (!amountIsValid || !recipientISValid || !bankIsValid) {
      Alert.alert(
        "Invalid Input",
        "Check your entered crendentials and try again"
      );
      setInputs((currInput) => {
        return {
          amount: { value: currInput.amount.value, isValid: false },
          recipient: { value: currInput.recipient.value, isValid: false },
          bank: { value: currInput.bank.value, isValid: false },
        };
      });
    }

    try {
      await initiateTransfer(enteredData, recipientCode);
    } catch (error) {
      Alert.alert("Error!", "Could not process transfer.");
    }
  }

  return (
    <View>
      <Text style={styles.title}>Send money to a mobile wallet.</Text>
      <Input
        label="Amount"
        textInputConfig={{
          placeholder: "Enter amount to send",
          keyboardType: "number-pad",
          value: inputs.amount.value,
          onChangeText: inputChangeHandler.bind(this, "amount"),
        }}
        inValid={!inputs.amount.isValid}
      />
      <Input
        label="Recipient"
        textInputConfig={{
          placeholder: "Select recipient name",
          keyboardType: "default",
          value: (inputs.recipient.value = selectedRecipient),
          onChangeText: inputChangeHandler.bind(this, "recipient"),
        }}
        inValid={!inputs.recipient.isValid}
        onFocus={toggleModal}
      />
      <Input
        label="Bank Name"
        textInputConfig={{
          placeholder: "Enter amount to send",
          keyboardType: "default",
          value: (inputs.bank.value = selectedBank),
          onChangeText: inputChangeHandler.bind(this, "bank"),
        }}
        inValid={!inputs.bank.isValid}
        onFocus={toggleBankModal}
      />
      <Modal visible={isVisible}>
        <Picker
          selectedValue={selectedRecipient}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedRecipient(itemValue);
          }}
        >
          <Picker.Item label="Recipient" value="Recipient" />
          {beneficiariesList.map((beneficiary) => (
            <Picker.Item
              key={beneficiary.id}
              label={beneficiary.name}
              value={beneficiary.name}
            />
          ))}
        </Picker>
        <Button onPress={closeModalHandler}>Close Modal</Button>
      </Modal>
      <Modal visible={isBankModal}>
        <Picker
          selectedValue={selectedBank}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedBank(itemValue);
          }}
        >
          <Picker.Item label="Bank" value="Bank" />
          {bankList.map((bank) => (
            <Picker.Item key={bank.slug} label={bank.name} value={bank.name} />
          ))}
        </Picker>
        <Button onPress={closeBankModal}>Close Modal</Button>
      </Modal>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button onPress={cancelHandler}>Cancel</Button>
        </View>
        <View style={styles.button}>
          <Button onPress={sendMoneyHandler}>Confirm</Button>
        </View>
      </View>
    </View>
  );
};

export default TransferToMobileMoneyScreen;

const styles = StyleSheet.create({
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
