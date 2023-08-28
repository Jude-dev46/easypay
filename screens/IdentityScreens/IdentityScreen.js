import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { fetchCustomer } from "../../utills/http/customer";
import IdentityHeader from "../../components/screenComps/IdentityManagement/IdentityHeader";
import AccountOfficer from "../../components/screenComps/IdentityManagement/AccountOfficer";
import GeneralSettings from "../../components/screenComps/IdentityManagement/GeneralSettings";

const IdentityScreen = () => {
  const [cutomer, setCutomer] = useState(null);

  useEffect(() => {
    async function getCutomer() {
      const regEmail = await AsyncStorage.getItem("email");

      try {
        const cutomerData = await fetchCustomer(regEmail);
        setCutomer(cutomerData);
      } catch (error) {
        Alert.alert(
          "Error!",
          "Could not fetch your details. If you do not have a virtual account, create one"
        );
      }
    }

    getCutomer();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <StatusBar style="dark" />
      <IdentityHeader cutomer={cutomer} />
      <AccountOfficer />
      <GeneralSettings />
    </ScrollView>
  );
};

export default IdentityScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 64,
  },
});
