import { useState, useEffect } from "react";
import { Alert, Modal, View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../../constants/style";
import { initiateTransfer } from "../../utills/http/transfer";
import { getBeneficiaries } from "../../utills/http/transfer";
import Input from "../../components/ui-utils/Input";
import Button from "../../components/UI/Button";

const TransferMoneyScreen = ({ navigation }) => {
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [beneficiariesList, setBeneficiariesList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [inputs, setInputs] = useState({
    amount: { value: "", isValid: true },
    reason: { value: "", isValid: true },
    recipient_name: { value: "", isValid: true },
  });

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

  function toggleModal() {
    setIsVisible(true);
  }

  function closeModalHandler() {
    setIsVisible(false);
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

  async function sendMoneyHandler() {
    const enteredData = {
      amount: +inputs.amount.value,
      reason: inputs.reason.value,
      recipient_name: inputs.recipient_name.value,
    };

    const filteredBeneList = beneficiariesList.filter(
      (beneficiary) => beneficiary.name === enteredData.recipient_name
    );

    const recipientCode = filteredBeneList[0].recipient_code;

    const amountIsValid = !isNaN(enteredData.amount) || enteredData.amount > 0;
    const reasonIsValid = enteredData.reason.trim().length > 0;
    const recipientIsValid = enteredData.recipient_name.trim().length > 0;

    if (!amountIsValid || !reasonIsValid || !recipientIsValid) {
      Alert.alert("Invalid Input!", "Please enter valid crendentials.");
      setInputs((currInput) => {
        return {
          amount: { value: currInput.amount.value, isValid: amountIsValid },
          reason: { value: currInput.reason.value, isValid: reasonIsValid },
          recipient_name: {
            value: currInput.recipient_name.value,
            isValid: recipientIsValid,
          },
        };
      });
    }

    try {
      await initiateTransfer(enteredData, recipientCode);
    } catch (error) {
      Alert.alert("Error!", "Could not process transfer.");
    }

    (inputs.amount.value = ""),
      (inputs.reason.value = ""),
      (inputs.recipient_name.value = "");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Send money to a beneficiary.</Text>
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
        label="Reason"
        textInputConfig={{
          placeholder: "Enter discription of transfer",
          keyboardType: "default",
          value: inputs.reason.value,
          onChangeText: inputChangeHandler.bind(this, "reason"),
        }}
        inValid={!inputs.reason.isValid}
      />
      <Input
        label="Pick Recipient"
        textInputConfig={{
          placeholder: "Enter recipient account name",
          keyboardType: "default",
          value: (inputs.recipient_name.value = selectedRecipient),
          onChangeText: inputChangeHandler.bind(this, "recipient_name"),
        }}
        onFocus={toggleModal}
        inValid={!inputs.recipient_name.isValid}
      />
      <Modal visible={isVisible}>
        <Picker
          selectedValue={selectedRecipient}
          onValueChange={(itemValue, itemIndex) => {
            setSelectedRecipient(itemValue);
          }}
        >
          <Picker.Item label="Beneficiary" value="Beneficiary" />
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

export default TransferMoneyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 32,
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
