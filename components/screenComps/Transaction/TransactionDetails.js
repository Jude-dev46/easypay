import { Pressable, Platform, View, Text, StyleSheet } from "react-native";
import { Colors } from "../../../constants/style";

const TransactionDetails = ({ amount, channel, createdAt, currency, name }) => {
  const transactionDate = new Date(createdAt).getDate();
  const transactionMonth = new Date(createdAt).getMonth();
  const transactionYear = new Date(createdAt).getFullYear();

  const date = `${transactionDate}/${transactionMonth}/${transactionYear}`;

  return (
    <Pressable
      android_ripple={{ color: Colors.primary900 }}
      style={({ pressed }) => pressed && styles.pressed}
    >
      <View style={styles.container}>
        <View style={styles.priDetail}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.amount}>
            {amount}
            {currency}
          </Text>
        </View>
        <View style={styles.secDetail}>
          <Text style={styles.text}>{channel}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default TransactionDetails;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 2,
    borderColor: Colors.primary900,
    padding: 8,
    paddingVertical: 6,
    paddingHorizontal: 18,
  },
  pressed: {
    opacity: Platform.OS && 0.35,
  },
  title: {
    fontFamily: "open-sans-bold",
    fontSize: 20,
    color: Colors.primary900,
  },
  text: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: Colors.primary900,
  },
  amount: {
    fontFamily: "open-sans",
    fontSize: 18,
    color: Colors.primary900,
  },
  priDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: -4,
  },
  secDetail: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  date: {
    fontFamily: "open-sans",
    color: Colors.primary900,
  },
});
