import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { Alert, View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { Colors } from "../constants/style";
import { createCustomer, fetchCustomer } from "../utills/http/customer";
import { fetchTransaction } from "../utills/http/transactions";
import { fundWallet } from "../utills/http/payment";
import Card from "../components/screenComps/Card/Card";
import IconButton from "../components/UI/IconButton";
import TransactionList from "../components/screenComps/Transaction/TransactionList";
import CustomerForm from "../components/ui-utils/CustomerForm";
import PaymentModal from "../components/ui-utils/PaymentModal";

const HomeScreen = () => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isFundModalVisible, setFundModalVisible] = useState(false);
  const [isFunding, setIsFunding] = useState(false);
  const [fundDetails, setFundDetails] = useState();
  const [customerAcc, setCustomerAcc] = useState(null);
  const [transactions, setTransactions] = useState([]);

  // Handling customer modal
  function triggerModal() {
    setModalVisible(true);
  }

  // Handling fund wallet modal
  function triggerFundModal() {
    setFundModalVisible(true);
  }

  // create customer function
  async function createCustomerHandler({
    email,
    firstName,
    lastName,
    phoneNo,
  }) {
    try {
      const customer = await createCustomer(
        email,
        firstName,
        lastName,
        phoneNo
      );
      setCustomerAcc(customer);
      AsyncStorage.setItem("email", email);
      AsyncStorage.setItem("cutomerId", customer.id);
    } catch (error) {
      console.log("Error!", error);
    }
  }

  // fund wallet function
  async function fundWalletHandler({ email, amount }) {
    const fundRes = await fundWallet(email, amount);

    if (fundRes) {
      setIsFunding(true);
      setFundDetails(fundRes);
    }
  }

  // fetching customer details, if already existed.
  useEffect(() => {
    async function getCustomer() {
      const regEmail = await AsyncStorage.getItem("email");

      try {
        const customerData = await fetchCustomer(regEmail);
        setCustomerAcc(customerData);

        const transactionsDetails = await fetchTransaction(customerData.id);

        setTransactions(transactionsDetails);
      } catch (err) {
        Alert.alert(
          "Message!!!",
          "Kindly create a virtual account and fund it."
        );
      }
    }

    getCustomer();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <CustomerForm
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisible}
        onPress={createCustomerHandler}
      />
      <PaymentModal
        isFunding={isFunding}
        isModalVisible={isFundModalVisible}
        fundDetails={fundDetails}
        setModalVisible={setFundModalVisible}
        setIsFunding={setIsFunding}
        fundWalletHandler={fundWalletHandler}
      />
      <Text style={styles.text}>{`Hello ${
        customerAcc ? customerAcc.last_name : ""
      }👋`}</Text>
      <Card customer={customerAcc} transactions={transactions} />
      <View style={styles.button}>
        <IconButton
          name="Fund Wallet"
          icon="add-circle"
          onPress={triggerFundModal}
        />
        <IconButton
          name="Create Virtual Account"
          icon="add-circle"
          onPress={triggerModal}
        />
      </View>
      <TransactionList
        transaction={transactions}
        transactionType={`WalletFund`}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 24,
    marginLeft: 20,
    marginTop: 12,
    color: Colors.primary900,
  },
  button: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 24,
  },
});
