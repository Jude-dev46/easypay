import { View, Text, StyleSheet } from "react-native";

import TransactionButton from "../components/UI/TransactionButtons";
import { Colors } from "../constants/style";

const TransferScreen = ({ navigation }) => {
  function navigatingToEasypayHandler() {
    navigation.navigate("Send To EasyPay User");
  }

  function navigatingToBeneficiaryHandler() {
    navigation.navigate("Beneficiary");
  }

  function navigatingToOtherBanksHandler() {
    navigation.navigate("Send money");
  }

  function navigatingToMoibileWalletHandler() {
    navigation.navigate("Send Money To A Mobile Wallet");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make a transfer</Text>
      <TransactionButton onPress={navigatingToBeneficiaryHandler}>
        Create a beneficiary
      </TransactionButton>
      <TransactionButton onPress={navigatingToEasypayHandler}>
        Send money to EasyPay user
      </TransactionButton>
      <TransactionButton onPress={navigatingToOtherBanksHandler}>
        Send money to other Banks
      </TransactionButton>
      <TransactionButton onPress={navigatingToMoibileWalletHandler}>
        Send money to recipient's wallet
      </TransactionButton>
    </View>
  );
};

export default TransferScreen;

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
