import { View, Text, StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Device from "expo-device";

import { Colors } from "../../../constants/style";

const DeviceScreen = () => {
  const platformType =
    Platform.OS === "android" ? "Android Version" : "iOS Version";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>See details of your device below</Text>
      <View style={styles.device}>
        <View style={styles.platform}>
          <Ionicons name="phone-portrait" color={Colors.primary50} size={18} />
          <Text style={styles.text}>{Device.deviceName}</Text>
        </View>
        <View style={styles.platform}>
          <Text style={styles.text}>Device Brand:</Text>
          <Text style={styles.text}>{Device.brand}</Text>
        </View>
        <Text style={styles.text}>{Device.osName}</Text>
        <View style={styles.platform}>
          <Text style={styles.text}>{platformType}:</Text>
          <Text style={styles.text}>{Device.osVersion}</Text>
        </View>
      </View>
    </View>
  );
};

export default DeviceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 24,
    textAlign: "center",
    color: Colors.primary900,
    marginBottom: 12,
  },
  device: {
    backgroundColor: Colors.primary900,
    marginHorizontal: 8,
    borderRadius: 12,
    padding: 8,
  },
  text: {
    color: Colors.primary50,
    fontFamily: "open-sans",
    fontSize: 18,
    marginBottom: 8,
  },
  platform: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
