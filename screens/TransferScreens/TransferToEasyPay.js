import { useEffect, useState } from "react";
import { Alert, Modal, View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../../constants/style";
import { getBeneficiaries } from "../../utills/http/transfer";
import { initiateTransfer } from "../../utills/http/transfer";
import Input from "../../components/ui-utils/Input";
import Button from "../../components/UI/Button";

const TransferToEasyPayScreen = ({ navigation }) => {
  const [selectedRecipient, setSelectedRecipient] = useState("");
  const [beneficiariesList, setBeneficiariesList] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [inputs, setInputs] = useState({
    amount: { value: "", isValid: true },
    description: { value: "", isValid: true },
    recipient: { value: "", isValid: true },
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
      description: inputs.description.value,
      recipient: inputs.recipient.value,
    };

    const filteredBeneList = beneficiariesList.filter(
      (beneficiary) => beneficiary.name === enteredData.recipient_name
    );

    const recipientCode = filteredBeneList[0].recipient_code;

    const amountIsValid = !isNaN(enteredData.amount) && enteredData.amount > 0;
    const descriptionIsValid = enteredData.description.trim().length > 0;
    const recipientIsValid = enteredData.recipient.trim().length > 0;

    if (!amountIsValid || !descriptionIsValid || !recipientIsValid) {
      Alert.alert("Invalid Input!", "Please enter valid crendentials.");
      setInputs((currInput) => {
        return {
          ...currInput,
          amount: { value: currInput.amount.value, isValid: amountIsValid },
          description: {
            value: currInput.description.value,
            isValid: descriptionIsValid,
          },
          recipient: {
            value: currInput.recipient.value,
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
  }

  function toggleModal() {
    setIsVisible(true);
  }

  function closeModalHandler() {
    setIsVisible(false);
  }

  return (
    <View>
      <Text style={styles.title}>Transfer To EasyPay</Text>
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
        label="Description"
        textInputConfig={{
          placeholder: "Enter transaction description",
          keyboardType: "default",
          value: inputs.description.value,
          onChangeText: inputChangeHandler.bind(this, "description"),
        }}
        inValid={!inputs.description.isValid}
      />
      <Input
        label="Pick Recipient"
        textInputConfig={{
          placeholder: "Enter recipient name",
          keyboardType: "default",
          value: (inputs.recipient.value = selectedRecipient),
          onChangeText: inputChangeHandler.bind(this, "recipient"),
        }}
        inValid={!inputs.recipient.isValid}
        onFocus={toggleModal}
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

export default TransferToEasyPayScreen;

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
