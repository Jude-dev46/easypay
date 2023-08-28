import AsyncStorage from "@react-native-async-storage/async-storage";

const secret_key = process.env.EXPO_PUBLIC_SECRET_API_KEY;

export async function verifyIdentity({ account_no, bank_name }) {
  const banks = await AsyncStorage.getItem("banks");
  const retrievedBanks = JSON.parse(banks);

  const filteredBank = retrievedBanks.data.filter(
    (bank) => bank.name === bank_name
  );

  const bank_code = filteredBank[0].code;

  const url = `https://api.paystack.co/bank/resolve?account_number=${account_no}&bank_code=${bank_code}`;

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${secret_key}`,
      },
    });

    const data = await response.json();

    return data;
  } catch (error) {
    console.log("Error!", error);
  }
}
