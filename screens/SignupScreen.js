import { useState, useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet, Alert, ActivityIndicator } from "react-native";

import AuthContent from "../components/screenComps/Auth/AuthContent";
import { Colors } from "../constants/style";
import { AuthContext } from "../store/auth-context";
import { createUser } from "../utills/auth";

const SignupScreen = ({ navigation }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const authCtx = useContext(AuthContext);

  useLayoutEffect(() => {
    navigation.setOptions({ title: "EasyPay" });
  }, []);

  async function signUpHandler({ email, password }) {
    setIsAuthenticated(true);
    try {
      const token = await createUser(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed!",
        "Could not sign in. Check your crendentials."
      );
    }
    setIsAuthenticated(false);
  }

  if (isAuthenticated) {
    return <ActivityIndicator color="white" />;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Sign up</Text>
      <AuthContent onAuthenticate={signUpHandler} />
    </View>
  );
};

export default SignupScreen;

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
    fontWeight: "bold",
    fontSize: 32,
    color: Colors.primary50,
  },
});
