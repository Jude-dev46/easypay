import AsyncStorage from "@react-native-async-storage/async-storage";

const api_key = process.env.EXPO_PUBLIC_SECRET_API_KEY;
const firebaseUrl = process.env.EXPO_PUBLIC_FIREBASE_URL;
const firebaseApiKey = process.env.EXPO_PUBLIC_FIREBASE_API_KEY;

const url = `https://api.paystack.co`;

export async function getBanks() {
  try {
    const response = await fetch(url + "/bank", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
    });

    const banks = await response.json();

    const bankValues = JSON.stringify(banks);
    AsyncStorage.setItem("banks", bankValues);

    return banks.data;
  } catch (error) {
    console.log("Error!", error);
  }
}

export async function createBeneficiary({ name, type, account_no, bank_name }) {
  const authToken = await AsyncStorage.getItem("token");
  const banks = await AsyncStorage.getItem("banks");
  const retrievedBanks = JSON.parse(banks);

  const filteredBank = retrievedBanks.data.filter(
    (bank) => bank.name === bank_name
  );

  const params = {
    type: type,
    name: name,
    account_number: `0${account_no}`,
    bank_code: filteredBank[0].code,
    currency: "NGN",
  };

  try {
    const response = await fetch(url + `/transferrecipient`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });
    const trnsferRes = await response.json();
    console.log(trnsferRes);

    const bene = JSON.stringify(trnsferRes.data);
    await fetch(firebaseUrl + `/beneficiary.json?auth=${authToken}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${firebaseApiKey}`,
        "Content-Type": "application/json",
      },
      body: bene,
    });

    return trnsferRes.message;
  } catch (error) {
    console.log("Error!", error);
  }
}

export async function getBeneficiaries() {
  const authToken = await AsyncStorage.getItem("token");

  try {
    const response = await fetch(
      firebaseUrl + `/beneficiary.json?auth=${authToken}`
    );

    const beneficiaries = await response.json();

    return beneficiaries;
  } catch (error) {
    console.log("Error!", error);
  }
}

export async function initiateTransfer({ amount, reason }, recipient_code) {
  const params = {
    source: "balance",
    amount: amount,
    reason: reason || "Transfer",
    recipient: recipient_code,
  };

  try {
    const response = await fetch(url + "/transfer", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${api_key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log("Error", error);
  }
}
