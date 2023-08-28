import { useContext, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";

import AuthContent from "../components/screenComps/Auth/AuthContent";
import { AuthContext } from "../store/auth-context";
import { Colors } from "../constants/style";
import { login } from "../utills/auth";

const LoginScreen = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({ title: "EasyPay" });
  }, []);

  async function loginHandler({ email, password }) {
    setIsAuthenticated(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert("Error", "Could not login you in. Check your crendentials.");
    }
    setIsAuthenticated(false);
  }

  if (isAuthenticated) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color="white" size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Login</Text>
      <AuthContent isLogin={true} onAuthenticate={loginHandler} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
  },
  text: {
    marginHorizontal: 12,
    marginBottom: 32,
    fontFamily: "open-sans-bold",
    fontWeight: "600",
    fontSize: 32,
    color: Colors.primary50,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
