import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../../constants/style";

const AccountOfficer = () => {
  return (
    <View>
      <Text style={styles.detailTitle}>Account Officer Details</Text>
      <View style={styles.detailContainer}>
        <View style={[styles.detail, styles.detailOne]}>
          <Ionicons name="mail" size={24} color={Colors.primary50} />
          <Text style={styles.text}>contactcustomercare@easypay.com</Text>
        </View>
        <View style={styles.detail}>
          <Ionicons name="person" size={24} color={Colors.primary50} />
          <Text style={styles.text}>Customer Contact Center</Text>
        </View>
      </View>
    </View>
  );
};

export default AccountOfficer;

const styles = StyleSheet.create({
  text: {
    color: Colors.primary50,
    fontFamily: "open-sans",
    fontSize: 18,
  },
  detailTitle: {
    fontFamily: "roboto-bold",
    fontSize: 24,
    color: Colors.primary900,
    marginLeft: 32,
    marginBottom: 12,
  },
  detailContainer: {
    backgroundColor: Colors.primary900,
    borderRadius: 6,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    gap: 24,
    padding: 18,
  },
  detailOne: {
    borderBottomWidth: 1,
    borderColor: Colors.primary50,
  },
});
