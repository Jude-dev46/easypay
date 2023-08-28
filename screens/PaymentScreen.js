import { View, Text, StyleSheet } from "react-native";

import { Colors } from "../constants/style";
import TransactionButton from "../components/UI/TransactionButtons";

const PaymentScreen = ({ navigation }) => {
  function goToLightBillScreen() {
    navigation.navigate("Light Bill Screen");
  }
  function goToAirtimeScreen() {
    navigation.navigate("Airtime Screen");
  }
  function goToDataScreen() {
    navigation.navigate("Data Screen");
  }
  function goToDstvScreen() {
    navigation.navigate("DSTV Bill Screen");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Make any payment of your choice</Text>
      <TransactionButton onPress={goToLightBillScreen}>
        Pay your light bills
      </TransactionButton>
      <TransactionButton onPress={goToAirtimeScreen}>
        Buy airtime
      </TransactionButton>
      <TransactionButton onPress={goToDataScreen}>Buy data</TransactionButton>
      <TransactionButton onPress={goToDstvScreen}>
        Pay your DSTV bills
      </TransactionButton>
    </View>
  );
};

export default PaymentScreen;

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
