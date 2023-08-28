import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_KEY = "AIzaSyCV51Qyo__zdWBWo1GxKreTXHpzYg6otHI";

export async function authenticate(mode, email, password) {
  AsyncStorage.setItem("signInEmail", email);
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;

  const response = await axios.post(url, {
    email: email,
    password: password,
    returnSecureToken: true,
  });

  return response.data.idToken;
}

export function login(email, password) {
  return authenticate("signInWithPassword", email, password);
}

export function createUser(email, password) {
  return authenticate("signUp", email, password);
}

export async function resetPassword({ confirmPassword }) {
  const authId = await AsyncStorage.getItem("token");

  const resetUrl = `https://identitytoolkit.googleapis.com/v1/accounts:`;

  const response = await axios.post(resetUrl + `update?key=${API_KEY}`, {
    idToken: authId,
    password: confirmPassword,
    returnSecureToken: true,
  });

  return response.data.idToken;
}
