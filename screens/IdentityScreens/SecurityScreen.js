import { Alert, View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as LocaAuthentication from "expo-local-authentication";

import { Colors } from "../../constants/style";

const SecurityScreen = ({ navigation }) => {
  function goToDeviceScreen() {
    navigation.navigate("Your Device");
  }

  function goToPasswordScreen() {
    navigation.navigate("Update Password");
  }

  async function useFingerprint() {
    const result = await LocaAuthentication.authenticateAsync();
    console.log(result);

    if (result.success) {
      Alert.alert("Message", "Authentication successful.");
    } else {
      Alert.alert("Message", "Authentication was not successful. Try again");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Secure your EasyPay Wallet</Text>
      <View style={styles.content}>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={useFingerprint}
        >
          <View style={[styles.detail, styles.detailOne]}>
            <Ionicons name="finger-print" size={24} color={Colors.primary50} />
            <Text style={styles.text}>Use fingerprint/Face ID</Text>
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={goToPasswordScreen}
        >
          <View style={[styles.detail, styles.detailOne]}>
            <Ionicons name="lock-closed" size={24} color={Colors.primary50} />
            <Text style={styles.text}>Change Password</Text>
          </View>
        </Pressable>
        <Pressable
          style={({ pressed }) => pressed && styles.pressed}
          onPress={goToDeviceScreen}
        >
          <View style={styles.detail}>
            <Ionicons name="desktop" size={24} color={Colors.primary50} />
            <Text style={styles.text}>See your device</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default SecurityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    marginTop: 12,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 24,
    textAlign: "center",
    color: Colors.primary900,
    marginBottom: 12,
  },
  content: {
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
  pressed: {
    opacity: 0.5,
  },
  text: {
    color: Colors.primary50,
    fontFamily: "open-sans",
    fontSize: 18,
  },
});
