import { useState } from "react";
import { View, StyleSheet } from "react-native";

import Input from "./Input";
import Button from "../../UI/Button";
import { Colors } from "../../../constants/style";

const AuthForm = ({ isLogin, onSubmit, credentialsInvalid }) => {
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [enteredConfirmedPassword, setEnteredConfirmedPassword] = useState("");

  const {
    email: emailIsInvalid,
    password: passwordIsInvalid,
    confirmPassword: passwordsDontMatch,
  } = credentialsInvalid;

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEnteredEmail(enteredValue);
        break;
      case "password":
        setEnteredPassword(enteredValue);
        break;
      case "confirmPassword":
        setEnteredConfirmedPassword(enteredValue);
        break;
    }
  }

  function submitHandler() {
    onSubmit({
      email: enteredEmail,
      password: enteredPassword,
      confirmPassword: enteredConfirmedPassword,
    });
  }

  return (
    <View>
      <View>
        <Input
          label="Email Address"
          keyboardType="email-address"
          onUpdateValue={updateInputValueHandler.bind(this, "email")}
          value={enteredEmail}
          isInvalid={emailIsInvalid}
        />
        <Input
          label="Password"
          keyboardType="default"
          secure={true}
          onUpdateValue={updateInputValueHandler.bind(this, "password")}
          value={enteredPassword}
          isInvalid={passwordIsInvalid}
        />
        {!isLogin && (
          <Input
            label="Confirm Password"
            keyboardType="default"
            secure={true}
            onUpdateValue={updateInputValueHandler.bind(
              this,
              "confirmPassword"
            )}
            value={enteredConfirmedPassword}
            isInvalid={passwordsDontMatch}
          />
        )}
        <View style={styles.buttons}>
          <Button onPress={submitHandler}>
            {isLogin ? "Log in" : "Sign up"}
          </Button>
        </View>
      </View>
    </View>
  );
};

export default AuthForm;

const styles = StyleSheet.create({
  buttons: {
    backgroundColor: Colors.primary900,
    marginHorizontal: 16,
    borderRadius: 8,
  },
});
