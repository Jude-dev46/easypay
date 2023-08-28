import { useContext } from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../../constants/style";
import { AuthContext } from "../../../store/auth-context";

const GeneralSettings = () => {
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  function goToVerificationHandler() {
    navigation.navigate("Verification");
  }

  function goToSecurityHandler() {
    navigation.navigate("Security");
  }

  function goToReferralHandler() {
    navigation.navigate("Referral");
  }

  function logoutHandler() {
    authCtx.logout();
  }

  function goToDeleteScreen() {
    navigation.navigate("Delete");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>General Settings</Text>
      <View style={styles.detailContainer}>
        <Pressable
          onPress={goToVerificationHandler}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={[styles.detail, styles.detailOne]}>
            <Ionicons name="person-add" size={24} color={Colors.primary50} />
            <View>
              <Text style={styles.text}>Identity Verification</Text>
              <Text style={styles.description}>
                Verify your account with your bank account number
              </Text>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={goToReferralHandler}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={[styles.detail, styles.detailOne]}>
            <Ionicons name="gift" size={24} color={Colors.primary50} />
            <View>
              <Text style={styles.text}>Invite friend</Text>
              <Text style={styles.description}>
                Invite your friends and get a bonus
              </Text>
            </View>
          </View>
        </Pressable>
        <Pressable
          onPress={goToSecurityHandler}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={[styles.detail, styles.detailOne]}>
            <Ionicons name="key" size={24} color={Colors.primary50} />
            <Text style={styles.text}>Account Security</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={logoutHandler}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={[styles.detail, styles.detailOne]}>
            <Ionicons name="log-out" size={24} color={Colors.primary50} />
            <Text style={styles.text}>Logout</Text>
          </View>
        </Pressable>
        <Pressable
          onPress={goToDeleteScreen}
          style={({ pressed }) => pressed && styles.pressed}
        >
          <View style={styles.detail}>
            <Ionicons name="trash" size={24} color={Colors.primary50} />
            <Text style={styles.text}>Delete Account</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
};

export default GeneralSettings;

const styles = StyleSheet.create({
  container: {
    marginTop: 24,
  },
  title: {
    fontFamily: "roboto-bold",
    fontSize: 24,
    color: Colors.primary900,
    marginLeft: 32,
    marginBottom: 12,
  },
  text: {
    color: Colors.primary50,
    fontFamily: "open-sans",
    fontSize: 18,
  },
  description: {
    fontFamily: "open-sans",
    fontSize: 12,
    color: Colors.primary50,
  },
  detailContainer: {
    backgroundColor: Colors.primary900,
    borderRadius: 6,
    marginBottom: 64,
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
});
