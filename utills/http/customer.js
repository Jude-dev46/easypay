import AsyncStorage from "@react-native-async-storage/async-storage";

const secret_key = process.env.EXPO_PUBLIC_SECRET_API_KEY;
const firebaseUrl = process.env.EXPO_PUBLIC_FIREBASE_URL;
const firebaseApiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

export const createCustomer = async (email, firstName, lastName, phone) => {
  const params = JSON.stringify({
    email: email,
    first_name: firstName,
    last_name: lastName,
    phone: phone,
  });

  const url = "https://api.paystack.co/customer";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret_key}`,
        "Content-Type": "application/json",
      },
      body: params,
    });

    const customer = await response.json();
    return customer.data;
  } catch (error) {
    console.error(error);
  }
};

export async function fetchCustomer(email) {
  const url = "https://api.paystack.co/customer";

  try {
    const response = await fetch(url + `/${email}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secret_key}`,
      },
    });
    const customer = await response.json();

    return customer.data;
  } catch (error) {
    console.log("Error!", error);
  }
}

export async function storeCutomerImage(imageData) {
  const authToken = await AsyncStorage.getItem("token");

  try {
    const response = await fetch(
      firebaseUrl + `/cutomerImage.json?auth=${authToken}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${firebaseApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(imageData),
      }
    );

    const message = await response.json();

    return message;
  } catch (error) {
    console.log("Error!", error);
  }
}

export async function getCutomerImage() {
  const authToken = await AsyncStorage.getItem("token");

  try {
    const response = await fetch(
      firebaseUrl + `/cutomerImage.json?auth=${authToken}`
    );

    const imageData = await response.json();

    return imageData;
  } catch (error) {
    console.log("Error!", error);
  }
}

export async function removeAccount({ email }) {
  const customer = await fetchCustomer(email);

  const params = JSON.stringify({
    customer: customer.customer_code,
    risk_action: "allow",
  });

  try {
    const response = await fetch("", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${secret_key}`,
        "Content-Type": "application/json",
        body: params,
      },
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error!", error);
  }
}
