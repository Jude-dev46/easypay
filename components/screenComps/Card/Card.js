import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/style";
import { useEffect, useState } from "react";

const Card = ({ customer, transactions }) => {
  const [walletBal, setWallBal] = useState(0);
  const transactionAmount = transactions.map((trans) => trans.amount);

  let sum = 0;

  useEffect(() => {
    function addTransactionAmount() {
      transactionAmount.forEach((trans) => {
        sum += trans;
      });
      setWallBal(sum);
    }
    addTransactionAmount();
  });

  return (
    <View style={styles.container}>
      <View style={styles.accName}>
        <Text style={[styles.text, styles.name]}>
          {customer && `${customer.first_name}${customer.last_name}`}
        </Text>
        <Text style={styles.text}>{customer && customer.id}</Text>
      </View>
      <View>
        <Text style={[styles.text, styles.amount]}>${walletBal}.00</Text>
      </View>
      <Text style={styles.text}>{customer && customer.customer_code}</Text>
      <View style={styles.cardType}>
        <Text style={styles.text}>{customer && customer.domain}</Text>
        <Text style={styles.text}>EASYPAYCARD</Text>
      </View>
    </View>
  );
};

export default Card;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary900,
    marginVertical: 16,
    marginHorizontal: 16,
    padding: 8,
    borderRadius: 6,
  },
  accName: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  name: {
    fontFamily: "roboto-bold",
    fontSize: 22,
  },
  amount: {
    fontSize: 32,
    marginBottom: 8,
  },
  cardType: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  text: {
    fontFamily: "roboto-bold",
    color: Colors.primary50,
  },
});
