import { useState, useEffect, useLayoutEffect } from "react";
import {
  Modal,
  ScrollView,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Colors } from "../../constants/style";
import { getBeneficiaries } from "../../utills/http/transfer";
import { LIGHTPROVIDERS } from "../../model/LightProvider";
import Button from "../../components/UI/Button";
import Input from "../../components/ui-utils/Input";

const LightBillScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [beneficiariesList, setBeneficiariesList] = useState([]);
  const [selectedProvider, setSelectedProvider] = useState("");
  const [inputs, setInputs] = useState({
    amount: { value: "", isValid: true },
    beneficiary: { value: "", isValid: true },
    email: { value: "", isValid: true },
  });

  useLayoutEffect(() => {
    navigation.setOptions({ title: "Light Bill" });
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

  function toggleModal() {
    setIsVisible(true);
  }

  function closeModalHandler() {
    setIsVisible(false);
  }

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
      await initializeDstvPayment(enteredData, recipientCode);
    } catch (error) {
      console.log("Error!", "Could not initialize payment. Try again!");
    }
  }

  return (
    <ScrollView style={styles.container}>
      <KeyboardAvoidingView style={styles.container}>
        <Text style={styles.title}>
          Make sure you have your light Provider service account details saved
          as a Beneficiary.
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
          label="Light Provider Service"
          textInputConfig={{
            placeholder: "Select your light provider service",
            keyboardType: "default",
            value: (inputs.beneficiary.value = selectedProvider),
            onChangeText: inputChangeHandler.bind(this, "beneficiary"),
          }}
          inValid={!inputs.beneficiary.isValid}
          onFocus={toggleModal}
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
        <Modal visible={isVisible}>
          <Picker
            selectedValue={selectedProvider}
            onValueChange={(itemValue, itemIndex) => {
              setSelectedProvider(itemValue);
            }}
          >
            <Picker.Item label="Select Provider" name="Select Provider" />
            {LIGHTPROVIDERS.map((provider) => (
              <Picker.Item
                key={provider.id}
                label={provider.slug}
                value={provider.name}
              />
            ))}
          </Picker>
          <Button onPress={closeModalHandler}>Close Modal</Button>
        </Modal>
        <Button onPress={confirmPayment}>Confirm Payment</Button>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default LightBillScreen;

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
