import { useContext } from "react";
import { FlatList, Text, View, StyleSheet } from "react-native";

import TransactionDetails from "./TransactionDetails";
import { Colors } from "../../../constants/style";

const TransactionList = ({ transaction, transactionType }) => {
  const successfulTransaction = transaction.filter(
    (trans) => trans.status === "success"
  );

  function renderTransactionItem(itemData) {
    return <TransactionDetails {...itemData.item} name={transactionType} />;
  }

  return (
    <>
      <View style={styles.listContainer}>
        <Text style={styles.listTitle}>Transaction History</Text>
      </View>
      {transaction.length === 0 && (
        <View>
          <Text style={styles.text}>No recent transactions</Text>
        </View>
      )}
      <FlatList
        data={successfulTransaction}
        renderItem={renderTransactionItem}
        keyExtractor={(item) => item.id}
      />
    </>
  );
};

export default TransactionList;

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 6,
  },
  listTitle: {
    fontFamily: "roboto-bold",
    fontSize: 28,
    marginLeft: 20,
    color: Colors.primary900,
  },
  text: {
    fontFamily: "roboto-bold",
    textAlign: "center",
    color: Colors.primary400,
    borderTopWidth: 2,
    borderTopColor: Colors.primary900,
    paddingTop: 12,
  },
});
